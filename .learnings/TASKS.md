# 任务跟踪

> 科沃斯ERP V2 项目待完成功能与模块清单
> 最后更新：2026-05-30 22:00 — 综合全部对话整理

---

## 进度总览

| 类别 | 总数 | done | pending |
|------|------|------|---------|
| P0 阻塞 | 2 | 2 | 0 |
| P1 重要 | 6 | 6 | 0 |
| P2 优化 | 8 | 3 | 5 |
| P3 质量 | 3 | 3 | 0 |

---

## ✅ 全部已完成

### 模型方法审计 (2026-05-30)
- [x] returnInDetailApi/returnOutDetailApi 定义（P0）
- [x] StockIn.vue 移除 totalQuantity/model/specification（P1）
- [x] SnList.vue doSnReturn 入参修正（P1）
- [x] 18个金额字段 int→decimal 平台调整
- [x] financeSync.js purchase_price 映射

### 字段名地毯式审计 (2026-05-30)
- [x] PC端 7文件: createTime→createdAt, actionType/Name→operationType/Desc
- [x] 移动端 4文件: totalActualQty→totalActualQuantity, profitQty→totalProfitQuantity
- [x] LEARNINGS.md #16 固化铁律 api-follows-model-docs

### 编码修复
- [x] LEARNINGS.md / ERRORS.md 乱码修复
- [x] docs/DEVELOPMENT.md 重写
- [x] PROJECT_MEMORY.md 更新
- [x] knowledge-base 更新

### 前期完成
- [x] 移动端 P0-P3 全批次功能
- [x] 业务逻辑审查 6+9+6 项
- [x] 库存业务回检
- [x] P0-P2 全面修复（19文件93行）
- [x] 基础资料5页面+同步+菜单入口
- [x] 全局 res.body?.list 兼容
- [x] 仓库管理 CRUD
- [x] Cloudflare 编码批量修复
- [x] router/index.js 死代码移除
- [x] 孤立文件清理
- [x] DESIGN.md 主题集成

---

## ⬜ 待处理 (P2)

| # | 任务 | 说明 |
|---|------|------|
| 1 | 首页菜单排序 | 当前在底部 |
| 2 | 移动端 srcdoc 部署到 XFTPRO | 移动端目录待创建 |
| 3 | 报表中心完善 | SaleReport/InventoryReport/SnFlowReport |
| 4 | 待收款统计 | 需账款管理接口 |
| 5 | 移动端采购退货页面 | 只有 SaleReturn.vue |
| 6 | 移动端仓库增删改 | — |
| 7 | 移动端入库拍照留档 | — |
| 8 | 账款集成 E2E 验证 | XFTACR003 回款同步 |

---

## 铁律

- **字段名**: 以 MODEL_API_DOCS.md 为准，request.js 自动 camelCase↔snake_case
- **金额类型**: 低开平台必须 decimal，不能 int
- **编码**: UTF-8 无 BOM，用 [IO.File] API 写入
