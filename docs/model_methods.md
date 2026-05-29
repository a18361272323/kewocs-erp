# 模型方法映射表

本文档记录低开平台所有业务模型的 `modelKey` 和 `methodKey`，供开发参考。

---

## 模型方法概览

| 模型名称 | modelKey | 主要方法 |
|---------|----------|---------|
| SN码表 | MOk2ZJ4aga | list, add, edit, detail, delete, statusCount |
| SN操作日志表 | MOqg2psiTa | list, add |
| 采购入库单主表 | MOIN9eD2au | list, add, edit, detail, delete |
| 采购入库单明细表 | MOc2tEbUGK | list, add, edit |
| 销售出库单主表 | MOenA360T5 | list, add, edit, detail, delete |
| 销售出库单明细表 | MOg8t6pKm4 | list, add, edit |
| 销售退货单主表 | MOky0Pcw6W | list, add, edit, detail |
| 销售退货单明细表 | MOHwXl5rMK | list, add, edit |
| 采购退货单主表 | MOV8t2Ah9X | list, add, edit, detail |
| 采购退货单明细表 | MOkM8P1d1B | list, add, edit |
| 调拨单主表 | MOIrlRmiFH | list, add, edit, detail, delete |
| 调拨单明细表 | MOORe8J0Dl | list, add, edit |
| 盘点单主表 | MO5WOkA9SX | list, add, edit, detail, delete |
| 盘点单明细表 | MO0T3mVifs | list, add, edit |
| 仓库 | MO3LPiTHMU | list, add, edit, detail, delete |
| 商品 | MOeUIsmD4j | list, add, edit, detail, delete |
| 客户 | MOj7UPuJx2 | list, add, edit, detail, delete |
| 供应商表 | MOmke9xgeH | list, add, edit, detail, delete |
| 账户 | MOAusBgPiT | list, add, edit, detail, delete |
| 库存台账表 | MOsWdYRJhQ | list, add, edit, detail, delete |
| 财务流水对接表 | MO08KyO9eU | list, add, edit, detail, delete |

---

## SN码表 (MOk2ZJ4aga)

| 方法 | methodKey | 说明 |
|------|-----------|------|
| list | FUG5LjJIRx | SN码列表查询 |
| add | FUUjEoVur5 | 新增SN码 |
| edit | FUU302EENf | 编辑SN码 |
| detail | FUZTDMrkH7 | SN码详情 |
| delete | FUoV37QEI0 | 删除SN码 |
| statusCount | FUBkwoTsdZ | SN码状态统计 |
| byWarehouse | FUzTSnSYnx | 按仓库查询SN码 |
| stockOutToday | FUXHQf4isJ | 今日出库统计 |
| scrap | FUFTtY9af0 | SN码报废 |

---

## SN操作日志表 (MOqg2psiTa)

| 方法 | methodKey | 说明 |
|------|-----------|------|
| list | FUUBuLNhuu | 日志列表查询 |
| add | FUtcrpdyV1 | 新增日志 |

---

## 采购入库单主表 (MOIN9eD2au)

| 方法 | methodKey | 说明 |
|------|-----------|------|
| list | FUADr2TygU | 入库单列表 |
| add | FUlZOM13nS | 新增入库单 |
| edit | FUlQSDHuOv | 编辑入库单 |
| detail | FU8N6CTRMZ | 入库单详情 |
| delete | FU1WUGjjGO | 删除入库单 |

---

## 销售出库单主表 (MOenA360T5)

| 方法 | methodKey | 说明 |
|------|-----------|------|
| list | FUJwJkbOnk | 出库单列表 |
| add | FUUahJCtGe | 新增出库单 |
| edit | FUMC1YOXai | 编辑出库单 |
| detail | FU2ViffXw4 | 出库单详情 |
| delete | FURLAv3gOp | 删除出库单 |

---

## 调拨单主表 (MOIrlRmiFH)

| 方法 | methodKey | 说明 |
|------|-----------|------|
| list | FUW5FAbNha | 调拨单列表 |
| add | FUDC3wl6P8 | 新增调拨单 |
| edit | FUhakKYGcF | 编辑调拨单 |
| detail | FU6Xezd5Pb | 调拨单详情 |
| delete | FUWPKGnSWG | 删除调拨单 |

---

## 盘点单主表 (MO5WOkA9SX)

| 方法 | methodKey | 说明 |
|------|-----------|------|
| list | FUQ56UBDHj | 盘点单列表 |
| add | FUaAS7yYvZ | 新增盘点单 |
| edit | FU6H93URI8 | 编辑盘点单 |
| detail | FUefEHSt2t | 盘点单详情 |
| delete | FUlNcPIkiO | 删除盘点单 |

---

## 仓库 (MO3LPiTHMU)

| 方法 | methodKey | 说明 |
|------|-----------|------|
| list | FUQYxNNGuG | 仓库列表 |
| add | FUCOPYNJ7K | 新增仓库 |
| edit | FUo00VnLkx | 编辑仓库 |
| detail | FU68EKjRvx | 仓库详情 |
| delete | FUAjjfFE0 | 删除仓库 |

---

## 商品 (MOeUIsmD4j)

| 方法 | methodKey | 说明 |
|------|-----------|------|
| list | FUcPuvGaEN | 商品列表 |
| add | FUZUQvhIh9 | 新增商品 |
| edit | FUMutJUzWB | 编辑商品 |
| detail | FUOgJ5FJea | 商品详情 |
| delete | FUJPKoVKGz | 删除商品 |

---

## 客户 (MOj7UPuJx2)

| 方法 | methodKey | 说明 |
|------|-----------|------|
| list | FUhljLxQOC | 客户列表 |
| add | FUhdIhuhKP | 新增客户 |
| edit | FUBLg4XVak | 编辑客户 |
| detail | FUkrgtof0H | 客户详情 |
| delete | FUvIfraor5 | 删除客户 |

---

## 供应商表 (MOmke9xgeH)

| 方法 | methodKey | 说明 |
|------|-----------|------|
| list | FUahi0uBQQ | 供应商列表 |
| add | FURNaL3qZ1 | 新增供应商 |
| edit | FUxSx9jzAe | 编辑供应商 |
| detail | FUZ32CRNo9 | 供应商详情 |
| delete | FUqg607gvT | 删除供应商 |

---

## 账户 (MOAusBgPiT)

| 方法 | methodKey | 说明 |
|------|-----------|------|
| list | FUHgerXSOC | 账户列表 |
| add | FUDiYnyCzb | 新增账户 |
| edit | FUzqHOsuFZ | 编辑账户 |
| detail | FUeCQ9aGgK | 账户详情 |
| delete | FUwztwsCvd | 删除账户 |

---

## 库存台账表 (MOsWdYRJhQ)

| 方法 | methodKey | 说明 |
|------|-----------|------|
| list | FUsb8iYjRh | 库存台账列表 |
| add | FU8Xen8xzH | 新增库存 |
| edit | FUAkUucCVl | 编辑库存 |
| detail | FUY1usgMs9 | 库存详情 |
| delete | FUxQYz4UvO | 删除库存 |
| lowStock | FUhzR97DOC | 低库存预警 |
| summary | FU3ZfaZLPj | 库存汇总 |
| alert | FU9aGv2Zuh | 库存预警 |

---

## 财务流水对接表 (MO08KyO9eU)

| 方法 | methodKey | 说明 |
|------|-----------|------|
| list | FUC3UiW4pU | 财务流水列表 |
| add | FUPktENU4l | 新增财务流水 |
| edit | FUv6I0mjhC | 编辑财务流水 |
| detail | FUqDwSMSGq | 财务流水详情 |
| delete | FUkRzzgZ8H | 删除财务流水 |
| summaryByType | FUilTGHdFd | 按类型汇总 |
| summaryByCounterparty | FUCxUCbjdm | 按交易方汇总 |
| todaySummary | FUH9BA8mXe | 今日汇总 |

---

## 采购退货单主表 (MOV8t2Ah9X)

| 方法 | methodKey | 说明 |
|------|-----------|------|
| list | FUaZ4wLM6e | 退货单列表 |
| add | FUKfVnr5XQ | 新增退货单 |
| edit | FU1VDz9NRt | 编辑退货单 |
| detail | FUrCduAiGn | 退货单详情 |

---

## 销售退货单主表 (MOky0Pcw6W)

| 方法 | methodKey | 说明 |
|------|-----------|------|
| list | FUQI57ueUm | 退货单列表 |
| add | FUg7l9v2dQ | 新增退货单 |
| edit | FUXY7dYmUj | 编辑退货单 |
| detail | FU1gan9X1c | 退货单详情 |

---

## 财务接口（低开平台账款管理）

财务接口通过低开平台 API 路由调用，使用 `credentials: 'include'` 自动携带凭证。

### 接口 methodKey

| 接口 | methodKey | 用途 |
|------|-----------|------|
| 应收单推送 | xftacrreceiptbillreceiptbillpush | 销售出库后推送应收单 |
| 应收单删除 | tacrreceiptbillreceiptbilldelete | 销售退货后删除应收单 |

### 调用方式

```javascript
// URL: {baseUrl}/api/run/{methodKey}
// 例如: https://xft-demo.cmburl.cn/xcodegw/app/reg4bc6558503724/tag/uat/api/run/xftacrreceiptbillreceiptbillpush

fetch(url, {
  credentials: 'include',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
```

### 应收单推送请求参数

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| billDate | STRING | 是 | 账单日期 (yyyy-MM-dd) |
| customerCode | STRING | 是 | 客户编码 |
| businessTypeCode | STRING | 是 | 业务类型编码 |
| billDetails | ARRAY | 是 | 明细列表 |
| billCode | STRING | 否 | 单据编号 |
| totalBillAmount | STRING | 否 | 账单总金额 |
| currencyCode | STRING | 否 | 币种 |
| remark | STRING | 否 | 备注 |

### 应收单删除请求参数

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| billCode | STRING | 是* | 单据编号（二选一） |
| upSysId | STRING | 是* | 上游系统ID（二选一） |

---

## 代码中的常量定义

### MODEL_KEYS

```javascript
export const MODEL_KEYS = {
  SN_CODE: 'MOk2ZJ4aga',
  SN_LOG: 'MOqg2psiTa',
  STOCK_IN: 'MOIN9eD2au',
  STOCK_OUT: 'MOenA360T5',
  RETURN_OUT: 'MOky0Pcw6W',
  RETURN_IN: 'MOV8t2Ah9X',
  TRANSFER: 'MOIrlRmiFH',
  CHECK: 'MO5WOkA9SX',
  WAREHOUSE: 'MO3LPiTHMU',
  PRODUCT: 'MOeUIsmD4j',
  CUSTOMER: 'MOj7UPuJx2',
  SUPPLIER: 'MOmke9xgeH',
  ACCOUNT: 'MOAusBgPiT',
  INVENTORY: 'MOsWdYRJhQ',
  FINANCE: 'MO08KyO9eU',
}
```

### METHOD_KEYS（部分）

```javascript
export const METHOD_KEYS = {
  // SN码表
  SN_LIST: 'FUG5LjJIRx',
  SN_ADD: 'FUUjEoVur5',
  SN_EDIT: 'FUU302EENf',
  SN_DETAIL: 'FUZTDMrkH7',
  SN_DELETE: 'FUoV37QEI0',
  SN_STATUS_COUNT: 'FUBkwoTsdZ',
  SN_STOCK_OUT_TODAY: 'FUXHQf4isJ',

  // 入库单
  STOCK_IN_LIST: 'FUADr2TygU',
  STOCK_IN_ADD: 'FUlZOM13nS',
  STOCK_IN_EDIT: 'FUlQSDHuOv',
  STOCK_IN_DETAIL: 'FU8N6CTRMZ',

  // 出库单
  STOCK_OUT_LIST: 'FUJwJkbOnk',
  STOCK_OUT_ADD: 'FUUahJCtGe',
  STOCK_OUT_EDIT: 'FUMC1YOXai',

  // 调拨单
  TRANSFER_LIST: 'FUW5FAbNha',
  TRANSFER_ADD: 'FUDC3wl6P8',
  TRANSFER_EDIT: 'FUhakKYGcF',

  // 盘点单
  CHECK_LIST: 'FUQ56UBDHj',
  CHECK_ADD: 'FUaAS7yYvZ',
  CHECK_EDIT: 'FU6H93URI8',

  // 仓库
  WAREHOUSE_LIST: 'FUQYxNNGuG',
  WAREHOUSE_ADD: 'FUCOPYNJ7K',

  // 商品
  PRODUCT_LIST: 'FUcPuvGaEN',
  PRODUCT_ADD: 'FUZUQvhIh9',

  // 客户
  CUSTOMER_LIST: 'FUhljLxQOC',
  CUSTOMER_ADD: 'FUhdIhuhKP',

  // 供应商
  SUPPLIER_LIST: 'FUahi0uBQQ',
  SUPPLIER_ADD: 'FURNaL3qZ1',

  // 财务接口
  AR_RECEIPT_PUSH: 'xftacrreceiptbillreceiptbillpush',
  AR_RECEIPT_DELETE: 'tacrreceiptbillreceiptbilldelete',
}
```
