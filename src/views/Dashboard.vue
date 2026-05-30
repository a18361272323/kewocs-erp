<template>
  <div class="dashboard">
    <!-- Stats Row -->
    <div class="stats-row">
      <div class="stat-card animate-in stagger-1">
        <div class="stat-accent" style="background: var(--color-accent)"></div>
        <div class="stat-body">
          <div class="stat-icon-wrap" style="background: var(--color-accent-soft); color: var(--color-accent)">
            <el-icon :size="22"><Download /></el-icon>
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ stats.todayPurchase || 0 }}</div>
            <div class="stat-label">??????</div>
          </div>
        </div>
      </div>
      <div class="stat-card animate-in stagger-2">
        <div class="stat-accent" style="background: var(--color-success)"></div>
        <div class="stat-body">
          <div class="stat-icon-wrap" style="background: var(--color-success-soft); color: var(--color-success)">
            <el-icon :size="22"><Upload /></el-icon>
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ stats.todaySale || 0 }}</div>
            <div class="stat-label">??????</div>
          </div>
        </div>
      </div>
      <div class="stat-card animate-in stagger-3">
        <div class="stat-accent" style="background: var(--color-info)"></div>
        <div class="stat-body">
          <div class="stat-icon-wrap" style="background: var(--color-info-soft); color: var(--color-info)">
            <el-icon :size="22"><Box /></el-icon>
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ stats.totalSn || 0 }}</div>
            <div class="stat-label">SN???</div>
          </div>
        </div>
      </div>
      <div class="stat-card animate-in stagger-4">
        <div class="stat-accent" style="background: var(--color-danger)"></div>
        <div class="stat-body">
          <div class="stat-icon-wrap" style="background: var(--color-danger-soft); color: var(--color-danger)">
            <el-icon :size="22"><Coin /></el-icon>
          </div>
          <div class="stat-info">
            <div class="stat-value">¥{{ formatMoney(stats.pendingCollection || 0) }}</div>
            <div class="stat-label">???</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Today In / Out -->
    <div class="content-grid">
      <div class="content-card animate-in stagger-1">
        <div class="card-title-bar">
          <span class="card-title">??????</span>
          <el-button type="primary" link @click="navigateTo('/purchase/stockIn')">???? \u2192</el-button>
        </div>
        <el-table :data="todayInList" style="width: 100%" max-height="320" v-if="todayInList.length">
          <el-table-column prop="snCode" label="SN?" width="140" show-overflow-tooltip>
            <template #default="{ row }"><span class="mono">{{ row.snCode }}</span></template>
          </el-table-column>
          <el-table-column prop="productName" label="??" width="120" show-overflow-tooltip />
          <el-table-column prop="supplierName" label="???" width="100" show-overflow-tooltip />
          <el-table-column prop="inDate" label="????" width="110">
            <template #default="{ row }">{{ formatDate(row.inDate) }}</template>
          </el-table-column>
        </el-table>
        <div v-else class="empty-state">
          <div class="empty-icon">
            <el-icon :size="36"><Folder /></el-icon>
          </div>
          <p>????????</p>
        </div>
      </div>

      <div class="content-card animate-in stagger-2">
        <div class="card-title-bar">
          <span class="card-title">??????</span>
          <el-button type="primary" link @click="navigateTo('/sale/stockOut')">???? \u2192</el-button>
        </div>
        <el-table :data="todayOutList" style="width: 100%" max-height="320" v-if="todayOutList.length">
          <el-table-column prop="snCode" label="SN?" width="140" show-overflow-tooltip>
            <template #default="{ row }"><span class="mono">{{ row.snCode }}</span></template>
          </el-table-column>
          <el-table-column prop="productName" label="??" width="120" show-overflow-tooltip />
          <el-table-column prop="customerName" label="??" width="100" show-overflow-tooltip />
          <el-table-column prop="outDate" label="????" width="110">
            <template #default="{ row }">{{ formatDate(row.outDate) }}</template>
          </el-table-column>
        </el-table>
        <div v-else class="empty-state">
          <div class="empty-icon">
            <el-icon :size="36"><Folder /></el-icon>
          </div>
          <p>????????</p>
        </div>
      </div>
    </div>

    <!-- SN Flow -->
    <div class="content-card full-width animate-in stagger-3">
      <div class="card-title-bar">
        <span class="card-title">SN?????</span>
        <el-button type="primary" link @click="navigateTo('/sn/list')">???? \u2192</el-button>
      </div>
      <el-table :data="snLogList" style="width: 100%" v-if="snLogList.length">
        <el-table-column prop="snCode" label="SN?" width="150">
          <template #default="{ row }"><span class="mono">{{ row.snCode }}</span></template>
        </el-table-column>
        <el-table-column prop="productName" label="??" width="150" />
        <el-table-column prop="operationType" label="??" width="100">
          <template #default="{ row }">
            <el-tag size="small" :type="getOpTagType(row.operationType)">{{ getOperationText(row.operationType) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="orderNo" label="????" width="180" />
        <el-table-column prop="operator" label="???" width="100" />
        <el-table-column prop="operateTime" label="????" width="160">
          <template #default="{ row }">{{ formatDate(row.operateTime) }}</template>
        </el-table-column>
        <el-table-column prop="remark" label="??" min-width="150" show-overflow-tooltip />
      </el-table>
      <div v-else class="empty-state">
        <div class="empty-icon">
          <el-icon :size="36"><Folder /></el-icon>
        </div>
        <p>??????</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { Download, Upload, Box, Coin, Folder } from '@element-plus/icons-vue'
import { formatDate, formatMoney } from '@/utils/format'
import { runModelMethod } from '@/api/request'
import { MODEL_KEYS, METHOD_KEYS, dashboardApi, stockInApi, stockOutApi } from '@/api'

function navigateTo(path) {
  window.location.hash = path
}

// Stats
const stats = reactive({
  todayPurchase: 0,
  todaySale: 0,
  totalSn: 0,
  pendingCollection: 0
})

// Data
const todayInList = ref([])
const todayOutList = ref([])
const snLogList = ref([])

async function loadData() {
  try {
    const result = await dashboardApi.getStats()
    stats.todayPurchase = result.todayInCount || 0
    stats.todaySale = result.todayOutCount || 0
    stats.totalSn = result.totalCount || 0
    stats.pendingCollection = 0

    const today = new Date().toISOString().split('T')[0]

    const inRes = await stockInApi.getList({ current: 1, pageSize: 10, order_date_start: today, order_date_end: today })
    if (inRes.code === 'SUC0000') {
      todayInList.value = inRes.body?.list || []
    }

    const outRes = await stockOutApi.getList({ current: 1, pageSize: 10, order_date_start: today, order_date_end: today })
    if (outRes.code === 'SUC0000') {
      todayOutList.value = outRes.body?.list || []
    }

    const snRes = await runModelMethod(MODEL_KEYS.SN_CODE, METHOD_KEYS.SN_LIST, { current: 1, pageSize: 10 })
    if (snRes.code === 'SUC0000') {
      snLogList.value = snRes.body?.list || []
    }
  } catch (error) {
    console.error('?????????:', error)
  }
}

function getOperationText(type) {
  const map = {
    PURCHASE: '????',
    STOCK_IN: '??',
    STOCK_OUT: '??',
    SALE: '??',
    RETURN: '??',
    TRANSFER: '??'
  }
  return map[type] || type
}

function getOpTagType(type) {
  const map = {
    PURCHASE: 'success',
    STOCK_IN: 'success',
    STOCK_OUT: 'warning',
    SALE: '',
    RETURN: 'danger',
    TRANSFER: 'info'
  }
  return map[type] || 'info'
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
/* ============================================
   Dashboard - Precision Forge
   ============================================ */

.dashboard {
  max-width: 1400px;
  margin: 0 auto;
}

/* --- Stats Row --- */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background: var(--color-bg-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition: all var(--transition-base);
  cursor: default;
}
.stat-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.stat-accent {
  height: 3px;
  width: 100%;
}

.stat-body {
  display: flex;
  align-items: center;
  padding: 20px 24px;
  gap: 16px;
}

.stat-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-info {
  flex: 1;
  min-width: 0;
}

.stat-value {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-top: 3px;
  font-weight: 400;
}

/* --- Content Grid --- */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.content-card {
  background: var(--color-bg-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  transition: box-shadow var(--transition-base);
}
.content-card:hover {
  box-shadow: var(--shadow-md);
}

.content-card.full-width {
  grid-column: 1 / -1;
}

.card-title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border-light);
}

.card-title {
  font-family: var(--font-display);
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text-primary);
  letter-spacing: -0.01em;
}

/* --- Empty State --- */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  color: var(--color-text-muted);
}

.empty-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--color-bg-elevated);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  color: var(--color-text-muted);
}

.empty-state p {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

/* --- Responsive --- */
@media (max-width: 1200px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats-row {
    grid-template-columns: 1fr;
  }
  .stat-value {
    font-size: 22px;
  }
}
</style>
