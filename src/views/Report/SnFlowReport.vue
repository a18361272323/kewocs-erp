<template>
  <div class="page-container">
    <!-- 搜索表单 -->
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="SN码">
          <el-input v-model="searchForm.snCode" placeholder="输入SN码" clearable style="width: 200px" @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="操作类型">
          <el-select v-model="searchForm.actionType" placeholder="选择类型" clearable style="width: 140px">
            <el-option label="采购入库" value="STOCK_IN" />
            <el-option label="销售出库" value="STOCK_OUT" />
            <el-option label="退货" value="RETURN" />
            <el-option label="调拨" value="TRANSFER" />
            <el-option label="盘点" value="CHECK" />
            <el-option label="报废" value="SCRAP" />
          </el-select>
        </el-form-item>
        <el-form-item label="操作时间">
          <el-date-picker v-model="searchForm.dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="YYYY-MM-DD" style="width: 280px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="handleReset">重置</el-button>
          <el-button type="success" :icon="Download" @click="handleExport">导出</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 数据表格 -->
    <el-table v-loading="loading" :data="reportList" border stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column prop="snCode" label="SN码" width="200" fixed />
      <el-table-column prop="productName" label="商品名称" min-width="150" />
      <el-table-column prop="actionName" label="操作类型" width="120" align="center">
        <template #default="{ row }">
          <el-tag :type="getActionType(row.actionType)">{{ row.actionName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="orderNo" label="关联单号" width="200" />
      <el-table-column prop="fromWarehouseName" label="调出仓库" width="120" />
      <el-table-column prop="toWarehouseName" label="调入仓库" width="120" />
      <el-table-column prop="customerName" label="客户" width="120" />
      <el-table-column prop="supplierName" label="供应商" width="120" />
      <el-table-column prop="status" label="操作后状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operatorName" label="操作人" width="100" />
      <el-table-column prop="createTime" label="操作时间" width="160" />
      <el-table-column prop="remark" label="备注" min-width="200" show-overflow-tooltip />
    </el-table>

    <!-- 分页 -->
    <el-pagination v-model:current-page="pagination.current" v-model:page-size="pagination.pageSize" :page-sizes="[10, 20, 50, 100]" :total="pagination.total" layout="total, sizes, prev, pager, next, jumper" class="pagination-container" @size-change="handleSizeChange" @current-change="handlePageChange" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, Refresh, Download } from '@element-plus/icons-vue'
import { snApi } from '@/api'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const loading = ref(false)
const reportList = ref([])

const searchForm = reactive({
  snCode: '',
  actionType: '',
  dateRange: []
})

const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0
})

const loadReport = async () => {
  loading.value = true
  try {
    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize
    }
    if (searchForm.snCode) params.sn_code = searchForm.snCode
    if (searchForm.actionType) params.action_type = searchForm.actionType
    if (searchForm.dateRange?.length === 2) {
      params.create_time_start = searchForm.dateRange[0]
      params.create_time_end = searchForm.dateRange[1]
    }

    const res = await snApi.getLogList(params)
    if (res.code === 'SUC0000') {
      reportList.value = res.body.list || []
      pagination.total = res.body.total || 0
    } else {
      ElMessage.error(res.returnMessage || '查询失败')
    }
  } catch (error) {
    console.error('加载SN流转报表失败:', error)
    ElMessage.error('加载SN流转报表失败')
  } finally {
    loading.value = false
  }
}

const getActionType = (action) => {
  const map = {
    STOCK_IN: 'success',
    STOCK_OUT: 'warning',
    RETURN: 'danger',
    CHECK: 'primary',
    TRANSFER: 'info',
    SCRAP: 'info'
  }
  return map[action] || 'info'
}

const getStatusType = (status) => {
  const map = {
    PURCHASED: 'info',
    INSTOCK: 'success',
    SOLD: 'warning',
    RETURN: 'danger',
    SCRAP: 'info'
  }
  return map[status] || 'info'
}

const getStatusText = (status) => {
  const map = {
    PURCHASED: '已采购',
    INSTOCK: '在库',
    SOLD: '已销售',
    RETURN: '已退货',
    SCRAP: '已报废'
  }
  return map[status] || status
}

const handleSearch = () => {
  pagination.current = 1
  loadReport()
}

const handleReset = () => {
  searchForm.snCode = ''
  searchForm.actionType = ''
  searchForm.dateRange = []
  pagination.current = 1
  loadReport()
}

const handleExport = () => {
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

.pagination-container {
  margin-top: 20px;
  justify-content: flex-end;
}
</style>