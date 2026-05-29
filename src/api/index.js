/**
 * 科沃斯 ERP - API 接口
 * 基于低开平台模型方法调用
 */
import { runModelMethod, getApiBaseUrl } from './request'

// ============================================
// 账款管理配置
// ============================================
/**
 * 账款管理应收单表单编号
 * 注意：需要在薪福通低开平台 -> 账款管理 -> 系统设置 -> 自定义配置 -> 编码规则
 * 中配置应收单号的生成规则后，将对应的表单编号填入此处
 * 示例: 'AR2025' 或从账款管理后台获取的表单编号
 */
export const FINANCE_FORM_CODE = '1154768285638656'

// ============================================
// 模型常量 - 基于低开平台实际模型
// ============================================
export const MODEL_KEYS = {
  // SN码管理
  SN_CODE: 'MOk2ZJ4aga',           // SN码表
  SN_LOG: 'MOqg2psiTa',            // SN操作日志表

  // 采购管理
  STOCK_IN: 'MOIN9eD2au',          // 采购入库单主表
  STOCK_IN_DETAIL: 'MOc2tEbUGK',    // 采购入库单明细表
  RETURN_IN: 'MOV8t2Ah9X',         // 采购退货单主表
  RETURN_IN_DETAIL: 'MOkM8P1d1B',  // 采购退货单明细表

  // 销售管理
  STOCK_OUT: 'MOenA360T5',         // 销售出库单主表
  STOCK_OUT_DETAIL: 'MOg8t6pKm4',  // 销售出库单明细表
  RETURN_OUT: 'MOky0Pcw6W',        // 销售退货单主表
  RETURN_OUT_DETAIL: 'MOHwXl5rMK',  // 销售退货单明细表

  // 仓库管理
  TRANSFER: 'MOIrlRmiFH',          // 调拨单主表
  TRANSFER_DETAIL: 'MOORe8J0Dl',    // 调拨单明细表
  CHECK: 'MO5WOkA9SX',             // 盘点单主表
  CHECK_DETAIL: 'MO0T3mVifs',      // 盘点单明细表
  WAREHOUSE: 'MO3LPiTHMU',         // 仓库
  INVENTORY: 'MOsWdYRJhQ',         // 库存台账表

  // 基础资料
  PRODUCT: 'MOeUIsmD4j',           // 商品
  CUSTOMER: 'MOj7UPuJx2',          // 客户
  SUPPLIER: 'MOmke9xgeH',          // 供应商表
  ACCOUNT: 'MOAusBgPiT',           // 账户

  // 财务
  FINANCE: 'MO08KyO9eU',           // 财务流水对接表
}

// ============================================
// 方法常量 - 每个模型的方法 Key (基于低开平台模型方法配置)
// ============================================
export const METHOD_KEYS = {
  // ========== SN码表 (MOk2ZJ4aga) ==========
  SN_LIST: 'FUG5LjJIRx',           // 列表查询
  SN_ADD: 'FUUjEoVur5',            // 新增
  SN_EDIT: 'FUU302EENf',           // 编辑
  SN_DETAIL: 'FUZTDMrkH7',         // 查看详情
  SN_DELETE: 'FUoV37QEI0',         // 删除
  SN_STATUS_COUNT: 'FUBkwoTsdZ',   // getStatusCount - 状态统计
  SN_BY_WAREHOUSE: 'FUzTSnSYnx',   // warehouse_id - 按仓库查询
  SN_STOCK_OUT_TODAY: 'FUXHQf4isJ', // getStockOutToday - 今日出库统计
  SN_SCRAP: 'FUFTtY9af0',          // scrap - SN码报废

  // ========== SN操作日志表 (MOqg2psiTa) ==========
  SN_LOG_LIST: 'FUUBuLNhuu',       // 列表查询
  SN_LOG_ADD: 'FUtcrpdyV1',        // 新增

  // ========== 采购入库单主表 (MOIN9eD2au) ==========
  STOCK_IN_LIST: 'FUADr2TygU',     // 列表查询
  STOCK_IN_ADD: 'FUlZOM13nS',      // 新增
  STOCK_IN_EDIT: 'FUlQSDHuOv',     // 编辑
  STOCK_IN_DETAIL: 'FU8N6CTRMZ',   // 查看详情
  STOCK_IN_DELETE: 'FU1WUGjjGO',   // 删除

  // ========== 采购入库单明细表 (MOc2tEbUGK) ==========
  STOCK_IN_DETAIL_LIST: 'FUyWPF92Nx', // 列表查询
  STOCK_IN_DETAIL_ADD: 'FU9z5D8wAM',  // 新增
  STOCK_IN_DETAIL_EDIT: 'FU5BdwhpML', // 编辑

  // ========== 销售出库单主表 (MOenA360T5) ==========
  STOCK_OUT_LIST: 'FUJwJkbOnk',    // 列表查询
  STOCK_OUT_ADD: 'FUUahJCtGe',     // 新增
  STOCK_OUT_EDIT: 'FUMC1YOXai',    // 编辑
  STOCK_OUT_DETAIL: 'FU2ViffXw4',  // 查看详情
  STOCK_OUT_DELETE: 'FURLAv3gOp',   // 删除

  // ========== 销售出库单明细表 (MOg8t6pKm4) ==========
  STOCK_OUT_DETAIL_LIST: 'FUj5beTcFQ', // 列表查询
  STOCK_OUT_DETAIL_ADD: 'FUMQAdcAlW',  // 新增
  STOCK_OUT_DETAIL_EDIT: 'FUsNHVHaHs', // 编辑

  // ========== 销售退货单主表 (MOky0Pcw6W) ==========
  RETURN_OUT_LIST: 'FUQI57ueUm',   // 列表查询
  RETURN_OUT_ADD: 'FUg7l9v2dQ',     // 新增
  RETURN_OUT_EDIT: 'FUXY7dYmUj',   // 编辑
  RETURN_OUT_DETAIL: 'FU1gan9X1c', // 查看详情

  // ========== 销售退货单明细表 (MOHwXl5rMK) ==========
  RETURN_OUT_DETAIL_LIST: 'FUsSZubXQP', // 列表查询
  RETURN_OUT_DETAIL_ADD: 'FUPWcYQRZH',  // 新增
  RETURN_OUT_DETAIL_EDIT: 'FUXFdIKzWu', // 编辑

  // ========== 采购退货单主表 (MOV8t2Ah9X) ==========
  RETURN_IN_LIST: 'FUaZ4wLM6e',    // 列表查询
  RETURN_IN_ADD: 'FUKfVnr5XQ',      // 新增
  RETURN_IN_EDIT: 'FU1VDz9NRt',    // 编辑
  RETURN_IN_DETAIL: 'FUrCduAiGn',  // 查看详情

  // ========== 采购退货单明细表 (MOkM8P1d1B) ==========
  RETURN_IN_DETAIL_LIST: 'FU0Ni6lOWq', // 列表查询
  RETURN_IN_DETAIL_ADD: 'FU5qSwqWsW',  // 新增
  RETURN_IN_DETAIL_EDIT: 'FU29Cq0hVc', // 编辑

  // ========== 调拨单主表 (MOIrlRmiFH) ==========
  TRANSFER_LIST: 'FUW5FAbNha',     // 列表查询
  TRANSFER_ADD: 'FUDC3wl6P8',      // 新增
  TRANSFER_EDIT: 'FUhakKYGcF',    // 编辑
  TRANSFER_DETAIL: 'FU6Xezd5Pb',   // 查看详情
  TRANSFER_DELETE: 'FUWPKGnSWG',   // 删除

  // ========== 调拨单明细表 (MOORe8J0Dl) ==========
  TRANSFER_DETAIL_LIST: 'FU7HVtbbuq', // 列表查询
  TRANSFER_DETAIL_ADD: 'FU0OPw5rsy',  // 新增
  TRANSFER_DETAIL_EDIT: 'FU2apUUpTE',  // 编辑

  // ========== 盘点单主表 (MO5WOkA9SX) ==========
  CHECK_LIST: 'FUQ56UBDHj',       // 列表查询
  CHECK_ADD: 'FUaAS7yYvZ',         // 新增
  CHECK_EDIT: 'FU6H93URI8',        // 编辑
  CHECK_DETAIL: 'FUefEHSt2t',     // 查看详情
  CHECK_DELETE: 'FUlNcPIkiO',      // 删除

  // ========== 盘点单明细表 (MO0T3mVifs) ==========
  CHECK_DETAIL_LIST: 'FUjedwjYjd', // 列表查询
  CHECK_DETAIL_ADD: 'FUf8uvechL',  // 新增
  CHECK_DETAIL_EDIT: 'FUffcWxmy3', // 编辑

  // ========== 仓库 (MO3LPiTHMU) ==========
  WAREHOUSE_LIST: 'FUQYxNNGuG',   // 列表查询
  WAREHOUSE_ADD: 'FUCOPYNJ7K',    // 新增
  WAREHOUSE_EDIT: 'FUo00VnLkx',   // 编辑
  WAREHOUSE_DETAIL: 'FU68EKjRvx', // 查看详情
  WAREHOUSE_DELETE: 'FUaTjjfFE0', // 删除

  // ========== 商品 (MOeUIsmD4j) ==========
  PRODUCT_LIST: 'FUcPuvGaEN',     // 列表查询
  PRODUCT_ADD: 'FUZUQvhIh9',      // 新增
  PRODUCT_EDIT: 'FUMutJUzWB',     // 编辑
  PRODUCT_DETAIL: 'FUOgJ5FJea',    // 查看详情
  PRODUCT_DELETE: 'FUJPKoVKGz',   // 删除

  // ========== 客户 (MOj7UPuJx2) ==========
  CUSTOMER_LIST: 'FUhljLxQOC',   // 列表查询
  CUSTOMER_ADD: 'FUhdIhuhKP',     // 新增
  CUSTOMER_EDIT: 'FUBLg4XVak',   // 编辑
  CUSTOMER_DETAIL: 'FUkrgtof0H', // 查看详情
  CUSTOMER_DELETE: 'FUvIfraor5', // 删除

  // ========== 供应商表 (MOmke9xgeH) ==========
  SUPPLIER_LIST: 'FUahi0uBQQ',    // 列表查询
  SUPPLIER_ADD: 'FURNaL3qZ1',     // 新增
  SUPPLIER_EDIT: 'FUxSx9jzAe',   // 编辑
  SUPPLIER_DETAIL: 'FUZ32CRNo9', // 查看详情
  SUPPLIER_DELETE: 'FUqg607gvT', // 删除

  // ========== 账户 (MOAusBgPiT) ==========
  ACCOUNT_LIST: 'FUHgerXSOC',     // 列表查询
  ACCOUNT_ADD: 'FUDiYnyCzb',      // 新增
  ACCOUNT_EDIT: 'FUzqHOsuFZ',    // 编辑
  ACCOUNT_DETAIL: 'FUeCQ9aGgK',  // 查看详情
  ACCOUNT_DELETE: 'FUwztwsCvd',   // 删除

  // ========== 库存台账表 (MOsWdYRJhQ) ==========
  INVENTORY_LIST: 'FUsb8iYjRh',    // 列表查询
  INVENTORY_ADD: 'FU8Xen8xzH',    // 新增
  INVENTORY_EDIT: 'FUAkUucCVl',   // 编辑
  INVENTORY_DETAIL: 'FUY1usgMs9', // 查看详情
  INVENTORY_DELETE: 'FUxQYz4UvO', // 删除
  INVENTORY_LOW_STOCK: 'FUhzR97DOC', // getLowStockCount - 低库存统计
  INVENTORY_SUMMARY: 'FU3ZfaZLPj',  // getWarehouseSummary - 仓库汇总
  INVENTORY_ALERT: 'FU9aGv2Zuh',    // getAlertList - 预警列表

  // ========== 财务流水对接表 (MO08KyO9eU) ==========
  FINANCE_LIST: 'FUC3UiW4pU',     // 列表查询
  FINANCE_ADD: 'FUPktENU4l',      // 新增
  FINANCE_EDIT: 'FUv6I0mjhC',    // 编辑
  FINANCE_DETAIL: 'FUqDwSMSGq',  // 查看详情
  FINANCE_DELETE: 'FUkRzzgZ8H',   // 删除
  FINANCE_SUMMARY_BY_TYPE: 'FUilTGHdFd',      // getSummaryByType - 按类型汇总
  FINANCE_COUNTERPARTY_SUMMARY: 'FUCxUCbjdm', // getCounterpartySummary - 按对手方汇总
  FINANCE_TODAY_SUMMARY: 'FUH9BA8mXe',        // getTodaySummary - 今日汇总

  // ========== 财务接口（平台接口，非模型方法） ==========
  AR_RECEIPT_PUSH: 'xftacrreceiptbillreceiptbillpush',    // 应收单推送
  AR_RECEIPT_DELETE: 'tacrreceiptbillreceiptbilldelete',  // 应收单删除
}

// ============================================
// Dashboard 汇总方法映射
// ============================================
export const SUMMARY_METHODS = {
  snTotal: { modelKey: 'MOk2ZJ4aga', methodKey: 'FUBkwoTsdZ' },       // SN码状态统计
  snStockOutToday: { modelKey: 'MOk2ZJ4aga', methodKey: 'FUXHQf4isJ' }, // 今日出库统计
}

// ============================================
// Dashboard API
// ============================================
export const dashboardApi = {
  async getStats() {
    try {
      // getStatusCount(FUBkwoTsdZ) SQL: SELECT status, COUNT(*) AS count GROUP BY status
      // 返回: [{status: "INSTOCK", count: 5}, ...]
      const snStatsRes = await runModelMethod(MODEL_KEYS.SN_CODE, METHOD_KEYS.SN_STATUS_COUNT, {})
      const snStatsList = Array.isArray(snStatsRes) ? snStatsRes : (snStatsRes?.body || snStatsRes?.data || [])
      const snStats = {}
      let totalCount = 0
      snStatsList.forEach(item => {
        snStats[item.status] = item.count || 0
        totalCount += item.count || 0
      })

      // getStockOutToday(FUXHQf4isJ): WHERE DATE(stock_out_time) = CURDATE()
      // 返回: [{warehouse_id, warehouse_name, count}, ...]
      const todayOutRes = await runModelMethod(MODEL_KEYS.SN_CODE, METHOD_KEYS.SN_STOCK_OUT_TODAY, {})
      const todayOutList = Array.isArray(todayOutRes) ? todayOutRes : (todayOutRes?.body || todayOutRes?.data || [])
      let todayOutCount = 0
      todayOutList.forEach(item => { todayOutCount += item.count || 0 })

      return {
        totalCount,
        inStockCount: snStats.INSTOCK || 0,
        soldCount: snStats.SOLD || 0,
        todayInCount: 0,
        todayOutCount,
      }
    } catch (error) {
      console.error('[Dashboard] 获取统计数据失败:', error)
      throw error
    }
  },

}

// ============================================
// SN码管理 API
// ============================================
export const snApi = {
  // SN码列表
  async getList(params = {}) {
    return runModelMethod(MODEL_KEYS.SN_CODE, METHOD_KEYS.SN_LIST, {
      ...params,
      current: params.current || 1,
      pageSize: params.pageSize || 20,
    })
  },
  
  // 新增SN码
  async add(data) {
    return runModelMethod(MODEL_KEYS.SN_CODE, METHOD_KEYS.SN_ADD, data)
  },
  
  // 编辑SN码
  async edit(data) {
    return runModelMethod(MODEL_KEYS.SN_CODE, METHOD_KEYS.SN_EDIT, data)
  },
  
  // 查看SN码详情
  async getDetail(id) {
    return runModelMethod(MODEL_KEYS.SN_CODE, METHOD_KEYS.SN_DETAIL, { id })
  },
  
  // 删除SN码
  async delete(id) {
    return runModelMethod(MODEL_KEYS.SN_CODE, METHOD_KEYS.SN_DELETE, { id })
  },
  
  // SN操作日志
  async getLogList(params = {}) {
    return runModelMethod(MODEL_KEYS.SN_LOG, METHOD_KEYS.SN_LOG_LIST, {
      ...params,
      current: params.current || 1,
      pageSize: params.pageSize || 20,
    })
  },

  // 按仓库查询SN码（INSTOCK状态）
  // getByWarehouse: SN码表中getByWarehouse方法(FUzTSnSYnx)是聚合统计SQL
  // 仅返回 {warehouse_id, warehouse_name, count}，不是SN明细列表
  // 获取SN明细应使用列表查询 + warehouse_id过滤 + INSTOCK状态
  async getByWarehouse(warehouseId) {
    const res = await runModelMethod(MODEL_KEYS.SN_CODE, METHOD_KEYS.SN_LIST, {
      warehouse_id: warehouseId,
      status: 'INSTOCK',
      current: 1,
      pageSize: 9999
    })
    return Array.isArray(res) ? res : (res.body?.list || res.data?.list || res.body || res.data || [])
  },
  // \u6309\u4ed3\u5e93+\u5546\u54c1\u67e5\u8be2SN\u7801\uff08INSTOCK\u72b6\u6001\uff09
  async getByWarehouseAndProduct(warehouseId, productId) {
    const res = await runModelMethod(MODEL_KEYS.SN_CODE, METHOD_KEYS.SN_LIST, {
      warehouse_id: warehouseId,
      product_id: productId,
      status: 'INSTOCK',
      current: 1,
      pageSize: 9999
    })
    return Array.isArray(res) ? res : (res.body?.list || res.data?.list || res.body || res.data || [])
  },
}

// ============================================
// 采购入库 API
// ============================================
export const stockInApi = {
  async getList(params = {}) {
    return runModelMethod(MODEL_KEYS.STOCK_IN, METHOD_KEYS.STOCK_IN_LIST, {
      ...params,
      current: params.current || 1,
      pageSize: params.pageSize || 20,
    })
  },
  
  async add(data) {
    return runModelMethod(MODEL_KEYS.STOCK_IN, METHOD_KEYS.STOCK_IN_ADD, data)
  },
  
  async edit(data) {
    return runModelMethod(MODEL_KEYS.STOCK_IN, METHOD_KEYS.STOCK_IN_EDIT, data)
  },
  
  async getDetail(id) {
    return runModelMethod(MODEL_KEYS.STOCK_IN, METHOD_KEYS.STOCK_IN_DETAIL, { id })
  },
  
  async delete(id) {
    return runModelMethod(MODEL_KEYS.STOCK_IN, METHOD_KEYS.STOCK_IN_DELETE, { id })
  },
}

// ============================================
// 销售出库 API
// ============================================
export const stockOutApi = {
  async getList(params = {}) {
    return runModelMethod(MODEL_KEYS.STOCK_OUT, METHOD_KEYS.STOCK_OUT_LIST, {
      ...params,
      current: params.current || 1,
      pageSize: params.pageSize || 20,
    })
  },
  
  async add(data) {
    return runModelMethod(MODEL_KEYS.STOCK_OUT, METHOD_KEYS.STOCK_OUT_ADD, data)
  },
  
  async edit(data) {
    return runModelMethod(MODEL_KEYS.STOCK_OUT, METHOD_KEYS.STOCK_OUT_EDIT, data)
  },
  
  async getDetail(id) {
    return runModelMethod(MODEL_KEYS.STOCK_OUT, METHOD_KEYS.STOCK_OUT_DETAIL, { id })
  },
  
  async delete(id) {
    return runModelMethod(MODEL_KEYS.STOCK_OUT, METHOD_KEYS.STOCK_OUT_DELETE, { id })
  },

  // \u522b\u540d\u65b9\u6cd5\uff08\u517c\u5bb9\u89c6\u56fe\u7ec4\u4ef6\uff09
  async create(data) {
    return this.add(data)
  },
  async update(data) {
    return this.edit(data)
  },
  async get(id) {
    return this.getDetail(id)
  },
  async confirm(id) {
    return this.edit({ id, status: 'COMPLETED' })
  },
  async getItems(id) {
    const res = await this.getDetail(id)
    const list = Array.isArray(res) ? res : (res.body || res.data || {})
    return list.items || list.data || []
  },}

// ============================================
// 采购退货 API
// ============================================
export const purchaseReturnApi = {
  async getList(params = {}) {
    return runModelMethod(MODEL_KEYS.RETURN_IN, METHOD_KEYS.RETURN_IN_LIST, {
      ...params,
      current: params.current || 1,
      pageSize: params.pageSize || 20,
    })
  },
  
  async add(data) {
    return runModelMethod(MODEL_KEYS.RETURN_IN, METHOD_KEYS.RETURN_IN_ADD, data)
  },
  
  async edit(data) {
    return runModelMethod(MODEL_KEYS.RETURN_IN, METHOD_KEYS.RETURN_IN_EDIT, data)
  },
  
  async getDetail(id) {
    return runModelMethod(MODEL_KEYS.RETURN_IN, METHOD_KEYS.RETURN_IN_DETAIL, { id })
  },
}

// ============================================
// 销售退货 API
// ============================================
export const saleReturnApi = {
  async getList(params = {}) {
    return runModelMethod(MODEL_KEYS.RETURN_OUT, METHOD_KEYS.RETURN_OUT_LIST, {
      ...params,
      current: params.current || 1,
      pageSize: params.pageSize || 20,
    })
  },
  
  async add(data) {
    return runModelMethod(MODEL_KEYS.RETURN_OUT, METHOD_KEYS.RETURN_OUT_ADD, data)
  },
  
  async edit(data) {
    return runModelMethod(MODEL_KEYS.RETURN_OUT, METHOD_KEYS.RETURN_OUT_EDIT, data)
  },
  
  async getDetail(id) {
    return runModelMethod(MODEL_KEYS.RETURN_OUT, METHOD_KEYS.RETURN_OUT_DETAIL, { id })
  },
}

// ============================================
// 调拨单 API
// ============================================
export const transferApi = {
  async getList(params = {}) {
    return runModelMethod(MODEL_KEYS.TRANSFER, METHOD_KEYS.TRANSFER_LIST, {
      ...params,
      current: params.current || 1,
      pageSize: params.pageSize || 20,
    })
  },
  
  async add(data) {
    return runModelMethod(MODEL_KEYS.TRANSFER, METHOD_KEYS.TRANSFER_ADD, data)
  },
  
  async edit(data) {
    return runModelMethod(MODEL_KEYS.TRANSFER, METHOD_KEYS.TRANSFER_EDIT, data)
  },
  
  async getDetail(id) {
    return runModelMethod(MODEL_KEYS.TRANSFER, METHOD_KEYS.TRANSFER_DETAIL, { id })
  },
  
  async delete(id) {
    return runModelMethod(MODEL_KEYS.TRANSFER, METHOD_KEYS.TRANSFER_DELETE, { id })
  },
}

// ============================================
// 盘点单 API
// ============================================
export const checkApi = {
  async getList(params = {}) {
    return runModelMethod(MODEL_KEYS.CHECK, METHOD_KEYS.CHECK_LIST, {
      ...params,
      current: params.current || 1,
      pageSize: params.pageSize || 20,
    })
  },
  
  async add(data) {
    return runModelMethod(MODEL_KEYS.CHECK, METHOD_KEYS.CHECK_ADD, data)
  },
  
  async edit(data) {
    return runModelMethod(MODEL_KEYS.CHECK, METHOD_KEYS.CHECK_EDIT, data)
  },
  
  async getDetail(id) {
    return runModelMethod(MODEL_KEYS.CHECK, METHOD_KEYS.CHECK_DETAIL, { id })
  },
  
  async delete(id) {
    return runModelMethod(MODEL_KEYS.CHECK, METHOD_KEYS.CHECK_DELETE, { id })
  },
}

// ============================================
// 库存台账 API
// ============================================
export const inventoryApi = {
  async getList(params = {}) {
    return runModelMethod(MODEL_KEYS.INVENTORY, METHOD_KEYS.INVENTORY_LIST, {
      ...params,
      current: params.current || 1,
      pageSize: params.pageSize || 20,
    })
  },
  
  async getLowStock() {
    return runModelMethod(MODEL_KEYS.INVENTORY, METHOD_KEYS.INVENTORY_LOW_STOCK, {})
  },
  
  async getSummary() {
    return runModelMethod(MODEL_KEYS.INVENTORY, METHOD_KEYS.INVENTORY_SUMMARY, {})
  },
}

// ============================================
// 仓库 API
// ============================================
export const warehouseApi = {
  async getList(params = {}) {
    return runModelMethod(MODEL_KEYS.WAREHOUSE, METHOD_KEYS.WAREHOUSE_LIST, {
      ...params,
      current: params.current || 1,
      pageSize: params.pageSize || 100,
    })
  },
  
  async add(data) {
    return runModelMethod(MODEL_KEYS.WAREHOUSE, METHOD_KEYS.WAREHOUSE_ADD, data)
  },
  
  async edit(data) {
    return runModelMethod(MODEL_KEYS.WAREHOUSE, METHOD_KEYS.WAREHOUSE_EDIT, data)
  },
  
  async getDetail(id) {
    return runModelMethod(MODEL_KEYS.WAREHOUSE, METHOD_KEYS.WAREHOUSE_DETAIL, { id })
  },
  
  async delete(id) {
    return runModelMethod(MODEL_KEYS.WAREHOUSE, METHOD_KEYS.WAREHOUSE_DELETE, { id })
  },
}

// ============================================
// 商品 API
// ============================================
export const productApi = {
  async getList(params = {}) {
    return runModelMethod(MODEL_KEYS.PRODUCT, METHOD_KEYS.PRODUCT_LIST, {
      ...params,
      current: params.current || 1,
      pageSize: params.pageSize || 20,
    })
  },
  
  async add(data) {
    return runModelMethod(MODEL_KEYS.PRODUCT, METHOD_KEYS.PRODUCT_ADD, data)
  },
  
  async edit(data) {
    return runModelMethod(MODEL_KEYS.PRODUCT, METHOD_KEYS.PRODUCT_EDIT, data)
  },
  
  async getDetail(id) {
    return runModelMethod(MODEL_KEYS.PRODUCT, METHOD_KEYS.PRODUCT_DETAIL, { id })
  },
  
  async delete(id) {
    return runModelMethod(MODEL_KEYS.PRODUCT, METHOD_KEYS.PRODUCT_DELETE, { id })
  },
}

// ============================================
// 客户 API
// ============================================
export const customerApi = {
  async getList(params = {}) {
    return runModelMethod(MODEL_KEYS.CUSTOMER, METHOD_KEYS.CUSTOMER_LIST, {
      ...params,
      current: params.current || 1,
      pageSize: params.pageSize || 20,
    })
  },
  
  async add(data) {
    return runModelMethod(MODEL_KEYS.CUSTOMER, METHOD_KEYS.CUSTOMER_ADD, data)
  },
  
  async edit(data) {
    return runModelMethod(MODEL_KEYS.CUSTOMER, METHOD_KEYS.CUSTOMER_EDIT, data)
  },
  
  async getDetail(id) {
    return runModelMethod(MODEL_KEYS.CUSTOMER, METHOD_KEYS.CUSTOMER_DETAIL, { id })
  },
  
  async delete(id) {
    return runModelMethod(MODEL_KEYS.CUSTOMER, METHOD_KEYS.CUSTOMER_DELETE, { id })
  },
}

// ============================================
// 供应商 API
// ============================================
export const supplierApi = {
  async getList(params = {}) {
    return runModelMethod(MODEL_KEYS.SUPPLIER, METHOD_KEYS.SUPPLIER_LIST, {
      ...params,
      current: params.current || 1,
      pageSize: params.pageSize || 20,
    })
  },
  
  async add(data) {
    return runModelMethod(MODEL_KEYS.SUPPLIER, METHOD_KEYS.SUPPLIER_ADD, data)
  },
  
  async edit(data) {
    return runModelMethod(MODEL_KEYS.SUPPLIER, METHOD_KEYS.SUPPLIER_EDIT, data)
  },
  
  async getDetail(id) {
    return runModelMethod(MODEL_KEYS.SUPPLIER, METHOD_KEYS.SUPPLIER_DETAIL, { id })
  },
  
  async delete(id) {
    return runModelMethod(MODEL_KEYS.SUPPLIER, METHOD_KEYS.SUPPLIER_DELETE, { id })
  },
}

// ============================================
// 账户 API
// ============================================
export const accountApi = {
  async getList(params = {}) {
    return runModelMethod(MODEL_KEYS.ACCOUNT, METHOD_KEYS.ACCOUNT_LIST, {
      ...params,
      current: params.current || 1,
      pageSize: params.pageSize || 20,
    })
  },
  
  async add(data) {
    return runModelMethod(MODEL_KEYS.ACCOUNT, METHOD_KEYS.ACCOUNT_ADD, data)
  },
  
  async edit(data) {
    return runModelMethod(MODEL_KEYS.ACCOUNT, METHOD_KEYS.ACCOUNT_EDIT, data)
  },
  
  async getDetail(id) {
    return runModelMethod(MODEL_KEYS.ACCOUNT, METHOD_KEYS.ACCOUNT_DETAIL, { id })
  },
  
  async delete(id) {
    return runModelMethod(MODEL_KEYS.ACCOUNT, METHOD_KEYS.ACCOUNT_DELETE, { id })
  },
}

// ============================================
// 财务流水 API
// ============================================
export const financeApi = {
  async getList(params = {}) {
    return runModelMethod(MODEL_KEYS.FINANCE, METHOD_KEYS.FINANCE_LIST, {
      ...params,
      current: params.current || 1,
      pageSize: params.pageSize || 20,
    })
  },
  
  async add(data) {
    return runModelMethod(MODEL_KEYS.FINANCE, METHOD_KEYS.FINANCE_ADD, data)
  },
  
  async edit(data) {
    return runModelMethod(MODEL_KEYS.FINANCE, METHOD_KEYS.FINANCE_EDIT, data)
  },
  
  async getDetail(id) {
    return runModelMethod(MODEL_KEYS.FINANCE, METHOD_KEYS.FINANCE_DETAIL, { id })
  },
  
  async delete(id) {
    return runModelMethod(MODEL_KEYS.FINANCE, METHOD_KEYS.FINANCE_DELETE, { id })
  },
  
  async getSummaryByType() {
    return runModelMethod(MODEL_KEYS.FINANCE, METHOD_KEYS.FINANCE_SUMMARY_BY_TYPE, {})
  },
  
  async getCounterpartySummary() {
    return runModelMethod(MODEL_KEYS.FINANCE, METHOD_KEYS.FINANCE_COUNTERPARTY_SUMMARY, {})
  },
  
  async getTodaySummary() {
    return runModelMethod(MODEL_KEYS.FINANCE, METHOD_KEYS.FINANCE_TODAY_SUMMARY, {})
  },
}

// ============================================
// 通用函数别名
// ============================================

// 入库单别名
export const getStockInList = (params) => stockInApi.getList(params)
export const getStockInDetail = (id) => stockInApi.getDetail(id)
export const createStockIn = (data) => stockInApi.add(data)
export const updateStockIn = (data) => stockInApi.edit(data)
export const deleteStockIn = (id) => stockInApi.delete(id)

// 出库单别名
export const getStockOutList = (params) => stockOutApi.getList(params)
export const getStockOutDetail = (id) => stockOutApi.getDetail(id)
export const createStockOut = (data) => stockOutApi.add(data)
export const updateStockOut = (data) => stockOutApi.edit(data)
export const deleteStockOut = (id) => stockOutApi.delete(id)

// 调拨单别名
export const getTransferList = (params) => transferApi.getList(params)
export const getTransferDetail = (id) => transferApi.getDetail(id)
export const createTransfer = (data) => transferApi.add(data)
export const updateTransfer = (data) => transferApi.edit(data)
export const deleteTransfer = (id) => transferApi.delete(id)

// 盘点单别名
export const getCheckList = (params) => checkApi.getList(params)
export const getCheckDetail = (id) => checkApi.getDetail(id)
export const createCheck = (data) => checkApi.add(data)
export const updateCheck = (data) => checkApi.edit(data)
export const deleteCheck = (id) => checkApi.delete(id)

// 库存台账别名
export const getInventoryList = (params) => inventoryApi.getList(params)
export const getInventoryLowStock = () => inventoryApi.getLowStock()
export const getInventorySummary = () => inventoryApi.getSummary()

// 仓库别名
export const getWarehouseList = (params) => warehouseApi.getList(params)
export const getWarehouseDetail = (id) => warehouseApi.getDetail(id)
export const createWarehouse = (data) => warehouseApi.add(data)
export const updateWarehouse = (data) => warehouseApi.edit(data)
export const deleteWarehouse = (id) => warehouseApi.delete(id)

// 商品别名
export const getProductList = (params) => productApi.getList(params)
export const getProductDetail = (id) => productApi.getDetail(id)
export const createProduct = (data) => productApi.add(data)
export const updateProduct = (data) => productApi.edit(data)
export const deleteProduct = (id) => productApi.delete(id)

// 客户别名
export const getCustomerList = (params) => customerApi.getList(params)
export const getCustomerDetail = (id) => customerApi.getDetail(id)
export const createCustomer = (data) => customerApi.add(data)
export const updateCustomer = (data) => customerApi.edit(data)
export const deleteCustomer = (id) => customerApi.delete(id)

// 供应商别名
export const getSupplierList = (params) => supplierApi.getList(params)
export const getSupplierDetail = (id) => supplierApi.getDetail(id)
export const createSupplier = (data) => supplierApi.add(data)
export const updateSupplier = (data) => supplierApi.edit(data)
export const deleteSupplier = (id) => supplierApi.delete(id)

// 账户别名
export const getAccountList = (params) => accountApi.getList(params)
export const getAccountDetail = (id) => accountApi.getDetail(id)
export const createAccount = (data) => accountApi.add(data)
export const updateAccount = (data) => accountApi.edit(data)
export const deleteAccount = (id) => accountApi.delete(id)

// ============================================
// SN码管理函数
// ============================================
export const getSnList = (params) => snApi.getList(params)
export const getSnDetail = (id) => snApi.getDetail(id)
export const createSn = (data) => snApi.add(data)
export const updateSn = (data) => snApi.edit(data)
export const deleteSn = (id) => snApi.delete(id)
export const getSnLogList = (params) => snApi.getLogList(params)

// SN码追踪（通过SN码查询当前位置）
export const getSnTrace = (params) => runModelMethod(MODEL_KEYS.SN_CODE, METHOD_KEYS.SN_BY_WAREHOUSE, params)

// SN码退货
export const doSnReturn = (data) => runModelMethod(MODEL_KEYS.SN_CODE, METHOD_KEYS.SN_SCRAP, data)

// ============================================
// 基础资料下拉列表
// ============================================

// 商品下拉列表
export const getProductSimpleList = (params = {}) => 
  runModelMethod(MODEL_KEYS.PRODUCT, METHOD_KEYS.PRODUCT_LIST, { ...params, current: 1, pageSize: 9999 })

// 仓库下拉列表
export const getWarehouseSimpleList = (params = {}) => 
  runModelMethod(MODEL_KEYS.WAREHOUSE, METHOD_KEYS.WAREHOUSE_LIST, { ...params, current: 1, pageSize: 9999 })

// 供应商下拉列表
export const getSupplierSimpleList = (params = {}) => 
  runModelMethod(MODEL_KEYS.SUPPLIER, METHOD_KEYS.SUPPLIER_LIST, { ...params, current: 1, pageSize: 9999 })

// 客户下拉列表
export const getCustomerSimpleList = (params = {}) => 
  runModelMethod(MODEL_KEYS.CUSTOMER, METHOD_KEYS.CUSTOMER_LIST, { ...params, current: 1, pageSize: 9999 })

// 账户下拉列表
export const getAccountSimpleList = (params = {}) => 
  runModelMethod(MODEL_KEYS.ACCOUNT, METHOD_KEYS.ACCOUNT_LIST, { ...params, current: 1, pageSize: 9999 })

// ============================================
// 导出功能（需要后端支持）
// ============================================
export const exportSnList = async (params) => {
  // 获取全部数据后下载
  const res = await snApi.getList({ ...params, current: 1, pageSize: 9999 })
  return res
}

export const exportStockInList = async (params) => {
  const res = await stockInApi.getList({ ...params, current: 1, pageSize: 9999 })
  return res
}

export const exportStockOutList = async (params) => {
  const res = await stockOutApi.getList({ ...params, current: 1, pageSize: 9999 })
  return res
}

export const exportInventoryList = async (params) => {
  const res = await inventoryApi.getList({ ...params, current: 1, pageSize: 9999 })
  return res
}

// ============================================
// 采购订单下拉列表（复用采购入库单模型）
// ============================================
export const getPurchaseOrderSimpleList = (params = {}) => 
  runModelMethod(MODEL_KEYS.STOCK_IN, METHOD_KEYS.STOCK_IN_LIST, { ...params, current: 1, pageSize: 9999 })

// ============================================
// 基础资料 API（通用下拉列表）
// ============================================
export const basicDataApi = {
  // 商品下拉
  async getProductList(params = {}) {
    return runModelMethod(MODEL_KEYS.PRODUCT, METHOD_KEYS.PRODUCT_LIST, { ...params, current: 1, pageSize: 9999 })
  },
  // 仓库下拉
  async getWarehouseList(params = {}) {
    return runModelMethod(MODEL_KEYS.WAREHOUSE, METHOD_KEYS.WAREHOUSE_LIST, { ...params, current: 1, pageSize: 9999 })
  },
  // 供应商下拉
  async getSupplierList(params = {}) {
    return runModelMethod(MODEL_KEYS.SUPPLIER, METHOD_KEYS.SUPPLIER_LIST, { ...params, current: 1, pageSize: 9999 })
  },
  // 客户下拉
  async getCustomerList(params = {}) {
    return runModelMethod(MODEL_KEYS.CUSTOMER, METHOD_KEYS.CUSTOMER_LIST, { ...params, current: 1, pageSize: 9999 })
  },
  // 账户下拉
  async getAccountList(params = {}) {
    return runModelMethod(MODEL_KEYS.ACCOUNT, METHOD_KEYS.ACCOUNT_LIST, { ...params, current: 1, pageSize: 9999 })
  },
}

// ============================================
// 入库单确认/取消（使用编辑接口）
// ============================================
export const confirmStockIn = (id) => stockInApi.edit({ id, status: 'CONFIRMED' })
export const cancelStockIn = (id) => stockInApi.edit({ id, status: 'CANCELLED' })

// ============================================
// 出库单别名（复用 STOCK_OUT）
// ============================================
export const getSaleList = (params) => stockOutApi.getList(params)
export const getSaleDetail = (id) => stockOutApi.getDetail(id)
export const createSale = (data) => stockOutApi.add(data)
export const updateSale = (data) => stockOutApi.edit(data)
export const confirmSale = (id) => stockOutApi.edit({ id, status: 'CONFIRMED' })

// ============================================
// 调拨单确认（使用编辑接口）
// ============================================
export const confirmTransfer = (id) => transferApi.edit({ id, status: 'CONFIRMED' })

// ============================================
// 盘点单完成（使用编辑接口）
// ============================================
export const completeCheck = (id) => checkApi.edit({ id, status: 'COMPLETED' })

// ============================================
// 库存查询
// ============================================
export const getInventoryByWarehouse = (params) => inventoryApi.getList(params)

// ============================================
// 销售待收款列表（复用销售出库单）
// ============================================
export const getSalePendingList = (params) => stockOutApi.getList({ ...params, status: 'PENDING' })

// ============================================
// 采购待付款列表（复用采购入库单）
// ============================================
export const getStockInPendingList = (params) => stockInApi.getList({ ...params, status: 'PENDING' })

// ============================================
// 收款单 API（复用财务流水）
// ============================================
export const collectionApi = financeApi

// ============================================
// 应收单 API（复用财务流水）
// ============================================
export const receivableApi = financeApi

// ============================================
// 付款单 API（复用财务流水）
// ============================================
export const paymentApi = financeApi

// ============================================
// 创建收款单（财务流水类型为 RECEIVE）
// ============================================
export const createCollection = (data) => 
  runModelMethod(MODEL_KEYS.FINANCE, METHOD_KEYS.FINANCE_ADD, { ...data, type: 'RECEIVE' })

// ============================================
// 创建付款单（财务流水类型为 PAY）
// ============================================
export const createPayment = (data) => 
  runModelMethod(MODEL_KEYS.FINANCE, METHOD_KEYS.FINANCE_ADD, { ...data, type: 'PAY' })

// ============================================
// 财务接口 - 应收单推送和删除（低开平台财务服务）
// 通过低开平台 API 路由直接调用
// ============================================

// 财务接口 methodKey
const FINANCE_METHODS = {
  RECEIVABLE_PUSH: 'xftacrreceiptbillreceiptbillpush',   // 应收单推送
  RECEIVABLE_DELETE: 'tacrreceiptbillreceiptbilldelete'   // 应收单删除
}

/**
 * 调用低开平台财务接口
 * @param {string} methodKey - 方法标识
 * @param {object} data - 请求数据
 */
async function callFinanceApi(methodKey, data = {}) {
  // 获取 API 基础地址（与 runModelMethod 相同）
  const baseUrl = getApiBaseUrl()
  const url = `${baseUrl}/api/run/${methodKey}`
  
  console.log('[财务接口] 请求:', url, data)
  
  try {
    const res = await fetch(url, {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    
    const result = await res.json()
    console.log('[财务接口] 响应:', result)
    
    // 判断是否成功
    if (result.returnCode === 'SUC0000' || result.code === 'SUC0000' || result.success) {
      return { success: true, data: result }
    } else {
      return { success: false, message: result.errorMsg || result.message || '接口调用失败' }
    }
  } catch (error) {
    console.error('[财务接口] 调用失败:', error)
    return { success: false, message: error.message }
  }
}

/**
 * 构建应收单推送参数
 * 按照账款管理接口文档要求的标准字段结构组装
 * 
 * @param {Object} options
 * @param {string} options.customerCode - 客户编码（必填）
 * @param {string} options.billCode - 单据编号（选填，有现成单号时传入）
 * @param {string} options.billDate - 账单日期 yyyy-MM-dd（选填，默认今天）
 * @param {Array}  options.items - 明细列表 [{ productCode, productName, quantity, price }]
 * @param {string} options.upSysId - 上游系统ID（选填，用于关联删除）
 * @param {string} options.remark - 备注（选填）
 * @returns {Object} 标准应收单推送参数
 */
export const buildReceivablePayload = (options = {}) => {
  const {
    customerCode,
    billCode = '',
    billDate = new Date().toISOString().split('T')[0],
    items = [],
    upSysId = '',
    remark = ''
  } = options

  if (!FINANCE_FORM_CODE) {
    console.warn('[账款管理] FINANCE_FORM_CODE 未配置，请在 src/api/index.js 中设置表单编号')
  }
  if (!customerCode) {
    throw new Error('客户编码 customerCode 不能为空')
  }

  // 按商品编码分组汇总（同一商品多数量合并为一行）
  const grouped = {}
  items.forEach(item => {
    const code = item.productCode || 'UNKNOWN'
    if (!grouped[code]) {
      grouped[code] = {
        productCode: code,
        productName: item.productName || '',
        quantity: 0,
        price: parseFloat(item.price) || 0
      }
    }
    grouped[code].quantity += parseFloat(item.quantity) || 0
  })
  const mergedItems = Object.values(grouped)

  // 计算总金额
  const totalAmount = mergedItems.reduce((sum, item) => {
    return sum + item.quantity * item.price
  }, 0)

  return {
    formCode: FINANCE_FORM_CODE,
    customerCode,
    billCode,
    billBeginDate: billDate,
    billEndDate: billDate,
    billSummaryApi: {
      totalBillAmount: totalAmount.toFixed(2),
      totalActualAmount: totalAmount.toFixed(2),
      totalPayableItems: totalAmount.toFixed(2),
      totalReceiveItems: totalAmount.toFixed(2),
      billSummaryFormInstanceList: []
    },
    receiveBillList: mergedItems.map(item => {
      const amount = (item.quantity * item.price).toFixed(2)
      return {
        amount,
        receiveItem: String(Math.round(item.quantity)),
        productCode: item.productCode,
        productName: item.productName,
        summaryCode: '',
        summaryName: '',
        receiveDate: billDate,
        currencyCode: 'CNY',
        exchangeRate: '1',
        billCode: item.billCode || billCode,
        upSysId: item.upSysId || upSysId
      }
    }),
    receiveBillApi: {
      receiveBillFormInstanceList: []
    },
    payMethodList: [],
    remark
  }
}

/**
 * 应收单推送（销售出库后调用）
 * 接口: POST {baseUrl}/api/run/xftacrreceiptbillreceiptbillpush
 * 
 * 推荐使用 buildReceivablePayload() 组装参数后传入：
 *   const payload = buildReceivablePayload({ customerCode: 'C001', items: [...] })
 *   await pushReceivable(payload)
 */
export const pushReceivable = async (data) => {
  return callFinanceApi(FINANCE_METHODS.RECEIVABLE_PUSH, data)
}

/**
 * 应收单删除（销售退货后调用）
 * 接口: POST {baseUrl}/api/run/tacrreceiptbillreceiptbilldelete
 * 
 * 支持两种调用方式：
 * 1. 传入对象: deleteReceivable({ billCode: 'AR001' })
 * 2. 传入字符串（自动转为 billCode）: deleteReceivable('AR001')
 */
export const deleteReceivable = async (data) => {
  const payload = typeof data === 'string' ? { billCode: data } : data
  return callFinanceApi(FINANCE_METHODS.RECEIVABLE_DELETE, payload)
}

// ============================================
// SN码库存查询
// ============================================
export const getStockSnList = (params) => snApi.getList(params)

// ============================================
// 可用SN码查询（按货品）
// ============================================
export const getAvailableSnByProduct = (params) => 
  runModelMethod(MODEL_KEYS.SN_CODE, METHOD_KEYS.SN_LIST, { ...params, status: 'INSTOCK', current: 1, pageSize: 9999 })

// ============================================
// SN码销售出库
// ============================================
export const doSaleSnOut = (data) => snApi.edit({ ...data, status: 'SOLD' })
export const exportInventory = exportInventoryList

// ============================================
// API 别名：添加 list 方法（兼容视图组件）
// ============================================
financeApi.list = financeApi.getList
paymentApi.list = financeApi.getList
collectionApi.list = financeApi.getList
receivableApi.list = financeApi.getList

// ============================================
// API 方法别名：添加视图组件常用的方法名
// ============================================

// basicDataApi 别名（去掉 List 后缀）
basicDataApi.getProducts = basicDataApi.getProductList
basicDataApi.getWarehouses = basicDataApi.getWarehouseList
basicDataApi.getSuppliers = basicDataApi.getSupplierList
basicDataApi.getCustomers = basicDataApi.getCustomerList
basicDataApi.getAccounts = basicDataApi.getAccountList
basicDataApi.getAll = basicDataApi.getProductList // 通用 getAll 备用

// 供应商 API 别名
supplierApi.list = supplierApi.getList
supplierApi.getAll = supplierApi.getList

// 客户 API 别名
customerApi.list = customerApi.getList
customerApi.getAll = customerApi.getList

// 仓库 API 别名
warehouseApi.list = warehouseApi.getList
warehouseApi.getAll = warehouseApi.getList

// 商品 API 别名
productApi.list = productApi.getList
productApi.getAll = productApi.getList

// 账户 API 别名
accountApi.list = accountApi.getList
accountApi.getAll = accountApi.getList

// 库存 API 别名
inventoryApi.list = inventoryApi.getList
inventoryApi.getAll = inventoryApi.getList

// 盘点 API 别名
checkApi.list = checkApi.getList
checkApi.getAll = checkApi.getList

// 采购退货 API 别名
purchaseReturnApi.list = purchaseReturnApi.getList
purchaseReturnApi.getAll = purchaseReturnApi.getList

// 销售退货 API 别名
saleReturnApi.list = saleReturnApi.getList
saleReturnApi.getAll = saleReturnApi.getList

// SN码 API 别名
snApi.list = snApi.getList
snApi.getAll = snApi.getList

// 入库单 API 别名
stockInApi.list = stockInApi.getList
stockInApi.getAll = stockInApi.getList

// 出库单 API 别名
stockOutApi.list = stockOutApi.getList
stockOutApi.getAll = stockOutApi.getList

// 调拨单 API 别名
transferApi.list = transferApi.getList
transferApi.getAll = transferApi.getList

// Dashboard API 别名
dashboardApi.list = dashboardApi.getList
dashboardApi.getAll = dashboardApi.getList

// ============================================
// SN码专用方法别名
// ============================================
snApi.getSnProducts = snApi.getList
snApi.getAvailableSn = snApi.getList


// SN码专用方法别名（basicDataApi）
basicDataApi.getSnProducts = basicDataApi.getProductList
basicDataApi.getSnWarehouses = basicDataApi.getWarehouseList
basicDataApi.getSnSuppliers = basicDataApi.getSupplierList
basicDataApi.getSnCustomers = basicDataApi.getCustomerList

