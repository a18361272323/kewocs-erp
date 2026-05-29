---
title: "项目记忆"
tags: [架构, 记忆, 规范]
created: 2026-05-30
aliases: [PROJECT_MEMORY]
---

# 项目记忆

> 完整版: [[../../PROJECT_MEMORY|PROJECT_MEMORY.md]]

## 核心信息

- **项目**: 科沃斯山西总代 SN码全流程管理系统
- **仓库**: [a18361272323/kewocs-erp](https://github.com/a18361272323/kewocs-erp)
- **部署**: Cloudflare Pages (kewocs-erp.pages.dev)
- **嵌入**: 薪福通低开平台 iframe srcdoc
- **App ID**: `reg4bc6558503724`

## 常驻 Skills

> [[../../PROJECT_MEMORY#常驻 Skills|完整列表]]

- `using-superpowers` — Skill 调用规范入口
- `agent-autopilot` — 自动驾驶工作流
- `self-improvement` — 错误记录和学习
- `self-learning` — 配置和记忆更新
- `proactive-agent` — 主动预判、反向提示
- `vue-best-practices` — Vue 3 最佳实践
- `todo-task-manager` — 任务跟踪

## 关键约束

- 代码部署在 Cloudflare，运行时嵌入薪福通域名
- API 同源调用，凭证自动携带
- 使用 Hash 路由（非 Vue Router）
- 所有文件 UTF-8 编码
- SN 状态全大写

## 修改日志

详见 [[../../PROJECT_MEMORY|PROJECT_MEMORY.md]] 底部修改日志

## 相关笔记

- [[部署架构]]
- [[API调用方式]]
- [[../参考文档/索引]]
