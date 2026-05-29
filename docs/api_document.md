# API 接口文档

## 接口说明

本系统通过 iframe 嵌入薪福通低开平台，使用 fetch API 调用后端接口。

### 环境说明

| 环境 | Base URL |
|------|----------|
| UAT | `https://xft-demo.cmburl.cn/xcodegw/app/reg4bc6558503724/tag/uat` |
| PRD | `https://xft.cmbchina.com/xcodegw/app/reg4bc6558503724/tag/prd` |

### 凭证说明

凭证跟随 Cookie 自动携带（`credentials: 'include'`），无需额外鉴权。

## 模型方法接口

### 接口地址

```
POST {baseUrl}/api/run/odexftopenapiv2appmodelmethodrun?appTag=uat&modelKey=xxx&methodKey=xxx
```

### Query 参数

| 参数 | 必填 | 类型 | 说明 |
|------|------|------|------|
| appTag | 是 | string | 环境标签：uat/prd |
| modelKey | 是 | string | 模型标识 |
| methodKey | 是 | string | 方法标识 |

### Body 参数

直接传递具体方法的入参，例如：

```json
{
  "current": 1,
  "pageSize": 20
}
```

### 请求示例

```javascript
// 获取 SN码列表
fetch(
  'https://xft-demo.cmburl.cn/xcodegw/app/reg4bc6558503724/tag/uat/api/run/odexftopenapiv2appmodelmethodrun?appTag=uat&modelKey=MOk2ZJ4aga&methodKey=FUG5LjJIRx',
  {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ current: 1, pageSize: 20 })
  }
)
```

### 响应格式

```json
{
  "returnCode": "SUC0000",
  "errorMsg": null,
  "body": {
    "list": [...],
    "total": 100,
    "pageSize": 20,
    "current": 1
  }
}
```

**字段说明：**

| 字段 | 类型 | 说明 |
|------|------|------|
| returnCode | STRING | 状态码，`SUC0000` 表示成功 |
| errorMsg | STRING | 错误信息，成功时为 `null` |
| body | OBJECT | 业务数据，不同模型方法结构不同 |

**查询响应示例：**

```json
{
  "returnCode": "SUC0000",
  "errorMsg": null,
  "body": {
    "total": 1,
    "list": [
      {
        "id": 2,
        "creator": "张超/U0000",
        "created_at": "2026-05-24 14:05:04",
        "updater": "张超/U0000",
        "updated_at": "2026-05-24 14:05:04"
      }
    ],
    "current": 1,
    "pageSize": 10
  }
}
```

## 用户信息接口

### 获取当前用户

```
GET {baseUrl}/api/open/ocodeauth/userinfo
```

响应：
```json
{
  "code": 0,
  "data": {
    "userId": "xxx",
    "userName": "张三",
    "deptId": "xxx",
    "deptName": "销售部"
  }
}
```

## 模型方法映射表

### SN码表 (MOk2ZJ4aga)

| 功能 | methodKey | 说明 |
|------|-----------|------|
| 列表查询 | FUG5LjJIRx | 分页查询 |
| 新增 | FUUjEoVur5 | 新增SN码 |
| 编辑 | FUU302EENf | 编辑SN码 |
| 查看详情 | FUZTDMrkH7 | 查看详情 |
| 删除 | FUoV37QEI0 | 删除 |
| 状态统计 | FUBkwoTsdZ | getStatusCount |
| 按仓库查询 | FUzTSnSYnx | warehouse_id |
| 今日出库 | FUXHQf4isJ | getStockOutToday |
| 报废 | FUFTtY9af0 | scrap |

### 采购入库单 (MOIN9eD2au)

| 功能 | methodKey | 说明 |
|------|-----------|------|
| 列表查询 | FUADr2TygU | 分页查询 |
| 新增 | FUlZOM13nS | 新增入库单 |
| 编辑 | FUlQSDHuOv | 编辑 |
| 查看详情 | FU8N6CTRMZ | 查看详情 |
| 删除 | FU1WUGjjGO | 删除 |

### 销售出库单 (MOenA360T5)

| 功能 | methodKey | 说明 |
|------|-----------|------|
| 列表查询 | FUJwJkbOnk | 分页查询 |
| 新增 | FUUahJCtGe | 新增出库单 |
| 编辑 | FUMC1YOXai | 编辑 |
| 查看详情 | FU2ViffXw4 | 查看详情 |
| 删除 | FURLAv3gOp | 删除 |

### 调拨单 (MOIrlRmiFH)

| 功能 | methodKey | 说明 |
|------|-----------|------|
| 列表查询 | FUW5FAbNha | 分页查询 |
| 新增 | FUDC3wl6P8 | 新增调拨单 |
| 编辑 | FUhakKYGcF | 编辑 |
| 查看详情 | FU6Xezd5Pb | 查看详情 |
| 删除 | FUWPKGnSWG | 删除 |

### 盘点单 (MO5WOkA9SX)

| 功能 | methodKey | 说明 |
|------|-----------|------|
| 列表查询 | FUQ56UBDHj | 分页查询 |
| 新增 | FUaAS7yYvZ | 新增盘点单 |
| 编辑 | FU6H93URI8 | 编辑 |
| 查看详情 | FUefEHSt2t | 查看详情 |
| 删除 | FUlNcPIkiO | 删除 |

### 库存台账 (MOsWdYRJhQ)

| 功能 | methodKey | 说明 |
|------|-----------|------|
| 列表查询 | FUsb8iYjRh | 分页查询 |
| 新增 | FU8Xen8xzH | 新增 |
| 编辑 | FUAkUucCVl | 编辑 |
| 查看详情 | FUY1usgMs9 | 查看详情 |
| 删除 | FUxQYz4UvO | 删除 |
| 低库存统计 | FUhzR97DOC | getLowStockCount |
| 仓库汇总 | FU3ZfaZLPj | getWarehouseSummary |
| 预警列表 | FU9aGv2Zuh | getAlertList |

### 仓库 (MO3LPiTHMU)

| 功能 | methodKey | 说明 |
|------|-----------|------|
| 列表查询 | FUQYxNNGuG | 分页查询 |
| 新增 | FUCOPYNJ7K | 新增仓库 |
| 编辑 | FUo00VnLkx | 编辑 |
| 查看详情 | FU68EKjRvx | 查看详情 |
| 删除 | FUaTjjfFE0 | 删除 |

### 商品 (MOeUIsmD4j)

| 功能 | methodKey | 说明 |
|------|-----------|------|
| 列表查询 | FUcPuvGaEN | 分页查询 |
| 新增 | FUZUQvhIh9 | 新增商品 |
| 编辑 | FUMutJUzWB | 编辑 |
| 查看详情 | FUOgJ5FJea | 查看详情 |
| 删除 | FUJPKoVKGz | 删除 |

### 客户 (MOj7UPuJx2)

| 功能 | methodKey | 说明 |
|------|-----------|------|
| 列表查询 | FUhljLxQOC | 分页查询 |
| 新增 | FUhdIhuhKP | 新增客户 |
| 编辑 | FUBLg4XVak | 编辑 |
| 查看详情 | FUkrgtof0H | 查看详情 |
| 删除 | FUvIfraor5 | 删除 |

### 供应商 (MOmke9xgeH)

| 功能 | methodKey | 说明 |
|------|-----------|------|
| 列表查询 | FUahi0uBQQ | 分页查询 |
| 新增 | FURNaL3qZ1 | 新增供应商 |
| 编辑 | FUxSx9jzAe | 编辑 |
| 查看详情 | FUZ32CRNo9 | 查看详情 |
| 删除 | FUqg607gvT | 删除 |

### 账户 (MOAusBgPiT)

| 功能 | methodKey | 说明 |
|------|-----------|------|
| 列表查询 | FUHgerXSOC | 分页查询 |
| 新增 | FUDiYnyCzb | 新增账户 |
| 编辑 | FUzqHOsuFZ | 编辑 |
| 查看详情 | FUeCQ9aGgK | 查看详情 |
| 删除 | FUwztwsCvd | 删除 |

### 财务流水 (MO08KyO9eU)

| 功能 | methodKey | 说明 |
|------|-----------|------|
| 列表查询 | FUC3UiW4pU | 分页查询 |
| 新增 | FUPktENU4l | 新增 |
| 编辑 | FUv6I0mjhC | 编辑 |
| 查看详情 | FUqDwSMSGq | 查看详情 |
| 删除 | FUkRzzgZ8H | 删除 |
| 按类型汇总 | FUilTGHdFd | getSummaryByType |
| 按对手方汇总 | FUCxUCbjdm | getCounterpartySummary |
| 今日汇总 | FUH9BA8mXe | getTodaySummary |


---

## 财务接口（低开平台账款管理）

### 接口地址

通过低开平台 API 路由调用，使用 `credentials: 'include'` 自动携带凭证。

| 环境 | 基础地址 |
|------|---------|
| UAT | `https://xft-demo.cmburl.cn/xcodegw/app/reg4bc6558503724/tag/uat` |
| PRD | `https://xft.cmbchina.com/xcodegw/app/reg4bc6558503724/tag/prd` |

凭证自动跟随 Cookie，无需额外配置。

---

### 财务接口 methodKey

| 接口 | methodKey | 用途 |
|------|-----------|------|
| 应收单推送 | `xftacrreceiptbillreceiptbillpush` | 销售出库后推送应收单 |
| 应收单删除 | `tacrreceiptbillreceiptbilldelete` | 销售退货后删除应收单 |

### 调用方式

```javascript
// URL 格式: {baseUrl}/api/run/{methodKey}
// 完整 URL: https://xft-demo.cmburl.cn/xcodegw/app/reg4bc6558503724/tag/uat/api/run/xftacrreceiptbillreceiptbillpush

fetch(url, {
  credentials: 'include',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
```

---

### 1. 应收单推送

**完整 URL:** 
- UAT: `https://xft-demo.cmburl.cn/xcodegw/app/reg4bc6558503724/tag/uat/api/run/xftacrreceiptbillreceiptbillpush`
- PRD: `https://xft.cmbchina.com/xcodegw/app/reg4bc6558503724/tag/prd/api/run/xftacrreceiptbillreceiptbillpush`

**请求参数 (Body):**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| formCode | STRING | **是** | 表单编码（账款管理 → 系统设置 → 自定义配置 → 表单流程） |
| customerCode | STRING | **是** | 客户编码（账款管理 → 系统设置 → 档案管理 → 客户页面的员工号） |
| billCode | STRING | 否 | 单据编号（有现成单号时传入，否则按编码规则生成） |
| billBeginDate | STRING | 否 | 账期开始时间 (yyyy-MM-dd)，福利应收单时必填 |
| billEndDate | STRING | 否 | 账期结束时间 (yyyy-MM-dd)，福利应收单时必填 |
| billSummaryApi | OBJECT | 否 | 账单汇总（人力应收单且拖入账单汇总组件时必填） |
| receiveBillList | ARRAY | 否 | 应收明细列表 |
| receiveBillApi | OBJECT | 否 | 明细表单自定义字段 |
| payMethodList | ARRAY | 否 | 付款方式列表 |
| businessManCodes | ARRAY | 否 | 业务员编码集合（员工管理 → 员工花名册的员工号），最多50个 |
| commissionRate | STRING | 否 | 佣金比例（福利应收单且必填时传），如 11% 传 0.11，最多6位小数 |
| departmentCode | STRING | 否 | 业务部门编码（管理后台 → 组织的组织编码） |
| formInstanceApiList | ARRAY | 否 | 表单自定义字段（{ code, values: [] }） |
| goodsInfoApiList | ARRAY | 否 | 商品信息列表 |
| remark | STRING | 否 | 备注 |

**billSummaryApi 结构:**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| totalBillAmount | STRING | 否 | 账单总金额（最多14位整数，2位小数） |
| totalActualAmount | STRING | 否 | 实发总金额（最多14位整数，2位小数） |
| totalPayableItems | STRING | 否 | 应发合计（最多14位整数，2位小数） |
| totalPersonNumber | STRING | 否 | 总人数（数字，不支持小数或负数） |
| totalServiceAmount | STRING | 否 | 服务费总金额（最多14位整数，2位小数） |
| totalSocialSecurity | STRING | 否 | 社保合计（最多14位整数，2位小数） |
| billSummaryFormInstanceList | ARRAY | 否 | 账单汇总自定义字段列表（{ code, values: [] }） |

**receiveBillList 明细结构:**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| amount | STRING | 否 | 金额 |
| receiveItem | STRING | 否 | 数量 |
| productCode | STRING | 否 | 商品编码 |
| productName | STRING | 否 | 商品名称 |
| receiveDate | STRING | 否 | 日期 (yyyy-MM-dd) |
| currencyCode | STRING | 否 | 币种 |
| exchangeRate | STRING | 否 | 汇率 |
| billCode | STRING | 否 | 单据编号 |
| upSysId | STRING | 否 | 上游系统ID |

**响应:**
```json
{
  "returnCode": "SUC0000",
  "errorMsg": null,
  "body": null
}
```

---

### 2. 应收单删除

**完整 URL:**
- UAT: `https://xft-demo.cmburl.cn/xcodegw/app/reg4bc6558503724/tag/uat/api/run/tacrreceiptbillreceiptbilldelete`
- PRD: `https://xft.cmbchina.com/xcodegw/app/reg4bc6558503724/tag/prd/api/run/tacrreceiptbillreceiptbilldelete`

**请求参数 (Body):**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| billCode | STRING | 是* | 单据编号（账款管理 → 应收 → 应收管理 → 收入确认页面展示的单据编号） |
| upSysId | STRING | 是* | 上游系统ID（单据有上游系统ID时可传） |

> 注意：billCode 和 upSysId 二选一必填

**响应:**
```json
{
  "returnCode": "SUC0000",
  "errorMsg": null,
  "body": null
}
```

**错误码说明:**

| 错误码 | 错误信息 |
|--------|---------|
| XFKRPI0001 | 请求参数错误，单据号和上游系统id不能同时为空 |
| XFKRPI0002 | 审批中的应收单不允许删除 |
| XFKRPI0003 | 已确认的应收单不允许作废/删除 |
| XFKRPI0004 | 应收单已经开票，不允许作废/删除 |
| XFKRPI0005 | 应收单有下游收入确认单，不允许删除 |
| XFKRPI0007 | 开启冲销后回款、开票的管控后，负数账单关联的上游单据已开票/回款，不允许删除/作废 |
| XFKAPI0007 | 应收单不存在 |
| XFKRPI0012 | 应收单有已生成/生成中下游账单生成计划，不允许作废 |
| XFKSYC0004 | 多笔已经入账的单据（{0}）不能编辑、作废、撤销认领和删除！ |

---

### 调用场景

| 业务场景 | 触发时机 | 调用函数 | 说明 |
|---------|---------|---------|------|
| 销售出库 | 确认出库成功后 | `pushReceivable()` | 推送应收单 |
| 销售退货 | 保存退货单成功后 | `deleteReceivable()` | 删除应收单 |

---

### 代码示例

```javascript
import { pushReceivable, deleteReceivable, buildReceivablePayload, FINANCE_FORM_CODE } from '@/api'

// 1. 配置表单编号（仅需执行一次，通常在项目初始化时配置）
// 注意：需在薪福通低开平台 - 账款管理 - 系统设置 - 自定义配置 - 编码规则中配置应收单号生成规则
// FINANCE_FORM_CODE = 'YOUR_FORM_CODE'  // 修改 src/api/index.js 中的默认值

// 2. 推送应收单（销售出库后）
const payload = buildReceivablePayload({
  customerCode: 'C001',                     // 客户编码（必填）
  billCode: 'SO20240001',                   // 业务单据编号（选填）
  billDate: '2024-01-01',                   // 账单日期（默认当天）
  items: [
    {
      productCode: 'P001',
      productName: '扫地机器人',
      quantity: 10,
      price: 1000.00
    }
  ],
  remark: '销售出库自动生成'
})
const res = await pushReceivable(payload)

// 3. 删除应收单（销售退货后）
// 方式一：传字符串（自动包装为 { billCode }）
await deleteReceivable('AR20240001')

// 方式二：传对象
await deleteReceivable({
  billCode: 'AR20240001'
})

// 方式三：使用上游系统ID
await deleteReceivable({
  upSysId: 'WBXT001'
})
```
