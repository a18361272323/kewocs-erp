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
      <div class="stats-card stats-card-month">
        <div class="stats-item">
          <span class="stats-num">{{ monthStockIn }}</span>
          <span class="stats-label">本月入库</span>
        </div>
        <div class="stats-divider"></div>
        <div class="stats-item">
          <span class="stats-num">{{ monthStockOut }}</span>
          <span class="stats-label">本月出库</span>
        </div>
        <div class="stats-divider"></div>
        <div class="stats-item">
          <span class="stats-num">{{ lowStockCount }}</span>
          <span class="stats-label">低库存</span>
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
const monthStockIn = ref(0)
const monthStockOut = ref(0)
const lowStockCount = ref(0)
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

    // 本月统计
    const now = new Date()
    const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`
    const monthEnd = now.toISOString().split('T')[0]

    const monthInRes = await stockInApi.getList({
      order_date_start: monthStart,
      order_date_end: monthEnd,
      current: 1,
      pageSize: 1
    })
    monthStockIn.value = monthInRes.data?.total || 0

    const monthOutRes = await stockOutApi.getList({
      order_date_start: monthStart,
      order_date_end: monthEnd,
      current: 1,
      pageSize: 1
    })
    monthStockOut.value = monthOutRes.data?.total || 0

    // 低库存预警
    try {
      const lowRes = await inventoryApi.getLowStock()
      lowStockList.value = lowRes.data?.list || lowRes.data || []
      lowStockCount.value = lowStockList.value.length
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
.mobile-index {
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 20px;
  background: #f5f5f5;
}

.stats-section {
  padding: 12px;
}

.stats-card {
  background: linear-gradient(135deg, #1989fa 0%, #39a9fa 100%);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
}

.stats-card-month {
  background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
  margin-top: 8px;
  padding: 14px 20px;
}

.stats-card-month .stats-num {
  font-size: 22px;
}

.stats-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stats-num {
  font-size: 28px;
  font-weight: bold;
}

.stats-label {
  font-size: 14px;
  opacity: 0.9;
}

.stats-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
}

/* 低库存预警 */
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
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  border-left: 3px solid #ee0a24;
}

.alert-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f5f5f5;
}

.alert-item:last-child {
  border-bottom: none;
}

.alert-name {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.alert-qty {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.alert-num {
  font-size: 18px;
  font-weight: bold;
  color: #ee0a24;
}

.alert-unit {
  font-size: 12px;
  color: #999;
}

.alert-more {
  text-align: center;
  padding: 10px;
  font-size: 13px;
  color: #1989fa;
  cursor: pointer;
}

.menu-section {
  padding: 0 12px;
  margin-bottom: 16px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
  padding-left: 4px;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px 10px;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s;
}

.menu-item:active {
  transform: scale(0.96);
}

.menu-stock-in {
  background: linear-gradient(135deg, #07c160 0%, #10b981 100%);
}

.menu-stock-out {
  background: linear-gradient(135deg, #1989fa 0%, #3b82f6 100%);
}

.menu-return {
  background: linear-gradient(135deg, #ff976a 0%, #f97316 100%);
}

.menu-grid-2col {
  grid-template-columns: repeat(2, 1fr);
}

.menu-transfer {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.menu-check {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
}

.menu-inventory {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
}

.menu-sn-trace {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
}

.menu-records {
  background: linear-gradient(135deg, #64748b 0%, #475569 100%);
}

.menu-text {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
}
</style>
