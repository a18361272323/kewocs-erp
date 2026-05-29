---
title: "应收单推送API"
tags: [账款管理, API, 应收单]
created: 2026-05-30
---

# 应收单推送 API

## 接口地址

```
POST {baseUrl}/api/run/xftacrreceiptbillreceiptbillpush
```

| 环境 | 完整地址 |
|------|---------|
| UAT | `https://xft-demo.cmburl.cn/xcodegw/app/reg4bc6558503724/tag/uat/api/run/xftacrreceiptbillreceiptbillpush` |
| PRD | `https://xft.cmbchina.com/xcodegw/app/reg4bc6558503724/tag/prd/api/run/xftacrreceiptbillreceiptbillpush` |

## 请求参数

> [!warning] formCode 必填
> 需先在薪福通后台 `账款管理 -> 系统设置 -> 自定义配置 -> 编码规则` 中配置应收单号生成规则。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `formCode` | STRING | **是** | 表单编码（从账款管理后台获取） |
| `customerCode` | STRING | **是** | 客户编码（员工号） |
| `billCode` | STRING | 否 | 单据编号 |
| `billBeginDate` | STRING | 否 | 账期开始 (yyyy-MM-dd) |
| `billEndDate` | STRING | 否 | 账期结束 (yyyy-MM-dd) |
| `receiveBillList` | ARRAY | 否 | 应收明细列表 |
| `businessManCodes` | ARRAY | 否 | 业务员编码集合（最多50个） |
| `departmentCode` | STRING | 否 | 业务部门编码 |
| `remark` | STRING | 否 | 备注 |

### receiveBillList 明细结构

| 字段 | 类型 | 说明 |
|------|------|------|
| `amount` | STRING | 金额 |
| `receiveItem` | STRING | 数量 |
| `productCode` | STRING | 商品编码 |
| `productName` | STRING | 商品名称 |
| `receiveDate` | STRING | 日期 (yyyy-MM-dd) |
| `currencyCode` | STRING | 币种 |
| `billCode` | STRING | 单据编号 |
| `upSysId` | STRING | 上游系统ID |

## 调用示例

```javascript
const payload = {
  formCode: 'YOUR_FORM_CODE',
  customerCode: 'C001',
  billCode: 'SO20260530001',
  remark: '销售出库自动生成',
  receiveBillList: [{
    amount: '10000.00',
    receiveItem: '1',
    productCode: 'P001',
    productName: '扫地机器人',
    receiveDate: '2026-05-30'
  }]
}
await pushReceivable(payload)
```

## 响应

```json
{
  "returnCode": "SUC0000",
  "errorMsg": null,
  "body": null
}
```

## 当前状态

> [!warning] FINANCE_FORM_CODE 未配置
> `src/api/index.js` 中 `FINANCE_FORM_CODE` 为空字符串，需填入实际表单编码后才能推送成功。

## 相关笔记

- [[应收单删除API]]
- [[ERP对接流程]]
- [[产品介绍]]
