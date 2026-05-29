<template>
  <div class="page-container">
    <!-- 搜索表单 -->
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="仓库">
          <el-select v-model="searchForm.warehouseId" placeholder="选择仓库" clearable filterable style="width: 180px">
            <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouseName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="商品">
          <el-select v-model="searchForm.productId" placeholder="选择商品" clearable filterable style="width: 180px">
            <el-option v-for="item in productList" :key="item.id" :label="item.productName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="品牌">
          <el-input v-model="searchForm.brand" placeholder="输入品牌" clearable style="width: 140px" @keyup.enter="handleSearch" />
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
          <div class="summary-label">库存SKU数</div>
          <div class="summary-value">{{ summary.skuCount }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="summary-card">
          <div class="summary-label">库存总数量</div>
          <div class="summary-value">{{ summary.totalQuantity }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="summary-card">
          <div class="summary-label">库存总金额</div>
          <div class="summary-value">¥{{ formatMoney(summary.totalAmount) }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="summary-card">
          <div class="summary-label">库存告警数</div>
          <div class="summary-value" style="color: #f56c6c">{{ summary.warningCount }}</div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 数据表格 -->
    <el-table v-loading="loading" :data="reportList" border stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column prop="warehouseName" label="仓库" width="120" />
      <el-table-column prop="productCode" label="商品编码" width="120" />
      <el-table-column prop="productName" label="商品名称" min-width="150" />
      <el-table-column prop="specification" label="规格" width="100" />
      <el-table-column prop="model" label="型号" width="100" />
      <el-table-column prop="brand" label="品牌" width="100" />
      <el-table-column prop="stockQuantity" label="库存数量" width="100" align="right">
        <template #default="{ row }">
          <el-tag :type="row.stockQuantity <= row.minStock ? 'danger' : row.stockQuantity <= row.minStock * 1.5 ? 'warning' : 'success'">
            {{ row.stockQuantity }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="minStock" label="安全库存" width="100" align="right" />
      <el-table-column prop="maxStock" label="最大库存" width="100" align="right" />
      <el-table-column prop="costPrice" label="成本价" width="120" align="right">
        <template #default="{ row }">
          ¥{{ formatMoney(row.costPrice) }}
        </template>
      </el-table-column>
      <el-table-column prop="stockAmount" label="库存金额" width="120" align="right">
        <template #default="{ row }">
          <strong>¥{{ formatMoney(row.stockAmount) }}</strong>
        </template>
      </el-table-column>
      <el-table-column prop="lastInDate" label="最近入库" width="160" />
      <el-table-column prop="lastOutDate" label="最近出库" width="160" />
    </el-table>

    <!-- 分页 -->
    <el-pagination v-model:current-page="pagination.current" v-model:page-size="pagination.pageSize" :page-sizes="[10, 20, 50, 100]" :total="pagination.total" layout="total, sizes, prev, pager, next, jumper" class="pagination-container" @size-change="handleSizeChange" @current-change="handlePageChange" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, Refresh, Download } from '@element-plus/icons-vue'
import { inventoryApi } from '@/api'
import { getProductSimpleList, getWarehouseSimpleList } from '@/api'
import { useAppStore } from '@/stores/app'
import { formatMoney } from '@/utils/format'

const appStore = useAppStore()
const loading = ref(false)
const reportList = ref([])
const productList = ref([])
const warehouseList = ref([])

const searchForm = reactive({
  warehouseId: null,
  productId: null,
  brand: ''
})

const summary = reactive({
  skuCount: 0,
  totalQuantity: 0,
  totalAmount: 0,
  warningCount: 0
})

const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0
})

const loadProductList = async () => {
  try {
    const res = await getProductSimpleList()
    if (res.code === 'SUC0000') productList.value = res.body.list || []
  } catch (e) { console.error(e) }
}

const loadWarehouseList = async () => {
  try {
    const res = await getWarehouseSimpleList()
    if (res.code === 'SUC0000') warehouseList.value = res.body.list || []
  } catch (e) { console.error(e) }
}

const loadReport = async () => {
  loading.value = true
  try {
    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize
    }
    if (searchForm.warehouseId) params.warehouse_id = searchForm.warehouseId
    if (searchForm.productId) params.product_id = searchForm.productId
    if (searchForm.brand) params.brand = searchForm.brand

    const res = await inventoryApi.getList(params)
    if (res.code === 'SUC0000') {
      reportList.value = res.body.list || []
      pagination.total = res.body.total || 0
      calculateSummary(res.body.list || [])
    } else {
      ElMessage.error(res.returnMessage || '查询失败')
    }
  } catch (error) {
    console.error('加载库存报表失败:', error)
    ElMessage.error('加载库存报表失败')
  } finally {
    loading.value = false
  }
}

const calculateSummary = (list) => {
  summary.skuCount = list.length
  summary.totalQuantity = list.reduce((sum, item) => sum + (item.stockQuantity || 0), 0)
  summary.totalAmount = list.reduce((sum, item) => sum + (item.stockAmount || 0), 0)
  summary.warningCount = list.filter(item => (item.stockQuantity || 0) <= (item.minStock || 0)).length
}

const handleSearch = () => {
  pagination.current = 1
  loadReport()
}

const handleReset = () => {
  searchForm.warehouseId = null
  searchForm.productId = null
  searchForm.brand = ''
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