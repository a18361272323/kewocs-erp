<template>
  <div class="dashboard">
    <!-- Hero section -->
    <div class="dash-hero animate-in">
      <h1 class="dash-greeting">仪表盘</h1>
      <p class="dash-subtitle">SN码全流程数据概览</p>
    </div>

    <!-- Stats Bento Grid -->
    <div class="stats-grid animate-in stagger-1">
      <div class="stat-card stat-card--large stat-card--in">
        <div class="stat-ring stat-ring--accent"></div>
        <el-icon class="stat-icon" :size="24"><Download /></el-icon>
        <div class="stat-value">{{ stats.todayPurchase || 0 }}</div>
        <div class="stat-label">今日采购入库</div>
      </div>
      <div class="stat-card stat-card--large stat-card--out">
        <div class="stat-ring stat-ring--green"></div>
        <el-icon class="stat-icon" :size="24"><Upload /></el-icon>
        <div class="stat-value">{{ stats.todaySale || 0 }}</div>
        <div class="stat-label">今日销售出库</div>
      </div>
      <div class="stat-card stat-card--small stat-card--sn">
        <div class="stat-ring stat-ring--blue"></div>
        <el-icon class="stat-icon" :size="20"><Box /></el-icon>
        <div class="stat-value stat-value--sm">{{ stats.totalSn || 0 }}</div>
        <div class="stat-label">SN码库存</div>
      </div>
      <div class="stat-card stat-card--small stat-card--money">
        <div class="stat-ring stat-ring--amber"></div>
        <el-icon class="stat-icon" :size="20"><Coin /></el-icon>
        <div class="stat-value stat-value--sm">¥{{ formatMoney(stats.pendingCollection || 0) }}</div>
        <div class="stat-label">待收款</div>
      </div>
    </div>

    <!-- Content Bento Grid -->
    <div class="content-grid animate-in stagger-2">
      <!-- Today In -->
      <div class="content-card card-glass">
        <div class="card-head">
          <span class="card-head-title">今日入库明细</span>
          <el-button type="primary" link size="small" @click="navigateTo('/purchase/stockIn')">查看全部 →</el-button>
        </div>
        <el-table v-if="todayInList.length" :data="todayInList" size="small" class="compact-table">
          <el-table-column prop="sn_code" label="SN码" width="130">
            <template #default="{ row }"><code class="mono">{{ row.sn_code }}</code></template>
          </el-table-column>
          <el-table-column prop="product_name" label="货品" min-width="100" />
          <el-table-column prop="supplier_name" label="供应商" width="90" />
          <el-table-column prop="order_date" label="时间" width="100">
            <template #default="{ row }">{{ formatDate(row.order_date) }}</template>
          </el-table-column>
        </el-table>
        <div v-else class="empty-mini">今日暂无入库记录</div>
      </div>

      <!-- Today Out -->
      <div class="content-card card-glass">
        <div class="card-head">
          <span class="card-head-title">今日出库明细</span>
          <el-button type="primary" link size="small" @click="navigateTo('/sale/stockOut')">查看全部 →</el-button>
        </div>
        <el-table v-if="todayOutList.length" :data="todayOutList" size="small" class="compact-table">
          <el-table-column prop="sn_code" label="SN码" width="130">
            <template #default="{ row }"><code class="mono">{{ row.sn_code }}</code></template>
          </el-table-column>
          <el-table-column prop="product_name" label="货品" min-width="100" />
          <el-table-column prop="customer_name" label="客户" width="90" />
          <el-table-column prop="order_date" label="时间" width="100">
            <template #default="{ row }">{{ formatDate(row.order_date) }}</template>
          </el-table-column>
        </el-table>
        <div v-else class="empty-mini">今日暂无出库记录</div>
      </div>
    </div>

    <!-- SN Flow Log -->
    <div class="flow-card card-glass animate-in stagger-3">
      <div class="card-head">
        <span class="card-head-title">SN码流转记录</span>
        <el-button type="primary" link size="small" @click="navigateTo('/sn/list')">查看全部 →</el-button>
      </div>
      <el-table v-if="snLogList.length" :data="snLogList" size="small" class="compact-table">
        <el-table-column prop="sn_code" label="SN码" width="140">
          <template #default="{ row }"><code class="mono">{{ row.sn_code }}</code></template>
        </el-table-column>
        <el-table-column prop="product_name" label="货品" min-width="120" />
        <el-table-column prop="operation_type" label="操作" width="90">
          <template #default="{ row }">
            <span class="op-tag" :class="'op-' + (row.operation_type || '').toLowerCase()">{{ getOperationText(row.operation_type) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="order_no" label="关联单据" width="160" />
        <el-table-column prop="operator_name" label="操作人" width="90" />
        <el-table-column prop="created_at" label="时间" width="150">
          <template #default="{ row }">{{ formatDate(row.created_at) }}</template>
        </el-table-column>
      </el-table>
      <div v-else class="empty-mini">暂无流转记录</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue"
import { Download, Upload, Box, Coin } from "@element-plus/icons-vue"
import { formatDate, formatMoney } from "@/utils/format"
import { dashboardApi, stockInApi, stockOutApi, snApi } from "@/api"

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
    const today = new Date().toISOString().split("T")[0]

    // 今日入库明细：取全部，按 created_at 过滤
    try {
      const inRes = await stockInApi.getList({ current: 1, pageSize: 9999 })
      const inList = (inRes.body?.list || inRes.data?.list || [])
      todayInList.value = inList.filter(item => item.created_at && item.created_at.startsWith(today)).slice(0, 10)
    } catch(e) { console.warn('todayInList:', e) }

    // 今日出库明细：取全部，按 created_at 过滤
    try {
      const outRes = await stockOutApi.getList({ current: 1, pageSize: 9999 })
      const outList = (outRes.body?.list || outRes.data?.list || [])
      todayOutList.value = outList.filter(item => item.created_at && item.created_at.startsWith(today)).slice(0, 10)
    } catch(e) { console.warn('todayOutList:', e) }

    // SN流转记录
    try {
      const snRes = await snApi.getLogList({ current: 1, pageSize: 10 })
      if (snRes.code === "SUC0000") snLogList.value = snRes.body?.list || []
    } catch(e) { console.warn('snLog:', e) }

    // 待收款：未完全收款的销售出库单汇总
    try {
      const allOutRes = await stockOutApi.getList({ current: 1, pageSize: 9999 })
      const allOutList = (allOutRes.body?.list || allOutRes.data?.list || [])
      let pending = 0
      allOutList.forEach(item => {
        const total = parseFloat(item.total_amount) || 0
        const received = parseFloat(item.received_amount) || 0
        if (total > received) pending += (total - received)
      })
      stats.pendingCollection = pending
    } catch(e) { console.warn('pending:', e) }
  } catch (error) { console.error('loadData fail', error) }
}

function getOperationText(type) {
  const map = { PURCHASE: "采购入库", STOCK_IN: "入库", STOCK_OUT: "出库", SALE: "销售", RETURN: "退货", PURCHASE_RETURN: "采购退货", TRANSFER: "调拨" }
  return map[type] || type
}

onMounted(() => loadData())
</script>

<style scoped>
.dashboard { max-width: 100%; }

.dash-hero { margin-bottom: var(--space-section-gap); }
.dash-greeting {
  font-family: var(--font-display); font-size: var(--font-hero); font-weight: 700;
  color: var(--color-ink); letter-spacing: -0.03em; margin: 0 0 4px;
}
.dash-subtitle { font-size: var(--font-body-sm); color: var(--color-ink-muted); margin: 0; }

/* Stats Bento Grid */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: var(--grid-gap-md);
  margin-bottom: var(--space-section-gap);
}
.stat-card {
  position: relative;
  background: rgba(255,255,255,0.78);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-card-pad);
  overflow: hidden;
  transition: all 0.2s ease;
}
.stat-card:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}
.stat-ring {
  position: absolute; top: -14px; right: -14px;
  width: 60px; height: 60px; border-radius: 50%; opacity: 0.1;
}
.stat-ring--accent { background: var(--color-accent); }
.stat-ring--green  { background: var(--color-success); }
.stat-ring--blue   { background: var(--color-info); }
.stat-ring--amber  { background: var(--color-warning); }
.stat-icon { margin-bottom: 12px; color: var(--color-ink); opacity: 0.5; }
.stat-value {
  font-family: var(--font-display); font-size: var(--font-stat-value); font-weight: 700;
  color: var(--color-ink); line-height: 1; margin-bottom: 4px;
}

.stat-label { font-size: var(--font-stat-label); color: var(--color-ink-muted); font-weight: 500; }

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--grid-gap-md);
  margin-bottom: var(--space-block-gap);
}

/* Flow Card */
.flow-card { margin-bottom: var(--space-block-gap); }

.card-head {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 14px;
}
.card-head-title {
  font-family: var(--font-display); font-size: var(--font-card-title); font-weight: 600; color: var(--color-ink);
}

.compact-table { --el-table-border-color: var(--color-border-light); }
.mono { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--color-accent); background: var(--color-accent-soft); padding: 1px 6px; border-radius: 4px; }

.empty-mini {
  text-align: center; padding: 32px 0; color: var(--color-ink-subtle); font-size: 13px;
}

.op-tag { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11.5px; font-weight: 500; }
.op-purchase, .op-stock_in { background: rgba(21,128,61,0.12); color: var(--color-success); }
.op-stock_out, .op-sale { background: rgba(3,105,161,0.12); color: var(--color-info); }
.op-return { background: rgba(185,28,28,0.12); color: var(--color-danger); }
.op-purchase_return { background: rgba(185,28,28,0.12); color: var(--color-danger); }
.op-transfer { background: rgba(79,70,229,0.1); color: var(--color-accent); }

@media (max-width: 1024px) {
  .stats-grid { grid-template-columns: 1fr 1fr; }
  .content-grid { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .dashboard { max-width: 100%; }
  .dash-hero { margin-bottom: 12px; }
  .dash-greeting { font-size: var(--font-hero); }
  .dash-subtitle { font-size: 12px; }
  .stats-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
  .stat-card { padding: var(--space-card-pad); }
  .stat-value { font-size: var(--font-stat-value); }
  
  .stat-label { font-size: var(--font-stat-label); }
  .content-grid { grid-template-columns: 1fr; gap: 10px; }
}
</style>