# 模型 API 映射表

> 本文档说明前端代码中使用的 modelKey 和 methodKey 映射关系，基于低开平台模型方法配置

## 接口调用格式

### URL 格式

```
POST {baseUrl}/api/run/odexftopenapiv2appmodelmethodrun?appTag=uat&modelKey=xxx&methodKey=xxx
```

| 环境 | baseUrl |
|------|---------|
| UAT | `https://xft-demo.cmburl.cn/xcodegw/app/reg4bc6558503724/tag/uat` |
| PRD | `https://xft.cmbchina.com/xcodegw/app/reg4bc6558503724/tag/prd` |

### Query 参数

| 参数 | 必填 | 说明 |
|------|------|------|
| appTag | 是 | 环境标签：uat/prd |
| modelKey | 是 | 模型标识 |
| methodKey | 是 | 方法标识 |

### Body 参数

直接传递具体方法的入参，例如：

```json
{
  "current": 1,
  "pageSize": 20
}
```

## 模型与常量对应

### MODEL_KEYS 常量

```javascript
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
```

## 核心 API 函数

### SN码管理

```javascript
import { snApi, getSnList, getSnDetail, createSn, updateSn, deleteSn, getSnLogList } from '@/api'

// 列表
await snApi.getList({ current: 1, pageSize: 20 })
// 或
await getSnList({ current: 1, pageSize: 20 })

// 详情
await snApi.getDetail(id)

// 新增
await snApi.add({ snCode: 'xxx', productId: 'xxx', warehouseId: 'xxx' })

// 编辑
await snApi.edit({ id: 'xxx', snStatus: 'INSTOCK' })

// 删除
await snApi.delete(id)
```

### 采购入库

```javascript
import { stockInApi, getStockInList, getStockInDetail, createStockIn, updateStockIn, confirmStockIn, cancelStockIn } from '@/api'

// 列表
await stockInApi.getList({ current: 1, pageSize: 20 })

// 详情
await stockInApi.getDetail(id)

// 新增
await stockInApi.add({ supplierId: 'xxx', warehouseId: 'xxx', items: [...] })

// 编辑
await stockInApi.edit({ id: 'xxx', items: [...] })

// 确认/取消
await confirmStockIn(id)  // status: CONFIRMED
await cancelStockIn(id)   // status: CANCELLED
```

### 销售出库

```javascript
import { stockOutApi, getSaleList, getSaleDetail, createSale, updateSale, confirmSale } from '@/api'

// 列表
await stockOutApi.getList({ current: 1, pageSize: 20 })

// 详情
await stockOutApi.getDetail(id)

// 新增
await stockOutApi.add({ customerId: 'xxx', warehouseId: 'xxx', items: [...] })

// 编辑
await stockOutApi.edit({ id: 'xxx', items: [...] })

// 确认
await confirmSale(id)
```

### 调拨单

```javascript
import { transferApi, getTransferList, getTransferDetail, createTransfer, updateTransfer, confirmTransfer } from '@/api'

// 列表
await transferApi.getList({ current: 1, pageSize: 20 })

// 详情
await transferApi.getDetail(id)

// 新增
await transferApi.add({ fromWarehouseId: 'xxx', toWarehouseId: 'xxx', items: [...] })

// 编辑
await transferApi.edit({ id: 'xxx', items: [...] })

// 确认
await confirmTransfer(id)
```

### 盘点单

```javascript
import { checkApi, getCheckList, getCheckDetail, createCheck, updateCheck, completeCheck } from '@/api'

// 列表
await checkApi.getList({ current: 1, pageSize: 20 })

// 详情
await checkApi.getDetail(id)

// 新增
await checkApi.add({ warehouseId: 'xxx', items: [...] })

// 编辑
await checkApi.edit({ id: 'xxx', items: [...] })

// 完成
await completeCheck(id)
```

### 库存台账

```javascript
import { inventoryApi, getInventoryList, getInventoryLowStock, getInventorySummary } from '@/api'

// 列表
await inventoryApi.getList({ current: 1, pageSize: 20, warehouseId: 'xxx' })

// 低库存
await inventoryApi.getLowStock()

// 仓库汇总
await inventoryApi.getSummary()
```

### 基础资料

```javascript
import { 
  warehouseApi, productApi, customerApi, supplierApi, accountApi,
  getWarehouseList, getProductList, getCustomerList, getSupplierList, getAccountList,
  getWarehouseSimpleList, getProductSimpleList, getCustomerSimpleList, 
  getSupplierSimpleList, getAccountSimpleList
} from '@/api'

// 仓库 CRUD
await warehouseApi.getList({ current: 1, pageSize: 100 })
await warehouseApi.add({ warehouseName: 'xxx' })
await warehouseApi.edit({ id: 'xxx', warehouseName: 'xxx' })
await warehouseApi.getDetail(id)
await warehouseApi.delete(id)

// 商品 CRUD - 同上
// 客户 CRUD - 同上
// 供应商 CRUD - 同上
// 账户 CRUD - 同上

// 下拉列表（分页获取全部）
await getWarehouseSimpleList()
await getProductSimpleList()
await getCustomerSimpleList()
await getSupplierSimpleList()
await getAccountSimpleList()
```

### Dashboard 统计

```javascript
import { dashboardApi } from '@/api'

await dashboardApi.getStats()
// 返回: { totalCount, inStockCount, soldCount, todayInCount, todayOutCount }
```

## 代码常量定义参考

```javascript
// modelKey 常量
SN_CODE = 'MOk2ZJ4aga'
STOCK_IN = 'MOIN9eD2au'
STOCK_OUT = 'MOenA360T5'
RETURN_IN = 'MOV8t2Ah9X'
RETURN_OUT = 'MOky0Pcw6W'
TRANSFER = 'MOIrlRmiFH'
CHECK = 'MO5WOkA9SX'
WAREHOUSE = 'MO3LPiTHMU'
INVENTORY = 'MOsWdYRJhQ'
PRODUCT = 'MOeUIsmD4j'
CUSTOMER = 'MOj7UPuJx2'
SUPPLIER = 'MOmke9xgeH'
ACCOUNT = 'MOAusBgPiT'
FINANCE = 'MO08KyO9eU'

// methodKey 常量
SN_LIST = 'FUG5LjJIRx'           // SN码列表
STOCK_IN_LIST = 'FUADr2TygU'     // 入库单列表
STOCK_OUT_LIST = 'FUJwJkbOnk'    // 出库单列表
TRANSFER_LIST = 'FUW5FAbNha'     // 调拨单列表
CHECK_LIST = 'FUQ56UBDHj'        // 盘点单列表
INVENTORY_LIST = 'FUsb8iYjRh'    // 库存列表
WAREHOUSE_LIST = 'FUQYxNNGuG'    // 仓库列表
PRODUCT_LIST = 'FUcPuvGaEN'      // 商品列表
CUSTOMER_LIST = 'FUhljLxQOC'     // 客户列表
SUPPLIER_LIST = 'FUahi0uBQQ'     // 供应商列表
ACCOUNT_LIST = 'FUHgerXSOC'      // 账户列表
FINANCE_LIST = 'FUC3UiW4pU'      // 财务流水列表
```

## 更新记录

- 2024-05-24: 全面整理模型和方法映射，清理不存在的模型和函数
- 2024-05-24: 更新接口格式为 Query 参数传参方式
