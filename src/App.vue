<template>
  <div id="app" class="app-container">
    <!-- �ȴ� appKey -->
    <div v-if="!appStore.hasAppKey" class="no-appkey">
      <el-icon class="is-loading"><Loading /></el-icon>
      <p>���ڵȴ���Ȩ��Ϣ...</p>
      <p class="tip">���н��ͨ�Ϳ�ƽ̨�򿪱�ҳ��</p>
    </div>
    
    <!-- ��Ӧ�� -->
    <el-container v-else class="main-container">
      <!-- ����� -->
      <el-aside :width="appStore.collapsed ? '64px' : '220px'" class="sidebar">
        <div class="logo">
          <img v-if="!appStore.collapsed" src="https://kewocs-erp.pages.dev/logo.svg" alt="Logo" class="logo-img">
          <span v-if="!appStore.collapsed" class="logo-text">����˹ERP</span>
          <span v-else class="logo-text-short">ERP</span>
        </div>
        
        <div class="sidebar-menu">
          <template v-for="item in appStore.menuItems" :key="item.index || item.path">
            <!-- ���Ӳ˵��ķ��� -->
            <div v-if="item.children" class="menu-group" :class="{ 'is-opened': openMenus.includes(item.index) }">
              <div class="menu-group-title" @click="toggleMenu(item.index)">
                <el-icon class="menu-icon"><component :is="getIcon(item.icon)" /></el-icon>
                <span class="menu-label">{{ item.title }}</span>
                <el-icon class="menu-arrow">
                  <ArrowDown v-if="openMenus.includes(item.index)" />
                  <ArrowRight v-else />
                </el-icon>
              </div>
              <div v-show="openMenus.includes(item.index)" class="menu-group-children">
                <div
                  v-for="child in item.children"
                  :key="child.path"
                  class="menu-item"
                  :class="{ 'is-active': currentPath === child.path }"
                  @click="navigateTo(child.path)"
                >
                  {{ child.title }}
                </div>
              </div>
            </div>
            <!-- ���Ӳ˵��Ķ����� -->
            <div
              v-else
              class="menu-item top-level"
              :class="{ 'is-active': currentPath === item.path }"
              @click="navigateTo(item.path)"
            >
              <el-icon class="menu-icon"><component :is="getIcon(item.icon)" /></el-icon>
              <span class="menu-label">{{ item.title }}</span>
            </div>
          </template>
        </div>
      </el-aside>
      
      <!-- �������� -->
      <el-container class="content-wrapper">
        <!-- ���� -->
        <el-header class="header">
          <div class="header-left">
            <el-icon class="collapse-btn" @click="appStore.toggleCollapse">
              <Fold v-if="!appStore.collapsed" />
              <Expand v-else />
            </el-icon>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item @click="navigateTo('/')">��ҳ</el-breadcrumb-item>
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
        
        <!-- ���� -->
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
import { Fold, Expand, User, HomeFilled, Folder, Box, ShoppingCart, Sell, OfficeBuilding, DataLine, Loading, ArrowDown, ArrowRight } from '@element-plus/icons-vue'

// ��������ҳ�����
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

// ���� store ʵ��
const appStore = useAppStore()
// �˵����ã������ֶ�����չ��״̬��
// ��ǰ·��������·�ɣ�
// �˵�չ��״̬����ȫ���й�����ƹ� el-menu ״̬��
const openMenus = ref([])

function toggleMenu(path) {
  const idx = openMenus.value.indexOf(path)
  if (idx >= 0) {
    openMenus.value.splice(idx, 1)
  } else {
    openMenus.value = [path]  // ֻ�����ǰ
  }
}

// ��ǰ·��������·�ɣ�
const currentPath = ref(window.location.hash.replace('#', '') || '/')

// ���ӳ�� - ·�������� menuItems һ��
const componentMap = {
  '/': Dashboard,
  '/sn/list': SnList,
  '/purchase/stockIn': PurchaseStockIn,  // ��ⵥ������ɨ����⹦�ܣ�
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

// ��ȡ��ǰ���
const currentComponent = computed(() => {
  return componentMap[currentPath.value] || Dashboard
})

// ��ǰ����Ĳ˵�
const activeMenu = computed(() => currentPath.value)

// ��ȡ��ǰ�˵�����
const currentMenuTitle = computed(() => {
  for (const item of appStore.menuItems) {
    if (item.path === currentPath.value) return item.title
    if (item.children) {
      const found = item.children.find(child => child.path === currentPath.value)
      if (found) return found.title
    }
  }
  return '��ҳ'
})

// ��ǰ���˵�
const currentParentMenu = computed(() => {
  for (const item of appStore.menuItems) {
    if (item.children) {
      const found = item.children.find(child => child.path === currentPath.value)
      if (found) return item
    }
  }
  return null
})

// ͼ��ӳ��
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

// �˵�ѡ��
function handleMenuSelect(index) {
  navigateTo(index)
}

// ����
function navigateTo(path) {
  currentPath.value = path
  window.location.hash = path
}

// ���� hash �仯
function handleHashChange() {
  const hash = window.location.hash.replace('#', '') || '/'
  currentPath.value = hash
}

onMounted(() => {
  // ��ʼ�� hash
  handleHashChange()
  
  // ���� hash �仯
  window.addEventListener('hashchange', handleHashChange)
  
  // ��ʼ�� store����ȡ�û���Ϣ��
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

/* 自定义菜单样式 */
.sidebar-menu {
  height: calc(100vh - 60px);
  overflow-y: auto;
}
.menu-group-title {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #bfcbd9;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  user-select: none;
}
.menu-group-title:hover {
  background: #1f2d3d;
  color: #fff;
}
.menu-icon {
  font-size: 16px;
  margin-right: 8px;
  flex-shrink: 0;
}
.menu-label {
  flex: 1;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
}
.menu-arrow {
  font-size: 12px;
  flex-shrink: 0;
  transition: transform 0.3s;
}
.menu-group.is-opened > .menu-group-title {
  color: #fff;
}
.menu-group-children {
  background: #1f2d3d;
}
.menu-item {
  padding: 10px 20px 10px 48px;
  color: #bfcbd9;
  cursor: pointer;
  font-size: 13px;
  transition: background 0.2s, color 0.2s;
  user-select: none;
}
.menu-item:hover {
  background: #263445;
  color: #fff;
}
.menu-item.is-active {
  background: #409EFF;
  color: #fff;
}
.menu-item.top-level {
  padding-left: 20px;
  font-size: 14px;
}
</style>
