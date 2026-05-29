# 任务跟踪

> 科沃斯ERP V2 项目待完成功能与模块清单

---

##  🔴 P0 — 阻塞/紧急

| # | 任务 | 状态 | 说明 |
|---|------|------|------|
| 0 | Cloudflare编码损坏批量修复 | ✅ done | 修复6个Vue文件UTF-8中文损坏+orderStatus字段名修正 |
| 1 | 路由系统统一 | pending | main.js 未注册 vue-router，router/index.js 是死代码。App.vue 用 hash componentMap 代替路由。二选一需统一 |
| 2 | PC 端基础资料管理页接入菜单 | pending | BasicData/ 下 5 个页面(Supplier/Customer/Warehouse/Product/Account)代码完整但菜单无入口 |

##  🟡 P1 — 重要待办

| # | 任务 | 状态 | 说明 |
|---|------|------|------|
| 3 | 创建缺失页面 Purchase/PurchaseOrder.vue | pending | router 已定义 /purchase/order 路由但文件不存在 |
| 4 | 创建缺失页面 Report/PurchaseReport.vue | pending | router 已定义 /report/purchase 路由但文件不存在 |
| 5 | 移动端仓库管理(增删改) | pending | FEAT-20260529-001 中标注待做 |
| 6 | 移动端图片附件(入库拍照留档) | pending | FEAT-20260529-001 中标注待做 |
| 7 | 移动端切换商品类型确认提示 | pending | FEAT-20260529-002 |
| 8 | 移动端缺少采购退货页面 | pending | 只有 SaleReturn.vue，无 PurchaseReturn.vue |

##  🟢 P2 — 优化/清理

| # | 任务 | 状态 | 说明 |
|---|------|------|------|
| 9 | 清理孤立文件 | ✅ 部分完成 | Check.vue 已删除，其余待评估 | Check/Check.vue (12KB)、StockOut/StockOut.vue (23KB)、ScanStockIn.vue (9KB)、Return/index.vue(670B)、Warehouse/WarehouseCheck.vue(12KB) 未在任何活跃路由中引用 |
| 10 | router/index.js 路由路径修正 | ✅ done | 已清理，router/index.js 已删除 | /sale/stockOut 指向 Sale/StockOut.vue 但实际文件在 StockOut/StockOut.vue |
| 11 | 账款管理端到端测试 | pending | 应收单推送/删除/回款通知的完整流程验证 |

##  ✅ 已完成

| # | 任务 | 状态 | 
|---|------|------|
| - | 移动端批量导入SN(粘贴多行) | ✅ done |
| - | 库存查询 InventoryQuery.vue | ✅ done |
| - | SN溯源 SnTrace.vue | ✅ done |
| - | 出库价格录入 | ✅ done |
| - | 连续扫码模式 | ✅ done |
| - | 调拨确认 TransferConfirm.vue | ✅ done |
| - | 盘点扫描 CheckScan.vue | ✅ done |
| - | 低库存预警首页卡片 | ✅ done |
| - | 今日入库/出库/退货统计 | ✅ done |
| - | 操作记录 RecentRecords.vue | ✅ done |
| - | 离线缓存 cache.js | ✅ done |
| - | 声音反馈 audioFeedback.js | ✅ done |
| - | 事务回滚 transaction.js | ✅ done |
| - | SN状态值统一大写 | ✅ done |
| - | 调拨确认增加SN仓库更新 | ✅ done |
| - | 退货删除应收单(sourceOrderNo) | ✅ done |
| - | EXIF方向修正 | ✅ done |
| - | barcodeScanner简化 | ✅ done |
