<template>
  <div class="mobile-app">
    <component :is="currentComponent" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Index from './views/Index.vue'
import StockIn from './views/Purchase/StockIn.vue'
import StockOut from './views/Sale/StockOut.vue'
import SaleReturn from './views/Return/SaleReturn.vue'
import InventoryQuery from './views/Query/InventoryQuery.vue'
import SnTrace from './views/Query/SnTrace.vue'
import TransferConfirm from './views/Transfer/TransferConfirm.vue'
import CheckScan from './views/Check/CheckScan.vue'
import RecentRecords from './views/Records/RecentRecords.vue'

const componentMap = {
  Index,
  StockIn,
  StockOut,
  SaleReturn,
  InventoryQuery,
  SnTrace,
  TransferConfirm,
  CheckScan,
  RecentRecords
}

const currentPath = ref(window.location.hash.slice(1) || '/')

const currentComponent = computed(() => {
  const route = currentPath.value
  if (route === '/stock-in') return componentMap.StockIn
  if (route === '/stock-out') return componentMap.StockOut
  if (route === '/return') return componentMap.SaleReturn
  if (route === '/inventory') return componentMap.InventoryQuery
  if (route === '/sn-trace') return componentMap.SnTrace
  if (route === '/transfer') return componentMap.TransferConfirm
  if (route === '/check') return componentMap.CheckScan
  if (route === '/records') return componentMap.RecentRecords
  return componentMap.Index
})

const handleHashChange = () => {
  currentPath.value = window.location.hash.slice(1) || '/'
}

// 首页禁止返回操作，防止退出iframe
const handlePopState = () => {
  const route = window.location.hash.slice(1) || '/'
  if (route === '/' || route === '') {
    // 在首页时，重新pushState阻止后退
    history.pushState(null, '', location.href)
  }
}

onMounted(() => {
  window.addEventListener('hashchange', handleHashChange)
  window.addEventListener('popstate', handlePopState)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange)
  window.removeEventListener('popstate', handlePopState)
})

// 全局导航方法
window.navigateTo = (path) => {
  window.location.hash = path
}
window.goBack = () => {
  window.history.back()
}
</script>

<style scoped>
.mobile-app {
  height: 100vh;
  width: 100vw;
  background: var(--color-canvas, #faf7f2);
  color: var(--color-ink, #1c1915);
  font-family: 'Inter', 'SF Pro Text', -apple-system, system-ui, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>
