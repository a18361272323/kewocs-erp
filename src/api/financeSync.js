/**
 * 账款管理 → 低开平台 基础数据同步
 *
 * 模式：先从账款管理获取最新数据，再逐条写入低开平台模型
 * 域名自动切换：parent.location.host 判断 uat/prd
 */

function getHost() {
  try {
    const host = window.parent?.location?.host || ''
    return host || 'xft-demo.cmburl.cn'
  } catch {
    return 'xft-demo.cmburl.cn'
  }
}

function getEnv() {
  const host = getHost()
  return host.includes('xft.cmbchina.com') ? 'prd' : 'uat'
}

// 低开平台写入接口基础 URL
function getWriteBaseUrl() {
  const host = getHost()
  const env = getEnv()
  return `https://${host}/xcodegw/app/reg4bc6558503724/tag/${env}/api/run`
}

// 写入方法 key 映射
const WRITE_METHODS = {
  supplier: 'INdOi7tMyC',
  customer: 'INBZ7S1f5O',
  product: 'INcTdEABYW',
  account: 'INMqDr0UMm',
  warehouse: 'INR4YqmCtv'
}

// 通用写入：POST body 数组到低开平台
async function batchWrite(methodKey, dataArray) {
  const url = `${getWriteBaseUrl()}/${methodKey}`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xcode-appsource': 'procode'
    },
    body: JSON.stringify(dataArray),
    credentials: 'include'
  })
  const json = await res.json()
  return json
}

// ====== 供应商 ======
async function fetchSuppliersFromFinance() {
  const host = getHost()
  const all = []
  let start = 0
  const limit = 100
  while (true) {
    const res = await fetch(`https://${host}/FinanceMaster/master-data/page/data-manage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'app-id': 'ITP00000', 'businessresource': 'MASTERDATA' },
      body: JSON.stringify({ start, limit, businessTypeCode: 'supplier', standFieldMap: {} }),
      credentials: 'include'
    })
    const json = await res.json()
    if (json.returnCode !== 'SUC0000') throw new Error(json.errorMsg || '获取供应商失败')
    const list = json.body?.list || []
    all.push(...list)
    if (list.length < limit) break
    start += limit
  }
  return all
}

function mapSupplier(item) {
  const bi = item.basicInfo || {}
  const cf = item.customFieldValues || []
  function cv(code) { return cf.find(c => c.customFieldCode === code)?.customFieldValue || '' }
  return {
    supplier_code: bi.dataCode || cv('supId'),
    supplier_name: bi.dataName || cv('supNam'),
    supplier_type: cv('supType'),
    status: cv('supSts') || '1',
    credit_code: cv('corOrgNbr'),
    enable_date: cv('enableDate')
  }
}

// ====== 客户 ======
async function fetchCustomersFromFinance() {
  const host = getHost()
  const all = []
  let curNbr = 1
  const pageSize = 100
  while (true) {
    const res = await fetch(`https://${host}/xft-gateway/xft-acr/xwapi/customer/query-customer-list`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'xft-menu-code': 'ACR41100' },
      body: JSON.stringify({ query: {}, pageParamDTO: { curNbr, pageSize } }),
      credentials: 'include'
    })
    const json = await res.json()
    if (json.returnCode !== 'SUC0000') throw new Error(json.errorMsg || '获取客户失败')
    const list = json.body?.customerInfoDTOList || []
    all.push(...list)
    if (list.length < pageSize) break
    curNbr++
  }
  return all
}

function mapCustomer(item) {
  return {
    customer_code: item.customerCode,
    customer_name: item.customerName,
    customer_type: item.customerType,
    customer_type_name: item.customerTypeName,
    social_credit_code: item.socialCreditCode
  }
}

// ====== 账户 ======
async function fetchAccountsFromFinance() {
  const host = getHost()
  const res = await fetch(`https://${host}/xft-gateway/xft-acr/xwapi/bank-account/query-bank-accounts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'xft-menu-code': 'ACR41300' },
    body: JSON.stringify({ pageParamDTO: { curNbr: 1, pageSize: 200 } }),
    credentials: 'include'
  })
  const json = await res.json()
  if (json.returnCode !== 'SUC0000') throw new Error(json.errorMsg || '获取账户失败')
  return json.body?.bankAccountDTOList || []
}

function mapAccount(item) {
  return {
    account_name: item.accountName,
    bank_account: item.bankNumber,
    account_type: item.bankType,
    bank_name: item.bankName,
    account_code: item.bankCode || ''
  }
}

// ====== 商品 ======
async function fetchProductsFromFinance() {
  const host = getHost()
  const all = []
  let curNbr = 1
  const pageSize = 100
  while (true) {
    const res = await fetch(`https://${host}/xft-gateway/xft-acr/xwapi/goods-services/query-goods-services-for-config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'xft-menu-code': 'ACR41200' },
      body: JSON.stringify({
        codeOrName: '', headFilterDTOList: [], goodServiceCodeList: [],
        pageParamDTO: { curNbr, pageSize },
        headOrderDTO: { orderCode: '' }
      }),
      credentials: 'include'
    })
    const json = await res.json()
    if (json.returnCode !== 'SUC0000') throw new Error(json.errorMsg || '获取商品失败')
    const list = json.body?.goodServiceDTOList || []
    all.push(...list)
    if (list.length < pageSize) break
    curNbr++
  }
  return all
}

function mapProduct(item) {
  return {
    product_code: item.goodServiceCode,
    product_name: item.goodServiceName,
    spec: item.specificationType,
    unit: item.unitMeasurement,
    sale_price: item.unitPriceIncludingTax
  }
}

// ====== 全量同步 ======
async function syncAllSuppliers() {
  const list = await fetchSuppliersFromFinance()
  const mapped = list.map(mapSupplier)
  return batchWrite(WRITE_METHODS.supplier, mapped)
}

async function syncAllCustomers() {
  const list = await fetchCustomersFromFinance()
  const mapped = list.map(mapCustomer)
  return batchWrite(WRITE_METHODS.customer, mapped)
}

async function syncAllAccounts() {
  const list = await fetchAccountsFromFinance()
  const mapped = list.map(mapAccount)
  return batchWrite(WRITE_METHODS.account, mapped)
}

async function syncAllProducts() {
  const list = await fetchProductsFromFinance()
  const mapped = list.map(mapProduct)
  return batchWrite(WRITE_METHODS.product, mapped)
}

export {
  getEnv,
  syncAllSuppliers,
  syncAllCustomers,
  syncAllAccounts,
  syncAllProducts
}