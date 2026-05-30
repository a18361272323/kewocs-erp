---
title: "API调用方式"
tags: [API, 薪福通, request, 模型方法]
---

# API 调用方式

## 基础 URL

```
POST {host}/xcodegw/app/reg4bc6558503724/tag/{env}/api/run/odexftopenapiv2appmodelmethodrun
```

- `host`: `parent.location.host`（薪福通域名）
- `env`: `uat` 或 `prd`

## 请求格式

```javascript
{
  // 通过 convertParamsToSnakeCase 自动转换
  model_key: "xft_xxx",      // 模型 Key
  method_key: "getList",     // 方法 Key
  current: 1,
  pageSize: 20,
  // ... 其他 snake_case 参数
}
```

## 响应格式

```javascript
{
  returnCode: "SUC0000",
  returnMsg: "success",
  body: {
    list: [...],
    total: 100
  }
}
```

> [!important] code 字段归一化
> `src/api/request.js` 中已将 `returnCode` 映射为 `code`，所有 Vue 文件统一检查 `res.code === "SUC0000"`

## 字段名规范（铁律）

> [!danger]
> 所有入参字段必须与 `docs/MODEL_API_DOCS.md` 中模型 snake_case 严格对应。
> request.js 自动完成 camelCase <-> snake_case 转换，前端只需用正确的 camelCase。
> 高频陷阱: `createTime` -> `createdAt`，`actionType` -> `operationType`。
> 详见 [[../经验记录/字段名规范铁律]]

## 参数转换规则

`convertParamsToSnakeCase` 自动将 camelCase → snake_case：
- `orderNo` → `order_no`
- `warehouseId` → `warehouse_id`
- **保留**: `pageSize`、`current`

## 环境判断

```javascript
const host = parent.location.host
const isUat = host.includes("demo") || host.includes("uat")
const envTag = isUat ? "uat" : "prd"
```

## 相关笔记

- [[../低开平台/接口开发]] — 低开平台接口开发文档
- [[../账款管理/应收单API]] — 账款推送接口
- [[模型参考]] — 所有模型 Key 和字段定义
