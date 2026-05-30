/**
 * API 请求封装
 * 使用 fetch 调用薪福通低开平台的模型方法
 */

// API 应用ID
const API_APP_ID = 'reg4bc6558503724'

/**
 * 获取 API 基础URL
 */
export function getApiBaseUrl() {
  // 尝试从 parent.location.host 获取域名
  let host = ''
  try {
    if (window.parent && window.parent.location && window.parent.location.host) {
      host = window.parent.location.host
    }
  } catch (e) {
    console.warn('[API] 无法访问 parent.location.host')
  }
  
  // 判断环境
  let env = 'uat'
  if (host.includes('xft.cmbchina.com')) {
    env = 'prd'
  }
  
  // 构建 API URL
  return `https://${host}/xcodegw/app/${API_APP_ID}/tag/${env}`
}

/**
 * 通用 fetch 请求
 * @param {string} url - 请求URL（可以是完整URL或相对路径）
 * @param {object} options - fetch 选项
 * @returns {Promise}
 */
async function request(url, options = {}) {
  // 如果 url 已经是完整 URL，直接使用
  // 否则拼接 baseUrl
  let fullUrl
  if (url.startsWith('http://') || url.startsWith('https://')) {
    fullUrl = url
  } else {
    const baseUrl = getApiBaseUrl()
    fullUrl = baseUrl + url
  }
  
  const defaultOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'xcode-appsource': 'procode'
    }
  }
  
  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    }
  }
  
  try {
    const response = await fetch(fullUrl, config)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // 检查业务返回码
    if (data.returnCode === 'SUC0000' || data.code === 0 || data.code === 200 || data.code === 'SUC0000') {
      // 兼容 body / data 两种字段名，让 PC 端 (res.body) 和移动端 (res.data) 都能正常解析
      const rawPayload = data.body || data.data || {}
      const payload = convertKeysToCamel(rawPayload)
      // ?????????????records ????????list
      if (payload.records && !payload.list) {
        payload.list = payload.records
      }
      return {
        ...data,
        body: payload,
        data: payload,
        code: data.returnCode || data.code || 'SUC0000'
      }
    }
    
    // 处理业务错误
    throw new Error(data.errorMsg || data.message || '请求失败')
  } catch (error) {
    console.error('[API] 请求失败:', url, error)
    throw error
  }
}

// 导出 GET 请求
export async function get(url, params = {}) {
  const searchParams = new URLSearchParams(params)
  const queryString = searchParams.toString()
  const fullUrl = queryString ? `${url}?${queryString}` : url
  return request(fullUrl, { method: 'GET' })
}

// 导出 POST 请求
export async function post(url, data = {}) {
  return request(url, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

/**
 * 将 camelCase 对象键名转换为 snake_case
 * 低开平台模型表字段统一使用 snake_case，前端代码使用 camelCase
 * 为避免字段名不匹配导致查询/保存失败，在发送前统一转换
 * 保留低开平台原生分页参数不转换
 * @param {object} obj - 原始参数对象
 * @returns {object} 转换后的参数对象
 */
/**
 * 将 snake_case 响应数据转换为 camelCase
 * 递归遍历API返回的 snake_case 数据并转换为 camelCase
 * @param {*} obj - 需要转换的数据（对象或数组）
 * @returns {*} 转换后的数据
 */
function convertKeysToCamel(obj) {
  if (obj === null || obj === undefined) return obj
  if (Array.isArray(obj)) return obj.map(item => convertKeysToCamel(item))
  if (typeof obj !== 'object' || obj instanceof Date) return obj
  
  const result = {}
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
    result[camelKey] = convertKeysToCamel(value)
  }
  return result
}

function convertParamsToSnakeCase(obj = {}) {
  // 低开平台原生参数，不做转换
  const preserveKeys = ['pageSize', 'current', 'appTag', 'modelKey', 'methodKey']
  
  const result = {}
  for (const [key, value] of Object.entries(obj)) {
    if (preserveKeys.includes(key)) {
      result[key] = value
    } else {
      result[key.replace(/([A-Z])/g, '_$1').toLowerCase()] = value
    }
  }
  return result
}

/**
 * 调用低开平台模型方法
 * @param {string} modelKey - 模型key（如 MOk2ZJ4aga）
 * @param {string} methodKey - 方法key（如 FUW5FAbNha）
 * @param {object} params - 请求参数（对应模型方法SQL中的入参）
 * @returns {Promise}
 */
export async function runModelMethod(modelKey, methodKey, params = {}) {
  // 统一模型方法接口
  // URL: /api/run/odexftopenapiv2appmodelmethodrun
  // Query: appTag, modelKey, methodKey
  // Body: 具体方法的入参（由 params 传递）
  const baseUrl = getApiBaseUrl()
  const appTag = baseUrl.includes('/tag/uat') ? 'uat' : 'prd'
  
  const queryParams = new URLSearchParams({
    appTag,
    modelKey,
    methodKey
  })
  
  const fullUrl = `${baseUrl}/api/run/odexftopenapiv2appmodelmethodrun?${queryParams.toString()}`
  
  // 统一将 camelCase 参数名转换为 snake_case，确保与模型表字段一致
  const normalizedParams = convertParamsToSnakeCase(params)
  
  return post(fullUrl, normalizedParams)
}

/**
 * 直接调用指定 API（完整 URL）
 * @param {string} apiPath - 完整 API 路径（如 /api/run/xftacrreceiptbillreceiptbillpush）
 * @param {object} params - Query 参数
 * @param {object} data - Body 数据
 */
export async function callApi(apiPath, params = {}, data = {}) {
  const baseUrl = getApiBaseUrl()
  const appTag = baseUrl.includes('/tag/uat') ? 'uat' : 'prd'
  
  // 将 params 合并到 query 中
  const queryParams = new URLSearchParams({ appTag, ...params })
  const fullUrl = `${baseUrl}${apiPath}?${queryParams.toString()}`
  
  return post(fullUrl, data)
}

/**
 * 列表查询
 * @param {string} modelKey - 模型key
 * @param {object} query - 查询条件
 * @param {object} pagination - 分页参数
 */
export async function queryList(modelKey, query = {}, pagination = { current: 1, pageSize: 20 }) {
  return runModelMethod(modelKey, 'list', { ...query, ...pagination })
}

/**
 * 新增数据
 * @param {string} modelKey - 模型key
 * @param {object} data - 新增数据
 */
export async function createData(modelKey, data) {
  return runModelMethod(modelKey, 'add', data)
}

/**
 * 更新数据
 * @param {string} modelKey - 模型key
 * @param {object} data - 更新数据
 */
export async function updateData(modelKey, data) {
  return runModelMethod(modelKey, 'update', data)
}

/**
 * 删除数据
 * @param {string} modelKey - 模型key
 * @param {string|number} id - 数据ID
 */
export async function deleteData(modelKey, id) {
  return runModelMethod(modelKey, 'delete', { id })
}

/**
 * 获取详情
 * @param {string} modelKey - 模型key
 * @param {string|number} id - 数据ID
 */
export async function getDetail(modelKey, id) {
  return runModelMethod(modelKey, 'detail', { id })
}
