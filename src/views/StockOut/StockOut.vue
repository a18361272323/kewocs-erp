<template>
  <div class="stock-out">
    <!-- 搜索栏 -->
    <el-card class="filter-card">
      <el-form :inline="true" :model="queryForm">
        <el-form-item label="单号">
          <el-input v-model="queryForm.orderNo" placeholder="请输入单号" clearable />
        </el-form-item>
        <el-form-item label="客户">
          <el-input v-model="queryForm.customerName" placeholder="请输入客户" clearable />
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="queryForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryForm.status" clearable>
            <el-option label="全部" value="" />
            <el-option label="待出库" value="PENDING" />
            <el-option label="部分出库" value="PARTIAL" />
            <el-option label="已完成" value="COMPLETED" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon> 查询
          </el-button>
          <el-button @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleCreate">
            <el-icon><Plus /></el-icon> 新增
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 数据表格 -->
    <el-card>
      <el-table :data="tableData" v-loading="loading" border stripe>
        <el-table-column prop="orderNo" label="单号" width="180" />
        <el-table-column prop="orderDate" label="单据日期" width="110" />
        <el-table-column prop="customerName" label="客户" min-width="150" />
        <el-table-column prop="warehouseName" label="仓库" width="120" />
        <el-table-column prop="totalQuantity" label="数量" width="80" align="center" />
        <el-table-column prop="snBound" label="SN绑定" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.snBound === row.totalQuantity ? 'success' : 'warning'" size="small">
              {{ row.snBound }}/{{ row.totalQuantity }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="totalAmount" label="金额" width="120" align="right">
          <template #default="{ row }">
            ¥{{ row.totalAmount?.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="receivablePushed" label="应收推送" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.receivablePushed ? 'success' : 'info'" size="small">
              {{ row.receivablePushed ? '已推送' : '未推送' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="receivableBillNo" label="应收单号" width="150" />
        <el-table-column prop="remark" label="备注" min-width="150" show-overflow-tooltip />
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="warning" @click="handleConfirmOut(row)" v-if="row.status !== 'COMPLETED'">
              确认出库
            </el-button>
            <el-button link type="success" @click="handlePushReceivable(row)" v-if="row.status === 'COMPLETED' && !row.receivablePushed">
              推送应收
            </el-button>
            <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          v-model:current-page="pagination.page"
          v-model:page-size="pagination.size"
          :total="pagination.total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next"
          @change="loadData"
        />
      </div>
    </el-card>

    <!-- 新增/编辑弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑销售出库单' : '新增销售出库单'"
      width="1000px"
      top="5vh"
      :close-on-click-modal="false"
    >
      <el-form :model="form" :rules="formRules" ref="formRef" label-width="100px">
        <el-row :gutter="16">
          <el-col :span="8">
            <el-form-item label="客户" prop="customerId">
              <el-select
                v-model="form.customerId"
                filterable
                placeholder="请选择客户"
                @change="handleCustomerChange"
              >
                <el-option
                  v-for="c in customers"
                  :key="c.id"
                  :label="c.customerCode + ' - ' + c.customerName"
                  :value="c.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="仓库" prop="warehouseId">
              <el-select v-model="form.warehouseId" placeholder="请选择仓库" @change="loadWarehouseStock">
                <el-option
                  v-for="w in warehouses"
                  :key="w.id"
                  :label="w.warehouseName"
                  :value="w.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出库日期" prop="orderDate">
              <el-date-picker
                v-model="form.orderDate"
                type="date"
                placeholder="请选择日期"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 商品明细 -->
        <el-form-item label="商品明细">
          <el-table :data="form.items" border size="small">
            <el-table-column label="商品" width="200">
              <template #default="{ row, $index }">
                <el-select
                  v-model="row.productId"
                  filterable
                  placeholder="选择商品"
                  @change="(val) => handleProductChange(val, row)"
                >
                  <el-option
                    v-for="p in availableProducts"
                    :key="p.id"
                    :label="`${p.productCode} - ${p.productName}`"
                    :value="p.id"
                  >
                    <span>{{ p.productName }}</span>
                    <span style="float:right;color:#909399">库存: {{ p.availableStock || 0 }}</span>
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="可用库存" width="100" align="center">
              <template #default="{ row }">
                <span :class="{ 'text-danger': (row.availableStock || 0) < (row.quantity || 0) }">
                  {{ row.availableStock || 0 }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="unit" label="单位" width="80" />
            <el-table-column prop="quantity" label="数量" width="120">
              <template #default="{ row }">
                <el-input-number
                  v-model="row.quantity"
                  :min="1"
                  :max="row.availableStock || 1"
                  size="small"
                  @change="(val) => handleQuantityChange(val, row)"
                />
              </template>
            </el-table-column>
            <el-table-column prop="price" label="单价" width="120">
              <template #default="{ row }">
                <el-input-number
                  v-model="row.price"
                  :precision="2"
                  :min="0"
                  size="small"
                  @change="(val) => handlePriceChange(val, row)"
                />
              </template>
            </el-table-column>
            <el-table-column prop="amount" label="金额" width="100">
              <template #default="{ row }">
                ¥{{ ((row.quantity || 0) * (row.price || 0)).toFixed(2) }}
              </template>
            </el-table-column>
            <el-table-column label="SN码" width="180">
              <template #default="{ row, $index }">
                <el-button
                  v-if="row.productId && row.needSn"
                  size="small"
                  type="primary"
                  @click="openSnDialog(row, $index)"
                >
                  {{ row.snCodes?.length || 0 }} 个SN码
                </el-button>
                <span v-else-if="row.productId && !row.needSn" class="text-muted">无需SN</span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template #default="{ $index }">
                <el-button type="danger" size="small" @click="removeItem($index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 库存不足警告 -->
          <div v-if="stockWarning" class="stock-warning">
            <el-alert type="warning" :closable="false">
              <template #title>
                <el-icon><Warning /></el-icon>
                部分商品库存不足，请调整数量后再确认出库
              </template>
            </el-alert>
          </div>
          <el-button type="primary" size="small" @click="addItem" style="margin-top: 8px">
            <el-icon><Plus /></el-icon> 添加商品
          </el-button>
        </el-form-item>

        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="备注">
              <el-input v-model="form.remark" type="textarea" :rows="2" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总金额">
              <span class="total-amount">¥{{ calculateTotal() }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>

    <!-- SN码选择弹窗 -->
    <el-dialog v-model="snDialogVisible" title="选择SN码" width="700px">
      <div class="sn-tips">
        <p>商品: {{ currentItem?.productName }}</p>
        <p>需要数量: {{ currentItem?.quantity }} 个</p>
        <p>已选择: {{ selectedSnCodes.length }} 个</p>
      </div>

      <el-table
        :data="warehouseSnList"
        ref="snTableRef"
        @selection-change="handleSnSelectionChange"
        border
        size="small"
        max-height="400"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="snCode" label="SN码" width="180" />
        <el-table-column prop="purchaseDate" label="入库日期" width="120" />
        <el-table-column prop="warrantyMonths" label="保修期" width="100">
          <template #default="{ row }">
            {{ row.warrantyMonths }}个月
          </template>
        </el-table-column>
      </el-table>

      <template #footer>
        <el-button @click="snDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmSnSelection">确认选择</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Plus, Warning } from '@element-plus/icons-vue'
import { stockOutApi, basicDataApi, warehouseApi, snApi, pushReceivable, buildReceivablePayload } from '@/api'

const loading = ref(false)
const dialogVisible = ref(false)
const snDialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref(null)
const snTableRef = ref(null)
const tableData = ref([])
const customers = ref([])
const warehouses = ref([])
const availableProducts = ref([])
const warehouseSnList = ref([])
const currentItemIndex = ref(-1)
const selectedSnCodes = ref([])

const queryForm = reactive({
  orderNo: '',
  customerName: '',
  dateRange: [],
  status: ''
})

const pagination = reactive({
  page: 1,
  size: 20,
  total: 0
})

const form = reactive({
  id: '',
  customerId: '',
  warehouseId: '',
  orderDate: new Date().toISOString().slice(0, 10),
  remark: '',
  items: []
})

const formRules = {
  customerId: [{ required: true, message: '请选择客户', trigger: 'change' }],
  warehouseId: [{ required: true, message: '请选择仓库', trigger: 'change' }],
  orderDate: [{ required: true, message: '请选择日期', trigger: 'change' }]
}

const currentItem = computed(() => {
  return currentItemIndex.value >= 0 ? form.items[currentItemIndex.value] : null
})

// 库存不足警告
const stockWarning = computed(() => {
  return form.items.some(item => {
    if (!item.productId || !item.needSn) return false
    return (item.availableStock || 0) < (item.quantity || 0)
  })
})

onMounted(() => {
  loadData()
  loadOptions()
})

const loadData = async () => {
  loading.value = true
  try {
    const params = {
      page: pagination.page,
      pageSize: pagination.size,
      order_no: queryForm.orderNo,
      customer_name: queryForm.customerName,
      order_date_start: queryForm.dateRange?.[0],
      order_date_end: queryForm.dateRange?.[1],
      status: queryForm.status
    }
    const res = await stockOutApi.list(params)
    tableData.value = res.list || []
    pagination.total = res.total || 0
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const loadOptions = async () => {
  try {
    const [c, w] = await Promise.all([
      basicDataApi.getCustomers(),
      warehouseApi.getAll()
    ])
    customers.value = c || []
    warehouses.value = w || []
  } catch (e) {
    console.error(e)
  }
}

// 加载仓库库存（基于SN码可用数量）
const loadWarehouseStock = async (warehouseId) => {
  if (!warehouseId) return
  try {
    const res = await snApi.getByWarehouse(warehouseId)
    // 按商品分组，统计可用库存（只统计INSTOCK状态的SN）
    const productMap = new Map()
    res.forEach(sn => {
      if (sn.status !== 'INSTOCK') return // 只统计可用库存
      if (!productMap.has(sn.productId)) {
        productMap.set(sn.productId, {
          id: sn.productId,
          productCode: sn.productCode,
          productName: sn.productName,
          availableStock: 0,
          needSn: true
        })
      }
      productMap.get(sn.productId).availableStock++
    })
    availableProducts.value = Array.from(productMap.values())
  } catch (e) {
    console.error(e)
  }
}

const handleSearch = () => {
  pagination.page = 1
  loadData()
}

const handleReset = () => {
  queryForm.orderNo = ''
  queryForm.customerName = ''
  queryForm.dateRange = []
  queryForm.status = ''
  handleSearch()
}

const handleCreate = () => {
  isEdit.value = false
  Object.assign(form, {
    id: '',
    customerId: '',
    warehouseId: warehouses.value[0]?.id || '',
    orderDate: new Date().toISOString().slice(0, 10),
    remark: '',
    items: []
  })
  dialogVisible.value = true
  if (form.warehouseId) loadWarehouseStock(form.warehouseId)
}

const handleEdit = (row) => {
  isEdit.value = true
  stockOutApi.get(row.id).then(res => {
    Object.assign(form, res)
    dialogVisible.value = true
    loadWarehouseStock(res.warehouseId)
  })
}

// 确认出库（核心：库存扣减 + SN状态更新）
const handleConfirmOut = async (row) => {
  try {
    await ElMessageBox.confirm(
      `确认出库此单据？\n单号：${row.orderNo}\n金额：¥${row.totalAmount?.toFixed(2)}`,
      '确认出库',
      { type: 'warning' }
    )

    loading.value = true
    // 调用确认出库接口（后端会自动扣减库存、更新SN状态）
    await stockOutApi.confirm(row.id)
    ElMessage.success('出库确认成功')

    // 自动推送应收账单
    try {
      await pushReceivableToFinance(row)
      ElMessage.success('应收账单已推送至账款管理')
    } catch (e) {
      console.warn('应收账单推送失败:', e)
      ElMessage.warning('出库成功，但应收账单推送失败，请稍后手动推送')
    }

    loadData()
  } catch (e) {
    if (e !== 'cancel') {
      ElMessage.error('出库确认失败：' + (e.message || e))
    }
  } finally {
    loading.value = false
  }
}

// 推送应收账单到账款管理
const handlePushReceivable = async (row) => {
  try {
    await ElMessageBox.confirm(
      `确认推送应收账单？\n单号：${row.orderNo}\n金额：¥${row.totalAmount?.toFixed(2)}`,
      '推送应收',
      { type: 'warning' }
    )

    loading.value = true
    await pushReceivableToFinance(row)
    ElMessage.success('应收账单已推送至账款管理')
    loadData()
  } catch (e) {
    if (e !== 'cancel') {
      ElMessage.error('推送失败：' + (e.message || e))
    }
  } finally {
    loading.value = false
  }
}

// 执行应收账单推送
const pushReceivableToFinance = async (row) => {
  // 获取客户信息
  const customer = customers.value.find(c => c.id === row.customerId)
  if (!customer) {
    throw new Error('客户信息不存在')
  }
  if (!customer.customerCode) {
    throw new Error('客户未配置编码，无法推送应收单')
  }

  // 获取商品明细
  let items = []
  try {
    const detailRes = await stockOutApi.getItems(row.id)
    items = detailRes.data || detailRes || []
  } catch (e) {
    console.warn('获取出库明细失败:', e)
  }

  // 转换为统一推送格式
  const billItems = items.map(item => ({
    productCode: item.productCode || item.product_code || '',
    productName: item.productName || item.product_name || '',
    quantity: item.quantity || 1,
    price: parseFloat(item.price) || 0
  }))

  const payload = buildReceivablePayload({
    customerCode: customer.customerCode,
    billCode: row.orderNo,
    billDate: row.orderDate || new Date().toISOString().split('T')[0],
    items: billItems,
    upSysId: String(row.id),
    remark: row.remark || '销售出库自动生成'
  })

  // 调用账款管理应收单推送接口
  return pushReceivable(payload)
}

const handleDelete = async (row) => {
  // 已完成的单据不能删除
  if (row.status === 'COMPLETED') {
    ElMessage.warning('已完成的单据不能删除')
    return
  }

  try {
    await ElMessageBox.confirm('确认删除此单据?', '警告', { type: 'warning' })
    await stockOutApi.delete(row.id)
    ElMessage.success('删除成功')
    loadData()
  } catch (e) {
    if (e !== 'cancel') ElMessage.error('删除失败')
  }
}

const handleCustomerChange = (customerId) => {
  // 可根据客户填充默认信息
}

const addItem = () => {
  form.items.push({
    productId: '',
    productCode: '',
    productName: '',
    availableStock: 0,
    unit: '台',
    quantity: 1,
    price: 0,
    amount: 0,
    snCodes: [],
    needSn: true
  })
}

const removeItem = (index) => {
  form.items.splice(index, 1)
}

const handleProductChange = (productId, row) => {
  const product = availableProducts.value.find(p => p.id === productId)
  if (product) {
    row.productCode = product.productCode
    row.productName = product.productName
    row.availableStock = product.availableStock
    row.unit = '台'
    row.price = product.salePrice || 0
    row.needSn = product.needSn !== false
    row.snCodes = []
  }
}

const handleQuantityChange = (val, row) => {
  row.quantity = val || 0
}

const handlePriceChange = (val, row) => {
  row.price = val || 0
}

const calculateTotal = () => {
  return form.items.reduce((sum, item) => {
    return sum + (item.quantity || 0) * (item.price || 0)
  }, 0).toFixed(2)
}

const openSnDialog = async (row, index) => {
  currentItemIndex.value = index
  selectedSnCodes.value = [...(row.snCodes || [])]

  try {
    // 获取该仓库该商品的可用SN码
    const res = await snApi.getByWarehouseAndProduct(form.warehouseId, row.productId)
    // 只显示INSTOCK状态的SN码
    warehouseSnList.value = res.filter(sn => sn.status === 'INSTOCK')
    snDialogVisible.value = true
  } catch (e) {
    ElMessage.error('加载SN码失败')
  }
}

const handleSnSelectionChange = (selection) => {
  selectedSnCodes.value = selection.map(sn => sn.snCode)
}

const confirmSnSelection = () => {
  const current = currentItem.value
  if (!current) return

  // 检查选择的数量是否匹配
  if (selectedSnCodes.value.length !== current.quantity) {
    ElMessage.warning(`需要选择 ${current.quantity} 个SN码，当前选择了 ${selectedSnCodes.value.length} 个`)
    return
  }

  current.snCodes = [...selectedSnCodes.value]
  snDialogVisible.value = false
  ElMessage.success('SN码选择完成')
}

const getStatusType = (status) => {
  const map = { PENDING: 'warning', PARTIAL: 'info', COMPLETED: 'success' }
  return map[status] || 'info'
}

const getStatusText = (status) => {
  const map = { PENDING: '待出库', PARTIAL: '部分出库', COMPLETED: '已完成' }
  return map[status] || status
}

const handleSave = async () => {
  // 校验库存
  const stockIssues = form.items.filter(item => {
    if (!item.productId || !item.needSn) return false
    return (item.availableStock || 0) < (item.quantity || 0)
  })

  if (stockIssues.length > 0) {
    ElMessage.error('部分商品库存不足，请调整数量')
    return
  }

  // 校验SN码
  const snIssues = form.items.filter(item => {
    if (!item.productId || !item.needSn) return false
    return (item.snCodes?.length || 0) !== item.quantity
  })

  if (snIssues.length > 0) {
    ElMessage.error('部分商品的SN码数量不匹配，请检查')
    return
  }

  try {
    await formRef.value.validate()

    loading.value = true
    const submitData = {
      ...form,
      totalAmount: calculateTotal(),
      items: form.items.map(item => ({
        productId: item.productId,
        productCode: item.productCode,
        productName: item.productName,
        unit: item.unit,
        quantity: item.quantity,
        price: item.price,
        amount: (item.quantity || 0) * (item.price || 0),
        snCodes: item.snCodes || []
      }))
    }

    if (isEdit.value) {
      await stockOutApi.update(submitData)
      ElMessage.success('更新成功')
    } else {
      await stockOutApi.create(submitData)
      ElMessage.success('创建成功')
    }

    dialogVisible.value = false
    loadData()
  } catch (e) {
    if (e !== 'cancel') {
      ElMessage.error('保存失败：' + (e.message || e))
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.stock-out {
  padding: 16px;
}

.filter-card {
  margin-bottom: 16px;
}

.pagination {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

.total-amount {
  font-size: 20px;
  font-weight: bold;
  color: #409eff;
}

.sn-tips {
  background: #f5f7fa;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 4px;
}

.sn-tips p {
  margin: 4px 0;
  color: #606266;
}

.stock-warning {
  margin-top: 12px;
}

.text-danger {
  color: #f56c6c;
  font-weight: bold;
}

.text-muted {
  color: #909399;
}
</style>
