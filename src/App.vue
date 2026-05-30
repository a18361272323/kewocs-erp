<template>
  <div id="app" class="app-root">
    <ParticleBackground />
    
    <!-- Loading -->
    <div v-if="!appStore.hasAppKey" class="loading-screen">
      <div class="loading-spinner"></div>
      <p class="loading-text">正在等待授权信息...</p>
      <p class="loading-sub">请从薪福通低开平台打开本页面</p>
    </div>
    
    <!-- Main App -->
    <div v-else class="app-layout">
      <!-- Glass Sidebar -->
      <aside class="sidebar-glass" :class="{ collapsed: appStore.collapsed }">
        <div class="sidebar-inner">
          <div class="logo-area">
            <img src="https://kewocs-erp.pages.dev/logo.svg" alt="Logo" class="logo-icon" />
            <span v-if="!appStore.collapsed" class="logo-text">科沃斯ERP</span>
          </div>
          
          <nav class="nav-list">
            <template v-for="item in appStore.menuItems" :key="item.index || item.path">
              <!-- Submenu -->
              <div v-if="item.children" class="nav-group">
                <button 
                  class="nav-parent" 
                  :class="{ active: isParentActive(item) }"
                  @click="toggleSubmenu(item.index)"
                >
                  <el-icon class="nav-icon"><component :is="getIcon(item.icon)" /></el-icon>
                  <span v-if="!appStore.collapsed" class="nav-label">{{ item.title }}</span>
                  <el-icon v-if="!appStore.collapsed" class="nav-chevron" :class="{ open: openedMenu === item.index }">
                    <ArrowDown />
                  </el-icon>
                </button>
                <div class="nav-children" :class="{ open: openedMenu === item.index }">
                  <button 
                    v-for="child in item.children" 
                    :key="child.path"
                    class="nav-child"
                    :class="{ active: currentPath === child.path }"
                    @click="navigateTo(child.path)"
                  >
                    {{ child.title }}
                  </button>
                </div>
              </div>
              <!-- Single item -->
              <button 
                v-else 
                class="nav-parent"
                :class="{ active: currentPath === item.path }"
                @click="navigateTo(item.path)"
              >
                <el-icon class="nav-icon"><component :is="getIcon(item.icon)" /></el-icon>
                <span v-if="!appStore.collapsed" class="nav-label">{{ item.title }}</span>
              </button>
            </template>
          </nav>
        </div>
        
        <div class="sidebar-footer">
          <button class="collapse-btn" @click="appStore.toggleCollapse">
            <el-icon :size="16"><Fold v-if="!appStore.collapsed" /><Expand v-else /></el-icon>
          </button>
        </div>
      </aside>
      
      <!-- Main Content Area -->
      <div class="main-area">
        <!-- Top Bar -->
        <header class="topbar-glass">
          <div class="topbar-left">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item @click="navigateTo('/')">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-if="currentParentMenu">{{ currentParentMenu.title }}</el-breadcrumb-item>
              <el-breadcrumb-item>{{ currentMenuTitle }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="topbar-right">
            <span class="user-badge">
              <el-icon><User /></el-icon>
              {{ appStore.userName }}
            </span>
          </div>
        </header>
        
        <!-- Page Content -->
        <main class="page-content">
          <div class="page-inner">
            <component :is="currentComponent" />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAppStore } from './stores/app'
import { 
  Fold, Expand, User, ArrowDown, HomeFilled, 
  Folder, Box, ShoppingCart, Sell, OfficeBuilding, DataLine 
} from '@element-plus/icons-vue'
import ParticleBackground from './components/ParticleBackground.vue'

// Import all page components
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

const appStore = useAppStore()

// Single submenu open at a time
const openedMenu = ref('')
function toggleSubmenu(index) {
  openedMenu.value = openedMenu.value === index ? '' : index
}

// Check if a parent menu is active
function isParentActive(item) {
  if (!item.children) return false
  return item.children.some(c => c.path === currentPath.value)
}

// Current path from hash
const currentPath = ref(window.location.hash.replace('#', '') || '/')

function navigateTo(path) {
  window.location.hash = path
  currentPath.value = path
}

// Listen for hash changes
function onHashChange() {
  currentPath.value = window.location.hash.replace('#', '') || '/'
}

onMounted(() => {
  appStore.init()
  window.addEventListener('hashchange', onHashChange)
})
onUnmounted(() => window.removeEventListener('hashchange', onHashChange))

// Component map
const componentMap = {
  '/': Dashboard,
  '/sn/list': SnList,
  '/purchase/stockIn': PurchaseStockIn,
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

const currentComponent = computed(() => componentMap[currentPath.value] || Dashboard)

const currentMenuTitle = computed(() => {
  for (const item of appStore.menuItems) {
    if (item.path === currentPath.value) return item.title
    if (item.children) {
      const found = item.children.find(c => c.path === currentPath.value)
      if (found) return found.title
    }
  }
  return '首页'
})

const currentParentMenu = computed(() => {
  for (const item of appStore.menuItems) {
    if (item.children && item.children.some(c => c.path === currentPath.value)) {
      return item
    }
  }
  return null
})

const iconMap = { HomeFilled, Folder, Box, ShoppingCart, Sell, OfficeBuilding, DataLine }
function getIcon(name) { return iconMap[name] || Folder }
</script>

<style>
.app-root {
  min-height: 100vh;
  background: var(--color-canvas);
}
.loading-screen {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  height: 100vh; gap: 12px; position: relative; z-index: 1;
}
.loading-spinner {
  width: 32px; height: 32px; border: 3px solid var(--color-border);
  border-top-color: var(--color-accent); border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.loading-text { font-family: var(--font-display); font-size: 16px; color: var(--color-ink); font-weight: 500; }
.loading-sub { font-size: 13px; color: var(--color-ink-subtle); }

/* Layout */
.app-layout { display: flex; min-height: 100vh; position: relative; }

/* Sidebar */
.sidebar-glass {
  position: fixed; left: 0; top: 0; bottom: 0; z-index: 50;
  width: 240px; background: rgba(255,255,255,0.82);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid var(--color-border);
  display: flex; flex-direction: column;
  transition: width 0.25s cubic-bezier(0.4,0,0.2,1);
}
.sidebar-glass.collapsed { width: 64px; }
.sidebar-inner { flex: 1; overflow-y: auto; padding: 16px 12px; }
.sidebar-inner::-webkit-scrollbar { width: 0; }

.logo-area {
  display: flex; align-items: center; gap: 10px;
  padding: 4px 4px 16px; margin-bottom: 8px;
}
.logo-icon { width: 32px; height: 32px; }
.logo-text {
  font-family: var(--font-display); font-size: 18px; font-weight: 700;
  color: var(--color-ink); white-space: nowrap;
}

/* Nav */
.nav-list { display: flex; flex-direction: column; gap: 2px; }
.nav-group { display: flex; flex-direction: column; }
.nav-parent {
  display: flex; align-items: center; gap: 10px; width: 100%;
  padding: 9px 10px; border: none; background: transparent;
  border-radius: var(--radius-md); cursor: pointer;
  font-family: var(--font-body); font-size: 13.5px; font-weight: 500;
  color: var(--color-ink-muted); text-align: left;
  transition: all 0.15s ease;
}
.nav-parent:hover { background: var(--color-surface-2); color: var(--color-ink); }
.nav-parent.active, .nav-parent:has(+ .nav-children .nav-child.active) {
  background: var(--color-accent-soft); color: var(--color-accent);
}
.nav-icon { flex-shrink: 0; width: 18px; height: 18px; }
.nav-label { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nav-chevron { flex-shrink: 0; transition: transform 0.2s ease; width: 14px; height: 14px; }
.nav-chevron.open { transform: rotate(180deg); }

.nav-children {
  overflow: hidden; max-height: 0;
  transition: max-height 0.25s ease;
}
.nav-children.open { max-height: 300px; }
.nav-child {
  display: block; width: 100%; padding: 7px 10px 7px 38px;
  border: none; background: transparent; border-radius: var(--radius-sm);
  font-family: var(--font-body); font-size: 13px; color: var(--color-ink-subtle);
  text-align: left; cursor: pointer; transition: all 0.15s ease;
}
.nav-child:hover { color: var(--color-ink); background: var(--color-surface-2); }
.nav-child.active { color: var(--color-accent); background: var(--color-accent-soft); font-weight: 500; }

.sidebar-footer { padding: 12px; border-top: 1px solid var(--color-border-light); }
.collapse-btn {
  display: flex; align-items: center; justify-content: center;
  width: 34px; height: 34px; border: 1px solid var(--color-border);
  border-radius: var(--radius-sm); background: var(--color-surface);
  color: var(--color-ink-subtle); cursor: pointer; transition: all 0.15s ease;
}
.collapse-btn:hover { background: var(--color-surface-2); color: var(--color-ink); }

/* Main Area */
.main-area { flex: 1; margin-left: 240px; transition: margin-left 0.25s cubic-bezier(0.4,0,0.2,1); }
.sidebar-glass.collapsed ~ .main-area { margin-left: 64px; }

/* Top Bar */
.topbar-glass {
  position: sticky; top: 0; z-index: 40;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 24px; height: 56px;
  background: rgba(255,255,255,0.78); backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-border-light);
}
.topbar-left { display: flex; align-items: center; }
.topbar-right { display: flex; align-items: center; }
.user-badge {
  display: flex; align-items: center; gap: 6px;
  font-size: 13px; color: var(--color-ink-muted); font-weight: 500;
}

/* Page Content */
.page-content { position: relative; z-index: 1; min-height: calc(100vh - 56px); }
.page-inner { padding: 28px 28px; max-width: 1400px; }

/* Override Element Plus breadcrumb */
.topbar-glass .el-breadcrumb { font-size: 13px; }
.topbar-glass .el-breadcrumb__item { cursor: pointer; }
</style>
