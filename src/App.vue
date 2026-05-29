<template>
  <div id="app" class="app-container">
    <!-- 等待 appKey -->
    <div v-if="!appStore.hasAppKey" class="no-appkey">
      <el-icon class="is-loading"><Loading /></el-icon>
      <p>正在等待授权信息...</p>
      <p class="tip">请从薪福通低开平台打开本页面</p>
    </div>
    
    <!-- 主应用 -->
    <el-container v-else class="main-container">
      <!-- 侧边栏 -->
      <el-aside :width="appStore.collapsed ? '64px' : '220px'" class="sidebar">
        <div class="logo">
          <img v-if="!appStore.collapsed" src="https://kewocs-erp.pages.dev/logo.svg" alt="Logo" class="logo-img">
          <span v-if="!appStore.collapsed" class="logo-text">科沃斯ERP</span>
          <span v-else class="logo-text-short">ERP</span>
        </div>
        
        <el-menu
          :default-active="currentPath"
          :collapse="appStore.collapsed"
          :unique-opened="true"
          class="sidebar-menu"
          @select="handleMenuSelect"
        >
          <template v-for="item in appStore.menuItems" :key="item.path">
            <el-sub-menu v-if="item.children" :index="item.path">
              <template #title>
                <el-icon><component :is="getIcon(item.icon)" /></el-icon>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item 
                v-for="child in item.children" 
                :key="child.path" 
                :index="child.path"
              >
                {{ child.title }}
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="item.path">
              <el-icon><component :is="getIcon(item.icon)" /></el-icon>
              <span>{{ item.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      
      <!-- 主内容区 -->
      <el-container class="content-wrapper">
        <!-- 顶部 -->
        <el-header class="header">
          <div class="header-left">
            <el-icon class="collapse-btn" @click="appStore.toggleCollapse">
              <Fold v-if="!appStore.collapsed" />
              <Expand v-else />
            </el-icon>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item @click="navigateTo('/')">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-if="currentParentMenu">
                {{ currentParentMenu.title }}
              </el-breadcrumb-item>
              <el-breadcrumb-item>{{ currentMenuTitle }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          
          <div class="header-right">
            <span class="user-name">
              <el-icon><User /></el-icon>
              {{ appStore.userName }}
            </span>
          </div>
        </el-header>
        
        <!-- 内容 -->
        <el-main class="main-content">
          <component :is="currentComponent" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, shallowRef } from 'vue'
import { useAppStore } from './stores/app'
import { Fold, Expand, User, HomeFilled, Folder, Box, ShoppingCart, Sell, OfficeBuilding, DataLine, Loading } from '@element-plus/icons-vue'

// 导入所有页面组件
import Dashboard from './views/Dashboard.vue'
import SnList from './views/SnManage/SnList.vue'
import PurchaseStockIn from './views/Purchase/StockIn.vue'
import PurchasePayment from './views/Purchase/Payment.vue'
import PurchaseReturn from './views/Return/PurchaseReturn.vue'
import SaleStockOut from './views/Sale/SaleOrder.vue'
import SaleCollection from './views/Sale/Collection.vue'
import SaleReturn from './views/Return/SaleReturn.vue'
import WarehouseTransfer from './views/Warehouse/Transfer.vue'
import WarehouseInventory from './views/Warehouse/Inventory.vue'
import WarehouseCheck from './views/Warehouse/Check.vue'
import SnTrace from './views/SnManage/SnTrace.vue'
import SaleReport from './views/Report/SaleReport.vue'
import InventoryReport from './views/Report/InventoryReport.vue'
import SnFlowReport from './views/Report/SnFlowReport.vue'

// 创建 store 实例
const appStore = useAppStore()

// 当前路径（用于路由）
const currentPath = ref(window.location.hash.replace('#', '') || '/')

// 组件映射 - 路径必须与 menuItems 一致
const componentMap = {
  '/': Dashboard,
  '/sn/list': SnList,
  '/purchase/stockIn': PurchaseStockIn,  // 入库单（包含扫码入库功能）
  '/purchase/payment': PurchasePayment,
  '/purchase/return': PurchaseReturn,
  '/sale/stockOut': SaleStockOut,
  '/sale/collection': SaleCollection,
  '/sale/return': SaleReturn,
  '/warehouse/transfer': WarehouseTransfer,
  '/warehouse/check': WarehouseCheck,
  '/warehouse/inventory': WarehouseInventory,
  '/sn/trace': SnTrace,
  '/report/sale': SaleReport,
  '/report/inventory': InventoryReport,
  '/report/snFlow': SnFlowReport
}

// 获取当前组件
const currentComponent = computed(() => {
  return componentMap[currentPath.value] || Dashboard
})

// 当前激活的菜单
const activeMenu = computed(() => currentPath.value)

// 获取当前菜单标题
const currentMenuTitle = computed(() => {
  for (const item of appStore.menuItems) {
    if (item.path === currentPath.value) return item.title
    if (item.children) {
      const found = item.children.find(child => child.path === currentPath.value)
      if (found) return found.title
    }
  }
  return '首页'
})

// 当前父菜单
const currentParentMenu = computed(() => {
  for (const item of appStore.menuItems) {
    if (item.children) {
      const found = item.children.find(child => child.path === currentPath.value)
      if (found) return item
    }
  }
  return null
})

// 图标映射
const iconMap = {
  HomeFilled,
  Folder,
  Box,
  ShoppingCart,
  Sell,
  OfficeBuilding,
  DataLine
}

function getIcon(iconName) {
  return iconMap[iconName] || HomeFilled
}

// 菜单选择
function handleMenuSelect(index) {
  navigateTo(index)
}

// 导航
function navigateTo(path) {
  currentPath.value = path
  window.location.hash = path
}

// 处理 hash 变化
function handleHashChange() {
  const hash = window.location.hash.replace('#', '') || '/'
  currentPath.value = hash
}

onMounted(() => {
  // 初始化 hash
  handleHashChange()
  
  // 监听 hash 变化
  window.addEventListener('hashchange', handleHashChange)
  
  // 初始化 store（获取用户信息）
  appStore.init()
})

onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange)
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.app-container {
  height: 100vh;
  display: flex;
}

.main-container {
  flex: 1;
  height: 100%;
}

.sidebar {
  background: #304156;
  transition: width 0.3s;
  overflow: hidden;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2b3a4a;
  color: #fff;
}

.logo-img {
  width: 32px;
  height: 32px;
  margin-right: 8px;
}

.logo-text {
  font-size: 18px;
  font-weight: bold;
}

.logo-text-short {
  font-size: 14px;
  font-weight: bold;
}

.sidebar-menu {
  border-right: none;
  background: #304156;
}

.sidebar-menu .el-sub-menu__title {
  color: #bfcbd9;
}

.sidebar-menu .el-menu-item {
  color: #ffffff;
}

.sidebar-menu .el-menu-item:hover,
.sidebar-menu .el-sub-menu__title:hover {
  background: #1f2d3d;
  color: #ffffff;
}

.sidebar-menu .el-sub-menu .el-menu {
  background: #1f2d3d;
}

.sidebar-menu .el-menu-item.is-active {
  background: #409EFF !important;
  color: #fff;
}

.header {
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}

.collapse-btn {
  font-size: 20px;
  cursor: pointer;
  margin-right: 20px;
}

.content-wrapper {
  flex-direction: column;
}

.main-content {
  background: #f0f2f5;
  padding: 20px;
  overflow-y: auto;
}

.user-name {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #606266;
}

.no-appkey {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #606266;
}

.no-appkey .is-loading {
  font-size: 40px;
  margin-bottom: 20px;
}

.no-appkey .tip {
  font-size: 12px;
  color: #909399;
  margin-top: 10px;
}
</style>
