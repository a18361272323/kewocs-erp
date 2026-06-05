<template>
  <div class="page-container">
    <!-- 搜索表单 -->
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="付款单号">
          <el-input v-model="searchForm.order_no" placeholder="输入单号" clearable style="width: 180px" @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="供应商">
          <el-select v-model="searchForm.supplier_id" placeholder="选择供应商" clearable filterable style="width: 180px">
            <el-option v-for="item in supplierList" :key="item.id" :label="item.supplier_name" :value="item.id" />
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
      <el-table-column prop="flow_no" label="付款单号" width="200" />
      <el-table-column prop="counterparty_name" label="供应商" min-width="150" />
      <el-table-column label="付款账户" width="120" />
      <el-table-column prop="bill_date" label="付款日期" width="120" />
      <el-table-column prop="amount" label="付款金额" width="120" align="right">
        <template #default="{ row }">
          <span class="amount">¥{{ formatMoney(row.amount) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="biz_type" label="付款方式" width="100" align="center">
        <template #default="{ row }">
          <el-tag size="small">{{ getPaymentMethodText(row.biz_type) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" min-width="150" show-overflow-tooltip />
      <el-table-column prop="creator" label="创建人" width="100" />
      <el-table-column prop="created_at" label="创建时间" width="160">
        <template #default="{ row }">
          {{ formatDate(row.created_at) }}
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
        <el-form-item label="供应商" prop="supplier_id">
          <el-select v-model="form.supplier_id" placeholder="选择供应商" filterable style="width: 100%" @change="handleSupplierChange">
            <el-option v-for="item in supplierList" :key="item.id" :label="item.supplier_name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="付款账户" prop="account_id">
          <el-select v-model="form.account_id" placeholder="选择付款账户" style="width: 100%">
            <el-option v-for="item in accountList" :key="item.id" :label="`${item.account_name}（余额：¥${formatMoney(item.current_balance)}）`" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="付款日期" prop="bill_date">
          <el-date-picker
            v-model="form.bill_date"
            type="date"
            placeholder="选择日期"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="付款方式" prop="biz_type">
          <el-select v-model="form.biz_type" placeholder="选择付款方式" style="width: 100%">
            <el-option label="现金" value="CASH" />
            <el-option label="银行转账" value="BANK_TRANSFER" />
            <el-option label="微信" value="WECHAT" />
            <el-option label="支付宝" value="ALIPAY" />
            <el-option label="承兑汇票" value="DRAFT" />
          </el-select>
        </el-form-item>
        <el-form-item label="付款金额" prop="amount">
          <el-input-number v-model="form.amount" :min="0.01" :precision="2" style="width: 100%" />
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
        <el-descriptions-item label="付款单号">{{ currentOrder.flow_no }}</el-descriptions-item>
        <el-descriptions-item label="付款日期">{{ currentOrder.bill_date }}</el-descriptions-item>
        <el-descriptions-item label="供应商">{{ currentOrder.counterparty_name }}</el-descriptions-item>
        <el-descriptions-item label="付款账户">{{ '' }}</el-descriptions-item>
        <el-descriptions-item label="付款方式">{{ getPaymentMethodText(currentOrder.biz_type) }}</el-descriptions-item>
        <el-descriptions-item label="付款金额">
          <span class="amount">¥{{ formatMoney(currentOrder.amount) }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="关联入库单">{{ currentOrder.source_no || '-' }}</el-descriptions-item>
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
import { paymentApi, getSupplierSimpleList, getAccountSimpleList, createPayment } from '@/api'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

// 列表数据
const loading = ref(false)
const orderList = ref([])
const supplierList = ref([])
const accountList = ref([])

// 搜索表单
const searchForm = reactive({
  order_no: '',
  supplier_id: null,
  account_id: null,
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
  supplier_id: null,
  supplier_name: '',
  account_id: null,
  bill_date: '',
  biz_type: 'BANK_TRANSFER',
  amount: 0,
  remark: ''
})

const rules = {
  supplier_id: [{ required: true, message: '请选择供应商', trigger: 'change' }],
  account_id: [{ required: true, message: '请选择付款账户', trigger: 'change' }],
  bill_date: [{ required: true, message: '请选择付款日期', trigger: 'change' }],
  biz_type: [{ required: true, message: '请选择付款方式', trigger: 'change' }],
  amount: [{ required: true, message: '请输入付款金额', trigger: 'blur' }]
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
    if (searchForm.order_no) params.order_no = searchForm.order_no
    if (searchForm.supplier_id) params.counterparty_id = searchForm.supplier_id
    params.biz_type = 'PAY'
    if (searchForm.dateRange && searchForm.dateRange.length === 2) {
      params.bill_date_start = searchForm.dateRange[0]
      params.bill_date_end = searchForm.dateRange[1]
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
  const [supplierRes, accountRes] = await Promise.all([
    getSupplierSimpleList(),
    getAccountSimpleList(),
  ])
  
  if (supplierRes.code === 'SUC0000') supplierList.value = supplierRes.body?.list || []
  if (accountRes.code === 'SUC0000') accountList.value = accountRes.body?.list || []
}

// 搜索
function handleSearch() {
  pagination.current = 1
  loadData()
}

// 重置
function handleReset() {
  searchForm.order_no = ''
  searchForm.supplier_id = null
  searchForm.dateRange = null
  handleSearch()
}

// 新增
function handleCreate() {
  form.supplier_id = null
  form.supplier_name = ''
  form.account_id = accountList.value.length > 0 ? accountList.value[0].id : null
  form.bill_date = new Date().toISOString().split('T')[0]
  form.biz_type = 'BANK_TRANSFER'
  form.amount = 0
  form.remark = ''
  formVisible.value = true
}

// 供应商选择变化
function handleSupplierChange(supplier_id) {
  const supplier = supplierList.value.find(s => s.id === supplier_id)
  if (supplier) {
    form.supplier_name = supplier.supplier_name
  }
}


// 提交
async function handleSubmit() {
  try {
    await formRef.value.validate()
    
    const data = {
      source_type: 'PURCHASE_PAYMENT',
      counterparty_id: form.supplier_id,
      counterparty_name: form.supplier_name,
      counterparty_type: 'SUPPLIER',
      biz_type: form.biz_type,
      amount: form.amount,
      paid_amount: form.amount,
      balance_amount: 0,
      bill_date: form.bill_date,
      remark: form.remark
    }

    const res = await createPayment(data)
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
