---
title: "XFT平台JS库分析"
tags: [架构, JS库, echarts, 复用]
created: 2026-05-30
---

# 薪福通平台可复用 JS 库

> 基于 xft-demo 源码分析，详见 [[../../docs/XFT_JS_LIBS_ANALYSIS|XFT_JS_LIBS_ANALYSIS.md]]

## 关键发现

低开平台通过 `window.top` 暴露了多个全局 JS 库。由于 iframe 设置了 `allow-same-origin`，我们可以通过 `window.top.xxx` 直接访问。

## 可复用的库

| 库 | 获取方式 | 版本 | 大小 | 推荐度 |
|---|---------|------|------|--------|
| **echarts** | `window.top.echarts` | 5.4.3 | 1MB | ⭐⭐⭐⭐⭐ |
| lodash | `window.top._` | 4.17.21 | 72KB | ⭐⭐ |
| moment | `window.top.moment` | 2.29.4 | 360KB | ⭐ |
| axios | `window.top.axios` | 0.27.2 | 20KB | ⭐ |

## echarts 使用示例

```javascript
// 从父窗口获取 echarts（无需 npm install）
const echarts = window.top?.echarts || window.parent?.echarts;
if (echarts) {
  const chart = echarts.init(document.getElementById('chart'));
  chart.setOption({
    xAxis: { data: ['A', 'B', 'C'] },
    yAxis: {},
    series: [{ type: 'bar', data: [1, 2, 3] }]
  });
}
```

> [!tip] 好处
> - 节省约 1MB 构建体积
> - 无需额外安装依赖
> - 适合报表页面（销售汇总、库存明细、SN流转）

## 不可复用的库

| 类型 | 库 | 原因 |
|------|-----|------|
| React 生态 | react/react-dom/react-router | Vue 项目不需要 |
| React 组件 | antd/antd-mobile | React组件，Vue无法渲染 |
| XFT 组件 | xft-m-comps(7.1MB) | React组件，Vue无法渲染 |
| 状态管理 | mobx | Vue 使用 Pinia |

## 相关笔记

- [[部署架构]] — iframe sandbox 配置
- [[../参考文档/索引]] — 所有参考文档
- [[../../docs/XFT_JS_LIBS_ANALYSIS]] — 完整分析报告
