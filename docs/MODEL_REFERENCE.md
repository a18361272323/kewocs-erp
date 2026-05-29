# 低开平台数据模型参考手册

> 从 `新建文本文档 (3).txt` 提取的结构化数据
> 
> **共 21 个模型，涵盖 SN码管理、采购、销售、仓库、财务等业务域**

---

## 模型目录

- [财务流水对接表](#MO08KyO9eU)
- [库存台账表](#MOsWdYRJhQ)
- [盘点单明细表](#MO0T3mVifs)
- [盘点单主表](#MO5WOkA9SX)
- [调拨单明细表](#MOORe8J0Dl)
- [调拨单主表](#MOIrlRmiFH)
- [销售退货单明细表](#MOHwXl5rMK)
- [销售退货单主表](#MOky0Pcw6W)
- [采购退货单明细表](#MOkM8P1d1B)
- [采购退货单主表](#MOV8t2Ah9X)
- [销售出库单明细表](#MOg8t6pKm4)
- [销售出库单主表](#MOenA360T5)
- [采购入库单明细表](#MOc2tEbUGK)
- [采购入库单主表](#MOIN9eD2au)
- [SN操作日志表](#MOqg2psiTa)
- [SN码表](#MOk2ZJ4aga)
- [账户](#MOAusBgPiT)
- [仓库](#MO3LPiTHMU)
- [商品](#MOeUIsmD4j)
- [客户](#MOj7UPuJx2)
- [供应商表](#MOmke9xgeH)

---

## 财务流水对接表

| 属性 | 值 |
|------|-----|
| modelKey | `MO08KyO9eU` |
| modelNameEn | `finance_flow` |
| tableName | `finance_flow` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 长度 | 说明 |
|---------|---------|---------|-----------|------|------|------|
| remark | 备注 | 长文本 | varchar(1024) | 否 | 1024 |  |
| external_bill_status | 外部账单状态 | 短文本 | varchar(255) | 否 | 255 |  |
| external_bill_no | 外部账单号 | 短文本 | varchar(255) | 否 | 255 |  |
| sync_time | 同步时间 | 日期时间 | datetime | 否 |  |  |
| sync_status | 同步状态 | 短文本 | varchar(255) | 否 | 255 |  |
| due_date | 到期日期 | 日期时间 | datetime | 否 |  |  |
| bill_date | 单据日期 | 日期时间 | datetime | 否 |  |  |
| balance_amount | 待核销金额 | 整数 | int | 否 |  |  |
| paid_amount | 已核销金额 | 整数 | int | 否 |  |  |
| amount | 应收应付金额 | 整数 | int | 否 |  |  |
| counterparty_name | 客户名称 | 短文本 | varchar(255) | 否 | 255 |  |
| counterparty_code | 客户编码 | 短文本 | varchar(255) | 否 | 255 |  |
| counterparty_id | 客户ID | 整数 | int | 否 |  |  |
| counterparty_type | 往来单位类型 | 短文本 | varchar(255) | 否 | 255 |  |
| biz_type | 业务类型 | 短文本 | varchar(255) | 否 | 255 |  |
| source_no | 来源单号 | 短文本 | varchar(255) | 否 | 255 |  |
| source_type | 来源类型 | 短文本 | varchar(255) | 否 | 255 |  |
| flow_no | 流水号唯一 | 短文本 | varchar(255) | 否 | 255 |  |
| id | 唯一标识 | 整数 | int | 是 |  | 唯一标识 |
| creator | 创建人 | 短文本 | varchar(255) | 是 | 255 | 创建人姓名 |
| created_at | 创建时间 | 日期时间 | timestamp | 是 |  | 创建时间 |
| updater | 更新人 | 短文本 | varchar(255) | 是 | 255 | 更新人姓名 |
| updated_at | 更新时间 | 日期时间 | timestamp | 是 |  | 更新时间 |
| is_deleted | 是否删除 | 布尔 | tinyint | 是 |  | 是否已删除 |
| deleted_at | 删除时间 | 日期时间 | timestamp | 是 |  | 删除时间 |

### 方法定义

| 方法名称 | methodKey | 类型 |
|---------|-----------|------|
| getSummaryByType | `FUilTGHdFd` | SQL |
| getCounterpartySummary | `FUCxUCbjdm` | SQL |
| getTodaySummary | `FUH9BA8mXe` | SQL |
| 列表查询 | `FUC3UiW4pU` | GUI |
| 新增 | `FUPktENU4l` | GUI |
| 编辑 | `FUv6I0mjhC` | GUI |
| 查看详情 | `FUqDwSMSGq` | GUI |
| 删除 | `FUkRzzgZ8H` | GUI |
| 批量删除 | `FUxySmGeBj` | GUI |
| 批量导出 | `FUIx58oD8g` | GUI |
| 批量导入 | `FUIJibQIpw` | GUI |

### 方法详情（含SQL实现）

#### getSummaryByType

- **methodKey**: `FUilTGHdFd`
- **类型**: SQL
- **说明**: 无

```sql
{'statementType': 'SELECT', 'dsl': {'select': [{'field': 'source_type'}, {'args': [{'field': 'amount'}], 'func': 'SUM', 'alias': 'total_amount'}, {'args': [{'field': '*'}], 'func': 'COUNT', 'alias': 'count'}], 'statement': 'SELECT', 'where': {'children': [{'op': '=', 'left': {'field': 'is_deleted'}, 'right': 0}], 'operator': 'AND'}, 'groupBy': [{'field': 'source_type'}], 'modelKey': 'MO08KyO9eU'}, 'sql': 'SELECT\n        source_type, SUM(amount) AS total_amount, COUNT(*) AS count \n    FROM\n        kdvu2maaiaaa_dev_finance_flow \n    WHERE\n        is_deleted = 0 GROUP BY source_type'}
```

#### getCounterpartySummary

- **methodKey**: `FUCxUCbjdm`
- **类型**: SQL
- **说明**: 无

```sql
{'statementType': 'SELECT', 'dsl': {'select': [{'field': 'counterparty_type'}, {'field': 'counterparty_id'}, {'field': 'counterparty_name'}, {'args': [{'field': 'amount'}], 'func': 'SUM', 'alias': 'total_amount'}, {'args': [{'field': '*'}], 'func': 'COUNT', 'alias': 'count'}], 'statement': 'SELECT', 'where': {'children': [{'op': '=', 'left': {'field': 'is_deleted'}, 'right': 0}, {'op': '=', 'left': {'field': 'counterparty_id'}, 'right': '@counterparty_id'}], 'operator': 'AND'}, 'groupBy': [{'field': 'counterparty_type'}, {'field': 'counterparty_id'}, {'field': 'counterparty_name'}], 'modelKey': 'MO08KyO9eU'}, 'sql': 'SELECT\n        counterparty_type, counterparty_id, counterparty_name, SUM(amount) AS total_amount, COUNT(*) AS count \n    FROM\n        kdvu2maaiaaa_dev_finance_flow \n    WHERE\n        is_deleted = 0  AND counterparty_id = @counterparty_id GROUP BY counterparty_type, counterparty_id, counterparty_name'}
```

#### getTodaySummary

- **methodKey**: `FUH9BA8mXe`
- **类型**: SQL
- **说明**: 无

```sql
{'statementType': 'SELECT', 'dsl': {'select': [{'field': 'source_type'}, {'args': [{'field': 'amount'}], 'func': 'SUM', 'alias': 'total_amount'}], 'statement': 'SELECT', 'where': {'children': [{'op': '=', 'left': {'field': 'is_deleted'}, 'right': 0}, {'op': '=', 'left': {'args': [{'field': 'created_at'}], 'func': 'DATE'}, 'right': {'func': 'CURDATE'}}], 'operator': 'AND'}, 'groupBy': [{'field': 'source_type'}], 'modelKey': 'MO08KyO9eU'}, 'sql': 'SELECT\n        source_type, SUM(amount) AS total_amount \n    FROM\n        kdvu2maaiaaa_dev_finance_flow \n    WHERE\n        is_deleted = 0  AND DATE(created_at) = CURDATE() GROUP BY source_type'}
```

#### 列表查询

- **methodKey**: `FUC3UiW4pU`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"external_bill_status","right":{"valueType":"1","value":"external_bill_status"}},{"field":"external_bill_no","right":{"valueType":"1","value":"external_bill_no"}},{"field":"sync_time","right":{"valueType":"1","value":"sync_time"}},{"field":"sync_status","right":{"valueType":"1","value":"sync_status"}},{"field":"due_date","right":{"valueType":"1","value":"due_date"}},{"field":"bill_date","right":{"valueType":"1","value":"bill_date"}},{"field":"balance_amount","right":{"valueType":"1","value":"balance_amount"}},{"field":"paid_amount","right":{"valueType":"1","value":"paid_amount"}},{"field":"amount","right":{"valueType":"1","value":"amount"}},{"field":"counterparty_name","right":{"valueType":"1","value":"counterparty_name"}},{"field":"counterparty_code","right":{"valueType":"1","value":"counterparty_code"}},{"field":"counterparty_id","right":{"valueType":"1","value":"counterparty_id"}},{"field":"counterparty_type","right":{"valueType":"1","value":"counterparty_type"}},{"field":"biz_type","right":{"valueType":"1","value":"biz_type"}},{"field":"source_no","right":{"valueType":"1","value":"source_no"}},{"field":"source_type","right":{"valueType":"1","value":"source_type"}},{"field":"flow_no","right":{"valueType":"1","value":"flow_no"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"external_bill_status"},"right":{"valueType":"1","value":"@external_bill_status"},"config":{"test":"CONTAINSKEY(__params, \\"external_bill_status\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"external_bill_no"},"right":{"valueType":"1","value":"@external_bill_no"},"config":{"test":"CONTAINSKEY(__params, \\"external_bill_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"sync_time"},"right":{"valueType":"1","value":["@sync_time_start","@sync_time_end"]},"config":{"test":"CONTAINSKEY(__params, \\"sync_time_start\\") || CONTAINSKEY(__params, \\"sync_time_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sync_status"},"right":{"valueType":"1","value":"@sync_status"},"config":{"test":"CONTAINSKEY(__params, \\"sync_status\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"due_date"},"right":{"valueType":"1","value":["@due_date_start","@due_date_end"]},"config":{"test":"CONTAINSKEY(__params, \\"due_date_start\\") || CONTAINSKEY(__params, \\"due_date_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"bill_date"},"right":{"valueType":"1","value":["@bill_date_start","@bill_date_end"]},"config":{"test":"CONTAINSKEY(__params, \\"bill_date_start\\") || CONTAINSKEY(__params, \\"bill_date_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"balance_amount"},"right":{"valueType":"1","value":"@balance_amount"},"config":{"test":"CONTAINSKEY(__params, \\"balance_amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"paid_amount"},"right":{"valueType":"1","value":"@paid_amount"},"config":{"test":"CONTAINSKEY(__params, \\"paid_amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"amount"},"right":{"valueType":"1","value":"@amount"},"config":{"test":"CONTAINSKEY(__params, \\"amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"counterparty_name"},"right":{"valueType":"1","value":"@counterparty_name"},"config":{"test":"CONTAINSKEY(__params, \\"counterparty_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"counterparty_code"},"right":{"valueType":"1","value":"@counterparty_code"},"config":{"test":"CONTAINSKEY(__params, \\"counterparty_code\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"counterparty_id"},"right":{"valueType":"1","value":"@counterparty_id"},"config":{"test":"CONTAINSKEY(__params, \\"counterparty_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"counterparty_type"},"right":{"valueType":"1","value":"@counterparty_type"},"config":{"test":"CONTAINSKEY(__params, \\"counterparty_type\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"biz_type"},"right":{"valueType":"1","value":"@biz_type"},"config":{"test":"CONTAINSKEY(__params, \\"biz_type\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"source_no"},"right":{"valueType":"1","value":"@source_no"},"config":{"test":"CONTAINSKEY(__params, \\"source_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"source_type"},"right":{"valueType":"1","value":"@source_type"},"config":{"test":"CONTAINSKEY(__params, \\"source_type\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"flow_no"},"right":{"valueType":"1","value":"@flow_no"},"config":{"test":"CONTAINSKEY(__params, \\"flow_no\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":true}}', 'methodConfig': '{"conditionExecuteStrategy":"notExecute"}'}
```

#### 新增

- **methodKey**: `FUPktENU4l`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'INSERT', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"}},{"left":{"field":"external_bill_status"},"right":{"valueType":"1","value":"@external_bill_status"}},{"left":{"field":"external_bill_no"},"right":{"valueType":"1","value":"@external_bill_no"}},{"left":{"field":"sync_time"},"right":{"valueType":"1","value":"@sync_time"}},{"left":{"field":"sync_status"},"right":{"valueType":"1","value":"@sync_status"}},{"left":{"field":"due_date"},"right":{"valueType":"1","value":"@due_date"}},{"left":{"field":"bill_date"},"right":{"valueType":"1","value":"@bill_date"}},{"left":{"field":"balance_amount"},"right":{"valueType":"1","value":"@balance_amount"}},{"left":{"field":"paid_amount"},"right":{"valueType":"1","value":"@paid_amount"}},{"left":{"field":"amount"},"right":{"valueType":"1","value":"@amount"}},{"left":{"field":"counterparty_name"},"right":{"valueType":"1","value":"@counterparty_name"}},{"left":{"field":"counterparty_code"},"right":{"valueType":"1","value":"@counterparty_code"}},{"left":{"field":"counterparty_id"},"right":{"valueType":"1","value":"@counterparty_id"}},{"left":{"field":"counterparty_type"},"right":{"valueType":"1","value":"@counterparty_type"}},{"left":{"field":"biz_type"},"right":{"valueType":"1","value":"@biz_type"}},{"left":{"field":"source_no"},"right":{"valueType":"1","value":"@source_no"}},{"left":{"field":"source_type"},"right":{"valueType":"1","value":"@source_type"}},{"left":{"field":"flow_no"},"right":{"valueType":"1","value":"@flow_no"}}]}'}
```

#### 编辑

- **methodKey**: `FUv6I0mjhC`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","require":false}},{"left":{"field":"external_bill_status"},"right":{"valueType":"1","value":"@external_bill_status"},"config":{"test":"CONTAINSKEY(__params, \\"external_bill_status\\")","require":false}},{"left":{"field":"external_bill_no"},"right":{"valueType":"1","value":"@external_bill_no"},"config":{"test":"CONTAINSKEY(__params, \\"external_bill_no\\")","require":false}},{"left":{"field":"sync_time"},"right":{"valueType":"1","value":"@sync_time"},"config":{"test":"CONTAINSKEY(__params, \\"sync_time\\")","require":false}},{"left":{"field":"sync_status"},"right":{"valueType":"1","value":"@sync_status"},"config":{"test":"CONTAINSKEY(__params, \\"sync_status\\")","require":false}},{"left":{"field":"due_date"},"right":{"valueType":"1","value":"@due_date"},"config":{"test":"CONTAINSKEY(__params, \\"due_date\\")","require":false}},{"left":{"field":"bill_date"},"right":{"valueType":"1","value":"@bill_date"},"config":{"test":"CONTAINSKEY(__params, \\"bill_date\\")","require":false}},{"left":{"field":"balance_amount"},"right":{"valueType":"1","value":"@balance_amount"},"config":{"test":"CONTAINSKEY(__params, \\"balance_amount\\")","require":false}},{"left":{"field":"paid_amount"},"right":{"valueType":"1","value":"@paid_amount"},"config":{"test":"CONTAINSKEY(__params, \\"paid_amount\\")","require":false}},{"left":{"field":"amount"},"right":{"valueType":"1","value":"@amount"},"config":{"test":"CONTAINSKEY(__params, \\"amount\\")","require":false}},{"left":{"field":"counterparty_name"},"right":{"valueType":"1","value":"@counterparty_name"},"config":{"test":"CONTAINSKEY(__params, \\"counterparty_name\\")","require":false}},{"left":{"field":"counterparty_code"},"right":{"valueType":"1","value":"@counterparty_code"},"config":{"test":"CONTAINSKEY(__params, \\"counterparty_code\\")","require":false}},{"left":{"field":"counterparty_id"},"right":{"valueType":"1","value":"@counterparty_id"},"config":{"test":"CONTAINSKEY(__params, \\"counterparty_id\\")","require":false}},{"left":{"field":"counterparty_type"},"right":{"valueType":"1","value":"@counterparty_type"},"config":{"test":"CONTAINSKEY(__params, \\"counterparty_type\\")","require":false}},{"left":{"field":"biz_type"},"right":{"valueType":"1","value":"@biz_type"},"config":{"test":"CONTAINSKEY(__params, \\"biz_type\\")","require":false}},{"left":{"field":"source_no"},"right":{"valueType":"1","value":"@source_no"},"config":{"test":"CONTAINSKEY(__params, \\"source_no\\")","require":false}},{"left":{"field":"source_type"},"right":{"valueType":"1","value":"@source_type"},"config":{"test":"CONTAINSKEY(__params, \\"source_type\\")","require":false}},{"left":{"field":"flow_no"},"right":{"valueType":"1","value":"@flow_no"},"config":{"test":"CONTAINSKEY(__params, \\"flow_no\\")","require":false}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 查看详情

- **methodKey**: `FUqDwSMSGq`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"external_bill_status","right":{"valueType":"1","value":"external_bill_status"}},{"field":"external_bill_no","right":{"valueType":"1","value":"external_bill_no"}},{"field":"sync_time","right":{"valueType":"1","value":"sync_time"}},{"field":"sync_status","right":{"valueType":"1","value":"sync_status"}},{"field":"due_date","right":{"valueType":"1","value":"due_date"}},{"field":"bill_date","right":{"valueType":"1","value":"bill_date"}},{"field":"balance_amount","right":{"valueType":"1","value":"balance_amount"}},{"field":"paid_amount","right":{"valueType":"1","value":"paid_amount"}},{"field":"amount","right":{"valueType":"1","value":"amount"}},{"field":"counterparty_name","right":{"valueType":"1","value":"counterparty_name"}},{"field":"counterparty_code","right":{"valueType":"1","value":"counterparty_code"}},{"field":"counterparty_id","right":{"valueType":"1","value":"counterparty_id"}},{"field":"counterparty_type","right":{"valueType":"1","value":"counterparty_type"}},{"field":"biz_type","right":{"valueType":"1","value":"biz_type"}},{"field":"source_no","right":{"valueType":"1","value":"source_no"}},{"field":"source_type","right":{"valueType":"1","value":"source_type"}},{"field":"flow_no","right":{"valueType":"1","value":"flow_no"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 删除

- **methodKey**: `FUkRzzgZ8H`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量删除

- **methodKey**: `FUxySmGeBj`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"IN","left":{"field":"id"},"right":{"valueType":"1","value":"@ids"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量导出

- **methodKey**: `FUIx58oD8g`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"external_bill_status","right":{"valueType":"1","value":"external_bill_status"}},{"field":"external_bill_no","right":{"valueType":"1","value":"external_bill_no"}},{"field":"sync_time","right":{"valueType":"1","value":"sync_time"}},{"field":"sync_status","right":{"valueType":"1","value":"sync_status"}},{"field":"due_date","right":{"valueType":"1","value":"due_date"}},{"field":"bill_date","right":{"valueType":"1","value":"bill_date"}},{"field":"balance_amount","right":{"valueType":"1","value":"balance_amount"}},{"field":"paid_amount","right":{"valueType":"1","value":"paid_amount"}},{"field":"amount","right":{"valueType":"1","value":"amount"}},{"field":"counterparty_name","right":{"valueType":"1","value":"counterparty_name"}},{"field":"counterparty_code","right":{"valueType":"1","value":"counterparty_code"}},{"field":"counterparty_id","right":{"valueType":"1","value":"counterparty_id"}},{"field":"counterparty_type","right":{"valueType":"1","value":"counterparty_type"}},{"field":"biz_type","right":{"valueType":"1","value":"biz_type"}},{"field":"source_no","right":{"valueType":"1","value":"source_no"}},{"field":"source_type","right":{"valueType":"1","value":"source_type"}},{"field":"flow_no","right":{"valueType":"1","value":"flow_no"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"external_bill_status"},"right":{"valueType":"1","value":"@external_bill_status"},"config":{"test":"CONTAINSKEY(__params, \\"external_bill_status\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"external_bill_no"},"right":{"valueType":"1","value":"@external_bill_no"},"config":{"test":"CONTAINSKEY(__params, \\"external_bill_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"sync_time"},"right":{"valueType":"1","value":["@sync_time_start","@sync_time_end"]},"config":{"test":"CONTAINSKEY(__params, \\"sync_time_start\\") || CONTAINSKEY(__params, \\"sync_time_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sync_status"},"right":{"valueType":"1","value":"@sync_status"},"config":{"test":"CONTAINSKEY(__params, \\"sync_status\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"due_date"},"right":{"valueType":"1","value":["@due_date_start","@due_date_end"]},"config":{"test":"CONTAINSKEY(__params, \\"due_date_start\\") || CONTAINSKEY(__params, \\"due_date_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"bill_date"},"right":{"valueType":"1","value":["@bill_date_start","@bill_date_end"]},"config":{"test":"CONTAINSKEY(__params, \\"bill_date_start\\") || CONTAINSKEY(__params, \\"bill_date_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"balance_amount"},"right":{"valueType":"1","value":"@balance_amount"},"config":{"test":"CONTAINSKEY(__params, \\"balance_amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"paid_amount"},"right":{"valueType":"1","value":"@paid_amount"},"config":{"test":"CONTAINSKEY(__params, \\"paid_amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"amount"},"right":{"valueType":"1","value":"@amount"},"config":{"test":"CONTAINSKEY(__params, \\"amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"counterparty_name"},"right":{"valueType":"1","value":"@counterparty_name"},"config":{"test":"CONTAINSKEY(__params, \\"counterparty_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"counterparty_code"},"right":{"valueType":"1","value":"@counterparty_code"},"config":{"test":"CONTAINSKEY(__params, \\"counterparty_code\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"counterparty_id"},"right":{"valueType":"1","value":"@counterparty_id"},"config":{"test":"CONTAINSKEY(__params, \\"counterparty_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"counterparty_type"},"right":{"valueType":"1","value":"@counterparty_type"},"config":{"test":"CONTAINSKEY(__params, \\"counterparty_type\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"biz_type"},"right":{"valueType":"1","value":"@biz_type"},"config":{"test":"CONTAINSKEY(__params, \\"biz_type\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"source_no"},"right":{"valueType":"1","value":"@source_no"},"config":{"test":"CONTAINSKEY(__params, \\"source_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"source_type"},"right":{"valueType":"1","value":"@source_type"},"config":{"test":"CONTAINSKEY(__params, \\"source_type\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"flow_no"},"right":{"valueType":"1","value":"@flow_no"},"config":{"test":"CONTAINSKEY(__params, \\"flow_no\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":false}}', 'methodConfig': '{"exportRows":1000,"conditionExecuteStrategy":"notExecute","operation":"EXPORT","exportFormat":"Excel"}'}
```

#### 批量导入

- **methodKey**: `FUIJibQIpw`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'BATCH_INSERT', 'gui': '{}', 'methodConfig': '{"operation":"IMPORT"}'}
```

---

## 库存台账表

| 属性 | 值 |
|------|-----|
| modelKey | `MOsWdYRJhQ` |
| modelNameEn | `inventory` |
| tableName | `inventory` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 长度 | 说明 |
|---------|---------|---------|-----------|------|------|------|
| price | 参考单价 | 整数 | int | 否 |  |  |
| sn_quantity | SN码商品库存数量 | 整数 | int | 否 |  |  |
| quantity | 当前库存数量 | 整数 | int | 否 |  |  |
| unit | 单位 | 短文本 | varchar(255) | 否 | 255 |  |
| product_code | 商品编码 | 短文本 | varchar(255) | 否 | 255 |  |
| product_name | 商品名称 | 短文本 | varchar(255) | 否 | 255 |  |
| product_id | 商品ID | 整数 | int | 否 |  |  |
| warehouse_name | 仓库名称 | 短文本 | varchar(255) | 否 | 255 |  |
| warehouse_id | 仓库ID | 整数 | int | 否 |  |  |
| id | 唯一标识 | 整数 | int | 是 |  | 唯一标识 |
| creator | 创建人 | 短文本 | varchar(255) | 是 | 255 | 创建人姓名 |
| created_at | 创建时间 | 日期时间 | timestamp | 是 |  | 创建时间 |
| updater | 更新人 | 短文本 | varchar(255) | 是 | 255 | 更新人姓名 |
| updated_at | 更新时间 | 日期时间 | timestamp | 是 |  | 更新时间 |
| is_deleted | 是否删除 | 布尔 | tinyint | 是 |  | 是否已删除 |
| deleted_at | 删除时间 | 日期时间 | timestamp | 是 |  | 删除时间 |

### 方法定义

| 方法名称 | methodKey | 类型 |
|---------|-----------|------|
| getAlertList | `FU9aGv2Zuh` | SQL |
| getWarehouseSummary | `FU3ZfaZLPj` | SQL |
| getLowStockCount | `FUhzR97DOC` | SQL |
| 列表查询 | `FUsb8iYjRh` | GUI |
| 新增 | `FU8Xen8xzH` | GUI |
| 编辑 | `FUAkUucCVl` | GUI |
| 查看详情 | `FUY1usgMs9` | GUI |
| 删除 | `FUxQYz4UvO` | GUI |
| 批量删除 | `FUpUpom9SD` | GUI |
| 批量导出 | `FUCoyQz1g4` | GUI |
| 批量导入 | `FUPgHEgw07` | GUI |

### 方法详情（含SQL实现）

#### getAlertList

- **methodKey**: `FU9aGv2Zuh`
- **类型**: SQL
- **说明**: 无

```sql
{'statementType': 'SELECT', 'dsl': {'select': [{'field': 'product_id'}, {'field': 'product_name'}, {'field': 'product_code'}, {'field': 'warehouse_id'}, {'field': 'warehouse_name'}, {'field': 'quantity'}], 'statement': 'SELECT', 'orderBy': [{'field': 'quantity', 'sort': 'ASC'}], 'where': {'children': [{'op': '=', 'left': {'field': 'is_deleted'}, 'right': 0}, {'op': '<=', 'left': {'field': 'quantity'}, 'right': '@threshold'}], 'operator': 'AND'}, 'modelKey': 'MOsWdYRJhQ'}, 'sql': 'SELECT\n        product_id, product_name, product_code, warehouse_id, warehouse_name, quantity \n    FROM\n        kdvungaasaaa_dev_inventory \n    WHERE\n        is_deleted = 0  AND quantity <= @threshold ORDER BY quantity ASC'}
```

#### getWarehouseSummary

- **methodKey**: `FU3ZfaZLPj`
- **类型**: SQL
- **说明**: 无

```sql
{'statementType': 'SELECT', 'dsl': {'select': [{'field': 'warehouse_id'}, {'field': 'warehouse_name'}, {'args': [{'field': '*'}], 'func': 'COUNT', 'alias': 'product_count'}, {'args': [{'field': 'quantity'}], 'func': 'SUM', 'alias': 'total_quantity'}], 'statement': 'SELECT', 'where': {'children': [{'op': '=', 'left': {'field': 'is_deleted'}, 'right': 0}], 'operator': 'AND'}, 'groupBy': [{'field': 'warehouse_id'}, {'field': 'warehouse_name'}], 'modelKey': 'MOsWdYRJhQ'}, 'sql': 'SELECT\n        warehouse_id, warehouse_name, COUNT(*) AS product_count, SUM(quantity) AS total_quantity \n    FROM\n        kdvungaasaaa_dev_inventory \n    WHERE\n        is_deleted = 0 GROUP BY warehouse_id, warehouse_name'}
```

#### getLowStockCount

- **methodKey**: `FUhzR97DOC`
- **类型**: SQL
- **说明**: 无

```sql
{'statementType': 'SELECT', 'dsl': {'select': [{'args': [{'field': '*'}], 'func': 'COUNT', 'alias': 'count'}], 'statement': 'SELECT', 'where': {'children': [{'op': '=', 'left': {'field': 'is_deleted'}, 'right': 0}, {'op': '<=', 'left': {'field': 'quantity'}, 'right': '@threshold'}], 'operator': 'AND'}, 'modelKey': 'MOsWdYRJhQ'}, 'sql': 'SELECT\n        COUNT(*) AS count \n    FROM\n        kdvungaasaaa_dev_inventory \n    WHERE\n        is_deleted = 0  AND quantity <= @threshold'}
```

#### 列表查询

- **methodKey**: `FUsb8iYjRh`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"price","right":{"valueType":"1","value":"price"}},{"field":"sn_quantity","right":{"valueType":"1","value":"sn_quantity"}},{"field":"quantity","right":{"valueType":"1","value":"quantity"}},{"field":"unit","right":{"valueType":"1","value":"unit"}},{"field":"product_code","right":{"valueType":"1","value":"product_code"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_id","right":{"valueType":"1","value":"product_id"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_id","right":{"valueType":"1","value":"warehouse_id"}},{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}}],"query":{"children":[{"op":"=","left":{"field":"price"},"right":{"valueType":"1","value":"@price"},"config":{"test":"CONTAINSKEY(__params, \\"price\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_quantity"},"right":{"valueType":"1","value":"@sn_quantity"},"config":{"test":"CONTAINSKEY(__params, \\"sn_quantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"quantity"},"right":{"valueType":"1","value":"@quantity"},"config":{"test":"CONTAINSKEY(__params, \\"quantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"},"config":{"test":"CONTAINSKEY(__params, \\"unit\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"},"config":{"test":"CONTAINSKEY(__params, \\"product_code\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"},"config":{"test":"CONTAINSKEY(__params, \\"product_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":true}}', 'methodConfig': '{"conditionExecuteStrategy":"notExecute"}'}
```

#### 新增

- **methodKey**: `FU8Xen8xzH`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'INSERT', 'gui': '{"data":[{"left":{"field":"price"},"right":{"valueType":"1","value":"@price"}},{"left":{"field":"sn_quantity"},"right":{"valueType":"1","value":"@sn_quantity"}},{"left":{"field":"quantity"},"right":{"valueType":"1","value":"@quantity"}},{"left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"}},{"left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"}},{"left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"}},{"left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"}},{"left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"}},{"left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"}}]}'}
```

#### 编辑

- **methodKey**: `FUAkUucCVl`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"price"},"right":{"valueType":"1","value":"@price"},"config":{"test":"CONTAINSKEY(__params, \\"price\\")","require":false}},{"left":{"field":"sn_quantity"},"right":{"valueType":"1","value":"@sn_quantity"},"config":{"test":"CONTAINSKEY(__params, \\"sn_quantity\\")","require":false}},{"left":{"field":"quantity"},"right":{"valueType":"1","value":"@quantity"},"config":{"test":"CONTAINSKEY(__params, \\"quantity\\")","require":false}},{"left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"},"config":{"test":"CONTAINSKEY(__params, \\"unit\\")","require":false}},{"left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"},"config":{"test":"CONTAINSKEY(__params, \\"product_code\\")","require":false}},{"left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","require":false}},{"left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"},"config":{"test":"CONTAINSKEY(__params, \\"product_id\\")","require":false}},{"left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","require":false}},{"left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_id\\")","require":false}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 查看详情

- **methodKey**: `FUY1usgMs9`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"price","right":{"valueType":"1","value":"price"}},{"field":"sn_quantity","right":{"valueType":"1","value":"sn_quantity"}},{"field":"quantity","right":{"valueType":"1","value":"quantity"}},{"field":"unit","right":{"valueType":"1","value":"unit"}},{"field":"product_code","right":{"valueType":"1","value":"product_code"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_id","right":{"valueType":"1","value":"product_id"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_id","right":{"valueType":"1","value":"warehouse_id"}},{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 删除

- **methodKey**: `FUxQYz4UvO`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量删除

- **methodKey**: `FUpUpom9SD`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"IN","left":{"field":"id"},"right":{"valueType":"1","value":"@ids"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量导出

- **methodKey**: `FUCoyQz1g4`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"price","right":{"valueType":"1","value":"price"}},{"field":"sn_quantity","right":{"valueType":"1","value":"sn_quantity"}},{"field":"quantity","right":{"valueType":"1","value":"quantity"}},{"field":"unit","right":{"valueType":"1","value":"unit"}},{"field":"product_code","right":{"valueType":"1","value":"product_code"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_id","right":{"valueType":"1","value":"product_id"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_id","right":{"valueType":"1","value":"warehouse_id"}},{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}}],"query":{"children":[{"op":"=","left":{"field":"price"},"right":{"valueType":"1","value":"@price"},"config":{"test":"CONTAINSKEY(__params, \\"price\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_quantity"},"right":{"valueType":"1","value":"@sn_quantity"},"config":{"test":"CONTAINSKEY(__params, \\"sn_quantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"quantity"},"right":{"valueType":"1","value":"@quantity"},"config":{"test":"CONTAINSKEY(__params, \\"quantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"},"config":{"test":"CONTAINSKEY(__params, \\"unit\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"},"config":{"test":"CONTAINSKEY(__params, \\"product_code\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"},"config":{"test":"CONTAINSKEY(__params, \\"product_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":false}}', 'methodConfig': '{"exportRows":1000,"conditionExecuteStrategy":"notExecute","operation":"EXPORT","exportFormat":"Excel"}'}
```

#### 批量导入

- **methodKey**: `FUPgHEgw07`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'BATCH_INSERT', 'gui': '{}', 'methodConfig': '{"operation":"IMPORT"}'}
```

---

## 盘点单明细表

| 属性 | 值 |
|------|-----|
| modelKey | `MO0T3mVifs` |
| modelNameEn | `checkitem` |
| tableName | `checkitem` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 长度 | 说明 |
|---------|---------|---------|-----------|------|------|------|
| remark | 备注 | 短文本 | varchar(255) | 否 | 255 |  |
| profitamount | 盈亏金额 | 整数 | int | 否 |  |  |
| price | 单价 | 整数 | int | 否 |  |  |
| profitquantity | 盈亏数量 | 整数 | int | 否 |  |  |
| actualquantity | 实盘数量 | 整数 | int | 否 |  |  |
| bookquantity | 账面数量 | 整数 | int | 否 |  |  |
| unit | 单位 | 短文本 | varchar(255) | 否 | 255 |  |
| productcode | 商品编码 | 短文本 | varchar(255) | 否 | 255 |  |
| productname | 商品名称 | 短文本 | varchar(255) | 否 | 255 |  |
| productid | 商品ID | 整数 | int | 否 |  |  |
| orderno | 单号 | 短文本 | varchar(255) | 否 | 255 |  |
| orderid | 主表ID | 整数 | int | 否 |  |  |
| id | 唯一标识 | 整数 | int | 是 |  | 唯一标识 |
| creator | 创建人 | 短文本 | varchar(255) | 是 | 255 | 创建人姓名 |
| created_at | 创建时间 | 日期时间 | timestamp | 是 |  | 创建时间 |
| updater | 更新人 | 短文本 | varchar(255) | 是 | 255 | 更新人姓名 |
| updated_at | 更新时间 | 日期时间 | timestamp | 是 |  | 更新时间 |
| is_deleted | 是否删除 | 布尔 | tinyint | 是 |  | 是否已删除 |
| deleted_at | 删除时间 | 日期时间 | timestamp | 是 |  | 删除时间 |

### 方法定义

| 方法名称 | methodKey | 类型 |
|---------|-----------|------|
| 列表查询 | `FUjedwjYjd` | GUI |
| 新增 | `FUf8uvechL` | GUI |
| 编辑 | `FUffcWxmy3` | GUI |
| 查看详情 | `FUYcsnH60S` | GUI |
| 删除 | `FUuPMOZ2eU` | GUI |
| 批量删除 | `FULTQq4Skg` | GUI |
| 批量导出 | `FUUSqlUKzq` | GUI |
| 批量导入 | `FUAEDRFBQ5` | GUI |

### 方法详情（含SQL实现）

#### 列表查询

- **methodKey**: `FUjedwjYjd`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"profitamount","right":{"valueType":"1","value":"profitamount"}},{"field":"price","right":{"valueType":"1","value":"price"}},{"field":"profitquantity","right":{"valueType":"1","value":"profitquantity"}},{"field":"actualquantity","right":{"valueType":"1","value":"actualquantity"}},{"field":"bookquantity","right":{"valueType":"1","value":"bookquantity"}},{"field":"unit","right":{"valueType":"1","value":"unit"}},{"field":"productcode","right":{"valueType":"1","value":"productcode"}},{"field":"productname","right":{"valueType":"1","value":"productname"}},{"field":"productid","right":{"valueType":"1","value":"productid"}},{"field":"orderno","right":{"valueType":"1","value":"orderno"}},{"field":"orderid","right":{"valueType":"1","value":"orderid"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"profitamount"},"right":{"valueType":"1","value":"@profitamount"},"config":{"test":"CONTAINSKEY(__params, \\"profitamount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"price"},"right":{"valueType":"1","value":"@price"},"config":{"test":"CONTAINSKEY(__params, \\"price\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"profitquantity"},"right":{"valueType":"1","value":"@profitquantity"},"config":{"test":"CONTAINSKEY(__params, \\"profitquantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"actualquantity"},"right":{"valueType":"1","value":"@actualquantity"},"config":{"test":"CONTAINSKEY(__params, \\"actualquantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"bookquantity"},"right":{"valueType":"1","value":"@bookquantity"},"config":{"test":"CONTAINSKEY(__params, \\"bookquantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"},"config":{"test":"CONTAINSKEY(__params, \\"unit\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"productcode"},"right":{"valueType":"1","value":"@productcode"},"config":{"test":"CONTAINSKEY(__params, \\"productcode\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"productname"},"right":{"valueType":"1","value":"@productname"},"config":{"test":"CONTAINSKEY(__params, \\"productname\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"productid"},"right":{"valueType":"1","value":"@productid"},"config":{"test":"CONTAINSKEY(__params, \\"productid\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"orderno"},"right":{"valueType":"1","value":"@orderno"},"config":{"test":"CONTAINSKEY(__params, \\"orderno\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"orderid"},"right":{"valueType":"1","value":"@orderid"},"config":{"test":"CONTAINSKEY(__params, \\"orderid\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":true}}', 'methodConfig': '{"conditionExecuteStrategy":"notExecute"}'}
```

#### 新增

- **methodKey**: `FUf8uvechL`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'INSERT', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"}},{"left":{"field":"profitamount"},"right":{"valueType":"1","value":"@profitamount"}},{"left":{"field":"price"},"right":{"valueType":"1","value":"@price"}},{"left":{"field":"profitquantity"},"right":{"valueType":"1","value":"@profitquantity"}},{"left":{"field":"actualquantity"},"right":{"valueType":"1","value":"@actualquantity"}},{"left":{"field":"bookquantity"},"right":{"valueType":"1","value":"@bookquantity"}},{"left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"}},{"left":{"field":"productcode"},"right":{"valueType":"1","value":"@productcode"}},{"left":{"field":"productname"},"right":{"valueType":"1","value":"@productname"}},{"left":{"field":"productid"},"right":{"valueType":"1","value":"@productid"}},{"left":{"field":"orderno"},"right":{"valueType":"1","value":"@orderno"}},{"left":{"field":"orderid"},"right":{"valueType":"1","value":"@orderid"}}]}'}
```

#### 编辑

- **methodKey**: `FUffcWxmy3`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","require":false}},{"left":{"field":"profitamount"},"right":{"valueType":"1","value":"@profitamount"},"config":{"test":"CONTAINSKEY(__params, \\"profitamount\\")","require":false}},{"left":{"field":"price"},"right":{"valueType":"1","value":"@price"},"config":{"test":"CONTAINSKEY(__params, \\"price\\")","require":false}},{"left":{"field":"profitquantity"},"right":{"valueType":"1","value":"@profitquantity"},"config":{"test":"CONTAINSKEY(__params, \\"profitquantity\\")","require":false}},{"left":{"field":"actualquantity"},"right":{"valueType":"1","value":"@actualquantity"},"config":{"test":"CONTAINSKEY(__params, \\"actualquantity\\")","require":false}},{"left":{"field":"bookquantity"},"right":{"valueType":"1","value":"@bookquantity"},"config":{"test":"CONTAINSKEY(__params, \\"bookquantity\\")","require":false}},{"left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"},"config":{"test":"CONTAINSKEY(__params, \\"unit\\")","require":false}},{"left":{"field":"productcode"},"right":{"valueType":"1","value":"@productcode"},"config":{"test":"CONTAINSKEY(__params, \\"productcode\\")","require":false}},{"left":{"field":"productname"},"right":{"valueType":"1","value":"@productname"},"config":{"test":"CONTAINSKEY(__params, \\"productname\\")","require":false}},{"left":{"field":"productid"},"right":{"valueType":"1","value":"@productid"},"config":{"test":"CONTAINSKEY(__params, \\"productid\\")","require":false}},{"left":{"field":"orderno"},"right":{"valueType":"1","value":"@orderno"},"config":{"test":"CONTAINSKEY(__params, \\"orderno\\")","require":false}},{"left":{"field":"orderid"},"right":{"valueType":"1","value":"@orderid"},"config":{"test":"CONTAINSKEY(__params, \\"orderid\\")","require":false}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 查看详情

- **methodKey**: `FUYcsnH60S`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"profitamount","right":{"valueType":"1","value":"profitamount"}},{"field":"price","right":{"valueType":"1","value":"price"}},{"field":"profitquantity","right":{"valueType":"1","value":"profitquantity"}},{"field":"actualquantity","right":{"valueType":"1","value":"actualquantity"}},{"field":"bookquantity","right":{"valueType":"1","value":"bookquantity"}},{"field":"unit","right":{"valueType":"1","value":"unit"}},{"field":"productcode","right":{"valueType":"1","value":"productcode"}},{"field":"productname","right":{"valueType":"1","value":"productname"}},{"field":"productid","right":{"valueType":"1","value":"productid"}},{"field":"orderno","right":{"valueType":"1","value":"orderno"}},{"field":"orderid","right":{"valueType":"1","value":"orderid"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 删除

- **methodKey**: `FUuPMOZ2eU`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量删除

- **methodKey**: `FULTQq4Skg`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"IN","left":{"field":"id"},"right":{"valueType":"1","value":"@ids"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量导出

- **methodKey**: `FUUSqlUKzq`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"profitamount","right":{"valueType":"1","value":"profitamount"}},{"field":"price","right":{"valueType":"1","value":"price"}},{"field":"profitquantity","right":{"valueType":"1","value":"profitquantity"}},{"field":"actualquantity","right":{"valueType":"1","value":"actualquantity"}},{"field":"bookquantity","right":{"valueType":"1","value":"bookquantity"}},{"field":"unit","right":{"valueType":"1","value":"unit"}},{"field":"productcode","right":{"valueType":"1","value":"productcode"}},{"field":"productname","right":{"valueType":"1","value":"productname"}},{"field":"productid","right":{"valueType":"1","value":"productid"}},{"field":"orderno","right":{"valueType":"1","value":"orderno"}},{"field":"orderid","right":{"valueType":"1","value":"orderid"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"profitamount"},"right":{"valueType":"1","value":"@profitamount"},"config":{"test":"CONTAINSKEY(__params, \\"profitamount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"price"},"right":{"valueType":"1","value":"@price"},"config":{"test":"CONTAINSKEY(__params, \\"price\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"profitquantity"},"right":{"valueType":"1","value":"@profitquantity"},"config":{"test":"CONTAINSKEY(__params, \\"profitquantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"actualquantity"},"right":{"valueType":"1","value":"@actualquantity"},"config":{"test":"CONTAINSKEY(__params, \\"actualquantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"bookquantity"},"right":{"valueType":"1","value":"@bookquantity"},"config":{"test":"CONTAINSKEY(__params, \\"bookquantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"},"config":{"test":"CONTAINSKEY(__params, \\"unit\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"productcode"},"right":{"valueType":"1","value":"@productcode"},"config":{"test":"CONTAINSKEY(__params, \\"productcode\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"productname"},"right":{"valueType":"1","value":"@productname"},"config":{"test":"CONTAINSKEY(__params, \\"productname\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"productid"},"right":{"valueType":"1","value":"@productid"},"config":{"test":"CONTAINSKEY(__params, \\"productid\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"orderno"},"right":{"valueType":"1","value":"@orderno"},"config":{"test":"CONTAINSKEY(__params, \\"orderno\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"orderid"},"right":{"valueType":"1","value":"@orderid"},"config":{"test":"CONTAINSKEY(__params, \\"orderid\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":false}}', 'methodConfig': '{"exportRows":1000,"conditionExecuteStrategy":"notExecute","operation":"EXPORT","exportFormat":"Excel"}'}
```

#### 批量导入

- **methodKey**: `FUAEDRFBQ5`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'BATCH_INSERT', 'gui': '{}', 'methodConfig': '{"operation":"IMPORT"}'}
```

---

## 盘点单主表

| 属性 | 值 |
|------|-----|
| modelKey | `MO5WOkA9SX` |
| modelNameEn | `check_order` |
| tableName | `check_order` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 长度 | 说明 |
|---------|---------|---------|-----------|------|------|------|
| operator_name | 操作人名称 | 短文本 | varchar(255) | 否 | 255 |  |
| operator_id | 操作人ID | 短文本 | varchar(255) | 否 | 255 |  |
| remark | 备注 | 长文本 | varchar(1024) | 否 | 1024 |  |
| status | 状态 | 短文本 | varchar(255) | 否 | 255 |  |
| total_profit_amount | 盈亏总金额 | 整数 | int | 否 |  |  |
| total_profit_quantity | 盈亏总数量 | 整数 | int | 否 |  |  |
| total_actual_quantity | 实盘总数量 | 整数 | int | 否 |  |  |
| total_book_quantity | 账面总数量 | 整数 | int | 否 |  |  |
| voucher_no | 凭证号 | 短文本 | varchar(255) | 否 | 255 |  |
| adjust_account | 调整科目 | 短文本 | varchar(255) | 否 | 255 |  |
| warehouse_name | 仓库名称 | 短文本 | varchar(255) | 否 | 255 |  |
| warehouse_id | 仓库ID | 整数 | int | 否 |  |  |
| order_date | 单据日期 | 日期时间 | datetime | 否 |  |  |
| order_no | 单号 | 短文本 | varchar(255) | 否 | 255 |  |
| id | 唯一标识 | 整数 | int | 是 |  | 唯一标识 |
| creator | 创建人 | 短文本 | varchar(255) | 是 | 255 | 创建人姓名 |
| created_at | 创建时间 | 日期时间 | timestamp | 是 |  | 创建时间 |
| updater | 更新人 | 短文本 | varchar(255) | 是 | 255 | 更新人姓名 |
| updated_at | 更新时间 | 日期时间 | timestamp | 是 |  | 更新时间 |
| is_deleted | 是否删除 | 布尔 | tinyint | 是 |  | 是否已删除 |
| deleted_at | 删除时间 | 日期时间 | timestamp | 是 |  | 删除时间 |

### 方法定义

| 方法名称 | methodKey | 类型 |
|---------|-----------|------|
| 列表查询 | `FUQ56UBDHj` | GUI |
| 新增 | `FUaAS7yYvZ` | GUI |
| 编辑 | `FU6H93URI8` | GUI |
| 查看详情 | `FUefEHSt2t` | GUI |
| 删除 | `FUlNcPIkiO` | GUI |
| 批量删除 | `FUmjgz0Nhc` | GUI |
| 批量导出 | `FUOScIIzUX` | GUI |
| 批量导入 | `FU61w84DwD` | GUI |

### 方法详情（含SQL实现）

#### 列表查询

- **methodKey**: `FUQ56UBDHj`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"operator_name","right":{"valueType":"1","value":"operator_name"}},{"field":"operator_id","right":{"valueType":"1","value":"operator_id"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"status","right":{"valueType":"1","value":"status"}},{"field":"total_profit_amount","right":{"valueType":"1","value":"total_profit_amount"}},{"field":"total_profit_quantity","right":{"valueType":"1","value":"total_profit_quantity"}},{"field":"total_actual_quantity","right":{"valueType":"1","value":"total_actual_quantity"}},{"field":"total_book_quantity","right":{"valueType":"1","value":"total_book_quantity"}},{"field":"voucher_no","right":{"valueType":"1","value":"voucher_no"}},{"field":"adjust_account","right":{"valueType":"1","value":"adjust_account"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_id","right":{"valueType":"1","value":"warehouse_id"}},{"field":"order_date","right":{"valueType":"1","value":"order_date"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"},"config":{"test":"CONTAINSKEY(__params, \\"operator_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"},"config":{"test":"CONTAINSKEY(__params, \\"operator_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"status"},"right":{"valueType":"1","value":"@status"},"config":{"test":"CONTAINSKEY(__params, \\"status\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"total_profit_amount"},"right":{"valueType":"1","value":"@total_profit_amount"},"config":{"test":"CONTAINSKEY(__params, \\"total_profit_amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"total_profit_quantity"},"right":{"valueType":"1","value":"@total_profit_quantity"},"config":{"test":"CONTAINSKEY(__params, \\"total_profit_quantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"total_actual_quantity"},"right":{"valueType":"1","value":"@total_actual_quantity"},"config":{"test":"CONTAINSKEY(__params, \\"total_actual_quantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"total_book_quantity"},"right":{"valueType":"1","value":"@total_book_quantity"},"config":{"test":"CONTAINSKEY(__params, \\"total_book_quantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"voucher_no"},"right":{"valueType":"1","value":"@voucher_no"},"config":{"test":"CONTAINSKEY(__params, \\"voucher_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"adjust_account"},"right":{"valueType":"1","value":"@adjust_account"},"config":{"test":"CONTAINSKEY(__params, \\"adjust_account\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"order_date"},"right":{"valueType":"1","value":["@order_date_start","@order_date_end"]},"config":{"test":"CONTAINSKEY(__params, \\"order_date_start\\") || CONTAINSKEY(__params, \\"order_date_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":true}}', 'methodConfig': '{"conditionExecuteStrategy":"notExecute"}'}
```

#### 新增

- **methodKey**: `FUaAS7yYvZ`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'INSERT', 'gui': '{"data":[{"left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"}},{"left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"}},{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"}},{"left":{"field":"status"},"right":{"valueType":"1","value":"@status"}},{"left":{"field":"total_profit_amount"},"right":{"valueType":"1","value":"@total_profit_amount"}},{"left":{"field":"total_profit_quantity"},"right":{"valueType":"1","value":"@total_profit_quantity"}},{"left":{"field":"total_actual_quantity"},"right":{"valueType":"1","value":"@total_actual_quantity"}},{"left":{"field":"total_book_quantity"},"right":{"valueType":"1","value":"@total_book_quantity"}},{"left":{"field":"voucher_no"},"right":{"valueType":"1","value":"@voucher_no"}},{"left":{"field":"adjust_account"},"right":{"valueType":"1","value":"@adjust_account"}},{"left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"}},{"left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"}},{"left":{"field":"order_date"},"right":{"valueType":"1","value":"@order_date"}},{"left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"}}]}'}
```

#### 编辑

- **methodKey**: `FU6H93URI8`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"},"config":{"test":"CONTAINSKEY(__params, \\"operator_name\\")","require":false}},{"left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"},"config":{"test":"CONTAINSKEY(__params, \\"operator_id\\")","require":false}},{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","require":false}},{"left":{"field":"status"},"right":{"valueType":"1","value":"@status"},"config":{"test":"CONTAINSKEY(__params, \\"status\\")","require":false}},{"left":{"field":"total_profit_amount"},"right":{"valueType":"1","value":"@total_profit_amount"},"config":{"test":"CONTAINSKEY(__params, \\"total_profit_amount\\")","require":false}},{"left":{"field":"total_profit_quantity"},"right":{"valueType":"1","value":"@total_profit_quantity"},"config":{"test":"CONTAINSKEY(__params, \\"total_profit_quantity\\")","require":false}},{"left":{"field":"total_actual_quantity"},"right":{"valueType":"1","value":"@total_actual_quantity"},"config":{"test":"CONTAINSKEY(__params, \\"total_actual_quantity\\")","require":false}},{"left":{"field":"total_book_quantity"},"right":{"valueType":"1","value":"@total_book_quantity"},"config":{"test":"CONTAINSKEY(__params, \\"total_book_quantity\\")","require":false}},{"left":{"field":"voucher_no"},"right":{"valueType":"1","value":"@voucher_no"},"config":{"test":"CONTAINSKEY(__params, \\"voucher_no\\")","require":false}},{"left":{"field":"adjust_account"},"right":{"valueType":"1","value":"@adjust_account"},"config":{"test":"CONTAINSKEY(__params, \\"adjust_account\\")","require":false}},{"left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","require":false}},{"left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_id\\")","require":false}},{"left":{"field":"order_date"},"right":{"valueType":"1","value":"@order_date"},"config":{"test":"CONTAINSKEY(__params, \\"order_date\\")","require":false}},{"left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","require":false}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 查看详情

- **methodKey**: `FUefEHSt2t`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"operator_name","right":{"valueType":"1","value":"operator_name"}},{"field":"operator_id","right":{"valueType":"1","value":"operator_id"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"status","right":{"valueType":"1","value":"status"}},{"field":"total_profit_amount","right":{"valueType":"1","value":"total_profit_amount"}},{"field":"total_profit_quantity","right":{"valueType":"1","value":"total_profit_quantity"}},{"field":"total_actual_quantity","right":{"valueType":"1","value":"total_actual_quantity"}},{"field":"total_book_quantity","right":{"valueType":"1","value":"total_book_quantity"}},{"field":"voucher_no","right":{"valueType":"1","value":"voucher_no"}},{"field":"adjust_account","right":{"valueType":"1","value":"adjust_account"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_id","right":{"valueType":"1","value":"warehouse_id"}},{"field":"order_date","right":{"valueType":"1","value":"order_date"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 删除

- **methodKey**: `FUlNcPIkiO`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量删除

- **methodKey**: `FUmjgz0Nhc`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"IN","left":{"field":"id"},"right":{"valueType":"1","value":"@ids"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量导出

- **methodKey**: `FUOScIIzUX`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"operator_name","right":{"valueType":"1","value":"operator_name"}},{"field":"operator_id","right":{"valueType":"1","value":"operator_id"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"status","right":{"valueType":"1","value":"status"}},{"field":"total_profit_amount","right":{"valueType":"1","value":"total_profit_amount"}},{"field":"total_profit_quantity","right":{"valueType":"1","value":"total_profit_quantity"}},{"field":"total_actual_quantity","right":{"valueType":"1","value":"total_actual_quantity"}},{"field":"total_book_quantity","right":{"valueType":"1","value":"total_book_quantity"}},{"field":"voucher_no","right":{"valueType":"1","value":"voucher_no"}},{"field":"adjust_account","right":{"valueType":"1","value":"adjust_account"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_id","right":{"valueType":"1","value":"warehouse_id"}},{"field":"order_date","right":{"valueType":"1","value":"order_date"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"},"config":{"test":"CONTAINSKEY(__params, \\"operator_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"},"config":{"test":"CONTAINSKEY(__params, \\"operator_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"status"},"right":{"valueType":"1","value":"@status"},"config":{"test":"CONTAINSKEY(__params, \\"status\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"total_profit_amount"},"right":{"valueType":"1","value":"@total_profit_amount"},"config":{"test":"CONTAINSKEY(__params, \\"total_profit_amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"total_profit_quantity"},"right":{"valueType":"1","value":"@total_profit_quantity"},"config":{"test":"CONTAINSKEY(__params, \\"total_profit_quantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"total_actual_quantity"},"right":{"valueType":"1","value":"@total_actual_quantity"},"config":{"test":"CONTAINSKEY(__params, \\"total_actual_quantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"total_book_quantity"},"right":{"valueType":"1","value":"@total_book_quantity"},"config":{"test":"CONTAINSKEY(__params, \\"total_book_quantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"voucher_no"},"right":{"valueType":"1","value":"@voucher_no"},"config":{"test":"CONTAINSKEY(__params, \\"voucher_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"adjust_account"},"right":{"valueType":"1","value":"@adjust_account"},"config":{"test":"CONTAINSKEY(__params, \\"adjust_account\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"order_date"},"right":{"valueType":"1","value":["@order_date_start","@order_date_end"]},"config":{"test":"CONTAINSKEY(__params, \\"order_date_start\\") || CONTAINSKEY(__params, \\"order_date_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":false}}', 'methodConfig': '{"exportRows":1000,"conditionExecuteStrategy":"notExecute","operation":"EXPORT","exportFormat":"Excel"}'}
```

#### 批量导入

- **methodKey**: `FU61w84DwD`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'BATCH_INSERT', 'gui': '{}', 'methodConfig': '{"operation":"IMPORT"}'}
```

---

## 调拨单明细表

| 属性 | 值 |
|------|-----|
| modelKey | `MOORe8J0Dl` |
| modelNameEn | `transfer_item` |
| tableName | `transfer_item` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 长度 | 说明 |
|---------|---------|---------|-----------|------|------|------|
| remark | 备注 | 短文本 | varchar(255) | 否 | 255 |  |
| sn_codes | SN码列表 | 长文本 | varchar(1024) | 否 | 1024 |  |
| sn_count | SN码数量 | 整数 | int | 否 |  |  |
| amount | 金额 | 整数 | int | 否 |  |  |
| price | 单价 | 整数 | int | 否 |  |  |
| quantity | 数量 | 整数 | int | 否 |  |  |
| unit | 单位 | 短文本 | varchar(255) | 否 | 255 |  |
| product_code | 商品编码 | 短文本 | varchar(255) | 否 | 255 |  |
| product_name | 商品名称 | 短文本 | varchar(255) | 否 | 255 |  |
| product_id | 商品ID | 整数 | int | 否 |  |  |
| order_no | 单号 | 短文本 | varchar(255) | 否 | 255 |  |
| order_id | 主表ID | 整数 | int | 否 |  |  |
| id | 唯一标识 | 整数 | int | 是 |  | 唯一标识 |
| creator | 创建人 | 短文本 | varchar(255) | 是 | 255 | 创建人姓名 |
| created_at | 创建时间 | 日期时间 | timestamp | 是 |  | 创建时间 |
| updater | 更新人 | 短文本 | varchar(255) | 是 | 255 | 更新人姓名 |
| updated_at | 更新时间 | 日期时间 | timestamp | 是 |  | 更新时间 |
| is_deleted | 是否删除 | 布尔 | tinyint | 是 |  | 是否已删除 |
| deleted_at | 删除时间 | 日期时间 | timestamp | 是 |  | 删除时间 |

### 方法定义

| 方法名称 | methodKey | 类型 |
|---------|-----------|------|
| 列表查询 | `FU7HVtbbuq` | GUI |
| 新增 | `FU0OPw5rsy` | GUI |
| 编辑 | `FU2apUUpTE` | GUI |
| 查看详情 | `FUSEEGDgYd` | GUI |
| 删除 | `FURjMexO9w` | GUI |
| 批量删除 | `FUMWrdtwSb` | GUI |
| 批量导出 | `FUdpY1IH5R` | GUI |
| 批量导入 | `FU0uBYXqm9` | GUI |

### 方法详情（含SQL实现）

#### 列表查询

- **methodKey**: `FU7HVtbbuq`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"sn_codes","right":{"valueType":"1","value":"sn_codes"}},{"field":"sn_count","right":{"valueType":"1","value":"sn_count"}},{"field":"amount","right":{"valueType":"1","value":"amount"}},{"field":"price","right":{"valueType":"1","value":"price"}},{"field":"quantity","right":{"valueType":"1","value":"quantity"}},{"field":"unit","right":{"valueType":"1","value":"unit"}},{"field":"product_code","right":{"valueType":"1","value":"product_code"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_id","right":{"valueType":"1","value":"product_id"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}},{"field":"order_id","right":{"valueType":"1","value":"order_id"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_codes"},"right":{"valueType":"1","value":"@sn_codes"},"config":{"test":"CONTAINSKEY(__params, \\"sn_codes\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_count"},"right":{"valueType":"1","value":"@sn_count"},"config":{"test":"CONTAINSKEY(__params, \\"sn_count\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"amount"},"right":{"valueType":"1","value":"@amount"},"config":{"test":"CONTAINSKEY(__params, \\"amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"price"},"right":{"valueType":"1","value":"@price"},"config":{"test":"CONTAINSKEY(__params, \\"price\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"quantity"},"right":{"valueType":"1","value":"@quantity"},"config":{"test":"CONTAINSKEY(__params, \\"quantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"},"config":{"test":"CONTAINSKEY(__params, \\"unit\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"},"config":{"test":"CONTAINSKEY(__params, \\"product_code\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"},"config":{"test":"CONTAINSKEY(__params, \\"product_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_id"},"right":{"valueType":"1","value":"@order_id"},"config":{"test":"CONTAINSKEY(__params, \\"order_id\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":true}}', 'methodConfig': '{"conditionExecuteStrategy":"notExecute"}'}
```

#### 新增

- **methodKey**: `FU0OPw5rsy`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'INSERT', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"}},{"left":{"field":"sn_codes"},"right":{"valueType":"1","value":"@sn_codes"}},{"left":{"field":"sn_count"},"right":{"valueType":"1","value":"@sn_count"}},{"left":{"field":"amount"},"right":{"valueType":"1","value":"@amount"}},{"left":{"field":"price"},"right":{"valueType":"1","value":"@price"}},{"left":{"field":"quantity"},"right":{"valueType":"1","value":"@quantity"}},{"left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"}},{"left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"}},{"left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"}},{"left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"}},{"left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"}},{"left":{"field":"order_id"},"right":{"valueType":"1","value":"@order_id"}}]}'}
```

#### 编辑

- **methodKey**: `FU2apUUpTE`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","require":false}},{"left":{"field":"sn_codes"},"right":{"valueType":"1","value":"@sn_codes"},"config":{"test":"CONTAINSKEY(__params, \\"sn_codes\\")","require":false}},{"left":{"field":"sn_count"},"right":{"valueType":"1","value":"@sn_count"},"config":{"test":"CONTAINSKEY(__params, \\"sn_count\\")","require":false}},{"left":{"field":"amount"},"right":{"valueType":"1","value":"@amount"},"config":{"test":"CONTAINSKEY(__params, \\"amount\\")","require":false}},{"left":{"field":"price"},"right":{"valueType":"1","value":"@price"},"config":{"test":"CONTAINSKEY(__params, \\"price\\")","require":false}},{"left":{"field":"quantity"},"right":{"valueType":"1","value":"@quantity"},"config":{"test":"CONTAINSKEY(__params, \\"quantity\\")","require":false}},{"left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"},"config":{"test":"CONTAINSKEY(__params, \\"unit\\")","require":false}},{"left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"},"config":{"test":"CONTAINSKEY(__params, \\"product_code\\")","require":false}},{"left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","require":false}},{"left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"},"config":{"test":"CONTAINSKEY(__params, \\"product_id\\")","require":false}},{"left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","require":false}},{"left":{"field":"order_id"},"right":{"valueType":"1","value":"@order_id"},"config":{"test":"CONTAINSKEY(__params, \\"order_id\\")","require":false}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 查看详情

- **methodKey**: `FUSEEGDgYd`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"sn_codes","right":{"valueType":"1","value":"sn_codes"}},{"field":"sn_count","right":{"valueType":"1","value":"sn_count"}},{"field":"amount","right":{"valueType":"1","value":"amount"}},{"field":"price","right":{"valueType":"1","value":"price"}},{"field":"quantity","right":{"valueType":"1","value":"quantity"}},{"field":"unit","right":{"valueType":"1","value":"unit"}},{"field":"product_code","right":{"valueType":"1","value":"product_code"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_id","right":{"valueType":"1","value":"product_id"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}},{"field":"order_id","right":{"valueType":"1","value":"order_id"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 删除

- **methodKey**: `FURjMexO9w`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量删除

- **methodKey**: `FUMWrdtwSb`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"IN","left":{"field":"id"},"right":{"valueType":"1","value":"@ids"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量导出

- **methodKey**: `FUdpY1IH5R`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"sn_codes","right":{"valueType":"1","value":"sn_codes"}},{"field":"sn_count","right":{"valueType":"1","value":"sn_count"}},{"field":"amount","right":{"valueType":"1","value":"amount"}},{"field":"price","right":{"valueType":"1","value":"price"}},{"field":"quantity","right":{"valueType":"1","value":"quantity"}},{"field":"unit","right":{"valueType":"1","value":"unit"}},{"field":"product_code","right":{"valueType":"1","value":"product_code"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_id","right":{"valueType":"1","value":"product_id"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}},{"field":"order_id","right":{"valueType":"1","value":"order_id"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_codes"},"right":{"valueType":"1","value":"@sn_codes"},"config":{"test":"CONTAINSKEY(__params, \\"sn_codes\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_count"},"right":{"valueType":"1","value":"@sn_count"},"config":{"test":"CONTAINSKEY(__params, \\"sn_count\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"amount"},"right":{"valueType":"1","value":"@amount"},"config":{"test":"CONTAINSKEY(__params, \\"amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"price"},"right":{"valueType":"1","value":"@price"},"config":{"test":"CONTAINSKEY(__params, \\"price\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"quantity"},"right":{"valueType":"1","value":"@quantity"},"config":{"test":"CONTAINSKEY(__params, \\"quantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"},"config":{"test":"CONTAINSKEY(__params, \\"unit\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"},"config":{"test":"CONTAINSKEY(__params, \\"product_code\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"},"config":{"test":"CONTAINSKEY(__params, \\"product_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_id"},"right":{"valueType":"1","value":"@order_id"},"config":{"test":"CONTAINSKEY(__params, \\"order_id\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":false}}', 'methodConfig': '{"exportRows":1000,"conditionExecuteStrategy":"notExecute","operation":"EXPORT","exportFormat":"Excel"}'}
```

#### 批量导入

- **methodKey**: `FU0uBYXqm9`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'BATCH_INSERT', 'gui': '{}', 'methodConfig': '{"operation":"IMPORT"}'}
```

---

## 调拨单主表

| 属性 | 值 |
|------|-----|
| modelKey | `MOIrlRmiFH` |
| modelNameEn | `transfer_order` |
| tableName | `transfer_order` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 长度 | 说明 |
|---------|---------|---------|-----------|------|------|------|
| operator_name | 操作人名称 | 短文本 | varchar(255) | 否 | 255 |  |
| operator_id | 操作人ID | 短文本 | varchar(255) | 否 | 255 |  |
| remark | 备注 | 长文本 | varchar(1024) | 否 | 1024 |  |
| status | 状态 | 短文本 | varchar(255) | 否 | 255 |  |
| total_amount | 总金额 | 整数 | int | 否 |  |  |
| total_quantity | 总数量 | 整数 | int | 否 |  |  |
| in_warehouse_name | 调入仓库名称 | 短文本 | varchar(255) | 否 | 255 |  |
| in_warehouse_id | 调入仓库ID | 整数 | int | 否 |  |  |
| out_warehouse_name | 调出仓库名称 | 短文本 | varchar(255) | 否 | 255 |  |
| out_warehouse_id | 调出仓库ID | 整数 | int | 否 |  |  |
| order_date | 单据日期 | 日期时间 | datetime | 否 |  |  |
| order_no | 单号 | 短文本 | varchar(255) | 否 | 255 |  |
| id | 唯一标识 | 整数 | int | 是 |  | 唯一标识 |
| creator | 创建人 | 短文本 | varchar(255) | 是 | 255 | 创建人姓名 |
| created_at | 创建时间 | 日期时间 | timestamp | 是 |  | 创建时间 |
| updater | 更新人 | 短文本 | varchar(255) | 是 | 255 | 更新人姓名 |
| updated_at | 更新时间 | 日期时间 | timestamp | 是 |  | 更新时间 |
| is_deleted | 是否删除 | 布尔 | tinyint | 是 |  | 是否已删除 |
| deleted_at | 删除时间 | 日期时间 | timestamp | 是 |  | 删除时间 |

### 方法定义

| 方法名称 | methodKey | 类型 |
|---------|-----------|------|
| 列表查询 | `FUW5FAbNha` | GUI |
| 新增 | `FUDC3wl6P8` | GUI |
| 编辑 | `FUhakKYGcF` | GUI |
| 查看详情 | `FU6Xezd5Pb` | GUI |
| 删除 | `FUWPKGnSWG` | GUI |
| 批量删除 | `FU3tKvMjiB` | GUI |
| 批量导出 | `FUgNmAK4ZF` | GUI |
| 批量导入 | `FUQdkyhrvX` | GUI |

### 方法详情（含SQL实现）

#### 列表查询

- **methodKey**: `FUW5FAbNha`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"operator_name","right":{"valueType":"1","value":"operator_name"}},{"field":"operator_id","right":{"valueType":"1","value":"operator_id"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"status","right":{"valueType":"1","value":"status"}},{"field":"total_amount","right":{"valueType":"1","value":"total_amount"}},{"field":"total_quantity","right":{"valueType":"1","value":"total_quantity"}},{"field":"in_warehouse_name","right":{"valueType":"1","value":"in_warehouse_name"}},{"field":"in_warehouse_id","right":{"valueType":"1","value":"in_warehouse_id"}},{"field":"out_warehouse_name","right":{"valueType":"1","value":"out_warehouse_name"}},{"field":"out_warehouse_id","right":{"valueType":"1","value":"out_warehouse_id"}},{"field":"order_date","right":{"valueType":"1","value":"order_date"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}},{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}}],"query":{"children":[{"op":"=","left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"},"config":{"test":"CONTAINSKEY(__params, \\"operator_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"},"config":{"test":"CONTAINSKEY(__params, \\"operator_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"status"},"right":{"valueType":"1","value":"@status"},"config":{"test":"CONTAINSKEY(__params, \\"status\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"total_amount"},"right":{"valueType":"1","value":"@total_amount"},"config":{"test":"CONTAINSKEY(__params, \\"total_amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"total_quantity"},"right":{"valueType":"1","value":"@total_quantity"},"config":{"test":"CONTAINSKEY(__params, \\"total_quantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"in_warehouse_name"},"right":{"valueType":"1","value":"@in_warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"in_warehouse_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"in_warehouse_id"},"right":{"valueType":"1","value":"@in_warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"in_warehouse_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"out_warehouse_name"},"right":{"valueType":"1","value":"@out_warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"out_warehouse_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"out_warehouse_id"},"right":{"valueType":"1","value":"@out_warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"out_warehouse_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"order_date"},"right":{"valueType":"1","value":["@order_date_start","@order_date_end"]},"config":{"test":"CONTAINSKEY(__params, \\"order_date_start\\") || CONTAINSKEY(__params, \\"order_date_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":true}}', 'methodConfig': '{"conditionExecuteStrategy":"notExecute"}'}
```

#### 新增

- **methodKey**: `FUDC3wl6P8`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'INSERT', 'gui': '{"data":[{"left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"}},{"left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"}},{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"}},{"left":{"field":"status"},"right":{"valueType":"1","value":"@status"}},{"left":{"field":"total_amount"},"right":{"valueType":"1","value":"@total_amount"}},{"left":{"field":"total_quantity"},"right":{"valueType":"1","value":"@total_quantity"}},{"left":{"field":"in_warehouse_name"},"right":{"valueType":"1","value":"@in_warehouse_name"}},{"left":{"field":"in_warehouse_id"},"right":{"valueType":"1","value":"@in_warehouse_id"}},{"left":{"field":"out_warehouse_name"},"right":{"valueType":"1","value":"@out_warehouse_name"}},{"left":{"field":"out_warehouse_id"},"right":{"valueType":"1","value":"@out_warehouse_id"}},{"left":{"field":"order_date"},"right":{"valueType":"1","value":"@order_date"}},{"left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"}}]}'}
```

#### 编辑

- **methodKey**: `FUhakKYGcF`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"},"config":{"test":"CONTAINSKEY(__params, \\"operator_name\\")","require":false}},{"left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"},"config":{"test":"CONTAINSKEY(__params, \\"operator_id\\")","require":false}},{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","require":false}},{"left":{"field":"status"},"right":{"valueType":"1","value":"@status"},"config":{"test":"CONTAINSKEY(__params, \\"status\\")","require":false}},{"left":{"field":"total_amount"},"right":{"valueType":"1","value":"@total_amount"},"config":{"test":"CONTAINSKEY(__params, \\"total_amount\\")","require":false}},{"left":{"field":"total_quantity"},"right":{"valueType":"1","value":"@total_quantity"},"config":{"test":"CONTAINSKEY(__params, \\"total_quantity\\")","require":false}},{"left":{"field":"in_warehouse_name"},"right":{"valueType":"1","value":"@in_warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"in_warehouse_name\\")","require":false}},{"left":{"field":"in_warehouse_id"},"right":{"valueType":"1","value":"@in_warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"in_warehouse_id\\")","require":false}},{"left":{"field":"out_warehouse_name"},"right":{"valueType":"1","value":"@out_warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"out_warehouse_name\\")","require":false}},{"left":{"field":"out_warehouse_id"},"right":{"valueType":"1","value":"@out_warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"out_warehouse_id\\")","require":false}},{"left":{"field":"order_date"},"right":{"valueType":"1","value":"@order_date"},"config":{"test":"CONTAINSKEY(__params, \\"order_date\\")","require":false}},{"left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","require":false}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 查看详情

- **methodKey**: `FU6Xezd5Pb`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"operator_name","right":{"valueType":"1","value":"operator_name"}},{"field":"operator_id","right":{"valueType":"1","value":"operator_id"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"status","right":{"valueType":"1","value":"status"}},{"field":"total_amount","right":{"valueType":"1","value":"total_amount"}},{"field":"total_quantity","right":{"valueType":"1","value":"total_quantity"}},{"field":"in_warehouse_name","right":{"valueType":"1","value":"in_warehouse_name"}},{"field":"in_warehouse_id","right":{"valueType":"1","value":"in_warehouse_id"}},{"field":"out_warehouse_name","right":{"valueType":"1","value":"out_warehouse_name"}},{"field":"out_warehouse_id","right":{"valueType":"1","value":"out_warehouse_id"}},{"field":"order_date","right":{"valueType":"1","value":"order_date"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}},{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 删除

- **methodKey**: `FUWPKGnSWG`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量删除

- **methodKey**: `FU3tKvMjiB`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"IN","left":{"field":"id"},"right":{"valueType":"1","value":"@ids"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量导出

- **methodKey**: `FUgNmAK4ZF`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"operator_name","right":{"valueType":"1","value":"operator_name"}},{"field":"operator_id","right":{"valueType":"1","value":"operator_id"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"status","right":{"valueType":"1","value":"status"}},{"field":"total_amount","right":{"valueType":"1","value":"total_amount"}},{"field":"total_quantity","right":{"valueType":"1","value":"total_quantity"}},{"field":"in_warehouse_name","right":{"valueType":"1","value":"in_warehouse_name"}},{"field":"in_warehouse_id","right":{"valueType":"1","value":"in_warehouse_id"}},{"field":"out_warehouse_name","right":{"valueType":"1","value":"out_warehouse_name"}},{"field":"out_warehouse_id","right":{"valueType":"1","value":"out_warehouse_id"}},{"field":"order_date","right":{"valueType":"1","value":"order_date"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}},{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}}],"query":{"children":[{"op":"=","left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"},"config":{"test":"CONTAINSKEY(__params, \\"operator_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"},"config":{"test":"CONTAINSKEY(__params, \\"operator_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"status"},"right":{"valueType":"1","value":"@status"},"config":{"test":"CONTAINSKEY(__params, \\"status\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"total_amount"},"right":{"valueType":"1","value":"@total_amount"},"config":{"test":"CONTAINSKEY(__params, \\"total_amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"total_quantity"},"right":{"valueType":"1","value":"@total_quantity"},"config":{"test":"CONTAINSKEY(__params, \\"total_quantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"in_warehouse_name"},"right":{"valueType":"1","value":"@in_warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"in_warehouse_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"in_warehouse_id"},"right":{"valueType":"1","value":"@in_warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"in_warehouse_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"out_warehouse_name"},"right":{"valueType":"1","value":"@out_warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"out_warehouse_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"out_warehouse_id"},"right":{"valueType":"1","value":"@out_warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"out_warehouse_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"order_date"},"right":{"valueType":"1","value":["@order_date_start","@order_date_end"]},"config":{"test":"CONTAINSKEY(__params, \\"order_date_start\\") || CONTAINSKEY(__params, \\"order_date_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":false}}', 'methodConfig': '{"exportRows":1000,"conditionExecuteStrategy":"notExecute","operation":"EXPORT","exportFormat":"Excel"}'}
```

#### 批量导入

- **methodKey**: `FUQdkyhrvX`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'BATCH_INSERT', 'gui': '{}', 'methodConfig': '{"operation":"IMPORT"}'}
```

---

## 销售退货单明细表

| 属性 | 值 |
|------|-----|
| modelKey | `MOHwXl5rMK` |
| modelNameEn | `sa_re_item` |
| tableName | `sa_re_item` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 长度 | 说明 |
|---------|---------|---------|-----------|------|------|------|
| remark | 备注 | 长文本 | varchar(1024) | 否 | 1024 |  |
| sn_codes | SN码列表 | 长文本 | varchar(1024) | 否 | 1024 |  |
| sn_count | SN码数量 | 整数 | int | 否 |  |  |
| amount | 金额 | 整数 | int | 否 |  |  |
| price | 单价 | 整数 | int | 否 |  |  |
| quantity | 数量 | 整数 | int | 否 |  |  |
| unit | 单位 | 短文本 | varchar(255) | 否 | 255 |  |
| product_code | 商品编码 | 短文本 | varchar(255) | 否 | 255 |  |
| product_name | 商品名称 | 短文本 | varchar(255) | 否 | 255 |  |
| product_id | 商品ID | 整数 | int | 否 |  |  |
| order_no | 单号 | 短文本 | varchar(255) | 否 | 255 |  |
| order_id | 主表ID | 整数 | int | 否 |  |  |
| id | 唯一标识 | 整数 | int | 是 |  | 唯一标识 |
| creator | 创建人 | 短文本 | varchar(255) | 是 | 255 | 创建人姓名 |
| created_at | 创建时间 | 日期时间 | timestamp | 是 |  | 创建时间 |
| updater | 更新人 | 短文本 | varchar(255) | 是 | 255 | 更新人姓名 |
| updated_at | 更新时间 | 日期时间 | timestamp | 是 |  | 更新时间 |
| is_deleted | 是否删除 | 布尔 | tinyint | 是 |  | 是否已删除 |
| deleted_at | 删除时间 | 日期时间 | timestamp | 是 |  | 删除时间 |

### 方法定义

| 方法名称 | methodKey | 类型 |
|---------|-----------|------|
| 列表查询 | `FUsSZubXQP` | GUI |
| 新增 | `FUPWcYQRZH` | GUI |
| 编辑 | `FUXFdIKzWu` | GUI |
| 查看详情 | `FUNV5MqtFR` | GUI |
| 删除 | `FUJILPWTi7` | GUI |
| 批量删除 | `FU3OO09WcA` | GUI |
| 批量导出 | `FU9F9JVVvI` | GUI |
| 批量导入 | `FUEBb02ZQJ` | GUI |

### 方法详情（含SQL实现）

#### 列表查询

- **methodKey**: `FUsSZubXQP`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"sn_codes","right":{"valueType":"1","value":"sn_codes"}},{"field":"sn_count","right":{"valueType":"1","value":"sn_count"}},{"field":"amount","right":{"valueType":"1","value":"amount"}},{"field":"price","right":{"valueType":"1","value":"price"}},{"field":"quantity","right":{"valueType":"1","value":"quantity"}},{"field":"unit","right":{"valueType":"1","value":"unit"}},{"field":"product_code","right":{"valueType":"1","value":"product_code"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_id","right":{"valueType":"1","value":"product_id"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}},{"field":"order_id","right":{"valueType":"1","value":"order_id"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_codes"},"right":{"valueType":"1","value":"@sn_codes"},"config":{"test":"CONTAINSKEY(__params, \\"sn_codes\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_count"},"right":{"valueType":"1","value":"@sn_count"},"config":{"test":"CONTAINSKEY(__params, \\"sn_count\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"amount"},"right":{"valueType":"1","value":"@amount"},"config":{"test":"CONTAINSKEY(__params, \\"amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"price"},"right":{"valueType":"1","value":"@price"},"config":{"test":"CONTAINSKEY(__params, \\"price\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"quantity"},"right":{"valueType":"1","value":"@quantity"},"config":{"test":"CONTAINSKEY(__params, \\"quantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"},"config":{"test":"CONTAINSKEY(__params, \\"unit\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"},"config":{"test":"CONTAINSKEY(__params, \\"product_code\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"},"config":{"test":"CONTAINSKEY(__params, \\"product_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_id"},"right":{"valueType":"1","value":"@order_id"},"config":{"test":"CONTAINSKEY(__params, \\"order_id\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":true}}', 'methodConfig': '{"conditionExecuteStrategy":"notExecute"}'}
```

#### 新增

- **methodKey**: `FUPWcYQRZH`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'INSERT', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"}},{"left":{"field":"sn_codes"},"right":{"valueType":"1","value":"@sn_codes"}},{"left":{"field":"sn_count"},"right":{"valueType":"1","value":"@sn_count"}},{"left":{"field":"amount"},"right":{"valueType":"1","value":"@amount"}},{"left":{"field":"price"},"right":{"valueType":"1","value":"@price"}},{"left":{"field":"quantity"},"right":{"valueType":"1","value":"@quantity"}},{"left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"}},{"left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"}},{"left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"}},{"left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"}},{"left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"}},{"left":{"field":"order_id"},"right":{"valueType":"1","value":"@order_id"}}]}'}
```

#### 编辑

- **methodKey**: `FUXFdIKzWu`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","require":false}},{"left":{"field":"sn_codes"},"right":{"valueType":"1","value":"@sn_codes"},"config":{"test":"CONTAINSKEY(__params, \\"sn_codes\\")","require":false}},{"left":{"field":"sn_count"},"right":{"valueType":"1","value":"@sn_count"},"config":{"test":"CONTAINSKEY(__params, \\"sn_count\\")","require":false}},{"left":{"field":"amount"},"right":{"valueType":"1","value":"@amount"},"config":{"test":"CONTAINSKEY(__params, \\"amount\\")","require":false}},{"left":{"field":"price"},"right":{"valueType":"1","value":"@price"},"config":{"test":"CONTAINSKEY(__params, \\"price\\")","require":false}},{"left":{"field":"quantity"},"right":{"valueType":"1","value":"@quantity"},"config":{"test":"CONTAINSKEY(__params, \\"quantity\\")","require":false}},{"left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"},"config":{"test":"CONTAINSKEY(__params, \\"unit\\")","require":false}},{"left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"},"config":{"test":"CONTAINSKEY(__params, \\"product_code\\")","require":false}},{"left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","require":false}},{"left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"},"config":{"test":"CONTAINSKEY(__params, \\"product_id\\")","require":false}},{"left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","require":false}},{"left":{"field":"order_id"},"right":{"valueType":"1","value":"@order_id"},"config":{"test":"CONTAINSKEY(__params, \\"order_id\\")","require":false}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 查看详情

- **methodKey**: `FUNV5MqtFR`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"sn_codes","right":{"valueType":"1","value":"sn_codes"}},{"field":"sn_count","right":{"valueType":"1","value":"sn_count"}},{"field":"amount","right":{"valueType":"1","value":"amount"}},{"field":"price","right":{"valueType":"1","value":"price"}},{"field":"quantity","right":{"valueType":"1","value":"quantity"}},{"field":"unit","right":{"valueType":"1","value":"unit"}},{"field":"product_code","right":{"valueType":"1","value":"product_code"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_id","right":{"valueType":"1","value":"product_id"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}},{"field":"order_id","right":{"valueType":"1","value":"order_id"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 删除

- **methodKey**: `FUJILPWTi7`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量删除

- **methodKey**: `FU3OO09WcA`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"IN","left":{"field":"id"},"right":{"valueType":"1","value":"@ids"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量导出

- **methodKey**: `FU9F9JVVvI`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"sn_codes","right":{"valueType":"1","value":"sn_codes"}},{"field":"sn_count","right":{"valueType":"1","value":"sn_count"}},{"field":"amount","right":{"valueType":"1","value":"amount"}},{"field":"price","right":{"valueType":"1","value":"price"}},{"field":"quantity","right":{"valueType":"1","value":"quantity"}},{"field":"unit","right":{"valueType":"1","value":"unit"}},{"field":"product_code","right":{"valueType":"1","value":"product_code"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_id","right":{"valueType":"1","value":"product_id"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}},{"field":"order_id","right":{"valueType":"1","value":"order_id"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_codes"},"right":{"valueType":"1","value":"@sn_codes"},"config":{"test":"CONTAINSKEY(__params, \\"sn_codes\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_count"},"right":{"valueType":"1","value":"@sn_count"},"config":{"test":"CONTAINSKEY(__params, \\"sn_count\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"amount"},"right":{"valueType":"1","value":"@amount"},"config":{"test":"CONTAINSKEY(__params, \\"amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"price"},"right":{"valueType":"1","value":"@price"},"config":{"test":"CONTAINSKEY(__params, \\"price\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"quantity"},"right":{"valueType":"1","value":"@quantity"},"config":{"test":"CONTAINSKEY(__params, \\"quantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"},"config":{"test":"CONTAINSKEY(__params, \\"unit\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"},"config":{"test":"CONTAINSKEY(__params, \\"product_code\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"},"config":{"test":"CONTAINSKEY(__params, \\"product_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_id"},"right":{"valueType":"1","value":"@order_id"},"config":{"test":"CONTAINSKEY(__params, \\"order_id\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":false}}', 'methodConfig': '{"exportRows":1000,"conditionExecuteStrategy":"notExecute","operation":"EXPORT","exportFormat":"Excel"}'}
```

#### 批量导入

- **methodKey**: `FUEBb02ZQJ`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'BATCH_INSERT', 'gui': '{}', 'methodConfig': '{"operation":"IMPORT"}'}
```

---

## 销售退货单主表

| 属性 | 值 |
|------|-----|
| modelKey | `MOky0Pcw6W` |
| modelNameEn | `sa_re_ord` |
| tableName | `sa_re_ord` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 长度 | 说明 |
|---------|---------|---------|-----------|------|------|------|
| operator_name | 操作人名称 | 短文本 | varchar(255) | 否 | 255 |  |
| operator_id | 操作人ID | 短文本 | varchar(255) | 否 | 255 |  |
| remark | 备注 | 长文本 | varchar(1024) | 否 | 1024 |  |
| status | 状态 | 短文本 | varchar(255) | 否 | 255 |  |
| total_amount | 总金额 | 整数 | int | 否 |  |  |
| source_order_no | 原出库单号 | 短文本 | varchar(255) | 否 | 255 |  |
| warehouse_name | 仓库名称 | 短文本 | varchar(255) | 否 | 255 |  |
| warehouse_id | 仓库ID | 整数 | int | 否 |  |  |
| customer_name | 客户名称 | 短文本 | varchar(255) | 否 | 255 |  |
| customer_id | 客户ID | 整数 | int | 否 |  |  |
| order_date | 单据日期 | 日期时间 | datetime | 否 |  |  |
| order_no | 单号 | 短文本 | varchar(255) | 否 | 255 |  |
| id | 唯一标识 | 整数 | int | 是 |  | 唯一标识 |
| creator | 创建人 | 短文本 | varchar(255) | 是 | 255 | 创建人姓名 |
| created_at | 创建时间 | 日期时间 | timestamp | 是 |  | 创建时间 |
| updater | 更新人 | 短文本 | varchar(255) | 是 | 255 | 更新人姓名 |
| updated_at | 更新时间 | 日期时间 | timestamp | 是 |  | 更新时间 |
| is_deleted | 是否删除 | 布尔 | tinyint | 是 |  | 是否已删除 |
| deleted_at | 删除时间 | 日期时间 | timestamp | 是 |  | 删除时间 |

### 方法定义

| 方法名称 | methodKey | 类型 |
|---------|-----------|------|
| 列表查询 | `FUQI57ueUm` | GUI |
| 新增 | `FUg7l9v2dQ` | GUI |
| 编辑 | `FUXY7dYmUj` | GUI |
| 查看详情 | `FU1gan9X1c` | GUI |
| 删除 | `FUX4qpKVVC` | GUI |
| 批量删除 | `FUrGq8jTi7` | GUI |
| 批量导出 | `FUAj4U6Jv5` | GUI |
| 批量导入 | `FU8uzCdJzp` | GUI |

### 方法详情（含SQL实现）

#### 列表查询

- **methodKey**: `FUQI57ueUm`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"operator_name","right":{"valueType":"1","value":"operator_name"}},{"field":"operator_id","right":{"valueType":"1","value":"operator_id"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"status","right":{"valueType":"1","value":"status"}},{"field":"total_amount","right":{"valueType":"1","value":"total_amount"}},{"field":"source_order_no","right":{"valueType":"1","value":"source_order_no"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_id","right":{"valueType":"1","value":"warehouse_id"}},{"field":"customer_name","right":{"valueType":"1","value":"customer_name"}},{"field":"customer_id","right":{"valueType":"1","value":"customer_id"}},{"field":"order_date","right":{"valueType":"1","value":"order_date"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"},"config":{"test":"CONTAINSKEY(__params, \\"operator_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"},"config":{"test":"CONTAINSKEY(__params, \\"operator_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"status"},"right":{"valueType":"1","value":"@status"},"config":{"test":"CONTAINSKEY(__params, \\"status\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"total_amount"},"right":{"valueType":"1","value":"@total_amount"},"config":{"test":"CONTAINSKEY(__params, \\"total_amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"source_order_no"},"right":{"valueType":"1","value":"@source_order_no"},"config":{"test":"CONTAINSKEY(__params, \\"source_order_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"customer_name"},"right":{"valueType":"1","value":"@customer_name"},"config":{"test":"CONTAINSKEY(__params, \\"customer_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"customer_id"},"right":{"valueType":"1","value":"@customer_id"},"config":{"test":"CONTAINSKEY(__params, \\"customer_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"order_date"},"right":{"valueType":"1","value":["@order_date_start","@order_date_end"]},"config":{"test":"CONTAINSKEY(__params, \\"order_date_start\\") || CONTAINSKEY(__params, \\"order_date_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":true}}', 'methodConfig': '{"conditionExecuteStrategy":"notExecute"}'}
```

#### 新增

- **methodKey**: `FUg7l9v2dQ`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'INSERT', 'gui': '{"data":[{"left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"}},{"left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"}},{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"}},{"left":{"field":"status"},"right":{"valueType":"1","value":"@status"}},{"left":{"field":"total_amount"},"right":{"valueType":"1","value":"@total_amount"}},{"left":{"field":"source_order_no"},"right":{"valueType":"1","value":"@source_order_no"}},{"left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"}},{"left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"}},{"left":{"field":"customer_name"},"right":{"valueType":"1","value":"@customer_name"}},{"left":{"field":"customer_id"},"right":{"valueType":"1","value":"@customer_id"}},{"left":{"field":"order_date"},"right":{"valueType":"1","value":"@order_date"}},{"left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"}}]}'}
```

#### 编辑

- **methodKey**: `FUXY7dYmUj`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"},"config":{"test":"CONTAINSKEY(__params, \\"operator_name\\")","require":false}},{"left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"},"config":{"test":"CONTAINSKEY(__params, \\"operator_id\\")","require":false}},{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","require":false}},{"left":{"field":"status"},"right":{"valueType":"1","value":"@status"},"config":{"test":"CONTAINSKEY(__params, \\"status\\")","require":false}},{"left":{"field":"total_amount"},"right":{"valueType":"1","value":"@total_amount"},"config":{"test":"CONTAINSKEY(__params, \\"total_amount\\")","require":false}},{"left":{"field":"source_order_no"},"right":{"valueType":"1","value":"@source_order_no"},"config":{"test":"CONTAINSKEY(__params, \\"source_order_no\\")","require":false}},{"left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","require":false}},{"left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_id\\")","require":false}},{"left":{"field":"customer_name"},"right":{"valueType":"1","value":"@customer_name"},"config":{"test":"CONTAINSKEY(__params, \\"customer_name\\")","require":false}},{"left":{"field":"customer_id"},"right":{"valueType":"1","value":"@customer_id"},"config":{"test":"CONTAINSKEY(__params, \\"customer_id\\")","require":false}},{"left":{"field":"order_date"},"right":{"valueType":"1","value":"@order_date"},"config":{"test":"CONTAINSKEY(__params, \\"order_date\\")","require":false}},{"left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","require":false}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 查看详情

- **methodKey**: `FU1gan9X1c`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"operator_name","right":{"valueType":"1","value":"operator_name"}},{"field":"operator_id","right":{"valueType":"1","value":"operator_id"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"status","right":{"valueType":"1","value":"status"}},{"field":"total_amount","right":{"valueType":"1","value":"total_amount"}},{"field":"source_order_no","right":{"valueType":"1","value":"source_order_no"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_id","right":{"valueType":"1","value":"warehouse_id"}},{"field":"customer_name","right":{"valueType":"1","value":"customer_name"}},{"field":"customer_id","right":{"valueType":"1","value":"customer_id"}},{"field":"order_date","right":{"valueType":"1","value":"order_date"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 删除

- **methodKey**: `FUX4qpKVVC`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量删除

- **methodKey**: `FUrGq8jTi7`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"IN","left":{"field":"id"},"right":{"valueType":"1","value":"@ids"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量导出

- **methodKey**: `FUAj4U6Jv5`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"operator_name","right":{"valueType":"1","value":"operator_name"}},{"field":"operator_id","right":{"valueType":"1","value":"operator_id"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"status","right":{"valueType":"1","value":"status"}},{"field":"total_amount","right":{"valueType":"1","value":"total_amount"}},{"field":"source_order_no","right":{"valueType":"1","value":"source_order_no"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_id","right":{"valueType":"1","value":"warehouse_id"}},{"field":"customer_name","right":{"valueType":"1","value":"customer_name"}},{"field":"customer_id","right":{"valueType":"1","value":"customer_id"}},{"field":"order_date","right":{"valueType":"1","value":"order_date"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"},"config":{"test":"CONTAINSKEY(__params, \\"operator_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"},"config":{"test":"CONTAINSKEY(__params, \\"operator_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"status"},"right":{"valueType":"1","value":"@status"},"config":{"test":"CONTAINSKEY(__params, \\"status\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"total_amount"},"right":{"valueType":"1","value":"@total_amount"},"config":{"test":"CONTAINSKEY(__params, \\"total_amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"source_order_no"},"right":{"valueType":"1","value":"@source_order_no"},"config":{"test":"CONTAINSKEY(__params, \\"source_order_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"customer_name"},"right":{"valueType":"1","value":"@customer_name"},"config":{"test":"CONTAINSKEY(__params, \\"customer_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"customer_id"},"right":{"valueType":"1","value":"@customer_id"},"config":{"test":"CONTAINSKEY(__params, \\"customer_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"order_date"},"right":{"valueType":"1","value":["@order_date_start","@order_date_end"]},"config":{"test":"CONTAINSKEY(__params, \\"order_date_start\\") || CONTAINSKEY(__params, \\"order_date_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":false}}', 'methodConfig': '{"exportRows":1000,"conditionExecuteStrategy":"notExecute","operation":"EXPORT","exportFormat":"Excel"}'}
```

#### 批量导入

- **methodKey**: `FU8uzCdJzp`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'BATCH_INSERT', 'gui': '{}', 'methodConfig': '{"operation":"IMPORT"}'}
```

---

## 采购退货单明细表

| 属性 | 值 |
|------|-----|
| modelKey | `MOkM8P1d1B` |
| modelNameEn | `pur_re_item` |
| tableName | `pur_re_item` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 长度 | 说明 |
|---------|---------|---------|-----------|------|------|------|
| remark | 备注 | 短文本 | varchar(255) | 否 | 255 |  |
| sn_codes | SN码列表 | 长文本 | varchar(1024) | 否 | 1024 |  |
| sn_count | SN码数量 | 整数 | int | 否 |  |  |
| amount | 金额 | 整数 | int | 否 |  |  |
| price | 单价 | 整数 | int | 否 |  |  |
| quantity | 数量 | 整数 | int | 否 |  |  |
| unit | 单位 | 短文本 | varchar(255) | 否 | 255 |  |
| product_code | 商品编码 | 短文本 | varchar(255) | 否 | 255 |  |
| product_name | 商品名称 | 短文本 | varchar(255) | 否 | 255 |  |
| product_id | 商品ID | 整数 | int | 否 |  |  |
| order_no | 单号 | 短文本 | varchar(255) | 否 | 255 |  |
| order_id | 主表ID | 整数 | int | 否 |  |  |
| id | 唯一标识 | 整数 | int | 是 |  | 唯一标识 |
| creator | 创建人 | 短文本 | varchar(255) | 是 | 255 | 创建人姓名 |
| created_at | 创建时间 | 日期时间 | timestamp | 是 |  | 创建时间 |
| updater | 更新人 | 短文本 | varchar(255) | 是 | 255 | 更新人姓名 |
| updated_at | 更新时间 | 日期时间 | timestamp | 是 |  | 更新时间 |
| is_deleted | 是否删除 | 布尔 | tinyint | 是 |  | 是否已删除 |
| deleted_at | 删除时间 | 日期时间 | timestamp | 是 |  | 删除时间 |

### 方法定义

| 方法名称 | methodKey | 类型 |
|---------|-----------|------|
| 列表查询 | `FU0Ni6lOWq` | GUI |
| 新增 | `FU5qSwqWsW` | GUI |
| 编辑 | `FU29Cq0hVc` | GUI |
| 查看详情 | `FU8pDdlcYD` | GUI |
| 删除 | `FUgvKTGWiX` | GUI |
| 批量删除 | `FUXF7X6pzL` | GUI |
| 批量导出 | `FUc4qCd4MA` | GUI |
| 批量导入 | `FUVRNEemj4` | GUI |

### 方法详情（含SQL实现）

#### 列表查询

- **methodKey**: `FU0Ni6lOWq`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"sn_codes","right":{"valueType":"1","value":"sn_codes"}},{"field":"sn_count","right":{"valueType":"1","value":"sn_count"}},{"field":"amount","right":{"valueType":"1","value":"amount"}},{"field":"price","right":{"valueType":"1","value":"price"}},{"field":"quantity","right":{"valueType":"1","value":"quantity"}},{"field":"unit","right":{"valueType":"1","value":"unit"}},{"field":"product_code","right":{"valueType":"1","value":"product_code"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_id","right":{"valueType":"1","value":"product_id"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}},{"field":"order_id","right":{"valueType":"1","value":"order_id"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_codes"},"right":{"valueType":"1","value":"@sn_codes"},"config":{"test":"CONTAINSKEY(__params, \\"sn_codes\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_count"},"right":{"valueType":"1","value":"@sn_count"},"config":{"test":"CONTAINSKEY(__params, \\"sn_count\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"amount"},"right":{"valueType":"1","value":"@amount"},"config":{"test":"CONTAINSKEY(__params, \\"amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"price"},"right":{"valueType":"1","value":"@price"},"config":{"test":"CONTAINSKEY(__params, \\"price\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"quantity"},"right":{"valueType":"1","value":"@quantity"},"config":{"test":"CONTAINSKEY(__params, \\"quantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"},"config":{"test":"CONTAINSKEY(__params, \\"unit\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"},"config":{"test":"CONTAINSKEY(__params, \\"product_code\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"},"config":{"test":"CONTAINSKEY(__params, \\"product_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_id"},"right":{"valueType":"1","value":"@order_id"},"config":{"test":"CONTAINSKEY(__params, \\"order_id\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":true}}', 'methodConfig': '{"conditionExecuteStrategy":"notExecute"}'}
```

#### 新增

- **methodKey**: `FU5qSwqWsW`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'INSERT', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"}},{"left":{"field":"sn_codes"},"right":{"valueType":"1","value":"@sn_codes"}},{"left":{"field":"sn_count"},"right":{"valueType":"1","value":"@sn_count"}},{"left":{"field":"amount"},"right":{"valueType":"1","value":"@amount"}},{"left":{"field":"price"},"right":{"valueType":"1","value":"@price"}},{"left":{"field":"quantity"},"right":{"valueType":"1","value":"@quantity"}},{"left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"}},{"left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"}},{"left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"}},{"left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"}},{"left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"}},{"left":{"field":"order_id"},"right":{"valueType":"1","value":"@order_id"}}]}'}
```

#### 编辑

- **methodKey**: `FU29Cq0hVc`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","require":false}},{"left":{"field":"sn_codes"},"right":{"valueType":"1","value":"@sn_codes"},"config":{"test":"CONTAINSKEY(__params, \\"sn_codes\\")","require":false}},{"left":{"field":"sn_count"},"right":{"valueType":"1","value":"@sn_count"},"config":{"test":"CONTAINSKEY(__params, \\"sn_count\\")","require":false}},{"left":{"field":"amount"},"right":{"valueType":"1","value":"@amount"},"config":{"test":"CONTAINSKEY(__params, \\"amount\\")","require":false}},{"left":{"field":"price"},"right":{"valueType":"1","value":"@price"},"config":{"test":"CONTAINSKEY(__params, \\"price\\")","require":false}},{"left":{"field":"quantity"},"right":{"valueType":"1","value":"@quantity"},"config":{"test":"CONTAINSKEY(__params, \\"quantity\\")","require":false}},{"left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"},"config":{"test":"CONTAINSKEY(__params, \\"unit\\")","require":false}},{"left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"},"config":{"test":"CONTAINSKEY(__params, \\"product_code\\")","require":false}},{"left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","require":false}},{"left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"},"config":{"test":"CONTAINSKEY(__params, \\"product_id\\")","require":false}},{"left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","require":false}},{"left":{"field":"order_id"},"right":{"valueType":"1","value":"@order_id"},"config":{"test":"CONTAINSKEY(__params, \\"order_id\\")","require":false}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 查看详情

- **methodKey**: `FU8pDdlcYD`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"sn_codes","right":{"valueType":"1","value":"sn_codes"}},{"field":"sn_count","right":{"valueType":"1","value":"sn_count"}},{"field":"amount","right":{"valueType":"1","value":"amount"}},{"field":"price","right":{"valueType":"1","value":"price"}},{"field":"quantity","right":{"valueType":"1","value":"quantity"}},{"field":"unit","right":{"valueType":"1","value":"unit"}},{"field":"product_code","right":{"valueType":"1","value":"product_code"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_id","right":{"valueType":"1","value":"product_id"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}},{"field":"order_id","right":{"valueType":"1","value":"order_id"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 删除

- **methodKey**: `FUgvKTGWiX`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量删除

- **methodKey**: `FUXF7X6pzL`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"IN","left":{"field":"id"},"right":{"valueType":"1","value":"@ids"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量导出

- **methodKey**: `FUc4qCd4MA`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"sn_codes","right":{"valueType":"1","value":"sn_codes"}},{"field":"sn_count","right":{"valueType":"1","value":"sn_count"}},{"field":"amount","right":{"valueType":"1","value":"amount"}},{"field":"price","right":{"valueType":"1","value":"price"}},{"field":"quantity","right":{"valueType":"1","value":"quantity"}},{"field":"unit","right":{"valueType":"1","value":"unit"}},{"field":"product_code","right":{"valueType":"1","value":"product_code"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_id","right":{"valueType":"1","value":"product_id"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}},{"field":"order_id","right":{"valueType":"1","value":"order_id"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_codes"},"right":{"valueType":"1","value":"@sn_codes"},"config":{"test":"CONTAINSKEY(__params, \\"sn_codes\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_count"},"right":{"valueType":"1","value":"@sn_count"},"config":{"test":"CONTAINSKEY(__params, \\"sn_count\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"amount"},"right":{"valueType":"1","value":"@amount"},"config":{"test":"CONTAINSKEY(__params, \\"amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"price"},"right":{"valueType":"1","value":"@price"},"config":{"test":"CONTAINSKEY(__params, \\"price\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"quantity"},"right":{"valueType":"1","value":"@quantity"},"config":{"test":"CONTAINSKEY(__params, \\"quantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"},"config":{"test":"CONTAINSKEY(__params, \\"unit\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"},"config":{"test":"CONTAINSKEY(__params, \\"product_code\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"},"config":{"test":"CONTAINSKEY(__params, \\"product_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_id"},"right":{"valueType":"1","value":"@order_id"},"config":{"test":"CONTAINSKEY(__params, \\"order_id\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":false}}', 'methodConfig': '{"exportRows":1000,"conditionExecuteStrategy":"notExecute","operation":"EXPORT","exportFormat":"Excel"}'}
```

#### 批量导入

- **methodKey**: `FUVRNEemj4`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'BATCH_INSERT', 'gui': '{}', 'methodConfig': '{"operation":"IMPORT"}'}
```

---

## 采购退货单主表

| 属性 | 值 |
|------|-----|
| modelKey | `MOV8t2Ah9X` |
| modelNameEn | `pur_re_ord` |
| tableName | `pur_re_ord` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 长度 | 说明 |
|---------|---------|---------|-----------|------|------|------|
| operator_name | 操作人名称 | 短文本 | varchar(255) | 否 | 255 |  |
| operator_id | 操作人ID | 短文本 | varchar(255) | 否 | 255 |  |
| remark | 备注 | 长文本 | varchar(1024) | 否 | 1024 |  |
| status | 状态 | 短文本 | varchar(255) | 否 | 255 |  |
| total_amount | 总金额 | 整数 | int | 否 |  |  |
| source_order_no | 原入库单号 | 短文本 | varchar(255) | 否 | 255 |  |
| warehouse_name | 仓库名称 | 短文本 | varchar(255) | 否 | 255 |  |
| warehouse_id | 仓库ID | 整数 | int | 否 |  |  |
| supplier_name | 供应商名称 | 短文本 | varchar(255) | 否 | 255 |  |
| supplier_id | 供应商ID | 整数 | int | 否 |  |  |
| order_date | 单据日期 | 日期时间 | datetime | 否 |  |  |
| order_no | 单号 | 短文本 | varchar(255) | 否 | 255 |  |
| id | 唯一标识 | 整数 | int | 是 |  | 唯一标识 |
| creator | 创建人 | 短文本 | varchar(255) | 是 | 255 | 创建人姓名 |
| created_at | 创建时间 | 日期时间 | timestamp | 是 |  | 创建时间 |
| updater | 更新人 | 短文本 | varchar(255) | 是 | 255 | 更新人姓名 |
| updated_at | 更新时间 | 日期时间 | timestamp | 是 |  | 更新时间 |
| is_deleted | 是否删除 | 布尔 | tinyint | 是 |  | 是否已删除 |
| deleted_at | 删除时间 | 日期时间 | timestamp | 是 |  | 删除时间 |

### 方法定义

| 方法名称 | methodKey | 类型 |
|---------|-----------|------|
| 列表查询 | `FUaZ4wLM6e` | GUI |
| 新增 | `FUKfVnr5XQ` | GUI |
| 编辑 | `FU1VDz9NRt` | GUI |
| 查看详情 | `FUrCduAiGn` | GUI |
| 删除 | `FUi8k13k4F` | GUI |
| 批量删除 | `FU4tm0gFpl` | GUI |
| 批量导出 | `FUKu2Z0myj` | GUI |
| 批量导入 | `FUEPCjocrT` | GUI |

### 方法详情（含SQL实现）

#### 列表查询

- **methodKey**: `FUaZ4wLM6e`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"operator_name","right":{"valueType":"1","value":"operator_name"}},{"field":"operator_id","right":{"valueType":"1","value":"operator_id"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"status","right":{"valueType":"1","value":"status"}},{"field":"total_amount","right":{"valueType":"1","value":"total_amount"}},{"field":"source_order_no","right":{"valueType":"1","value":"source_order_no"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_id","right":{"valueType":"1","value":"warehouse_id"}},{"field":"supplier_name","right":{"valueType":"1","value":"supplier_name"}},{"field":"supplier_id","right":{"valueType":"1","value":"supplier_id"}},{"field":"order_date","right":{"valueType":"1","value":"order_date"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"},"config":{"test":"CONTAINSKEY(__params, \\"operator_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"},"config":{"test":"CONTAINSKEY(__params, \\"operator_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"status"},"right":{"valueType":"1","value":"@status"},"config":{"test":"CONTAINSKEY(__params, \\"status\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"total_amount"},"right":{"valueType":"1","value":"@total_amount"},"config":{"test":"CONTAINSKEY(__params, \\"total_amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"source_order_no"},"right":{"valueType":"1","value":"@source_order_no"},"config":{"test":"CONTAINSKEY(__params, \\"source_order_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"supplier_name"},"right":{"valueType":"1","value":"@supplier_name"},"config":{"test":"CONTAINSKEY(__params, \\"supplier_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"supplier_id"},"right":{"valueType":"1","value":"@supplier_id"},"config":{"test":"CONTAINSKEY(__params, \\"supplier_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"order_date"},"right":{"valueType":"1","value":["@order_date_start","@order_date_end"]},"config":{"test":"CONTAINSKEY(__params, \\"order_date_start\\") || CONTAINSKEY(__params, \\"order_date_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":true}}', 'methodConfig': '{"conditionExecuteStrategy":"notExecute"}'}
```

#### 新增

- **methodKey**: `FUKfVnr5XQ`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'INSERT', 'gui': '{"data":[{"left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"}},{"left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"}},{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"}},{"left":{"field":"status"},"right":{"valueType":"1","value":"@status"}},{"left":{"field":"total_amount"},"right":{"valueType":"1","value":"@total_amount"}},{"left":{"field":"source_order_no"},"right":{"valueType":"1","value":"@source_order_no"}},{"left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"}},{"left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"}},{"left":{"field":"supplier_name"},"right":{"valueType":"1","value":"@supplier_name"}},{"left":{"field":"supplier_id"},"right":{"valueType":"1","value":"@supplier_id"}},{"left":{"field":"order_date"},"right":{"valueType":"1","value":"@order_date"}},{"left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"}}]}'}
```

#### 编辑

- **methodKey**: `FU1VDz9NRt`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"},"config":{"test":"CONTAINSKEY(__params, \\"operator_name\\")","require":false}},{"left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"},"config":{"test":"CONTAINSKEY(__params, \\"operator_id\\")","require":false}},{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","require":false}},{"left":{"field":"status"},"right":{"valueType":"1","value":"@status"},"config":{"test":"CONTAINSKEY(__params, \\"status\\")","require":false}},{"left":{"field":"total_amount"},"right":{"valueType":"1","value":"@total_amount"},"config":{"test":"CONTAINSKEY(__params, \\"total_amount\\")","require":false}},{"left":{"field":"source_order_no"},"right":{"valueType":"1","value":"@source_order_no"},"config":{"test":"CONTAINSKEY(__params, \\"source_order_no\\")","require":false}},{"left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","require":false}},{"left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_id\\")","require":false}},{"left":{"field":"supplier_name"},"right":{"valueType":"1","value":"@supplier_name"},"config":{"test":"CONTAINSKEY(__params, \\"supplier_name\\")","require":false}},{"left":{"field":"supplier_id"},"right":{"valueType":"1","value":"@supplier_id"},"config":{"test":"CONTAINSKEY(__params, \\"supplier_id\\")","require":false}},{"left":{"field":"order_date"},"right":{"valueType":"1","value":"@order_date"},"config":{"test":"CONTAINSKEY(__params, \\"order_date\\")","require":false}},{"left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","require":false}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 查看详情

- **methodKey**: `FUrCduAiGn`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"operator_name","right":{"valueType":"1","value":"operator_name"}},{"field":"operator_id","right":{"valueType":"1","value":"operator_id"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"status","right":{"valueType":"1","value":"status"}},{"field":"total_amount","right":{"valueType":"1","value":"total_amount"}},{"field":"source_order_no","right":{"valueType":"1","value":"source_order_no"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_id","right":{"valueType":"1","value":"warehouse_id"}},{"field":"supplier_name","right":{"valueType":"1","value":"supplier_name"}},{"field":"supplier_id","right":{"valueType":"1","value":"supplier_id"}},{"field":"order_date","right":{"valueType":"1","value":"order_date"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 删除

- **methodKey**: `FUi8k13k4F`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量删除

- **methodKey**: `FU4tm0gFpl`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"IN","left":{"field":"id"},"right":{"valueType":"1","value":"@ids"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量导出

- **methodKey**: `FUKu2Z0myj`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"operator_name","right":{"valueType":"1","value":"operator_name"}},{"field":"operator_id","right":{"valueType":"1","value":"operator_id"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"status","right":{"valueType":"1","value":"status"}},{"field":"total_amount","right":{"valueType":"1","value":"total_amount"}},{"field":"source_order_no","right":{"valueType":"1","value":"source_order_no"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_id","right":{"valueType":"1","value":"warehouse_id"}},{"field":"supplier_name","right":{"valueType":"1","value":"supplier_name"}},{"field":"supplier_id","right":{"valueType":"1","value":"supplier_id"}},{"field":"order_date","right":{"valueType":"1","value":"order_date"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"},"config":{"test":"CONTAINSKEY(__params, \\"operator_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"},"config":{"test":"CONTAINSKEY(__params, \\"operator_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"status"},"right":{"valueType":"1","value":"@status"},"config":{"test":"CONTAINSKEY(__params, \\"status\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"total_amount"},"right":{"valueType":"1","value":"@total_amount"},"config":{"test":"CONTAINSKEY(__params, \\"total_amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"source_order_no"},"right":{"valueType":"1","value":"@source_order_no"},"config":{"test":"CONTAINSKEY(__params, \\"source_order_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"supplier_name"},"right":{"valueType":"1","value":"@supplier_name"},"config":{"test":"CONTAINSKEY(__params, \\"supplier_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"supplier_id"},"right":{"valueType":"1","value":"@supplier_id"},"config":{"test":"CONTAINSKEY(__params, \\"supplier_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"order_date"},"right":{"valueType":"1","value":["@order_date_start","@order_date_end"]},"config":{"test":"CONTAINSKEY(__params, \\"order_date_start\\") || CONTAINSKEY(__params, \\"order_date_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":false}}', 'methodConfig': '{"exportRows":1000,"conditionExecuteStrategy":"notExecute","operation":"EXPORT","exportFormat":"Excel"}'}
```

#### 批量导入

- **methodKey**: `FUEPCjocrT`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'BATCH_INSERT', 'gui': '{}', 'methodConfig': '{"operation":"IMPORT"}'}
```

---

## 销售出库单明细表

| 属性 | 值 |
|------|-----|
| modelKey | `MOg8t6pKm4` |
| modelNameEn | `stock_out_item` |
| tableName | `stock_out_item` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 长度 | 说明 |
|---------|---------|---------|-----------|------|------|------|
| remark | 备注 | 短文本 | varchar(255) | 否 | 255 |  |
| sn_codes | SN码列表 | 长文本 | varchar(1024) | 否 | 1024 |  |
| sn_count | SN码数量 | 整数 | int | 否 |  |  |
| amount | 金额 | 整数 | int | 否 |  |  |
| price | 单价 | 整数 | int | 否 |  |  |
| quantity | 数量 | 整数 | int | 否 |  |  |
| unit | 单位 | 短文本 | varchar(255) | 否 | 255 |  |
| product_code | 商品编码 | 短文本 | varchar(255) | 否 | 255 |  |
| product_name | 商品名称 | 短文本 | varchar(255) | 否 | 255 |  |
| product_id | 商品ID | 整数 | int | 否 |  |  |
| order_no | 单号 | 短文本 | varchar(255) | 否 | 255 |  |
| order_id | 主表ID | 整数 | int | 否 |  |  |
| id | 唯一标识 | 整数 | int | 是 |  | 唯一标识 |
| creator | 创建人 | 短文本 | varchar(255) | 是 | 255 | 创建人姓名 |
| created_at | 创建时间 | 日期时间 | timestamp | 是 |  | 创建时间 |
| updater | 更新人 | 短文本 | varchar(255) | 是 | 255 | 更新人姓名 |
| updated_at | 更新时间 | 日期时间 | timestamp | 是 |  | 更新时间 |
| is_deleted | 是否删除 | 布尔 | tinyint | 是 |  | 是否已删除 |
| deleted_at | 删除时间 | 日期时间 | timestamp | 是 |  | 删除时间 |

### 方法定义

| 方法名称 | methodKey | 类型 |
|---------|-----------|------|
| 列表查询 | `FUj5beTcFQ` | GUI |
| 新增 | `FUMQAdcAlW` | GUI |
| 编辑 | `FUsNHVHaHs` | GUI |
| 查看详情 | `FU4VUQ2pR4` | GUI |
| 删除 | `FUdd7H5W2n` | GUI |
| 批量删除 | `FUs09usTRE` | GUI |
| 批量导出 | `FUNsSt1MZd` | GUI |
| 批量导入 | `FUjy6QNF3F` | GUI |

### 方法详情（含SQL实现）

#### 列表查询

- **methodKey**: `FUj5beTcFQ`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"sn_codes","right":{"valueType":"1","value":"sn_codes"}},{"field":"sn_count","right":{"valueType":"1","value":"sn_count"}},{"field":"amount","right":{"valueType":"1","value":"amount"}},{"field":"price","right":{"valueType":"1","value":"price"}},{"field":"quantity","right":{"valueType":"1","value":"quantity"}},{"field":"unit","right":{"valueType":"1","value":"unit"}},{"field":"product_code","right":{"valueType":"1","value":"product_code"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_id","right":{"valueType":"1","value":"product_id"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}},{"field":"order_id","right":{"valueType":"1","value":"order_id"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_codes"},"right":{"valueType":"1","value":"@sn_codes"},"config":{"test":"CONTAINSKEY(__params, \\"sn_codes\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_count"},"right":{"valueType":"1","value":"@sn_count"},"config":{"test":"CONTAINSKEY(__params, \\"sn_count\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"amount"},"right":{"valueType":"1","value":"@amount"},"config":{"test":"CONTAINSKEY(__params, \\"amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"price"},"right":{"valueType":"1","value":"@price"},"config":{"test":"CONTAINSKEY(__params, \\"price\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"quantity"},"right":{"valueType":"1","value":"@quantity"},"config":{"test":"CONTAINSKEY(__params, \\"quantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"},"config":{"test":"CONTAINSKEY(__params, \\"unit\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"},"config":{"test":"CONTAINSKEY(__params, \\"product_code\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"},"config":{"test":"CONTAINSKEY(__params, \\"product_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_id"},"right":{"valueType":"1","value":"@order_id"},"config":{"test":"CONTAINSKEY(__params, \\"order_id\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":true}}', 'methodConfig': '{"conditionExecuteStrategy":"notExecute"}'}
```

#### 新增

- **methodKey**: `FUMQAdcAlW`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'INSERT', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"}},{"left":{"field":"sn_codes"},"right":{"valueType":"1","value":"@sn_codes"}},{"left":{"field":"sn_count"},"right":{"valueType":"1","value":"@sn_count"}},{"left":{"field":"amount"},"right":{"valueType":"1","value":"@amount"}},{"left":{"field":"price"},"right":{"valueType":"1","value":"@price"}},{"left":{"field":"quantity"},"right":{"valueType":"1","value":"@quantity"}},{"left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"}},{"left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"}},{"left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"}},{"left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"}},{"left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"}},{"left":{"field":"order_id"},"right":{"valueType":"1","value":"@order_id"}}]}'}
```

#### 编辑

- **methodKey**: `FUsNHVHaHs`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","require":false}},{"left":{"field":"sn_codes"},"right":{"valueType":"1","value":"@sn_codes"},"config":{"test":"CONTAINSKEY(__params, \\"sn_codes\\")","require":false}},{"left":{"field":"sn_count"},"right":{"valueType":"1","value":"@sn_count"},"config":{"test":"CONTAINSKEY(__params, \\"sn_count\\")","require":false}},{"left":{"field":"amount"},"right":{"valueType":"1","value":"@amount"},"config":{"test":"CONTAINSKEY(__params, \\"amount\\")","require":false}},{"left":{"field":"price"},"right":{"valueType":"1","value":"@price"},"config":{"test":"CONTAINSKEY(__params, \\"price\\")","require":false}},{"left":{"field":"quantity"},"right":{"valueType":"1","value":"@quantity"},"config":{"test":"CONTAINSKEY(__params, \\"quantity\\")","require":false}},{"left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"},"config":{"test":"CONTAINSKEY(__params, \\"unit\\")","require":false}},{"left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"},"config":{"test":"CONTAINSKEY(__params, \\"product_code\\")","require":false}},{"left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","require":false}},{"left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"},"config":{"test":"CONTAINSKEY(__params, \\"product_id\\")","require":false}},{"left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","require":false}},{"left":{"field":"order_id"},"right":{"valueType":"1","value":"@order_id"},"config":{"test":"CONTAINSKEY(__params, \\"order_id\\")","require":false}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 查看详情

- **methodKey**: `FU4VUQ2pR4`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"sn_codes","right":{"valueType":"1","value":"sn_codes"}},{"field":"sn_count","right":{"valueType":"1","value":"sn_count"}},{"field":"amount","right":{"valueType":"1","value":"amount"}},{"field":"price","right":{"valueType":"1","value":"price"}},{"field":"quantity","right":{"valueType":"1","value":"quantity"}},{"field":"unit","right":{"valueType":"1","value":"unit"}},{"field":"product_code","right":{"valueType":"1","value":"product_code"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_id","right":{"valueType":"1","value":"product_id"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}},{"field":"order_id","right":{"valueType":"1","value":"order_id"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 删除

- **methodKey**: `FUdd7H5W2n`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量删除

- **methodKey**: `FUs09usTRE`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"IN","left":{"field":"id"},"right":{"valueType":"1","value":"@ids"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量导出

- **methodKey**: `FUNsSt1MZd`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"sn_codes","right":{"valueType":"1","value":"sn_codes"}},{"field":"sn_count","right":{"valueType":"1","value":"sn_count"}},{"field":"amount","right":{"valueType":"1","value":"amount"}},{"field":"price","right":{"valueType":"1","value":"price"}},{"field":"quantity","right":{"valueType":"1","value":"quantity"}},{"field":"unit","right":{"valueType":"1","value":"unit"}},{"field":"product_code","right":{"valueType":"1","value":"product_code"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_id","right":{"valueType":"1","value":"product_id"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}},{"field":"order_id","right":{"valueType":"1","value":"order_id"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_codes"},"right":{"valueType":"1","value":"@sn_codes"},"config":{"test":"CONTAINSKEY(__params, \\"sn_codes\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_count"},"right":{"valueType":"1","value":"@sn_count"},"config":{"test":"CONTAINSKEY(__params, \\"sn_count\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"amount"},"right":{"valueType":"1","value":"@amount"},"config":{"test":"CONTAINSKEY(__params, \\"amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"price"},"right":{"valueType":"1","value":"@price"},"config":{"test":"CONTAINSKEY(__params, \\"price\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"quantity"},"right":{"valueType":"1","value":"@quantity"},"config":{"test":"CONTAINSKEY(__params, \\"quantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"},"config":{"test":"CONTAINSKEY(__params, \\"unit\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"},"config":{"test":"CONTAINSKEY(__params, \\"product_code\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"},"config":{"test":"CONTAINSKEY(__params, \\"product_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_id"},"right":{"valueType":"1","value":"@order_id"},"config":{"test":"CONTAINSKEY(__params, \\"order_id\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":false}}', 'methodConfig': '{"exportRows":1000,"conditionExecuteStrategy":"notExecute","operation":"EXPORT","exportFormat":"Excel"}'}
```

#### 批量导入

- **methodKey**: `FUjy6QNF3F`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'BATCH_INSERT', 'gui': '{}', 'methodConfig': '{"operation":"IMPORT"}'}
```

---

## 销售出库单主表

| 属性 | 值 |
|------|-----|
| modelKey | `MOenA360T5` |
| modelNameEn | `stock_out_order` |
| tableName | `stock_out_order` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 长度 | 说明 |
|---------|---------|---------|-----------|------|------|------|
| operator_name | 操作人名称 | 短文本 | varchar(255) | 否 | 255 |  |
| operator_id | 操作人ID | 短文本 | varchar(255) | 否 | 255 |  |
| remark | 备注 | 长文本 | varchar(1024) | 否 | 1024 |  |
| status | 状态 | 短文本 | varchar(255) | 否 | 255 |  |
| unpaid_amount | 未收款 | 整数 | int | 否 |  |  |
| received_amount | 已收款 | 整数 | int | 否 |  |  |
| total_amount | 总金额 | 整数 | int | 否 |  |  |
| warehouse_name | 仓库名称 | 短文本 | varchar(255) | 否 | 255 |  |
| warehouse_id | 仓库ID | 整数 | int | 否 |  |  |
| customer_name | 客户名称 | 短文本 | varchar(255) | 否 | 255 |  |
| customer_id | 客户ID | 整数 | int | 否 |  |  |
| order_date | 单据日期 | 日期时间 | datetime | 否 |  |  |
| order_no | 单号 | 短文本 | varchar(255) | 否 | 255 |  |
| id | 唯一标识 | 整数 | int | 是 |  | 唯一标识 |
| creator | 创建人 | 短文本 | varchar(255) | 是 | 255 | 创建人姓名 |
| created_at | 创建时间 | 日期时间 | timestamp | 是 |  | 创建时间 |
| updater | 更新人 | 短文本 | varchar(255) | 是 | 255 | 更新人姓名 |
| updated_at | 更新时间 | 日期时间 | timestamp | 是 |  | 更新时间 |
| is_deleted | 是否删除 | 布尔 | tinyint | 是 |  | 是否已删除 |
| deleted_at | 删除时间 | 日期时间 | timestamp | 是 |  | 删除时间 |

### 方法定义

| 方法名称 | methodKey | 类型 |
|---------|-----------|------|
| 列表查询 | `FUJwJkbOnk` | GUI |
| 新增 | `FUUahJCtGe` | GUI |
| 编辑 | `FUMC1YOXai` | GUI |
| 查看详情 | `FU2ViffXw4` | GUI |
| 删除 | `FURLAv3gOp` | GUI |
| 批量删除 | `FUGjwYWEi4` | GUI |
| 批量导出 | `FUpBPZKxXy` | GUI |
| 批量导入 | `FUvGaqggfa` | GUI |

### 方法详情（含SQL实现）

#### 列表查询

- **methodKey**: `FUJwJkbOnk`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"operator_name","right":{"valueType":"1","value":"operator_name"}},{"field":"operator_id","right":{"valueType":"1","value":"operator_id"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"status","right":{"valueType":"1","value":"status"}},{"field":"unpaid_amount","right":{"valueType":"1","value":"unpaid_amount"}},{"field":"received_amount","right":{"valueType":"1","value":"received_amount"}},{"field":"total_amount","right":{"valueType":"1","value":"total_amount"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_id","right":{"valueType":"1","value":"warehouse_id"}},{"field":"customer_name","right":{"valueType":"1","value":"customer_name"}},{"field":"customer_id","right":{"valueType":"1","value":"customer_id"}},{"field":"order_date","right":{"valueType":"1","value":"order_date"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"},"config":{"test":"CONTAINSKEY(__params, \\"operator_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"},"config":{"test":"CONTAINSKEY(__params, \\"operator_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"status"},"right":{"valueType":"1","value":"@status"},"config":{"test":"CONTAINSKEY(__params, \\"status\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"unpaid_amount"},"right":{"valueType":"1","value":"@unpaid_amount"},"config":{"test":"CONTAINSKEY(__params, \\"unpaid_amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"received_amount"},"right":{"valueType":"1","value":"@received_amount"},"config":{"test":"CONTAINSKEY(__params, \\"received_amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"total_amount"},"right":{"valueType":"1","value":"@total_amount"},"config":{"test":"CONTAINSKEY(__params, \\"total_amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"customer_name"},"right":{"valueType":"1","value":"@customer_name"},"config":{"test":"CONTAINSKEY(__params, \\"customer_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"customer_id"},"right":{"valueType":"1","value":"@customer_id"},"config":{"test":"CONTAINSKEY(__params, \\"customer_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"order_date"},"right":{"valueType":"1","value":["@order_date_start","@order_date_end"]},"config":{"test":"CONTAINSKEY(__params, \\"order_date_start\\") || CONTAINSKEY(__params, \\"order_date_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":true}}', 'methodConfig': '{"conditionExecuteStrategy":"notExecute"}'}
```

#### 新增

- **methodKey**: `FUUahJCtGe`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'INSERT', 'gui': '{"data":[{"left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"}},{"left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"}},{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"}},{"left":{"field":"status"},"right":{"valueType":"1","value":"@status"}},{"left":{"field":"unpaid_amount"},"right":{"valueType":"1","value":"@unpaid_amount"}},{"left":{"field":"received_amount"},"right":{"valueType":"1","value":"@received_amount"}},{"left":{"field":"total_amount"},"right":{"valueType":"1","value":"@total_amount"}},{"left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"}},{"left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"}},{"left":{"field":"customer_name"},"right":{"valueType":"1","value":"@customer_name"}},{"left":{"field":"customer_id"},"right":{"valueType":"1","value":"@customer_id"}},{"left":{"field":"order_date"},"right":{"valueType":"1","value":"@order_date"}},{"left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"}}]}'}
```

#### 编辑

- **methodKey**: `FUMC1YOXai`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"},"config":{"test":"CONTAINSKEY(__params, \\"operator_name\\")","require":false}},{"left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"},"config":{"test":"CONTAINSKEY(__params, \\"operator_id\\")","require":false}},{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","require":false}},{"left":{"field":"status"},"right":{"valueType":"1","value":"@status"},"config":{"test":"CONTAINSKEY(__params, \\"status\\")","require":false}},{"left":{"field":"unpaid_amount"},"right":{"valueType":"1","value":"@unpaid_amount"},"config":{"test":"CONTAINSKEY(__params, \\"unpaid_amount\\")","require":false}},{"left":{"field":"received_amount"},"right":{"valueType":"1","value":"@received_amount"},"config":{"test":"CONTAINSKEY(__params, \\"received_amount\\")","require":false}},{"left":{"field":"total_amount"},"right":{"valueType":"1","value":"@total_amount"},"config":{"test":"CONTAINSKEY(__params, \\"total_amount\\")","require":false}},{"left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","require":false}},{"left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_id\\")","require":false}},{"left":{"field":"customer_name"},"right":{"valueType":"1","value":"@customer_name"},"config":{"test":"CONTAINSKEY(__params, \\"customer_name\\")","require":false}},{"left":{"field":"customer_id"},"right":{"valueType":"1","value":"@customer_id"},"config":{"test":"CONTAINSKEY(__params, \\"customer_id\\")","require":false}},{"left":{"field":"order_date"},"right":{"valueType":"1","value":"@order_date"},"config":{"test":"CONTAINSKEY(__params, \\"order_date\\")","require":false}},{"left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","require":false}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 查看详情

- **methodKey**: `FU2ViffXw4`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"operator_name","right":{"valueType":"1","value":"operator_name"}},{"field":"operator_id","right":{"valueType":"1","value":"operator_id"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"status","right":{"valueType":"1","value":"status"}},{"field":"unpaid_amount","right":{"valueType":"1","value":"unpaid_amount"}},{"field":"received_amount","right":{"valueType":"1","value":"received_amount"}},{"field":"total_amount","right":{"valueType":"1","value":"total_amount"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_id","right":{"valueType":"1","value":"warehouse_id"}},{"field":"customer_name","right":{"valueType":"1","value":"customer_name"}},{"field":"customer_id","right":{"valueType":"1","value":"customer_id"}},{"field":"order_date","right":{"valueType":"1","value":"order_date"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 删除

- **methodKey**: `FURLAv3gOp`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量删除

- **methodKey**: `FUGjwYWEi4`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"IN","left":{"field":"id"},"right":{"valueType":"1","value":"@ids"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量导出

- **methodKey**: `FUpBPZKxXy`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"operator_name","right":{"valueType":"1","value":"operator_name"}},{"field":"operator_id","right":{"valueType":"1","value":"operator_id"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"status","right":{"valueType":"1","value":"status"}},{"field":"unpaid_amount","right":{"valueType":"1","value":"unpaid_amount"}},{"field":"received_amount","right":{"valueType":"1","value":"received_amount"}},{"field":"total_amount","right":{"valueType":"1","value":"total_amount"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_id","right":{"valueType":"1","value":"warehouse_id"}},{"field":"customer_name","right":{"valueType":"1","value":"customer_name"}},{"field":"customer_id","right":{"valueType":"1","value":"customer_id"}},{"field":"order_date","right":{"valueType":"1","value":"order_date"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"},"config":{"test":"CONTAINSKEY(__params, \\"operator_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"},"config":{"test":"CONTAINSKEY(__params, \\"operator_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"status"},"right":{"valueType":"1","value":"@status"},"config":{"test":"CONTAINSKEY(__params, \\"status\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"unpaid_amount"},"right":{"valueType":"1","value":"@unpaid_amount"},"config":{"test":"CONTAINSKEY(__params, \\"unpaid_amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"received_amount"},"right":{"valueType":"1","value":"@received_amount"},"config":{"test":"CONTAINSKEY(__params, \\"received_amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"total_amount"},"right":{"valueType":"1","value":"@total_amount"},"config":{"test":"CONTAINSKEY(__params, \\"total_amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"customer_name"},"right":{"valueType":"1","value":"@customer_name"},"config":{"test":"CONTAINSKEY(__params, \\"customer_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"customer_id"},"right":{"valueType":"1","value":"@customer_id"},"config":{"test":"CONTAINSKEY(__params, \\"customer_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"order_date"},"right":{"valueType":"1","value":["@order_date_start","@order_date_end"]},"config":{"test":"CONTAINSKEY(__params, \\"order_date_start\\") || CONTAINSKEY(__params, \\"order_date_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":false}}', 'methodConfig': '{"exportRows":1000,"conditionExecuteStrategy":"notExecute","operation":"EXPORT","exportFormat":"Excel"}'}
```

#### 批量导入

- **methodKey**: `FUvGaqggfa`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'BATCH_INSERT', 'gui': '{}', 'methodConfig': '{"operation":"IMPORT"}'}
```

---

## 采购入库单明细表

| 属性 | 值 |
|------|-----|
| modelKey | `MOc2tEbUGK` |
| modelNameEn | `stock_in_item` |
| tableName | `stock_in_item` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 长度 | 说明 |
|---------|---------|---------|-----------|------|------|------|
| remark | 备注 | 短文本 | varchar(255) | 否 | 255 |  |
| sn_codes | SN码列表 | 长文本 | varchar(1024) | 否 | 1024 |  |
| sn_count | SN码数量 | 整数 | int | 否 |  |  |
| amount | 金额 | 整数 | int | 否 |  |  |
| price | 单价 | 整数 | int | 否 |  |  |
| quantity | 数量 | 整数 | int | 否 |  |  |
| unit | 单位 | 短文本 | varchar(255) | 否 | 255 |  |
| product_code | 商品编码 | 短文本 | varchar(255) | 否 | 255 |  |
| product_name | 商品名称 | 短文本 | varchar(255) | 否 | 255 |  |
| product_id | 商品ID | 整数 | int | 否 |  |  |
| order_no | 单号 | 短文本 | varchar(255) | 否 | 255 |  |
| order_id | 主表ID | 整数 | int | 否 |  |  |
| id | 唯一标识 | 整数 | int | 是 |  | 唯一标识 |
| creator | 创建人 | 短文本 | varchar(255) | 是 | 255 | 创建人姓名 |
| created_at | 创建时间 | 日期时间 | timestamp | 是 |  | 创建时间 |
| updater | 更新人 | 短文本 | varchar(255) | 是 | 255 | 更新人姓名 |
| updated_at | 更新时间 | 日期时间 | timestamp | 是 |  | 更新时间 |
| is_deleted | 是否删除 | 布尔 | tinyint | 是 |  | 是否已删除 |
| deleted_at | 删除时间 | 日期时间 | timestamp | 是 |  | 删除时间 |

### 方法定义

| 方法名称 | methodKey | 类型 |
|---------|-----------|------|
| 列表查询 | `FUyWPF92Nx` | GUI |
| 新增 | `FU9z5D8wAM` | GUI |
| 编辑 | `FU5BdwhpML` | GUI |
| 查看详情 | `FUlojl65Wy` | GUI |
| 删除 | `FUvHcN72IP` | GUI |
| 批量删除 | `FU5HWSR5JR` | GUI |
| 批量导出 | `FU6hEmkQVi` | GUI |
| 批量导入 | `FUfCkjxVQi` | GUI |

### 方法详情（含SQL实现）

#### 列表查询

- **methodKey**: `FUyWPF92Nx`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"sn_codes","right":{"valueType":"1","value":"sn_codes"}},{"field":"sn_count","right":{"valueType":"1","value":"sn_count"}},{"field":"amount","right":{"valueType":"1","value":"amount"}},{"field":"price","right":{"valueType":"1","value":"price"}},{"field":"quantity","right":{"valueType":"1","value":"quantity"}},{"field":"unit","right":{"valueType":"1","value":"unit"}},{"field":"product_code","right":{"valueType":"1","value":"product_code"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_id","right":{"valueType":"1","value":"product_id"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}},{"field":"order_id","right":{"valueType":"1","value":"order_id"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_codes"},"right":{"valueType":"1","value":"@sn_codes"},"config":{"test":"CONTAINSKEY(__params, \\"sn_codes\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_count"},"right":{"valueType":"1","value":"@sn_count"},"config":{"test":"CONTAINSKEY(__params, \\"sn_count\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"amount"},"right":{"valueType":"1","value":"@amount"},"config":{"test":"CONTAINSKEY(__params, \\"amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"price"},"right":{"valueType":"1","value":"@price"},"config":{"test":"CONTAINSKEY(__params, \\"price\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"quantity"},"right":{"valueType":"1","value":"@quantity"},"config":{"test":"CONTAINSKEY(__params, \\"quantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"},"config":{"test":"CONTAINSKEY(__params, \\"unit\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"},"config":{"test":"CONTAINSKEY(__params, \\"product_code\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"},"config":{"test":"CONTAINSKEY(__params, \\"product_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_id"},"right":{"valueType":"1","value":"@order_id"},"config":{"test":"CONTAINSKEY(__params, \\"order_id\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":true}}', 'methodConfig': '{"conditionExecuteStrategy":"notExecute"}'}
```

#### 新增

- **methodKey**: `FU9z5D8wAM`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'INSERT', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"}},{"left":{"field":"sn_codes"},"right":{"valueType":"1","value":"@sn_codes"}},{"left":{"field":"sn_count"},"right":{"valueType":"1","value":"@sn_count"}},{"left":{"field":"amount"},"right":{"valueType":"1","value":"@amount"}},{"left":{"field":"price"},"right":{"valueType":"1","value":"@price"}},{"left":{"field":"quantity"},"right":{"valueType":"1","value":"@quantity"}},{"left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"}},{"left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"}},{"left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"}},{"left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"}},{"left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"}},{"left":{"field":"order_id"},"right":{"valueType":"1","value":"@order_id"}}]}'}
```

#### 编辑

- **methodKey**: `FU5BdwhpML`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","require":false}},{"left":{"field":"sn_codes"},"right":{"valueType":"1","value":"@sn_codes"},"config":{"test":"CONTAINSKEY(__params, \\"sn_codes\\")","require":false}},{"left":{"field":"sn_count"},"right":{"valueType":"1","value":"@sn_count"},"config":{"test":"CONTAINSKEY(__params, \\"sn_count\\")","require":false}},{"left":{"field":"amount"},"right":{"valueType":"1","value":"@amount"},"config":{"test":"CONTAINSKEY(__params, \\"amount\\")","require":false}},{"left":{"field":"price"},"right":{"valueType":"1","value":"@price"},"config":{"test":"CONTAINSKEY(__params, \\"price\\")","require":false}},{"left":{"field":"quantity"},"right":{"valueType":"1","value":"@quantity"},"config":{"test":"CONTAINSKEY(__params, \\"quantity\\")","require":false}},{"left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"},"config":{"test":"CONTAINSKEY(__params, \\"unit\\")","require":false}},{"left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"},"config":{"test":"CONTAINSKEY(__params, \\"product_code\\")","require":false}},{"left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","require":false}},{"left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"},"config":{"test":"CONTAINSKEY(__params, \\"product_id\\")","require":false}},{"left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","require":false}},{"left":{"field":"order_id"},"right":{"valueType":"1","value":"@order_id"},"config":{"test":"CONTAINSKEY(__params, \\"order_id\\")","require":false}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 查看详情

- **methodKey**: `FUlojl65Wy`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"sn_codes","right":{"valueType":"1","value":"sn_codes"}},{"field":"sn_count","right":{"valueType":"1","value":"sn_count"}},{"field":"amount","right":{"valueType":"1","value":"amount"}},{"field":"price","right":{"valueType":"1","value":"price"}},{"field":"quantity","right":{"valueType":"1","value":"quantity"}},{"field":"unit","right":{"valueType":"1","value":"unit"}},{"field":"product_code","right":{"valueType":"1","value":"product_code"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_id","right":{"valueType":"1","value":"product_id"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}},{"field":"order_id","right":{"valueType":"1","value":"order_id"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 删除

- **methodKey**: `FUvHcN72IP`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量删除

- **methodKey**: `FU5HWSR5JR`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"IN","left":{"field":"id"},"right":{"valueType":"1","value":"@ids"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量导出

- **methodKey**: `FU6hEmkQVi`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"sn_codes","right":{"valueType":"1","value":"sn_codes"}},{"field":"sn_count","right":{"valueType":"1","value":"sn_count"}},{"field":"amount","right":{"valueType":"1","value":"amount"}},{"field":"price","right":{"valueType":"1","value":"price"}},{"field":"quantity","right":{"valueType":"1","value":"quantity"}},{"field":"unit","right":{"valueType":"1","value":"unit"}},{"field":"product_code","right":{"valueType":"1","value":"product_code"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_id","right":{"valueType":"1","value":"product_id"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}},{"field":"order_id","right":{"valueType":"1","value":"order_id"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_codes"},"right":{"valueType":"1","value":"@sn_codes"},"config":{"test":"CONTAINSKEY(__params, \\"sn_codes\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_count"},"right":{"valueType":"1","value":"@sn_count"},"config":{"test":"CONTAINSKEY(__params, \\"sn_count\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"amount"},"right":{"valueType":"1","value":"@amount"},"config":{"test":"CONTAINSKEY(__params, \\"amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"price"},"right":{"valueType":"1","value":"@price"},"config":{"test":"CONTAINSKEY(__params, \\"price\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"quantity"},"right":{"valueType":"1","value":"@quantity"},"config":{"test":"CONTAINSKEY(__params, \\"quantity\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"},"config":{"test":"CONTAINSKEY(__params, \\"unit\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"},"config":{"test":"CONTAINSKEY(__params, \\"product_code\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"},"config":{"test":"CONTAINSKEY(__params, \\"product_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_id"},"right":{"valueType":"1","value":"@order_id"},"config":{"test":"CONTAINSKEY(__params, \\"order_id\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":false}}', 'methodConfig': '{"exportRows":1000,"conditionExecuteStrategy":"notExecute","operation":"EXPORT","exportFormat":"Excel"}'}
```

#### 批量导入

- **methodKey**: `FUfCkjxVQi`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'BATCH_INSERT', 'gui': '{}', 'methodConfig': '{"operation":"IMPORT"}'}
```

---

## 采购入库单主表

| 属性 | 值 |
|------|-----|
| modelKey | `MOIN9eD2au` |
| modelNameEn | `stock_in_order` |
| tableName | `stock_in_order` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 长度 | 说明 |
|---------|---------|---------|-----------|------|------|------|
| operator_name | 操作人名称 | 短文本 | varchar(255) | 否 | 255 |  |
| operator_id | 操作人ID | 短文本 | varchar(255) | 否 | 255 |  |
| remark | 备注 | 长文本 | varchar(1024) | 否 | 1024 |  |
| status | 状态 | 短文本 | varchar(255) | 否 | 255 |  |
| unpaid_amount | 未付款 | 整数 | int | 否 |  |  |
| paid_amount | 已付款 | 整数 | int | 否 |  |  |
| total_amount | 总金额 | 整数 | int | 否 |  |  |
| warehouse_name | 仓库名称 | 短文本 | varchar(255) | 否 | 255 |  |
| warehouse_id | 仓库ID | 整数 | int | 否 |  |  |
| supplier_name | 供应商名称 | 短文本 | varchar(255) | 否 | 255 |  |
| supplier_id | 供应商ID | 整数 | int | 否 |  |  |
| order_date | 单据日期 | 日期时间 | datetime | 否 |  |  |
| order_no | 单号 | 短文本 | varchar(255) | 否 | 255 |  |
| id | 唯一标识 | 整数 | int | 是 |  | 唯一标识 |
| creator | 创建人 | 短文本 | varchar(255) | 是 | 255 | 创建人姓名 |
| created_at | 创建时间 | 日期时间 | timestamp | 是 |  | 创建时间 |
| updater | 更新人 | 短文本 | varchar(255) | 是 | 255 | 更新人姓名 |
| updated_at | 更新时间 | 日期时间 | timestamp | 是 |  | 更新时间 |
| is_deleted | 是否删除 | 布尔 | tinyint | 是 |  | 是否已删除 |
| deleted_at | 删除时间 | 日期时间 | timestamp | 是 |  | 删除时间 |

### 方法定义

| 方法名称 | methodKey | 类型 |
|---------|-----------|------|
| 列表查询 | `FUADr2TygU` | GUI |
| 新增 | `FUlZOM13nS` | GUI |
| 编辑 | `FUlQSDHuOv` | GUI |
| 查看详情 | `FU8N6CTRMZ` | GUI |
| 删除 | `FU1WUGjjGO` | GUI |
| 批量删除 | `FUq6pQp2ka` | GUI |
| 批量导出 | `FUoTL911B2` | GUI |
| 批量导入 | `FUVy8K8tlA` | GUI |

### 方法详情（含SQL实现）

#### 列表查询

- **methodKey**: `FUADr2TygU`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"operator_name","right":{"valueType":"1","value":"operator_name"}},{"field":"operator_id","right":{"valueType":"1","value":"operator_id"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"status","right":{"valueType":"1","value":"status"}},{"field":"unpaid_amount","right":{"valueType":"1","value":"unpaid_amount"}},{"field":"paid_amount","right":{"valueType":"1","value":"paid_amount"}},{"field":"total_amount","right":{"valueType":"1","value":"total_amount"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_id","right":{"valueType":"1","value":"warehouse_id"}},{"field":"supplier_name","right":{"valueType":"1","value":"supplier_name"}},{"field":"supplier_id","right":{"valueType":"1","value":"supplier_id"}},{"field":"order_date","right":{"valueType":"1","value":"order_date"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}},{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}}],"query":{"children":[{"op":"=","left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"},"config":{"test":"CONTAINSKEY(__params, \\"operator_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"},"config":{"test":"CONTAINSKEY(__params, \\"operator_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"status"},"right":{"valueType":"1","value":"@status"},"config":{"test":"CONTAINSKEY(__params, \\"status\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"unpaid_amount"},"right":{"valueType":"1","value":"@unpaid_amount"},"config":{"test":"CONTAINSKEY(__params, \\"unpaid_amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"paid_amount"},"right":{"valueType":"1","value":"@paid_amount"},"config":{"test":"CONTAINSKEY(__params, \\"paid_amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"total_amount"},"right":{"valueType":"1","value":"@total_amount"},"config":{"test":"CONTAINSKEY(__params, \\"total_amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"supplier_name"},"right":{"valueType":"1","value":"@supplier_name"},"config":{"test":"CONTAINSKEY(__params, \\"supplier_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"supplier_id"},"right":{"valueType":"1","value":"@supplier_id"},"config":{"test":"CONTAINSKEY(__params, \\"supplier_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"order_date"},"right":{"valueType":"1","value":["@order_date_start","@order_date_end"]},"config":{"test":"CONTAINSKEY(__params, \\"order_date_start\\") || CONTAINSKEY(__params, \\"order_date_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":true}}', 'methodConfig': '{"conditionExecuteStrategy":"notExecute"}'}
```

#### 新增

- **methodKey**: `FUlZOM13nS`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'INSERT', 'gui': '{"data":[{"left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"}},{"left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"}},{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"}},{"left":{"field":"status"},"right":{"valueType":"1","value":"@status"}},{"left":{"field":"unpaid_amount"},"right":{"valueType":"1","value":"@unpaid_amount"}},{"left":{"field":"paid_amount"},"right":{"valueType":"1","value":"@paid_amount"}},{"left":{"field":"total_amount"},"right":{"valueType":"1","value":"@total_amount"}},{"left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"}},{"left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"}},{"left":{"field":"supplier_name"},"right":{"valueType":"1","value":"@supplier_name"}},{"left":{"field":"supplier_id"},"right":{"valueType":"1","value":"@supplier_id"}},{"left":{"field":"order_date"},"right":{"valueType":"1","value":"@order_date"}},{"left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"}}]}'}
```

#### 编辑

- **methodKey**: `FUlQSDHuOv`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"},"config":{"test":"CONTAINSKEY(__params, \\"operator_name\\")","require":false}},{"left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"},"config":{"test":"CONTAINSKEY(__params, \\"operator_id\\")","require":false}},{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","require":false}},{"left":{"field":"status"},"right":{"valueType":"1","value":"@status"},"config":{"test":"CONTAINSKEY(__params, \\"status\\")","require":false}},{"left":{"field":"unpaid_amount"},"right":{"valueType":"1","value":"@unpaid_amount"},"config":{"test":"CONTAINSKEY(__params, \\"unpaid_amount\\")","require":false}},{"left":{"field":"paid_amount"},"right":{"valueType":"1","value":"@paid_amount"},"config":{"test":"CONTAINSKEY(__params, \\"paid_amount\\")","require":false}},{"left":{"field":"total_amount"},"right":{"valueType":"1","value":"@total_amount"},"config":{"test":"CONTAINSKEY(__params, \\"total_amount\\")","require":false}},{"left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","require":false}},{"left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_id\\")","require":false}},{"left":{"field":"supplier_name"},"right":{"valueType":"1","value":"@supplier_name"},"config":{"test":"CONTAINSKEY(__params, \\"supplier_name\\")","require":false}},{"left":{"field":"supplier_id"},"right":{"valueType":"1","value":"@supplier_id"},"config":{"test":"CONTAINSKEY(__params, \\"supplier_id\\")","require":false}},{"left":{"field":"order_date"},"right":{"valueType":"1","value":"@order_date"},"config":{"test":"CONTAINSKEY(__params, \\"order_date\\")","require":false}},{"left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","require":false}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 查看详情

- **methodKey**: `FU8N6CTRMZ`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"operator_name","right":{"valueType":"1","value":"operator_name"}},{"field":"operator_id","right":{"valueType":"1","value":"operator_id"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"status","right":{"valueType":"1","value":"status"}},{"field":"unpaid_amount","right":{"valueType":"1","value":"unpaid_amount"}},{"field":"paid_amount","right":{"valueType":"1","value":"paid_amount"}},{"field":"total_amount","right":{"valueType":"1","value":"total_amount"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_id","right":{"valueType":"1","value":"warehouse_id"}},{"field":"supplier_name","right":{"valueType":"1","value":"supplier_name"}},{"field":"supplier_id","right":{"valueType":"1","value":"supplier_id"}},{"field":"order_date","right":{"valueType":"1","value":"order_date"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}},{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 删除

- **methodKey**: `FU1WUGjjGO`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量删除

- **methodKey**: `FUq6pQp2ka`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"IN","left":{"field":"id"},"right":{"valueType":"1","value":"@ids"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量导出

- **methodKey**: `FUoTL911B2`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"operator_name","right":{"valueType":"1","value":"operator_name"}},{"field":"operator_id","right":{"valueType":"1","value":"operator_id"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"status","right":{"valueType":"1","value":"status"}},{"field":"unpaid_amount","right":{"valueType":"1","value":"unpaid_amount"}},{"field":"paid_amount","right":{"valueType":"1","value":"paid_amount"}},{"field":"total_amount","right":{"valueType":"1","value":"total_amount"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_id","right":{"valueType":"1","value":"warehouse_id"}},{"field":"supplier_name","right":{"valueType":"1","value":"supplier_name"}},{"field":"supplier_id","right":{"valueType":"1","value":"supplier_id"}},{"field":"order_date","right":{"valueType":"1","value":"order_date"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}},{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}}],"query":{"children":[{"op":"=","left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"},"config":{"test":"CONTAINSKEY(__params, \\"operator_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"},"config":{"test":"CONTAINSKEY(__params, \\"operator_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"status"},"right":{"valueType":"1","value":"@status"},"config":{"test":"CONTAINSKEY(__params, \\"status\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"unpaid_amount"},"right":{"valueType":"1","value":"@unpaid_amount"},"config":{"test":"CONTAINSKEY(__params, \\"unpaid_amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"paid_amount"},"right":{"valueType":"1","value":"@paid_amount"},"config":{"test":"CONTAINSKEY(__params, \\"paid_amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"total_amount"},"right":{"valueType":"1","value":"@total_amount"},"config":{"test":"CONTAINSKEY(__params, \\"total_amount\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"supplier_name"},"right":{"valueType":"1","value":"@supplier_name"},"config":{"test":"CONTAINSKEY(__params, \\"supplier_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"supplier_id"},"right":{"valueType":"1","value":"@supplier_id"},"config":{"test":"CONTAINSKEY(__params, \\"supplier_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"order_date"},"right":{"valueType":"1","value":["@order_date_start","@order_date_end"]},"config":{"test":"CONTAINSKEY(__params, \\"order_date_start\\") || CONTAINSKEY(__params, \\"order_date_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":false}}', 'methodConfig': '{"exportRows":1000,"conditionExecuteStrategy":"notExecute","operation":"EXPORT","exportFormat":"Excel"}'}
```

#### 批量导入

- **methodKey**: `FUVy8K8tlA`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'BATCH_INSERT', 'gui': '{}', 'methodConfig': '{"operation":"IMPORT"}'}
```

---

## SN操作日志表

| 属性 | 值 |
|------|-----|
| modelKey | `MOqg2psiTa` |
| modelNameEn | `sn_log` |
| tableName | `sn_log` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 长度 | 说明 |
|---------|---------|---------|-----------|------|------|------|
| remark | 备注 | 长文本 | varchar(1024) | 否 | 1024 |  |
| operator_name | 操作人名称 | 短文本 | varchar(255) | 否 | 255 |  |
| operator_id | 操作人ID | 短文本 | varchar(255) | 否 | 255 |  |
| warehouse_name | 仓库名称 | 短文本 | varchar(255) | 否 | 255 |  |
| warehouse_id | 仓库ID | 整数 | int | 否 |  |  |
| order_type | 单据类型 | 短文本 | varchar(255) | 否 | 255 |  |
| order_no | 关联单号 | 短文本 | varchar(255) | 否 | 255 |  |
| operation_desc | 操作描述 | 短文本 | varchar(255) | 否 | 255 |  |
| operation_type | 操作类型 | 短文本 | varchar(255) | 否 | 255 |  |
| product_name | 商品名称 | 短文本 | varchar(255) | 否 | 255 |  |
| product_id | 商品ID | 整数 | int | 否 |  |  |
| sn_code | SN码 | 短文本 | varchar(255) | 否 | 255 |  |
| id | 唯一标识 | 整数 | int | 是 |  | 唯一标识 |
| creator | 创建人 | 短文本 | varchar(255) | 是 | 255 | 创建人姓名 |
| created_at | 创建时间 | 日期时间 | timestamp | 是 |  | 创建时间 |
| updater | 更新人 | 短文本 | varchar(255) | 是 | 255 | 更新人姓名 |
| updated_at | 更新时间 | 日期时间 | timestamp | 是 |  | 更新时间 |
| is_deleted | 是否删除 | 布尔 | tinyint | 是 |  | 是否已删除 |
| deleted_at | 删除时间 | 日期时间 | timestamp | 是 |  | 删除时间 |

### 方法定义

| 方法名称 | methodKey | 类型 |
|---------|-----------|------|
| 列表查询 | `FUUBuLNhuu` | GUI |
| 新增 | `FUtcrpdyV1` | GUI |
| 编辑 | `FUgQeaGxdn` | GUI |
| 查看详情 | `FUizVrBBZG` | GUI |
| 删除 | `FUe2DNDqym` | GUI |
| 批量删除 | `FUMT6O9PW2` | GUI |
| 批量导出 | `FU9T6BRfXi` | GUI |
| 批量导入 | `FUVDkCqqDG` | GUI |

### 方法详情（含SQL实现）

#### 列表查询

- **methodKey**: `FUUBuLNhuu`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"operator_name","right":{"valueType":"1","value":"operator_name"}},{"field":"operator_id","right":{"valueType":"1","value":"operator_id"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_id","right":{"valueType":"1","value":"warehouse_id"}},{"field":"order_type","right":{"valueType":"1","value":"order_type"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}},{"field":"operation_desc","right":{"valueType":"1","value":"operation_desc"}},{"field":"operation_type","right":{"valueType":"1","value":"operation_type"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_id","right":{"valueType":"1","value":"product_id"}},{"field":"sn_code","right":{"valueType":"1","value":"sn_code"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"},"config":{"test":"CONTAINSKEY(__params, \\"operator_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"},"config":{"test":"CONTAINSKEY(__params, \\"operator_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_type"},"right":{"valueType":"1","value":"@order_type"},"config":{"test":"CONTAINSKEY(__params, \\"order_type\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"operation_desc"},"right":{"valueType":"1","value":"@operation_desc"},"config":{"test":"CONTAINSKEY(__params, \\"operation_desc\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"operation_type"},"right":{"valueType":"1","value":"@operation_type"},"config":{"test":"CONTAINSKEY(__params, \\"operation_type\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"},"config":{"test":"CONTAINSKEY(__params, \\"product_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_code"},"right":{"valueType":"1","value":"@sn_code"},"config":{"test":"CONTAINSKEY(__params, \\"sn_code\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":true}}', 'methodConfig': '{"conditionExecuteStrategy":"notExecute"}'}
```

#### 新增

- **methodKey**: `FUtcrpdyV1`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'INSERT', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"}},{"left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"}},{"left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"}},{"left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"}},{"left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"}},{"left":{"field":"order_type"},"right":{"valueType":"1","value":"@order_type"}},{"left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"}},{"left":{"field":"operation_desc"},"right":{"valueType":"1","value":"@operation_desc"}},{"left":{"field":"operation_type"},"right":{"valueType":"1","value":"@operation_type"}},{"left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"}},{"left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"}},{"left":{"field":"sn_code"},"right":{"valueType":"1","value":"@sn_code"}}]}'}
```

#### 编辑

- **methodKey**: `FUgQeaGxdn`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","require":false}},{"left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"},"config":{"test":"CONTAINSKEY(__params, \\"operator_name\\")","require":false}},{"left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"},"config":{"test":"CONTAINSKEY(__params, \\"operator_id\\")","require":false}},{"left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","require":false}},{"left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_id\\")","require":false}},{"left":{"field":"order_type"},"right":{"valueType":"1","value":"@order_type"},"config":{"test":"CONTAINSKEY(__params, \\"order_type\\")","require":false}},{"left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","require":false}},{"left":{"field":"operation_desc"},"right":{"valueType":"1","value":"@operation_desc"},"config":{"test":"CONTAINSKEY(__params, \\"operation_desc\\")","require":false}},{"left":{"field":"operation_type"},"right":{"valueType":"1","value":"@operation_type"},"config":{"test":"CONTAINSKEY(__params, \\"operation_type\\")","require":false}},{"left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","require":false}},{"left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"},"config":{"test":"CONTAINSKEY(__params, \\"product_id\\")","require":false}},{"left":{"field":"sn_code"},"right":{"valueType":"1","value":"@sn_code"},"config":{"test":"CONTAINSKEY(__params, \\"sn_code\\")","require":false}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 查看详情

- **methodKey**: `FUizVrBBZG`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"operator_name","right":{"valueType":"1","value":"operator_name"}},{"field":"operator_id","right":{"valueType":"1","value":"operator_id"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_id","right":{"valueType":"1","value":"warehouse_id"}},{"field":"order_type","right":{"valueType":"1","value":"order_type"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}},{"field":"operation_desc","right":{"valueType":"1","value":"operation_desc"}},{"field":"operation_type","right":{"valueType":"1","value":"operation_type"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_id","right":{"valueType":"1","value":"product_id"}},{"field":"sn_code","right":{"valueType":"1","value":"sn_code"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 删除

- **methodKey**: `FUe2DNDqym`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量删除

- **methodKey**: `FUMT6O9PW2`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"IN","left":{"field":"id"},"right":{"valueType":"1","value":"@ids"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量导出

- **methodKey**: `FU9T6BRfXi`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"operator_name","right":{"valueType":"1","value":"operator_name"}},{"field":"operator_id","right":{"valueType":"1","value":"operator_id"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_id","right":{"valueType":"1","value":"warehouse_id"}},{"field":"order_type","right":{"valueType":"1","value":"order_type"}},{"field":"order_no","right":{"valueType":"1","value":"order_no"}},{"field":"operation_desc","right":{"valueType":"1","value":"operation_desc"}},{"field":"operation_type","right":{"valueType":"1","value":"operation_type"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_id","right":{"valueType":"1","value":"product_id"}},{"field":"sn_code","right":{"valueType":"1","value":"sn_code"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"operator_name"},"right":{"valueType":"1","value":"@operator_name"},"config":{"test":"CONTAINSKEY(__params, \\"operator_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"operator_id"},"right":{"valueType":"1","value":"@operator_id"},"config":{"test":"CONTAINSKEY(__params, \\"operator_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_type"},"right":{"valueType":"1","value":"@order_type"},"config":{"test":"CONTAINSKEY(__params, \\"order_type\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"order_no"},"right":{"valueType":"1","value":"@order_no"},"config":{"test":"CONTAINSKEY(__params, \\"order_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"operation_desc"},"right":{"valueType":"1","value":"@operation_desc"},"config":{"test":"CONTAINSKEY(__params, \\"operation_desc\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"operation_type"},"right":{"valueType":"1","value":"@operation_type"},"config":{"test":"CONTAINSKEY(__params, \\"operation_type\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"},"config":{"test":"CONTAINSKEY(__params, \\"product_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_code"},"right":{"valueType":"1","value":"@sn_code"},"config":{"test":"CONTAINSKEY(__params, \\"sn_code\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":false}}', 'methodConfig': '{"exportRows":1000,"conditionExecuteStrategy":"notExecute","operation":"EXPORT","exportFormat":"Excel"}'}
```

#### 批量导入

- **methodKey**: `FUVDkCqqDG`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'BATCH_INSERT', 'gui': '{}', 'methodConfig': '{"operation":"IMPORT"}'}
```

---

## SN码表

| 属性 | 值 |
|------|-----|
| modelKey | `MOk2ZJ4aga` |
| modelNameEn | `sn_code` |
| tableName | `sn_code` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 长度 | 说明 |
|---------|---------|---------|-----------|------|------|------|
| remark | 备注 | 长文本 | varchar(1024) | 否 | 1024 |  |
| customer_name | 客户名称 | 短文本 | varchar(255) | 否 | 255 |  |
| customer_id | 客户ID | 整数 | int | 否 |  |  |
| stock_out_time | 出库时间 | 日期时间 | datetime | 否 |  |  |
| stock_in_time | 入库时间 | 日期时间 | datetime | 否 |  |  |
| purchase_time | 采购时间 | 日期时间 | datetime | 否 |  |  |
| sale_price | 销售价 | 整数 | int | 否 |  |  |
| purchase_price | 采购价 | 整数 | int | 否 |  |  |
| source_order_type | 来源单据类型 | 短文本 | varchar(255) | 否 | 255 |  |
| source_order_no | 来源单号 | 短文本 | varchar(255) | 否 | 255 |  |
| status | 状态 | 短文本 | varchar(255) | 否 | 255 |  |
| warehouse_name | 仓库名称 | 短文本 | varchar(255) | 否 | 255 |  |
| warehouse_id | 仓库ID | 整数 | int | 否 |  |  |
| product_code | 商品编码 | 短文本 | varchar(255) | 否 | 255 |  |
| product_name | 商品名称 | 短文本 | varchar(255) | 否 | 255 |  |
| product_id | 商品ID | 整数 | int | 否 |  |  |
| sn_code | SN码 | 短文本 | varchar(255) | 否 | 255 |  |
| id | 唯一标识 | 整数 | int | 是 |  | 唯一标识 |
| creator | 创建人 | 短文本 | varchar(255) | 是 | 255 | 创建人姓名 |
| created_at | 创建时间 | 日期时间 | timestamp | 是 |  | 创建时间 |
| updater | 更新人 | 短文本 | varchar(255) | 是 | 255 | 更新人姓名 |
| updated_at | 更新时间 | 日期时间 | timestamp | 是 |  | 更新时间 |
| is_deleted | 是否删除 | 布尔 | tinyint | 是 |  | 是否已删除 |
| deleted_at | 删除时间 | 日期时间 | timestamp | 是 |  | 删除时间 |

### 方法定义

| 方法名称 | methodKey | 类型 |
|---------|-----------|------|
| getStatusCount | `FUBkwoTsdZ` | SQL |
| getByWarehouse | `FUzTSnSYnx` | SQL |
| warehouse_id | `FUfOqMyhJV` | SQL |
| getStockOutToday | `FUXHQf4isJ` | SQL |
| scrap | `FUFTtY9af0` | SQL |
| 列表查询 | `FUG5LjJIRx` | GUI |
| 新增 | `FUUjEoVur5` | GUI |
| 编辑 | `FUU302EENf` | GUI |
| 查看详情 | `FUZTDMrkH7` | GUI |
| 删除 | `FUoV37QEI0` | GUI |
| 批量删除 | `FU5DfOATRh` | GUI |
| 批量导出 | `FUEUHkNQAZ` | GUI |
| 批量导入 | `FU2bmzxkbA` | GUI |

### 方法详情（含SQL实现）

#### getStatusCount

- **methodKey**: `FUBkwoTsdZ`
- **类型**: SQL
- **说明**: 无

```sql
{'statementType': 'SELECT', 'dsl': {'select': [{'field': 'status'}, {'args': [{'field': '*'}], 'func': 'COUNT', 'alias': 'count'}], 'statement': 'SELECT', 'where': {'children': [{'op': '=', 'left': {'field': 'is_deleted'}, 'right': 0}], 'operator': 'AND'}, 'groupBy': [{'field': 'status'}], 'modelKey': 'MOk2ZJ4aga'}, 'sql': 'SELECT\n        status, COUNT(*) AS count \n    FROM\n        kdvpsiaaiaaa_dev_sn_code \n    WHERE\n        is_deleted = 0 GROUP BY status'}
```

#### getByWarehouse

- **methodKey**: `FUzTSnSYnx`
- **类型**: SQL
- **说明**: 无

```sql
{'statementType': 'SELECT', 'dsl': {'select': [{'field': 'warehouse_id'}, {'field': 'warehouse_name'}, {'args': [{'field': '*'}], 'func': 'COUNT', 'alias': 'count'}], 'statement': 'SELECT', 'where': {'children': [{'op': '=', 'left': {'field': 'is_deleted'}, 'right': 0}, {'op': '=', 'left': {'field': 'warehouse_id'}, 'right': '@warehouse_id'}], 'operator': 'AND'}, 'groupBy': [{'field': 'warehouse_id'}, {'field': 'warehouse_name'}], 'modelKey': 'MOk2ZJ4aga'}, 'sql': 'SELECT\n        warehouse_id, warehouse_name, COUNT(*) AS count \n    FROM\n        kdvpsiaaiaaa_dev_sn_code \n    WHERE\n        is_deleted = 0  AND warehouse_id = @warehouse_id GROUP BY warehouse_id, warehouse_name'}
```

#### warehouse_id

- **methodKey**: `FUfOqMyhJV`
- **类型**: SQL
- **说明**: 无

```sql
{'statementType': 'SELECT', 'dsl': {'select': [{'field': 'warehouse_id'}, {'field': 'warehouse_name'}, {'args': [{'field': '*'}], 'func': 'COUNT', 'alias': 'count'}], 'statement': 'SELECT', 'where': {'children': [{'op': '=', 'left': {'field': 'is_deleted'}, 'right': 0}, {'op': '=', 'left': {'args': [{'field': 'stock_in_time'}], 'func': 'DATE'}, 'right': {'func': 'CURDATE'}}], 'operator': 'AND'}, 'groupBy': [{'field': 'warehouse_id'}, {'field': 'warehouse_name'}], 'modelKey': 'MOk2ZJ4aga'}, 'sql': 'SELECT\n        warehouse_id, warehouse_name, COUNT(*) AS count \n    FROM\n        kdvpsiaaiaaa_dev_sn_code \n    WHERE\n        is_deleted = 0  AND DATE(stock_in_time) = CURDATE() GROUP BY warehouse_id, warehouse_name'}
```

#### getStockOutToday

- **methodKey**: `FUXHQf4isJ`
- **类型**: SQL
- **说明**: 无

```sql
{'statementType': 'SELECT', 'dsl': {'select': [{'field': 'warehouse_id'}, {'field': 'warehouse_name'}, {'args': [{'field': '*'}], 'func': 'COUNT', 'alias': 'count'}], 'statement': 'SELECT', 'where': {'children': [{'op': '=', 'left': {'field': 'is_deleted'}, 'right': 0}, {'op': '=', 'left': {'args': [{'field': 'stock_out_time'}], 'func': 'DATE'}, 'right': {'func': 'CURDATE'}}], 'operator': 'AND'}, 'groupBy': [{'field': 'warehouse_id'}, {'field': 'warehouse_name'}], 'modelKey': 'MOk2ZJ4aga'}, 'sql': 'SELECT\n        warehouse_id, warehouse_name, COUNT(*) AS count \n    FROM\n        kdvpsiaaiaaa_dev_sn_code \n    WHERE\n        is_deleted = 0  AND DATE(stock_out_time) = CURDATE() GROUP BY warehouse_id, warehouse_name'}
```

#### scrap

- **methodKey**: `FUFTtY9af0`
- **类型**: SQL
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'dsl': {'set': {'remark': {'args': [{'args': [{'field': 'remark'}, ''], 'func': 'IFNULL'}, ' | 报废原因: ', '@reason', ' | 报废时间: ', {'func': 'NOW'}], 'func': 'CONCAT'}, 'status': 'SCRAP'}, 'statement': 'UPDATE', 'where': {'children': [{'op': '=', 'left': {'field': 'id'}, 'right': '@id'}, {'op': '=', 'left': {'field': 'is_deleted'}, 'right': 0}], 'operator': 'AND'}, 'modelKey': 'MOk2ZJ4aga'}, 'sql': "UPDATE\n        kdvpsiaaiaaa_dev_sn_code \n    SET\n        status = 'SCRAP', remark = CONCAT(IFNULL(remark, ''), ' | 报废原因: ', @reason, ' | 报废时间: ', NOW()) \n    WHERE\n        id = @id  AND is_deleted = 0"}
```

#### 列表查询

- **methodKey**: `FUG5LjJIRx`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"customer_name","right":{"valueType":"1","value":"customer_name"}},{"field":"customer_id","right":{"valueType":"1","value":"customer_id"}},{"field":"stock_out_time","right":{"valueType":"1","value":"stock_out_time"}},{"field":"stock_in_time","right":{"valueType":"1","value":"stock_in_time"}},{"field":"purchase_time","right":{"valueType":"1","value":"purchase_time"}},{"field":"sale_price","right":{"valueType":"1","value":"sale_price"}},{"field":"purchase_price","right":{"valueType":"1","value":"purchase_price"}},{"field":"source_order_type","right":{"valueType":"1","value":"source_order_type"}},{"field":"source_order_no","right":{"valueType":"1","value":"source_order_no"}},{"field":"status","right":{"valueType":"1","value":"status"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_id","right":{"valueType":"1","value":"warehouse_id"}},{"field":"product_code","right":{"valueType":"1","value":"product_code"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_id","right":{"valueType":"1","value":"product_id"}},{"field":"sn_code","right":{"valueType":"1","value":"sn_code"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"customer_name"},"right":{"valueType":"1","value":"@customer_name"},"config":{"test":"CONTAINSKEY(__params, \\"customer_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"customer_id"},"right":{"valueType":"1","value":"@customer_id"},"config":{"test":"CONTAINSKEY(__params, \\"customer_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"stock_out_time"},"right":{"valueType":"1","value":["@stock_out_time_start","@stock_out_time_end"]},"config":{"test":"CONTAINSKEY(__params, \\"stock_out_time_start\\") || CONTAINSKEY(__params, \\"stock_out_time_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"stock_in_time"},"right":{"valueType":"1","value":["@stock_in_time_start","@stock_in_time_end"]},"config":{"test":"CONTAINSKEY(__params, \\"stock_in_time_start\\") || CONTAINSKEY(__params, \\"stock_in_time_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"purchase_time"},"right":{"valueType":"1","value":["@purchase_time_start","@purchase_time_end"]},"config":{"test":"CONTAINSKEY(__params, \\"purchase_time_start\\") || CONTAINSKEY(__params, \\"purchase_time_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sale_price"},"right":{"valueType":"1","value":"@sale_price"},"config":{"test":"CONTAINSKEY(__params, \\"sale_price\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"purchase_price"},"right":{"valueType":"1","value":"@purchase_price"},"config":{"test":"CONTAINSKEY(__params, \\"purchase_price\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"source_order_type"},"right":{"valueType":"1","value":"@source_order_type"},"config":{"test":"CONTAINSKEY(__params, \\"source_order_type\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"source_order_no"},"right":{"valueType":"1","value":"@source_order_no"},"config":{"test":"CONTAINSKEY(__params, \\"source_order_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"status"},"right":{"valueType":"1","value":"@status"},"config":{"test":"CONTAINSKEY(__params, \\"status\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"},"config":{"test":"CONTAINSKEY(__params, \\"product_code\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"},"config":{"test":"CONTAINSKEY(__params, \\"product_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_code"},"right":{"valueType":"1","value":"@sn_code"},"config":{"test":"CONTAINSKEY(__params, \\"sn_code\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":true}}', 'methodConfig': '{"conditionExecuteStrategy":"notExecute"}'}
```

#### 新增

- **methodKey**: `FUUjEoVur5`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'INSERT', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"}},{"left":{"field":"customer_name"},"right":{"valueType":"1","value":"@customer_name"}},{"left":{"field":"customer_id"},"right":{"valueType":"1","value":"@customer_id"}},{"left":{"field":"stock_out_time"},"right":{"valueType":"1","value":"@stock_out_time"}},{"left":{"field":"stock_in_time"},"right":{"valueType":"1","value":"@stock_in_time"}},{"left":{"field":"purchase_time"},"right":{"valueType":"1","value":"@purchase_time"}},{"left":{"field":"sale_price"},"right":{"valueType":"1","value":"@sale_price"}},{"left":{"field":"purchase_price"},"right":{"valueType":"1","value":"@purchase_price"}},{"left":{"field":"source_order_type"},"right":{"valueType":"1","value":"@source_order_type"}},{"left":{"field":"source_order_no"},"right":{"valueType":"1","value":"@source_order_no"}},{"left":{"field":"status"},"right":{"valueType":"1","value":"@status"}},{"left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"}},{"left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"}},{"left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"}},{"left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"}},{"left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"}},{"left":{"field":"sn_code"},"right":{"valueType":"1","value":"@sn_code"}}]}'}
```

#### 编辑

- **methodKey**: `FUU302EENf`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","require":false}},{"left":{"field":"customer_name"},"right":{"valueType":"1","value":"@customer_name"},"config":{"test":"CONTAINSKEY(__params, \\"customer_name\\")","require":false}},{"left":{"field":"customer_id"},"right":{"valueType":"1","value":"@customer_id"},"config":{"test":"CONTAINSKEY(__params, \\"customer_id\\")","require":false}},{"left":{"field":"stock_out_time"},"right":{"valueType":"1","value":"@stock_out_time"},"config":{"test":"CONTAINSKEY(__params, \\"stock_out_time\\")","require":false}},{"left":{"field":"stock_in_time"},"right":{"valueType":"1","value":"@stock_in_time"},"config":{"test":"CONTAINSKEY(__params, \\"stock_in_time\\")","require":false}},{"left":{"field":"purchase_time"},"right":{"valueType":"1","value":"@purchase_time"},"config":{"test":"CONTAINSKEY(__params, \\"purchase_time\\")","require":false}},{"left":{"field":"sale_price"},"right":{"valueType":"1","value":"@sale_price"},"config":{"test":"CONTAINSKEY(__params, \\"sale_price\\")","require":false}},{"left":{"field":"purchase_price"},"right":{"valueType":"1","value":"@purchase_price"},"config":{"test":"CONTAINSKEY(__params, \\"purchase_price\\")","require":false}},{"left":{"field":"source_order_type"},"right":{"valueType":"1","value":"@source_order_type"},"config":{"test":"CONTAINSKEY(__params, \\"source_order_type\\")","require":false}},{"left":{"field":"source_order_no"},"right":{"valueType":"1","value":"@source_order_no"},"config":{"test":"CONTAINSKEY(__params, \\"source_order_no\\")","require":false}},{"left":{"field":"status"},"right":{"valueType":"1","value":"@status"},"config":{"test":"CONTAINSKEY(__params, \\"status\\")","require":false}},{"left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","require":false}},{"left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_id\\")","require":false}},{"left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"},"config":{"test":"CONTAINSKEY(__params, \\"product_code\\")","require":false}},{"left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","require":false}},{"left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"},"config":{"test":"CONTAINSKEY(__params, \\"product_id\\")","require":false}},{"left":{"field":"sn_code"},"right":{"valueType":"1","value":"@sn_code"},"config":{"test":"CONTAINSKEY(__params, \\"sn_code\\")","require":false}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 查看详情

- **methodKey**: `FUZTDMrkH7`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"customer_name","right":{"valueType":"1","value":"customer_name"}},{"field":"customer_id","right":{"valueType":"1","value":"customer_id"}},{"field":"stock_out_time","right":{"valueType":"1","value":"stock_out_time"}},{"field":"stock_in_time","right":{"valueType":"1","value":"stock_in_time"}},{"field":"purchase_time","right":{"valueType":"1","value":"purchase_time"}},{"field":"sale_price","right":{"valueType":"1","value":"sale_price"}},{"field":"purchase_price","right":{"valueType":"1","value":"purchase_price"}},{"field":"source_order_type","right":{"valueType":"1","value":"source_order_type"}},{"field":"source_order_no","right":{"valueType":"1","value":"source_order_no"}},{"field":"status","right":{"valueType":"1","value":"status"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_id","right":{"valueType":"1","value":"warehouse_id"}},{"field":"product_code","right":{"valueType":"1","value":"product_code"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_id","right":{"valueType":"1","value":"product_id"}},{"field":"sn_code","right":{"valueType":"1","value":"sn_code"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 删除

- **methodKey**: `FUoV37QEI0`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量删除

- **methodKey**: `FU5DfOATRh`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"IN","left":{"field":"id"},"right":{"valueType":"1","value":"@ids"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量导出

- **methodKey**: `FUEUHkNQAZ`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"customer_name","right":{"valueType":"1","value":"customer_name"}},{"field":"customer_id","right":{"valueType":"1","value":"customer_id"}},{"field":"stock_out_time","right":{"valueType":"1","value":"stock_out_time"}},{"field":"stock_in_time","right":{"valueType":"1","value":"stock_in_time"}},{"field":"purchase_time","right":{"valueType":"1","value":"purchase_time"}},{"field":"sale_price","right":{"valueType":"1","value":"sale_price"}},{"field":"purchase_price","right":{"valueType":"1","value":"purchase_price"}},{"field":"source_order_type","right":{"valueType":"1","value":"source_order_type"}},{"field":"source_order_no","right":{"valueType":"1","value":"source_order_no"}},{"field":"status","right":{"valueType":"1","value":"status"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_id","right":{"valueType":"1","value":"warehouse_id"}},{"field":"product_code","right":{"valueType":"1","value":"product_code"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_id","right":{"valueType":"1","value":"product_id"}},{"field":"sn_code","right":{"valueType":"1","value":"sn_code"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"customer_name"},"right":{"valueType":"1","value":"@customer_name"},"config":{"test":"CONTAINSKEY(__params, \\"customer_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"customer_id"},"right":{"valueType":"1","value":"@customer_id"},"config":{"test":"CONTAINSKEY(__params, \\"customer_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"stock_out_time"},"right":{"valueType":"1","value":["@stock_out_time_start","@stock_out_time_end"]},"config":{"test":"CONTAINSKEY(__params, \\"stock_out_time_start\\") || CONTAINSKEY(__params, \\"stock_out_time_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"stock_in_time"},"right":{"valueType":"1","value":["@stock_in_time_start","@stock_in_time_end"]},"config":{"test":"CONTAINSKEY(__params, \\"stock_in_time_start\\") || CONTAINSKEY(__params, \\"stock_in_time_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"purchase_time"},"right":{"valueType":"1","value":["@purchase_time_start","@purchase_time_end"]},"config":{"test":"CONTAINSKEY(__params, \\"purchase_time_start\\") || CONTAINSKEY(__params, \\"purchase_time_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sale_price"},"right":{"valueType":"1","value":"@sale_price"},"config":{"test":"CONTAINSKEY(__params, \\"sale_price\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"purchase_price"},"right":{"valueType":"1","value":"@purchase_price"},"config":{"test":"CONTAINSKEY(__params, \\"purchase_price\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"source_order_type"},"right":{"valueType":"1","value":"@source_order_type"},"config":{"test":"CONTAINSKEY(__params, \\"source_order_type\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"source_order_no"},"right":{"valueType":"1","value":"@source_order_no"},"config":{"test":"CONTAINSKEY(__params, \\"source_order_no\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"status"},"right":{"valueType":"1","value":"@status"},"config":{"test":"CONTAINSKEY(__params, \\"status\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_id"},"right":{"valueType":"1","value":"@warehouse_id"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"},"config":{"test":"CONTAINSKEY(__params, \\"product_code\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_id"},"right":{"valueType":"1","value":"@product_id"},"config":{"test":"CONTAINSKEY(__params, \\"product_id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sn_code"},"right":{"valueType":"1","value":"@sn_code"},"config":{"test":"CONTAINSKEY(__params, \\"sn_code\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":false}}', 'methodConfig': '{"exportRows":1000,"conditionExecuteStrategy":"notExecute","operation":"EXPORT","exportFormat":"Excel"}'}
```

#### 批量导入

- **methodKey**: `FU2bmzxkbA`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'BATCH_INSERT', 'gui': '{}', 'methodConfig': '{"operation":"IMPORT"}'}
```

---

## 账户

| 属性 | 值 |
|------|-----|
| modelKey | `MOAusBgPiT` |
| modelNameEn | `account` |
| tableName | `account` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 长度 | 说明 |
|---------|---------|---------|-----------|------|------|------|
| remark | 备注 | 长文本 | varchar(1024) | 否 | 1024 |  |
| current_balance | 当前余额 | 整数 | int | 否 |  |  |
| initial_balance | 起初余额 | 整数 | int | 否 |  |  |
| bank_account | 银行账号 | 短文本 | varchar(255) | 否 | 255 |  |
| bank_name | 开户银行 | 短文本 | varchar(255) | 否 | 255 |  |
| account_type | 账户类型银行现金 | 短文本 | varchar(255) | 否 | 255 |  |
| account_name | 账户名称 | 短文本 | varchar(255) | 否 | 255 |  |
| account_code | 账户编码 | 短文本 | varchar(255) | 否 | 255 |  |
| id | 唯一标识 | 整数 | int | 是 |  | 唯一标识 |
| creator | 创建人 | 短文本 | varchar(255) | 是 | 255 | 创建人姓名 |
| created_at | 创建时间 | 日期时间 | timestamp | 是 |  | 创建时间 |
| updater | 更新人 | 短文本 | varchar(255) | 是 | 255 | 更新人姓名 |
| updated_at | 更新时间 | 日期时间 | timestamp | 是 |  | 更新时间 |
| is_deleted | 是否删除 | 布尔 | tinyint | 是 |  | 是否已删除 |
| deleted_at | 删除时间 | 日期时间 | timestamp | 是 |  | 删除时间 |

### 方法定义

| 方法名称 | methodKey | 类型 |
|---------|-----------|------|
| 列表查询 | `FUHgerXSOC` | GUI |
| 新增 | `FUDiYnyCzb` | GUI |
| 编辑 | `FUzqHOsuFZ` | GUI |
| 查看详情 | `FUeCQ9aGgK` | GUI |
| 删除 | `FUwztwsCvd` | GUI |
| 批量删除 | `FUUSzfU6ZY` | GUI |
| 批量导出 | `FUGp5If8Yy` | GUI |
| 批量导入 | `FUyPI7RxL1` | GUI |

### 方法详情（含SQL实现）

#### 列表查询

- **methodKey**: `FUHgerXSOC`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"current_balance","right":{"valueType":"1","value":"current_balance"}},{"field":"initial_balance","right":{"valueType":"1","value":"initial_balance"}},{"field":"bank_account","right":{"valueType":"1","value":"bank_account"}},{"field":"bank_name","right":{"valueType":"1","value":"bank_name"}},{"field":"account_type","right":{"valueType":"1","value":"account_type"}},{"field":"account_name","right":{"valueType":"1","value":"account_name"}},{"field":"account_code","right":{"valueType":"1","value":"account_code"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"current_balance"},"right":{"valueType":"1","value":"@current_balance"},"config":{"test":"CONTAINSKEY(__params, \\"current_balance\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"initial_balance"},"right":{"valueType":"1","value":"@initial_balance"},"config":{"test":"CONTAINSKEY(__params, \\"initial_balance\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"bank_account"},"right":{"valueType":"1","value":"@bank_account"},"config":{"test":"CONTAINSKEY(__params, \\"bank_account\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"bank_name"},"right":{"valueType":"1","value":"@bank_name"},"config":{"test":"CONTAINSKEY(__params, \\"bank_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"account_type"},"right":{"valueType":"1","value":"@account_type"},"config":{"test":"CONTAINSKEY(__params, \\"account_type\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"account_name"},"right":{"valueType":"1","value":"@account_name"},"config":{"test":"CONTAINSKEY(__params, \\"account_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"account_code"},"right":{"valueType":"1","value":"@account_code"},"config":{"test":"CONTAINSKEY(__params, \\"account_code\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":true}}', 'methodConfig': '{"conditionExecuteStrategy":"notExecute"}'}
```

#### 新增

- **methodKey**: `FUDiYnyCzb`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'INSERT', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"}},{"left":{"field":"current_balance"},"right":{"valueType":"1","value":"@current_balance"}},{"left":{"field":"initial_balance"},"right":{"valueType":"1","value":"@initial_balance"}},{"left":{"field":"bank_account"},"right":{"valueType":"1","value":"@bank_account"}},{"left":{"field":"bank_name"},"right":{"valueType":"1","value":"@bank_name"}},{"left":{"field":"account_type"},"right":{"valueType":"1","value":"@account_type"}},{"left":{"field":"account_name"},"right":{"valueType":"1","value":"@account_name"}},{"left":{"field":"account_code"},"right":{"valueType":"1","value":"@account_code"}}]}'}
```

#### 编辑

- **methodKey**: `FUzqHOsuFZ`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","require":false}},{"left":{"field":"current_balance"},"right":{"valueType":"1","value":"@current_balance"},"config":{"test":"CONTAINSKEY(__params, \\"current_balance\\")","require":false}},{"left":{"field":"initial_balance"},"right":{"valueType":"1","value":"@initial_balance"},"config":{"test":"CONTAINSKEY(__params, \\"initial_balance\\")","require":false}},{"left":{"field":"bank_account"},"right":{"valueType":"1","value":"@bank_account"},"config":{"test":"CONTAINSKEY(__params, \\"bank_account\\")","require":false}},{"left":{"field":"bank_name"},"right":{"valueType":"1","value":"@bank_name"},"config":{"test":"CONTAINSKEY(__params, \\"bank_name\\")","require":false}},{"left":{"field":"account_type"},"right":{"valueType":"1","value":"@account_type"},"config":{"test":"CONTAINSKEY(__params, \\"account_type\\")","require":false}},{"left":{"field":"account_name"},"right":{"valueType":"1","value":"@account_name"},"config":{"test":"CONTAINSKEY(__params, \\"account_name\\")","require":false}},{"left":{"field":"account_code"},"right":{"valueType":"1","value":"@account_code"},"config":{"test":"CONTAINSKEY(__params, \\"account_code\\")","require":false}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 查看详情

- **methodKey**: `FUeCQ9aGgK`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"current_balance","right":{"valueType":"1","value":"current_balance"}},{"field":"initial_balance","right":{"valueType":"1","value":"initial_balance"}},{"field":"bank_account","right":{"valueType":"1","value":"bank_account"}},{"field":"bank_name","right":{"valueType":"1","value":"bank_name"}},{"field":"account_type","right":{"valueType":"1","value":"account_type"}},{"field":"account_name","right":{"valueType":"1","value":"account_name"}},{"field":"account_code","right":{"valueType":"1","value":"account_code"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 删除

- **methodKey**: `FUwztwsCvd`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量删除

- **methodKey**: `FUUSzfU6ZY`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"IN","left":{"field":"id"},"right":{"valueType":"1","value":"@ids"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量导出

- **methodKey**: `FUGp5If8Yy`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"current_balance","right":{"valueType":"1","value":"current_balance"}},{"field":"initial_balance","right":{"valueType":"1","value":"initial_balance"}},{"field":"bank_account","right":{"valueType":"1","value":"bank_account"}},{"field":"bank_name","right":{"valueType":"1","value":"bank_name"}},{"field":"account_type","right":{"valueType":"1","value":"account_type"}},{"field":"account_name","right":{"valueType":"1","value":"account_name"}},{"field":"account_code","right":{"valueType":"1","value":"account_code"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"current_balance"},"right":{"valueType":"1","value":"@current_balance"},"config":{"test":"CONTAINSKEY(__params, \\"current_balance\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"initial_balance"},"right":{"valueType":"1","value":"@initial_balance"},"config":{"test":"CONTAINSKEY(__params, \\"initial_balance\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"bank_account"},"right":{"valueType":"1","value":"@bank_account"},"config":{"test":"CONTAINSKEY(__params, \\"bank_account\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"bank_name"},"right":{"valueType":"1","value":"@bank_name"},"config":{"test":"CONTAINSKEY(__params, \\"bank_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"account_type"},"right":{"valueType":"1","value":"@account_type"},"config":{"test":"CONTAINSKEY(__params, \\"account_type\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"account_name"},"right":{"valueType":"1","value":"@account_name"},"config":{"test":"CONTAINSKEY(__params, \\"account_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"account_code"},"right":{"valueType":"1","value":"@account_code"},"config":{"test":"CONTAINSKEY(__params, \\"account_code\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":false}}', 'methodConfig': '{"exportRows":1000,"conditionExecuteStrategy":"notExecute","operation":"EXPORT","exportFormat":"Excel"}'}
```

#### 批量导入

- **methodKey**: `FUyPI7RxL1`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'BATCH_INSERT', 'gui': '{}', 'methodConfig': '{"operation":"IMPORT"}'}
```

---

## 仓库

| 属性 | 值 |
|------|-----|
| modelKey | `MO3LPiTHMU` |
| modelNameEn | `warehouse` |
| tableName | `warehouse` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 长度 | 说明 |
|---------|---------|---------|-----------|------|------|------|
| remark | 备注 | 长文本 | varchar(1024) | 否 | 1024 |  |
| warehouse_manager | 仓库管理员 | 短文本 | varchar(255) | 否 | 255 |  |
| warehouse_address | 仓库地址 | 长文本 | varchar(1024) | 否 | 1024 |  |
| warehouse_name | 仓库名称 | 短文本 | varchar(255) | 否 | 255 |  |
| warehouse_code | 仓库编码 | 短文本 | varchar(255) | 否 | 255 |  |
| id | 唯一标识 | 整数 | int | 是 |  | 唯一标识 |
| creator | 创建人 | 短文本 | varchar(255) | 是 | 255 | 创建人姓名 |
| created_at | 创建时间 | 日期时间 | timestamp | 是 |  | 创建时间 |
| updater | 更新人 | 短文本 | varchar(255) | 是 | 255 | 更新人姓名 |
| updated_at | 更新时间 | 日期时间 | timestamp | 是 |  | 更新时间 |
| is_deleted | 是否删除 | 布尔 | tinyint | 是 |  | 是否已删除 |
| deleted_at | 删除时间 | 日期时间 | timestamp | 是 |  | 删除时间 |

### 方法定义

| 方法名称 | methodKey | 类型 |
|---------|-----------|------|
| 列表查询 | `FUQYxNNGuG` | GUI |
| 新增 | `FUCOPYNJ7K` | GUI |
| 编辑 | `FUo00VnLkx` | GUI |
| 查看详情 | `FU68EKjRvx` | GUI |
| 删除 | `FUaTjjfFE0` | GUI |
| 批量删除 | `FUPkYpontz` | GUI |
| 批量导出 | `FUlvSmHFsf` | GUI |
| 批量导入 | `FUMsjXWwid` | GUI |

### 方法详情（含SQL实现）

#### 列表查询

- **methodKey**: `FUQYxNNGuG`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"warehouse_manager","right":{"valueType":"1","value":"warehouse_manager"}},{"field":"warehouse_address","right":{"valueType":"1","value":"warehouse_address"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_code","right":{"valueType":"1","value":"warehouse_code"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_manager"},"right":{"valueType":"1","value":"@warehouse_manager"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_manager\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_address"},"right":{"valueType":"1","value":"@warehouse_address"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_address\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_code"},"right":{"valueType":"1","value":"@warehouse_code"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_code\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":true}}', 'methodConfig': '{"conditionExecuteStrategy":"notExecute"}'}
```

#### 新增

- **methodKey**: `FUCOPYNJ7K`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'INSERT', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"}},{"left":{"field":"warehouse_manager"},"right":{"valueType":"1","value":"@warehouse_manager"}},{"left":{"field":"warehouse_address"},"right":{"valueType":"1","value":"@warehouse_address"}},{"left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"}},{"left":{"field":"warehouse_code"},"right":{"valueType":"1","value":"@warehouse_code"}}]}'}
```

#### 编辑

- **methodKey**: `FUo00VnLkx`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","require":false}},{"left":{"field":"warehouse_manager"},"right":{"valueType":"1","value":"@warehouse_manager"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_manager\\")","require":false}},{"left":{"field":"warehouse_address"},"right":{"valueType":"1","value":"@warehouse_address"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_address\\")","require":false}},{"left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","require":false}},{"left":{"field":"warehouse_code"},"right":{"valueType":"1","value":"@warehouse_code"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_code\\")","require":false}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 查看详情

- **methodKey**: `FU68EKjRvx`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"warehouse_manager","right":{"valueType":"1","value":"warehouse_manager"}},{"field":"warehouse_address","right":{"valueType":"1","value":"warehouse_address"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_code","right":{"valueType":"1","value":"warehouse_code"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 删除

- **methodKey**: `FUaTjjfFE0`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量删除

- **methodKey**: `FUPkYpontz`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"IN","left":{"field":"id"},"right":{"valueType":"1","value":"@ids"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量导出

- **methodKey**: `FUlvSmHFsf`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"warehouse_manager","right":{"valueType":"1","value":"warehouse_manager"}},{"field":"warehouse_address","right":{"valueType":"1","value":"warehouse_address"}},{"field":"warehouse_name","right":{"valueType":"1","value":"warehouse_name"}},{"field":"warehouse_code","right":{"valueType":"1","value":"warehouse_code"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_manager"},"right":{"valueType":"1","value":"@warehouse_manager"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_manager\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_address"},"right":{"valueType":"1","value":"@warehouse_address"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_address\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_name"},"right":{"valueType":"1","value":"@warehouse_name"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"warehouse_code"},"right":{"valueType":"1","value":"@warehouse_code"},"config":{"test":"CONTAINSKEY(__params, \\"warehouse_code\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":false}}', 'methodConfig': '{"exportRows":1000,"conditionExecuteStrategy":"notExecute","operation":"EXPORT","exportFormat":"Excel"}'}
```

#### 批量导入

- **methodKey**: `FUMsjXWwid`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'BATCH_INSERT', 'gui': '{}', 'methodConfig': '{"operation":"IMPORT"}'}
```

---

## 商品

| 属性 | 值 |
|------|-----|
| modelKey | `MOeUIsmD4j` |
| modelNameEn | `product` |
| tableName | `product` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 长度 | 说明 |
|---------|---------|---------|-----------|------|------|------|
| remark | 备注 | 长文本 | varchar(1024) | 否 | 1024 |  |
| is_sn_managed | 是否SN码管理 | 整数 | int | 否 |  |  |
| sale_price | 销售价 | 整数 | int | 否 |  |  |
| purchase_price | 采购价 | 整数 | int | 否 |  |  |
| spec | 规格 | 短文本 | varchar(255) | 否 | 255 |  |
| unit | 单位 | 短文本 | varchar(255) | 否 | 255 |  |
| product_type | 商品类型型号 | 短文本 | varchar(255) | 否 | 255 |  |
| product_name | 商品名称 | 短文本 | varchar(255) | 否 | 255 |  |
| product_code | 商品编码 | 短文本 | varchar(255) | 否 | 255 |  |
| id | 唯一标识 | 整数 | int | 是 |  | 唯一标识 |
| creator | 创建人 | 短文本 | varchar(255) | 是 | 255 | 创建人姓名 |
| created_at | 创建时间 | 日期时间 | timestamp | 是 |  | 创建时间 |
| updater | 更新人 | 短文本 | varchar(255) | 是 | 255 | 更新人姓名 |
| updated_at | 更新时间 | 日期时间 | timestamp | 是 |  | 更新时间 |
| is_deleted | 是否删除 | 布尔 | tinyint | 是 |  | 是否已删除 |
| deleted_at | 删除时间 | 日期时间 | timestamp | 是 |  | 删除时间 |

### 方法定义

| 方法名称 | methodKey | 类型 |
|---------|-----------|------|
| 列表查询 | `FUcPuvGaEN` | GUI |
| 新增 | `FUZUQvhIh9` | GUI |
| 编辑 | `FUMutJUzWB` | GUI |
| 查看详情 | `FUOgJ5FJea` | GUI |
| 删除 | `FUJPKoVKGz` | GUI |
| 批量删除 | `FUH5YRdvye` | GUI |
| 批量导出 | `FUJ0uxh8Ip` | GUI |
| 批量导入 | `FUvqVlyzNs` | GUI |

### 方法详情（含SQL实现）

#### 列表查询

- **methodKey**: `FUcPuvGaEN`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"is_sn_managed","right":{"valueType":"1","value":"is_sn_managed"}},{"field":"sale_price","right":{"valueType":"1","value":"sale_price"}},{"field":"purchase_price","right":{"valueType":"1","value":"purchase_price"}},{"field":"spec","right":{"valueType":"1","value":"spec"}},{"field":"unit","right":{"valueType":"1","value":"unit"}},{"field":"product_type","right":{"valueType":"1","value":"product_type"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_code","right":{"valueType":"1","value":"product_code"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_sn_managed"},"right":{"valueType":"1","value":"@is_sn_managed"},"config":{"test":"CONTAINSKEY(__params, \\"is_sn_managed\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sale_price"},"right":{"valueType":"1","value":"@sale_price"},"config":{"test":"CONTAINSKEY(__params, \\"sale_price\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"purchase_price"},"right":{"valueType":"1","value":"@purchase_price"},"config":{"test":"CONTAINSKEY(__params, \\"purchase_price\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"spec"},"right":{"valueType":"1","value":"@spec"},"config":{"test":"CONTAINSKEY(__params, \\"spec\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"},"config":{"test":"CONTAINSKEY(__params, \\"unit\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_type"},"right":{"valueType":"1","value":"@product_type"},"config":{"test":"CONTAINSKEY(__params, \\"product_type\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"},"config":{"test":"CONTAINSKEY(__params, \\"product_code\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":true}}', 'methodConfig': '{"conditionExecuteStrategy":"notExecute"}'}
```

#### 新增

- **methodKey**: `FUZUQvhIh9`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'INSERT', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"}},{"left":{"field":"is_sn_managed"},"right":{"valueType":"1","value":"@is_sn_managed"}},{"left":{"field":"sale_price"},"right":{"valueType":"1","value":"@sale_price"}},{"left":{"field":"purchase_price"},"right":{"valueType":"1","value":"@purchase_price"}},{"left":{"field":"spec"},"right":{"valueType":"1","value":"@spec"}},{"left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"}},{"left":{"field":"product_type"},"right":{"valueType":"1","value":"@product_type"}},{"left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"}},{"left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"}}]}'}
```

#### 编辑

- **methodKey**: `FUMutJUzWB`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","require":false}},{"left":{"field":"is_sn_managed"},"right":{"valueType":"1","value":"@is_sn_managed"},"config":{"test":"CONTAINSKEY(__params, \\"is_sn_managed\\")","require":false}},{"left":{"field":"sale_price"},"right":{"valueType":"1","value":"@sale_price"},"config":{"test":"CONTAINSKEY(__params, \\"sale_price\\")","require":false}},{"left":{"field":"purchase_price"},"right":{"valueType":"1","value":"@purchase_price"},"config":{"test":"CONTAINSKEY(__params, \\"purchase_price\\")","require":false}},{"left":{"field":"spec"},"right":{"valueType":"1","value":"@spec"},"config":{"test":"CONTAINSKEY(__params, \\"spec\\")","require":false}},{"left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"},"config":{"test":"CONTAINSKEY(__params, \\"unit\\")","require":false}},{"left":{"field":"product_type"},"right":{"valueType":"1","value":"@product_type"},"config":{"test":"CONTAINSKEY(__params, \\"product_type\\")","require":false}},{"left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","require":false}},{"left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"},"config":{"test":"CONTAINSKEY(__params, \\"product_code\\")","require":false}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 查看详情

- **methodKey**: `FUOgJ5FJea`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"is_sn_managed","right":{"valueType":"1","value":"is_sn_managed"}},{"field":"sale_price","right":{"valueType":"1","value":"sale_price"}},{"field":"purchase_price","right":{"valueType":"1","value":"purchase_price"}},{"field":"spec","right":{"valueType":"1","value":"spec"}},{"field":"unit","right":{"valueType":"1","value":"unit"}},{"field":"product_type","right":{"valueType":"1","value":"product_type"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_code","right":{"valueType":"1","value":"product_code"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 删除

- **methodKey**: `FUJPKoVKGz`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量删除

- **methodKey**: `FUH5YRdvye`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"IN","left":{"field":"id"},"right":{"valueType":"1","value":"@ids"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量导出

- **methodKey**: `FUJ0uxh8Ip`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"is_sn_managed","right":{"valueType":"1","value":"is_sn_managed"}},{"field":"sale_price","right":{"valueType":"1","value":"sale_price"}},{"field":"purchase_price","right":{"valueType":"1","value":"purchase_price"}},{"field":"spec","right":{"valueType":"1","value":"spec"}},{"field":"unit","right":{"valueType":"1","value":"unit"}},{"field":"product_type","right":{"valueType":"1","value":"product_type"}},{"field":"product_name","right":{"valueType":"1","value":"product_name"}},{"field":"product_code","right":{"valueType":"1","value":"product_code"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_sn_managed"},"right":{"valueType":"1","value":"@is_sn_managed"},"config":{"test":"CONTAINSKEY(__params, \\"is_sn_managed\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"sale_price"},"right":{"valueType":"1","value":"@sale_price"},"config":{"test":"CONTAINSKEY(__params, \\"sale_price\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"purchase_price"},"right":{"valueType":"1","value":"@purchase_price"},"config":{"test":"CONTAINSKEY(__params, \\"purchase_price\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"spec"},"right":{"valueType":"1","value":"@spec"},"config":{"test":"CONTAINSKEY(__params, \\"spec\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"unit"},"right":{"valueType":"1","value":"@unit"},"config":{"test":"CONTAINSKEY(__params, \\"unit\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_type"},"right":{"valueType":"1","value":"@product_type"},"config":{"test":"CONTAINSKEY(__params, \\"product_type\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_name"},"right":{"valueType":"1","value":"@product_name"},"config":{"test":"CONTAINSKEY(__params, \\"product_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"product_code"},"right":{"valueType":"1","value":"@product_code"},"config":{"test":"CONTAINSKEY(__params, \\"product_code\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":false}}', 'methodConfig': '{"exportRows":1000,"conditionExecuteStrategy":"notExecute","operation":"EXPORT","exportFormat":"Excel"}'}
```

#### 批量导入

- **methodKey**: `FUvqVlyzNs`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'BATCH_INSERT', 'gui': '{}', 'methodConfig': '{"operation":"IMPORT"}'}
```

---

## 客户

| 属性 | 值 |
|------|-----|
| modelKey | `MOj7UPuJx2` |
| modelNameEn | `customer` |
| tableName | `customer` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 长度 | 说明 |
|---------|---------|---------|-----------|------|------|------|
| remark | 备注 | 长文本 | varchar(1024) | 否 | 1024 |  |
| address | 地址 | 长文本 | varchar(1024) | 否 | 1024 |  |
| contact_phone | 联系电话 | 短文本 | varchar(255) | 否 | 255 |  |
| contact_person | 联系人 | 短文本 | varchar(255) | 否 | 255 |  |
| customer_name | 客户名称 | 短文本 | varchar(255) | 否 | 255 |  |
| customer_code | 客户编码 | 短文本 | varchar(255) | 否 | 255 |  |
| id | 唯一标识 | 整数 | int | 是 |  | 唯一标识 |
| creator | 创建人 | 短文本 | varchar(255) | 是 | 255 | 创建人姓名 |
| created_at | 创建时间 | 日期时间 | timestamp | 是 |  | 创建时间 |
| updater | 更新人 | 短文本 | varchar(255) | 是 | 255 | 更新人姓名 |
| updated_at | 更新时间 | 日期时间 | timestamp | 是 |  | 更新时间 |
| is_deleted | 是否删除 | 布尔 | tinyint | 是 |  | 是否已删除 |
| deleted_at | 删除时间 | 日期时间 | timestamp | 是 |  | 删除时间 |

### 方法定义

| 方法名称 | methodKey | 类型 |
|---------|-----------|------|
| 列表查询 | `FUhljLxQOC` | GUI |
| 新增 | `FUhdIhuhKP` | GUI |
| 编辑 | `FUBLg4XVak` | GUI |
| 查看详情 | `FUkrgtof0H` | GUI |
| 删除 | `FUvIfraor5` | GUI |
| 批量删除 | `FU1ezRzLc6` | GUI |
| 批量导出 | `FUgkOv0wRF` | GUI |
| 批量导入 | `FUC5nKgXdO` | GUI |

### 方法详情（含SQL实现）

#### 列表查询

- **methodKey**: `FUhljLxQOC`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"address","right":{"valueType":"1","value":"address"}},{"field":"contact_phone","right":{"valueType":"1","value":"contact_phone"}},{"field":"contact_person","right":{"valueType":"1","value":"contact_person"}},{"field":"customer_name","right":{"valueType":"1","value":"customer_name"}},{"field":"customer_code","right":{"valueType":"1","value":"customer_code"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"address"},"right":{"valueType":"1","value":"@address"},"config":{"test":"CONTAINSKEY(__params, \\"address\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"contact_phone"},"right":{"valueType":"1","value":"@contact_phone"},"config":{"test":"CONTAINSKEY(__params, \\"contact_phone\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"contact_person"},"right":{"valueType":"1","value":"@contact_person"},"config":{"test":"CONTAINSKEY(__params, \\"contact_person\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"customer_name"},"right":{"valueType":"1","value":"@customer_name"},"config":{"test":"CONTAINSKEY(__params, \\"customer_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"customer_code"},"right":{"valueType":"1","value":"@customer_code"},"config":{"test":"CONTAINSKEY(__params, \\"customer_code\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":true}}', 'methodConfig': '{"conditionExecuteStrategy":"notExecute"}'}
```

#### 新增

- **methodKey**: `FUhdIhuhKP`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'INSERT', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"}},{"left":{"field":"address"},"right":{"valueType":"1","value":"@address"}},{"left":{"field":"contact_phone"},"right":{"valueType":"1","value":"@contact_phone"}},{"left":{"field":"contact_person"},"right":{"valueType":"1","value":"@contact_person"}},{"left":{"field":"customer_name"},"right":{"valueType":"1","value":"@customer_name"}},{"left":{"field":"customer_code"},"right":{"valueType":"1","value":"@customer_code"}}]}'}
```

#### 编辑

- **methodKey**: `FUBLg4XVak`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","require":false}},{"left":{"field":"address"},"right":{"valueType":"1","value":"@address"},"config":{"test":"CONTAINSKEY(__params, \\"address\\")","require":false}},{"left":{"field":"contact_phone"},"right":{"valueType":"1","value":"@contact_phone"},"config":{"test":"CONTAINSKEY(__params, \\"contact_phone\\")","require":false}},{"left":{"field":"contact_person"},"right":{"valueType":"1","value":"@contact_person"},"config":{"test":"CONTAINSKEY(__params, \\"contact_person\\")","require":false}},{"left":{"field":"customer_name"},"right":{"valueType":"1","value":"@customer_name"},"config":{"test":"CONTAINSKEY(__params, \\"customer_name\\")","require":false}},{"left":{"field":"customer_code"},"right":{"valueType":"1","value":"@customer_code"},"config":{"test":"CONTAINSKEY(__params, \\"customer_code\\")","require":false}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 查看详情

- **methodKey**: `FUkrgtof0H`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"address","right":{"valueType":"1","value":"address"}},{"field":"contact_phone","right":{"valueType":"1","value":"contact_phone"}},{"field":"contact_person","right":{"valueType":"1","value":"contact_person"}},{"field":"customer_name","right":{"valueType":"1","value":"customer_name"}},{"field":"customer_code","right":{"valueType":"1","value":"customer_code"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 删除

- **methodKey**: `FUvIfraor5`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量删除

- **methodKey**: `FU1ezRzLc6`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"IN","left":{"field":"id"},"right":{"valueType":"1","value":"@ids"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量导出

- **methodKey**: `FUgkOv0wRF`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"address","right":{"valueType":"1","value":"address"}},{"field":"contact_phone","right":{"valueType":"1","value":"contact_phone"}},{"field":"contact_person","right":{"valueType":"1","value":"contact_person"}},{"field":"customer_name","right":{"valueType":"1","value":"customer_name"}},{"field":"customer_code","right":{"valueType":"1","value":"customer_code"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"address"},"right":{"valueType":"1","value":"@address"},"config":{"test":"CONTAINSKEY(__params, \\"address\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"contact_phone"},"right":{"valueType":"1","value":"@contact_phone"},"config":{"test":"CONTAINSKEY(__params, \\"contact_phone\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"contact_person"},"right":{"valueType":"1","value":"@contact_person"},"config":{"test":"CONTAINSKEY(__params, \\"contact_person\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"customer_name"},"right":{"valueType":"1","value":"@customer_name"},"config":{"test":"CONTAINSKEY(__params, \\"customer_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"customer_code"},"right":{"valueType":"1","value":"@customer_code"},"config":{"test":"CONTAINSKEY(__params, \\"customer_code\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":false}}', 'methodConfig': '{"exportRows":1000,"conditionExecuteStrategy":"notExecute","operation":"EXPORT","exportFormat":"Excel"}'}
```

#### 批量导入

- **methodKey**: `FUC5nKgXdO`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'BATCH_INSERT', 'gui': '{}', 'methodConfig': '{"operation":"IMPORT"}'}
```

---

## 供应商表

| 属性 | 值 |
|------|-----|
| modelKey | `MOmke9xgeH` |
| modelNameEn | `supplier` |
| tableName | `supplier` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 长度 | 说明 |
|---------|---------|---------|-----------|------|------|------|
| remark | 备注 | 长文本 | varchar(1024) | 否 | 1024 |  |
| address | 地址 | 长文本 | varchar(1024) | 否 | 1024 |  |
| contact_phone | 联系电话 | 短文本 | varchar(255) | 否 | 255 |  |
| contact_person | 联系人 | 短文本 | varchar(255) | 否 | 255 |  |
| supplier_name | 供应商名称 | 短文本 | varchar(255) | 否 | 255 |  |
| supplier_code | 供应商编码 | 短文本 | varchar(255) | 否 | 255 |  |
| id | 唯一标识 | 整数 | int | 是 |  | 唯一标识 |
| creator | 创建人 | 短文本 | varchar(255) | 是 | 255 | 创建人姓名 |
| created_at | 创建时间 | 日期时间 | timestamp | 是 |  | 创建时间 |
| updater | 更新人 | 短文本 | varchar(255) | 是 | 255 | 更新人姓名 |
| updated_at | 更新时间 | 日期时间 | timestamp | 是 |  | 更新时间 |
| is_deleted | 是否删除 | 布尔 | tinyint | 是 |  | 是否已删除 |
| deleted_at | 删除时间 | 日期时间 | timestamp | 是 |  | 删除时间 |

### 方法定义

| 方法名称 | methodKey | 类型 |
|---------|-----------|------|
| 列表查询 | `FUahi0uBQQ` | GUI |
| 新增 | `FURNaL3qZ1` | GUI |
| 编辑 | `FUxSx9jzAe` | GUI |
| 查看详情 | `FUZ32CRNo9` | GUI |
| 删除 | `FUqg607gvT` | GUI |
| 批量删除 | `FUJnfXz4wQ` | GUI |
| 批量导出 | `FUgGELKOTB` | GUI |
| 批量导入 | `FU97SWibIq` | GUI |

### 方法详情（含SQL实现）

#### 列表查询

- **methodKey**: `FUahi0uBQQ`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"address","right":{"valueType":"1","value":"address"}},{"field":"contact_phone","right":{"valueType":"1","value":"contact_phone"}},{"field":"contact_person","right":{"valueType":"1","value":"contact_person"}},{"field":"supplier_name","right":{"valueType":"1","value":"supplier_name"}},{"field":"supplier_code","right":{"valueType":"1","value":"supplier_code"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"address"},"right":{"valueType":"1","value":"@address"},"config":{"test":"CONTAINSKEY(__params, \\"address\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"contact_phone"},"right":{"valueType":"1","value":"@contact_phone"},"config":{"test":"CONTAINSKEY(__params, \\"contact_phone\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"contact_person"},"right":{"valueType":"1","value":"@contact_person"},"config":{"test":"CONTAINSKEY(__params, \\"contact_person\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"supplier_name"},"right":{"valueType":"1","value":"@supplier_name"},"config":{"test":"CONTAINSKEY(__params, \\"supplier_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"supplier_code"},"right":{"valueType":"1","value":"@supplier_code"},"config":{"test":"CONTAINSKEY(__params, \\"supplier_code\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":true}}', 'methodConfig': '{"conditionExecuteStrategy":"notExecute"}'}
```

#### 新增

- **methodKey**: `FURNaL3qZ1`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'INSERT', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"}},{"left":{"field":"address"},"right":{"valueType":"1","value":"@address"}},{"left":{"field":"contact_phone"},"right":{"valueType":"1","value":"@contact_phone"}},{"left":{"field":"contact_person"},"right":{"valueType":"1","value":"@contact_person"}},{"left":{"field":"supplier_name"},"right":{"valueType":"1","value":"@supplier_name"}},{"left":{"field":"supplier_code"},"right":{"valueType":"1","value":"@supplier_code"}}]}'}
```

#### 编辑

- **methodKey**: `FUxSx9jzAe`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","require":false}},{"left":{"field":"address"},"right":{"valueType":"1","value":"@address"},"config":{"test":"CONTAINSKEY(__params, \\"address\\")","require":false}},{"left":{"field":"contact_phone"},"right":{"valueType":"1","value":"@contact_phone"},"config":{"test":"CONTAINSKEY(__params, \\"contact_phone\\")","require":false}},{"left":{"field":"contact_person"},"right":{"valueType":"1","value":"@contact_person"},"config":{"test":"CONTAINSKEY(__params, \\"contact_person\\")","require":false}},{"left":{"field":"supplier_name"},"right":{"valueType":"1","value":"@supplier_name"},"config":{"test":"CONTAINSKEY(__params, \\"supplier_name\\")","require":false}},{"left":{"field":"supplier_code"},"right":{"valueType":"1","value":"@supplier_code"},"config":{"test":"CONTAINSKEY(__params, \\"supplier_code\\")","require":false}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 查看详情

- **methodKey**: `FUZ32CRNo9`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"address","right":{"valueType":"1","value":"address"}},{"field":"contact_phone","right":{"valueType":"1","value":"contact_phone"}},{"field":"contact_person","right":{"valueType":"1","value":"contact_person"}},{"field":"supplier_name","right":{"valueType":"1","value":"supplier_name"}},{"field":"supplier_code","right":{"valueType":"1","value":"supplier_code"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 删除

- **methodKey**: `FUqg607gvT`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量删除

- **methodKey**: `FUJnfXz4wQ`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'UPDATE', 'gui': '{"data":[{"left":{"field":"is_deleted"},"right":{"valueType":"0","value":"1"}}],"query":{"children":[{"op":"IN","left":{"field":"id"},"right":{"valueType":"1","value":"@ids"},"config":{"disable":true,"unEditable":false,"require":true}}],"operator":"AND"}}', 'methodConfig': '{"conditionExecuteStrategy":"executeWithNull"}'}
```

#### 批量导出

- **methodKey**: `FUgGELKOTB`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'SELECT', 'gui': '{"select":[{"field":"id","right":{"valueType":"1","value":"id"}},{"field":"creator","right":{"valueType":"1","value":"creator"}},{"field":"created_at","right":{"valueType":"1","value":"created_at"}},{"field":"updater","right":{"valueType":"1","value":"updater"}},{"field":"updated_at","right":{"valueType":"1","value":"updated_at"}},{"field":"remark","right":{"valueType":"1","value":"remark"}},{"field":"address","right":{"valueType":"1","value":"address"}},{"field":"contact_phone","right":{"valueType":"1","value":"contact_phone"}},{"field":"contact_person","right":{"valueType":"1","value":"contact_person"}},{"field":"supplier_name","right":{"valueType":"1","value":"supplier_name"}},{"field":"supplier_code","right":{"valueType":"1","value":"supplier_code"}}],"query":{"children":[{"op":"=","left":{"field":"id"},"right":{"valueType":"1","value":"@id"},"config":{"test":"CONTAINSKEY(__params, \\"id\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"creator"},"right":{"valueType":"1","value":"@creator"},"config":{"test":"CONTAINSKEY(__params, \\"creator\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"created_at"},"right":{"valueType":"1","value":["@created_at_start","@created_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"created_at_start\\") || CONTAINSKEY(__params, \\"created_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"updater"},"right":{"valueType":"1","value":"@updater"},"config":{"test":"CONTAINSKEY(__params, \\"updater\\")","disable":false,"unEditable":false,"require":false}},{"op":"BETWEEN","left":{"field":"updated_at"},"right":{"valueType":"1","value":["@updated_at_start","@updated_at_end"]},"config":{"test":"CONTAINSKEY(__params, \\"updated_at_start\\") || CONTAINSKEY(__params, \\"updated_at_end\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"is_deleted"},"right":{"valueType":"0","value":"0"},"config":{"test":"CONTAINSKEY(__params, \\"is_deleted\\")","disable":false,"unEditable":true,"require":false}},{"op":"=","left":{"field":"remark"},"right":{"valueType":"1","value":"@remark"},"config":{"test":"CONTAINSKEY(__params, \\"remark\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"address"},"right":{"valueType":"1","value":"@address"},"config":{"test":"CONTAINSKEY(__params, \\"address\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"contact_phone"},"right":{"valueType":"1","value":"@contact_phone"},"config":{"test":"CONTAINSKEY(__params, \\"contact_phone\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"contact_person"},"right":{"valueType":"1","value":"@contact_person"},"config":{"test":"CONTAINSKEY(__params, \\"contact_person\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"supplier_name"},"right":{"valueType":"1","value":"@supplier_name"},"config":{"test":"CONTAINSKEY(__params, \\"supplier_name\\")","disable":false,"unEditable":false,"require":false}},{"op":"=","left":{"field":"supplier_code"},"right":{"valueType":"1","value":"@supplier_code"},"config":{"test":"CONTAINSKEY(__params, \\"supplier_code\\")","disable":false,"unEditable":false,"require":false}}],"operator":"AND"},"orderBy":{"valueType":"1","value":[{"left":{"field":"id"},"right":{"valueType":"0","value":"DESC"}}]},"paginator":{"outputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"},{"field":"total","description":"总条数"}],"inputParams":[{"field":"current","description":"当前页"},{"field":"pageSize","description":"每页条数"}],"guiVisible":false}}', 'methodConfig': '{"exportRows":1000,"conditionExecuteStrategy":"notExecute","operation":"EXPORT","exportFormat":"Excel"}'}
```

#### 批量导入

- **methodKey**: `FU97SWibIq`
- **类型**: GUI
- **说明**: 无

```sql
{'statementType': 'BATCH_INSERT', 'gui': '{}', 'methodConfig': '{"operation":"IMPORT"}'}
```

---

