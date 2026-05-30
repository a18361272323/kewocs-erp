<template>
  <div class="page-container">
    <!-- 搜索表单 -->
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="付款单号">
          <el-input v-model="searchForm.orderNo" placeholder="输入单号" clearable style="width: 180px" @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="供应商">
          <el-select v-model="searchForm.supplierId" placeholder="选择供应商" clearable filterable style="width: 180px">
            <el-option v-for="item in supplierList" :key="item.id" :label="item.supplierName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="付款账户">
          <el-select v-model="searchForm.accountId" placeholder="选择账户" clearable style="width: 180px">
            <el-option v-for="item in accountList" :key="item.id" :label="item.accountName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="付款日期">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
            style="width: 240px"
          />
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
        <el-button v-if="hasPermission('payment:create')" type="primary" :icon="Plus" @click="handleCreate">新增付款</el-button>
      </div>
      <div class="toolbar-right">
        <el-tag type="info">共 {{ pagination.total }} 条记录</el-tag>
      </div>
    </div>

    <!-- 数据表格 -->
    <el-table v-loading="loading" :data="orderList" border stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column prop="orderNo" label="付款单号" width="200" />
      <el-table-column prop="supplierName" label="供应商" min-width="150" />
      <el-table-column prop="accountName" label="付款账户" width="120" />
      <el-table-column prop="paymentDate" label="付款日期" width="120" />
      <el-table-column prop="paymentAmount" label="付款金额" width="120" align="right">
        <template #default="{ row }">
          <span class="amount">¥{{ formatMoney(row.paymentAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="paymentMethod" label="付款方式" width="100" align="center">
        <template #default="{ row }">
          <el-tag size="small">{{ getPaymentMethodText(row.paymentMethod) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" min-width="150" show-overflow-tooltip />
      <el-table-column prop="creator" label="创建人" width="100" />
      <el-table-column prop="createdAt" label="创建时间" width="160">
        <template #default="{ row }">
          {{ formatDate(row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right" align="center">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleDetail(row)">查看</el-button>
          <el-button v-if="hasPermission('payment:delete')" type="danger" link @click="handleDelete(row)">删除</el-button>
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

    <!-- 新增弹窗 -->
    <el-dialog
      v-model="formVisible"
      title="新增付款"
      width="600px"
      :close-on-click-modal="false"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="供应商" prop="supplierId">
          <el-select v-model="form.supplierId" placeholder="选择供应商" filterable style="width: 100%" @change="handleSupplierChange">
            <el-option v-for="item in supplierList" :key="item.id" :label="item.supplierName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="付款账户" prop="accountId">
          <el-select v-model="form.accountId" placeholder="选择付款账户" style="width: 100%">
            <el-option v-for="item in accountList" :key="item.id" :label="`${item.accountName}（余额：¥${formatMoney(item.balance)}）`" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="付款日期" prop="paymentDate">
          <el-date-picker
            v-model="form.paymentDate"
            type="date"
            placeholder="选择日期"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="付款方式" prop="paymentMethod">
          <el-select v-model="form.paymentMethod" placeholder="选择付款方式" style="width: 100%">
            <el-option label="现金" value="CASH" />
            <el-option label="银行转账" value="BANK_TRANSFER" />
            <el-option label="微信" value="WECHAT" />
            <el-option label="支付宝" value="ALIPAY" />
            <el-option label="承兑汇票" value="DRAFT" />
          </el-select>
        </el-form-item>
        <el-form-item label="付款金额" prop="paymentAmount">
          <el-input-number v-model="form.paymentAmount" :min="0.01" :precision="2" style="width: 100%" />
        </el-form-item>
        <el-form-item label="关联入库单">
          <el-select v-model="form.stockInOrderId" placeholder="选择入库单(可选)" clearable style="width: 100%" @change="handleStockInChange">
            <el-option v-for="item in stockInList" :key="item.id" :label="`${item.orderNo}（待付：¥${formatMoney(item.pendingAmount)}）`" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="formVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认付款</el-button>
      </template>
    </el-dialog>

    <!-- 详情弹窗 -->
    <el-dialog v-model="detailVisible" title="付款详情" width="600px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="付款单号">{{ currentOrder.orderNo }}</el-descriptions-item>
        <el-descriptions-item label="付款日期">{{ currentOrder.paymentDate }}</el-descriptions-item>
        <el-descriptions-item label="供应商">{{ currentOrder.supplierName }}</el-descriptions-item>
        <el-descriptions-item label="付款账户">{{ currentOrder.accountName }}</el-descriptions-item>
        <el-descriptions-item label="付款方式">{{ getPaymentMethodText(currentOrder.paymentMethod) }}</el-descriptions-item>
        <el-descriptions-item label="付款金额">
          <span class="amount">¥{{ formatMoney(currentOrder.paymentAmount) }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="关联入库单">{{ currentOrder.stockInOrderNo || '-' }}</el-descriptions-item>
        <el-descriptions-item label="创建人">{{ currentOrder.creator }}</el-descriptions-item>
        <el-descriptions-item label="备注" :span="2">{{ currentOrder.remark || '-' }}</el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <el-button @click="detailVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, Plus } from '@element-plus/icons-vue'
import { formatDate, formatMoney } from '@/utils/format'
import { paymentApi, getSupplierSimpleList, getAccountSimpleList, getStockInPendingList, createPayment } from '@/api'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

// 列表数据
const loading = ref(false)
const orderList = ref([])
const supplierList = ref([])
const accountList = ref([])
const stockInList = ref([])

// 搜索表单
const searchForm = reactive({
  orderNo: '',
  supplierId: null,
  accountId: null,
  dateRange: null
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
const form = reactive({
  supplierId: null,
  supplierName: '',
  accountId: null,
  paymentDate: '',
  paymentMethod: 'BANK_TRANSFER',
  paymentAmount: 0,
  stockInOrderId: null,
  remark: ''
})

const rules = {
  supplierId: [{ required: true, message: '请选择供应商', trigger: 'change' }],
  accountId: [{ required: true, message: '请选择付款账户', trigger: 'change' }],
  paymentDate: [{ required: true, message: '请选择付款日期', trigger: 'change' }],
  paymentMethod: [{ required: true, message: '请选择付款方式', trigger: 'change' }],
  paymentAmount: [{ required: true, message: '请输入付款金额', trigger: 'blur' }]
}

// 详情弹窗
const detailVisible = ref(false)
const currentOrder = ref({})

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
    if (searchForm.supplierId) params.supplier_id = searchForm.supplierId
    if (searchForm.accountId) params.account_id = searchForm.accountId
    if (searchForm.dateRange && searchForm.dateRange.length === 2) {
      params.order_date_start = searchForm.dateRange[0]
      params.order_date_end = searchForm.dateRange[1]
    }

    const res = await paymentApi.list(params)
    if (res.code === 'SUC0000') {
      orderList.value = res.body?.list || []
      pagination.total = res.body?.total || 0
    }
  } catch (error) {
    console.error('加载付款单列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 加载基础数据
async function loadBaseData() {
  const [supplierRes, accountRes, stockInRes] = await Promise.all([
    getSupplierSimpleList(),
    getAccountSimpleList(),
    getStockInPendingList()
  ])
  
  if (supplierRes.code === 'SUC0000') supplierList.value = supplierRes.body?.list || []
  if (accountRes.code === 'SUC0000') accountList.value = accountRes.body?.list || []
  if (stockInRes.code === 'SUC0000') stockInList.value = stockInRes.body?.list || []
}

// 搜索
function handleSearch() {
  pagination.current = 1
  loadData()
}

// 重置
function handleReset() {
  searchForm.orderNo = ''
  searchForm.supplierId = null
  searchForm.accountId = null
  searchForm.dateRange = null
  handleSearch()
}

// 新增
function handleCreate() {
  form.supplierId = null
  form.supplierName = ''
  form.accountId = accountList.value.length > 0 ? accountList.value[0].id : null
  form.paymentDate = new Date().toISOString().split('T')[0]
  form.paymentMethod = 'BANK_TRANSFER'
  form.paymentAmount = 0
  form.stockInOrderId = null
  form.remark = ''
  formVisible.value = true
}

// 供应商选择变化
function handleSupplierChange(supplierId) {
  const supplier = supplierList.value.find(s => s.id === supplierId)
  if (supplier) {
    form.supplierName = supplier.supplierName
  }
}

// 入库单选择变化
function handleStockInChange(stockInOrderId) {
  if (!stockInOrderId) {
    form.paymentAmount = 0
    return
  }
  const order = stockInList.value.find(o => o.id === stockInOrderId)
  if (order) {
    // 默认填入待付款金额
    form.paymentAmount = order.pendingAmount
  }
}

// 提交
async function handleSubmit() {
  try {
    await formRef.value.validate()
    
    const res = await createPayment(form)
    if (res.code === 'SUC0000') {
      ElMessage.success('付款成功')
      formVisible.value = false
      loadData()
    } else {
      ElMessage.error(res.errorMsg || '付款失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('付款失败:', error)
    }
  }
}

// 查看详情
function handleDetail(row) {
  currentOrder.value = row
  detailVisible.value = true
}

// 删除
async function handleDelete(row) {
  try {
    await ElMessageBox.confirm('确认要删除该付款单吗？', '提示', { type: 'warning' })
    
    const res = await paymentApi.delete(row.id)
    if (res.code === 'SUC0000') {
      ElMessage.success('删除成功')
      loadData()
    } else {
      ElMessage.error(res.errorMsg || '删除失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除失败:', error)
    }
  }
}

// 付款方式文本
function getPaymentMethodText(method) {
  const map = {
    CASH: '现金',
    BANK_TRANSFER: '银行转账',
    WECHAT: '微信',
    ALIPAY: '支付宝',
    DRAFT: '承兑汇票'
  }
  return map[method] || method
}

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

.amount {
  color: #f56c6c;
  font-weight: bold;
}
</style>
