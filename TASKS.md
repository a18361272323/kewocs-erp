# 科沃斯 ERP — 任务清单

> 最后更新: 2026-05-30 22:00
> 综合全部对话内容整理

---

## 进度总览

| 类别 | 总数 | 已完成 | 进行中 | 待处理 |
|------|------|--------|--------|--------|
| P0 阻塞 | 2 | 2 | 0 | 0 |
| P1 重要 | 6 | 6 | 0 | 0 |
| P2 优化 | 8 | 3 | 0 | 5 |
| P3 代码质量 | 3 | 3 | 0 | 0 |
| 知识库文档 | 6 | 6 | 0 | 0 |

---

## P0 — 阻塞/紧急（全部完成 ✅）

| # | 任务 | 状态 | 说明 | 提交 |
|---|------|------|------|------|
| P0-1 | returnInDetailApi/returnOutDetailApi 未定义 | ✅ done | 采购/销售退货 ReferenceError | 62b6fa1 |
| P0-2 | Cloudflare 编码损坏批量修复 | ✅ done | 6个Vue文件 UTF-8 中文损坏 | 多轮修复 |

## P1 — 重要（全部完成 ✅）

| # | 任务 | 状态 | 说明 | 提交 |
|---|------|------|------|------|
| P1-1 | StockIn.vue 发送模型中不存在的字段 | ✅ done | 移除 totalQuantity/model/specification | 62b6fa1 |
| P1-2 | SnList.vue doSnReturn 入参不匹配 | ✅ done | snIds→id, returnReason→reason | 62b6fa1 |
| P1-3 | 入库金额 int→decimal 平台调整 | ✅ done | 18个金额字段改类型，前端不截断 | 平台侧 |
| P1-4 | 同步商品采购价映射缺失 | ✅ done | financeSync.js 添加 purchase_price | — |
| P1-5 | PC端字段名不匹配（7文件） | ✅ done | createTime→createdAt 等 | 41bd961 |
| P1-6 | 移动端字段名不匹配（4文件） | ✅ done | totalActualQty→totalActualQuantity 等 | 24ceea3 |

## P2 — 优化/补充

| # | 任务 | 状态 | 说明 |
|---|------|------|------|
| P2-1 | 首页菜单排序（当前在底部） | ⬜ pending | 菜单索引调整 |
| P2-2 | 移动端 srcdoc 部署到 XFTPRO | ⬜ pending | 移动端目录尚待创建 |
| P2-3 | 报表中心完善 | ⬜ pending | SaleReport/InventoryReport/SnFlowReport |
| P2-4 | 待收款统计 | ⬜ pending | 需接入账款管理系统接口 |
| P2-5 | 移动端缺少采购退货页面 | ⬜ pending | 只有 SaleReturn.vue |
| P2-6 | 移动端仓库管理（增删改） | ⬜ pending | 当前只有仓库查看 |
| P2-7 | 移动端图片附件（入库拍照留档） | ⬜ pending | — |
| P2-8 | 账款集成端到端验证 | ⬜ pending | XFTACR003 回款同步流程 |

## P3 — 代码质量（全部完成 ✅）

| # | 任务 | 状态 |
|---|------|------|
| P3-1 | 全项目乱码清零 | ✅ done |
| P3-2 | 5个孤立文件清理 | ✅ done |
| P3-3 | router/index.js 残留移除 | ✅ done |

## 知识库文档（全部完成 ✅）

| # | 任务 | 状态 | 提交 |
|---|------|------|------|
| D-1 | MODEL_API_DOCS.md 追加平台字段类型调整记录 | ✅ done | 7a954ad |
| D-2 | 修复 LEARNINGS.md #16 乱码 → 字段名规范铁律 | ✅ done | d96503c |
| D-3 | 修复 ERRORS.md ERR-20260530-F01 乱码 | ✅ done | d96503c |
| D-4 | 重写 docs/DEVELOPMENT.md | ✅ done | d96503c |
| D-5 | 更新 PROJECT_MEMORY.md | ✅ done | d96503c |
| D-6 | 更新 knowledge-base 导航页+编码修复经验 | ✅ done | d96503c |

---

## 固化的核心经验

### 铁律 #1: 字段名以 MODEL_API_DOCS.md 为准
- **Pattern-Key**: api-follows-model-docs | **Recurrence**: 4次
- request.js 自动转换 camelCase↔snake_case
- 高频陷阱: createTime→createdAt, actionType→operationType

### 铁律 #2: 金额字段必须 decimal
- 低开平台默认 int，需手动改为 decimal
- 类型不匹配优先改平台模型，不截断前端代码

### 铁律 #3: 文件编码 UTF-8 无 BOM
- 用 [IO.File] .NET API 写入，禁止 apply_patch 改中文文件

---

## 项目健康度

| 指标 | 状态 |
|------|------|
| 构建 | ✅ npm run build 通过 (2184 modules) |
| 乱码 | ✅ 全项目零 U+FFFD |
| API 字段对齐 | ✅ 108个方法全部匹配 MODEL_API_DOCS.md |
| 金额类型 | ✅ 18个字段已改为 decimal |
| Git 提交 | ✅ 今日7个提交已推送 |
| 常驻 Skills | 7个（重启后 todo-task-manager 生效） |
