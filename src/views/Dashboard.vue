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
          <el-table-column prop="snCode" label="SN码" width="130">
            <template #default="{ row }"><code class="mono">{{ row.snCode }}</code></template>
          </el-table-column>
          <el-table-column prop="productName" label="货品" min-width="100" />
          <el-table-column prop="supplierName" label="供应商" width="90" />
          <el-table-column prop="inDate" label="时间" width="100">
            <template #default="{ row }">{{ formatDate(row.inDate) }}</template>
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
          <el-table-column prop="snCode" label="SN码" width="130">
            <template #default="{ row }"><code class="mono">{{ row.snCode }}</code></template>
          </el-table-column>
          <el-table-column prop="productName" label="货品" min-width="100" />
          <el-table-column prop="customerName" label="客户" width="90" />
          <el-table-column prop="outDate" label="时间" width="100">
            <template #default="{ row }">{{ formatDate(row.outDate) }}</template>
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
        <el-table-column prop="snCode" label="SN码" width="140">
          <template #default="{ row }"><code class="mono">{{ row.snCode }}</code></template>
        </el-table-column>
        <el-table-column prop="productName" label="货品" min-width="120" />
        <el-table-column prop="operationType" label="操作" width="90">
          <template #default="{ row }">
            <span class="op-tag" :class="'op-' + (row.operationType || '').toLowerCase()">{{ getOperationText(row.operationType) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderNo" label="关联单据" width="160" />
        <el-table-column prop="operator" label="操作人" width="90" />
        <el-table-column prop="operateTime" label="时间" width="150">
          <template #default="{ row }">{{ formatDate(row.operateTime) }}</template>
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
import { runModelMethod } from "@/api/request"
import { MODEL_KEYS, METHOD_KEYS, dashboardApi, stockInApi, stockOutApi } from "@/api"

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
    const today = new Date().toISOString().split("T")[0]
    const inRes = await stockInApi.getList({ current: 1, pageSize: 10, order_date_start: today, order_date_end: today })
    if (inRes.code === "SUC0000") todayInList.value = inRes.body?.list || []
    const outRes = await stockOutApi.getList({ current: 1, pageSize: 10, order_date_start: today, order_date_end: today })
    if (outRes.code === "SUC0000") todayOutList.value = outRes.body?.list || []
    const snRes = await runModelMethod(MODEL_KEYS.SN_CODE, METHOD_KEYS.SN_LIST, { current: 1, pageSize: 10 })
    if (snRes.code === "SUC0000") snLogList.value = snRes.body?.list || []
  } catch (error) { console.error("加载仪表盘数据失败", error) }
}

function getOperationText(type) {
  const map = { PURCHASE: "采购入库", STOCK_IN: "入库", STOCK_OUT: "出库", SALE: "销售", RETURN: "退货", TRANSFER: "调拨" }
  return map[type] || type
}

onMounted(() => loadData())
</script>

<style scoped>
.dashboard { max-width: 1280px; }

.dash-hero { margin-bottom: 28px; }
.dash-greeting {
  font-family: var(--font-display); font-size: 30px; font-weight: 700;
  color: var(--color-ink); letter-spacing: -0.03em; margin: 0 0 4px;
}
.dash-subtitle { font-size: 14px; color: var(--color-ink-subtle); margin: 0; }

/* Stats Bento Grid */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 0.8fr 0.8fr;
  gap: 14px;
  margin-bottom: 24px;
}
.stat-card {
  position: relative;
  background: rgba(255,255,255,0.78);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 22px 20px;
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
.stat-icon { margin-bottom: 12px; color: var(--color-ink); opacity: 0.6; }
.stat-value {
  font-family: var(--font-display); font-size: 36px; font-weight: 700;
  color: var(--color-ink); line-height: 1; margin-bottom: 4px;
}
.stat-value--sm { font-size: 28px; }
.stat-label { font-size: 12.5px; color: var(--color-ink-subtle); font-weight: 500; }

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

/* Flow Card */
.flow-card { margin-bottom: 20px; }

.card-head {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 14px;
}
.card-head-title {
  font-family: var(--font-display); font-size: 15px; font-weight: 600; color: var(--color-ink);
}

.compact-table { --el-table-border-color: var(--color-border-light); }
.mono { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--color-accent); background: var(--color-accent-soft); padding: 1px 6px; border-radius: 4px; }

.empty-mini {
  text-align: center; padding: 32px 0; color: var(--color-ink-subtle); font-size: 13px;
}

.op-tag { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11.5px; font-weight: 500; }
.op-purchase, .op-stock_in { background: rgba(22,163,74,0.1); color: var(--color-success); }
.op-stock_out, .op-sale { background: rgba(14,165,233,0.1); color: var(--color-info); }
.op-return { background: rgba(220,38,38,0.1); color: var(--color-danger); }
.op-transfer { background: rgba(79,70,229,0.1); color: var(--color-accent); }

@media (max-width: 1024px) {
  .stats-grid { grid-template-columns: 1fr 1fr; }
  .content-grid { grid-template-columns: 1fr; }
}
</style>