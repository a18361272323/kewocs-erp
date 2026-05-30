<template>
  <div class="mobile-index">
    <!-- 顶部问候 -->
    <div class="hero-section">
      <div class="hero-greeting">科沃斯 ERP</div>
      <div class="hero-subtitle">SN 码全流程管理</div>
    </div>

    <!-- 今日统计 -->
    <div class="stats-section">
      <div class="section-label">今日概览</div>
      <div class="stats-row">
        <div class="stat-card stat-in">
          <div class="stat-ring">
            <span class="stat-value">{{ todayStockIn }}</span>
          </div>
          <span class="stat-name">入库</span>
        </div>
        <div class="stat-card stat-out">
          <div class="stat-ring">
            <span class="stat-value">{{ todayStockOut }}</span>
          </div>
          <span class="stat-name">出库</span>
        </div>
        <div class="stat-card stat-return">
          <div class="stat-ring">
            <span class="stat-value">{{ todayReturn }}</span>
          </div>
          <span class="stat-name">退货</span>
        </div>
      </div>
    </div>

    <!-- 库存预警 -->
    <div v-if="lowStockList.length > 0" class="alert-section" @click="navigateTo('/inventory')">
      <div class="alert-header">
        <div class="alert-title-row">
          <span class="alert-dot"></span>
          <span class="alert-title">库存预警</span>
        </div>
        <span class="alert-badge">{{ lowStockList.length }} 项</span>
      </div>
      <div class="alert-list">
        <div v-for="item in lowStockList.slice(0, 3)" :key="item.productId || item.id" class="alert-row">
          <span class="alert-product">{{ item.productName || item.name }}</span>
          <span class="alert-count">{{ item.totalQty || item.quantity || 0 }} 件</span>
        </div>
        <div v-if="lowStockList.length > 3" class="alert-more">查看全部 {{ lowStockList.length }} 项 →</div>
      </div>
    </div>

    <!-- 业务操作 -->
    <div class="menu-section">
      <div class="section-label">业务操作</div>
      <div class="menu-grid col-2">
        <div class="menu-card menu-in" @click="navigateTo('/stock-in')">
          <div class="menu-icon-wrap in-bg">
            <van-icon name="scan" size="26" />
          </div>
          <div class="menu-info">
            <span class="menu-title">扫码入库</span>
            <span class="menu-desc">扫描 SN 码完成采购入库</span>
          </div>
          <van-icon name="arrow" size="16" class="menu-arrow" />
        </div>
        <div class="menu-card menu-out" @click="navigateTo('/stock-out')">
          <div class="menu-icon-wrap out-bg">
            <van-icon name="logistics" size="26" />
          </div>
          <div class="menu-info">
            <span class="menu-title">扫码出库</span>
            <span class="menu-desc">扫描 SN 码完成销售出库</span>
          </div>
          <van-icon name="arrow" size="16" class="menu-arrow" />
        </div>
      </div>
      <div class="menu-grid col-1" style="margin-top: 10px">
        <div class="menu-card menu-return" @click="navigateTo('/return')">
          <div class="menu-icon-wrap return-bg">
            <van-icon name="revoke" size="26" />
          </div>
          <div class="menu-info">
            <span class="menu-title">退货处理</span>
            <span class="menu-desc">扫描 SN 码处理销售退货</span>
          </div>
          <van-icon name="arrow" size="16" class="menu-arrow" />
        </div>
      </div>
    </div>

    <!-- 仓库管理 -->
    <div class="menu-section">
      <div class="section-label">仓库管理</div>
      <div class="menu-grid col-2">
        <div class="menu-card menu-transfer" @click="navigateTo('/transfer')">
          <div class="menu-icon-wrap transfer-bg">
            <van-icon name="exchange" size="26" />
          </div>
          <div class="menu-info">
            <span class="menu-title">调拨确认</span>
            <span class="menu-desc">确认仓库间调拨</span>
          </div>
          <van-icon name="arrow" size="16" class="menu-arrow" />
        </div>
        <div class="menu-card menu-check" @click="navigateTo('/check')">
          <div class="menu-icon-wrap check-bg">
            <van-icon name="passed" size="26" />
          </div>
          <div class="menu-info">
            <span class="menu-title">盘点扫描</span>
            <span class="menu-desc">扫描实物完成盘点</span>
          </div>
          <van-icon name="arrow" size="16" class="menu-arrow" />
        </div>
      </div>
    </div>

    <!-- 信息查询 -->
    <div class="menu-section">
      <div class="section-label">信息查询</div>
      <div class="menu-grid col-2">
        <div class="menu-card menu-inventory" @click="navigateTo('/inventory')">
          <div class="menu-icon-wrap inventory-bg">
            <van-icon name="bar-chart-o" size="26" />
          </div>
          <div class="menu-info">
            <span class="menu-title">库存查询</span>
            <span class="menu-desc">查看实时库存明细</span>
          </div>
          <van-icon name="arrow" size="16" class="menu-arrow" />
        </div>
        <div class="menu-card menu-sn" @click="navigateTo('/sn-trace')">
          <div class="menu-icon-wrap sn-bg">
            <van-icon name="search" size="26" />
          </div>
          <div class="menu-info">
            <span class="menu-title">SN 溯源</span>
            <span class="menu-desc">追踪 SN 码流转记录</span>
          </div>
          <van-icon name="arrow" size="16" class="menu-arrow" />
        </div>
      </div>
    </div>

    <!-- 操作记录 -->
    <div class="menu-section">
      <div class="menu-card menu-records full-width" @click="navigateTo('/records')">
        <div class="menu-icon-wrap records-bg">
          <van-icon name="records-o" size="26" />
        </div>
        <div class="menu-info">
          <span class="menu-title">操作记录</span>
          <span class="menu-desc">查看入库 / 出库 / 退货历史</span>
        </div>
        <van-icon name="arrow" size="16" class="menu-arrow" />
      </div>
    </div>

    <!-- 底部留白 -->
    <div class="bottom-spacer"></div>
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
   Mobile Index — Warm Editorial Design
   ============================================ */

.mobile-index {
  min-height: 100vh;
  overflow-y: auto;
  background: var(--color-canvas, #faf7f2);
  color: var(--color-ink, #1c1915);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

/* --- Hero --- */
.hero-section {
  padding: 28px 20px 8px;
}
.hero-greeting {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 600;
  color: var(--color-ink, #1c1915);
  letter-spacing: -0.03em;
  line-height: 1.15;
}
.hero-subtitle {
  font-size: 14px;
  color: var(--color-ink-subtle, #8a8580);
  margin-top: 4px;
  font-weight: 400;
}

/* --- Section Label --- */
.section-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink-subtle, #8a8580);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0 20px;
  margin-bottom: 12px;
}

/* --- Stats Section --- */
.stats-section {
  padding: 0 20px;
  margin-bottom: 24px;
}
.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.stat-card {
  background: var(--color-surface, #f3efe8);
  border-radius: 16px;
  padding: 20px 12px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: transform 0.2s ease;
}
.stat-card:active { transform: scale(0.97); }
.stat-ring {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2.5px solid transparent;
}
.stat-in  .stat-ring { border-color: #27a644; background: rgba(39,166,68,0.06); }
.stat-out .stat-ring { border-color: #5e6ad2; background: rgba(94,106,210,0.06); }
.stat-return .stat-ring { border-color: #e9b73f; background: rgba(233,183,63,0.08); }
.stat-value {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 600;
  color: var(--color-ink, #1c1915);
  letter-spacing: -0.02em;
}
.stat-in  .stat-value { color: #27a644; }
.stat-out .stat-value { color: #5e6ad2; }
.stat-return .stat-value { color: #c9951f; }
.stat-name {
  font-size: 13px;
  color: var(--color-ink-subtle, #8a8580);
  font-weight: 500;
}

/* --- Alert Section --- */
.alert-section {
  margin: 0 20px 24px;
  background: var(--color-surface, #f3efe8);
  border-radius: 16px;
  padding: 16px;
  border-left: 3px solid #f14653;
}
.alert-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.alert-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.alert-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #f14653;
}
.alert-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-ink, #1c1915);
}
.alert-badge {
  font-size: 12px;
  font-weight: 600;
  color: #f14653;
  background: rgba(241,70,83,0.08);
  padding: 3px 10px;
  border-radius: 20px;
}
.alert-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}
.alert-row:last-of-type { border-bottom: none; }
.alert-product {
  font-size: 14px;
  color: var(--color-ink, #1c1915);
  font-weight: 500;
}
.alert-count {
  font-size: 14px;
  font-weight: 600;
  color: #f14653;
}
.alert-more {
  text-align: center;
  padding-top: 10px;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-primary, #5e6ad2);
}

/* --- Menu Section --- */
.menu-section {
  padding: 0 20px;
  margin-bottom: 20px;
}
.menu-grid { display: grid; gap: 10px; }
.menu-grid.col-2 { grid-template-columns: 1fr 1fr; }
.menu-grid.col-1 { grid-template-columns: 1fr; }

/* --- Menu Card --- */
.menu-card {
  background: var(--color-surface, #f3efe8);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1.5px solid transparent;
}
.menu-card:active {
  border-color: var(--color-primary, #5e6ad2);
  background: #ede7df;
  transform: scale(0.98);
}
.menu-card.full-width {
  border-radius: 16px;
}
.menu-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.in-bg       { background: rgba(39,166,68,0.10);  color: #27a644; }
.out-bg      { background: rgba(94,106,210,0.10); color: #5e6ad2; }
.return-bg   { background: rgba(233,183,63,0.12); color: #c9951f; }
.transfer-bg { background: rgba(94,106,210,0.08); color: #5e6ad2; }
.check-bg    { background: rgba(39,166,68,0.08);  color: #27a644; }
.inventory-bg{ background: rgba(94,106,210,0.10); color: #5e6ad2; }
.sn-bg       { background: rgba(94,106,210,0.08); color: #5e6ad2; }
.records-bg  { background: rgba(140,133,128,0.10); color: #8a8580; }
.menu-info {
  flex: 1;
  min-width: 0;
}
.menu-title {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-ink, #1c1915);
  letter-spacing: -0.01em;
}
.menu-desc {
  display: block;
  font-size: 12px;
  color: var(--color-ink-subtle, #8a8580);
  margin-top: 2px;
}
.menu-arrow {
  color: var(--color-ink-subtle, #8a8580);
  flex-shrink: 0;
}

/* --- Bottom Spacer --- */
.bottom-spacer { height: 40px; }
</style>
