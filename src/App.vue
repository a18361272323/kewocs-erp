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
          class="sidebar-menu"
          @select="handleMenuSelect"
          @open="handleSubMenuOpen"
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
// ????????
const openedMenu = ref('')
function handleSubMenuOpen(index) {
  openedMenu.value = index
}
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
   App Layout ? DESIGN.md Linear Dark
   ============================================ */

* { margin: 0; padding: 0; box-sizing: border-box; }

html, body, #app {
  height: 100%;
  font-family: var(--font-body);
  background: var(--color-canvas);
  color: var(--color-ink);
}

.app-container { height: 100vh; display: flex; }
.main-container { flex: 1; height: 100%; }

/* --- Sidebar (near-black surface, Linear nav style) --- */
.sidebar {
  background: var(--color-canvas);
  border-right: 1px solid var(--color-hairline);
  transition: width var(--transition-smooth);
  overflow: hidden;
}

.logo {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--color-hairline);
  padding: 0 var(--space-md);
}

.logo-img {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  opacity: 0.9;
}

.logo-text {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--color-ink);
}

.logo-text-short {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--color-primary);
}

/* --- Sidebar Menu (Linear minimal: 13px, quiet) --- */
.sidebar-menu {
  border-right: none !important;
  background: transparent !important;
  padding: 4px 0;
}

.sidebar-menu .el-sub-menu__title {
  color: var(--color-ink-subtle) !important;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 400;
  letter-spacing: -0.01em;
  height: 36px !important;
  line-height: 36px !important;
  padding: 0 var(--space-md) !important;
  transition: all var(--transition-fast);
  border-left: 2px solid transparent;
}

.sidebar-menu .el-sub-menu__title:hover {
  background: var(--color-surface) !important;
  color: var(--color-ink) !important;
}

.sidebar-menu .el-sub-menu__title .el-icon {
  font-size: 14px;
  color: var(--color-ink-subtle);
  transition: color var(--transition-fast);
}

.sidebar-menu .el-sub-menu__title:hover .el-icon {
  color: var(--color-ink);
}

.sidebar-menu .el-sub-menu .el-menu {
  background: var(--color-surface) !important;
}

.sidebar-menu .el-menu-item {
  color: var(--color-ink-subtle) !important;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 400;
  letter-spacing: -0.01em;
  height: 32px !important;
  line-height: 32px !important;
  padding: 0 var(--space-md) 0 44px !important;
  transition: all var(--transition-fast);
  border-left: 2px solid transparent;
}

.sidebar-menu .el-menu-item:hover {
  background: rgba(94, 106, 210, 0.06) !important;
  color: var(--color-ink) !important;
}

.sidebar-menu .el-menu-item.is-active {
  background: rgba(94, 106, 210, 0.10) !important;
  color: var(--color-primary) !important;
  font-weight: 500;
  border-left-color: var(--color-primary);
}

/* --- Header (Linear top-bar: dark, clean) --- */
.header {
  background: var(--color-canvas);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-lg);
  height: 56px;
  border-bottom: 1px solid var(--color-hairline);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.collapse-btn {
  font-size: 15px;
  cursor: pointer;
  color: var(--color-ink-subtle);
  transition: color var(--transition-fast);
  padding: 4px;
  border-radius: var(--radius-xs);
}
.collapse-btn:hover {
  color: var(--color-ink);
  background: var(--color-surface);
}

/* --- Breadcrumb --- */
.el-breadcrumb {
  font-family: var(--font-body);
  font-size: 13px;
}
.el-breadcrumb__item .el-breadcrumb__inner {
  color: var(--color-ink-subtle) !important;
  font-weight: 400;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: var(--color-ink) !important;
  font-weight: 500;
}
.el-breadcrumb__item .el-breadcrumb__inner:hover {
  color: var(--color-primary) !important;
}

/* --- Content --- */
.content-wrapper { flex-direction: column; }

.main-content {
  background: var(--color-canvas);
  padding: var(--space-lg) var(--space-xl);
  overflow-y: auto;
}

/* --- User --- */
.header-right { display: flex; align-items: center; }

.user-name {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-ink-muted);
  font-size: 13px;
  font-weight: 400;
  padding: 5px 10px;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}
.user-name:hover {
  background: var(--color-surface);
  color: var(--color-ink);
}

/* --- No AppKey --- */
.no-appkey {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: var(--color-ink-muted);
  background: var(--color-canvas);
}
.no-appkey .is-loading {
  font-size: 32px;
  margin-bottom: var(--space-md);
  color: var(--color-primary);
}
.no-appkey p {
  font-family: var(--font-display);
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--color-ink);
}
.no-appkey .tip {
  font-size: var(--text-sm);
  color: var(--color-ink-subtle);
  margin-top: 4px;
}
</style>
