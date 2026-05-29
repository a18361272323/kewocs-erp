# 科沃斯ERP项目知识库

> 基于 `资料/` 文件夹整理的项目开发知识

---

## 目录

1. [低开平台概述](#1-低开平台概述)
2. [接口开发](#2-接口开发)
3. [数据模型](#3-数据模型)
4. [账款管理](#4-账款管理)
5. [组件文档](#5-组件文档)
6. [参考文档清单](#6-参考文档清单)
7. [低开平台运行时逻辑](#7-低开平台运行时逻辑xft_democmburlcnzip-分析)
8. [移动端版本](#8-移动端版本)

---

## 1. 低开平台概述

### 1.1 环境说明

| 环境 | 地址 | 用途 |
|------|------|------|
| UAT | `https://xft-demo.cmburl.cn` | 测试环境 |
| PRD | `https://xft.cmbchina.com` | 生产环境 |

### 1.2 应用信息

- **App ID**: `reg4bc6558503724`
- **接入方式**: iframe srcdoc 嵌入

### 1.3 关键概念

| 名词 | 说明 |
|------|------|
| modelKey | 模型唯一标识 |
| methodKey | 模型方法唯一标识 |
| appTag | 环境标签（uat/prd） |

---

## 2. 接口开发

### 2.1 模型方法接口

**接口地址格式：**
```
POST {baseUrl}/api/run/odexftopenapiv2appmodelmethodrun?appTag=uat&modelKey=xxx&methodKey=xxx
```

**认证方式：**
- 使用 `credentials: 'include'` 自动携带 Cookie 凭证

**接口输入参数（Query）：**

| 参数 | 必填 | 类型 | 最大长度 | 说明 | 示例值 |
|------|------|------|----------|------|--------|
| appTag | 是 | STRING | 64 | 应用环境 | `uat`（沙盒）/ `prd`（生产） |
| modelKey | 是 | STRING | 64 | 模型key | `MO0001` |
| methodKey | 是 | STRING | 64 | 方法key | `FU0001` |

**接口输入参数（Body）：**

| 参数 | 必填 | 类型 | 说明 | 示例值 |
|------|------|------|------|--------|
| current | 是 | INTEGER | 当前页 | `1` |
| pageSize | 是 | INTEGER | 每页大小（最大1000） | `20` |

> 其他查询条件直接在 Body 中传入模型字段，多条件为 **AND** 关系。排序使用 `orders: [{ key: 'id', order: 'DESC' }]`。

**不同操作类型的 Body 入参：**

| 操作类型 | Body 入参说明 | 示例 |
|----------|--------------|------|
| 查询（list） | `current`, `pageSize`, 查询字段 | `{ "current": 1, "pageSize": 10, "status": "in_stock" }` |
| 增加（add） | 模型表字段直接传入 | `{ "sn_code": "SN001", "status": "in_stock" }` |
| 编辑（edit） | 必须传 `id`，再传修改字段 | `{ "id": "1001", "status": "sold" }` |
| 查看详情（detail/getById） | 只传 `id` | `{ "id": "1001" }` |
| 删除（delete） | 只传 `id` | `{ "id": "1001" }` |

**接口输出参数（响应体）：**

| 参数 | 类型 | 说明 |
|------|------|------|
| returnCode | STRING | 状态码，`SUC0000` 为成功 |
| errorMsg | STRING | 错误信息，成功时为 `null` |
| body | OBJECT | 返回数据，不同方法结构不同 |

**通用查询响应 body 结构：**
```json
{
  "total": 1,
  "list": [ { ... } ],
  "current": 1,
  "pageSize": 10
}
```

**调用示例：**
```javascript
fetch("{baseUrl}/api/run/odexftopenapiv2appmodelmethodrun?appTag=uat&modelKey=xxx&methodKey=xxx", {
  "headers": { "content-type": "application/json" },
  "body": JSON.stringify({ "current": 1, "pageSize": 10 }),
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});
```

### 2.2 账款管理接口

**接口地址：**

| 环境 | 应收单推送 | 应收单删除 |
|------|-----------|-----------|
| 测试 | `https://xft-demo.cmburl.cn/xcodegw/app/reg4bc6558503724/tag/uat/api/run/xftacrreceiptbillreceiptbillpush` | `https://xft-demo.cmburl.cn/xcodegw/app/reg4bc6558503724/tag/uat/api/run/tacrreceiptbillreceiptbilldelete` |
| 生产 | `https://xft.cmbchina.com/xcodegw/app/reg4bc6558503724/tag/prd/api/run/xftacrreceiptbillreceiptbillpush` | `https://xft.cmbchina.com/xcodegw/app/reg4bc6558503724/tag/prd/api/run/tacrreceiptbillreceiptbilldelete` |

**调用方式：**
```javascript
fetch("{baseUrl}/api/run/xftacrreceiptbillreceiptbillpush", {
  "headers": { "content-type": "application/json" },
  "body": JSON.stringify({ ... }),
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});
```

**应收单推送 — 入参（Body）：**

| 参数 | 必填 | 类型 | 说明 | 示例值 |
|------|------|------|------|--------|
| formCode | **是** | STRING(64) | 表单编码（账款管理-系统设置-自定义配置-表单流程） | `1154768285638656` |
| customerCode | **是** | STRING(50) | 客户编码（账款管理-系统设置-档案管理-客户） | `CUS_0000000001` |
| billCode | 否 | STRING(200) | 单据编号（上游已有单号时传入，否则在编码规则设置） | `AR2025102300010` |
| billBeginDate | 否 | STRING(10) | 账期开始时间（`yyyy-MM-dd`，福利应收单时有效） | `2025-10-30` |
| billEndDate | 否 | STRING(10) | 账期结束时间（`yyyy-MM-dd`，福利应收单时有效） | `2025-10-30` |
| billSummaryApi | 否 | OBJECT | 账单汇总（人力应收单且组件必填时必传） | - |
| billSummaryApi.totalBillAmount | 否 | STRING(16) | 账单总金额（14位整数+2位小数） | `100.00` |
| billSummaryApi.totalActualAmount | 否 | STRING(18) | 实发总金额（14位整数+2位小数） | `100.00` |
| receiveBillList | 否 | ARRAY | 应收明细列表 | - |
| receiveBillList[].amount | 否 | STRING | 金额 | `100.00` |
| receiveBillList[].receiveItem | 否 | STRING | 数量 | `1` |
| receiveBillList[].productCode | 否 | STRING | 商品编码 | `XFT001` |
| receiveBillList[].productName | 否 | STRING | 商品名称 | `扫地机器人` |
| receiveBillList[].receiveDate | 否 | STRING | 日期 (`yyyy-MM-dd`) | `2025-10-30` |
| receiveBillList[].currencyCode | 否 | STRING | 币种 | `CNY` |
| receiveBillList[].exchangeRate | 否 | STRING | 汇率 | `1.00` |
| receiveBillList[].billCode | 否 | STRING | 明细单据编号 | `AR001-D1` |
| receiveBillList[].upSysId | 否 | STRING | 上游系统ID | `WBXT001` |
| businessManCodes | 否 | ARRAY | 业务员编码集合（员工花名册员工号），最多50个 | `["123456"]` |
| commissionRate | 否 | STRING(10) | 佣金比例（福利应收单必填时传），如11%传0.11，最多6位小数 | `0.11` |
| departmentCode | 否 | STRING(50) | 业务部门编码（管理后台-组织） | `0000` |
| formInstanceApiList | 否 | ARRAY | 表单自定义字段（`{ code, values: [] }`） | `[{"code":"C01324145","values":["aaa"]}]` |
| goodsInfoApiList | 否 | ARRAY | 商品信息列表 | - |
| remark | 否 | STRING | 备注 | - |

> 账期开始/结束时间必须同时传值或同时不传。表单编码请在「账款管理-系统设置-自定义配置-表单流程」中查看。
> 账单汇总金额字段：最多支持14位整数，2位小数。佣金比例取值范围 `0 <= commissionRate <= 1`。

**应收单删除 — 入参（Body，二选一必填）：**

| 参数 | 必填 | 类型 | 说明 | 示例值 |
|------|------|------|------|--------|
| billCode | 条件 | STRING(200) | 单据编号（收入确认页面展示的单据编号） | `123456` |
| upSysId | 条件 | STRING(64) | 上游系统ID（单据有上游系统ID时可传） | `WBXT001` |

**应收单删除 — 错误码：**

| 错误码 | 错误信息 |
|--------|---------|
| XFKRPI0001 | 请求参数错误，单据号和上游系统id不能同时为空 |
| XFKRPI0002 | 审批中的应收单不允许删除 |
| XFKRPI0003 | 已确认的应收单不允许作废/删除 |
| XFKRPI0004 | 应收单已经开票，不允许作废/删除 |
| XFKRPI0005 | 应收单有下游收入确认单，不允许删除 |
| XFKAPI0007 | 应收单不存在 |
| XFKSYC0004 | 多笔已经入账的单据不能编辑、作废、撤销认领和删除 |

### 2.3 账款管理事件通知

**事件名称**：账款管理-单据已回款金额变更通知
**事件编号**：`XFTACR003`
**更新时间**：2025-09-25

**事件描述**：
将流水同步到账款管理后，财务或业务可以在账款管理通过手工或自动两种形式生成回款认领单。回款认领单提单后，账款管理会更新应收账单或销售合同的「已回款金额」。如果需要将单据回款情况同步到业务系统，可订阅当前通知。

**对 ERP 架构的影响**：
- ERP 负责推送应收单到账款管理（已有 `pushReceivable`）
- 回款操作应在**账款管理**中完成（手工/自动认领）
- 回款状态通过**用户自建连接器**同步回 ERP（连接器接收 XFTACR003 后调用 ERP 模型 API）
- ERP 内部的「收款单」已改为**只读查询模式**，不提供新增/编辑功能，正式回款由账款管理处理

**连接器集成说明**：

用户自建连接器架构：
1. 账款管理生成回款认领单并提单 → 触发 `XFTACR003` 事件
2. 连接器接收该事件通知（webhook / 消息队列）
3. 连接器提取关键字段：应收单编号、已回款金额、回款时间等
4. 连接器调用低开平台模型方法 API，更新 ERP 本地数据

**连接器需要调用的 ERP 模型方法**：

| 操作 | 模型 | 方法 | 说明 |
|------|------|------|------|
| 创建收款记录 | FINANCE (`MOPCwst8jX`) | add (`FU04KQaXDI`) | 记录回款明细 |
| 更新订单已回款金额 | SALE_ORDER (`MOvD5OLrs6`) | edit (`FUk2Zcwjs2`) | 更新 `receivedAmount` 和 `status` |
| 查询应收单对应订单 | SALE_ORDER (`MOvD5OLrs6`) | list (`FUc4sKXwLl`) | 通过 `orderNo` 或 `upSysId` 关联 |

**关键字段映射**：
- 账款管理 `billCode` → ERP `orderNo`（或 `upSysId`）
- 账款管理已回款金额 → ERP `receivedAmount`
- 根据 `receivedAmount` 与 `totalAmount` 比较，更新订单状态：`PARTIAL_PAID` 或 `PAID`

### 2.4 相关文档

| 文档名 | 说明 |
|--------|------|
| 低开工具_使用手册_接口开发_接口开发.docx | 接口开发入门 |
| 低开工具_使用手册_接口开发_使用HTTP接口.docx | HTTP接口配置 |
| 低开工具_使用手册_接口开发_使用业务编排.docx | 业务编排开发 |
| 低开工具_使用手册_接口开发_低开应用连接后端接口用户认证和鉴权方案.docx | 认证鉴权方案 |
| 模型方法运行_20260524191503402.docx | **模型方法运行接口文档**（最新整理） |
| 开发文档_财务服务_账款管理_应收账单_应收单推送_20260524191508376.docx | **应收单推送接口文档**（最新整理） |
| 开发文档_财务服务_账款管理_应收账单_应收单删除_20260524191508283.docx | **应收单删除接口文档**（最新整理） |

---

## 3. 数据模型

### 3.1 模型关键字限制

详见：`低开工具_使用手册_数据模型开发_低开平台模型关键字限制说明.docx`

### 3.2 托管模型使用

详见：`低开工具_使用手册_数据模型开发_使用托管模型.docx`

### 3.3 SQL说明

详见：`低开工具_使用手册_数据模型开发_SQL说明文档.docx`

### 3.4 日期筛选字段规范

在低开平台模型方法中进行日期范围筛选时，需遵循以下原则：

**1. 系统自带字段优先**
涉及创建日期、更新日期等场景时，应优先使用系统自带的数据库字段（如 `createTime`、`updateTime` 等），而非自定义业务字段（如"录入日期"）。
- 系统自带字段由平台自动维护，数据可靠性更高
- 无需额外存储自定义日期字段，减少数据冗余
- 与平台的审计、日志、时区处理机制保持一致

**2. 其他字段须与建表结构相符**
使用模型中的其他字段进行筛选时，必须确保该字段在实际的建表结构中存在，不能引用表中不存在的字段。

**示例**：
```
// 推荐：使用系统自带 createTime
where createTime >= #{startDate} and createTime <= #{endDate}

// 避免：使用自定义业务字段（除非表中已存在）
where entryDate >= #{startDate} and entryDate <= #{endDate}
```

---

## 4. 组件文档

### 4.1 容器组件

| 组件 | 文档 |
|------|------|
| page | pc_container_page.docx |
| modal | pc_container_modal.docx |
| drawer | pc_container_drawer.docx |
| tabs | pc_container_tabs.docx |
| steps | pc_container_steps.docx |
| row | pc_container_row.docx |
| container | pc_container_container.docx |

### 4.2 展示组件

| 组件 | 文档 |
|------|------|
| button | pc_ui_button.docx |
| text | pc_ui_text.docx |
| tag | pc_ui_tag.docx |
| image | pc_ui_image.docx |
| icon | pc_ui_icon.docx |
| iframe | pc_ui_iframe.docx |
| tree | pc_ui_tree.docx |
| chart | pc_ui_chart.docx |
| carousel | pc_ui_carousel.docx |
| mapping | pc_ui_mapping.docx |
| xftBi | pc_ui_xftBi.docx |

### 4.3 数据组件

| 组件 | 文档 |
|------|------|
| table | pc_data_table.docx |
| cardList | pc_data_cardList.docx |

### 5.4 表单组件

| 组件 | 文档 |
|------|------|
| input | pc_form_input.docx |
| combo | pc_form_combo.docx |
| checkbox | pc_form_checkbox.docx |
| radio | pc_form_radio.docx |
| datePicker | pc_form_datePicker.docx |
| select | pc_form_select.docx |

### 5.5 OA组件

| 组件 | 文档 |
|------|------|
| processForm | pc_oa_processForm.docx |
| processTable | pc_oa_processTable.docx |
| xftProcessTrial | pc_oa_xftProcessTrial.docx |

---

## 5. 参考文档清单

### 5.1 低开工具

```
资料/低开工具/
├── 低代码平台_低开工具_产品简介_*
│   ├── CodeFriend低开平台概述.docx
│   ├── 使用环境.docx
│   ├── 名词解释.docx
│   └── 目标用户.docx
├── 低代码平台_低开工具_使用手册_接口开发_*
│   ├── 接口开发.docx
│   ├── 接口配置.docx
│   ├── 使用HTTP接口.docx
│   ├── 使用业务编排.docx
│   ├── 应用上下文.docx
│   ├── SQL脚本节点使用说明.docx
│   ├── 低开应用连接后端接口用户认证和鉴权方案.docx
│   └── 应用内调用互联网API权限申请.docx
├── 低代码平台_低开工具_使用手册_数据模型开发_*
│   ├── 数据模型开发.docx
│   ├── 数据管理.docx
│   ├── 使用托管模型.docx
│   ├── SQL说明文档.docx
│   └── 低开平台模型关键字限制说明.docx
├── 低代码平台_低开工具_使用手册_应用设置_*
│   ├── 应用设置.docx
│   └── 环境变量.docx
├── 低代码平台_低开工具_使用手册_应用访问权限_*
│   ├── 权限管理.docx
│   └── 资源点配置.docx
└── 低代码平台_低开工具_使用手册_OA审批_*
    ├── OA审批功能开发全旅程.docx
    ├── 字段设计.docx
    ├── 流程表单设计.docx
    ├── 流程表格设计.docx
    └── 选项类字段数据配置.docx
```

### 6.2 账款管理

```
资料/账款管理/
├── 应收应付_账款管理_产品介绍_账款管理产品介绍.docx
├── 应收应付_账款管理_产品动态_账款管理升级为应收应付一体化应用.docx
├── 开发文档_财务服务_账款管理_*
│   ├── 应收账单_*
│   │   ├── 应收单推送.docx
│   │   ├── 应收单删除.docx
│   │   ├── 应收单详情查询.docx
│   │   └── 应收单作废.docx
│   ├── 销售合同_*
│   │   ├── 合同新增.docx
│   │   └── 合同变更.docx
│   ├── 回款管理_*
│   │   ├── 回款认领单新增.docx
│   │   ├── 回款预收款单详情.docx
│   │   ├── 回款单撤销认领.docx
│   │   └── 删除已撤销认领回款单据.docx
│   ├── 基础档案_*
│   │   ├── 账款管理-新增客户.docx
│   │   ├── 账款管理-编辑客户.docx
│   │   └── 账款管理-删除客户API.docx
│   ├── 收入确认单新增.docx
│   ├── 收入确认单作废.docx
│   ├── 删除收入确认单.docx
│   ├── 启_停用下游单据生成计划.docx
│   └── 银行流水详情.docx
└── 应收应付_账款管理_常见问题_* (多个FAQ文档)
```

### 6.3 低开组件文档

```
资料/低开组件文档/
├── PC端组件_容器组件_*
├── PC端组件_展示组件_*
├── PC端组件_数据组件_*
├── PC端组件_表单组件_*
└── PC端组件_OA组件_*
```

---

## 6. 低开平台运行时逻辑（xft_demo.cmburl.cn.zip 分析）

> 以下内容为对 `xft_demo.cmburl.cn.zip` 中低开平台运行时资源的分析整理，用于理解平台如何渲染外部应用页面。

### 6.1 平台架构

薪福通低开平台采用 **Page + iframe srcdoc** 的嵌入架构：

```
┌─────────────────────────────────────────┐
│  薪福通低开平台 (xft-demo.cmburl.cn)      │
│  ┌─────────────────────────────────────┐│
│  │  Page 容器                          ││
│  │  ┌───────────────────────────────┐  ││
│  │  │ iframe (srcdoc)               │  ││
│  │  │  ┌─────────────────────────┐  │  ││
│  │  │  │ 科沃斯ERP应用            │  │  ││
│  │  │  │ (kewocs-erp.pages.dev)   │  │  ││
│  │  │  └─────────────────────────┘  │  ││
│  │  └───────────────────────────────┘  ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

### 6.2 页面渲染流程

#### 7.2.1 页面配置获取

- **接口**: `GET /xcodegw/app/{appId}/tag/{env}/page/{pageKey}/render`
- **示例**: `https://xft-demo.cmburl.cn/xcodegw/app/580bdb85-42a8-425e-974d-ab780bd5872a/tag/uat/page/PAScRQP6OG/render`
- **响应**: 返回页面配置 JSON，包含 `body` 和 `events`

#### 7.2.2 页面配置结构

```json
{
  "returnCode": "SUC0000",
  "body": {
    "name": "首页",
    "type": 1,
    "terminal": "PC",
    "pageKey": "PAScRQP6OG",
    "body": {
      "eventMode": "code",
      "id": "12688b4529cb",
      "body": [],
      "type": "Page",
      "events": {
        "onMount": [{"code": "...", "type": "code"}]
      }
    }
  }
}
```

#### 7.2.3 onMount 事件（iframe 创建）

平台在页面 `onMount` 事件中执行以下逻辑：

```javascript
// 1. 获取屏幕分辨率
var currentWindow = env.getCurrentWindow();
var screenWidth = currentWindow.screen.width;
var screenHeight = currentWindow.screen.height;

// 2. 获取页面容器
var container = document.getElementsByClassName("xcode-pc-page")[0];

// 3. 创建 iframe
iframe = document.createElement('iframe');
iframe.setAttribute('id', 'myframe');
iframe.frameBorder = '0';

// 4. 设置容器和 iframe 尺寸
container.setAttribute('style', 'width: ' + screenWidth + '; height: ' + screenHeight + 'px;');
container.style.padding = "0px 0px";
iframe.setAttribute('style', 'width: 100%; height: 100%; position: relative;');

// 5. 解码 base64 HTML 内容并设置 srcdoc
var htmlContent = base64Decode("...");  // 我们的 index.srcdoc.html
iframe.srcdoc = htmlContent;

// 6. 追加到容器
container.appendChild(iframe);
```

#### 7.2.4 嵌入的 HTML 内容

base64 解码后的 HTML（即我们的 `index.srcdoc.html`）：

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="https://kewocs-erp.pages.dev/logo.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>科沃斯ERP - SN码管理系统</title>
    <script type="module" crossorigin src="https://kewocs-erp.pages.dev/assets/main-xxx.js"></script>
    <link rel="stylesheet" crossorigin href="https://kewocs-erp.pages.dev/assets/main-xxx.css">
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

**关键特性**：
- 使用 `crossorigin` 属性支持 CORS
- JS 和 CSS 从 `kewocs-erp.pages.dev` CDN 加载
- 应用运行在 `about:srcdoc` 环境中

### 6.3 认证机制

#### 7.3.1 当前用户获取

- **接口**: `GET /xcodegw/xft/api/auth/currentUser`
- **Cookie**: 自动携带 `JSESSIONID`
- **Headers**:
  - `X-APP-TYPE: xcode`
  - `Accept: application/json`

**响应结构**：

```json
{
  "returnCode": "SUC0000",
  "body": {
    "name": "用户名",
    "nickName": "昵称",
    "userNo": "用户编号",
    "loginName": "登录名",
    "userId": "用户ID",
    "deptId": "部门ID",
    "corpId": "企业ID",
    "appRoles": ["角色1", "角色2"]
  }
}
```

#### 7.3.2 认证要点

| 要点 | 说明 |
|------|------|
| Cookie 自动携带 | `credentials: 'include'` |
| Session 维持 | 依赖 `JSESSIONID` Cookie |
| 跨域限制 | 应用运行在 `about:srcdoc`，通过 `parent.location.host` 判断环境 |
| 无需手动 Token | 平台自动处理认证，前端只需确保 `credentials: 'include'` |

### 6.4 系统参数配置

平台提供标准系统参数接口：

- **接口**: `GET /xcodegw/xft/api/common/data/SYSPARAM.json`
- **内容**: 包含银行类型代码、账户类型代码等基础数据

**常用参数**：

| 参数代码 | 说明 |
|----------|------|
| `ACBACKND` | 账户种类（活期/定期/通知等） |
| `ACBNKTYP` | 银行类型（招商银行、工商银行等） |

### 7.5 组件库

#### 7.5.1 组件库加载

- **路径**: `s3gw.cmbimg.com/lt5220-material-prd/{appId}/xft-pc-comps/{version}/dist/`
- **示例**: `xft-pc-comps/3.3.1/dist/index.xcode.min.js`
- **体积**: 约 9.8MB（包含 antd、React、Router 等）

#### 7.5.2 组件库依赖

组件库基于以下技术栈构建：

| 依赖 | 用途 |
|------|------|
| React + ReactDOM | UI 框架 |
| ReactRouter | 路由管理 |
| antd / antdMobile | UI 组件 |
| axios | HTTP 请求 |
| moment | 日期处理 |
| ahooks | React Hooks |
| lodash (_) | 工具函数 |

### 7.6 环境判断

在 `about:srcdoc` 环境下，应用通过以下方式判断当前环境：

```javascript
// 获取父页面域名
const parentHost = parent.location.host;

// 环境判断
if (parentHost.includes('xft-demo.cmburl.cn')) {
  // UAT 测试环境
} else if (parentHost.includes('xft.cmbchina.com')) {
  // PRD 生产环境
}
```

### 7.7 运行时约束

| 约束 | 说明 | 应对方案 |
|------|------|----------|
| `about:srcdoc` 协议 | 无法使用 `history.pushState` | 使用 Hash 路由替代 |
| SecurityError | `replaceState` 被禁止 | 移除 Vue Router，手动监听 `hashchange` |
| 跨域资源 | JS/CSS 需要 CORS | 添加 `crossorigin` 属性，部署到支持 CORS 的 CDN |
| 无 localStorage | 部分浏览器限制 | 使用内存状态管理，避免持久化 |

### 7.8 关键文件清单（xft_demo 包内）

| 文件 | 说明 |
|------|------|
| `page/{pageKey}/render.html` | 页面渲染配置（含 iframe 创建逻辑） |
| `xft/api/auth/currentUser` | 当前用户信息 |
| `xft/api/common/data/SYSPARAM.json` | 系统参数 |
| `xft-pc-comps/{version}/dist/index.xcode.min.js` | PC 端组件库 |
| `kewocs-erp.pages.dev/assets/*.js` | 科沃斯ERP应用JS |
| `kewocs-erp.pages.dev/assets/*.css` | 科沃斯ERP应用CSS |

---

## 7. 移动端版本

### 8.1 方案概述
在**不改变 PC 端代码**的前提下，新增移动端版本：
- 使用 Vant 4 移动端组件库
- 复用 `src/api/` 所有 API 函数
- Vite 多入口构建（`index.html` + `mobile.html`）

### 8.2 低开平台配置

创建 **两个独立页面**：

**PC端页面**：
```html
<!-- srcdoc 内容取 dist/index.srcdoc.html -->
<script src="https://kewocs-erp.pages.dev/assets/index-xxx.js"></script>
<link rel="stylesheet" href="https://kewocs-erp.pages.dev/assets/index-xxx.css">
```

**移动端页面**：
```html
<!-- srcdoc 内容取 dist/mobile.srcdoc.html -->
<script src="https://kewocs-erp.pages.dev/assets/mobile-xxx.js"></script>
<link rel="stylesheet" href="https://kewocs-erp.pages.dev/assets/mobile-xxx.css">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

### 8.3 构建产物对比

| 产物 | PC端 | 移动端 |
|------|------|--------|
| 入口 HTML | `dist/index.html` | `dist/mobile.html` |
| srcdoc HTML | `dist/index.srcdoc.html` | `dist/mobile.srcdoc.html` |
| JS 体积 | ~1.2MB（全功能） | ~42KB（仅3个页面） |
| CSS 体积 | ~364KB（Element Plus） | ~202KB（Vant） |
| 共享 chunk | Vue 运行时（~93KB） | Vue 运行时（~93KB） |

### 8.4 移动端功能

仅实现3个高频核心功能：

| 功能 | 页面 | 说明 |
|------|------|------|
| 扫码入库 | `src-mobile/views/Purchase/StockIn.vue` | 选择供应商/仓库 → 扫描SN → 确认入库 |
| 扫码出库 | `src-mobile/views/Sale/StockOut.vue` | 选择客户/仓库 → 扫描SN → 确认出库 → 推送应收 |
| 销售退货 | `src-mobile/views/Return/SaleReturn.vue` | 扫描已出库SN → 选择原因 → 确认退货 → 删除应收 |

---

## 更新记录

| 日期 | 更新内容 |
|------|---------|
| 2025-05-24 | 新增移动端版本（Vant 4 + 多入口构建） |
| 2025-05-24 | 新增低开平台运行时逻辑分析（xft_demo.cmburl.cn.zip） |
| 2024-01-01 | 初始整理 |
