---
title: "HTTP接口与业务编排"
tags: [低开平台, API, 接口]
created: 2026-05-30
---

# HTTP接口与业务编排

## 三种接口来源

### 1. HTTP 接口
- 对接已有外部业务接口
- 平台作为代理，可做请求/响应适配
- **需申请开通薪福通域白名单**
- 执行流程: 获取上下文 -> 适配请求 -> 构建 HTTP -> 执行 -> 适配响应

### 2. 业务编排
- 可视化后端逻辑编排
- 适用于接口聚合和简单 CRUD
- 通过连接线串联节点

### 3. SQL 脚本节点
- 直接执行 SQL 语句
- 支持 SELECT/INSERT/UPDATE/DELETE

## 运行指定 API

```
POST {baseUrl}/api/run/{apiKey}
```

与模型方法的区别：
- 模型方法: `api/run/odexftopenapiv2appmodelmethodrun?modelKey=xxx&methodKey=xxx`
- 指定 API: `api/run/{apiKey}`

## 接口开发流程

1. 新增接口 -> 选择来源（HTTP/编排）
2. 配置参数（Query/Body/Header）
3. 配置请求适配器
4. 配置响应适配器
5. 调试 -> 发布

## 适配传参

开发者通过适配器实现：
- 请求适配: 将前端参数转换为后端接口格式
- 响应适配: 将后端响应转换为前端需要的格式
- 变量: xcInput(入参), xcOutput(出参), xcHeader(请求头), xcQuery(查询参数)

## 相关笔记

- [[模型方法运行]]
- [[变量系统详解]]
- [[平台核心概念]]
