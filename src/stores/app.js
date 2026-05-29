/**
 * 认证与全局状态管理
 * 直接调用 API 获取用户信息，不依赖 postMessage
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // ========== 状态 ==========
  const userInfo = ref(null)
  const isReady = ref(false)
  const isLoading = ref(false)
  const collapsed = ref(false)
  const apiBaseUrl = ref('')
  const apiAppId = ref('reg4bc6558503724')
  
  // 菜单配置
  const menuItems = ref([
    {
      index: '/',
      title: '首页',
      icon: 'HomeFilled',
      path: '/'
    },
    {
      index: '/sn',
      title: 'SN码管理',
      icon: 'Box',
      children: [
        { index: '/sn/list', title: 'SN码列表', path: '/sn/list' },
        { index: '/sn/trace', title: 'SN码追溯', path: '/sn/trace' }
      ]
    },
    {
      index: '/purchase',
      title: '采购管理',
      icon: 'ShoppingCart',
      children: [
        { index: '/purchase/stockIn', title: '入库单', path: '/purchase/stockIn' },
        { index: '/purchase/payment', title: '付款单', path: '/purchase/payment' },
        { index: '/purchase/return', title: '退货单', path: '/purchase/return' }
      ]
    },
    {
      index: '/sale',
      title: '销售管理',
      icon: 'Sell',
      children: [
        { index: '/sale/stockOut', title: '出库单', path: '/sale/stockOut' },
        { index: '/sale/collection', title: '收款单', path: '/sale/collection' },
        { index: '/sale/return', title: '退货单', path: '/sale/return' }
      ]
    },
    {
      index: '/warehouse',
      title: '仓库管理',
      icon: 'OfficeBuilding',
      children: [
        { index: '/warehouse/transfer', title: '调拨单', path: '/warehouse/transfer' },
        { index: '/warehouse/check', title: '盘点单', path: '/warehouse/check' },
        { index: '/warehouse/inventory', title: '库存台账', path: '/warehouse/inventory' }
      ]
    },
    {
      index: '/report',
      title: '报表中心',
      icon: 'DataLine',
      children: [
        { index: '/report/sale', title: '销售汇总', path: '/report/sale' },
        { index: '/report/inventory', title: '库存明细', path: '/report/inventory' },
        { index: '/report/snFlow', title: 'SN流转表', path: '/report/snFlow' }
      ]
    }
  ])

  // ========== 计算属性 ==========
  const userName = computed(() => userInfo.value?.userName || userInfo.value?.name || '未知用户')
  const userId = computed(() => userInfo.value?.userId || userInfo.value?.id || '')
  const hasAppKey = computed(() => isReady.value && userInfo.value !== null)

  /**
   * 权限检查
   * @param {string} permission - 权限标识
   * @returns {boolean}
   */
  function hasPermission(permission) {
    // 目前简化处理，有用户信息就认为有权限
    return isReady.value && userInfo.value !== null
  }

  // ========== 方法 ==========
  
  /**
   * 获取 API 基础URL
   */
  function getApiBaseUrl() {
    // 尝试从 parent.location.host 获取域名
    let host = ''
    try {
      if (window.parent && window.parent.location && window.parent.location.host) {
        host = window.parent.location.host
      }
    } catch (e) {
      // 跨域访问被阻止，使用默认值
      console.warn('[Store] 无法访问 parent.location.host')
    }
    
    // 判断环境
    let env = 'uat'
    if (host.includes('xft.cmbchina.com')) {
      env = 'prd'
    }
    
    // 构建 API URL
    const baseUrl = `https://${host}/xcodegw/app/${apiAppId.value}/tag/${env}`
    console.log('[Store] API Base URL:', baseUrl)
    return baseUrl
  }
  
  /**
   * 获取当前用户信息
   */
  async function fetchCurrentUser() {
    isLoading.value = true
    try {
      const baseUrl = getApiBaseUrl()
      const url = `${baseUrl}/auth/currentUser`
      
      console.log('[Store] 正在获取用户信息:', url)
      
      const response = await fetch(url, {
        credentials: 'include'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      
      const data = await response.json()
      console.log('[Store] 用户信息:', data)
      
      if (data.returnCode === 'SUC0000' || data.code === 0 || data.code === 200) {
        userInfo.value = data.body || data.data || data.result
        isReady.value = true
        return userInfo.value
      } else {
        throw new Error(data.errorMsg || data.message || '获取用户信息失败')
      }
    } catch (error) {
      console.error('[Store] 获取用户信息失败:', error)
      // 使用默认用户信息（方便开发测试）
      userInfo.value = {
        userName: '测试用户',
        userId: 'test-user-001',
        userNo: 'TEST001'
      }
      isReady.value = true
      return userInfo.value
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 设置用户信息
   */
  function setUserInfo(info) {
    userInfo.value = info
    isReady.value = true
  }

  /**
   * 切换侧边栏折叠状态
   */
  function toggleCollapse() {
    collapsed.value = !collapsed.value
  }

  /**
   * 初始化
   */
  async function init() {
    console.log('[Store] 初始化...')
    await fetchCurrentUser()
  }

  return {
    // 状态
    userInfo,
    isReady,
    isLoading,
    collapsed,
    menuItems,
    apiBaseUrl,
    
    // 计算属性
    userName,
    userId,
    hasAppKey,
    hasPermission,
    
    // 方法
    setUserInfo,
    toggleCollapse,
    init,
    fetchCurrentUser,
    getApiBaseUrl
  }
})
