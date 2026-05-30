
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
- 每次推送前必须执行 g '\?\?\?' src/ src-mobile/ --type vue --type js 扫描
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
**根因**: API 返回 { returnCode, body: { list: [...] } } 但前端取的是 es.data.list
**修复**: 全局统一为 es.body?.list || res.data?.list 兼容两种响应格式
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