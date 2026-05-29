---
title: "应收单删除API"
tags: [账款管理, API, 应收单]
created: 2026-05-30
---

# 应收单删除 API

## 接口地址

```
POST {baseUrl}/api/run/tacrreceiptbillreceiptbilldelete
```

## 请求参数

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `billCode` | STRING | 是* | 单据编号（账款管理 -> 应收 -> 收入确认页面的单据编号） |
| `upSysId` | STRING | 是* | 上游系统ID |

> `billCode` 和 `upSysId` 二选一必填

## 错误码对照

| 错误码 | 说明 |
|--------|------|
| `XFKRPI0001` | 单据号和上游系统id不能同时为空 |
| `XFKRPI0002` | 审批中的应收单不允许删除 |
| `XFKRPI0003` | 已确认的应收单不允许作废/删除 |
| `XFKRPI0004` | 应收单已经开票，不允许作废/删除 |
| `XFKRPI0005` | 应收单有下游收入确认单，不允许删除 |
| `XFKRPI0007` | 关联上游单据已开票/回款，不允许删除 |
| `XFKAPI0007` | 应收单不存在 |
| `XFKRPI0012` | 有已生成/生成中下游账单生成计划，不允许作废 |
| `XFKSYC0004` | 多笔已经入账的单据不能编辑、作废、删除 |

## 调用场景

| 业务场景 | 触发时机 |
|---------|---------|
| 销售退货 | 退货单保存成功后 |
| 入库取消 | 已确认入库取消时 |

## 调用示例

```javascript
// 按单据编号删除
await deleteReceivable('AR20260530001')

// 按上游系统ID删除
await deleteReceivable({ upSysId: 'ERP001' })

// 同时传
await deleteReceivable({
  billCode: 'AR20260530001',
  upSysId: 'ERP001'
})
```

## 相关笔记

- [[应收单推送API]]
- [[ERP对接流程]]
