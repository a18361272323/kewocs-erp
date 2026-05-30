# 科沃斯 ERP — 任务清单

> 最后更新: 2026-05-30
> 基于 PROJECT_MEMORY.md 和历史会话整理

## P1 — 待验证（已修复推送，需在低开平台确认）

- [ ] **Dashboard stats** — `t.forEach is not a function` 报错，需确认 API 返回格式
- [ ] **付款单下拉框** — 供应商/付款账户选择框数据展示
- [ ] **SN码列表下拉框** — 商品/仓库选择框数据展示
- [ ] **菜单单开行为** — 点一个子菜单箭头不再全部展开
- [ ] **srcdoc 样式** — CSS crossorigin 移除后 XFTPRO 嵌入样式是否正常
- [ ] **低开平台 srcdoc 更新** — 手动替换 `dist/index.srcdoc.html`

## P2 — 业务功能

- [ ] **报表中心** — SaleReport / InventoryReport / SnFlowReport 三张报表待实现
- [ ] **待收款统计** — 需接入账款管理系统接口
- [ ] **Dashboard 实时数据** — 今日入库/出库明细数据准确性验证

## P3 — 代码质量

- [ ] **中文乱码残留** — `api/index.js`、`api/request.js`、`StockIn.vue` 中注释乱码
- [ ] **孤立文件清理** — `Check/Check.vue`、`StockOut/StockOut.vue`、`ScanStockIn.vue`、`Return/index.vue`、`WarehouseCheck.vue`
- [ ] **router/index.js 残留** — 死代码，已被 hash componentMap 替代

## 已完成

- [x] Transfer.vue / StockIn.vue 编码损坏修复
- [x] SaleOrder.vue / ScanStockIn.vue / SaleSnSelector.vue 编码修复
- [x] 基础资料 5 页面 + 同步功能 + 菜单入口
- [x] 全局 `res.body` → `res.body?.list` 修复（9 处）
- [x] srcdoc CSS crossorigin 导致 XFTPRO 样式丢失
- [x] index.html / mobile.html 标题乱码
- [x] Warehouse.vue CRUD 功能 + 字段映射
- [x] Dashboard.vue 中文乱码重写
- [x] vite.config.js 全文件乱码重写
- [x] .gitignore 排除不传git/、lock.json
- [x] 移动端 P0-P3 全批次功能实现
- [x] 业务逻辑审查 6+9+6 项修复
- [x] 库存业务逻辑回检
- [x] DESIGN.md Linear Dark 主题集成
