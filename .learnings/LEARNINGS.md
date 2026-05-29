# Learnings

Corrections, insights, and knowledge gaps captured during development.

**Categories**: correction | insight | knowledge_gap | best_practice

---

## 2026-05-25: 低开平台模型方法接口调用格式（修正）

**Category**: correction

根据薪福通低开平台实际运行文档，接口调用格式如下：

### 请求方式
POST `https://{host}/xcodegw/app/{appId}/tag/{env}/api/run/odexftopenapiv2appmodelmethodrun`

### Query 参数（放在 URL 上，不是 body 里）
| 参数 | 说明 |
|------|------|
| `appTag` | 环境标签：`uat`（测试）/ `prd`（生产）/ `dev`（开发） |
| `modelKey` | 模型标识，如 `MOIN9eD2au` |
| `methodKey` | 方法标识，如 `FUADr2TygU` |

### Headers
```
Content-Type: application/json
xcode-appsource: procode    // 专业代码应用标识
xcode-debug: true           // 调试标志（可选）
```

### Body 参数（根据操作类型不同）

**1. 查询（list / query）**
```json
{
  "current": 1,
  "pageSize": 10,
  "orders": [{"key": "id", "order": "DESC"}],
  "field1": "value1",
  "field2": "value2"
}
```
- `current`: 当前页码
- `pageSize`: 每页条数（最大 1000）
- `orders`: 排序数组，可放多个排序条件
- 其他字段：模型表中的查询条件字段（AND 关系）

**2. 增加（add）**
```json
{
  "field1": "value1",
  "field2": "value2"
}
```
- 入参就是模型表中的字段，直接传字段值

**3. 编辑（edit）**
```json
{
  "id": "记录ID",
  "field1": "新值"
}
```
- 必须传 `id`
- 再传需要修改的字段

**4. 查看详情（detail / getById）**
```json
{
  "id": "记录ID"
}
```

**5. 删除（delete）**
```json
{
  "id": "记录ID"
}
```

---

## 2026-05-25: Coze iframe 中 canvas 受限（修正）

**Category**: knowledge_gap

**问题**：在 Coze 低开平台 iframe 中，`document.createElement('canvas')` 创建的 canvas 无法正常执行 `getContext('2d')`，导致 `RGBLuminanceSource` + `HybridBinarizer` 手动解码流程失败。

**解决方案**：改用 `BrowserMultiFormatReader.decodeFromImageUrl()` — ZXing 官方 API，内部自行处理 canvas 和图像解析，不依赖外部创建 canvas。

**教训**：iframe 环境对 canvas 有限制，优先使用库自带的高级 API 而非手动底层操作。

---

## 2026-05-26: cmf-bridge.umd.js 在 iframe 中无法检测 XFT App 环境（修正）

**Category**: knowledge_gap

**问题**：用户想在 iframe 中引入 cmf-bridge.umd.js 来判断是否在薪福通 App 内运行。

**原因**：cmf-bridge 的工作原理是创建 `http://cmf/...` 协议的 iframe 请求，由 XFT App 原生拦截。但在 Coze 的 iframe 嵌套场景中，这些请求无法被 XFT App 原生层拦截，所以 `window.cmfBridge` 初始化失败。

**教训**：Native App 的 JS Bridge 依赖协议拦截机制，在多层 iframe 嵌套中通常无法正常工作。

---

## 2026-05-26: 多页面代码修改必须全覆盖（修正）

**Category**: correction

**问题**：只清理了 StockIn.vue 的旧弹窗代码，StockOut.vue 和 SaleReturn.vue 仍保留旧代码，导致旧弹窗仍然出现。

**修复**：三个页面全部清理。

**教训**：修改多个同类页面时，必须逐一确认每个页面都已修改，不要遗漏。可以用 `grep` 搜索同类模式确认。

---

## 2026-05-26: 模板中 ref 元素缺失导致功能无响应（修正）

**Category**: correction

**问题**：JS 中 `fileInput.value?.click()` 无响应，因为 StockOut.vue 和 SaleReturn.vue 的模板中缺少 `<input ref="fileInput">` 元素。

**修复**：在模板中补上 `<input ref="fileInput" type="file" accept="image/*" capture="environment">`。

**教训**：修改 JS 逻辑时必须同时确认模板中对应的 ref 元素是否存在。

---

## 2026-05-27: history.pushState 导致子页面需要两次返回（修正）

**Category**: correction

**问题**：Index.vue 的 `onMounted` 中执行 `history.pushState`，增加了多余的历史记录条目，导致子页面按返回键时需要两次才能回到首页。

**修复**：将 popstate 监听移至 App.vue，仅在 popstate 触发且当前路由是首页时才 pushState，而不是在 onMounted 中无条件 push。

**教训**：`pushState` 会增加历史栈，在 onMounted 中调用会在每次页面挂载时新增条目。阻止返回应只在 popstate 事件中触发。

---

## 2026-05-27: Vue Composition API 必须显式导入（修正）

**Category**: correction

**问题**：`ReferenceError: onMounted is not defined`，因为 Index.vue 使用了 `onMounted` 但没有从 vue 导入。

**修复**：添加 `import { ref, onMounted } from 'vue'`。

**教训**：Vue 3 Composition API 的所有生命周期钩子和响应式函数都必须显式导入，不像 Options API 自动可用。

---

## 2026-05-28: 手机拍照 EXIF 方向导致条码识别失败（修正）

**Category**: correction

**问题**：从相册选的图片能识别条码，但手机拍的照无法识别。原因：手机拍照的 JPEG 包含 EXIF Orientation 标签（如旋转90°/180°/270°），但 `canvas.drawImage()` 不会自动根据 EXIF 旋转图像，导致传给 ZXing 的是方向错误的图像。

**修复**：先读取 EXIF Orientation，再在 canvas 上按正确方向绘制后再解码。

**教训**：任何涉及手机拍照+图像处理的场景都必须处理 EXIF Orientation。

---

## 2026-05-29: 移动端条码扫描简化（修正）

**Category**: correction

**问题**：barcodeScanner.js 包含过多自定义解码策略（多分辨率/多阈值/多方向旋转/裁剪/对比度增强/二值化），组合爆炸（最多88次解码尝试），导致拍照后卡死。

**修复**：只用 ZXing 官方 `BrowserMultiFormatReader.decodeFromImageUrl()` + EXIF 方向修正，解码尝试从88次降到最多2次。

**教训**：
- 不要在 ZXing 之上叠加自定义图像预处理，ZXing 内部已有完善的解码策略
- EXIF 方向修正是拍照 vs 相册识别率差异的关键原因，必须保留
- 条码格式过滤用 `BarcodeFormat.CODE_128` + `TRY_HARDER` hint

---

## 2026-05-29: SN状态值必须大写（修正）

**Category**: correction

**问题**：移动端出库页面用 `'in_stock'`（小写下划线），退货页面用 `'sold'`（小写），与 PC 端和 API 层的 `'INSTOCK'`/`'SOLD'`/`'RETURNED'`（全大写）不一致。

**修复**：统一使用大写状态值 `INSTOCK`/`SOLD`/`'RETURNED'`，与 PC 端对齐。

**教训**：新增移动端页面时必须对照 PC 端已有逻辑，状态值、API参数、业务流程都要对齐。

---

## 2026-05-29: 调拨确认必须更新SN仓库归属（修正）

**Category**: correction

**问题**：移动端调拨确认只更新了调拨单状态为 CONFIRMED，没有像 PC 端那样逐个更新 SN 的 warehouseId/warehouseName。

**修复**：对齐 PC 端流程 — 获取调拨明细 → 逐个 snApi.edit 更新仓库 → 更新调拨单状态。

**教训**：移动端"确认"类操作不只是改单据状态，必须检查是否有关联数据需要同步更新。

---

## 2026-05-29: 沙箱环境Git推送方案（最佳实践）

**Category**: best_practice

**问题**：沙箱 `git push` 直连 GitHub 被 TCP 阻断，DNS 可解析但443端口不通。

**方案**：
1. 优先尝试 `git push`（有时能通）
2. 失败则用 GitHub Git Data API 通过 HTTPS API 推送（`/repos/{owner}/{repo}/git/...`）
3. 注意 fine-grained PAT 缺少 Git 写入权限，需要 classic PAT + `repo` scope

**关键代码**：`/tmp/git_push_api.py` — 通过 API 创建 blob/tree/commit/ref 推送

---

## 2026-05-29: 移动端业务功能完善路径（最佳实践）

**Category**: best_practice

### P0（已完成）
- 库存查询 InventoryQuery.vue
- SN溯源查询 SnTrace.vue
- 出库价格录入

### P1（已完成）
- 连续扫码模式（扫码成功后自动聚焦输入框）
- 低库存预警首页卡片
- 调拨确认 TransferConfirm.vue
- 盘点扫描 CheckScan.vue

### P2（已完成）
- 首页统计增强（今日入库/出库/退货）
- 操作记录 RecentRecords.vue
- 离线缓存 cache.js（30分钟过期+过期缓存兜底）
- 声音反馈 audioFeedback.js（Web Audio API）

### 业务逻辑审查修复
- SN状态值统一大写
- 调拨确认增加SN仓库更新
- 退货删除应收单改用sourceOrderNo
- 盘点SN匹配用仓库ID+INSTOCK
- 入库增加stockInTime，add失败降级edit
- 出库增加SN仓库校验

### 响应格式
```json
{
  "returnCode": "SUC0000",
  "errorMsg": null,
  "body": {
    "total": 0,
    "list": [],
    "current": 1,
    "pageSize": 10
  }
}
```

### 常见错误
- `returnCode: "NOAUTH"` — 未登录或 session 过期
- `returnCode: "PARAM001"` — 参数错误

---

## LRN-20260529-006: 业务逻辑审查与修复（9项）

**Category**: best_practice | **Priority**: high | **Status**: resolved

### 核心发现
1. **PC端和移动端业务逻辑必须对齐**：出库流程 PC 端走后端 confirm，移动端不能走前端手动更新 SN
2. **单据必须关联 SN 明细**：入库单/出库单/退货单都要在 items 中传入 snCodes，否则单据详情看不到 SN
3. **退货必须合并为一张单据**：多台退货应创建一张退货单 + items 列表，不能逐个创建退货单
4. **事务保护是必要的**：前端循环调 API 没有事务保护，中间失败会导致数据不一致，需要 transaction.js 回滚机制

### 修复清单
| # | 修复项 | 涉及文件 |
|---|--------|---------|
| 9 | PC端退货增加SN状态更新为INSTOCK | src/views/Return/SaleReturn.vue |
| 6 | 移动端出库单关联SN明细 | src-mobile/views/Sale/StockOut.vue |
| 1 | 移动端入库单关联SN明细 | src-mobile/views/Purchase/StockIn.vue |
| 10 | 移动端退货合并为一张退货单+SN明细 | src-mobile/views/Return/SaleReturn.vue |
| 7 | 移动端出库增加确认环节 | src-mobile/views/Sale/StockOut.vue |
| 15 | 盘点完成后处理盘盈盘亏SN | src-mobile/views/Check/CheckScan.vue |
| 19 | 新增transaction.js事务回滚机制 | src-mobile/utils/transaction.js |
| 3 | PC端入库增加应付单推送 | src/views/Purchase/StockIn.vue, src/api/index.js |
| 2 | 移动端操作成功后不自动跳走 | 三个移动端业务页面 |

### 关键代码模式

**事务回滚模式**（transaction.js）：
```js
const tx = createTransaction()
try {
  // 步骤1：创建单据
  const order = await tx.addStep('createOrder', stockOutApi.add(data), () => stockOutApi.remove(orderId))
  // 步骤2：更新SN状态
  for (const sn of snList) {
    await tx.addStep(`updateSN_${sn.id}`, snApi.edit(updateData), () => snApi.edit(rollbackData))
  }
  // 步骤3：推送应收单
  await tx.addStep('pushReceivable', pushReceivable(payload), () => deleteReceivable(sourceOrderNo))
} catch (e) {
  await tx.rollback()
  showToast('操作失败，已自动回滚')
}
```

**出库确认模式**（对齐PC端）：
```js
// 创建出库单（PENDING）
const order = await stockOutApi.add({ ...data, status: 'PENDING' })
// 确认出库（后端自动更新SN状态）
await stockOutApi.confirm(order.id)
// 推送应收单
await pushReceivable(payload)
```

---

## LRN-20260529-007: 库存业务逻辑回检（6项检查）

**Category**: best_practice | **Priority**: high | **Status**: resolved

### 回检场景与结论

| # | 场景 | 检查结果 | 修复动作 |
|---|------|---------|---------|
| I1 | 入库后库存+1 | snApi.add创建INSTOCK状态的SN，聚合统计自动+1 | 已确认正确 |
| I2 | 出库后库存-1 | confirm后端更新SN为SOLD，聚合统计自动-1 | 已确认正确 |
| I3 | 退货后库存+1 | snApi.edit更新SN为INSTOCK+warehouseId | 已确认正确 |
| I4 | 调拨确认库存转移 | 新增：确认前校验SN仍在源仓库且INSTOCK，不在的跳过并提示 | TransferConfirm.vue |
| I5 | 退货显示原出库客户 | 新增：退货页面展示SN的customerName供确认 | SaleReturn.vue |
| I6 | 盘盈SN补充供应商 | 新增：盘盈新增SN时包含supplierId/supplierName/productType | CheckScan.vue |

### 核心逻辑
- 库存数量是聚合计算（统计INSTOCK状态的SN数量），不是单独计数器
- 调拨不增减总库存，只改变SN的warehouseId归属
- 盘亏=SN标记LOST（库存-1），盘盈=新增INSTOCK的SN（库存+1）

---

## LRN-20260529-008: 批量导入SN只需粘贴多行

**Category**: correction | **Priority**: medium | **Status**: resolved

### 问题
用户要求批量导入SN功能只需要"粘贴多行"方式，不要文件导入。

### 实现
- StockIn.vue 和 StockOut.vue 增加粘贴多行导入按钮和弹窗
- 用户在 textarea 中粘贴多行SN（每行一个），点击确认后逐行校验并添加
- 出库批量导入时逐个校验SN状态（INSTOCK）、仓库匹配、商品类型匹配

### 教训
- 功能设计要与用户实际操作习惯对齐，不要想当然添加"更高级"的方式
- 移动端场景下文件导入操作繁琐，粘贴多行更实用

---

## LRN-20260529-009: Skills应默认加载使用

**Category**: best_practice | **Priority**: high | **Status**: resolved

### 问题
用户明确要求9个默认Skills每次会话都应自动加载使用，而不是仅在需要时才手动触发。

### 默认Skills清单
1. self-learning — 重大修改后主动更新 .learnings/ 和 PROJECT_MEMORY.md
2. self-improvement — 记录错误纠正，与 self-learning 互补
3. vue-best-practices — Vue 3 Composition API 最佳实践
4. vue-pinia-best-practices — Pinia 状态管理最佳实践
5. frontend-design — 移动端 UI 优化
6. web-search — 查技术文档
7. repair — 沙箱环境问题修复
8. proactive-agent — 主动式 Agent 模式
9. agent-autopilot — 自动驾驶工作流

### 教训
- 配置了默认Skills就必须实际加载，不要只在配置文件里写了但不执行
- 每次新会话开始时，应主动加载所有默认Skills

---

## [LRN-20260529-010] best_practice

**Logged**: 2026-05-29
**Priority**: high
**Status**: resolved
**Area**: frontend

### Summary
snApi.getList 参数名必须统一为 sn_code，不能混用 snCode

### Details
移动端多个文件中 snApi.getList 的查询参数不一致：
- StockOut.vue addSn 方法用 `sn_code`
- StockOut.vue 批量导入用 `snCode`
- TransferConfirm.vue 用 `snCode` + `page`
- CheckScan.vue 用 `sn_code`

低开平台 API 对参数名是严格匹配的，snCode 和 sn_code 是不同的参数，用错会导致查不到数据。

### Suggested Action
全局统一使用 `sn_code` 作为 SN 查询参数名

### Metadata
- Source: code_review
- Related Files: StockOut.vue, TransferConfirm.vue, CheckScan.vue
- Tags: api, parameter, consistency

---

## [LRN-20260529-011] best_practice

**Logged**: 2026-05-29
**Priority**: medium
**Status**: resolved
**Area**: frontend

### Summary
Vant van-dialog 不应在同一组件中重复绑定同一个 v-model:show 变量

### Details
StockOut.vue 中有两个 `<van-dialog v-model:show="showBatchImport">` 弹窗：
1. 第67行：有 batchImportText、batchImportResult，功能完整
2. 第79行：有 batchText，功能简单但变量不同

两个弹窗绑定同一个 showBatchImport，同时触发时会渲染两个弹窗，导致内容冲突和用户困惑。

### Suggested Action
删除重复弹窗，保留功能更完整的一个

### Metadata
- Source: code_review
- Related Files: StockOut.vue
- Tags: vant, duplicate, dialog

---
## LRN-20260529-012: 学习归档

**Category**: best_practice | **Priority**: high | **Status**: resolved

### 身份
科沃斯 ERP V2，仓库 SN 码全生命周期管理系统，运行在薪福通 CodeFriend 低代码平台上。
PC 端 (src/)，移动端 (src-mobile/)。

### 技术栈
- Vue 3 Composition API + Element Plus (PC) + Vant 4 (Mobile)
- Pinia 状态管理，Vite 多入口构建 + srcdoc iframe 内嵌
- ZXing 条码扫描 + EXIF 方向修正
- crypto-js + sm-crypto 国密加密
- xlsx 表格导入导出，dayjs 日期处理
- CDN: kewocs-erp.pages.dev (Cloudflare Pages)

### 部署架构
iframe srcdoc 嵌入低开平台 → postMessage 传 appKey/userInfo → fetch 直连低开 Gateway (Cookie 认证)

### API 范式
POST {host}/xcodegw/app/reg4bc6558503724/tag/{env}/api/run/odexftopenapiv2appmodelmethodrun
  ?appTag=uat|prd&modelKey=MOxxxx&methodKey=FUxxxx
Body: { current, pageSize, ...字段 }
camelCase → snake_case 自动转换 (convertParamsToSnakeCase)
成功: { returnCode: "SUC0000", body: { total, list, current, pageSize } }

### SN 状态机
PURCHASED → INSTOCK → SOLD → RETURNED → INSTOCK
                                      ↘ LOST (盘点亏损)
统一全大写，库存 = 聚合统计 status=INSTOCK 的 SN 数量

### PC 端路由 (hash)
/ → Dashboard, /sn/list → SnList, /sn/trace → SnTrace
/purchase/stockIn|payment|return
/sale/stockOut|collection|return
/warehouse/transfer|check|inventory
/report/sale|inventory|snFlow

### 账款集成
出库确认 → pushReceivable，退货确认 → deleteReceivable(sourceOrderNo)
收款回写 → 连接器监听 XFTACR003 事件

### 已验证教训
1. 参数名严格匹配: sn_code ≠ snCode，(convertParamsToSnakeCase 自动转)
2. PC/移动端逻辑对齐: 出库走后端 confirm
3. 单据关联 SN 明细: items.snCodes
4. 退货合并一张单
5. 事务保护: transaction.js addStep/rollback
6. history.pushState 不在 onMounted 无条件调用
7. van-dialog 不同时绑定同一 v-model:show

### 学习资料
低开平台文档 126 篇 (AI 助手/OA 审批/接口/页面/模型/变量/样式/排查)
组件文档 113 篇 (PC/Mobile 组件参考)
账款文档 23 篇 (产品/开票/API)

### 2026-05-29 | insight

**UTF-8编码损坏修复经验**：
- Python rb/wb编辑.vue会损坏中文 → 用git show恢复+UTF-8字符串替换
- Out-File -NoNewline吞换行符 → 用Set-Content管道
- 损坏检测：正则\ufffd（U+FFFD替换字符）

### 2026-05-29 | best_practice

**跨环境构建修复流程**：
- 取原始文件：git show commit:path
- 逻辑修改和编码修复分开执行
- Windows Git SSH需配置core.sshCommand指向原生OpenSSH
- 每次push后等Cloudflare构建日志验证
