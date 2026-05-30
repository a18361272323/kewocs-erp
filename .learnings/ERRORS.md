
# Errors

Command failures and integration errors.

---

## [2026-05-30 13:03:03] 近期错误记录

### E1: Cloudflare Pages 构建失败 — Vue SFC 乱码编译错误
| 属性 | 值 |
|------|-----|
| **日期** | 2026-05-29 多次 |
| **错误信息** | [vite:vue] src/views/Sale/SaleOrder.vue (7:48): Attribute name cannot contain U+0022 |
| **根因** | GBK→UTF-8 转换后注释中残留 ? (0x3F)，Vue compiler 解析失败 |
| **修复** | PowerShell .NET 直接替换所有 ???? 注释为正确中文 |
| **预防** | 推送前 g '\?\?\?' src/ 扫描 |

### E2: Cloudflare Pages 构建失败 — Missing semicolon
| 属性 | 值 |
|------|-----|
| **日期** | 2026-05-29 |
| **错误信息** | [vue/compiler-sfc] Missing semicolon. (1:46) @ Warehouse.vue |
| **根因** | 文件换行符在编码转换中丢失，template/style/script 合并成单行 |
| **修复** | 从 git 历史恢复正确的 Warehouse.vue 文件 |

### E3: Cloudflare Pages 构建失败 — Identifier 'res' already declared
| 属性 | 值 |
|------|-----|
| **日期** | 2026-05-29 |
| **错误信息** | Identifier 'res' has already been declared. (118:10) @ Warehouse.vue |
| **根因** | 恢复 Warehouse.vue 时残留重复的 const res = isEdit.value 行 |
| **修复** | 删除重复声明行 |

### E4: Rollup 构建失败 — Expression expected
| 属性 | 值 |
|------|-----|
| **日期** | 2026-05-29 |
| **错误信息** | src/api/financeSync.js (121:5): Expression expected — 残留 || '0' 孤立表达式 |
| **根因** | 乱码修复时误删了变量名，留下孤立值 |
| **修复** | 补全 social_credit_code: item.socialCreditCode || '0' |

### E5: 仓库新建报错 — Jo.create is not a function
| 属性 | 值 |
|------|-----|
| **状态** | ✅ 已修复 (2026-05-30) |
| **错误信息** | TypeError: Jo.create is not a function |
| **可能原因** | warehouseApi.create 的别名映射问题 |

### E6: Dashboard 统计数据报错 — forEach is not a function
| 属性 | 值 |
|------|-----|
| **状态** | ✅ 已修复 (2026-05-30) |
| **错误信息** | [Dashboard] 获取统计数据失败: TypeError: t.forEach is not a function |
| **可能原因** | API 返回了对象而非数组，需要加 es.body?.list 兼容 |

### E7: 工具使用问题 — Python 文件写入被回退
| 属性 | 值 |
|------|-----|
| **环境** | Windows + Codex Desktop |
| **现象** | Python open().write() 后文件立即被回退到原始内容 |
| **绕过方案** | 使用 [System.IO.File]::WriteAllText() PowerShell .NET API |
| **影响** | StockIn.vue 乱码修复耗时过长，多次尝试 Python 写入均失败 |

---

## [2026-05-30 17:00] 构建失败记录

### Cloudflare Pages 构建失败 #4
- **Commit**: 04e7345 (排除无关文件)
- **错误**: `Unexpected character '，'. (63:28)` in Supplier.vue
- **根因**: 模板字符串中使用了中文逗号，babel parser 无法解析
- **修复**: 替换中文逗号为英文逗号

### Cloudflare Pages 构建失败 #5
- **Commit**: 93e6d0c (ERRORS 归档)
- **错误**: `Missing semicolon (1:46)` in Warehouse.vue
- **根因**: apply_patch 写入导致整个文件换行符丢失，所有 import 语句连成一行
- **修复**: 用 PowerShell WriteAllText 重写完整文件内容

### Cloudflare Pages 构建失败 #6
- **Commit**: 98687aa (恢复 Warehouse.vue)
- **错误**: `Identifier 'res' has already been declared (118:10)` in Warehouse.vue
- **根因**: apply_patch 修改时残留了重复的 `const res = isEdit.value` 声明
- **修复**: 删除重复行

### Cloudflare Pages 构建失败 #7
- **Commit**: 0fe680a (字段映射修复)
- **错误**: `Expression expected` in financeSync.js:121
- **根因**: 残留了 ` || '0'` 片段（上一条语句的尾部被截断后残留）
- **修复**: 删除残留代码

### 移动端运行时错误
- **错误**: `No value specified for parameter 5` (getLowStockCount method)
- **模型**: MOsWdYRJhQ, method FUhzR97DOC
- **根因**: 方法需要 5 个参数，前端传递不完整
- **修复方向**: 参考 MODEL_REFERENCE.md 确认方法入参定义
- **状态**: 待修复

### Dashboard 运行时错误
- **错误**: `t.forEach is not a function` at getStats
- **模型**: MOsWdYRJhQ, method (getStats)
- **根因**: API 返回的统计数据格式不是数组
- **状态**: 待修复