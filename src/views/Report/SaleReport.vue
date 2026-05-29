<template>
  <div class="page-container">
    <!-- 搜索表单 -->
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="销售日期">
          <el-date-picker v-model="searchForm.dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="YYYY-MM-DD" style="width: 280px" />
        </el-form-item>
        <el-form-item label="客户">
          <el-select v-model="searchForm.customerId" placeholder="选择客户" clearable filterable style="width: 180px">
            <el-option v-for="item in customerList" :key="item.id" :label="item.customerName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="商品">
          <el-select v-model="searchForm.productId" placeholder="选择商品" clearable filterable style="width: 180px">
            <el-option v-for="item in productList" :key="item.id" :label="item.productName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="仓库">
          <el-select v-model="searchForm.warehouseId" placeholder="选择仓库" clearable style="width: 180px">
            <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouseName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="handleReset">重置</el-button>
          <el-button type="success" :icon="Download" @click="handleExport">导出</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 汇总卡片 -->
    <el-row :gutter="20" class="summary-row">
      <el-col :span="6">
        <el-card class="summary-card">
          <div class="summary-label">销售总金额</div>
          <div class="summary-value">¥{{ formatMoney(summary.totalAmount) }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="summary-card">
          <div class="summary-label">已收款金额</div>
          <div class="summary-value">¥{{ formatMoney(summary.receivedAmount) }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="summary-card">
          <div class="summary-label">未收款金额</div>
          <div class="summary-value" style="color: #f56c6c">¥{{ formatMoney(summary.unpaidAmount) }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="summary-card">
          <div class="summary-label">销售笔数</div>
          <div class="summary-value">{{ summary.orderCount }} 笔</div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 数据表格 -->
    <el-table v-loading="loading" :data="reportList" border stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column prop="orderNo" label="销售单号" width="200" />
      <el-table-column prop="orderDate" label="销售日期" width="120" />
      <el-table-column prop="customerName" label="客户" min-width="150" />
      <el-table-column prop="warehouseName" label="出货仓库" width="120" />
      <el-table-column prop="productName" label="商品" min-width="150" />
      <el-table-column prop="specification" label="规格" width="100" />
      <el-table-column prop="quantity" label="数量" width="80" align="right" />
      <el-table-column prop="unitPrice" label="单价" width="120" align="right">
        <template #default="{ row }">
          ¥{{ formatMoney(row.unitPrice) }}
        </template>
      </el-table-column>
      <el-table-column prop="totalAmount" label="金额" width="120" align="right">
        <template #default="{ row }">
          <strong>¥{{ formatMoney(row.totalAmount) }}</strong>
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
    </el-table>

    <!-- 分页 -->
    <el-pagination v-model:current-page="pagination.current" v-model:page-size="pagination.pageSize" :page-sizes="[10, 20, 50, 100]" :total="pagination.total" layout="total, sizes, prev, pager, next, jumper" class="pagination-container" @size-change="handleSizeChange" @current-change="handlePageChange" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, Refresh, Download } from '@element-plus/icons-vue'
import { stockOutApi } from '@/api'
import { getCustomerSimpleList, getProductSimpleList, getWarehouseSimpleList } from '@/api'
import { useAppStore } from '@/stores/app'
import { formatMoney } from '@/utils/format'

const appStore = useAppStore()
const loading = ref(false)
const reportList = ref([])
const customerList = ref([])
const productList = ref([])
const warehouseList = ref([])

const searchForm = reactive({
  dateRange: [],
  customerId: null,
  productId: null,
  warehouseId: null
})

const summary = reactive({
  totalAmount: 0,
  receivedAmount: 0,
  unpaidAmount: 0,
  orderCount: 0
})

const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0
})

const loadCustomerList = async () => {
  try {
    const res = await getCustomerSimpleList()
    if (res.returnCode === 'SUC0000') customerList.value = res.body.list || []
  } catch (e) { console.error(e) }
}

const loadProductList = async () => {
  try {
    const res = await getProductSimpleList()
    if (res.returnCode === 'SUC0000') productList.value = res.body.list || []
  } catch (e) { console.error(e) }
}

const loadWarehouseList = async () => {
  try {
    const res = await getWarehouseSimpleList()
    if (res.returnCode === 'SUC0000') warehouseList.value = res.body.list || []
  } catch (e) { console.error(e) }
}

const loadReport = async () => {
  loading.value = true
  try {
    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize
    }
    if (searchForm.dateRange?.length === 2) {
      params.order_date_start = searchForm.dateRange[0]
      params.order_date_end = searchForm.dateRange[1]
    }
    if (searchForm.customerId) params.customer_id = searchForm.customerId
    if (searchForm.productId) params.product_id = searchForm.productId
    if (searchForm.warehouseId) params.warehouse_id = searchForm.warehouseId

    const res = await stockOutApi.getList(params)
    if (res.returnCode === 'SUC0000') {
      reportList.value = res.body.list || []
      pagination.total = res.body.total || 0
      calculateSummary(res.body.list || [])
    } else {
      ElMessage.error(res.returnMessage || '查询失败')
    }
  } catch (error) {
    console.error('加载报表失败:', error)
    ElMessage.error('加载报表失败')
  } finally {
    loading.value = false
  }
}

const calculateSummary = (list) => {
  summary.totalAmount = list.reduce((sum, item) => sum + (item.totalAmount || 0), 0)
  summary.receivedAmount = list.reduce((sum, item) => sum + (item.receivedAmount || 0), 0)
  summary.unpaidAmount = list.reduce((sum, item) => sum + (item.unpaidAmount || 0), 0)
  summary.orderCount = list.length
}

const getStatusType = (status) => {
  const map = {
    DRAFT: 'info',
    CONFIRMED: 'success',
    PARTIAL_OUT: 'warning',
    OUT_STOCK: 'success',
    PAID: 'success'
  }
  return map[status] || 'info'
}

const getStatusText = (status) => {
  const map = {
    DRAFT: '草稿',
    CONFIRMED: '已确认',
    PARTIAL_OUT: '部分出库',
    OUT_STOCK: '已出库',
    PAID: '已收款'
  }
  return map[status] || status
}

const handleSearch = () => {
  pagination.current = 1
  loadReport()
}

const handleReset = () => {
  searchForm.dateRange = []
  searchForm.customerId = null
  searchForm.productId = null
  searchForm.warehouseId = null
  pagination.current = 1
  loadReport()
}

const handleExport = () => {
  // 导出功能占位
  ElMessage.info('导出功能开发中')
}

const handleSizeChange = (val) => {
  pagination.pageSize = val
  pagination.current = 1
  loadReport()
}

const handlePageChange = (val) => {
  pagination.current = val
  loadReport()
}

onMounted(() => {
  loadCustomerList()
  loadProductList()
  loadWarehouseList()
  loadReport()
})
</script>

<style scoped>
.page-container {
  padding: 20px;
}

.search-card {
  margin-bottom: 20px;
}

.summary-row {
  margin-bottom: 20px;
}

.summary-card {
  text-align: center;
}

.summary-label {
  font-size: 14px;
  color: #909399;
  margin-bottom: 8px;
}

.summary-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}

.pagination-container {
  margin-top: 20px;
  justify-content: flex-end;
}
</style>