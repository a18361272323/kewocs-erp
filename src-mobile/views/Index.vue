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

    <!-- 最近记录 -->
    <div class="recent-section">
      <div class="section-title">最近入库记录</div>
      <van-cell-group v-if="recentList.length > 0" :border="false">
        <van-cell
          v-for="item in recentList"
          :key="item.id"
          :title="item.snCode"
          :label="item.supplierName || '未知供应商'"
          :value="formatDate(item.createTime)"
        />
      </van-cell-group>
      <div v-else class="empty-state">
        <van-icon name="records-o" size="40" color="#ccc" />
        <span class="empty-text">暂无记录</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { showToast } from 'vant'
import { stockInApi, stockOutApi } from '../api'



const todayStockIn = ref(0)
const todayStockOut = ref(0)
const recentList = ref([])

const navigateTo = (path) => {
  window.navigateTo(path)
}

const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return `${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
}

const loadData = async () => {
  try {
    // 今日入库统计
    const inRes = await stockInApi.getList({
      order_date_start: new Date().toISOString().split('T')[0],
      order_date_end: new Date().toISOString().split('T')[0],
      current: 1,
      pageSize: 1
    })
    todayStockIn.value = inRes.data?.total || 0

    // 今日出库统计
    const outRes = await stockOutApi.getList({
      order_date_start: new Date().toISOString().split('T')[0],
      order_date_end: new Date().toISOString().split('T')[0],
      current: 1,
      pageSize: 1
    })
    todayStockOut.value = outRes.data?.total || 0

    // 最近入库记录
    const recentRes = await stockInApi.getList({ current: 1, pageSize: 5 })
    recentList.value = recentRes.data?.list || []
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

.menu-inventory {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
}

.menu-sn-trace {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
}

.menu-text {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
}

.recent-section {
  padding: 0 12px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
  gap: 8px;
}

.empty-text {
  font-size: 14px;
  color: #999;
}
</style>
