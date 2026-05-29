# 科沃斯 ERP 系统 V2 - SN码全流程管理系统

## 项目简介

本项目是科沃斯山西总代的 **SN码全流程管理系统前端**，实现从采购入库到销售出库/退货的全链路管理，核心解决：

- 速达3000无法实现每台机器独立SN码追踪的问题
- 销售端无法在互联网环境使用的流程割裂问题

**核心差异化**：SN码全生命周期管理

## 技术栈

| 技术 | 说明 |
|------|------|
| Vue 3 | 渐进式JavaScript框架（Composition API） |
| Vite | 下一代前端构建工具（多入口构建） |
| Element Plus | PC端 UI 组件库 |
| Vant 4 | 移动端 UI 组件库 |
| Pinia | Vue 状态管理 |
| ZXing | 条码扫描解码（CODE_128） |
| fetch | 原生 HTTP 请求（跨域调用低开平台 API） |

## 项目结构

```
kewocs-erp-v2/
├── public/                 # 静态资源
│   └── logo.svg           # Logo
├── src/                    # PC端代码
│   ├── api/               # API接口封装
│   │   ├── index.js       # 业务API（模型方法 + 财务接口）
│   │   └── request.js     # fetch封装（credentials: include）
│   ├── components/        # 公共组件（SN选择器、Excel导入、收款弹窗）
│   ├── views/             # 页面组件
│   │   ├── Dashboard.vue         # 首页仪表盘
│   │   ├── SnManage/            # SN码管理（列表/扫码入库/追溯）
│   │   ├── Purchase/            # 采购管理（入库/付款/退货）
│   │   ├── Sale/                # 销售管理（订单/出库/收款）
│   │   ├── Return/              # 退货管理（采购退货/销售退货）
│   │   ├── Warehouse/           # 仓库管理（调拨/盘点/库存）
│   │   ├── BasicData/           # 基础资料（供应商/客户/商品/仓库/账户）
│   │   ├── Report/              # 报表（销售汇总/库存明细/SN流转）
│   │   └── StockOut/            # 独立出库页面
│   ├── stores/             # Pinia状态
│   │   └── app.js         # 全局状态与菜单
│   ├── utils/              # 工具函数
│   │   ├── env.js         # 环境判断
│   │   ├── format.js      # 格式化工具
│   │   └── postMessage.js # iframe通信
│   ├── styles/             # 样式
│   ├── App.vue             # 根组件（Hash路由）
│   └── main.js             # 入口文件
├── src-mobile/             # 移动端代码（PC端零侵入）
│   ├── api/               # 复用 src/api（重新导出）
│   ├── views/             # 移动端页面
│   │   ├── Index.vue            # 首页（统计+菜单+低库存预警）
│   │   ├── Purchase/            # 扫码入库
│   │   ├── Sale/                # 扫码出库
│   │   ├── Return/              # 销售退货
│   │   ├── Query/               # 库存查询 + SN溯源
│   │   ├── Transfer/            # 调拨确认
│   │   ├── Check/               # 盘点扫描
│   │   └── Records/             # 操作记录
│   ├── utils/              # 移动端工具
│   │   ├── barcodeScanner.js  # 条码扫描（ZXing + EXIF修正）
│   │   ├── cache.js           # 离线缓存（30分钟TTL + 过期兜底）
│   │   ├── audioFeedback.js   # 声音反馈（Web Audio API）
│   │   └── transaction.js     # 前端事务回滚
│   ├── App.vue            # 移动端根组件（Hash路由）
│   └── main.js            # 移动端入口
├── docs/                   # 文档
│   ├── api_document.md           # 接口文档
│   ├── model_api_mapping.md      # 模型方法映射
│   ├── model_methods.md          # 自定义SQL方法
│   ├── MODEL_REFERENCE.md        # 完整模型参考（21模型/179方法）
│   ├── MODEL_QUICK_REFERENCE.md  # 快速参考
│   ├── BUSINESS_FLOW.md          # 业务流程图
│   └── KNOWLEDGE_BASE.md         # 低开平台知识库
├── index.html              # PC端入口HTML
├── mobile.html             # 移动端入口HTML
├── vite.config.js          # Vite配置（多入口构建）
└── package.json            # 项目配置
```

## 功能模块

### PC端

#### 1. SN码管理（核心）

| 功能 | 说明 |
|------|------|
| SN码查询 | 按SN码/商品/仓库/状态筛选 |
| SN追溯 | 全生命周期记录（采购 → 入库 → 出库 → 退货） |
| SN报废 | 故障机器SN码报废处理 |
| 扫码入库 | PC端扫码批量录入SN码 |

#### 2. 采购管理

| 功能 | 说明 |
|------|------|
| 入库单 | 采购入库单创建、编辑、确认，自动推送应付单 |
| 付款单 | 采购付款记录管理 |
| 退货单 | 采购退货处理 |

#### 3. 销售管理

| 功能 | 说明 |
|------|------|
| 出库单 | 销售出库单创建、确认，自动更新SN状态为SOLD |
| 收款单 | 销售收款记录管理（只读，回款通过连接器同步） |
| 退货单 | 销售退货处理，自动更新SN状态为INSTOCK，自动删除应收单 |

#### 4. 仓库管理

| 功能 | 说明 |
|------|------|
| 调拨单 | SN级调拨，确认后逐个更新SN仓库归属 |
| 盘点单 | 库存盘点，自动加载INSTOCK的SN，盘亏SN标记LOST |
| 库存台账 | 实时库存汇总，按仓库/商品维度 |

#### 5. 基础资料

| 功能 | 说明 |
|------|------|
| 供应商 | 供应商档案管理 |
| 客户 | 客户档案管理 |
| 商品 | 商品档案管理（含SN码管理开关） |
| 仓库 | 仓库档案管理 |
| 账户 | 账户档案管理 |

#### 6. 报表

| 功能 | 说明 |
|------|------|
| 销售汇总 | 按客户/商品/时间段汇总销售数据 |
| 库存明细 | 按仓库/商品维度展示库存详情 |
| SN流转报表 | SN码全生命周期流转记录 |

### 移动端

> 移动端覆盖8个核心业务场景，支持扫码、连续扫码、批量导入

#### 业务操作

| 功能 | 页面 | 说明 |
|------|------|------|
| 扫码入库 | Purchase/StockIn.vue | 选择供应商和仓库，逐个扫描/输入SN码或粘贴多行SN，确认入库（add失败降级edit） |
| 扫码出库 | Sale/StockOut.vue | 选择客户和仓库，逐个扫描/输入SN码+售价或粘贴多行SN，创建→确认→推送应收单 |
| 销售退货 | Return/SaleReturn.vue | 扫描已出库SN码，确认退货（合并单据），自动删除应收单 |

#### 仓库管理

| 功能 | 页面 | 说明 |
|------|------|------|
| 调拨确认 | Transfer/TransferConfirm.vue | 调拨单列表/详情，确认时校验SN仓库归属并更新 |
| 盘点扫描 | Check/CheckScan.vue | 选盘点单/扫码盘点/盘盈盘亏统计，盘亏LOST + 盘盈新增SN |

#### 信息查询

| 功能 | 页面 | 说明 |
|------|------|------|
| 库存查询 | Query/InventoryQuery.vue | 按商品/仓库筛选，汇总统计，低库存预警 |
| SN溯源 | Query/SnTrace.vue | 扫码/手动搜索SN，流转时间线展示完整生命周期 |
| 操作记录 | Records/RecentRecords.vue | 入库/出库/退货Tab，搜索/分页/详情 |

#### 移动端特性

| 特性 | 说明 |
|------|------|
| 条码扫描 | ZXing解码 + EXIF方向修正，支持拍照和相册选取 |
| 连续扫码 | 扫码成功后自动聚焦输入框，无需手动点击 |
| 批量导入 | 粘贴多行SN码批量导入（入库/出库页面） |
| 离线缓存 | 基础数据30分钟缓存，API失败用过期缓存兜底 |
| 声音反馈 | Web Audio API 生成成功/失败提示音 |
| 事务回滚 | 前端事务保护，中间步骤失败自动回滚已执行操作 |
| 低库存预警 | 首页展示低库存商品卡片 |

## SN码状态流转

```
┌─────────────┐
│  PURCHASED  │  采购中（待入库）
└──────┬──────┘
       │ 采购入库
       ▼
┌─────────────┐         ┌─────────────┐
│   INSTOCK   │◄────────│   RETURN    │  退货中
└──────┬──────┘  重新入库 └──────┬──────┘
       │                        │
       │ 销售出库               │ 销售退货
       ▼                        │
┌─────────────┐                 │
│    SOLD     │─────────────────┘
└──────┬──────┘
       │
       │ 报废
       ▼
┌─────────────┐
│  SCRAPPED   │  已报废
└─────────────┘
```

## 库存计算逻辑

库存数量基于 **SN码聚合统计**（非独立计数器）：

```
库存数量 = COUNT(SN WHERE status = 'INSTOCK' AND warehouseId = ?)
```

| 操作 | 库存变化 | SN状态变化 |
|------|---------|-----------|
| 入库 | +1 | 新增 INSTOCK |
| 出库 | -1 | INSTOCK → SOLD（后端confirm） |
| 退货 | +1 | SOLD → INSTOCK |
| 调拨 | 不变（转移仓库） | warehouseId 变更 |
| 盘亏 | -1 | INSTOCK → LOST |
| 盘盈 | +1 | 新增 INSTOCK |

## 安装部署

### 开发环境

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### 生产构建

```bash
# 构建生产版本（同时构建PC端和移动端）
pnpm build

# 预览生产版本
pnpm preview
```

### Cloudflare Pages 部署

本项目已配置 GitHub 自动构建部署到 Cloudflare Pages。

- **仓库地址**：https://github.com/a18361272323/kewocs-erp
- **访问地址**：https://kewocs-erp.pages.dev
- **构建命令**：`pnpm run build`
- **输出目录**：`dist`

## iframe 嵌入说明

本项目设计为通过 **iframe srcdoc** 嵌入薪福通低开平台页面。

### 嵌入方式

使用 `srcdoc` 方式嵌入，避免跨域 cookie 问题：

```html
<iframe
  srcdoc="<!DOCTYPE html><html><head>..."
  width="100%"
  height="100%"
  frameborder="0"
></iframe>
```

构建后生成关键文件：

| 端 | 独立访问 | srcdoc 嵌入 |
|----|---------|-------------|
| PC端 | `dist/index.html` | `dist/index.srcdoc.html` |
| 移动端 | `dist/mobile.html` | `dist/mobile.srcdoc.html` |

### 环境判断

前端通过 `parent.location.host` 判断运行环境：

| 环境 | 判断条件 | baseUrl |
|------|---------|---------|
| UAT | host 包含 `demo` | `https://xft-demo.cmburl.cn/xcodegw/app/reg4bc6558503724/tag/uat` |
| PRD | 其他 | `https://xft.cmbchina.com/xcodegw/app/reg4bc6558503724/tag/prd` |

## API 调用架构

### 模型方法接口

所有业务数据通过统一的模型方法接口调用：

**URL 格式**：
```
POST {baseUrl}/api/run/odexftopenapiv2appmodelmethodrun?appTag={env}&modelKey={modelKey}&methodKey={methodKey}
```

**请求头**：
```
Content-Type: application/json
xcode-appsource: procode
```

**Body 格式**（方法入参，根据 methodKey 不同而不同）：
```json
{
  "current": 1,
  "pageSize": 20
}
```

**响应格式**：
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

### 财务接口

| 接口 | methodKey | 用途 | 触发时机 |
|------|-----------|------|---------|
| 应收单推送 | `xftacrreceiptbillreceiptbillpush` | 销售出库后推送应收单 | 出库确认成功后 |
| 应收单删除 | `tacrreceiptbillreceiptbilldelete` | 销售退货后删除应收单 | 退货成功后 |
| 应付单推送 | `xftacrapayablebillpush` | 采购入库后推送应付单 | 入库成功后 |

### 前端 API 调用示例

```javascript
import { snApi, stockInApi, stockOutApi, pushReceivable, pushPayable } from '@/api'

// SN码列表
const result = await snApi.getList({ current: 1, pageSize: 20 })

// 创建入库单（含SN明细）
await stockInApi.add({
  supplierId, warehouseId,
  items: [{ snCodes: ['SN001', 'SN002'] }]
})

// 出库确认（后端自动更新SN状态为SOLD）
await stockOutApi.confirm(orderId)

// 推送应收单
await pushReceivable(payload)

// 推送应付单
await pushPayable(payload)
```

详见 `docs/model_api_mapping.md` 获取完整的模型方法映射表。

## 数据模型

### 低开平台模型

| 模块 | 模型Key | 说明 |
|------|---------|------|
| SN码 | MOk2ZJ4aga | SN码表 |
| SN日志 | MOqg2psiTa | SN操作日志表 |
| 采购入库 | MOIN9eD2au | 采购入库单主表 |
| 入库明细 | MOc2tEbUGK | 采购入库单明细表 |
| 销售出库 | MOenA360T5 | 销售出库单主表 |
| 出库明细 | MOg8t6pKm4 | 销售出库单明细表 |
| 采购退货 | MOV8t2Ah9X | 采购退货单主表 |
| 销售退货 | MOky0Pcw6W | 销售退货单主表 |
| 调拨单 | MOIrlRmiFH | 调拨单主表 |
| 盘点单 | MO5WOkA9SX | 盘点单主表 |
| 仓库 | MO3LPiTHMU | 仓库表 |
| 商品 | MOeUIsmD4j | 商品表 |
| 客户 | MOj7UPuJx2 | 客户表 |
| 供应商 | MOmke9xgeH | 供应商表 |
| 账户 | MOAusBgPiT | 账户表 |
| 库存台账 | MOsWdYRJhQ | 库存台账表 |
| 财务流水 | MO08KyO9eU | 财务流水对接表 |

### 基础资料同步

供应商、客户、商品、仓库、账户等基础资料由**账款管理**维护，通过**定时任务**同步到低开平台：

```
薪福通账款管理 ──定时同步──▶ 低开平台模型
```

## 架构说明

```
┌─────────────────────────────────────────────────────────────┐
│                    薪福通低开平台                            │
├─────────────────────────────────────────────────────────────┤
│  账款管理（自带）                                            │
│  ├── 供应商管理 ✓                                           │
│  ├── 客户管理 ✓                                             │
│  ├── 商品管理 ✓                                             │
│  ├── 仓库管理 ✓                                             │
│  └── 账户管理 ✓                                             │
│                                                             │
│  低开平台（自建）                                           │
│  ├── SN码全流程管理 ◄── 核心差异化                          │
│  ├── 采购入库 + 应付单推送                                  │
│  ├── 销售出库 + 应收单推送                                  │
│  ├── 退货管理 + 应收单删除                                  │
│  ├── 调拨单（SN级调拨）                                     │
│  └── 盘点单（盘盈盘亏自动处理）                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              Cloudflare Pages (自动构建部署)                  │
│  ┌────────────────────────┐  ┌────────────────────────┐     │
│  │  PC端                    │  │  移动端                  │     │
│  │  Vue 3 + Element Plus   │  │  Vue 3 + Vant 4        │     │
│  │  ├── Hash 路由          │  │  ├── Hash 路由           │     │
│  │  ├── 完整业务功能       │  │  ├── 扫码 + 连续扫码     │     │
│  │  └── srcdoc 嵌入       │  │  ├── 离线缓存 + 声音反馈 │     │
│  │                         │  │  ├── 事务回滚            │     │
│  │                         │  │  └── srcdoc 嵌入        │     │
│  └────────────────────────┘  └────────────────────────┘     │
│                                                             │
│  共享 API 层：fetch + credentials:include → 低开平台         │
└─────────────────────────────────────────────────────────────┘
```

## 低开平台字段规范

| 规范 | 说明 |
|------|------|
| 命名 | 驼峰命名（snCode、orderNo） |
| 主键 | id（BIGINT自增） |
| 软删除 | isDeleted（TINYINT） |
| 时间戳 | createTime、updateTime（DATETIME） |
| 用户 | createUser、updateUser（BIGINT） |
| 状态 | status（VARCHAR） |

## 注意事项

1. **字段命名**：低开平台要求驼峰命名，避免SQL关键字
2. **软删除**：所有表需要有 `isDeleted` 字段
3. **SN码**：只有 `isSnManaged=1` 的商品需要录入SN码
4. **基础资料**：从账款管理定时同步，不要在前端维护
5. **methodKey**：每个模型的 methodKey 是独立的，不能共用
6. **入参字段严格匹配**：入参字段必须是表中实际存在的字段，不能引用不存在的字段
7. **SN状态值大写**：INSTOCK / SOLD / RETURNED / SCRAPPED / LOST，统一大写
8. **出库确认**：必须走后端 `stockOutApi.confirm`，后端自动更新SN状态为SOLD
9. **资源路径**：srcdoc 模式下所有静态资源必须使用绝对路径（Vite `base: '/'`）

## 相关文档

| 文档 | 路径 | 说明 |
|------|------|------|
| PROJECT_MEMORY.md | 根目录 | 项目记忆、架构说明、业务逻辑要点 |
| api_document.md | docs/ | API 接口文档 |
| model_api_mapping.md | docs/ | 模型 API 映射 |
| model_methods.md | docs/ | 模型方法映射表 |
| **MODEL_REFERENCE.md** | docs/ | **完整模型参考（21模型/179方法/完整SQL）** |
| **MODEL_QUICK_REFERENCE.md** | docs/ | **快速参考（核心业务模型）** |
| BUSINESS_FLOW.md | docs/ | 业务流程图（Mermaid） |
| KNOWLEDGE_BASE.md | docs/ | 低开平台知识库 |
