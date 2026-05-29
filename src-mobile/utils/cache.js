/**
 * 离线缓存工具 - 基础数据缓存到 localStorage
 * 仓库 WiFi 信号差时避免每次进入页面重新加载
 */

const CACHE_PREFIX = 'erp_cache_'
const DEFAULT_TTL = 30 * 60 * 1000 // 30 分钟过期

/**
 * 写入缓存
 */
export function setCache(key, data, ttl = DEFAULT_TTL) {
  try {
    const item = {
      data,
      timestamp: Date.now(),
      ttl
    }
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(item))
  } catch (e) {
    console.warn('缓存写入失败:', e)
  }
}

/**
 * 读取缓存，过期返回 null
 */
export function getCache(key) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key)
    if (!raw) return null
    const item = JSON.parse(raw)
    if (Date.now() - item.timestamp > item.ttl) {
      localStorage.removeItem(CACHE_PREFIX + key)
      return null
    }
    return item.data
  } catch (e) {
    return null
  }
}

/**
 * 获取缓存数据（优先缓存，缓存未命中则调 API 并缓存结果）
 * @param {string} key 缓存键
 * @param {Function} fetcher API 调用函数，返回 Promise
 * @param {number} ttl 缓存过期时间(ms)
 * @returns {Promise<any>}
 */
export async function getCacheOrFetch(key, fetcher, ttl = DEFAULT_TTL) {
  // 先尝试缓存
  const cached = getCache(key)
  if (cached !== null) {
    return cached
  }

  // 缓存未命中，调 API
  try {
    const result = await fetcher()
    // 保留完整数据结构（包含 list 和 total），而非只存 list
    const data = result?.data || result?.body || result || {}
    setCache(key, data, ttl)
    return data
  } catch (e) {
    console.warn(`API 请求失败(${key})，尝试使用过期缓存:`, e)
    // API 失败时，尝试用过期缓存（不过期删除，直接读取）
    try {
      const raw = localStorage.getItem(CACHE_PREFIX + key)
      if (raw) {
        const item = JSON.parse(raw)
        return item.data
      }
    } catch (_) {}
    throw e
  }
}

/**
 * 清除指定缓存
 */
export function removeCache(key) {
  localStorage.removeItem(CACHE_PREFIX + key)
}

/**
 * 清除所有业务缓存
 */
export function clearAllCache() {
  const keys = Object.keys(localStorage)
  keys.forEach(k => {
    if (k.startsWith(CACHE_PREFIX)) {
      localStorage.removeItem(k)
    }
  })
}

/**
 * 预加载所有基础数据到缓存（可在首页 onMounted 调用）
 */
export async function preloadBaseData(api) {
  const { supplierApi, warehouseApi, productTypeApi } = api
  const tasks = []

  if (supplierApi) {
    tasks.push(
      getCacheOrFetch('suppliers', () => supplierApi.getList(), 60 * 60 * 1000).catch(() => {})
    )
  }
  if (warehouseApi) {
    tasks.push(
      getCacheOrFetch('warehouses', () => warehouseApi.getList(), 60 * 60 * 1000).catch(() => {})
    )
  }
  if (productTypeApi) {
    tasks.push(
      getCacheOrFetch('productTypes', () => productTypeApi.getList(), 60 * 60 * 1000).catch(() => {})
    )
  }

  await Promise.allSettled(tasks)
}
