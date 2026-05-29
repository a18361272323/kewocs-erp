# 科沃斯 ERP - SN码管理系统项目记忆

## 项目概述

- **项目名称**：科沃斯山西总代 SN码全流程管理系统
- **前端技术**：Vue 3 + Vite + Element Plus + Pinia
- **部署平台**：Cloudflare Pages（kewocs-erp.pages.dev），GitHub 自动构建部署
- **GitHub 仓库**：https://github.com/a18361272323/kewocs-erp
- **默认 Skills**（每次会话必须加载）：
  - self-learning — 重大修改后主动更新 .learnings/ 和 PROJECT_MEMORY.md
  - self-improvement — 记录错误纠正，与 self-learning 互补
  - vue-best-practices — Vue 3 Composition API 最佳实践
  - vue-debug-guides — Vue 3 运行时错误诊断与修复
  - vue-router-best-practices — Vue Router 4 路由守卫/参数/生命周期
  - proactive-agent — 主动式 Agent 模式，预判需求并持续改进
  - agent-autopilot — 自动驾驶工作流，心跳驱动任务执行
- **嵌入平台**：薪福通低开平台（xft-demo.cmburl.cn / xft.cmbchina.com）

### 部署架构

```
用户浏览器
  └─ 薪福通低开平台页面 (xft-demo.cmburl.cn / xft.cmbchina.com)
       └─ <iframe srcdoc="...">   ← 页面 HTML 内联注入
            ├─ 静态资源 (JS/CSS/图片)  ← Cloudflare Pages CDN (kewocs-erp.pages.dev)
            └─ API 调用  ← 薪福通同域 (parent.location.host) + credentials: include
```

> **关键理解**：前端代码部署在 Cloudflare，但运行时嵌入薪福通域名下。
> API 请求发往薪福通同域，Cookie 自动携带，无需跨域代理。
- **核心业务**：SN码全生命周期管理（采购入库 → 销售出库 → 退货）

---

## 技术架构

### 目录结构

```
kewocs-erp-v2/
├── src/
│   ├── api/           # API 请求封装
│   │   ├── index.js   # 业务 API（所有模型方法调用）
│   │   └── request.js # fetch 封装
│   ├── components/    # 公共组件
│   ├── views/         # 页面组件
│   │   ├── Dashboard.vue       # 首页仪表盘
│   │   ├── SnManage/           # SN码管理（列表）
│   │   ├── Purchase/           # 采购管理（入库单、付款单、退货单）
│   │   ├── Sale/               # 销售管理（出库单、收款单）
│   │   ├── Return/             # 退货管理
│   │   ├── Warehouse/          # 仓库管理（调拨、盘点、库存）
│   │   └── BasicData/          # 基础资料
│   ├── stores/        # Pinia 状态管理
│   │   └── app.js     # 全局状态与菜单
│   ├── utils/         # 工具函数
│   ├── styles/        # 样式
│   ├── App.vue        # 根组件（Hash 路由）
│   └── main.js        # 入口文件
├── docs/              # 文档
├── dist/              # 构建输出
└── package.json
```

### 路由实现

**不使用 Vue Router**，使用 Hash 路由实现（解决 about:srcdoc 下 History API 限制）：

```javascript
// App.vue
const routes = [
  { path: '/', component: Dashboard },
  { path: '/sn/list', component: SnList },
  // ...
]

// 监听 hashchange
window.addEventListener('hashchange', () => {
  currentRoute.value = location.hash.slice(1) || '/'
})
```

### 环境判断逻辑

```javascript
// 通过 parent.location.host 判断环境
const host = parent.location.host
const isUat = host.includes('demo') || host.includes('uat')
const envTag = isUat ? 'uat' : 'prd'
```

---

## 低开平台 API 调用

### API 路径

```
UAT: https://xft-demo.cmburl.cn/xcodegw/app/reg4bc6558503724/tag/uat
PRD: https://xft.cmbchina.com/xcodegw/app/reg4bc6558503724/tag/prd
```

### 模型方法接口（核心）

```
POST {baseUrl}/api/run/odexftopenapiv2appmodelmethodrun?appTag=uat&modelKey=xxx&methodKey=xxx
```

| 参数位置 | 参数 | 说明 |
|---------|------|------|
| Query | appTag | 环境标签：uat/prd |
| Query | modelKey | 模型标识 |
| Query | methodKey | 方法标识 |
| Body | - | 具体方法入参（分页、筛选条件等） |

### fetch 请求配置

```javascript
fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(params),
  credentials: 'include'  // 凭证跟随
})
```

### 响应格式

```json
{
  "code": "0",
  "data": {
    "records": [...],
    "total": 100,
    "current": 1,
    "pageSize": 20
  }
}
```

---

## 业务模型与 API 常量

### MODEL_KEYS

| 常量 | modelKey | 模型名称 |
|------|----------|---------|
| SN_CODE | MOk2ZJ4aga | SN码表 |
| SN_LOG | MOqg2psiTa | SN操作日志表 |
| STOCK_IN | MOIN9eD2au | 采购入库单主表 |
| STOCK_IN_DETAIL | MOc2tEbUGK | 采购入库单明细表 |
| STOCK_OUT | MOenA360T5 | 销售出库单主表 |
| STOCK_OUT_DETAIL | MOg8t6pKm4 | 销售出库单明细表 |
| RETURN_IN | MOV8t2Ah9X | 采购退货单主表 |
| RETURN_OUT | MOky0Pcw6W | 销售退货单主表 |
| TRANSFER | MOIrlRmiFH | 调拨单主表 |
| CHECK | MO5WOkA9SX | 盘点单主表 |
| WAREHOUSE | MO3LPiTHMU | 仓库 |
| PRODUCT | MOeUIsmD4j | 商品 |
| CUSTOMER | MOj7UPuJx2 | 客户 |
| SUPPLIER | MOmke9xgeH | 供应商表 |
| ACCOUNT | MOAusBgPiT | 账户 |
| INVENTORY | MOsWdYRJhQ | 库存台账表 |
| FINANCE | MO08KyO9eU | 财务流水对接表 |

### METHOD_KEYS（部分）

| 模型 | methodKey | 方法名 |
|------|-----------|--------|
| SN码表 | FUG5LjJIRx | 列表 |
| SN码表 | FUUjEoVur5 | 新增 |
| SN码表 | FUU302EENf | 编辑 |
| SN码表 | FUBkwoTsdZ | 状态统计 |
| SN码表 | FUXHQf4isJ | 今日出库统计 |
| 采购入库 | FUADr2TygU | 列表 |
| 销售出库 | FUJwJkbOnk | 列表 |
| 调拨单 | FUW5FAbNha | 列表 |

**重要**：每个模型的 methodKey 是独立的，不能共用！

---

## 已解决的问题

### 1. Vue Router 在 about:srcdoc 下无法工作

**问题**：History API 被限制，导致 replaceState 报错

**解决**：移除 Vue Router，使用简单的 hashchange 监听

### 2. srcdoc 环境下的 API 调用

**背景**：页面以 `srcdoc` 方式嵌入薪福通低开平台，iframe 的 origin 为 `about:srcdoc`，与薪福通域名（`xft-demo.cmburl.cn` / `xft.cmbchina.com`）不同源。

**解决**：通过 `parent.location.host` 获取薪福通域名，API 请求发往该域，并设置 `credentials: 'include'` 携带 Cookie 凭证。虽然不是严格同源，但请求目标与嵌入页同域，Cookie 能正常携带，无需额外 CORS 代理。

### 3. methodKey 配置错误

**问题**：错误地将通用名称当作 methodKey 使用

**解决**：从低开平台模型方法配置文档获取正确的 methodKey

---

## 业务状态定义

### SN码状态

| 状态码 | 说明 |
|--------|------|
| PURCHASED | 采购中（待入库） |
| INSTOCK | 在库 |
| SOLD | 已售出 |
| RETURNED | 已退货 |
| SCRAP | 已报废 |

### SN码状态流转

```
采购 → PURCHASED → 入库 → INSTOCK → 出库 → SOLD → 退货 → RETURNED → 入库 → INSTOCK
                                              ↓
                                          SCRAP
```

---

## 菜单结构

| 菜单路径 | 组件 | 功能 |
|---------|------|------|
| / | Dashboard | 首页仪表盘 |
| /sn/list | SnList | SN码列表查询 |
| /purchase/stockIn | StockIn | 入库单（含扫码入库） |
| /purchase/payment | Payment | 付款单 |
| /purchase/return | ReturnIn | 采购退货单 |
| /sale/stockOut | StockOut | 出库单 |
| /sale/collection | Collection | 收款单 |
| /sale/return | SaleReturn | 销售退货单 |
| /warehouse/transfer | Transfer | 调拨单 |
| /warehouse/check | Check | 盘点单 |
| /warehouse/inventory | Inventory | 库存台账 |
| /sn/trace | SnTrace | SN码追溯 |
| /report/sale | SaleReport | 销售汇总报表 |
| /report/inventory | InventoryReport | 库存明细报表 |
| /report/snFlow | SnFlowReport | SN流转报表 |

| `router/index.js` | src/router/ | 死代码：main.js 未注册 vue-router，且引用了 3 个不存在的页面 |
> 实际路由由 App.vue 的 hash componentMap 驱动。router 中还引用了 3 个不存在的页面：
> /purchase/order → Purchase/PurchaseOrder.vue（缺失）、/sale/stockOut → Sale/StockOut.vue（缺失）、/report/purchase → Report/PurchaseReport.vue（缺失）。
> 若后续需要接入 vue-router，需先补全缺失页面。


---

## 开发注意事项

1. **API 调用**：请求发往 `parent.location.host`（薪福通域名），设置 `credentials: 'include'` 携带 Cookie
2. **凭证**：凭证跟随 Cookie，无需额外处理
3. **环境判断**：通过 parent.location.host 自动判断
4. **methodKey**：必须使用低开平台配置的实际值
5. **srcdoc 嵌入**：构建后使用 index.srcdoc.html
6. **资源路径约束**：由于项目通过 `iframe srcdoc` 注入运行（`about:srcdoc`），所有静态资源引用（JS、CSS、图片、字体等）必须使用**绝对路径**。相对路径在 srcdoc 模式下会因 base URL 为 `about:srcdoc` 而解析失败。构建工具（Vite）需配置 `base: '/'` 确保产物路径正确。
7. **日期筛选字段规范**：在低开平台模型方法中进行日期范围筛选时：
   - **涉及创建日期、更新日期等系统自带字段时** → 应优先使用系统自带的数据库字段（如 `createTime`、`updateTime` 等），由平台自动维护，可靠性更高
   - **使用模型中其他字段进行筛选时** → 必须确保字段与建表结构相符，不能引用表中不存在的字段
8. **入参字段严格匹配原则**：无论增删改查还是其他模型方法，入参的字段必须是表中实际存在的字段（参考 `docs/MODEL_REFERENCE.md`），严禁使用表中不存在的字段作为查询条件或写入参数。这是与低开平台交互的绝对原则。

---

## 版本记录

| 日期 | 版本 | 更新内容 |
|------|------|---------|
| 2025-05-24 | v2.0 | 初始化项目，集成低开平台 |
| 2025-05-25 | v2.1 | 新增SN码追溯、销售汇总、库存明细、SN流转报表页面 |

---

## 财务接口（应收单）

### 接口调用

通过低开平台 API 路由调用，使用 `credentials: 'include'` 自动携带凭证。

**基础地址：**
- UAT: `https://xft-demo.cmburl.cn/xcodegw/app/reg4bc6558503724/tag/uat`
- PRD: `https://xft.cmbchina.com/xcodegw/app/reg4bc6558503724/tag/prd`

### 财务接口 methodKey

| 接口 | methodKey | 用途 |
|------|-----------|------|
| 应收单推送 | `xftacrreceiptbillreceiptbillpush` | 销售出库后推送应收单 |
| 应收单删除 | `tacrreceiptbillreceiptbilldelete` | 销售退货后删除应收单 |

### 调用场景

| 业务场景 | 触发时机 | 调用函数 |
|---------|---------|---------|
| 销售出库 | 确认出库成功后 | `pushReceivable()` |
| 销售退货 | 保存退货单成功后 | `deleteReceivable()` |

---

## 待完善功能

| 功能 | 说明 | 优先级 |
|------|------|--------|
| 待收款统计 | 需要接入账款管理系统接口或新建应收单模型 | 中 |
| ~~应付单推送~~ | ~~采购入库后推送应付单~~ | ✅ 已完成 |
| 移动端仓库管理 | 增删改仓库 | 低 |
| 移动端图片附件 | 入库拍照留档 | 低 |

### 已知待清理项

| 文件 | 位置 | 说明 |
|------|------|------|
| 
| BasicData/*.vue (5个) | src/views/BasicData/ | 代码完整（Supplier/Customer/Warehouse/Product/Account），但侧栏菜单无"基础资料"入口 |
| Check/Check.vue (12KB) | src/views/Check/ | 孤立文件，未被 App.vue componentMap 引用 |
| StockOut/StockOut.vue (23KB) | src/views/StockOut/ | 孤立文件，实际出库用 Sale/SaleOrder.vue |
| SnManage/ScanStockIn.vue (9KB) | src/views/SnManage/ | 孤立文件，未在 componentMap 中 |
| Return/index.vue (670B) | src/views/Return/ | 极小占位文件，未直接引用 |
| Warehouse/WarehouseCheck.vue (12KB) | src/views/Warehouse/ | 孤立文件，盘点实际用 Warehouse/Check.vue |


---

## 视图组件与 API 映射

| 视图文件 | 使用 API | 功能 |
|---------|---------|------|
| Dashboard.vue | snApi, stockInApi, stockOutApi | 首页仪表盘 |
| SnManage/SnList.vue | snApi | SN码列表查询 |
| Purchase/StockIn.vue | stockInApi, snApi, pushPayable | 扫码入库 |
| Purchase/Payment.vue | paymentApi | 付款单管理 |
| Return/PurchaseReturn.vue | purchaseReturnApi | 采购退货 |
| Sale/SaleOrder.vue | stockOutApi, snApi, pushReceivable | 扫码出库 |
| Sale/Collection.vue | collectionApi | 收款单查询（只读，回款通过连接器同步） |
| Return/SaleReturn.vue | saleReturnApi, deleteReceivable | 销售退货 |
| Warehouse/Transfer.vue | transferApi, snApi | 调拨单 |
| Warehouse/Check.vue | checkApi | 盘点单 |
| Warehouse/Inventory.vue | inventoryApi | 库存台账 |

---

## 移动端版本

### 架构原则
- **PC 端代码零侵入**：`src/` 目录完全不动
- **复用 API 层**：`src-mobile/api/index.js` 重新导出 `src/api` 所有内容
- **独立视图层**：`src-mobile/views/` 仅实现3个核心功能页面
- **多入口构建**：Vite 同时构建 `index.html` 和 `mobile.html`

### 技术栈
| 技术 | 说明 |
|------|------|
| Vue 3 + Vite | 与 PC 端一致 |
| Vant 4 | 移动端组件库（表单、列表、弹窗、扫码） |
| Pinia | 复用 PC 端 stores（通过 `@api` alias） |
| Hash 路由 | `src-mobile/App.vue` 内置 hashchange 监听 |

### 目录结构
```
src-mobile/
├── api/index.js          # 重新导出 src/api（复用所有 API + MODEL_KEYS）
├── main.js               # 移动端入口
├── App.vue               # 根组件（Hash 路由切换页面）
├── views/
│   ├── Index.vue         # 首页（统计卡片 + 功能入口 + 低库存预警）
│   ├── Purchase/
│   │   └── StockIn.vue   # 扫码入库（供应商 → 仓库 → 扫描SN → 确认入库）
│   ├── Sale/
│   │   └── StockOut.vue  # 扫码出库（客户 → 仓库 → 扫描SN → 填售价 → 确认出库 + 应收推送）
│   ├── Return/
│   │   └── SaleReturn.vue # 销售退货（扫描SN → 选择原因 → 确认退货 + 应收删除）
│   ├── Query/
│   │   ├── InventoryQuery.vue  # 库存查询（筛选/汇总/低库存预警/SN明细）
│   │   └── SnTrace.vue         # SN溯源查询（扫码搜索/流转时间线）
│   ├── Transfer/
│   │   └── TransferConfirm.vue # 调拨确认（调拨单列表/详情/确认+SN仓库更新）
│   ├── Check/
│   │   └── CheckScan.vue       # 盘点扫描（选盘点单/扫码盘点/盘盈盘亏/提交）
│   └── Records/
│       └── RecentRecords.vue   # 操作记录（入库/出库/退货Tab/搜索/分页/详情）
├── utils/
│   ├── barcodeScanner.js  # 条码扫描（ZXing + EXIF修正）
│   ├── cache.js           # 离线缓存（30分钟过期+过期缓存兜底）
│   ├── audioFeedback.js   # 声音反馈（Web Audio API成功/失败提示音）
│   └── transaction.js     # 前端事务回滚（步骤式执行+失败自动回滚）
```

### 构建产物
```
dist/
├── index.html              # PC端入口
├── index.srcdoc.html       # PC端 srcdoc（1.2MB JS + 364KB CSS）
├── mobile.html             # 移动端入口
├── mobile.srcdoc.html      # 移动端 srcdoc（42KB JS + 93KB shared + 202KB CSS）
└── assets/
    ├── index-xxx.js        # PC端代码
    ├── mobile-xxx.js       # 移动端代码
    ├── _plugin-vue...js    # Vue 运行时共享 chunk
    ├── index-xxx.css       # Element Plus 样式
    └── mobile-xxx.css      # Vant 样式
```

### 低开平台配置
在薪福通低开平台创建 **两个独立页面**：
- **PC端页面**：`srcdoc` 内容取 `dist/index.srcdoc.html`
- **移动端页面**：`srcdoc` 内容取 `dist/mobile.srcdoc.html`

用户访问时根据设备选择对应页面即可。

### 移动端功能清单

| 功能 | 页面 | 说明 |
|------|------|------|
| 扫码入库 | Purchase/StockIn.vue | 选择供应商和仓库后，逐个扫描/输入SN码或粘贴多行SN，确认入库（含stockInTime，add失败降级edit） |
| 扫码出库 | Sale/StockOut.vue | 选择客户和仓库后，逐个扫描/输入SN码+售价或粘贴多行SN，确认出库，自动推送应收单（含仓库校验） |
| 销售退货 | Return/SaleReturn.vue | 扫描已出库SN码，选择退货原因，确认退货，自动删除应收单（用sourceOrderNo） |
| 库存查询 | Query/InventoryQuery.vue | 按商品/仓库筛选，汇总统计，低库存预警，SN码明细 |
| SN溯源 | Query/SnTrace.vue | 扫码/手动搜索SN，流转时间线展示完整生命周期 |
| 调拨确认 | Transfer/TransferConfirm.vue | 调拨单列表/详情弹窗，确认时同步更新SN仓库归属 |
| 盘点扫描 | Check/CheckScan.vue | 选盘点单/扫码盘点/盘盈盘亏统计/提交，SN用仓库ID+INSTOCK匹配 |
| 操作记录 | Records/RecentRecords.vue | 入库/出库/退货Tab，搜索/分页/详情弹窗 |

### 移动端业务逻辑要点（2026-05-29审查）

1. **SN状态值统一大写**：`INSTOCK`/`SOLD`/`RETURNED`/`SCRAP`，与PC端一致
2. **调拨确认**：必须先逐个 snApi.edit 更新 SN 的 warehouseId/warehouseName，再更新调拨单状态
3. **退货删除应收单**：参数用 `sourceOrderNo`（从SN记录获取），不是对象参数
4. **入库 stockInTime**：snApi.add 失败时降级为 snApi.edit（SN可能已预录入）
5. **出库仓库校验**：SN 所在仓库必须与选中的出库仓库匹配
6. **盘点SN匹配**：用仓库ID + INSTOCK状态双重判断
7. **条码扫描**：只用 ZXing 官方 decodeFromImageUrl + EXIF 方向修正 + TRY_HARDER hint
8. **离线缓存**：基础数据30分钟缓存，API失败用过期缓存兜底
9. **声音反馈**：Web Audio API 生成成功/失败提示音

---

## 相关文档索引

| 文档 | 路径 | 说明 |
|------|------|------|
| README.md | 根目录 | 项目说明、技术栈、部署指南 |
| PROJECT_MEMORY.md | 根目录 | 项目记忆（本文档） |
| api_document.md | docs/ | API 接口文档、模型方法调用说明 |
| model_api_mapping.md | docs/ | 模型 API 映射、代码常量定义 |
| model_methods.md | docs/ | 模型方法映射表（精简版） |
| **MODEL_REFERENCE.md** | docs/ | **完整模型参考（21个模型、所有字段、方法、SQL）** |
| **MODEL_QUICK_REFERENCE.md** | docs/ | **快速参考（模型总览+核心业务模型详情）** |
| KNOWLEDGE_BASE.md | docs/ | 低开平台知识库、组件文档索引 |

> **使用建议**：
> - 日常开发参考：`MODEL_QUICK_REFERENCE.md`
> - 查看完整字段/SQL：`MODEL_REFERENCE.md`
> - 接口调用格式：`api_document.md`
> - 组件开发：`KNOWLEDGE_BASE.md`
> - 低开平台运行时逻辑：`KNOWLEDGE_BASE.md` 第7节

---

## 更新记录

| 日期 | 更新内容 |
|------|---------|
| 2025-05-24 | 整理 `xft_demo.cmburl.cn.zip` 低开平台运行逻辑到 `KNOWLEDGE_BASE.md` 第7节 |
| 2025-05-24 | 应收单推送/删除接口通过低开平台 API 路由调用（独立接口，非模型方法） |
| 2025-05-24 | 模型方法入参修正：Query 传参 `appTag`+`modelKey`+`methodKey`，Body 传业务参数 |
| 2025-05-24 | Dashboard  redesign：今日入库/出库明细替代待处理事项 |
| 2025-05-24 | 合并入库功能：新增入库 + 扫码入库统一为扫码入库页面 |
| 2025-05-24 | 盘点单功能实现（新增/开始/完成/取消） |
| 2025-05-24 | Hash 路由替代 Vue Router（解决 about:srcdoc SecurityError） |
| 2025-05-24 | 生成 `MODEL_REFERENCE.md`（21模型/179方法/完整SQL） |
| 2025-05-24 | 生成 `MODEL_QUICK_REFERENCE.md` 快速参考 |
| 2025-05-24 | 整理 `资料/` 文件夹到 `KNOWLEDGE_BASE.md` |
| 2025-05-24 | **移动端版本新增**：采购入库/销售出库/退货（Vant 4），PC端代码零侵入 |
| 2025-05-24 | 多入口构建：Vite `index.html` + `mobile.html`，产物共存于 `dist/` |
| 2025-05-24 | 新增 `buildReceivablePayload()` 统一应收单推送数据组装逻辑 |
| 2025-05-29 | **移动端P0批次**：库存查询、SN溯源、出库价格录入 |
| 2025-05-29 | **移动端P1批次**：连续扫码、低库存预警、调拨确认、盘点扫描 |
| 2025-05-29 | **移动端P2批次**：首页统计增强、操作记录、离线缓存、声音反馈 |
| 2025-05-29 | **条码扫描简化**：删除自定义预处理策略，只用ZXing官方解码+EXIF修正 |
| 2025-05-29 | **业务逻辑审查修复6项**：SN状态值/调拨SN仓库/退货应收单/盘点匹配/入库时间/出库仓库校验 |
| 2025-05-29 | **GitHub仓库关联**：https://github.com/a18361272323/kewocs-erp，Cloudflare Pages自动部署 |
| 2025-05-29 | **业务逻辑审查修复9项**：PC退货SN状态更新/出库单关联SN/入库单关联SN/退货合并单据/出库确认环节/盘点盘盈盘亏/事务回滚/PC入库应付单/操作成功不跳走 |
| 2025-05-29 | **库存业务逻辑回检**：6项场景检查（入库+1/出库-1/退货+1/调拨转移/盘盈+1/盘亏-1），修复调拨确认SN校验/退货客户信息/盘盈SN供应商 |
| 2025-05-29 | **P3批量导入SN**：入库/出库页面增加粘贴多行SN导入 |
| 2025-05-29 | **移除首页本月统计**：用户反馈太丑，只保留今日统计 |
| 2025-05-29 | **Skills默认启用**：9个默认Skills每次会话自动加载 |
| 2025-05-24 | 修复移动端推送金额为0的问题（扫描SN时获取productName/price） |
| 2025-05-24 | 替换硬编码 `formCode` 为 `FINANCE_FORM_CODE` 配置项 |
| 2025-05-24 | 整理并记忆化最新接口文档（模型方法运行、应收单推送、应收单删除） |
| 2025-05-24 | **关键发现**：账款管理事件 `XFTACR003`（单据已回款金额变更通知），通过用户自建连接器同步回款数据到 ERP |
| 2025-05-24 | **收款单改为只读**：移除新增/删除按钮，保留查询和详情，提示"正式回款请在账款管理中操作" |
| 2025-05-24 | **SaleOrder.vue 移除保存时推送应收单**：所有商品有SN，必走出库流程，出库时才推送应收单 |
| 2025-05-24 | **销售单保存时增加库存校验**：调用 `getInventoryByWarehouse()` 检查所选品类库存是否 ≥ 销售数量，不足则阻止保存 |
| 2025-05-24 | **盘点单功能全新实现**：选择仓库 → 自动加载INSTOCK的SN → 扫描实盘 → 比对正常/盘亏/盘盈 → 完成盘点 → 盘亏SN标记LOST |
| 2025-05-24 | **调拨单重构为SN级调拨**：从品类级改为具体SN勾选 → 确认后逐条更新SN的warehouseId/warehouseName |
| 2025-05-24 | **补充 snApi.getByWarehouse()**：按仓库查询SN码，修复StockOut.vue此前调用未定义方法的问题 |
| 2025-05-24 | **生成完整业务流程图**：`docs/BUSINESS_FLOW.md`（Mermaid流程图 + 3张可视化图片），覆盖基础数据/采购/销售/仓库/账款管理/移动端全链路 |
