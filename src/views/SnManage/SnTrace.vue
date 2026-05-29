<template>
  <div class="page-container">
    <!-- 搜索表单 -->
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="SN码">
          <el-input v-model="searchForm.snCode" placeholder="输入SN码查询" clearable style="width: 200px" @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="商品">
          <el-select v-model="searchForm.productId" placeholder="选择商品" clearable filterable style="width: 180px">
            <el-option v-for="item in productList" :key="item.id" :label="item.productName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="选择状态" clearable style="width: 120px">
            <el-option label="已采购" value="PURCHASED" />
            <el-option label="在库" value="INSTOCK" />
            <el-option label="已销售" value="SOLD" />
            <el-option label="已退货" value="RETURN" />
            <el-option label="已报废" value="SCRAP" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
          <el-button :icon="Refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 数据表格 -->
    <el-table v-loading="loading" :data="snList" border stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column prop="snCode" label="SN码" width="200" fixed />
      <el-table-column prop="productName" label="商品名称" min-width="150" />
      <el-table-column prop="specification" label="规格" width="120" />
      <el-table-column prop="model" label="型号" width="120" />
      <el-table-column prop="status" label="当前状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="warehouseName" label="所在仓库" width="120" />
      <el-table-column prop="purchasePrice" label="采购价" width="120" align="right">
        <template #default="{ row }">
          <span v-if="row.purchasePrice">¥{{ formatMoney(row.purchasePrice) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="inDate" label="入库时间" width="160" />
      <el-table-column prop="outDate" label="出库时间" width="160" />
      <el-table-column prop="customerName" label="当前客户" width="120" />
      <el-table-column label="操作" width="100" fixed="right" align="center">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleTrace(row)">追溯</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination v-model:current-page="pagination.current" v-model:page-size="pagination.pageSize" :page-sizes="[10, 20, 50]" :total="pagination.total" layout="total, sizes, prev, pager, next, jumper" class="pagination-container" @size-change="handleSizeChange" @current-change="handlePageChange" />

    <!-- 追溯详情弹窗 -->
    <el-dialog v-model="traceVisible" :title="`SN码追溯 - ${currentSn?.snCode}`" width="800px" append-to-body>
      <el-timeline v-if="traceList.length">
        <el-timeline-item v-for="(item, index) in traceList" :key="index" :type="getTimelineType(item.actionType)" :timestamp="item.createTime">
          <el-card>
            <div class="trace-item">
              <div class="trace-header">
                <el-tag :type="getTimelineType(item.actionType)">{{ item.actionName }}</el-tag>
                <span class="trace-operator">操作人：{{ item.operatorName }}</span>
              </div>
              <div class="trace-content">
                <p v-if="item.orderNo"><strong>单号：</strong>{{ item.orderNo }}</p>
                <p v-if="item.warehouseName"><strong>仓库：</strong>{{ item.warehouseName }}</p>
                <p v-if="item.customerName"><strong>客户：</strong>{{ item.customerName }}</p>
                <p v-if="item.supplierName"><strong>供应商：</strong>{{ item.supplierName }}</p>
                <p v-if="item.remark"><strong>备注：</strong>{{ item.remark }}</p>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <el-empty v-else description="暂无追溯记录" />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, Refresh } from '@element-plus/icons-vue'
import { snApi } from '@/api'
import { getProductSimpleList } from '@/api'
import { useAppStore } from '@/stores/app'
import { formatMoney } from '@/utils/format'

const appStore = useAppStore()
const loading = ref(false)
const snList = ref([])
const productList = ref([])
const traceVisible = ref(false)
const currentSn = ref(null)
const traceList = ref([])

const searchForm = reactive({
  snCode: '',
  productId: null,
  status: ''
})

const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0
})

// 加载商品列表
const loadProductList = async () => {
  try {
    const res = await getProductSimpleList()
    if (res.returnCode === 'SUC0000') {
      productList.value = res.body.list || []
    }
  } catch (error) {
    console.error('加载商品列表失败:', error)
  }
}

// 加载SN列表
const loadSnList = async () => {
  loading.value = true
  try {
    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize
    }
    if (searchForm.snCode) params.sn_code = searchForm.snCode
    if (searchForm.productId) params.product_id = searchForm.productId
    if (searchForm.status) params.status = searchForm.status

    const res = await snApi.getList(params)
    if (res.returnCode === 'SUC0000') {
      snList.value = res.body.list || []
      pagination.total = res.body.total || 0
    } else {
      ElMessage.error(res.returnMessage || '查询失败')
    }
  } catch (error) {
    console.error('加载SN列表失败:', error)
    ElMessage.error('加载SN列表失败')
  } finally {
    loading.value = false
  }
}

// 查询追溯记录
const handleTrace = async (row) => {
  currentSn.value = row
  try {
    const res = await snApi.getLogList({
      sn_code: row.snCode,
      current: 1,
      pageSize: 100
    })
    if (res.returnCode === 'SUC0000') {
      traceList.value = res.body.list || []
      traceVisible.value = true
    }
  } catch (error) {
    console.error('加载追溯记录失败:', error)
    ElMessage.error('加载追溯记录失败')
  }
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

const getTimelineType = (action) => {
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

const handleSearch = () => {
  pagination.current = 1
  loadSnList()
}

const handleReset = () => {
  searchForm.snCode = ''
  searchForm.productId = null
  searchForm.status = ''
  pagination.current = 1
  loadSnList()
}

const handleSizeChange = (val) => {
  pagination.pageSize = val
  pagination.current = 1
  loadSnList()
}

const handlePageChange = (val) => {
  pagination.current = val
  loadSnList()
}

onMounted(() => {
  loadProductList()
  loadSnList()
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

.trace-item {
  padding: 5px 0;
}

.trace-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.trace-operator {
  color: #909399;
  font-size: 13px;
}

.trace-content p {
  margin: 4px 0;
  font-size: 13px;
  color: #606266;
}

.trace-content p strong {
  color: #303133;
}
</style>