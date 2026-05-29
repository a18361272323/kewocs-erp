# 低开平台数据模型快速参考

> 从 `新建文本文档 (3).txt` 提取
> 
> **共 21 个模型**

---

## 模型总览

| 序号 | 模型名称 | modelKey | 方法数 | 字段数 |
|------|---------|----------|--------|--------|
| 1 | 财务流水对接表 | `MO08KyO9eU` | 11 | 25 |
| 2 | 库存台账表 | `MOsWdYRJhQ` | 11 | 16 |
| 3 | 盘点单明细表 | `MO0T3mVifs` | 8 | 19 |
| 4 | 盘点单主表 | `MO5WOkA9SX` | 8 | 21 |
| 5 | 调拨单明细表 | `MOORe8J0Dl` | 8 | 19 |
| 6 | 调拨单主表 | `MOIrlRmiFH` | 8 | 19 |
| 7 | 销售退货单明细表 | `MOHwXl5rMK` | 8 | 19 |
| 8 | 销售退货单主表 | `MOky0Pcw6W` | 8 | 19 |
| 9 | 采购退货单明细表 | `MOkM8P1d1B` | 8 | 19 |
| 10 | 采购退货单主表 | `MOV8t2Ah9X` | 8 | 19 |
| 11 | 销售出库单明细表 | `MOg8t6pKm4` | 8 | 19 |
| 12 | 销售出库单主表 | `MOenA360T5` | 8 | 20 |
| 13 | 采购入库单明细表 | `MOc2tEbUGK` | 8 | 19 |
| 14 | 采购入库单主表 | `MOIN9eD2au` | 8 | 20 |
| 15 | SN操作日志表 | `MOqg2psiTa` | 8 | 19 |
| 16 | SN码表 | `MOk2ZJ4aga` | 13 | 24 |
| 17 | 账户 | `MOAusBgPiT` | 8 | 15 |
| 18 | 仓库 | `MO3LPiTHMU` | 8 | 12 |
| 19 | 商品 | `MOeUIsmD4j` | 8 | 16 |
| 20 | 客户 | `MOj7UPuJx2` | 8 | 13 |
| 21 | 供应商表 | `MOmke9xgeH` | 8 | 13 |

---

## 核心业务模型

### 盘点单主表

| 属性 | 值 |
|------|-----|
| modelKey | `MO5WOkA9SX` |
| modelNameEn | `check_order` |
| tableName | `check_order` |

**字段定义**

| 字段编码 | 字段名称 | 类型 | 必填 | 说明 |
|---------|---------|------|------|------|
| operator_name | 操作人名称 | 短文本 | 否 | |
| operator_id | 操作人ID | 短文本 | 否 | |
| remark | 备注 | 长文本 | 否 | |
| status | 状态 | 短文本 | 否 | |
| total_profit_amount | 盈亏总金额 | 整数 | 否 | |
| total_profit_quantity | 盈亏总数量 | 整数 | 否 | |
| total_actual_quantity | 实盘总数量 | 整数 | 否 | |
| total_book_quantity | 账面总数量 | 整数 | 否 | |
| voucher_no | 凭证号 | 短文本 | 否 | |
| adjust_account | 调整科目 | 短文本 | 否 | |
| warehouse_name | 仓库名称 | 短文本 | 否 | |
| warehouse_id | 仓库ID | 整数 | 否 | |
| order_date | 单据日期 | 日期时间 | 否 | |
| order_no | 单号 | 短文本 | 否 | |
| id | 唯一标识 | 整数 | 是 | |
| creator | 创建人 | 短文本 | 是 | |
| created_at | 创建时间 | 日期时间 | 是 | |
| updater | 更新人 | 短文本 | 是 | |
| updated_at | 更新时间 | 日期时间 | 是 | |
| is_deleted | 是否删除 | 布尔 | 是 | |
| deleted_at | 删除时间 | 日期时间 | 是 | |

**方法定义**

| 方法名称 | methodKey | 类型 | 说明 |
|---------|-----------|------|------|
| 列表查询 | `FUQ56UBDHj` | GUI |  |
| 新增 | `FUaAS7yYvZ` | GUI |  |
| 编辑 | `FU6H93URI8` | GUI |  |
| 查看详情 | `FUefEHSt2t` | GUI |  |
| 删除 | `FUlNcPIkiO` | GUI |  |
| 批量删除 | `FUmjgz0Nhc` | GUI |  |
| 批量导出 | `FUOScIIzUX` | GUI |  |
| 批量导入 | `FU61w84DwD` | GUI |  |
---

### 调拨单主表

| 属性 | 值 |
|------|-----|
| modelKey | `MOIrlRmiFH` |
| modelNameEn | `transfer_order` |
| tableName | `transfer_order` |

**字段定义**

| 字段编码 | 字段名称 | 类型 | 必填 | 说明 |
|---------|---------|------|------|------|
| operator_name | 操作人名称 | 短文本 | 否 | |
| operator_id | 操作人ID | 短文本 | 否 | |
| remark | 备注 | 长文本 | 否 | |
| status | 状态 | 短文本 | 否 | |
| total_amount | 总金额 | 整数 | 否 | |
| total_quantity | 总数量 | 整数 | 否 | |
| in_warehouse_name | 调入仓库名称 | 短文本 | 否 | |
| in_warehouse_id | 调入仓库ID | 整数 | 否 | |
| out_warehouse_name | 调出仓库名称 | 短文本 | 否 | |
| out_warehouse_id | 调出仓库ID | 整数 | 否 | |
| order_date | 单据日期 | 日期时间 | 否 | |
| order_no | 单号 | 短文本 | 否 | |
| id | 唯一标识 | 整数 | 是 | |
| creator | 创建人 | 短文本 | 是 | |
| created_at | 创建时间 | 日期时间 | 是 | |
| updater | 更新人 | 短文本 | 是 | |
| updated_at | 更新时间 | 日期时间 | 是 | |
| is_deleted | 是否删除 | 布尔 | 是 | |
| deleted_at | 删除时间 | 日期时间 | 是 | |

**方法定义**

| 方法名称 | methodKey | 类型 | 说明 |
|---------|-----------|------|------|
| 列表查询 | `FUW5FAbNha` | GUI |  |
| 新增 | `FUDC3wl6P8` | GUI |  |
| 编辑 | `FUhakKYGcF` | GUI |  |
| 查看详情 | `FU6Xezd5Pb` | GUI |  |
| 删除 | `FUWPKGnSWG` | GUI |  |
| 批量删除 | `FU3tKvMjiB` | GUI |  |
| 批量导出 | `FUgNmAK4ZF` | GUI |  |
| 批量导入 | `FUQdkyhrvX` | GUI |  |
---

### 销售出库单主表

| 属性 | 值 |
|------|-----|
| modelKey | `MOenA360T5` |
| modelNameEn | `stock_out_order` |
| tableName | `stock_out_order` |

**字段定义**

| 字段编码 | 字段名称 | 类型 | 必填 | 说明 |
|---------|---------|------|------|------|
| operator_name | 操作人名称 | 短文本 | 否 | |
| operator_id | 操作人ID | 短文本 | 否 | |
| remark | 备注 | 长文本 | 否 | |
| status | 状态 | 短文本 | 否 | |
| unpaid_amount | 未收款 | 整数 | 否 | |
| received_amount | 已收款 | 整数 | 否 | |
| total_amount | 总金额 | 整数 | 否 | |
| warehouse_name | 仓库名称 | 短文本 | 否 | |
| warehouse_id | 仓库ID | 整数 | 否 | |
| customer_name | 客户名称 | 短文本 | 否 | |
| customer_id | 客户ID | 整数 | 否 | |
| order_date | 单据日期 | 日期时间 | 否 | |
| order_no | 单号 | 短文本 | 否 | |
| id | 唯一标识 | 整数 | 是 | |
| creator | 创建人 | 短文本 | 是 | |
| created_at | 创建时间 | 日期时间 | 是 | |
| updater | 更新人 | 短文本 | 是 | |
| updated_at | 更新时间 | 日期时间 | 是 | |
| is_deleted | 是否删除 | 布尔 | 是 | |
| deleted_at | 删除时间 | 日期时间 | 是 | |

**方法定义**

| 方法名称 | methodKey | 类型 | 说明 |
|---------|-----------|------|------|
| 列表查询 | `FUJwJkbOnk` | GUI |  |
| 新增 | `FUUahJCtGe` | GUI |  |
| 编辑 | `FUMC1YOXai` | GUI |  |
| 查看详情 | `FU2ViffXw4` | GUI |  |
| 删除 | `FURLAv3gOp` | GUI |  |
| 批量删除 | `FUGjwYWEi4` | GUI |  |
| 批量导出 | `FUpBPZKxXy` | GUI |  |
| 批量导入 | `FUvGaqggfa` | GUI |  |
---

### 采购入库单主表

| 属性 | 值 |
|------|-----|
| modelKey | `MOIN9eD2au` |
| modelNameEn | `stock_in_order` |
| tableName | `stock_in_order` |

**字段定义**

| 字段编码 | 字段名称 | 类型 | 必填 | 说明 |
|---------|---------|------|------|------|
| operator_name | 操作人名称 | 短文本 | 否 | |
| operator_id | 操作人ID | 短文本 | 否 | |
| remark | 备注 | 长文本 | 否 | |
| status | 状态 | 短文本 | 否 | |
| unpaid_amount | 未付款 | 整数 | 否 | |
| paid_amount | 已付款 | 整数 | 否 | |
| total_amount | 总金额 | 整数 | 否 | |
| warehouse_name | 仓库名称 | 短文本 | 否 | |
| warehouse_id | 仓库ID | 整数 | 否 | |
| supplier_name | 供应商名称 | 短文本 | 否 | |
| supplier_id | 供应商ID | 整数 | 否 | |
| order_date | 单据日期 | 日期时间 | 否 | |
| order_no | 单号 | 短文本 | 否 | |
| id | 唯一标识 | 整数 | 是 | |
| creator | 创建人 | 短文本 | 是 | |
| created_at | 创建时间 | 日期时间 | 是 | |
| updater | 更新人 | 短文本 | 是 | |
| updated_at | 更新时间 | 日期时间 | 是 | |
| is_deleted | 是否删除 | 布尔 | 是 | |
| deleted_at | 删除时间 | 日期时间 | 是 | |

**方法定义**

| 方法名称 | methodKey | 类型 | 说明 |
|---------|-----------|------|------|
| 列表查询 | `FUADr2TygU` | GUI |  |
| 新增 | `FUlZOM13nS` | GUI |  |
| 编辑 | `FUlQSDHuOv` | GUI |  |
| 查看详情 | `FU8N6CTRMZ` | GUI |  |
| 删除 | `FU1WUGjjGO` | GUI |  |
| 批量删除 | `FUq6pQp2ka` | GUI |  |
| 批量导出 | `FUoTL911B2` | GUI |  |
| 批量导入 | `FUVy8K8tlA` | GUI |  |
---

### SN码表

| 属性 | 值 |
|------|-----|
| modelKey | `MOk2ZJ4aga` |
| modelNameEn | `sn_code` |
| tableName | `sn_code` |

**字段定义**

| 字段编码 | 字段名称 | 类型 | 必填 | 说明 |
|---------|---------|------|------|------|
| remark | 备注 | 长文本 | 否 | |
| customer_name | 客户名称 | 短文本 | 否 | |
| customer_id | 客户ID | 整数 | 否 | |
| stock_out_time | 出库时间 | 日期时间 | 否 | |
| stock_in_time | 入库时间 | 日期时间 | 否 | |
| purchase_time | 采购时间 | 日期时间 | 否 | |
| sale_price | 销售价 | 整数 | 否 | |
| purchase_price | 采购价 | 整数 | 否 | |
| source_order_type | 来源单据类型 | 短文本 | 否 | |
| source_order_no | 来源单号 | 短文本 | 否 | |
| status | 状态 | 短文本 | 否 | |
| warehouse_name | 仓库名称 | 短文本 | 否 | |
| warehouse_id | 仓库ID | 整数 | 否 | |
| product_code | 商品编码 | 短文本 | 否 | |
| product_name | 商品名称 | 短文本 | 否 | |
| product_id | 商品ID | 整数 | 否 | |
| sn_code | SN码 | 短文本 | 否 | |
| id | 唯一标识 | 整数 | 是 | |
| creator | 创建人 | 短文本 | 是 | |
| created_at | 创建时间 | 日期时间 | 是 | |
| updater | 更新人 | 短文本 | 是 | |
| updated_at | 更新时间 | 日期时间 | 是 | |
| is_deleted | 是否删除 | 布尔 | 是 | |
| deleted_at | 删除时间 | 日期时间 | 是 | |

**方法定义**

| 方法名称 | methodKey | 类型 | 说明 |
|---------|-----------|------|------|
| getStatusCount | `FUBkwoTsdZ` | SQL |  |
| getByWarehouse | `FUzTSnSYnx` | SQL |  |
| warehouse_id | `FUfOqMyhJV` | SQL |  |
| getStockOutToday | `FUXHQf4isJ` | SQL |  |
| scrap | `FUFTtY9af0` | SQL |  |
| 列表查询 | `FUG5LjJIRx` | GUI |  |
| 新增 | `FUUjEoVur5` | GUI |  |
| 编辑 | `FUU302EENf` | GUI |  |
| 查看详情 | `FUZTDMrkH7` | GUI |  |
| 删除 | `FUoV37QEI0` | GUI |  |
| 批量删除 | `FU5DfOATRh` | GUI |  |
| 批量导出 | `FUEUHkNQAZ` | GUI |  |
| 批量导入 | `FU2bmzxkbA` | GUI |  |

**SQL 方法详情**

**getStatusCount** (`FUBkwoTsdZ`)

```sql
{'statementType': 'SELECT', 'dsl': {'select': [{'field': 'status'}, {'args': [{'field': '*'}], 'func': 'COUNT', 'alias': 'count'}], 'statement': 'SELECT', 'where': {'children': [{'op': '=', 'left': {'field': 'is_deleted'}, 'right': 0}], 'operator': 'AND'}, 'groupBy': [{'field': 'status'}], 'modelKey': 'MOk2ZJ4aga'}, 'sql': 'SELECT\n        status, COUNT(*) AS count \n    FROM\n        kdvpsiaaiaaa_dev_sn_code \n    WHERE\n        is_deleted = 0 GROUP BY status'}
```

**getByWarehouse** (`FUzTSnSYnx`)

```sql
{'statementType': 'SELECT', 'dsl': {'select': [{'field': 'warehouse_id'}, {'field': 'warehouse_name'}, {'args': [{'field': '*'}], 'func': 'COUNT', 'alias': 'count'}], 'statement': 'SELECT', 'where': {'children': [{'op': '=', 'left': {'field': 'is_deleted'}, 'right': 0}, {'op': '=', 'left': {'field': 'warehouse_id'}, 'right': '@warehouse_id'}], 'operator': 'AND'}, 'groupBy': [{'field': 'warehouse_id'}, {'field': 'warehouse_name'}], 'modelKey': 'MOk2ZJ4aga'}, 'sql': 'SELECT\n        warehouse_id, warehouse_name, COUNT(*) AS count \n    FROM\n        kdvpsiaaiaaa_dev_sn_code \n    WHERE\n        is_deleted = 0  AND warehouse_id = @warehouse_id GROUP BY warehouse_id, warehouse_name'}
```

**warehouse_id** (`FUfOqMyhJV`)

```sql
{'statementType': 'SELECT', 'dsl': {'select': [{'field': 'warehouse_id'}, {'field': 'warehouse_name'}, {'args': [{'field': '*'}], 'func': 'COUNT', 'alias': 'count'}], 'statement': 'SELECT', 'where': {'children': [{'op': '=', 'left': {'field': 'is_deleted'}, 'right': 0}, {'op': '=', 'left': {'args': [{'field': 'stock_in_time'}], 'func': 'DATE'}, 'right': {'func': 'CURDATE'}}], 'operator': 'AND'}, 'groupBy': [{'field': 'warehouse_id'}, {'field': 'warehouse_name'}], 'modelKey': 'MOk2ZJ4aga'}, 'sql': 'SELECT\n        warehouse_id, warehouse_name, COUNT(*) AS count \n    FROM\n        kdvpsiaaiaaa_dev_sn_code \n    WHERE\n        is_deleted = 0  AND DATE(stock_in_time) = CURDATE() GROUP BY warehouse_id, warehouse_name'}
```

**getStockOutToday** (`FUXHQf4isJ`)

```sql
{'statementType': 'SELECT', 'dsl': {'select': [{'field': 'warehouse_id'}, {'field': 'warehouse_name'}, {'args': [{'field': '*'}], 'func': 'COUNT', 'alias': 'count'}], 'statement': 'SELECT', 'where': {'children': [{'op': '=', 'left': {'field': 'is_deleted'}, 'right': 0}, {'op': '=', 'left': {'args': [{'field': 'stock_out_time'}], 'func': 'DATE'}, 'right': {'func': 'CURDATE'}}], 'operator': 'AND'}, 'groupBy': [{'field': 'warehouse_id'}, {'field': 'warehouse_name'}], 'modelKey': 'MOk2ZJ4aga'}, 'sql': 'SELECT\n        warehouse_id, warehouse_name, COUNT(*) AS count \n    FROM\n        kdvpsiaaiaaa_dev_sn_code \n    WHERE\n        is_deleted = 0  AND DATE(stock_out_time) = CURDATE() GROUP BY warehouse_id, warehouse_name'}
```

**scrap** (`FUFTtY9af0`)

```sql
{'statementType': 'UPDATE', 'dsl': {'set': {'remark': {'args': [{'args': [{'field': 'remark'}, ''], 'func': 'IFNULL'}, ' | 报废原因: ', '@reason', ' | 报废时间: ', {'func': 'NOW'}], 'func': 'CONCAT'}, 'status': 'SCRAP'}, 'statement': 'UPDATE', 'where': {'children': [{'op': '=', 'left': {'field': 'id'}, 'right': '@id'}, {'op': '=', 'left': {'field': 'is_deleted'}, 'right': 0}], 'operator': 'AND'}, 'modelKey': 'MOk2ZJ4aga'}, 'sql': "UPDATE\n        kdvpsiaaiaaa_dev_sn_code \n    SET\n        status = 'SCRAP', remark = CONCAT(IFNULL(remark, ''), ' | 报废原因: ', @reason, ' | 报废时间: ', NOW()) \n    WHERE\n        id = @id  AND is_deleted = 0"}
```

---

