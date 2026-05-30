<template>
  <div class="mobile-index">
    <!-- 今日统计 -->
    <div class="stats-section">
      <div class="stats-card">
        <div class="stats-item">
          <span class="stats-num">{{ todayStockIn }}</span>
          <span class="stats-label">今日入库</span>
        </div>
        <div class="stats-divider"></div>
        <div class="stats-item">
          <span class="stats-num">{{ todayStockOut }}</span>
          <span class="stats-label">今日出库</span>
        </div>
        <div class="stats-divider"></div>
        <div class="stats-item">
          <span class="stats-num">{{ todayReturn }}</span>
          <span class="stats-label">今日退货</span>
        </div>
      </div>

    </div>

    <!-- 低库存预警 -->
    <div v-if="lowStockList.length > 0" class="alert-section">
      <div class="section-title" @click="navigateTo('/inventory')">
        <span>库存预警</span>
        <van-tag type="danger" size="medium">{{ lowStockList.length }}项低库存</van-tag>
      </div>
      <div class="alert-list">
        <div
          v-for="item in lowStockList.slice(0, 3)"
          :key="item.productId || item.id"
          class="alert-item"
          @click="navigateTo('/inventory')"
        >
          <div class="alert-name">{{ item.productName || item.name }}</div>
          <div class="alert-qty">
            <span class="alert-num">{{ item.totalQty || item.quantity || 0 }}</span>
            <span class="alert-unit">台</span>
          </div>
        </div>
        <div v-if="lowStockList.length > 3" class="alert-more" @click="navigateTo('/inventory')">
          查看全部 {{ lowStockList.length }} 项
        </div>
      </div>
    </div>

    <!-- 功能入口 -->
    <div class="menu-section">
      <div class="section-title">业务操作</div>
      <div class="menu-grid">
        <div class="menu-item menu-stock-in" @click="navigateTo('/stock-in')">
          <van-icon name="scan" size="32" color="#fff" />
          <span class="menu-text">扫码入库</span>
        </div>
        <div class="menu-item menu-stock-out" @click="navigateTo('/stock-out')">
          <van-icon name="logistics" size="32" color="#fff" />
          <span class="menu-text">扫码出库</span>
        </div>
        <div class="menu-item menu-return" @click="navigateTo('/return')">
          <van-icon name="revoke" size="32" color="#fff" />
          <span class="menu-text">退货处理</span>
        </div>
      </div>
    </div>

    <!-- 仓库操作 -->
    <div class="menu-section">
      <div class="section-title">仓库管理</div>
      <div class="menu-grid menu-grid-2col">
        <div class="menu-item menu-transfer" @click="navigateTo('/transfer')">
          <van-icon name="exchange" size="32" color="#fff" />
          <span class="menu-text">调拨确认</span>
        </div>
        <div class="menu-item menu-check" @click="navigateTo('/check')">
          <van-icon name="passed" size="32" color="#fff" />
          <span class="menu-text">盘点扫描</span>
        </div>
      </div>
    </div>

    <!-- 查询入口 -->
    <div class="menu-section">
      <div class="section-title">信息查询</div>
      <div class="menu-grid menu-grid-2col">
        <div class="menu-item menu-inventory" @click="navigateTo('/inventory')">
          <van-icon name="bar-chart-o" size="32" color="#fff" />
          <span class="menu-text">库存查询</span>
        </div>
        <div class="menu-item menu-sn-trace" @click="navigateTo('/sn-trace')">
          <van-icon name="search" size="32" color="#fff" />
          <span class="menu-text">SN溯源</span>
        </div>
      </div>
    </div>

    <!-- 操作记录入口 -->
    <div class="menu-section">
      <div class="menu-grid menu-grid-2col">
        <div class="menu-item menu-records" @click="navigateTo('/records')">
          <van-icon name="records-o" size="32" color="#fff" />
          <span class="menu-text">操作记录</span>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { stockInApi, stockOutApi, saleReturnApi, inventoryApi } from '../api'

const todayStockIn = ref(0)
const todayStockOut = ref(0)
const todayReturn = ref(0)

const lowStockList = ref([])

const navigateTo = (path) => {
  window.navigateTo(path)
}

const loadData = async () => {
  try {
    const today = new Date().toISOString().split('T')[0]

    // 今日入库统计
    const inRes = await stockInApi.getList({
      order_date_start: today,
      order_date_end: today,
      current: 1,
      pageSize: 1
    })
    todayStockIn.value = inRes.data?.total || 0

    // 今日出库统计
    const outRes = await stockOutApi.getList({
      order_date_start: today,
      order_date_end: today,
      current: 1,
      pageSize: 1
    })
    todayStockOut.value = outRes.data?.total || 0

    // 今日退货统计
    const retRes = await saleReturnApi.getList({
      order_date_start: today,
      order_date_end: today,
      current: 1,
      pageSize: 1
    })
    todayReturn.value = retRes.data?.total || 0

    // 低库存预警
    try {
      const lowRes = await inventoryApi.getLowStock()
      lowStockList.value = lowRes.data?.list || lowRes.data || []
    } catch (e) {
      console.warn('低库存数据加载失败:', e)
    }
  } catch (error) {
    console.error('加载首页数据失败:', error)
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
/* ============================================
   Mobile Index ? DESIGN.md Linear Dark
   ============================================ */

.mobile-index {
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 24px;
  background: var(--color-canvas, #010102);
  color: var(--color-ink, #f7f8f8);
}

/* --- Stats Section --- */
.stats-section {
  padding: 12px;
}

.stats-card {
  background: var(--color-surface, #0f1011);
  border: 1px solid var(--color-hairline, #23252a);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.stats-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stats-num {
  font-size: 28px;
  font-weight: 600;
  color: var(--color-ink, #f7f8f8);
  font-family: 'Inter', 'SF Pro Display', -apple-system, sans-serif;
  letter-spacing: -0.02em;
}

.stats-label {
  font-size: 13px;
  color: var(--color-ink-subtle, #8a8f98);
}

.stats-divider {
  width: 1px;
  height: 40px;
  background: var(--color-hairline, #23252a);
}

/* --- Alert Section --- */
.alert-section {
  padding: 0 12px;
  margin-bottom: 12px;
}

.alert-section .section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.alert-list {
  background: var(--color-surface, #0f1011);
  border: 1px solid var(--color-hairline, #23252a);
  border-left: 2px solid var(--color-danger, #f14653);
  border-radius: 10px;
  overflow: hidden;
}

.alert-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-hairline, #23252a);
}

.alert-item:last-child {
  border-bottom: none;
}

.alert-name {
  font-size: 14px;
  color: var(--color-ink, #f7f8f8);
  font-weight: 500;
}

.alert-qty {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.alert-num {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-danger, #f14653);
}

.alert-unit {
  font-size: 12px;
  color: var(--color-ink-subtle, #8a8f98);
}

.alert-more {
  text-align: center;
  padding: 10px;
  font-size: 13px;
  color: var(--color-primary, #5e6ad2);
  cursor: pointer;
  font-weight: 500;
}

/* --- Menu Sections --- */
.menu-section {
  padding: 0 12px;
  margin-bottom: 16px;
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-ink-subtle, #8a8f98);
  margin-bottom: 12px;
  padding-left: 4px;
  text-transform: none;
  letter-spacing: 0;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.menu-grid-2col {
  grid-template-columns: repeat(2, 1fr);
}

/* --- Menu Items (dark surface cards, no gradients) --- */
.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px 10px;
  border-radius: 12px;
  cursor: pointer;
  transition: background var(--transition-fast, 120ms ease);
  background: var(--color-surface, #0f1011);
  border: 1px solid var(--color-hairline, #23252a);
}

.menu-item:active {
  background: var(--color-surface-2, #141516);
  border-color: var(--color-primary, #5e6ad2);
}

/* Icon colors per menu item (subtle brand tint) */
.menu-stock-in  { --menu-accent: var(--color-success, #27a644); }
.menu-stock-out { --menu-accent: var(--color-primary, #5e6ad2); }
.menu-return    { --menu-accent: var(--color-danger, #f14653); }
.menu-transfer  { --menu-accent: var(--color-warning, #e9b73f); }
.menu-check     { --menu-accent: var(--color-primary, #5e6ad2); }
.menu-inventory { --menu-accent: var(--color-primary, #5e6ad2); }
.menu-sn-trace  { --menu-accent: var(--color-info, #5e6ad2); }
.menu-records   { --menu-accent: var(--color-ink-subtle, #8a8f98); }

.menu-item :deep(.van-icon) {
  color: var(--menu-accent, var(--color-ink-subtle, #8a8f98)) !important;
}

.menu-text {
  color: var(--color-ink-muted, #d0d6e0);
  font-size: 13px;
  font-weight: 500;
}
</style>
