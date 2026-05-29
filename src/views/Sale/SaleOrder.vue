<template>
  <div class="page-container">
    <!-- 搜索表单 -->
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="销售单号">
          <el-input v-model="searchForm.orderNo" placeholder="输入单号" clearable style="width: 180px" @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="客户">
          <el-select v-model="searchForm.customerId" placeholder="选择客户" clearable filterable style="width: 180px">
            <el-option v-for="item in customerList" :key="item.id" :label="item.customerName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="仓库">
          <el-select v-model="searchForm.warehouseId" placeholder="选择仓库" clearable style="width: 180px">
            <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouseName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.orderStatus" placeholder="选择状态" clearable style="width: 120px">
            <el-option label="草稿" value="DRAFT" />
            <el-option label="已确认" value="CONFIRMED" />
            <el-option label="部分出库" value="PARTIAL_OUT" />
            <el-option label="已出库" value="OUT_STOCK" />
            <el-option label="已收款" value="PAID" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
          <el-button :icon="Refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 操作按钮 -->
    <div class="table-toolbar">
      <div class="toolbar-left">
        <el-button v-if="hasPermission('sale:create')" type="primary" :icon="Plus" @click="handleCreate">新增销售</el-button>
      </div>
      <div class="toolbar-right">
        <el-tag type="info">共 {{ pagination.total }} 条记录</el-tag>
      </div>
    </div>

    <!-- 数据表格 -->
    <el-table v-loading="loading" :data="orderList" border stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column prop="orderNo" label="销售单号" width="200" fixed />
      <el-table-column prop="customerName" label="客户" min-width="150" />
      <el-table-column prop="warehouseName" label="出货仓库" width="120" />
      <el-table-column prop="orderDate" label="销售日期" width="120" />
      <el-table-column prop="totalAmount" label="销售金额" width="120" align="right">
        <template #default="{ row }">
          ¥{{ formatMoney(row.totalAmount) }}
        </template>
      </el-table-column>
      <el-table-column prop="receivedAmount" label="已收款" width="120" align="right">
        <template #default="{ row }">
          ¥{{ formatMoney(row.receivedAmount) }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="creator" label="创建人" width="100" />
      <el-table-column prop="createTime" label="创建时间" width="160">
        <template #default="{ row }">
          {{ formatDate(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280" fixed="right" align="center">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleDetail(row)">查看</el-button>
          <el-button v-if="row.status === 'CONFIRMED' || row.status === 'PARTIAL_OUT'" type="success" link @click="handleStockOut(row)">出库</el-button>
          <el-button v-if="row.status === 'OUT_STOCK' || row.status === 'PARTIAL_PAID'" type="warning" link @click="handleCollection(row)">收款</el-button>
          <el-button v-if="row.status === 'DRAFT'" type="info" link @click="handleEdit(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="pagination.current"
      v-model:page-size="pagination.pageSize"
      :total="pagination.total"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      class="pagination"
      @size-change="loadData"
      @current-change="loadData"
    />

    <!-- 新增/编辑弹窗 -->
    <el-dialog
      v-model="formVisible"
      :title="isEdit ? '编辑销售单' : '新增销售单'"
      width="1100px"
      :close-on-click-modal="false"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户" prop="customerId">
              <el-select v-model="form.customerId" placeholder="选择客户" filterable style="width: 100%" @change="handleCustomerChange">
                <el-option v-for="item in customerList" :key="item.id" :label="item.customerName" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出货仓库" prop="warehouseId">
              <el-select v-model="form.warehouseId" placeholder="选择仓库" style="width: 100%" @change="handleWarehouseChange">
                <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouseName" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="销售日期" prop="orderDate">
              <el-date-picker
                v-model="form.orderDate"
                type="date"
                placeholder="选择日期"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人">
              <el-input v-model="form.contact" placeholder="联系人" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="form.contactPhone" placeholder="联系电话" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收货地址">
              <el-input v-model="form.deliveryAddress" placeholder="收货地址" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="发票类型">
              <el-select v-model="form.invoiceType" style="width: 100%">
                <el-option label="收据" value="RECEIPT" />
                <el-option label="普通发票" value="NORMAL" />
                <el-option label="增值税发票" value="VAT" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="整单折扣">
              <el-input-number v-model="form.discountRate" :min="0" :max="100" :precision="2" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单据金额">
              <span class="amount-text">¥{{ formatMoney(form.totalAmount) }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 货品明细 -->
        <el-form-item label="销售明细">
          <el-table :data="form.items" border style="width: 100%; margin-bottom: 10px">
            <el-table-column type="index" label="序号" width="60" align="center" />
            <el-table-column label="货品" min-width="150">
              <template #default="{ row, $index }">
                <el-select v-model="row.productId" placeholder="选择货品" style="width: 100%" @change="(val) => handleProductChange(val, $index)">
                  <el-option v-for="item in availableProducts" :key="item.id" :label="item.productName" :value="item.id" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="productCode" label="货品编码" width="120" />
            <el-table-column label="销售数量" width="100">
              <template #default="{ row }">
                <el-input-number v-model="row.quantity" :min="1" :max="999" :step="1" controls-position="right" style="width: 100%" @change="() => updateRowAmount(row)" />
              </template>
            </el-table-column>
            <el-table-column label="单价" width="120">
              <template #default="{ row }">
                <el-input-number v-model="row.unitPrice" :min="0" :precision="2" controls-position="right" style="width: 100%" @change="() => updateRowAmount(row)" />
              </template>
            </el-table-column>
            <el-table-column label="折扣%" width="100">
              <template #default="{ row }">
                <el-input-number v-model="row.discountRate" :min="0" :max="100" :precision="2" controls-position="right" style="width: 100%" @change="() => updateRowAmount(row)" />
              </template>
            </el-table-column>
            <el-table-column label="金额" width="120">
              <template #default="{ row }">
                {{ formatMoney(row.amount) }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80" align="center">
              <template #default="{ $index }">
                <el-button type="danger" link @click="handleRemoveItem($index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" plain @click="handleAddItem">添加货品</el-button>
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="formVisible = false">取消</el-button>
        <el-button @click="handleSaveDraft">保存草稿</el-button>
        <el-button type="primary" @click="handleSubmit">确认销售</el-button>
      </template>
    </el-dialog>

    <!-- 查看详情弹窗 -->
    <el-dialog v-model="detailVisible" title="销售单详情" width="1100px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="销售单号">{{ currentOrder.orderNo }}</el-descriptions-item>
        <el-descriptions-item label="销售日期">{{ currentOrder.orderDate }}</el-descriptions-item>
        <el-descriptions-item label="客户">{{ currentOrder.customerName }}</el-descriptions-item>
        <el-descriptions-item label="出货仓库">{{ currentOrder.warehouseName }}</el-descriptions-item>
        <el-descriptions-item label="联系人">{{ currentOrder.contact || '-' }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ currentOrder.contactPhone || '-' }}</el-descriptions-item>
        <el-descriptions-item label="收货地址" :span="2">{{ currentOrder.deliveryAddress || '-' }}</el-descriptions-item>
        <el-descriptions-item label="发票类型">{{ getInvoiceTypeText(currentOrder.invoiceType) }}</el-descriptions-item>
        <el-descriptions-item label="折扣">{{ currentOrder.discountRate }}%</el-descriptions-item>
        <el-descriptions-item label="销售金额">¥{{ formatMoney(currentOrder.totalAmount) }}</el-descriptions-item>
        <el-descriptions-item label="已收款">¥{{ formatMoney(currentOrder.receivedAmount) }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="getStatusType(currentOrder.status)">{{ getStatusText(currentOrder.status) }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="创建人">{{ currentOrder.creator }}</el-descriptions-item>
      </el-descriptions>

      <el-divider>销售明细</el-divider>

      <el-table :data="currentOrder.items" border>
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="productName" label="货品名称" min-width="150" />
        <el-table-column prop="productCode" label="货品编码" width="120" />
        <el-table-column prop="unit" label="单位" width="60" />
        <el-table-column prop="quantity" label="数量" width="80" align="center" />
        <el-table-column prop="pickedQuantity" label="已出库" width="80" align="center" />
        <el-table-column prop="unitPrice" label="单价" width="100" align="right">
          <template #default="{ row }">
            ¥{{ formatMoney(row.unitPrice) }}
          </template>
        </el-table-column>
        <el-table-column prop="discountRate" label="折扣%" width="80" />
        <el-table-column prop="amount" label="金额" width="120" align="right">
          <template #default="{ row }">
            ¥{{ formatMoney(row.amount) }}
          </template>
        </el-table-column>
        <el-table-column label="SN码" width="100" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.snCount" type="success">{{ row.snCount }}/{{ row.quantity }}</el-tag>
            <span v-else>未出库</span>
          </template>
        </el-table-column>
      </el-table>

      <template #footer>
        <el-button @click="detailVisible = false">关闭</el-button>
      </template>
    </el-dialog>

    <!-- SN码出库弹窗 -->
    <SaleSnSelector
      v-model:visible="snSelectorVisible"
      :order-id="currentOrder.id"
      :items="currentOrder.items"
      @success="handleSnSelectorSuccess"
    />

    <!-- 收款弹窗 -->
    <CollectionDialog
      v-model:visible="collectionVisible"
      :order="currentOrder"
      @success="handleCollectionSuccess"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, Refresh, Plus } from '@element-plus/icons-vue'
import { formatDate, formatMoney } from '@/utils/format'
import { getSaleList, getSaleDetail, createSale, updateSale, confirmSale, getCustomerSimpleList, getWarehouseSimpleList, getProductSimpleList, getInventoryByWarehouse, pushReceivable, buildReceivablePayload } from '@/api'
import { useAppStore } from '@/stores/app'
import SaleSnSelector from '@/components/SaleSnSelector.vue'
import CollectionDialog from '@/components/CollectionDialog.vue'

const appStore = useAppStore()

// 列表数据
const loading = ref(false)
const orderList = ref([])
const customerList = ref([])
const warehouseList = ref([])
const productList = ref([])
const availableProducts = ref([])

// 搜索表单
const searchForm = reactive({
  orderNo: '',
  customerId: null,
  warehouseId: null,
  orderStatus: null
})

// 分页
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0
})

// 表单弹窗
const formVisible = ref(false)
const formRef = ref()
const isEdit = ref(false)
const form = reactive({
  id: null,
  customerId: null,
  customerName: '',
  warehouseId: null,
  warehouseName: '',
  orderDate: '',
  contact: '',
  contactPhone: '',
  deliveryAddress: '',
  invoiceType: 'RECEIPT',
  discountRate: 100,
  totalAmount: 0,
  remark: '',
  items: []
})

const rules = {
  customerId: [{ required: true, message: '请选择客户', trigger: 'change' }],
  warehouseId: [{ required: true, message: '请选择仓库', trigger: 'change' }],
  orderDate: [{ required: true, message: '请选择销售日期', trigger: 'change' }]
}

// 详情弹窗
const detailVisible = ref(false)
const currentOrder = ref({})

// SN码出库弹窗
const snSelectorVisible = ref(false)

// 收款弹窗
const collectionVisible = ref(false)

// 权限检查
function hasPermission(permission) {
  return appStore.hasPermission(permission)
}

// 加载数据
async function loadData() {
  loading.value = true
  try {
    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize
    }
    if (searchForm.orderNo) params.order_no = searchForm.orderNo
    if (searchForm.customerId) params.customer_id = searchForm.customerId
    if (searchForm.warehouseId) params.warehouse_id = searchForm.warehouseId
    if (searchForm.orderStatus) params.status = searchForm.orderStatus

    const res = await getSaleList(params)
    if (res.code === 'SUC0000') {
      orderList.value = res.body?.list || []
      pagination.total = res.body?.total || 0
    }
  } catch (error) {
    console.error('加载销售单列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 加载基础数据
async function loadBaseData() {
  const [customerRes, warehouseRes, productRes] = await Promise.all([
    getCustomerSimpleList(),
    getWarehouseSimpleList(),
    getProductSimpleList()
  ])
  
  if (customerRes.code === 'SUC0000') customerList.value = customerRes.body || []
  if (warehouseRes.code === 'SUC0000') warehouseList.value = warehouseRes.body || []
  if (productRes.code === 'SUC0000') productList.value = productRes.body || []
}

// 加载仓库可用货品
async function loadAvailableProducts(warehouseId) {
  if (!warehouseId) {
    availableProducts.value = productList.value
    return
  }
  
  try {
    const res = await getInventoryByWarehouse({ warehouseId })
    if (res.code === 'SUC0000') {
      // 过滤有库存的货品
      availableProducts.value = res.body?.list?.filter(item => item.quantity > 0) || []
    }
  } catch (error) {
    availableProducts.value = productList.value
  }
}

// 搜索
function handleSearch() {
  pagination.current = 1
  loadData()
}

// 重置
function handleReset() {
  searchForm.orderNo = ''
  searchForm.customerId = null
  searchForm.warehouseId = null
  searchForm.orderStatus = null
  handleSearch()
}

// 新增
function handleCreate() {
  isEdit.value = false
  form.id = null
  form.customerId = null
  form.customerName = ''
  form.warehouseId = null
  form.warehouseName = ''
  form.orderDate = new Date().toISOString().split('T')[0]
  form.contact = ''
  form.contactPhone = ''
  form.deliveryAddress = ''
  form.invoiceType = 'RECEIPT'
  form.discountRate = 100
  form.totalAmount = 0
  form.remark = ''
  form.items = []
  availableProducts.value = productList.value
  formVisible.value = true
}

// 编辑
async function handleEdit(row) {
  try {
    const res = await getSaleDetail({ id: row.id })
    if (res.code === 'SUC0000') {
      const data = res.body
      Object.assign(form, {
        id: data.id,
        customerId: data.customerId,
        customerName: data.customerName,
        warehouseId: data.warehouseId,
        warehouseName: data.warehouseName,
        orderDate: data.orderDate,
        contact: data.contact,
        contactPhone: data.contactPhone,
        deliveryAddress: data.deliveryAddress,
        invoiceType: data.invoiceType || 'RECEIPT',
        discountRate: data.discountRate || 100,
        totalAmount: data.totalAmount,
        remark: data.remark,
        items: data.items || []
      })
      availableProducts.value = productList.value
      isEdit.value = true
      formVisible.value = true
    }
  } catch (error) {
    console.error('加载详情失败:', error)
  }
}

// 添加明细行
function handleAddItem() {
  form.items.push({
    productId: null,
    productCode: '',
    productName: '',
    unit: '台',
    quantity: 1,
    unitPrice: 0,
    discountRate: 100,
    amount: 0
  })
}

// 删除明细行
function handleRemoveItem(index) {
  form.items.splice(index, 1)
}

// 货品选择变化
function handleProductChange(productId, index) {
  const product = productList.value.find(p => p.id === productId)
  if (product) {
    form.items[index].productCode = product.productCode
    form.items[index].productName = product.productName
    form.items[index].unitPrice = product.salePrice || 0
    form.items[index].unit = product.unit || '台'
    updateRowAmount(form.items[index])
  }
}

// 客户选择变化
function handleCustomerChange(customerId) {
  const customer = customerList.value.find(c => c.id === customerId)
  if (customer) {
    form.customerName = customer.customerName
  }
}

// 仓库选择变化
function handleWarehouseChange(warehouseId) {
  const warehouse = warehouseList.value.find(w => w.id === warehouseId)
  if (warehouse) {
    form.warehouseName = warehouse.warehouseName
  }
  loadAvailableProducts(warehouseId)
}

// 更新行金额
function updateRowAmount(row) {
  row.amount = row.quantity * row.unitPrice * (row.discountRate / 100)
}

// 保存草稿
async function handleSaveDraft() {
  try {
    await formRef.value.validate()
    
    const data = {
      id: form.id,
      customerId: form.customerId,
      customerName: form.customerName,
      warehouseId: form.warehouseId,
      warehouseName: form.warehouseName,
      orderDate: form.orderDate,
      remark: form.remark,
      totalAmount: form.totalAmount,
      status: 'DRAFT',
      items: form.items.map(item => ({
        productId: item.productId,
        productCode: item.productCode,
        productName: item.productName,
        unit: item.unit,
        quantity: item.quantity,
        price: item.unitPrice,
        amount: item.amount
      }))
    }
    
    const res = isEdit.value ? await updateSale(data) : await createSale(data)
    if (res.code === 'SUC0000') {
      ElMessage.success('保存成功')
      formVisible.value = false
      loadData()
    } else {
      ElMessage.error(res.errorMsg || '保存失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('保存失败:', error)
    }
  }
}

// 校验库存是否充足
async function validateStock() {
  if (!form.warehouseId || form.items.length === 0) return true

  try {
    const res = await getInventoryByWarehouse({ warehouseId: form.warehouseId })
    if (res.code !== 'SUC0000') return true

    const stockMap = new Map()
    res.body?.list?.forEach(item => {
      stockMap.set(item.productId, item.quantity || 0)
    })

    const insufficient = []
    for (const item of form.items) {
      const available = stockMap.get(item.productId) || 0
      if (item.quantity > available) {
        const product = productList.value.find(p => p.id === item.productId)
        insufficient.push(`${product?.productName || '未知商品'} (需 ${item.quantity}，库 ${available})`)
      }
    }

    if (insufficient.length > 0) {
      ElMessage.error(`库存不足，无法保存：${insufficient.join('；')}`)
      return false
    }
    return true
  } catch (error) {
    console.error('库存校验失败:', error)
    return true
  }
}

// 提交确认
async function handleSubmit() {
  try {
    await formRef.value.validate()

    if (form.items.length === 0) {
      return ElMessage.warning('请添加销售明细')
    }

    // 保存前校验库存
    const stockValid = await validateStock()
    if (!stockValid) return

    // 检查是否需要SN码
    const needSnProducts = form.items.filter(item => {
      const product = productList.value.find(p => p.id === item.productId)
      return product && product.hasSn === 1
    })

    if (needSnProducts.length > 0) {
      // 有需要SN码的货品，保存后需要出库录入SN码
      const data = {
        id: form.id,
        customerId: form.customerId,
        customerName: form.customerName,
        warehouseId: form.warehouseId,
        warehouseName: form.warehouseName,
        orderDate: form.orderDate,
        remark: form.remark,
        totalAmount: form.totalAmount,
        status: 'CONFIRMED',
        items: form.items.map(item => ({
          productId: item.productId,
          productCode: item.productCode,
          productName: item.productName,
          unit: item.unit,
          quantity: item.quantity,
          price: item.unitPrice,
          amount: item.amount
        }))
      }

      const res = isEdit.value ? await updateSale(data) : await createSale(data)
      if (res.code === 'SUC0000') {
        ElMessage.success('保存成功，请在出库时录入SN码')
        formVisible.value = false
        loadData()
      } else {
        ElMessage.error(res.errorMsg || '保存失败')
      }
    } else {
      // 不需要SN码，直接确认销售
      const data = {
        id: form.id,
        customerId: form.customerId,
        customerName: form.customerName,
        warehouseId: form.warehouseId,
        warehouseName: form.warehouseName,
        orderDate: form.orderDate,
        remark: form.remark,
        totalAmount: form.totalAmount,
        status: 'OUT_STOCK',
        items: form.items.map(item => ({
          productId: item.productId,
          productCode: item.productCode,
          productName: item.productName,
          unit: item.unit,
          quantity: item.quantity,
          price: item.unitPrice,
          amount: item.amount
        }))
      }

      const res = isEdit.value ? await updateSale(data) : await createSale(data)
      if (res.code === 'SUC0000') {
        ElMessage.success('销售成功')
        formVisible.value = false
        loadData()
      } else {
        ElMessage.error(res.errorMsg || '保存失败')
      }
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('提交失败:', error)
    }
  }
}

// 查看详情
async function handleDetail(row) {
  try {
    const res = await getSaleDetail({ id: row.id })
    if (res.code === 'SUC0000') {
      currentOrder.value = res.body || {}
      detailVisible.value = true
    }
  } catch (error) {
    console.error('加载详情失败:', error)
  }
}

// 出库（录入SN码）
function handleStockOut(row) {
  currentOrder.value = { ...row }
  snSelectorVisible.value = true
}

// SN码出库成功
function handleSnSelectorSuccess() {
  snSelectorVisible.value = false
  loadData()
  handleDetail({ id: currentOrder.value.id })
}

// 收款
function handleCollection(row) {
  currentOrder.value = { ...row }
  collectionVisible.value = true
}

// 收款成功
function handleCollectionSuccess() {
  collectionVisible.value = false
  loadData()
}

// 状态类型
function getStatusType(status) {
  const map = {
    DRAFT: 'info',
    CONFIRMED: 'success',
    PARTIAL_OUT: 'warning',
    OUT_STOCK: 'primary',
    PARTIAL_PAID: 'warning',
    PAID: 'success',
    CANCELLED: 'danger'
  }
  return map[status] || 'info'
}

// 状态文本
function getStatusText(status) {
  const map = {
    DRAFT: '草稿',
    CONFIRMED: '已确认',
    PARTIAL_OUT: '部分出库',
    OUT_STOCK: '已出库',
    PARTIAL_PAID: '部分收款',
    PAID: '已收款',
    CANCELLED: '已取消'
  }
  return map[status] || status
}

// 发票类型文本
function getInvoiceTypeText(type) {
  const map = {
    RECEIPT: '收据',
    NORMAL: '普通发票',
    VAT: '增值税发票'
  }
  return map[type] || type
}

// 监听items变化，更新totalAmount
import { watch } from 'vue'
watch(() => form.items, () => {
  form.totalAmount = form.items.reduce((sum, item) => sum + item.amount, 0) * (form.discountRate / 100)
}, { deep: true })

onMounted(() => {
  loadData()
  loadBaseData()
})
</script>

<style scoped>
.page-container {
  padding: 0;
}

.search-card {
  margin-bottom: 15px;
}

.table-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.toolbar-left,
.toolbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.amount-text {
  font-size: 18px;
  font-weight: bold;
  color: #409eff;
}
</style>
