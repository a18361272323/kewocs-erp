/**
 * 环境配置工具
 * 根据窗口域名自动判断环境
 */

// 从窗口域名或 referrer 判断环境
const getEnvFromHost = () => {
  // 优先使用 window.location.hostname
  let host = window.location.hostname.toLowerCase()
  
  // 如果 hostname 为空（about:srcdoc），尝试从 referrer 获取
  if (!host || host === '') {
    try {
      const referrer = document.referrer
      if (referrer) {
        const url = new URL(referrer)
        host = url.hostname.toLowerCase()
      }
    } catch (e) {
      // ignore
    }
  }
  
  if (host.includes('xft-demo') || host.includes('demo')) {
    return 'uat'
  }
  
  if (host.includes('xft.cmbchina') || host === 'xft.cmbchina.com') {
    return 'prd'
  }
  
  // 默认测试环境
  return 'uat'
}

/**
 * 获取 API 配置
 * @returns {Object} { baseUrl, appTag, appId }
 */
export const getApiConfig = () => {
  const env = getEnvFromHost()
  const host = window.location.hostname.toLowerCase()
  const appTag = env === 'prd' ? 'prd' : 'uat'
  
  // 根据环境选择 API 地址（包含 /tag）
  let baseUrl
  if (env === 'prd') {
    baseUrl = `https://xft.cmbchina.com/xcodegw/app/reg4bc6558503724/tag/${appTag}`
  } else {
    baseUrl = `https://xft-demo.cmburl.cn/xcodegw/app/reg4bc6558503724/tag/${appTag}`
  }
  
  return {
    baseUrl,
    appTag,
    appId: 'reg4bc6558503724',
    env,
    host,
  }
}

/**
 * 获取模型方法调用 URL
 * @param {string} modelKey
 * @param {string} methodKey
 * @returns {string}
 */
export const getModelMethodUrl = (modelKey, methodKey) => {
  const config = getApiConfig()
  return `${config.baseUrl}/api/run/odexftopenapiv2appmodelmethodrun?modelKey=${modelKey}&methodKey=${methodKey}`
}

/**
 * 获取应收单推送 URL
 * @returns {string}
 */
export const getReceiptBillPushUrl = () => {
  const config = getApiConfig()
  return `${config.baseUrl}/api/run/xftacrreceiptbillreceiptbillpush`
}

/**
 * 获取应收单删除 URL
 * @returns {string}
 */
export const getReceiptBillDeleteUrl = () => {
  const config = getApiConfig()
  return `${config.baseUrl}/api/run/tacrreceiptbillreceiptbilldelete`
}

export const getXftModelMethodUrl = getModelMethodUrl
export const getXftReceiptBillUrl = getReceiptBillPushUrl
export const getXftReceiptBillDeleteUrl = getReceiptBillDeleteUrl
export const getEnvironment = getEnvFromHost

/**
 * API 应用配置
 */
export const APP_ID = 'reg4bc6558503724'

export default {
  APP_ID,
  getApiConfig,
  getEnvironment: getEnvFromHost,
  getModelMethodUrl,
  getReceiptBillPushUrl,
  getReceiptBillDeleteUrl,
  getXftModelMethodUrl,
  getXftReceiptBillUrl,
  getXftReceiptBillDeleteUrl,
}
