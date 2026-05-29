<template>
  <div class="page-container">
    <el-card class="sync-card">
      <div class="sync-bar">
        <div class="sync-left">
          <el-button type="primary" :icon="Refresh" :loading="syncing" @click="handleSync">
            {{ syncing ? '同步中...' : '同步仓库' }}
          </el-button>
          <span v-if="lastSyncTime" class="sync-time">最后同步：{{ lastSyncTime }}</span>
          <span v-else class="sync-hint">点击按钮从账款管理同步最新数据</span>
        </div>
        <el-tag type="info">共 {{ pagination.total }} 条</el-tag>
      </div>
    </el-card>

    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="仓库名称">
          <el-input v-model="searchForm.warehouseName" placeholder="输入仓库名称" clearable style="width: 180px" @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="仓库类型">
          <el-select v-model="searchForm.warehouseType" placeholder="选择类型" clearable style="width: 120px">
            <el-option label="实体仓" value="PHYSICAL" />
            <el-option label="虚拟仓" value="VIRTUAL" />
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
      <el-table-column prop="warehouseCode" label="仓库编码" width="120" />
      <el-table-column prop="warehouseName" label="仓库名称" min-width="150" />
      <el-table-column prop="warehouseType" label="类型" width="100" align="center">
        <template #default="{ row }">
          <el-tag size="small" :type="row.warehouseType === 'PHYSICAL' ? 'success' : 'warning'">
            {{ row.warehouseType === 'PHYSICAL' ? '实体仓' : '虚拟仓' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="contact" label="负责人" width="100" />
      <el-table-column prop="contactPhone" label="联系电话" width="140" />
      <el-table-column prop="address" label="地址" min-width="200" show-overflow-tooltip />
      <el-table-column prop="remark" label="备注" min-width="150" show-overflow-tooltip />
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
import { warehouseApi } from '@/api'

const loading = ref(false)
const syncing = ref(false)
const lastSyncTime = ref(localStorage.getItem('bd_sync_warehouse') || '')
const tableData = ref([])

const searchForm = reactive({
  warehouseName: '',
  warehouseType: null
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
    if (searchForm.warehouseName) params.warehouse_name = searchForm.warehouseName
    if (searchForm.warehouseType) params.warehouse_type = searchForm.warehouseType

    const res = await warehouseApi.list(params)
    if (res.code === 'SUC0000') {
      tableData.value = res.body?.list || []
      pagination.total = res.body?.total || 0
    }
  } catch (error) {
    console.error('加载仓库列表失败:', error)
  } finally {
    loading.value = false
  }
}

function handleSearch() { pagination.current = 1; loadData() }
function handleReset() { searchForm.warehouseName = ''; searchForm.warehouseType = null; handleSearch() }

async function handleSync() {
  syncing.value = true
  try {
    ElMessage.info('同步接口待配置，当前仅刷新列表')
    await loadData()
    const now = new Date().toLocaleString('zh-CN')
    lastSyncTime.value = now
    localStorage.setItem('bd_sync_warehouse', now)
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