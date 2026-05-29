# 薪福通低开平台引入 JS 库功能分析报告

> 基于 `xft_demo.cmburl.cn (1)_20260525193957077.zip` 分析
> 分析时间：2026-05-25

## 一、低开平台 JS 资源全景

zip 包共 61 个文件，其中 **JS 36 个、CSS 8 个、HTML 12 个**。JS 总大小约 **24 MB**，主要来自薪福通官方 CDN（`s3gw.cmbimg.com`）。

### 按来源分类

| 来源 | 文件数 | 说明 |
|------|--------|------|
| `s3gw.cmbimg.com/lt5401-library-prd-...` | 15 | 薪福通公共静态资源库（React/工具库/echarts） |
| `s3gw.cmbimg.com/lt5220-material-prd/...` | 8 | 薪福通物料市场（xft-m-comps、preview 插件） |
| `xft-demo.cmburl.cn/xcodeapp/...` | 5 | 低开平台自身业务代码 |
| `s3gwuat.cmbimg.com/...` | 1 | 开发环境主逻辑（3.4MB） |
| `kewocs-erp.pages.dev/...` | 2 | 本项目 CDN 产物（mobile.js + plugin helper） |

---

## 二、低开平台引入的 JS 库清单

### 2.1 React 生态（低开平台核心框架）

这些库是低开平台自身的运行依赖，**与 Vue 项目无关**。

| 库名 | 版本 | 大小 | 全局变量 | 说明 |
|------|------|------|----------|------|
| react | 18.2.0 | 10.5 KB | `window.React` | React 核心 |
| react-dom | 18.2.0 | 129 KB | `window.ReactDOM` | React DOM 渲染 |
| react-router | 6.4.3 | 14.2 KB | `window.ReactRouter` | React 路由 |
| react-router-dom | 6.4.3 | 15.8 KB | `window.ReactRouterDOM` | React 路由 DOM 绑定 |
| @remix-run/router | 1.0.3 | 33.6 KB | - | React Router 底层 |
| mobx | 6.7.0 | 49.4 KB | `window.mobx` | 状态管理 |
| mobx-react | 7.6.0 | 11.1 KB | - | MobX React 绑定 |
| mobx-react-lite | 3.4.3 | 4.4 KB | - | MobX 轻量绑定 |
| ahooks | 3.7.2 | 129 KB | `window.ahooks` | React Hooks 工具库 |

> 注：react + react-dom + react-router 被打包在 `react-reactRouter.js`（369KB）中；
> moment + ahooks + axios + lodash + mobx 被打包在 `moment-ahooks-axios-lodash-mobx.js`（1MB）中。

### 2.2 UI 组件库（React 基础）

| 库名 | 版本 | 大小 | 全局变量 | 说明 |
|------|------|------|----------|------|
| antd | 4.24.5 | 915 KB | `window.antd` | PC 端 React 组件库 |
| antd-mobile | 5.26.0 | 445 KB | `window.antdMobile` | 移动端 React 组件库 |
| @antd-design/icons | 4.8.0 | 816 KB | `window.icons` | Ant Design 图标 |
| react-quill | 2.0.0 | 254 KB | - | 富文本编辑器 |

> 这些组件库基于 React，**Vue 项目无法直接渲染使用**。

### 2.3 薪福通自有组件/插件

| 库名 | 大小 | 全局变量 | 说明 |
|------|------|----------|------|
| xft-m-comps | **7.1 MB** | `window.xcodeComponents` | 薪福通移动端组件库 |
| xft-oa-process-comps | **6.1 MB** | - | OA 流程组件库 |
| xft-preview-qr-code | 273 KB | - | 预览二维码插件 |
| preview-pc-role-mock | 29.9 KB | - | PC 预览角色模拟 |
| preview-mobile-device-mock | 10 KB | - | 移动端设备模拟 |
| preview-mobile-role-mock | 15.1 KB | - | 移动端角色模拟 |
| preview-mobile-scale-change | 11.5 KB | - | 移动端缩放控制 |
| themePreviewSchema/mobile.js | 67.6 KB | - | 移动端主题预览配置 |

#### xft-m-comps 导出组件清单

通过分析 `index.xcode.min.js` 尾部，xft-m-comps 导出了以下组件（挂载在 `window.xcodeComponents`）：

- **表单类**：MForm, MInput, MTextArea, MNumber, MSelect, MSelector, MDate, MDateRange, MTime, MUpload, MImage, MRadio, MCheckbox, MSwitch, MRate, MSlider, MCascade, MTreeSelect, MTable, MSearch, MText, MButton
- **展示类**：MChart（图表）, MIcon（图标）, MQRCode（二维码）, MProgress（进度条）, MSteps（步骤条）, MCarousel（轮播）, MTag（标签）, MCalendar（日历）, MDivider（分割线）
- **功能类**：MIframe, MMapping, MVideo, XftMAreaCascader, XftMPosSelect, XftMStationSelect, XftMBI, MProcessForm, MProcessTable, XftMProcessTrial
- **特殊**：MPhoneNumber, MTelephoneNumber, MBankCard

> 这些组件都是 **React 组件**，Vue 项目无法直接渲染。

### 2.4 通用工具库（跨框架可用）

| 库名 | 版本 | 大小 | 全局变量 | 说明 |
|------|------|------|----------|------|
| **echarts** | **5.4.3** | **1 MB** | `window.echarts` | 图表库 |
| lodash | 4.17.21 | 71.5 KB | `window._` | 工具函数库 |
| moment | 2.29.4 | 360 KB | `window.moment` | 日期处理库 |
| axios | 0.27.2 | 20.3 KB | `window.axios` | HTTP 请求库 |
| systemjs | 6.7.1 | 34.4 KB | `window.System` | UMD 模块加载器 |

### 2.5 低开平台业务代码

| 文件 | 大小 | 说明 |
|------|------|------|
| `main.041b5c60.js` | 1 MB | 低开移动端主逻辑 |
| `main.d85089b2.js` | 3.4 MB | 低开开发平台主逻辑 |
| `299.7b2bae83.chunk.js` | 181 KB | 移动端 chunk |
| `392.8fccec12.chunk.js` | 1 MB | 移动端 chunk |
| `env_front.js` | 0.7 KB | 环境常量配置 |
| `common.js` | 287 KB | XFT 通用工具（实际是 HTML 入口） |

### 2.6 本项目产物

| 文件 | 大小 | 说明 |
|------|------|------|
| `mobile.js` | 574 KB | 本项目移动端构建产物 |
| `_plugin-vue_export-helper.js` | 93.9 KB | Vite Vue 插件辅助代码 |

---

## 三、可被项目直接复用的库

由于 iframe sandbox 配置了 **`allow-same-origin`**，iframe 内页面与父页面同源，可以通过 `window.parent` 或 `window.top` 访问父窗口（低开平台页面）上挂载的全局变量。

### 3.1 强烈推荐复用：echarts

| 项目 | 说明 |
|------|------|
| 全局变量 | `window.top.echarts` 或 `window.parent.echarts` |
| 版本 | 5.4.3 |
| 大小 | 约 1 MB（已加载，无需重复下载） |
| 可用性 | 低开平台 PC 端和移动端均全局引入 |
| 使用方式 | `const echarts = window.top.echarts;` |

**为什么推荐**：
- 项目当前没有安装 echarts（package.json 中无依赖）
- 如果未来需要图表（销售报表、库存报表、SN 流转报表），可以直接复用，无需自己打包
- 可节省约 1 MB 构建体积

**验证代码**：
```js
// 在 iframe 内（Vue 组件中）
const echarts = window.top.echarts || window.parent.echarts;
if (echarts) {
  const chart = echarts.init(document.getElementById('chart'));
  chart.setOption({ ... });
} else {
  console.warn('echarts not available');
}
```

### 3.2 可选复用：lodash

| 项目 | 说明 |
|------|------|
| 全局变量 | `window.top._` 或 `window.parent._` |
| 版本 | 4.17.21 |
| 大小 | 71.5 KB |

**为什么不强烈推荐**：
- Vue 3 项目通常不需要 lodash，现代 JavaScript 原生 API 已覆盖大部分场景
- 如果确实需要复杂数据处理（deepClone、debounce、throttle 等），可以按需取用

### 3.3 可选复用：moment

| 项目 | 说明 |
|------|------|
| 全局变量 | `window.top.moment` 或 `window.parent.moment` |
| 版本 | 2.29.4 |
| 大小 | 360 KB |

**为什么不强烈推荐**：
- moment 已进入维护模式，官方推荐迁移到 dayjs 或 date-fns
- 项目已安装 dayjs（`"dayjs": "^1.11.10"`），Element Plus 也依赖 dayjs
- 仅当需要 moment 特有的功能（如复杂 locale 处理）时才考虑复用

### 3.4 可读但一般不复用：axios

| 项目 | 说明 |
|------|------|
| 全局变量 | `window.top.axios` 或 `window.parent.axios` |
| 版本 | 0.27.2 |

- 项目已安装 axios 1.6.7，版本更新，没有必要复用父页面的旧版本

### 3.5 可读但不可用：xcodeComponents

| 项目 | 说明 |
|------|------|
| 全局变量 | `window.top.xcodeComponents` |
| 大小 | 7.1 MB |

- xft-m-comps 导出的都是 **React 组件**，Vue 项目无法直接渲染
- 其中 `MQRCode` 等组件如果提供了纯函数工具方法，理论上可复用，但需要深入分析源码
- **结论：当前不建议复用**，如需二维码等功能，建议自己引入轻量库

### 3.6 可读配置：xcodeConstant

| 项目 | 说明 |
|------|------|
| 全局变量 | `window.top.xcodeConstant` |

- 包含低开平台环境配置（LOGIN_PATH、DEV_NET_URL、MATERIAL_S3GW_URL 等）
- 项目一般不需要读取这些配置

---

## 四、复用方案总结

### 4.1 可直接复用的库清单

| 库 | 获取方式 | 推荐指数 | 备注 |
|---|---------|---------|------|
| echarts | `window.top.echarts` | ⭐⭐⭐⭐⭐ | 省 1MB，图表必备 |
| lodash | `window.top._` | ⭐⭐ | 工具函数，按需使用 |
| moment | `window.top.moment` | ⭐ | 已过时，有 dayjs 替代 |
| axios | `window.top.axios` | ⭐ | 项目已有新版 |

### 4.2 不可复用的库清单

| 库 | 原因 |
|---|------|
| React / ReactDOM | Vue 项目不需要 React 运行时 |
| React Router | Vue 项目使用 vue-router |
| MobX | Vue 使用 Pinia 响应式系统 |
| ahooks | React Hooks 专用 |
| antd / antd-mobile | React 组件库，Vue 无法渲染 |
| xft-m-comps | React 组件库，Vue 无法渲染 |
| xft-oa-process-comps | React 组件库，Vue 无法渲染 |
| react-quill | React 富文本组件 |

### 4.3 未来引入 echarts 时的建议

如果项目后续要在报表页面（销售汇总、库存明细、SN 流转）中使用图表：

**方案 A：复用低开平台的 echarts（推荐）**

```js
// src/utils/echarts.js
export function getEcharts() {
  const echarts = window.top?.echarts || window.parent?.echarts;
  if (!echarts) {
    throw new Error('echarts not available in parent window');
  }
  return echarts;
}

// 在组件中使用
import { getEcharts } from '@/utils/echarts.js';

onMounted(() => {
  const echarts = getEcharts();
  const chart = echarts.init(chartRef.value);
  chart.setOption({ ... });
});
```

**方案 B：自己安装 echarts（不推荐）**

```bash
pnpm add echarts
```

- 增加约 1 MB 构建体积
- 与低开平台重复加载同一库

---

## 五、其他发现

### 5.1 SystemJS 模块加载器

低开平台引入了 SystemJS 6.7.1（`window.System`），用于运行时加载 UMD 模块。如果项目需要动态加载某些第三方 UMD 库，可以考虑复用父页面的 SystemJS，但一般情况下 Vite 的 ESM 构建不需要它。

### 5.2 薪福通预览插件

zip 包中包含多个 `preview-*` 插件（设备模拟、角色模拟、二维码），这些是低开平台**预览模式**下使用的开发调试工具，对生产环境无意义。

### 5.3 低开平台主代码

`main.041b5c60.js`（1MB）和 `392.chunk.js`（1MB）是低开平台自身的业务逻辑，包含页面渲染、模型方法调用、权限控制等。这些代码封装了低开平台的运行时，**没有对外暴露可直接调用的 API**（除通过 iframe postMessage 外）。

---

## 六、结论

**当前阶段，项目最值得复用的只有 echarts。**

- 如果后续报表页面需要图表，直接使用 `window.top.echarts`，无需安装和打包
- 其他库（lodash、moment、axios）要么项目已有替代方案，要么版本较旧，复用价值不高
- React 生态的所有库（antd、xft-m-comps 等）均基于 React，与 Vue 3 项目不兼容，无法复用
