<template>
  <div class="mobile-index">
    <!-- ============================================
         Hero — warm paper, confident brand
         ============================================ -->
    <header class="hero">
      <div class="hero-brand">
        <span class="hero-logo">K</span>
        <div class="hero-text">
          <h1 class="hero-title">科沃斯 ERP</h1>
          <p class="hero-sub">SN 码全流程管理</p>
        </div>
      </div>
      <div class="hero-divider"></div>
    </header>

    <!-- ============================================
         Stats — three soft pills with coloured rings
         ============================================ -->
    <section class="stats">
      <div class="stats-grid">
        <article class="stat-pill stat-in" @click="navigateTo('/records')">
          <span class="stat-num">{{ todayStockIn }}</span>
          <span class="stat-label">今日入库</span>
        </article>
        <article class="stat-pill stat-out" @click="navigateTo('/records')">
          <span class="stat-num">{{ todayStockOut }}</span>
          <span class="stat-label">今日出库</span>
        </article>
        <article class="stat-pill stat-return" @click="navigateTo('/records')">
          <span class="stat-num">{{ todayReturn }}</span>
          <span class="stat-label">今日退货</span>
        </article>
      </div>
    </section>

    <!-- ============================================
         Low-stock alert — quiet warning, clear CTA
         ============================================ -->
    <section v-if="lowStockList.length > 0" class="alert" @click="navigateTo('/inventory')">
      <div class="alert-top">
        <div class="alert-badge">
          <span class="alert-dot"></span>
          库存预警
        </div>
        <span class="alert-count">{{ lowStockList.length }}</span>
      </div>
      <ul class="alert-items">
        <li v-for="item in lowStockList.slice(0, 3)" :key="item.productId || item.id" class="alert-row">
          <span class="alert-name">{{ item.productName || item.name }}</span>
          <span class="alert-qty">{{ item.totalQty || item.quantity || 0 }} 件</span>
        </li>
      </ul>
      <div v-if="lowStockList.length > 3" class="alert-more">查看全部 {{ lowStockList.length }} 项</div>
    </section>

    <!-- ============================================
         Menu grid — 2-col, refined cards
         ============================================ -->
    <section class="menu">
      <!-- 业务操作 -->
      <div class="menu-group">
        <h2 class="menu-heading">业务操作</h2>
        <div class="menu-grid col-2">
          <div class="menu-card card-in" @click="navigateTo('/stock-in')">
            <div class="card-icon-wrap icon-in">
              <van-icon name="scan" size="22" />
            </div>
            <div class="card-body">
              <h3 class="card-title">扫码入库</h3>
              <p class="card-desc">扫描 SN 码完成采购入库</p>
            </div>
            <van-icon name="arrow" size="14" class="card-arrow" />
          </div>
          <div class="menu-card card-out" @click="navigateTo('/stock-out')">
            <div class="card-icon-wrap icon-out">
              <van-icon name="logistics" size="22" />
            </div>
            <div class="card-body">
              <h3 class="card-title">扫码出库</h3>
              <p class="card-desc">扫描 SN 码完成销售出库</p>
            </div>
            <van-icon name="arrow" size="14" class="card-arrow" />
          </div>
        </div>
        <div class="menu-card card-return full" @click="navigateTo('/return')">
          <div class="card-icon-wrap icon-return">
            <van-icon name="revoke" size="22" />
          </div>
          <div class="card-body">
            <h3 class="card-title">退货处理</h3>
            <p class="card-desc">扫描 SN 码处理销售退货</p>
          </div>
          <van-icon name="arrow" size="14" class="card-arrow" />
        </div>
      </div>

      <!-- 仓库管理 -->
      <div class="menu-group">
        <h2 class="menu-heading">仓库管理</h2>
        <div class="menu-grid col-2">
          <div class="menu-card card-transfer" @click="navigateTo('/transfer')">
            <div class="card-icon-wrap icon-transfer">
              <van-icon name="exchange" size="22" />
            </div>
            <div class="card-body">
              <h3 class="card-title">调拨确认</h3>
              <p class="card-desc">确认仓库间调拨</p>
            </div>
            <van-icon name="arrow" size="14" class="card-arrow" />
          </div>
          <div class="menu-card card-check" @click="navigateTo('/check')">
            <div class="card-icon-wrap icon-check">
              <van-icon name="passed" size="22" />
            </div>
            <div class="card-body">
              <h3 class="card-title">盘点扫描</h3>
              <p class="card-desc">扫描实物完成盘点</p>
            </div>
            <van-icon name="arrow" size="14" class="card-arrow" />
          </div>
        </div>
      </div>

      <!-- 信息查询 -->
      <div class="menu-group">
        <h2 class="menu-heading">信息查询</h2>
        <div class="menu-grid col-2">
          <div class="menu-card card-inventory" @click="navigateTo('/inventory')">
            <div class="card-icon-wrap icon-inventory">
              <van-icon name="bar-chart-o" size="22" />
            </div>
            <div class="card-body">
              <h3 class="card-title">库存查询</h3>
              <p class="card-desc">查看实时库存明细</p>
            </div>
            <van-icon name="arrow" size="14" class="card-arrow" />
          </div>
          <div class="menu-card card-sn" @click="navigateTo('/sn-trace')">
            <div class="card-icon-wrap icon-sn">
              <van-icon name="search" size="22" />
            </div>
            <div class="card-body">
              <h3 class="card-title">SN 溯源</h3>
              <p class="card-desc">追踪 SN 码流转记录</p>
            </div>
            <van-icon name="arrow" size="14" class="card-arrow" />
          </div>
        </div>
      </div>

      <!-- 操作记录 -->
      <div class="menu-group">
        <div class="menu-card card-records full" @click="navigateTo('/records')">
          <div class="card-icon-wrap icon-records">
            <van-icon name="records-o" size="22" />
          </div>
          <div class="card-body">
            <h3 class="card-title">操作记录</h3>
            <p class="card-desc">查看入库 / 出库 / 退货历史</p>
          </div>
          <van-icon name="arrow" size="14" class="card-arrow" />
        </div>
      </div>
    </section>

    <footer class="footer">
      <span class="footer-text">Kewocs ERP</span>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { stockInApi, stockOutApi, saleReturnApi, inventoryApi } from "../api"

const todayStockIn = ref(0)
const todayStockOut = ref(0)
const todayReturn = ref(0)
const lowStockList = ref([])

const navigateTo = (path) => { window.navigateTo(path) }

const loadData = async () => {
  try {
    const today = new Date().toISOString().split("T")[0]
    const inRes = await stockInApi.getList({ order_date_start: today, order_date_end: today, current: 1, pageSize: 1 })
    todayStockIn.value = inRes.data?.total || 0
    const outRes = await stockOutApi.getList({ order_date_start: today, order_date_end: today, current: 1, pageSize: 1 })
    todayStockOut.value = outRes.data?.total || 0
    const retRes = await saleReturnApi.getList({ order_date_start: today, order_date_end: today, current: 1, pageSize: 1 })
    todayReturn.value = retRes.data?.total || 0
    try {
      const lowRes = await inventoryApi.getLowStock()
      lowStockList.value = lowRes.data?.list || lowRes.data || []
    } catch (e) { /* silence */ }
  } catch (error) {
    console.error("加载首页数据失败:", error)
  }
}

onMounted(() => { loadData() })
</script>

<style scoped>
/* ============================================
   Mobile Index — Soft Editorial, Warm Paper
   Canvas: #faf7f2  Ink: #1c1915  Accent: #5e6ad2
   ============================================ */

.mobile-index {
  min-height: 100vh;
  background: var(--color-canvas, #faf7f2);
  color: var(--color-ink, #1c1915);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  padding-bottom: 48px;
}

/* ---------- Hero ---------- */
.hero {
  padding: 36px 24px 0;
}
.hero-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}
.hero-logo {
  width: 44px;
  height: 44px;
  border-radius: 13px;
  background: var(--color-primary, #5e6ad2);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
  flex-shrink: 0;
}
.hero-text {
  display: flex;
  flex-direction: column;
}
.hero-title {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 650;
  color: var(--color-ink, #1c1915);
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin: 0;
}
.hero-sub {
  font-size: 13px;
  color: var(--color-ink-subtle, #8a8580);
  font-weight: 400;
  margin: 2px 0 0;
}
.hero-divider {
  height: 1px;
  background: var(--color-border-light, #e8e2d8);
  margin-top: 22px;
  opacity: 0.6;
}

/* ---------- Stats ---------- */
.stats {
  padding: 20px 24px;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.stat-pill {
  background: var(--color-surface, #f3efe8);
  border-radius: 18px;
  padding: 18px 8px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1.5px solid transparent;
}
.stat-pill:active {
  transform: scale(0.96);
}
.stat-in:active  { border-color: rgba(39, 166, 68, 0.3); }
.stat-out:active { border-color: rgba(94, 106, 210, 0.3); }
.stat-return:active { border-color: rgba(233, 183, 63, 0.3); }
.stat-num {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 650;
  color: var(--color-ink, #1c1915);
  letter-spacing: -0.03em;
  line-height: 1;
}
.stat-in  .stat-num { color: #1f8b3a; }
.stat-out .stat-num { color: #4f5bc0; }
.stat-return .stat-num { color: #b8860f; }
.stat-label {
  font-size: 12px;
  color: var(--color-ink-subtle, #8a8580);
  font-weight: 500;
}

/* ---------- Alert ---------- */
.alert {
  margin: 0 24px 24px;
  background: var(--color-surface, #f3efe8);
  border-radius: 18px;
  padding: 18px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 3px solid #e0454c;
}
.alert:active { transform: scale(0.985); }
.alert-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.alert-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-ink, #1c1915);
}
.alert-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #e0454c;
  animation: pulse-dot 2s infinite;
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.4; }
}
.alert-count {
  font-size: 13px;
  font-weight: 700;
  color: #e0454c;
  background: rgba(224, 69, 76, 0.08);
  padding: 4px 12px;
  border-radius: 20px;
}
.alert-items {
  list-style: none;
  padding: 0;
  margin: 0;
}
.alert-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(0,0,0,0.04);
}
.alert-row:last-of-type { border-bottom: none; }
.alert-name {
  font-size: 14px;
  color: var(--color-ink, #1c1915);
  font-weight: 500;
}
.alert-qty {
  font-size: 14px;
  font-weight: 600;
  color: #e0454c;
}
.alert-more {
  text-align: center;
  padding-top: 10px;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-primary, #5e6ad2);
}

/* ---------- Menu ---------- */
.menu {
  padding: 0 24px;
}
.menu-group {
  margin-bottom: 22px;
}
.menu-heading {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-ink-subtle, #8a8580);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin: 0 0 12px 4px;
}
.menu-grid {
  display: grid;
  gap: 10px;
}
.menu-grid.col-2 { grid-template-columns: 1fr 1fr; }

/* --- Card --- */
.menu-card {
  background: var(--color-surface, #f3efe8);
  border-radius: 18px;
  padding: 16px 16px 16px 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  transition: all 0.18s ease;
  border: 1.5px solid transparent;
}
.menu-card.full {
  margin-top: 10px;
}
.menu-card:active {
  border-color: var(--color-primary, #5e6ad2);
  background: var(--color-surface-2, #ebe6dd);
  transform: scale(0.98);
}
.card-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
/* Icon colour tokens */
.icon-in        { background: rgba(39, 166, 68, 0.10);  color: #1f8b3a; }
.icon-out       { background: rgba(94, 106, 210, 0.10); color: #4f5bc0; }
.icon-return    { background: rgba(233, 183, 63, 0.12); color: #b8860f; }
.icon-transfer  { background: rgba(94, 106, 210, 0.08); color: #4f5bc0; }
.icon-check     { background: rgba(39, 166, 68, 0.08);  color: #1f8b3a; }
.icon-inventory { background: rgba(94, 106, 210, 0.10); color: #4f5bc0; }
.icon-sn        { background: rgba(94, 106, 210, 0.08); color: #4f5bc0; }
.icon-records   { background: rgba(138, 133, 128, 0.08); color: #8a8580; }

.card-body {
  flex: 1;
  min-width: 0;
}
.card-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-ink, #1c1915);
  letter-spacing: -0.01em;
  margin: 0 0 3px;
}
.card-desc {
  font-size: 12px;
  color: var(--color-ink-subtle, #8a8580);
  margin: 0;
  line-height: 1.4;
}
.card-arrow {
  color: var(--color-ink-subtle, #8a8580);
  flex-shrink: 0;
  opacity: 0.5;
}

/* ---------- Footer ---------- */
.footer {
  padding: 32px 24px 24px;
  text-align: center;
}
.footer-text {
  font-size: 12px;
  color: var(--color-ink-tertiary, #a8a39e);
  font-weight: 400;
  letter-spacing: 0.04em;
}
</style>