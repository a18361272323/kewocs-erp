<template>
  <div class="page-container">
    <!-- 搜索表单 -->
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="货品">
          <el-select v-model="searchForm.productId" placeholder="选择货品" clearable filterable style="width: 200px">
            <el-option v-for="item in productList" :key="item.id" :label="item.productName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="仓库">
          <el-select v-model="searchForm.warehouseId" placeholder="选择仓库" clearable style="width: 150px">
            <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouseName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="库存状态">
          <el-select v-model="searchForm.stockStatus" placeholder="选择状态" clearable style="width: 120px">
            <el-option label="有库存" value="HAS_STOCK" />
            <el-option label="库存不足" value="LOW_STOCK" />
            <el-option label="无库存" value="NO_STOCK" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
          <el-button :icon="Refresh" @click="handleReset">重置</el-button>
          <el-button :icon="Download" @click="handleExport">导出</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 汇总信息 -->
    <div class="summary-cards">
      <el-card class="summary-card">
        <div class="summary-item">
          <div class="summary-label">货品种类</div>
          <div class="summary-value">{{ summary.totalProducts }}</div>
        </div>
      </el-card>
      <el-card class="summary-card">
        <div class="summary-item">
          <div class="summary-label">总库存数量</div>
          <div class="summary-value">{{ summary.totalQuantity }}</div>
        </div>
      </el-card>
      <el-card class="summary-card">
        <div class="summary-item">
          <div class="summary-label">库存金额</div>
          <div class="summary-value amount">¥{{ formatMoney(summary.totalAmount) }}</div>
        </div>
      </el-card>
    </div>

    <!-- 数据表格 -->
    <el-table v-loading="loading" :data="tableData" border stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column prop="productCode" label="货品编码" width="120" />
      <el-table-column prop="productName" label="货品名称" min-width="180" />
      <el-table-column prop="warehouseName" label="仓库" width="120" />
      <el-table-column prop="productCategory" label="分类" width="100" align="center">
        <template #default="{ row }">
          <el-tag size="small">{{ getCategoryText(row.productCategory) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="unit" label="单位" width="60" align="center" />
      <el-table-column prop="quantity" label="库存数量" width="100" align="center">
        <template #default="{ row }">
          <span :class="{ 'low-stock': row.quantity < 10 }">{{ row.quantity }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="costPrice" label="成本价" width="100" align="right">
        <template #default="{ row }">
          ¥{{ formatMoney(row.costPrice) }}
        </template>
      </el-table-column>
      <el-table-column prop="stockAmount" label="库存金额" width="120" align="right">
        <template #default="{ row }">
          ¥{{ formatMoney(row.stockAmount) }}
        </template>
      </el-table-column>
      <el-table-column prop="hasSn" label="SN码" width="80" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.hasSn === 1" type="success" size="small">需要</el-tag>
          <el-tag v-else type="info" size="small">不需要</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" fixed="right" align="center">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleDetail(row)">详情</el-button>
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

    <!-- 详情弹窗 -->
    <el-dialog v-model="detailVisible" title="库存明细" width="900px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="货品">{{ currentItem.productName }}</el-descriptions-item>
        <el-descriptions-item label="货品编码">{{ currentItem.productCode }}</el-descriptions-item>
        <el-descriptions-item label="仓库">{{ currentItem.warehouseName }}</el-descriptions-item>
        <el-descriptions-item label="分类">{{ getCategoryText(currentItem.productCategory) }}</el-descriptions-item>
        <el-descriptions-item label="库存数量">{{ currentItem.quantity }}</el-descriptions-item>
        <el-descriptions-item label="成本价">¥{{ formatMoney(currentItem.costPrice) }}</el-descriptions-item>
      </el-descriptions>

      <el-divider>SN码明细</el-divider>

      <el-table v-if="currentItem.hasSn === 1" :data="snList" border max-height="300">
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="sn" label="SN码" width="180" />
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getSnStatusType(row.status)" size="small">
              {{ getSnStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="customerName" label="客户" width="150">
          <template #default="{ row }">
            {{ row.customerName || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="stockInTime" label="入库时间" width="160">
          <template #default="{ row }">
            {{ row.stockInTime ? formatDate(row.stockInTime) : '-' }}
          </template>
        </el-table-column>
      </el-table>
      <div v-else class="no-sn">该货品不需要SN码</div>

      <template #footer>
        <el-button @click="detailVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, Refresh, Download } from '@element-plus/icons-vue'
import { formatDate, formatMoney } from '@/utils/format'
import { getInventoryList, getStockSnList, getProductSimpleList, getWarehouseSimpleList, exportInventory } from '@/api'

// 表格数据
const loading = ref(false)
const tableData = ref([])
const snList = ref([])
const productList = ref([])
const warehouseList = ref([])

// 汇总
const summary = reactive({
  totalProducts: 0,
  totalQuantity: 0,
  totalAmount: 0
})

// 搜索表单
const searchForm = reactive({
  productId: null,
  warehouseId: null,
  stockStatus: null
})

// 分页
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0
})

// 详情弹窗
const detailVisible = ref(false)
const currentItem = ref({})

// 加载数据
async function loadData() {
  loading.value = true
  try {
    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize
    }
    if (searchForm.productId) params.product_id = searchForm.productId
    if (searchForm.warehouseId) params.warehouse_id = searchForm.warehouseId

    const res = await getInventoryList(params)
    if (res.code === 'SUC0000') {
      tableData.value = res.body?.list || []
      pagination.total = res.body?.total || 0
      // 更新汇总
      if (res.body?.summary) {
        summary.totalProducts = res.body.summary.totalProducts || 0
        summary.totalQuantity = res.body.summary.totalQuantity || 0
        summary.totalAmount = res.body.summary.totalAmount || 0
      }
    }
  } catch (error) {
    console.error('加载库存列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 加载基础数据
async function loadBaseData() {
  const [productRes, warehouseRes] = await Promise.all([
    getProductSimpleList(),
    getWarehouseSimpleList()
  ])
  
  if (productRes.code === 'SUC0000') productList.value = productRes.body || []
  if (warehouseRes.code === 'SUC0000') warehouseList.value = warehouseRes.body || []
}

// 搜索
function handleSearch() {
  pagination.current = 1
  loadData()
}

// 重置
function handleReset() {
  searchForm.productId = null
  searchForm.warehouseId = null
  searchForm.stockStatus = null
  handleSearch()
}

// 导出
async function handleExport() {
  try {
    await exportInventory(searchForm)
    ElMessage.success('导出成功')
  } catch (error) {
    ElMessage.error('导出失败')
  }
}

// 详情
async function handleDetail(row) {
  currentItem.value = row
  detailVisible.value = true
  
  if (row.hasSn === 1) {
    try {
      const res = await getStockSnList({
        productId: row.productId,
        warehouseId: row.warehouseId
      })
      if (res.code === 'SUC0000') {
        snList.value = res.body?.list || []
      }
    } catch (error) {
      console.error('加载SN码列表失败:', error)
    }
  }
}

// 分类文本
function getCategoryText(category) {
  const map = {
    ROBOT: '扫地机器人',
    WASHER: '洗地机',
    AIR: '空气净化器',
    ACCESSORY: '配件'
  }
  return map[category] || category
}

// SN状态类型
function getSnStatusType(status) {
  const map = {
    PURCHASED: 'warning',
    INSTOCK: 'success',
    SOLD: 'primary',
    RETURN: 'info'
  }
  return map[status] || 'info'
}

// SN状态文本
function getSnStatusText(status) {
  const map = {
    PURCHASED: '已采购',
    INSTOCK: '已入库',
    SOLD: '已销售',
    RETURN: '已退货'
  }
  return map[status] || status
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

.summary-cards {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.summary-card {
  flex: 1;
}

.summary-item {
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

.summary-value.amount {
  color: #67c23a;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.low-stock {
  color: #f56c6c;
  font-weight: bold;
}

.no-sn {
  text-align: center;
  color: #909399;
  padding: 40px 0;
}
</style>
