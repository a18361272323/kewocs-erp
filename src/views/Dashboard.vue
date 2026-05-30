<template>
  <div class="dashboard">
    <div class="stats-row">
      <div class="stat-card animate-in stagger-1">
        <div class="stat-accent" style="background: var(--color-primary)"></div>
        <div class="stat-body">
          <div class="stat-icon-wrap" style="background: var(--color-primary-soft); color: var(--color-primary)">
            <el-icon :size="22"><Download /></el-icon>
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ stats.todayPurchase || 0 }}</div>
            <div class="stat-label">今日采购入库</div>
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
            <div class="stat-label">今日销售出库</div>
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
            <div class="stat-label">SN码库存</div>
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
            <div class="stat-label">待收款</div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-grid">
      <div class="content-card animate-in stagger-1">
        <div class="card-title-bar">
          <span class="card-title">今日入库明细</span>
          <el-button type="primary" link @click="navigateTo('/purchase/stockIn')">查看全部 →</el-button>
        </div>
        <el-table :data="todayInList" style="width: 100%" max-height="320" v-if="todayInList.length">
          <el-table-column prop="snCode" label="SN码" width="140" show-overflow-tooltip>
            <template #default="{ row }"><span class="mono">{{ row.snCode }}</span></template>
          </el-table-column>
          <el-table-column prop="productName" label="货品" width="120" show-overflow-tooltip />
          <el-table-column prop="supplierName" label="供应商" width="100" show-overflow-tooltip />
          <el-table-column prop="inDate" label="入库时间" width="110">
            <template #default="{ row }">{{ formatDate(row.inDate) }}</template>
          </el-table-column>
        </el-table>
        <div v-else class="empty-state">
          <div class="empty-icon"><el-icon :size="36"><Folder /></el-icon></div>
          <p>今日暂无入库记录</p>
        </div>
      </div>

      <div class="content-card animate-in stagger-2">
        <div class="card-title-bar">
          <span class="card-title">今日出库明细</span>
          <el-button type="primary" link @click="navigateTo('/sale/stockOut')">查看全部 →</el-button>
        </div>
        <el-table :data="todayOutList" style="width: 100%" max-height="320" v-if="todayOutList.length">
          <el-table-column prop="snCode" label="SN码" width="140" show-overflow-tooltip>
            <template #default="{ row }"><span class="mono">{{ row.snCode }}</span></template>
          </el-table-column>
          <el-table-column prop="productName" label="货品" width="120" show-overflow-tooltip />
          <el-table-column prop="customerName" label="客户" width="100" show-overflow-tooltip />
          <el-table-column prop="outDate" label="出库时间" width="110">
            <template #default="{ row }">{{ formatDate(row.outDate) }}</template>
          </el-table-column>
        </el-table>
        <div v-else class="empty-state">
          <div class="empty-icon"><el-icon :size="36"><Folder /></el-icon></div>
          <p>今日暂无出库记录</p>
        </div>
      </div>
    </div>

    <div class="content-card full-width animate-in stagger-3">
      <div class="card-title-bar">
        <span class="card-title">SN码流转记录</span>
        <el-button type="primary" link @click="navigateTo('/sn/list')">查看全部 →</el-button>
      </div>
      <el-table :data="snLogList" style="width: 100%" v-if="snLogList.length">
        <el-table-column prop="snCode" label="SN码" width="150">
          <template #default="{ row }"><span class="mono">{{ row.snCode }}</span></template>
        </el-table-column>
        <el-table-column prop="productName" label="货品" width="150" />
        <el-table-column prop="operationType" label="操作" width="100">
          <template #default="{ row }">
            <el-tag size="small" :type="getOpTagType(row.operationType)">{{ getOperationText(row.operationType) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="orderNo" label="关联单据" width="180" />
        <el-table-column prop="operator" label="操作人" width="100" />
        <el-table-column prop="operateTime" label="操作时间" width="160">
          <template #default="{ row }">{{ formatDate(row.operateTime) }}</template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="150" show-overflow-tooltip />
      </el-table>
      <div v-else class="empty-state">
        <div class="empty-icon"><el-icon :size="36"><Folder /></el-icon></div>
        <p>暂无流转记录</p>
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

function navigateTo(path) { window.location.hash = path }

const stats = reactive({ todayPurchase: 0, todaySale: 0, totalSn: 0, pendingCollection: 0 })
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
    if (inRes.code === 'SUC0000') todayInList.value = inRes.body?.list || []
    const outRes = await stockOutApi.getList({ current: 1, pageSize: 10, order_date_start: today, order_date_end: today })
    if (outRes.code === 'SUC0000') todayOutList.value = outRes.body?.list || []
    const snRes = await runModelMethod(MODEL_KEYS.SN_CODE, METHOD_KEYS.SN_LIST, { current: 1, pageSize: 10 })
    if (snRes.code === 'SUC0000') snLogList.value = snRes.body?.list || []
  } catch (error) { console.error('加载仪表盘数据失败:', error) }
}

function getOperationText(type) {
  const map = { PURCHASE: '采购入库', STOCK_IN: '入库', STOCK_OUT: '出库', SALE: '销售', RETURN: '退货', TRANSFER: '调拨' }
  return map[type] || type
}
function getOpTagType(type) {
  const map = { PURCHASE: 'success', STOCK_IN: 'success', STOCK_OUT: 'warning', SALE: '', RETURN: 'danger', TRANSFER: 'info' }
  return map[type] || 'info'
}

onMounted(() => loadData())
</script>

<style scoped>
/* ============================================
   Dashboard ? Linear Dark Stats
   ============================================ */

.dashboard {
  max-width: 1280px;
  margin: 0 auto;
}

/* --- Stat Row --- */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.stat-card {
  background: var(--color-surface);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: border-color var(--transition-fast);
  cursor: default;
}
.stat-card:hover {
  border-color: var(--color-hairline-strong);
}

.stat-accent {
  height: 2px;
  width: 100%;
}

.stat-body {
  display: flex;
  align-items: center;
  padding: var(--space-lg);
  gap: var(--space-md);
}

.stat-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
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
  font-size: 24px;
  font-weight: 600;
  color: var(--color-ink);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: var(--text-caption);
  color: var(--color-ink-subtle);
  margin-top: 4px;
  font-weight: 400;
}

/* --- Content Grid --- */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.content-card {
  background: var(--color-surface);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: border-color var(--transition-fast);
}
.content-card:hover {
  border-color: var(--color-hairline-strong);
}
.content-card.full-width {
  grid-column: 1 / -1;
}

/* --- Card Title Bar --- */
.card-title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--color-hairline);
}

.card-title {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-ink);
  letter-spacing: -0.01em;
}

/* --- Table inside cards (compact) --- */
.content-card .el-table {
  font-size: var(--text-caption);
}
.content-card .el-table th.el-table__cell {
  padding: 8px 0;
  font-size: 11px;
}
.content-card .el-table td.el-table__cell {
  padding: 7px 0;
}

/* --- Responsive --- */
@media (max-width: 1024px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }
  .content-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 640px) {
  .stats-row {
    grid-template-columns: 1fr;
  }
  .main-content {
    padding: var(--space-md);
  }
}
</style>
