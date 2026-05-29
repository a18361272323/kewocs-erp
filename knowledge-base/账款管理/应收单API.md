---
title: "应收单API"
tags: [账款, API, 应收单, 薪福通]
---

# 应收单 API

## 接口地址

与通用模型方法相同的 URL 模式，`model_key` 和 `method_key` 由薪福通账款管理模块提供。

## 已实现的接口

| 操作 | 方法 | 说明 |
|------|------|------|
| 应收单推送 | `financeApi.pushReceivable()` | 销售确认后推送应收单 |
| 应收单删除 | `financeApi.deleteReceivable()` | 退货/取消时删除应收单 |
| 回款通知 | `financeApi.notifyPayment()` | 收款完成后通知账款系统 |

## 应收单推送参数

```javascript
{
  model_key: "xft_finance_receivable",
  method_key: "push",
  // 业务字段（snake_case）
  order_no: "SO20260529001",
  customer_name: "客户名称",
  amount: 10000.00,
  // ...详见账款管理文档
}
```

## 当前状态

> [!warning] FINANCE_FORM_CODE 未配置
> `src/api/index.js` 中 `FINANCE_FORM_CODE` 仍为空字符串。
> 需从薪福通后台获取账款管理表单编码后填入。

## 相关笔记

- [[产品介绍]] — 账款管理产品概述
- [[常见问题]] — 开票、报错排查
- [[../项目架构/API调用方式]] — 通用 API 调用方式
