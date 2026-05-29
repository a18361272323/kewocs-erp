# 任务跟踪

> 科沃斯ERP V2 项目待完成功能与模块清单
> 最后更新：2026-05-30

---

## 🔴 P0 — 阻塞/紧急

| # | 任务 | 状态 | 说明 |
|---|------|------|------|
| 0 | Cloudflare编码损坏批量修复 | ✅ done | 修复6个Vue文件UTF-8中文损坏+orderStatus字段名修正 |
| 1 | P0-P2全面修复（19文件93行） | ✅ done | 事务回滚/Promise.allSettled/响应码统一/字段名/FORM_CODE/编码安全 |

---

## 🟠 P1 — 重要待办

| # | 任务 | 状态 | 说明 |
|---|------|------|------|
| 2 | **路由系统统一** | pending | main.js 未注册 vue-router，router/index.js 是死代码，App.vue 用 hash componentMap 替代路由。二选一需统一 |
| 3 | **PC端基础资料接入菜单** | pending | BasicData/ 下5个页面(Supplier/Customer/Warehouse/Product/Account)代码完整，但侧栏菜单无入口 |

---

## 🟡 P2 — 优化/补充

| # | 任务 | 状态 | 说明 |
|---|------|------|------|
| 4 | 创建缺失页面 Purchase/PurchaseOrder.vue | pending | router 已定义 /purchase/order 路由但文件不存在 |
| 5 | 创建缺失页面 Report/PurchaseReport.vue | pending | router 已定义 /report/purchase 路由但文件不存在 |
| 6 | 移动端仓库管理（增删改） | pending | FEAT-20260529-001 中标注待做 |
| 7 | 移动端图片附件（入库拍照留档） | pending | FEAT-20260529-001 中标注待做 |
| 8 | 移动端切换商品类型确认提示 | pending | FEAT-20260529-002，切换品类时提醒已扫描SN将清空 |
| 9 | 移动端缺少采购退货页面 | pending | 只有 SaleReturn.vue，无 PurchaseReturn.vue |

---

## 🔵 孤立文件清理

| # | 文件 | 大小 | 说明 |
|---|------|------|------|
| 10 | Check/Check.vue | 12KB | 未被 App.vue componentMap 引用 |
| 11 | StockOut/StockOut.vue | 23KB | 孤立文件，实际出库用 Sale/SaleOrder.vue |
| 12 | SnManage/ScanStockIn.vue | 9KB | 未在 componentMap 中 |
| 13 | Return/index.vue | 670B | 极小占位文件，未直接引用 |
| 14 | Warehouse/WarehouseCheck.vue | 12KB | 孤立文件，盘点实际用 Warehouse/Check.vue |

---

## 🟢 账款集成

| # | 任务 | 状态 | 说明 |
|---|------|------|------|
| 15 | 应收单推送/删除/回款通知完整流程验证 | pending | 端到端测试账款管理事件 XFTACR003 + ERP 回款同步 |

---

## ✅ 已完成

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
| - | Skills配置整理（17个用户级） | ✅ done |
| - | 编码安全经验归档 | ✅ done |
| - | 项目文档三件套同步 | ✅ done |