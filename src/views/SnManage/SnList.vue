<template>
  <div class="page-container">
    <!-- 搜索表单 -->
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="SN码">
          <el-input v-model="searchForm.sn" placeholder="输入SN码" clearable style="width: 180px" @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="货品">
          <el-select v-model="searchForm.productId" placeholder="选择货品" clearable style="width: 180px">
            <el-option v-for="item in productList" :key="item.id" :label="item.productName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="仓库">
          <el-select v-model="searchForm.warehouseId" placeholder="选择仓库" clearable style="width: 180px">
            <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouseName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.snStatus" placeholder="选择状态" clearable style="width: 120px">
            <el-option label="已采购" value="PURCHASED" />
            <el-option label="已入库" value="INSTOCK" />
            <el-option label="已销售" value="SOLD" />
            <el-option label="已退货" value="RETURN" />
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
        <el-button v-if="hasPermission('sn:export')" type="success" :icon="Download" @click="handleExport">导出</el-button>
      </div>
      <div class="toolbar-right">
        <el-tag type="info">共 {{ pagination.total }} 条记录</el-tag>
      </div>
    </div>

    <!-- 数据表格 -->
    <el-table
      v-loading="loading"
      :data="snList"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column prop="sn" label="SN码" width="180" fixed />
      <el-table-column prop="productName" label="货品名称" min-width="150" />
      <el-table-column prop="productCode" label="货品编码" width="120" />
      <el-table-column prop="warehouseName" label="所在仓库" width="120" />
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)" size="small">
            {{ getStatusText(row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="stockInTime" label="入库时间" width="160">
        <template #default="{ row }">
          {{ row.stockInTime ? formatDate(row.stockInTime) : '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="customerName" label="客户" width="150">
        <template #default="{ row }">
          {{ row.customerName || '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="saleTime" label="销售时间" width="160">
        <template #default="{ row }">
          {{ row.saleTime ? formatDate(row.saleTime) : '-' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right" align="center">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleTrace(row)">追溯</el-button>
          <el-button v-if="row.status === 'SOLD'" type="warning" link @click="handleReturn(row)">退货</el-button>
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

    <!-- SN追溯弹窗 -->
    <el-dialog v-model="traceVisible" title="SN码追溯" width="900px">
      <div class="sn-info">
        <el-descriptions :column="3" border>
          <el-descriptions-item label="SN码">{{ currentSn.sn }}</el-descriptions-item>
          <el-descriptions-item label="货品名称">{{ currentSn.productName }}</el-descriptions-item>
          <el-descriptions-item label="货品编码">{{ currentSn.productCode }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <el-table :data="traceList" border style="margin-top: 20px">
        <el-table-column type="index" label="步骤" width="60" align="center" />
        <el-table-column prop="operationType" label="操作类型" width="100">
          <template #default="{ row }">
            <el-tag>{{ getOperationText(row.operationType) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="fromWarehouseName" label="来源仓库" width="120">
          <template #default="{ row }">
            {{ row.fromWarehouseName || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="toWarehouseName" label="目标仓库" width="120">
          <template #default="{ row }">
            {{ row.toWarehouseName || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="orderNo" label="关联单据" width="180" />
        <el-table-column prop="operator" label="操作人" width="100" />
        <el-table-column prop="operateTime" label="操作时间" width="160">
          <template #default="{ row }">
            {{ formatDate(row.operateTime) }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 退货弹窗 -->
    <el-dialog v-model="returnVisible" title="SN码退货" width="500px">
      <el-form ref="returnFormRef" :model="returnForm" :rules="returnRules" label-width="100px">
        <el-form-item label="SN码">
          <el-input v-model="currentSn.sn" disabled />
        </el-form-item>
        <el-form-item label="货品">
          <el-input v-model="currentSn.productName" disabled />
        </el-form-item>
        <el-form-item label="客户">
          <el-input v-model="currentSn.customerName" disabled />
        </el-form-item>
        <el-form-item label="退货原因" prop="returnReason">
          <el-input
            v-model="returnForm.returnReason"
            type="textarea"
            :rows="3"
            placeholder="请输入退货原因"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="returnVisible = false">取消</el-button>
        <el-button type="primary" @click="handleReturnSubmit">确认退货</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, Download } from '@element-plus/icons-vue'
import { formatDate } from '@/utils/format'
import { getSnList, getSnTrace, doSnReturn, getProductSimpleList, getWarehouseSimpleList, exportSnList } from '@/api'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

// 列表数据
const loading = ref(false)
const snList = ref([])
const productList = ref([])
const warehouseList = ref([])

// 搜索表单
const searchForm = reactive({
  sn: '',
  productId: null,
  warehouseId: null,
  snStatus: null
})

// 分页
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0
})

// 追溯弹窗
const traceVisible = ref(false)
const currentSn = ref({})
const traceList = ref([])

// 退货弹窗
const returnVisible = ref(false)
const returnFormRef = ref()
const returnForm = reactive({
  returnReason: ''
})
const returnRules = {
  returnReason: [{ required: true, message: '请输入退货原因', trigger: 'blur' }]
}

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
    if (searchForm.sn) params.sn_code = searchForm.sn
    if (searchForm.productId) params.product_id = searchForm.productId
    if (searchForm.warehouseId) params.warehouse_id = searchForm.warehouseId
    if (searchForm.snStatus) params.status = searchForm.snStatus

    const res = await getSnList(params)
    if (res.code === 'SUC0000') {
      snList.value = res.body?.list || []
      pagination.total = res.body?.total || 0
    }
  } catch (error) {
    console.error('加载SN码列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 加载货品列表
async function loadProductList() {
  const res = await getProductSimpleList()
  if (res.code === 'SUC0000') {
    productList.value = res.body?.list || []
  }
}

// 加载仓库列表
async function loadWarehouseList() {
  const res = await getWarehouseSimpleList()
  if (res.code === 'SUC0000') {
    warehouseList.value = res.body?.list || []
  }
}

// 搜索
function handleSearch() {
  pagination.current = 1
  loadData()
}

// 重置
function handleReset() {
  searchForm.sn = ''
  searchForm.productId = null
  searchForm.warehouseId = null
  searchForm.snStatus = null
  handleSearch()
}

// 导出
async function handleExport() {
  try {
    await exportSnList(searchForm)
    ElMessage.success('导出成功')
  } catch (error) {
    ElMessage.error('导出失败')
  }
}

// 追溯
async function handleTrace(row) {
  currentSn.value = row
  traceVisible.value = true
  
  try {
    const res = await getSnTrace({ sn: row.sn })
    if (res.code === 'SUC0000') {
      traceList.value = res.body?.list || []
    }
  } catch (error) {
    console.error('加载追溯记录失败:', error)
  }
}

// 退货
function handleReturn(row) {
  currentSn.value = { ...row }
  returnForm.returnReason = ''
  returnVisible.value = true
}

// 提交退货
async function handleReturnSubmit() {
  try {
    await returnFormRef.value.validate()
    
    await ElMessageBox.confirm('确认要退货该SN码吗？', '提示', {
      type: 'warning'
    })
    
    const res = await doSnReturn({
      snIds: JSON.stringify([currentSn.value.id]),
      returnReason: returnForm.returnReason
    })
    
    if (res.code === 'SUC0000') {
      ElMessage.success('退货成功')
      returnVisible.value = false
      loadData()
    } else {
      ElMessage.error(res.errorMsg || '退货失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('退货失败:', error)
    }
  }
}

// 状态类型
function getStatusType(status) {
  const map = {
    PURCHASED: 'warning',
    INSTOCK: 'success',
    SOLD: 'primary',
    RETURN: 'danger'
  }
  return map[status] || 'info'
}

// 状态文本
function getStatusText(status) {
  const map = {
    PURCHASED: '已采购',
    INSTOCK: '已入库',
    SOLD: '已销售',
    RETURN: '已退货',
    SCRAP: '已报废'
  }
  return map[status] || status
}

// 操作类型文本
function getOperationText(type) {
  const map = {
    PURCHASE: '采购入库',
    STOCK_IN: '入库',
    STOCK_OUT: '出库',
    SALE: '销售',
    RETURN: '退货',
    TRANSFER: '调拨'
  }
  return map[type] || type
}

onMounted(() => {
  loadData()
  loadProductList()
  loadWarehouseList()
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

.sn-info {
  margin-bottom: 10px;
}
</style>
