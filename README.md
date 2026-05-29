# 科沃斯ERP系统 V2 - SN码全流程管理系统

## 项目简介

本项目是科沃斯山西总代的**SN码全流程管理系统前端**，实现从采购入库到销售出库/退货的全链路管理，核心解决：

- 速达3000无法实现每台机器独立SN码追踪的问题
- 销售端无法在互联网环境使用的流程割裂问题

**核心差异化**：SN码全生命周期管理

## 技术栈

| 技术 | 说明 |
|------|------|
| Vue 3 | 渐进式JavaScript框架 |
| Vite | 下一代前端构建工具 |
| Element Plus | PC端 UI 组件库 |
| Vant 4 | 移动端 UI 组件库 |
| Pinia | Vue状态管理 |
| fetch | 原生 HTTP 请求（跨域调用低开平台 API） |

## 项目结构

```
kewocs-erp-v2/
├── public/                 # 静态资源
│   └── logo.svg           # Logo
├── src/
│   ├── api/               # API接口封装
│   │   ├── index.js       # 业务API（调用低开平台模型方法）
│   │   └── request.js     # fetch封装（credentials: include）
│   ├── components/        # 公共组件
│   ├── views/             # 页面组件
│   │   ├── Dashboard.vue         # 首页仪表盘
│   │   ├── SnManage/            # SN码管理
│   │   ├── Purchase/            # 采购管理
│   │   ├── Sale/                # 销售管理
│   │   ├── Return/              # 退货管理
│   │   ├── Warehouse/           # 仓库管理
│   │   ├── BasicData/          # 基础资料
│   │   └── Warehouse/         # 仓库管理（调拨/盘点/库存）
│   ├── stores/             # Pinia状态
│   │   └── app.js         # 全局状态与菜单
│   ├── utils/              # 工具函数
│   │   └── format.js      # 格式化工具
│   ├── styles/             # 样式
│   ├── App.vue             # 根组件（Hash路由）
│   └── main.js             # 入口文件
├── src-mobile/             # 移动端代码（PC端零侵入）
│   ├── api/               # 复用 src/api（重新导出）
│   ├── views/             # 移动端页面
│   │   ├── Index.vue      # 首页（3个功能入口）
│   │   ├── Purchase/      # 采购入库
│   │   ├── Sale/          # 销售出库
│   │   └── Return/        # 销售退货
│   ├── App.vue            # 移动端根组件
│   └── main.js            # 移动端入口
├── docs/                   # 文档
│   ├── api_document.md           # 接口文档
│   ├── model_api_mapping.md      # 模型方法映射
│   └── model_methods.md          # 自定义SQL方法
├── dist/                   # 构建输出
├── index.html              # 入口HTML
├── package.json            # 项目配置
├── vite.config.js          # Vite配置
└── README.md               # 项目说明
```

## 功能模块

### 1. SN码管理（核心）

| 功能 | 说明 |
|------|------|
| SN码查询 | 按SN码/商品/仓库/状态筛选 |
| SN追溯 | 全生命周期记录（采购→入库→出库→保修） |
| SN报废 | 故障机器SN码报废处理 |
| 扫码入库 | PC端扫码批量录入SN码 |

### 2. 采购管理

| 功能 | 说明 |
|------|------|
| 入库单 | 采购入库单创建、编辑、确认 |
| 付款单 | 采购付款记录管理 |
| 退货单 | 采购退货处理 |

### 3. 销售管理

| 功能 | 说明 |
|------|------|
| 出库单 | 销售出库单创建、确认 |
| 收款单 | 销售收款记录管理 |
| 退货单 | 销售退货处理 |

### 4. 仓库管理

| 功能 | 说明 |
|------|------|
| 调拨单 | 仓库间货品调拨，SN码同步转移 |
| 盘点单 | 库存盘点，账实核对，盘盈盘亏处理 |
| 库存台账 | 实时库存汇总，按仓库/商品维度 |

### 5. 基础资料

| 功能 | 说明 |
|------|------|
| 供应商 | 供应商档案管理 |
| 客户 | 客户档案管理 |
| 商品 | 商品档案管理（含SN码管理开关） |
| 仓库 | 仓库档案管理 |
| 账户 | 账户档案管理 |

### 6. 移动端（精简版）

> 移动端仅实现3个高频核心功能，部署在独立页面

| 功能 | 说明 |
|------|------|
| 扫码入库 | 选择供应商和仓库，逐个扫描/输入SN码，确认入库 |
| 扫码出库 | 选择客户和仓库，逐个扫描/输入SN码，确认出库，自动推送应收单 |
| 销售退货 | 扫描已出库SN码，选择退货原因，确认退货，自动删除应收单 |

## SN码状态流转

```
┌─────────────┐
│  PURCHASED  │  采购中（待入库）
└──────┬──────┘
       │ 采购入库
       ▼
┌─────────────┐
│   INSTOCK   │  库存中
└──────┬──────┘
       │ 销售出库
       ▼
┌─────────────┐
│    SOLD     │  已售出
└──────┬──────┘
       │ 销售退货
       ▼
┌─────────────┐
│   RETURN    │  退货中
└──────┬──────┘
       │ 重新入库
       ▼
┌─────────────┐
│   INSTOCK   │  库存中
└─────────────┘

其他状态：
  SCRAPPED - 已报废
```

## 安装部署

### 开发环境

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### 生产部署

```bash
# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

### Cloudflare Pages部署

1. 构建项目：`pnpm build`
2. 将 `dist` 目录上传到 Cloudflare Pages
3. 构建命令留空
4. 输出目录设置为 `/`

## iframe嵌入说明

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

**PC端**：
- `dist/index.srcdoc.html` - PC端 srcdoc 嵌入内容
- `dist/index.html` - PC端独立访问预览

**移动端**：
- `dist/mobile.srcdoc.html` - 移动端 srcdoc 嵌入内容
- `dist/mobile.html` - 移动端独立访问预览

### 环境判断

前端通过 `parent.location.host` 判断运行环境：
- 包含 `demo` → UAT 环境
- 其他 → PRD 环境

| 环境 | baseUrl |
|------|---------|
| UAT | https://xft-demo.cmburl.cn |
| PRD | https://xft.cmbchina.com |

## API 调用架构

### 模型方法接口

所有业务数据通过统一的模型方法接口调用：

**完整 URL 格式**：
```
POST {baseUrl}/api/run/odexftopenapiv2appmodelmethodrun?appTag=uat&modelKey=MOk2ZJ4aga&methodKey=FUG5LjJIRx
```

其中 `baseUrl` 格式为：
```
https://{host}/xcodegw/app/{appId}/tag/{envTag}
```

| 环境 | baseUrl 示例 |
|------|--------------|
| UAT | `https://xft-demo.cmburl.cn/xcodegw/app/reg4bc6558503724/tag/uat` |
| PRD | `https://xft.cmbchina.com/xcodegw/app/reg4bc6558503724/tag/prd` |

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

### 前端 API 调用示例

```javascript
import { snApi, dashboardApi, getProductSimpleList } from '@/api'

// 获取 SN码列表
const result = await snApi.getList({ current: 1, pageSize: 20 })

// 获取 Dashboard 统计
const stats = await dashboardApi.getStats()

// 商品下拉列表
const products = await getProductSimpleList()

// 创建 SN码
await snApi.add({ snCode: 'SN001', ... })

// 获取详情
const detail = await snApi.getDetail(id)
```

详见 `docs/model_api_mapping.md` 获取完整的模型方法映射表。

## 数据来源

### 低开平台模型

| 模块 | 模型Key | 说明 |
|------|---------|------|
| SN码 | MOk2ZJ4aga | SN码表 |
| SN日志 | MOqg2psiTa | SN操作日志表 |
| 采购入库 | MOIN9eD2au | 采购入库单主表 |
| 销售出库 | MOenA360T5 | 销售出库单主表 |
| 采购退货 | MOV8t2Ah9X | 采购退货单主表 |
| 销售退货 | MOky0Pcw6W | 销售退货单主表 |
| 调拨单 | MOIrlRmiFH | 调拨单主表 |
| 盘点单 | MO5WOkA9SX | 盘点单主表 |
| 仓库 | MO3LPiTHMU | 仓库表 |
| 商品 | MOeUIsmD4j | 商品表 |
| 客户 | MOj7UPuJx2 | 客户表 |
| 供应商 | MOmke9xgeH | 供应商表 |

### 基础资料同步

供应商、客户、商品、仓库、账户等基础资料由**账款管理**维护，通过**定时任务**同步到低开平台：

```
薪福通账款管理 ──定时同步──▶ 低开平台模型
```

## 自定义SQL方法

详见 `docs/model_methods.md`

每个模型的 methodKey 是独立的，不能共用。详见 `docs/model_api_mapping.md`。

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

## 架构说明

```
┌─────────────────────────────────────────────────────────────┐
│                    薪福通低开平台                           │
├─────────────────────────────────────────────────────────────┤
│  账款管理（自带）                                            │
│  ├── 供应商管理 ✓                                          │
│  ├── 客户管理 ✓                                            │
│  ├── 商品管理 ✓                                            │
│  ├── 仓库管理 ✓                                            │
│  └── 账户管理 ✓                                            │
│                                                             │
│  低开平台（自建）                                           │
│  ├── SN码全流程管理 ◄── 核心差异化                          │
│  ├── 采购入库 ◄──────────────────────────┐                  │
│  ├── 销售出库 ◄──────────────────────────┼── iframe嵌入     │
│  ├── 退货管理 ◄──────────────────────────┤                  │
│  ├── 调拨单 ◄────────────────────────────┘                  │
│  └── 盘点单 ◄──────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                Cloudflare Pages                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Kewocs-ERP 前端（Vue 3 + Element Plus）               │  │
│  │  ├── fetch API 调用低开平台模型方法                     │  │
│  │  └── 凭证跟随父页面 Cookie 自动携带                     │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 相关文档

| 文档 | 路径 | 说明 |
|------|------|------|
| PROJECT_MEMORY.md | 根目录 | 项目记忆、架构说明、常见问题 |
| api_document.md | docs/ | API 接口文档 |
| model_api_mapping.md | docs/ | 模型 API 映射 |
| model_methods.md | docs/ | 模型方法映射表 |
| **MODEL_REFERENCE.md** | docs/ | **完整模型参考（所有字段、方法、SQL）** |
| **MODEL_QUICK_REFERENCE.md** | docs/ | **快速参考（核心业务模型）** |
| KNOWLEDGE_BASE.md | docs/ | 低开平台知识库 |
