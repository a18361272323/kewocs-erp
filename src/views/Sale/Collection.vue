<template>
  <div class="page-container">
    <el-card class="search-card">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="销售单号">
          <el-input v-model="searchForm.orderNo" placeholder="输入销售单号" clearable />
        </el-form-item>
        <el-form-item label="客户">
          <el-select v-model="searchForm.customerId" placeholder="选择客户" clearable filterable style="width: 180px">
            <el-option v-for="item in customerList" :key="item.id" :label="item.customerName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="收款账户">
          <el-select v-model="searchForm.accountId" placeholder="选择账户" clearable style="width: 180px">
            <el-option v-for="item in accountList" :key="item.id" :label="item.accountName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="收款日期">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <div class="table-toolbar">
        <div class="toolbar-left">
          <h3>收款单列表</h3>
        </div>
        <div class="toolbar-right">
          <el-alert
            title="提示：正式回款请在账款管理中操作，回款数据将通过连接器自动同步至本系统"
            type="info"
            :closable="false"
            show-icon
            style="max-width: 500px"
          />
        </div>
      </div>

      <el-table :data="tableData" v-loading="loading" border stripe>
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="collectionNo" label="收款单号" width="160" />
        <el-table-column prop="customerName" label="客户名称" width="150" />
        <el-table-column prop="collectionDate" label="收款日期" width="120" />
        <el-table-column prop="paymentMethod" label="收款方式" width="120">
          <template #default="{ row }">
            <el-tag>{{ getPaymentMethodText(row.paymentMethod) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="collectionAmount" label="收款金额" width="120" align="right">
          <template #default="{ row }">
            <span class="amount">¥{{ formatMoney(row.collectionAmount) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="accountName" label="收款账户" width="150" />
        <el-table-column prop="saleOrderNo" label="关联销售单" width="160" />
        <el-table-column prop="remark" label="备注" min-width="150" show-overflow-tooltip />
        <el-table-column label="操作" width="80" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleDetail(row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          v-model:current-page="pagination.current"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 详情弹窗 -->
    <el-dialog v-model="detailVisible" title="收款单详情" width="600px">
      <el-descriptions :column="2" border v-if="currentOrder">
        <el-descriptions-item label="收款单号">{{ currentOrder.collectionNo }}</el-descriptions-item>
        <el-descriptions-item label="收款日期">{{ currentOrder.collectionDate }}</el-descriptions-item>
        <el-descriptions-item label="客户">{{ currentOrder.customerName }}</el-descriptions-item>
        <el-descriptions-item label="收款账户">{{ currentOrder.accountName }}</el-descriptions-item>
        <el-descriptions-item label="收款方式">
          <el-tag>{{ getPaymentMethodText(currentOrder.paymentMethod) }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="收款金额">
          <span class="amount">¥{{ formatMoney(currentOrder.collectionAmount) }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="关联销售单">{{ currentOrder.saleOrderNo || '-' }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ currentOrder.createdAt }}</el-descriptions-item>
        <el-descriptions-item label="备注" :span="2">{{ currentOrder.remark || '-' }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { formatMoney } from '@/utils/format'
import {
  collectionApi,
  getCustomerSimpleList,
  getAccountSimpleList,
  getSalePendingList
} from '@/api'

const loading = ref(false)
const tableData = ref([])

const searchForm = reactive({
  orderNo: '',
  customerId: null,
  accountId: null,
  dateRange: null
})

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

const customerList = ref([])
const accountList = ref([])

const detailVisible = ref(false)
const currentOrder = ref(null)

// 加载收款单列表
async function loadData() {
  loading.value = true
  try {
    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize
    }
    if (searchForm.orderNo) params.source_no = searchForm.orderNo
    if (searchForm.customerId) params.counterparty_id = searchForm.customerId
    if (searchForm.accountId) params.biz_type = searchForm.accountId
    if (searchForm.dateRange && searchForm.dateRange.length === 2) {
      params.bill_date_start = searchForm.dateRange[0]
      params.bill_date_end = searchForm.dateRange[1]
    }

    const res = await collectionApi.list(params)
    console.log('[Collection] API响应:', res)

    // 兼容多种成功响应格式
    const isSuccess = res.code === 'SUC0000' || res.code === 0 || res.code === 200 || res.returnCode === 'SUC0000'
    if (isSuccess) {
      // 兼容 body / data 两种字段名
      const payload = res.body || res.data || {}
      tableData.value = payload.list || payload.items || []
      pagination.total = payload.total || payload.totalCount || payload.totalSize || 0
    } else {
      ElMessage.error(res.errorMsg || res.message || res.returnMsg || '加载收款单列表失败')
    }
  } catch (error) {
    console.error('加载收款单列表失败:', error)
    ElMessage.error('加载收款单列表失败')
  } finally {
    loading.value = false
  }
}

// 加载基础数据
async function loadBaseData() {
  const [customerRes, accountRes] = await Promise.all([
    getCustomerSimpleList(),
    getAccountSimpleList()
  ])
  
  const isOk = (r) => r.code === 'SUC0000' || r.code === 0 || r.code === 200 || r.returnCode === 'SUC0000'
  if (isOk(customerRes)) customerList.value = customerRes.body || customerRes.data || []
  if (isOk(accountRes)) accountList.value = accountRes.body || accountRes.data || []
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
  searchForm.accountId = null
  searchForm.dateRange = null
  handleSearch()
}

// 查看详情
function handleDetail(row) {
  currentOrder.value = row
  detailVisible.value = true
}

// 分页
function handleSizeChange(val) {
  pagination.pageSize = val
  loadData()
}

function handleCurrentChange(val) {
  pagination.current = val
  loadData()
}

// 收款方式文本
function getPaymentMethodText(method) {
  const map = {
    CASH: '现金',
    BANK_TRANSFER: '银行转账',
    WECHAT: '微信',
    ALIPAY: '支付宝',
    POS: 'POS机'
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
  color: #67c23a;
  font-weight: bold;
}
</style>
