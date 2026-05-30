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
          unique-opened
          :default-active="currentPath"
          :collapse="appStore.collapsed"
          class="sidebar-menu"
          @select="handleMenuSelect"
        >
          <template v-for="item in appStore.menuItems" :key="item.index || item.path">
            <el-sub-menu v-if="item.children" :index="item.index">
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
import BasicSupplier from './views/BasicData/Supplier.vue'
import BasicCustomer from './views/BasicData/Customer.vue'
import BasicProduct from './views/BasicData/Product.vue'
import BasicWarehouse from './views/BasicData/Warehouse.vue'
import BasicAccount from './views/BasicData/Account.vue'

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
  '/report/snFlow': SnFlowReport,
  '/basic/supplier': BasicSupplier,
  '/basic/customer': BasicCustomer,
  '/basic/product': BasicProduct,
  '/basic/warehouse': BasicWarehouse,
  '/basic/account': BasicAccount
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
/* ============================================
   App Layout - Precision Forge Theme
   ============================================ */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
  font-family: var(--font-body);
  background: var(--color-bg-page);
}

.app-container {
  height: 100vh;
  display: flex;
}

.main-container {
  flex: 1;
  height: 100%;
}

/* --- Sidebar --- */
.sidebar {
  background: var(--color-bg-sidebar);
  transition: width var(--transition-slow);
  overflow: hidden;
  border-right: 1px solid rgba(255,255,255,0.04);
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  color: var(--color-text-inverse);
}

.logo-img {
  width: 32px;
  height: 32px;
  margin-right: 8px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

.logo-text {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.04em;
  background: linear-gradient(135deg, #e8d5a3 0%, #c8963e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-text-short {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-accent);
}

/* --- Sidebar Menu --- */
.sidebar-menu {
  border-right: none;
  background: transparent;
  padding: 8px 0;
}

.sidebar-menu .el-sub-menu__title {
  color: var(--color-text-sidebar) !important;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: 0.02em;
  height: 44px !important;
  line-height: 44px !important;
  padding: 0 20px !important;
  transition: all var(--transition-fast);
}

.sidebar-menu .el-sub-menu__title:hover {
  background: var(--color-bg-sidebar-hover) !important;
  color: var(--color-text-inverse) !important;
}

.sidebar-menu .el-sub-menu__title .el-icon {
  color: var(--color-text-muted);
  transition: color var(--transition-fast);
}

.sidebar-menu .el-sub-menu__title:hover .el-icon {
  color: var(--color-accent);
}

.sidebar-menu .el-sub-menu .el-menu {
  background: var(--color-bg-sidebar-sub) !important;
}

.sidebar-menu .el-menu-item {
  color: var(--color-text-sidebar) !important;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 400;
  height: 40px !important;
  line-height: 40px !important;
  padding: 0 20px 0 52px !important;
  transition: all var(--transition-fast);
  position: relative;
}

.sidebar-menu .el-menu-item:hover {
  background: var(--color-bg-sidebar-hover) !important;
  color: var(--color-text-inverse) !important;
}

.sidebar-menu .el-menu-item.is-active {
  background: var(--color-accent-soft) !important;
  color: var(--color-accent) !important;
  font-weight: 500;
}

.sidebar-menu .el-menu-item.is-active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 18px;
  background: var(--color-accent);
  border-radius: 0 2px 2px 0;
}

/* --- Header --- */
.header {
  background: var(--color-bg-surface);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 56px;
  border-bottom: 1px solid var(--color-border-light);
  box-shadow: 0 1px 3px rgba(0,0,0,0.03);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.collapse-btn {
  font-size: 18px;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
  padding: 4px;
  border-radius: var(--radius-sm);
}
.collapse-btn:hover {
  color: var(--color-accent);
  background: var(--color-accent-soft);
}

/* --- Breadcrumb --- */
.el-breadcrumb {
  font-family: var(--font-body);
  font-size: var(--text-sm);
}

.el-breadcrumb__item .el-breadcrumb__inner {
  color: var(--color-text-muted) !important;
  font-weight: 400;
  transition: color var(--transition-fast);
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: var(--color-text-primary) !important;
  font-weight: 600;
}
.el-breadcrumb__item .el-breadcrumb__inner:hover {
  color: var(--color-accent) !important;
}

/* --- Content --- */
.content-wrapper {
  flex-direction: column;
}

.main-content {
  background: var(--color-bg-page);
  padding: 24px;
  overflow-y: auto;
}

/* --- User --- */
.header-right {
  display: flex;
  align-items: center;
}

.user-name {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  font-weight: 500;
  padding: 6px 12px;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}
.user-name:hover {
  background: var(--color-bg-elevated);
  color: var(--color-text-primary);
}

/* --- No AppKey state --- */
.no-appkey {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: var(--color-text-secondary);
  background: var(--color-bg-page);
}

.no-appkey .is-loading {
  font-size: 40px;
  margin-bottom: 20px;
  color: var(--color-accent);
  animation: fadeInScale var(--transition-slow) ease-out;
}

.no-appkey p {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  font-weight: 500;
  color: var(--color-text-primary);
}

.no-appkey .tip {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-top: 8px;
}
</style>
