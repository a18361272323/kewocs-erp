/**
 * 路由配置
 */

import { createRouter, createWebHistory } from 'vue-router'

// 路由懒加载
const loadView = (path) => () => import(`../views${path}.vue`)

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: loadView('/Dashboard'),
    meta: { title: '首页', icon: 'HomeFilled' }
  },
  
  // 基础资料
  {
    path: '/basic',
    name: 'BasicData',
    redirect: '/basic/supplier',
    meta: { title: '基础资料' },
    children: [
      {
        path: '/basic/supplier',
        name: 'Supplier',
        component: loadView('/BasicData/Supplier'),
        meta: { title: '供应商管理' }
      },
      {
        path: '/basic/customer',
        name: 'Customer',
        component: loadView('/BasicData/Customer'),
        meta: { title: '客户管理' }
      },
      {
        path: '/basic/warehouse',
        name: 'Warehouse',
        component: loadView('/BasicData/Warehouse'),
        meta: { title: '仓库管理' }
      },
      {
        path: '/basic/product',
        name: 'Product',
        component: loadView('/BasicData/Product'),
        meta: { title: '货品管理' }
      },
      {
        path: '/basic/account',
        name: 'Account',
        component: loadView('/BasicData/Account'),
        meta: { title: '账户管理' }
      }
    ]
  },
  
  // SN码管理
  {
    path: '/sn',
    name: 'SnManage',
    redirect: '/sn/list',
    meta: { title: 'SN码管理' },
    children: [
      {
        path: '/sn/list',
        name: 'SnList',
        component: loadView('/SnManage/SnList'),
        meta: { title: 'SN码查询' }
      },
      {
        path: '/sn/trace',
        name: 'SnTrace',
        component: loadView('/SnManage/SnTrace'),
        meta: { title: 'SN码追溯' }
      }
    ]
  },
  
  // 采购管理
  {
    path: '/purchase',
    name: 'Purchase',
    redirect: '/purchase/order',
    meta: { title: '采购管理' },
    children: [
      {
        path: '/purchase/order',
        name: 'PurchaseOrder',
        component: loadView('/Purchase/PurchaseOrder'),
        meta: { title: '采购订单' }
      },
      {
        path: '/purchase/stockIn',
        name: 'StockIn',
        component: loadView('/Purchase/StockIn'),
        meta: { title: '采购入库' }
      },
      {
        path: '/purchase/payment',
        name: 'Payment',
        component: loadView('/Purchase/Payment'),
        meta: { title: '采购付款' }
      }
    ]
  },
  
  // 销售管理
  {
    path: '/sale',
    name: 'Sale',
    redirect: '/sale/order',
    meta: { title: '销售管理' },
    children: [
      {
        path: '/sale/order',
        name: 'SaleOrder',
        component: loadView('/Sale/SaleOrder'),
        meta: { title: '销售订单' }
      },
      {
        path: '/sale/stockOut',
        name: 'StockOut',
        component: loadView('/Sale/StockOut'),
        meta: { title: '销售出库' }
      },
      {
        path: '/sale/collection',
        name: 'Collection',
        component: loadView('/Sale/Collection'),
        meta: { title: '销售收款' }
      }
    ]
  },
  
  // 仓库管理
  {
    path: '/warehouse',
    name: 'WarehouseManage',
    redirect: '/warehouse/inventory',
    meta: { title: '仓库管理' },
    children: [
      {
        path: '/warehouse/transfer',
        name: 'Transfer',
        component: loadView('/Warehouse/Transfer'),
        meta: { title: '调拨单' }
      },
      {
        path: '/warehouse/check',
        name: 'Check',
        component: loadView('/Warehouse/Check'),
        meta: { title: '盘点单' }
      },
      {
        path: '/warehouse/inventory',
        name: 'Inventory',
        component: loadView('/Warehouse/Inventory'),
        meta: { title: '库存台账' }
      }
    ]
  },
  
  // 报表中心
  {
    path: '/report',
    name: 'Report',
    redirect: '/report/purchase',
    meta: { title: '报表中心' },
    children: [
      {
        path: '/report/purchase',
        name: 'PurchaseReport',
        component: loadView('/Report/PurchaseReport'),
        meta: { title: '采购汇总' }
      },
      {
        path: '/report/sale',
        name: 'SaleReport',
        component: loadView('/Report/SaleReport'),
        meta: { title: '销售汇总' }
      },
      {
        path: '/report/inventory',
        name: 'InventoryReport',
        component: loadView('/Report/InventoryReport'),
        meta: { title: '库存明细' }
      },
      {
        path: '/report/snFlow',
        name: 'SnFlowReport',
        component: loadView('/Report/SnFlowReport'),
        meta: { title: 'SN流转表' }
      }
    ]
  },
  
  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: { title: '页面不存在' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = `${to.meta.title || '科沃斯ERP'} - 科沃斯ERP管理系统`
  next()
})

export default router
