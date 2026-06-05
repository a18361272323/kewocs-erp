<template>
  <div class="page-container">
    <!-- 搜索表单 -->
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="销售单号">
          <el-input v-model="searchForm.order_no" placeholder="输入单号" clearable style="width: 180px" @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="客户">
          <el-select v-model="searchForm.customer_id" placeholder="选择客户" clearable filterable style="width: 180px">
            <el-option v-for="item in customerList" :key="item.id" :label="item.customer_name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="仓库">
          <el-select v-model="searchForm.warehouse_id" placeholder="选择仓库" clearable style="width: 180px">
            <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouse_name" :value="item.id" />
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
      <el-table-column prop="order_no" label="销售单号" width="200" fixed />
      <el-table-column prop="customer_name" label="客户" min-width="150" />
      <el-table-column prop="warehouse_name" label="出货仓库" width="120" />
      <el-table-column prop="order_date" label="销售日期" width="120" />
      <el-table-column prop="total_amount" label="销售金额" width="120" align="right">
        <template #default="{ row }">
          ¥{{ formatMoney(row.total_amount) }}
        </template>
      </el-table-column>
      <el-table-column prop="received_amount" label="已收款" width="120" align="right">
        <template #default="{ row }">
          ¥{{ formatMoney(row.received_amount) }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="creator" label="创建人" width="100" />
      <el-table-column prop="created_at" label="创建时间" width="160">
        <template #default="{ row }">
          {{ formatDate(row.created_at) }}
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
            <el-form-item label="客户" prop="customer_id">
              <el-select v-model="form.customer_id" placeholder="选择客户" filterable style="width: 100%" @change="handleCustomerChange">
                <el-option v-for="item in customerList" :key="item.id" :label="item.customer_name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出货仓库" prop="warehouse_id">
              <el-select v-model="form.warehouse_id" placeholder="选择仓库" style="width: 100%" @change="handleWarehouseChange">
                <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouse_name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="销售日期" prop="order_date">
              <el-date-picker
                v-model="form.order_date"
                type="date"
                placeholder="选择日期"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="单据金额">
              <span class="amount-text">¥{{ formatMoney(form.total_amount) }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 货品明细 -->
        <el-form-item label="销售明细">
          <el-table :data="form.items" border style="width: 100%; margin-bottom: 10px">
            <el-table-column type="index" label="序号" width="60" align="center" />
            <el-table-column label="货品" min-width="150">
              <template #default="{ row, $index }">
                <el-select v-model="row.product_id" placeholder="选择货品" style="width: 100%" @change="(val) => handleProductChange(val, $index)">
                  <el-option v-for="item in availableProducts" :key="item.id" :label="item.product_name" :value="item.id" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="product_code" label="货品编码" width="120" />
            <el-table-column label="销售数量" width="100">
              <template #default="{ row }">
                <el-input-number v-model="row.quantity" :min="1" :max="999" :step="1" controls-position="right" style="width: 100%" @change="() => updateRowAmount(row)" />
              </template>
            </el-table-column>
            <el-table-column label="单价" width="120">
              <template #default="{ row }">
                <el-input-number v-model="row.price" :min="0" :precision="2" controls-position="right" style="width: 100%" @change="() => updateRowAmount(row)" />
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
        <el-descriptions-item label="销售单号">{{ currentOrder.order_no }}</el-descriptions-item>
        <el-descriptions-item label="销售日期">{{ currentOrder.order_date }}</el-descriptions-item>
        <el-descriptions-item label="客户">{{ currentOrder.customer_name }}</el-descriptions-item>
        <el-descriptions-item label="出货仓库">{{ currentOrder.warehouse_name }}</el-descriptions-item>
        <el-descriptions-item label="销售金额">¥{{ formatMoney(currentOrder.total_amount) }}</el-descriptions-item>
        <el-descriptions-item label="已收款">¥{{ formatMoney(currentOrder.received_amount) }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="getStatusType(currentOrder.status)">{{ getStatusText(currentOrder.status) }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="创建人">{{ currentOrder.creator }}</el-descriptions-item>
      </el-descriptions>

      <el-divider>销售明细</el-divider>

      <el-table :data="currentOrder.items" border>
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="product_name" label="货品名称" min-width="150" />
        <el-table-column prop="product_code" label="货品编码" width="120" />
        <el-table-column prop="unit" label="单位" width="60" />
        <el-table-column prop="quantity" label="数量" width="80" align="center" />
        <el-table-column prop="sn_count" label="已出库" width="80" align="center" />
        <el-table-column prop="price" label="单价" width="100" align="right">
          <template #default="{ row }">
            ¥{{ formatMoney(row.price) }}
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="金额" width="120" align="right">
          <template #default="{ row }">
            ¥{{ formatMoney(row.amount) }}
          </template>
        </el-table-column>
        <el-table-column label="SN码" width="100" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.sn_count" type="success">{{ row.sn_count }}/{{ row.quantity }}</el-tag>
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
      :order-id="currentOrder.id" :order-no="currentOrder.order_no"
      :items="currentOrder.items" :warehouse_id="currentOrder.warehouse_id"
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
import { getSaleList, getSaleDetail, createSale, updateSale, confirmSale, getCustomerSimpleList, getWarehouseSimpleList, getProductSimpleList, getInventoryByWarehouse, pushReceivable, buildReceivablePayload, stockOutDetailApi } from '@/api'
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

const toList = (res) => {
  if (Array.isArray(res)) return res
  if (Array.isArray(res?.body)) return res.body
  if (Array.isArray(res?.data)) return res.data
  return res?.body?.list || res?.data?.list || []
}

// 搜索表单
const searchForm = reactive({
  order_no: '',
  customer_id: null,
  warehouse_id: null,
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
  customer_id: null,
  customer_name: '',
  warehouse_id: null,
  warehouse_name: '',
  order_date: '',
  total_amount: 0,
  remark: '',
  items: []
})

const rules = {
  customer_id: [{ required: true, message: '请选择客户', trigger: 'change' }],
  warehouse_id: [{ required: true, message: '请选择仓库', trigger: 'change' }],
  order_date: [{ required: true, message: '请选择销售日期', trigger: 'change' }]
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
  if (searchForm.order_no) params.order_no = searchForm.order_no
    if (searchForm.customer_id) params.customer_id = searchForm.customer_id
    if (searchForm.warehouse_id) params.warehouse_id = searchForm.warehouse_id
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
  
  if (customerRes.code === 'SUC0000') customerList.value = toList(customerRes)
  if (warehouseRes.code === 'SUC0000') warehouseList.value = toList(warehouseRes)
  if (productRes.code === 'SUC0000') productList.value = toList(productRes)
}

// 加载仓库可用货品
async function loadAvailableProducts(warehouse_id) {
  if (!warehouse_id) {
    availableProducts.value = productList.value
    return
  }
  
  try {
    const res = await getInventoryByWarehouse({ warehouse_id })
    if (res.code === 'SUC0000') {
      // 库存台账行的 id 是库存记录 id，商品选择必须使用 product_id。
      availableProducts.value = toList(res)
        .filter(item => Number(item.quantity || 0) > 0)
        .map(item => {
          const product = productList.value.find(p => String(p.id) === String(item.product_id)) || {}
          return {
            ...product,
            ...item,
            id: item.product_id,
            product_id: item.product_id,
            product_code: item.product_code || product.product_code,
            product_name: item.product_name || product.product_name,
            unit: item.unit || product.unit || '台',
            sale_price: product.sale_price || item.sale_price || item.price || 0
          }
        })
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
  searchForm.order_no = ''
  searchForm.customer_id = null
  searchForm.warehouse_id = null
  searchForm.orderStatus = null
  handleSearch()
}

// 新增
function handleCreate() {
  isEdit.value = false
  form.id = null
  form.customer_id = null
  form.customer_name = ''
  form.warehouse_id = null
  form.warehouse_name = ''
  form.order_date = new Date().toISOString().split('T')[0]
  form.total_amount = 0
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
        customer_id: data.customer_id,
        customer_name: data.customer_name,
        warehouse_id: data.warehouse_id,
        warehouse_name: data.warehouse_name,
        order_date: data.order_date,
        total_amount: data.total_amount,
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
    product_id: null,
    product_code: '',
    product_name: '',
    unit: '台',
    quantity: 1,
    amount: 0
  })
}

// 删除明细行
function handleRemoveItem(index) {
  form.items.splice(index, 1)
}

// 货品选择变化
function handleProductChange(product_id, index) {
  const product = productList.value.find(p => p.id === product_id)
  if (product) {
    form.items[index].product_code = product.product_code
    form.items[index].product_name = product.product_name
    form.items[index].price = product.sale_price || 0
    form.items[index].unit = product.unit || '台'
    updateRowAmount(form.items[index])
  }
}

// 客户选择变化
function handleCustomerChange(customer_id) {
  const customer = customerList.value.find(c => c.id === customer_id)
  if (customer) {
    form.customer_name = customer.customer_name
  }
}

// 仓库选择变化
function handleWarehouseChange(warehouse_id) {
  const warehouse = warehouseList.value.find(w => w.id === warehouse_id)
  if (warehouse) {
    form.warehouse_name = warehouse.warehouse_name
  }
  loadAvailableProducts(warehouse_id)
}

// 更新行金额
function updateRowAmount(row) {
  row.amount = row.quantity * row.price
}

// 保存草稿
async function handleSaveDraft() {
  try {
    await formRef.value.validate()
    
    const data = {
      operator_id: appStore.userId, operator_name: appStore.userName,
        id: form.id,
      customer_id: form.customer_id,
      customer_name: form.customer_name,
      warehouse_id: form.warehouse_id,
      warehouse_name: form.warehouse_name,
      order_date: form.order_date,
      remark: form.remark,
      total_amount: form.total_amount,
      status: 'DRAFT',
      items: form.items.map(item => ({
        product_id: item.product_id,
        product_code: item.product_code,
        product_name: item.product_name,
        unit: item.unit,
        quantity: item.quantity,
        price: item.price,
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
  if (!form.warehouse_id || form.items.length === 0) return true

  try {
    const res = await getInventoryByWarehouse({ warehouse_id: form.warehouse_id })
    if (res.code !== 'SUC0000') return true

    const stockMap = new Map()
    res.body?.list?.forEach(item => {
      stockMap.set(item.product_id, item.quantity || 0)
    })

    const insufficient = []
    for (const item of form.items) {
      const available = stockMap.get(item.product_id) || 0
      if (item.quantity > available) {
        const product = productList.value.find(p => p.id === item.product_id)
        insufficient.push(`${product?.product_name || '未知商品'} (需 ${item.quantity}，库 ${available})`)
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
      const product = productList.value.find(p => p.id === item.product_id)
      return product && ((product.is_sn_managed === 1 || product.is_sn_managed === true))
    })

    if (needSnProducts.length > 0) {
      // 有需要SN码的货品，保存后需要出库录入SN码
      const data = {
        operator_id: appStore.userId, operator_name: appStore.userName,
        id: form.id,
        customer_id: form.customer_id,
        customer_name: form.customer_name,
        warehouse_id: form.warehouse_id,
        warehouse_name: form.warehouse_name,
        order_date: form.order_date,
        remark: form.remark,
        total_amount: form.total_amount,
        status: 'CONFIRMED',
        items: form.items.map(item => ({
          product_id: item.product_id,
          product_code: item.product_code,
          product_name: item.product_name,
          unit: item.unit,
          quantity: item.quantity,
          price: item.price,
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
        operator_id: appStore.userId, operator_name: appStore.userName,
        id: form.id,
        customer_id: form.customer_id,
        customer_name: form.customer_name,
        warehouse_id: form.warehouse_id,
        warehouse_name: form.warehouse_name,
        order_date: form.order_date,
        remark: form.remark,
        total_amount: form.total_amount,
        status: 'OUT_STOCK',
        items: form.items.map(item => ({
          product_id: item.product_id,
          product_code: item.product_code,
          product_name: item.product_name,
          unit: item.unit,
          quantity: item.quantity,
          price: item.price,
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
async function handleStockOut(row) {
  let items = []
  try {
    const detailRes = await stockOutDetailApi.getList({
      order_no: row.order_no,
      current: 1,
      pageSize: 9999
    })
    items = toList(detailRes)
  } catch (error) {
    console.error('加载销售明细失败:', error)
  }
  currentOrder.value = { ...row, items }
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
import { watch } from 'vue'
watch(() => form.items, () => {
  form.total_amount = form.items.reduce((sum, item) => sum + item.amount, 0)
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
