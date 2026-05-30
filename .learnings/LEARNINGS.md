
# Learnings

Corrections, insights, and knowledge gaps captured during development.

**Categories**: correction | insight | knowledge_gap | best_practice

---

## [2026-05-30 13:02:43] 近期会话回顾总结

### 1. [best_practice] Source: encoding-prevention | Pattern-Key: gbk-utf8-corruption
**场景**: Cloudflare Pages 构建多次因中文乱码 ???? 导致 Vue SFC 编译失败
**根因**: GBK→UTF-8 转换时，部分中文字符被替换为 ASCII ? (0x3F)，残留在注释中
**教训**: 
- 模版字符串（如 "暗色模式"、"暖色模式"）通常不受影响，但注释中的中文容易被破坏
- 每次推送前必须执行 
g '\?\?\?' src/ src-mobile/ --type vue --type js 扫描
- 修复方法：PowerShell .NET [System.IO.File]::WriteAllText() 直接替换，避免 Python 被环境回退
**影响文件历史**: App.vue, main.js, api/request.js, api/index.js, Purchase/StockIn.vue (共 5 文件 15 处)
**See Also**: ERRORS.md#cloudflare-build-failures

### 2. [insight] Source: tool-usage | Pattern-Key: powershell-over-python
**场景**: Windows 环境下 Python open().write() 修改文件后被莫名回退
**发现**: 在 Codex Desktop 环境中，Python 发起的文件写入可能被文件监控回退；PowerShell .NET API 写入稳定
**最佳实践**:
- 优先使用 [System.IO.File]::ReadAllText/WriteAllText 读写文件
- 避免 Python inline -c 脚本做文件编辑
- pply_patch 工具经常 abort，作为备选

### 3. [best_practice] Source: design-system | Pattern-Key: css-variables-over-hardcoded
**场景**: 移动端 9 个页面使用硬编码颜色 #f5f5f5, #fff, #333, #999, #ccc 等
**解决**: 全部替换为 CSS 变量 ar(--color-canvas), ar(--color-surface), ar(--color-ink) 等
**收益**: 主题切换只需改 DESIGN.md 变量定义，无需改动每个组件

### 4. [correction] Source: mobile-no-dark-mode | Pattern-Key: mobile-theme-fixed
**用户纠正**: "手机端不需要切换模式，就要淡色"
**改正**: mobile/main.js 固定 document.documentElement.className = 'light-warm'，移除所有暗色逻辑
**设计规范**: mobile 使用 DESIGN.md 暖色变量体系，canvas #faf7f2, ink #1c1915

### 5. [best_practice] Source: api-response | Pattern-Key: res-body-list
**场景**: 多个页面的下拉选择框（SN码列表的商品/仓库、付款单的供应商/账户）数据为空
**根因**: API 返回 { returnCode, body: { list: [...] } } 但前端取的是 
es.data.list
**修复**: 全局统一为 
es.body?.list || res.data?.list 兼容两种响应格式
**影响文件**: 7 个文件 9 处

### 6. [insight] Source: build-pipeline | Pattern-Key: cloudflare-pages-multi-html
**vite.config.js 多入口构建**:
- PC 端入口: index.html → 输出 dist/index.html + dist/index.srcdoc.html
- 移动端入口: mobile.html → 输出 dist/mobile.html + dist/mobile.srcdoc.html
- srcdocPlugin 将路径替换为 CDN 绝对路径 (https://kewocs-erp.pages.dev/assets/)
**XFTPRO 部署**: PC 端 srcdoc 位于 不传git\...\uat\render\entry\pc\page\PAScRQP6OG.html，移动端目录尚待创建

### 7. [knowledge_gap] Source: element-plus-sub-menu | Pattern-Key: menu-collapse-behavior
**问题**: el-menu 的 sub-menu 同时展开/折叠
**排查中**: 需要用 vue-best-practices skill 检查 Element Plus menu 组件的 unique-opened 属性和 @open 事件处理

---

## 项目当前状态 (2026-05-30)

### 已完成
- [x] 基础资料 5 页面（供应商/客户/商品/仓库/账户）同步功能
- [x] 仓库管理独立 CRUD（不与账款同步）
- [x] PC 端 暖色/暗色主题切换（侧边栏底部按钮）
- [x] 移动端暖色编辑风重设计（10 文件）
- [x] 全局中文乱码修复（5 文件）
- [x] 全局 API 响应格式统一（res.body.list 兼容）
- [x] 侧边栏菜单样式对齐 DESIGN.md

### 待处理
- [ ] 菜单 sub-menu 同时展开/折叠问题
- [ ] 移动端 srcdoc 部署到 XFTPRO
- [ ] Dashboard 统计数据 forEach 报错
- [ ] 仓库新建 Jo.create is not a function 错误
- [ ] 首页乱序（排到最下面）

### 设计规范
- PC 端: DESIGN.md Linear Dark + light-warm 暖色
- 移动端: 固定 light-warm，无暗色
- 必须使用 CSS 变量，禁止硬编码颜色
- 禁止推送与项目无关的文件（xft-demo.cmburl.cn、学习资料）

---

## [2026-05-30 17:00] 入库表单下拉框数据为空排查

### 8. [insight] Source: cdp-chrome-testing | Pattern-Key: cdp-automation
**场景**: 使用 CDP (Chrome DevTools Protocol) 通过 WebSocket 操作 Chrome 进行 E2E 测试
**关键发现**:
- Node.js 22 内置 WebSocket 用 addEventListener 而非 on()
- CDP 必须先 enable 对应 domain 才能调用方法
- ERP 运行在 XFTPRO srcdoc iframe (#myframe) 内
- 截图 ~147KB，分辨率 2048x1280，可正常获取页面 DOM

### 9. [correction] Source: stockin-dropdown-empty | Pattern-Key: el-select-no-options
**用户反馈**: 入库单、付款单、SN码列表的商品/仓库/供应商下拉框全部为空
**代码分析** [StockIn.vue](/D:/kewocs-erp-main/src/views/Purchase/StockIn.vue:242):
  - loadSelectData 调用 basicDataApi.getSupplierList/getWarehouseList/getProductList
  - API 响应经 request() 处理后为 { body: payload, data: payload }
  - 组件取 res?.data?.list，理论上兼容
**待排查**: convertKeysToCamel 是否影响字段名；构建产物 vs 源码是否一致

### 10. [insight] Source: build-pipeline | Pattern-Key: apply-patch-corruption
**场景**: apply_patch 修改 .vue 文件多次导致构建失败
**失败案例**:
  - Supplier.vue: 模板字符串中中文逗号 `，` 被 babel parser 拒绝
  - Warehouse.vue: 换行符全部丢失，import 连成一行
  - Warehouse.vue: const res 声明重复
  - financeSync.js: 残留 ` || '0'` 片段
**教训**: 修改后必须本地 `pnpm run build` 验证，不能仅依赖远程构建

### 11. [best_practice] Source: skill-requirements | Pattern-Key: skill-activation-order
**常驻 skill**: agent-autopilot, using-superpowers, self-improvement, self-learning, proactive-agent, vue-best-practices, todo-task-manager
**按需使用**: obsidian(知识库整理), frontend-design(前端设计), web-search(联网资料)
**改进**: 每次重要操作前检查并加载相关 skill

### 12. [correction] Source: chrome-testing | Pattern-Key: e2e-testing-workflow  
**结论**: node_repl 不可用时改用 CDP + Node.js 内置 WebSocket 操作 Chrome
**用户决定**: 自己手动测试，需要测试用例和数据

### 当前待处理 P0/P1 问题
- [ ] 入库单/付款单/SN码列表下拉框数据为空（需确认 API 响应格式和字段映射）
- [ ] 移动端 `No value specified for parameter 5` 错误（getLowStockCount 方法参数不匹配）
- [ ] `t.forEach is not a function` Dashboard 报错
- [ ] `Jo.create is not a function` 仓库新增报错
- [ ] 菜单 sub-menu 同时展开/折叠问题
---

## [2026-05-30 19:48:39] 入库金额字段类型错误与用户纠正

### 8. [correction] Source: stock-in-amount-integer | Pattern-Key: model-field-type-over-code-fix
**场景**: 入库提交时低开平台报错「总金额字段数据5823.3不能转换为<整型>数字类型」
**错误做法**: 在 StockIn.vue 中 Math.round(computedTotalAmount.value) 强行取整
**用户纠正**: "这种情况应该告诉我去调整低开平台模型总金额字段为小数，而不是改代码"
**正确做法**: 金额字段天然应该存精确值，应去低开平台改模型字段类型（整型→小数），前端代码不动
**教训**: 
- 遇到后端字段类型不匹配时，优先改模型定义而非在代码中丢失精度
- 金额类字段绝不应用整型，必须用小数/浮点型
- 同理 SN 码表的 purchasePrice 如果是整型也需一并改为小数
**影响模型**: MOIN9eD2au (入库单) / 字段: 总金额

### 9. [insight] Source: finance-sync-mapProduct | Pattern-Key: purchase-price-mapping
**场景**: 同步商品后选中商品，采购价没有自动带出
**根因**: inanceSync.js 的 mapProduct 函数只映射了 sale_price（unitPriceIncludingTax），缺少 purchase_price（unitPriceExcludingTax）
**修复**: 添加 purchase_price: item.unitPriceExcludingTax
**字段映射**: unitPriceExcludingTax (税前金额) → purchase_price → 前端 purchasePrice
**影响文件**: src/api/financeSync.js

---

## [2026-05-30 21:00] 低开平台模型方法地毯式审计

### 13. [best_practice] Source: model-method-audit | Pattern-Key: cross-check-every-method
**场景**: 用户要求对照 MODEL_API_DOCS.md 逐一检查所有模型方法的业务逻辑、入参是否正确
**执行过程**:
1. 提取文档中 21 个模型的 methodKey 列表（parser 脚本）
2. 与 index.js 中 108 个方法逐条对照 → 全部匹配
3. 逐字段核对：对照文档新增/编辑方法的入参列表，比对前端实际发送字段
**发现 5 项问题**:
- P0: returnInDetailApi/returnOutDetailApi 未定义（ReferenceError）
- P1: StockIn.vue 发送 totalQuantity（入库主表无此字段）
- P1: StockIn.vue 发送 model/specification（SN码表无此字段）
- P1: SnList.vue doSnReturn 入参 snIds/returnReason 不匹配 scrap SQL 的 id/reason
**教训**: methodKey 匹配只是第一道防线，入参字段名/类型必须逐字段对照文档，不能假设"大概能用"

### 14. [insight] Source: decimal-vs-integer | Pattern-Key: platform-model-field-types
**场景**: 入库提交报错「金额5823.3不能转换为<整型>」
**根因**: 低开平台 18 个金额/价格字段默认为 int 类型，前端发送小数即报错
**解决**: 在低开平台逐一修改字段类型 int→decimal（文档附录已记录完整清单）
**涉及模型**: sn_code(2), stock_in_order(1), stock_out_order(3), pur_re_ord(1), sa_re_ord(1), transfer_order(1), check_order(1), 4个明细表各2字段
**教训**: 
- 金额类字段绝不应用整型
- 低开平台新建模型时默认数字字段为 int，需要手改
- 遇到类型不匹配优先改平台模型而非前端截断

### 15. [correction] Source: finance-sync-price-mapping | Pattern-Key: excluded-tax-price
**用户纠正**: "获取商品时拿到的字段有税前和税后金额的，税前金额应该匹配为单价"
**分析**: 账款管理系统返回 unitPriceIncludingTax(含税2999) 和 unitPriceExcludingTax(税前2911.65)
**确认**: purchase_price = unitPriceExcludingTax 映射正确，无需修改
**key insight**: 前端 onProductChange 读 purchasePrice → 自动带出入库单价，数据链路正确
---

## [2026-05-30 21:31] PC端+移动端字段名地毯式审计

### 16. [best_practice] Source: field-name-abbreviation | Pattern-Key: api-follows-model-docs | Priority: P0 | Recurrence-Count: 4

**核心铁律**: 调用 API 时所有字段名必须以 MODEL_API_DOCS.md 为唯一真相源，一字不差。

**根因模式**: 前端习惯性使用简写 camelCase 如 createTime、totalActualQty、actionType 等，但这些并非模型真实字段名。

**技术链路**:
1. MODEL_API_DOCS.md 中模型字段定义为 snake_case（如 created_at）
2. request.js 自动转换：请求时 camelCase→snake_case，响应时 snake_case→camelCase
3. 因此前端使用 camelCase 即可，但 camelCase 必须严格对应模型的 snake_case 原名

**字段名对照表**:

| 错误写法 | 模型 snake_case | 正确 camelCase |
|---------|----------------|----------------|
| createTime | created_at | createdAt |
| updateTime | updated_at | updatedAt |
| totalActualQty | total_actual_quantity | totalActualQuantity |
| totalProfitQty | total_profit_quantity | totalProfitQuantity |
| profitQty | total_profit_quantity | totalProfitQuantity |
| lossQty | （盘点单无此字段） | — |
| actionType | operation_type | operationType |
| actionName | operation_desc | operationDesc |
| items | （模型无此字段，不传） | — |

**影响文件 (11个)**:
- PC端: Payment.vue, StockIn.vue, SaleOrder.vue, Check.vue, Transfer.vue, SnTrace.vue, SnFlowReport.vue
- 移动端: CheckScan.vue, SnTrace.vue, TransferConfirm.vue, RecentRecords.vue

**修复提交**: 24ceea3 (mobile), 41bd961 (pc), 4fed8b4 (learnings)

**深刻教训**:
- 字段名的缩写习惯必须与平台模型一致，不能自创简写
- 调用 API 要按照接口文档要求来，接口文档来源于模型定义和模型方法
- 这是第4次重复犯此类错误，已固化为 Pattern-Key: api-follows-model-docs

**预防措施**:
- [x] MODEL_API_DOCS.md 中追加字段名速查表
- [x] 项目开发规范中强调字段名必须对照文档
- [x] LEARNINGS.md 提炼为铁律条目
- [ ] 新页面开发前必须先读 MODEL_API_DOCS.md 对应模型字段定义

**落地检查清单**:
1. 确定要调用的模型方法
2. 在 MODEL_API_DOCS.md 中找到该方法定义
3. 逐个核对前端发送的字段名与模型 snake_case 的 camelCase 转换是否一致
4. 不存在的字段一律删除，不凭空猜测

