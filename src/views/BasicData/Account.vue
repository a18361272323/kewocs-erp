<template>
  <div class="page-container">
    <el-card class="sync-card">
      <div class="sync-bar">
        <div class="sync-left">
          <el-button type="primary" :icon="Refresh" :loading="syncing" @click="handleSync">
            {{ syncing ? '同步中...' : '同步账户' }}
          </el-button>
          <span v-if="lastSyncTime" class="sync-time">最后同步：{{ lastSyncTime }}</span>
          <span v-else class="sync-hint">点击按钮从账款管理同步最新数据</span>
        </div>
        <el-tag type="info">共 {{ pagination.total }} 条</el-tag>
      </div>
    </el-card>

    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="账户名称">
          <el-input v-model="searchForm.accountName" placeholder="输入账户名称" clearable style="width: 180px" @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="账户类型">
          <el-select v-model="searchForm.accountType" placeholder="选择类型" clearable style="width: 120px">
            <el-option label="现金" value="CASH" />
            <el-option label="银行" value="BANK" />
            <el-option label="微信" value="WECHAT" />
            <el-option label="支付宝" value="ALIPAY" />
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
      <el-table-column prop="accountName" label="账户名称" min-width="150" />
      <el-table-column prop="accountType" label="账户类型" width="100" align="center">
        <template #default="{ row }">
          <el-tag size="small">{{ row.accountType || '-' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="accountNo" label="账号" width="180" />
      <el-table-column prop="bankName" label="开户行" width="150" />
      <el-table-column prop="balance" label="余额" width="130" align="right">
        <template #default="{ row }">¥{{ (row.balance || 0).toLocaleString() }}</template>
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
import { accountApi } from '@/api'
import { syncAllAccounts } from '@/api/financeSync'

const loading = ref(false)
const syncing = ref(false)
const lastSyncTime = ref(localStorage.getItem('bd_sync_account') || '')
const tableData = ref([])

const searchForm = reactive({
  accountName: '',
  accountType: null
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
    if (searchForm.accountName) params.account_name = searchForm.accountName
    if (searchForm.accountType) params.account_type = searchForm.accountType

    const res = await accountApi.list(params)
    if (res.code === 'SUC0000') {
      tableData.value = res.body?.list || []
      pagination.total = res.body?.total || 0
    }
  } catch (error) {
    console.error('加载账户列表失败:', error)
  } finally {
    loading.value = false
  }
}

function handleSearch() { pagination.current = 1; loadData() }
function handleReset() { searchForm.accountName = ''; searchForm.accountType = null; handleSearch() }

async function handleSync() {
  syncing.value = true
  try {
    const res = await syncAllAccounts()
    if (res.returnCode === 'SUC0000') {
      ElMessage.success('同步成功，影响 ' + (res.body?.effectedRows || 0) + ' 条记录')
      const now = new Date().toLocaleString('zh-CN')
      lastSyncTime.value = now
      localStorage.setItem('bd_sync_account', now)
      await loadData()
    } else {
      ElMessage.error(res.errorMsg || '同步失败')
    }
  } catch (error) {
    console.error('同步失败:', error)
    ElMessage.error('同步失败：' + (error.message || '网络错误'))
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