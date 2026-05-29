/**
 * 通用工具函数
 */

/**
 * 格式化日期
 */
export function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) return ''
  
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''
  
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 格式化金额
 */
export function formatMoney(amount, decimals = 2) {
  if (amount === null || amount === undefined) return '0.00'
  return Number(amount).toFixed(decimals)
}

/**
 * 生成单号
 */
export function generateOrderNo(prefix) {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const random = String(Math.floor(Math.random() * 10000)).padStart(4, '0')
  return `${prefix}-${year}${month}${day}-${random}`
}

/**
 * 防抖
 */
export function debounce(fn, delay = 300) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 节流
 */
export function throttle(fn, delay = 300) {
  let last = 0
  return function (...args) {
    const now = Date.now()
    if (now - last >= delay) {
      last = now
      fn.apply(this, args)
    }
  }
}

/**
 * 深拷贝
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof Array) return obj.map(item => deepClone(item))
  if (obj instanceof Object) {
    const copy = {}
    Object.keys(obj).forEach(key => {
      copy[key] = deepClone(obj[key])
    })
    return copy
  }
}

/**
 * 下载文件
 */
export function downloadFile(data, filename) {
  const blob = new Blob([data], { type: 'application/octet-stream' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

/**
 * 判断是否为空
 */
export function isEmpty(value) {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * 获取枚举文本
 */
export function getEnumText(enumValue, enumMap) {
  return enumMap[enumValue] || enumValue
}

/**
 * 状态枚举
 */
export const StatusEnum = {
  DRAFT: { text: '草稿', type: 'info' },
  CONFIRMED: { text: '已确认', type: 'success' },
  PARTIAL_IN: { text: '部分入库', type: 'warning' },
  IN_STOCK: { text: '已入库', type: 'success' },
  PARTIAL_OUT: { text: '部分出库', type: 'warning' },
  OUT_STOCK: { text: '已出库', type: 'success' },
  PARTIAL_PAID: { text: '部分收款', type: 'warning' },
  PAID: { text: '已收款', type: 'success' },
  CANCELLED: { text: '已取消', type: 'danger' }
}

/**
 * SN状态枚举
 */
export const SnStatusEnum = {
  PURCHASED: { text: '已采购', type: 'warning' },
  INSTOCK: { text: '已入库', type: 'success' },
  SOLD: { text: '已销售', type: 'primary' },
  RETURN: { text: '已退货', type: 'danger' },
  SCRAP: { text: '已报废', type: 'info' }
}
