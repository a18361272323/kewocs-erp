<template>
  <div class="page-container">
    <el-card class="sync-card">
      <div class="sync-bar">
        <div class="sync-left">
          <el-button type="primary" :icon="Refresh" :loading="syncing" @click="handleSync">
            {{ syncing ? '同步中...' : '同步商品' }}
          </el-button>
          <span v-if="lastSyncTime" class="sync-time">最后同步：{{ lastSyncTime }}</span>
          <span v-else class="sync-hint">点击按钮从账款管理同步最新数据</span>
        </div>
        <el-tag type="info">共 {{ pagination.total }} 条</el-tag>
      </div>
    </el-card>

    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="货品名称">
          <el-input v-model="searchForm.productName" placeholder="输入货品名称" clearable style="width: 180px" @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="货品编码">
          <el-input v-model="searchForm.productCode" placeholder="输入货品编码" clearable style="width: 150px" @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="searchForm.category" placeholder="选择分类" clearable style="width: 150px">
            <el-option label="扫地机器人" value="ROBOT" />
            <el-option label="洗地机" value="WASHER" />
            <el-option label="空气净化器" value="AIR" />
            <el-option label="配件" value="ACCESSORY" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
          <el-button :icon="RefreshRight" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-table v-loading="loading" :data="tableData" border stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column prop="productCode" label="货品编码" width="140" />
      <el-table-column prop="productName" label="货品名称" min-width="180" />
      <el-table-column prop="category" label="分类" width="120" align="center">
        <template #default="{ row }">
          <el-tag size="small">{{ row.category || '-' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="model" label="型号" width="120" />
      <el-table-column prop="unit" label="单位" width="80" align="center" />
      <el-table-column prop="price" label="标准售价" width="110" align="right">
        <template #default="{ row }">¥{{ row.price || 0 }}</template>
      </el-table-column>
      <el-table-column prop="isSnManaged" label="SN码管理" width="110" align="center">
        <template #default="{ row }">
          <el-tag size="small" :type="row.isSnManaged === 1 ? 'success' : 'info'">
            {{ row.isSnManaged === 1 ? '是' : '否' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" min-width="120" show-overflow-tooltip />
    </el-table>

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
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, Refresh, RefreshRight } from '@element-plus/icons-vue'
import { productApi } from '@/api'

const loading = ref(false)
const syncing = ref(false)
const lastSyncTime = ref(localStorage.getItem('bd_sync_product') || '')
const tableData = ref([])

const searchForm = reactive({
  productName: '',
  productCode: '',
  category: null
})

const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0
})

async function loadData() {
  loading.value = true
  try {
    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      isDelete: 0
    }
    if (searchForm.productName) params.product_name = searchForm.productName
    if (searchForm.productCode) params.product_code = searchForm.productCode
    if (searchForm.category) params.category = searchForm.category

    const res = await productApi.list(params)
    if (res.code === 'SUC0000') {
      tableData.value = res.body?.list || []
      pagination.total = res.body?.total || 0
    }
  } catch (error) {
    console.error('加载商品列表失败:', error)
  } finally {
    loading.value = false
  }
}

function handleSearch() { pagination.current = 1; loadData() }
function handleReset() { searchForm.productName = ''; searchForm.productCode = ''; searchForm.category = null; handleSearch() }

async function handleSync() {
  syncing.value = true
  try {
    ElMessage.info('同步接口待配置，当前仅刷新列表')
    await loadData()
    const now = new Date().toLocaleString('zh-CN')
    lastSyncTime.value = now
    localStorage.setItem('bd_sync_product', now)
  } catch (error) {
    console.error('同步失败:', error)
    ElMessage.error('同步失败')
  } finally {
    syncing.value = false
  }
}

onMounted(() => { loadData() })
</script>

<style scoped>
.page-container { padding: 0; }
.sync-card { margin-bottom: 15px; }
.sync-bar { display: flex; justify-content: space-between; align-items: center; }
.sync-left { display: flex; align-items: center; gap: 12px; }
.sync-time { color: #909399; font-size: 13px; }
.sync-hint { color: #c0c4cc; font-size: 13px; }
.search-card { margin-bottom: 15px; }
.pagination { margin-top: 20px; display: flex; justify-content: flex-end; }
</style>