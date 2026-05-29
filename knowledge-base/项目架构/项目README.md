---
title: "项目README"
tags: [架构, 项目概述]
created: 2026-05-30
aliases: [项目简介]
---

# 科沃斯 ERP 系统 V2

> 详见 [[../../README|README.md]]

## 项目定位

科沃斯山西总代 **SN码全流程管理系统前端**，解决：
- 速达3000无法实现每台机器独立SN码追踪
- 销售端无法在互联网环境使用的流程割裂

**核心差异化**：SN码全生命周期管理

## 技术栈

| 技术 | 说明 |
|------|------|
| Vue 3 | Composition API |
| Vite 5 | 多入口构建 |
| Element Plus | PC端 UI |
| Vant 4 | 移动端 UI |
| Pinia | 状态管理 |
| ZXing | 条码扫描 |

## 项目结构

```
├── src/           PC端代码
│   ├── api/       API封装 (index.js + request.js)
│   ├── views/     页面 (Dashboard/SnManage/Purchase/Sale/...)
│   ├── components/ 公共组件
│   ├── stores/    Pinia状态
│   └── utils/     工具函数
├── src-mobile/    移动端代码 (PC端零侵入)
├── docs/          文档
├── knowledge-base/  Obsidian知识库
└── 学习资料/       低开平台材料
```

## 特色功能

- Hash 路由（解决 srcdoc 下 History API 限制）
- 环境自动判断（UAT/PRD）
- API 同源调用，凭证自动携带
- 移动端扫码入库/出库（ZXing + EXIF修正）
- 离线缓存（30分钟TTL + 过期兜底）
- 声音反馈（Web Audio API）
- SN码全生命周期追踪

## 相关笔记

- [[部署架构]] — 部署模式
- [[API调用方式]] — API 封装
- [[模型速查]] — 模型一览
- [[../参考文档/索引]] — 所有参考文档
