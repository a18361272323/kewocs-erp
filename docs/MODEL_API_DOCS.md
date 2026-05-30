# 低开平台模型方法 API 文档

> 基于 MODEL_REFERENCE.md 自动生成，从模型方法 SQL 定义中提取入参信息。
> 共 21 个模型，179 个方法。

---

## API 调用说明

### 接口地址

| 环境 | 地址 |
|------|------|
| 生产 | `https://xft.cmbchina.com/xcodegw/app/reg4bc6558503724/tag/prd/api/run/odexftopenapiv2appmodelmethodrun` |
| 测试 | `https://xft-demo.cmburl.cn/xcodegw/app/reg4bc6558503724/tag/uat/api/run/odexftopenapiv2appmodelmethodrun` |

### Query 参数（URL 查询参数）

| 参数 | 必填 | 类型 | 说明 |
|------|------|------|------|
| `appTag` | 是 | STRING | `prd`(生产) / `uat`(沙盒) |
| `modelKey` | 是 | STRING | 模型 Key |
| `methodKey` | 是 | STRING | 方法 Key |

### 公共响应格式

```json
{
  "returnCode": "SUC0000",
  "errorMsg": null,
  "body": { }
}
```

### 调用方式

- Method: **POST**
- Content-Type: **application/json**
- Credentials: **include** (需携带登录 Cookie)

### 列表查询通用参数

所有「列表查询」方法均支持以下分页和排序参数：

| 参数 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `current` | integer | 当前页，从 1 开始 | `1` |
| `pageSize` | integer | 每页条数 | `10` |
| `orders` | array | 排序规则 | `[{"key":"id","order":"DESC"}]` |

### 调用示例（列表查询）

```
POST ...?appTag=prd&modelKey=MO08KyO9eU&methodKey=FUC3UiW4pU
Content-Type: application/json

{
  "current": 1,
  "pageSize": 10,
  "orders": [{"key": "id", "order": "DESC"}]
}
```

---

## 模型目录

1. [财务流水对接表](#mo08kyo9eu) — `MO08KyO9eU` | `finance_flow` | 11 方法
2. [库存台账表](#moswdyrjhq) — `MOsWdYRJhQ` | `inventory` | 11 方法
3. [盘点单明细表](#mo0t3mvifs) — `MO0T3mVifs` | `checkitem` | 8 方法
4. [盘点单主表](#mo5woka9sx) — `MO5WOkA9SX` | `check_order` | 8 方法
5. [调拨单明细表](#moore8j0dl) — `MOORe8J0Dl` | `transfer_item` | 8 方法
6. [调拨单主表](#moirlrmifh) — `MOIrlRmiFH` | `transfer_order` | 8 方法
7. [销售退货单明细表](#mohwxl5rmk) — `MOHwXl5rMK` | `sa_re_item` | 8 方法
8. [销售退货单主表](#moky0pcw6w) — `MOky0Pcw6W` | `sa_re_ord` | 8 方法
9. [采购退货单明细表](#mokm8p1d1b) — `MOkM8P1d1B` | `pur_re_item` | 8 方法
10. [采购退货单主表](#mov8t2ah9x) — `MOV8t2Ah9X` | `pur_re_ord` | 8 方法
11. [销售出库单明细表](#mog8t6pkm4) — `MOg8t6pKm4` | `stock_out_item` | 8 方法
12. [销售出库单主表](#moena360t5) — `MOenA360T5` | `stock_out_order` | 8 方法
13. [采购入库单明细表](#moc2tebugk) — `MOc2tEbUGK` | `stock_in_item` | 8 方法
14. [采购入库单主表](#moin9ed2au) — `MOIN9eD2au` | `stock_in_order` | 8 方法
15. [SN操作日志表](#moqg2psita) — `MOqg2psiTa` | `sn_log` | 8 方法
16. [SN码表](#mok2zj4aga) — `MOk2ZJ4aga` | `sn_code` | 13 方法
17. [账户](#moausbgpit) — `MOAusBgPiT` | `account` | 8 方法
18. [仓库](#mo3lpithmu) — `MO3LPiTHMU` | `warehouse` | 8 方法
19. [商品](#moeuismd4j) — `MOeUIsmD4j` | `product` | 8 方法
20. [客户](#moj7upujx2) — `MOj7UPuJx2` | `customer` | 8 方法
21. [供应商表](#momke9xgeh) — `MOmke9xgeH` | `supplier` | 8 方法

---

## 财务流水对接表 {#mo08kyo9eu}

| 属性 | 值 |
|------|-----|
| modelKey | `MO08KyO9eU` |
| modelNameEn | `finance_flow` |
| tableName | `finance_flow` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 说明 |
|---------|---------|---------|-----------|------|------|
| `remark` | 备注 | 长文本 | varchar(1024) | 否 |  |
| `external_bill_status` | 外部账单状态 | 短文本 | varchar(255) | 否 |  |
| `external_bill_no` | 外部账单号 | 短文本 | varchar(255) | 否 |  |
| `sync_time` | 同步时间 | 日期时间 | datetime | 否 |  |
| `sync_status` | 同步状态 | 短文本 | varchar(255) | 否 |  |
| `due_date` | 到期日期 | 日期时间 | datetime | 否 |  |
| `bill_date` | 单据日期 | 日期时间 | datetime | 否 |  |
| `balance_amount` | 待核销金额 | 整数 | int | 否 |  |
| `paid_amount` | 已核销金额 | 整数 | int | 否 |  |
| `amount` | 应收应付金额 | 整数 | int | 否 |  |
| `counterparty_name` | 客户名称 | 短文本 | varchar(255) | 否 |  |
| `counterparty_code` | 客户编码 | 短文本 | varchar(255) | 否 |  |
| `counterparty_id` | 客户ID | 整数 | int | 否 |  |
| `counterparty_type` | 往来单位类型 | 短文本 | varchar(255) | 否 |  |
| `biz_type` | 业务类型 | 短文本 | varchar(255) | 否 |  |
| `source_no` | 来源单号 | 短文本 | varchar(255) | 否 |  |
| `source_type` | 来源类型 | 短文本 | varchar(255) | 否 |  |
| `flow_no` | 流水号唯一 | 短文本 | varchar(255) | 否 |  |
| `id` | 唯一标识 | 整数 | int | 是 | 唯一标识 |
| `creator` | 创建人 | 短文本 | varchar(255) | 是 | 创建人姓名 |
| `created_at` | 创建时间 | 日期时间 | timestamp | 是 | 创建时间 |
| `updater` | 更新人 | 短文本 | varchar(255) | 是 | 更新人姓名 |
| `updated_at` | 更新时间 | 日期时间 | timestamp | 是 | 更新时间 |
| `is_deleted` | 是否删除 | 布尔 | tinyint | 是 | 是否已删除 |
| `deleted_at` | 删除时间 | 日期时间 | timestamp | 是 | 删除时间 |

### 方法列表 (SQL 3 + GUI 8)

| # | 方法名称 | methodKey | 类型 | SQL操作 | 入参 |
|---|---------|-----------|------|--------|------|
| 1 | getSummaryByType | `FUilTGHdFd` | SQL | `SELECT` | 0 |
| 2 | getCounterpartySummary | `FUCxUCbjdm` | SQL | `SELECT` | 1 |
| 3 | getTodaySummary | `FUH9BA8mXe` | SQL | `SELECT` | 0 |
| 4 | 列表查询 | `FUC3UiW4pU` | GUI | `SELECT` | 31 +分页排序 |
| 5 | 新增 | `FUPktENU4l` | GUI | `INSERT` | 18 |
| 6 | 编辑 | `FUv6I0mjhC` | GUI | `UPDATE` | 19 |
| 7 | 查看详情 | `FUqDwSMSGq` | GUI | `SELECT` | 1 |
| 8 | 删除 | `FUkRzzgZ8H` | GUI | `UPDATE` | 1 |
| 9 | 批量删除 | `FUxySmGeBj` | GUI | `UPDATE` | 1 |
| 10 | 批量导出 | `FUIx58oD8g` | GUI | `SELECT` | 31 +分页排序 |
| 11 | 批量导入 | `FUIJibQIpw` | GUI | `BATCH_INSERT` | 0 |

### 方法详情

#### 1. getSummaryByType

- **methodKey**: `FUilTGHdFd`
- **类型**: SQL
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MO08KyO9eU&methodKey=FUilTGHdFd`

**请求 Body**:

```json
{}
```

<details>
<summary>参考 SQL</summary>

```sql
SELECT
        source_type, SUM(amount) AS total_amount, COUNT(*) AS count 
    FROM
        kdvu2maaiaaa_dev_finance_flow 
    WHERE
        is_deleted = 0 GROUP BY source_type
```
</details>

---

#### 2. getCounterpartySummary

- **methodKey**: `FUCxUCbjdm`
- **类型**: SQL
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MO08KyO9eU&methodKey=FUCxUCbjdm`

**请求 Body**:

```json
{
  "counterparty_id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `counterparty_id` | integer | 否 | 客户ID |

<details>
<summary>参考 SQL</summary>

```sql
SELECT
        counterparty_type, counterparty_id, counterparty_name, SUM(amount) AS total_amount, COUNT(*) AS count 
    FROM
        kdvu2maaiaaa_dev_finance_flow 
    WHERE
        is_deleted = 0  AND counterparty_id = @counterparty_id GROUP BY counterparty_type, counterparty_id, counterparty_name
```
</details>

---

#### 3. getTodaySummary

- **methodKey**: `FUH9BA8mXe`
- **类型**: SQL
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MO08KyO9eU&methodKey=FUH9BA8mXe`

**请求 Body**:

```json
{}
```

<details>
<summary>参考 SQL</summary>

```sql
SELECT
        source_type, SUM(amount) AS total_amount 
    FROM
        kdvu2maaiaaa_dev_finance_flow 
    WHERE
        is_deleted = 0  AND DATE(created_at) = CURDATE() GROUP BY source_type
```
</details>

---

#### 4. 列表查询

- **methodKey**: `FUC3UiW4pU`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MO08KyO9eU&methodKey=FUC3UiW4pU`

**请求 Body**:

```json
{
  "amount": "<integer>",
  "balance_amount": "<integer>",
  "bill_date_end": "<string>",
  "bill_date_start": "<string>",
  "biz_type": "<string>",
  "counterparty_code": "<string>",
  "counterparty_id": "<integer>",
  "counterparty_name": "<string>",
  "counterparty_type": "<string>",
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "due_date_end": "<string>",
  "due_date_start": "<string>",
  "external_bill_no": "<string>",
  "external_bill_status": "<string>",
  "flow_no": "<string>",
  "id": "<integer>",
  "pageSize": "<integer>",
  "paid_amount": "<integer>",
  "remark": "<string>",
  "source_no": "<string>",
  "source_type": "<string>",
  "sync_status": "<string>",
  "sync_time_end": "<string>",
  "sync_time_start": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `amount` | integer | 否 | 应收应付金额 |
| `balance_amount` | integer | 否 | 待核销金额 |
| `bill_date_end` | string | 否 | 单据日期 结束 |
| `bill_date_start` | string | 否 | 单据日期 起始 |
| `biz_type` | string | 否 | 业务类型 |
| `counterparty_code` | string | 否 | 客户编码 |
| `counterparty_id` | integer | 否 | 客户ID |
| `counterparty_name` | string | 否 | 客户名称 |
| `counterparty_type` | string | 否 | 往来单位类型 |
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `due_date_end` | string | 否 | 到期日期 结束 |
| `due_date_start` | string | 否 | 到期日期 起始 |
| `external_bill_no` | string | 否 | 外部账单号 |
| `external_bill_status` | string | 否 | 外部账单状态 |
| `flow_no` | string | 否 | 流水号唯一 |
| `id` | integer | 否 | 记录ID |
| `pageSize` | integer | 否 | 每页条数 |
| `paid_amount` | integer | 否 | 已核销金额 |
| `remark` | string | 否 | 备注 |
| `source_no` | string | 否 | 来源单号 |
| `source_type` | string | 否 | 来源类型 |
| `sync_status` | string | 否 | 同步状态 |
| `sync_time_end` | string | 否 | 同步时间 结束 |
| `sync_time_start` | string | 否 | 同步时间 起始 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 5. 新增

- **methodKey**: `FUPktENU4l`
- **类型**: GUI
- **SQL操作**: `INSERT`

**Query**: `?appTag=prd&modelKey=MO08KyO9eU&methodKey=FUPktENU4l`

**请求 Body**:

```json
{
  "amount": "<integer>",
  "balance_amount": "<integer>",
  "bill_date": "<string>",
  "biz_type": "<string>",
  "counterparty_code": "<string>",
  "counterparty_id": "<integer>",
  "counterparty_name": "<string>",
  "counterparty_type": "<string>",
  "due_date": "<string>",
  "external_bill_no": "<string>",
  "external_bill_status": "<string>",
  "flow_no": "<string>",
  "paid_amount": "<integer>",
  "remark": "<string>",
  "source_no": "<string>",
  "source_type": "<string>",
  "sync_status": "<string>",
  "sync_time": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `amount` | integer | 否 | 应收应付金额 |
| `balance_amount` | integer | 否 | 待核销金额 |
| `bill_date` | string | 否 | 单据日期 |
| `biz_type` | string | 否 | 业务类型 |
| `counterparty_code` | string | 否 | 客户编码 |
| `counterparty_id` | integer | 否 | 客户ID |
| `counterparty_name` | string | 否 | 客户名称 |
| `counterparty_type` | string | 否 | 往来单位类型 |
| `due_date` | string | 否 | 到期日期 |
| `external_bill_no` | string | 否 | 外部账单号 |
| `external_bill_status` | string | 否 | 外部账单状态 |
| `flow_no` | string | 否 | 流水号唯一 |
| `paid_amount` | integer | 否 | 已核销金额 |
| `remark` | string | 否 | 备注 |
| `source_no` | string | 否 | 来源单号 |
| `source_type` | string | 否 | 来源类型 |
| `sync_status` | string | 否 | 同步状态 |
| `sync_time` | string | 否 | 同步时间 |

---

#### 6. 编辑

- **methodKey**: `FUv6I0mjhC`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MO08KyO9eU&methodKey=FUv6I0mjhC`

**请求 Body**:

```json
{
  "amount": "<integer>",
  "balance_amount": "<integer>",
  "bill_date": "<string>",
  "biz_type": "<string>",
  "counterparty_code": "<string>",
  "counterparty_id": "<integer>",
  "counterparty_name": "<string>",
  "counterparty_type": "<string>",
  "due_date": "<string>",
  "external_bill_no": "<string>",
  "external_bill_status": "<string>",
  "flow_no": "<string>",
  "id": "<integer>",
  "paid_amount": "<integer>",
  "remark": "<string>",
  "source_no": "<string>",
  "source_type": "<string>",
  "sync_status": "<string>",
  "sync_time": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `amount` | integer | 否 | 应收应付金额 |
| `balance_amount` | integer | 否 | 待核销金额 |
| `bill_date` | string | 否 | 单据日期 |
| `biz_type` | string | 否 | 业务类型 |
| `counterparty_code` | string | 否 | 客户编码 |
| `counterparty_id` | integer | 否 | 客户ID |
| `counterparty_name` | string | 否 | 客户名称 |
| `counterparty_type` | string | 否 | 往来单位类型 |
| `due_date` | string | 否 | 到期日期 |
| `external_bill_no` | string | 否 | 外部账单号 |
| `external_bill_status` | string | 否 | 外部账单状态 |
| `flow_no` | string | 否 | 流水号唯一 |
| `id` | integer | 否 | 记录ID |
| `paid_amount` | integer | 否 | 已核销金额 |
| `remark` | string | 否 | 备注 |
| `source_no` | string | 否 | 来源单号 |
| `source_type` | string | 否 | 来源类型 |
| `sync_status` | string | 否 | 同步状态 |
| `sync_time` | string | 否 | 同步时间 |

---

#### 7. 查看详情

- **methodKey**: `FUqDwSMSGq`
- **类型**: GUI
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MO08KyO9eU&methodKey=FUqDwSMSGq`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 8. 删除

- **methodKey**: `FUkRzzgZ8H`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MO08KyO9eU&methodKey=FUkRzzgZ8H`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 9. 批量删除

- **methodKey**: `FUxySmGeBj`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MO08KyO9eU&methodKey=FUxySmGeBj`

**请求 Body**:

```json
{
  "ids": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `ids` | string | 否 | ID列表(逗号分隔) |

---

#### 10. 批量导出

- **methodKey**: `FUIx58oD8g`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MO08KyO9eU&methodKey=FUIx58oD8g`

**请求 Body**:

```json
{
  "amount": "<integer>",
  "balance_amount": "<integer>",
  "bill_date_end": "<string>",
  "bill_date_start": "<string>",
  "biz_type": "<string>",
  "counterparty_code": "<string>",
  "counterparty_id": "<integer>",
  "counterparty_name": "<string>",
  "counterparty_type": "<string>",
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "due_date_end": "<string>",
  "due_date_start": "<string>",
  "external_bill_no": "<string>",
  "external_bill_status": "<string>",
  "flow_no": "<string>",
  "id": "<integer>",
  "pageSize": "<integer>",
  "paid_amount": "<integer>",
  "remark": "<string>",
  "source_no": "<string>",
  "source_type": "<string>",
  "sync_status": "<string>",
  "sync_time_end": "<string>",
  "sync_time_start": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `amount` | integer | 否 | 应收应付金额 |
| `balance_amount` | integer | 否 | 待核销金额 |
| `bill_date_end` | string | 否 | 单据日期 结束 |
| `bill_date_start` | string | 否 | 单据日期 起始 |
| `biz_type` | string | 否 | 业务类型 |
| `counterparty_code` | string | 否 | 客户编码 |
| `counterparty_id` | integer | 否 | 客户ID |
| `counterparty_name` | string | 否 | 客户名称 |
| `counterparty_type` | string | 否 | 往来单位类型 |
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `due_date_end` | string | 否 | 到期日期 结束 |
| `due_date_start` | string | 否 | 到期日期 起始 |
| `external_bill_no` | string | 否 | 外部账单号 |
| `external_bill_status` | string | 否 | 外部账单状态 |
| `flow_no` | string | 否 | 流水号唯一 |
| `id` | integer | 否 | 记录ID |
| `pageSize` | integer | 否 | 每页条数 |
| `paid_amount` | integer | 否 | 已核销金额 |
| `remark` | string | 否 | 备注 |
| `source_no` | string | 否 | 来源单号 |
| `source_type` | string | 否 | 来源类型 |
| `sync_status` | string | 否 | 同步状态 |
| `sync_time_end` | string | 否 | 同步时间 结束 |
| `sync_time_start` | string | 否 | 同步时间 起始 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 11. 批量导入

- **methodKey**: `FUIJibQIpw`
- **类型**: GUI
- **SQL操作**: `BATCH_INSERT`

**Query**: `?appTag=prd&modelKey=MO08KyO9eU&methodKey=FUIJibQIpw`

**请求 Body**:

```json
{}
```

---

## 库存台账表 {#moswdyrjhq}

| 属性 | 值 |
|------|-----|
| modelKey | `MOsWdYRJhQ` |
| modelNameEn | `inventory` |
| tableName | `inventory` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 说明 |
|---------|---------|---------|-----------|------|------|
| `price` | 参考单价 | 整数 | int | 否 |  |
| `sn_quantity` | SN码商品库存数量 | 整数 | int | 否 |  |
| `quantity` | 当前库存数量 | 整数 | int | 否 |  |
| `unit` | 单位 | 短文本 | varchar(255) | 否 |  |
| `product_code` | 商品编码 | 短文本 | varchar(255) | 否 |  |
| `product_name` | 商品名称 | 短文本 | varchar(255) | 否 |  |
| `product_id` | 商品ID | 整数 | int | 否 |  |
| `warehouse_name` | 仓库名称 | 短文本 | varchar(255) | 否 |  |
| `warehouse_id` | 仓库ID | 整数 | int | 否 |  |
| `id` | 唯一标识 | 整数 | int | 是 | 唯一标识 |
| `creator` | 创建人 | 短文本 | varchar(255) | 是 | 创建人姓名 |
| `created_at` | 创建时间 | 日期时间 | timestamp | 是 | 创建时间 |
| `updater` | 更新人 | 短文本 | varchar(255) | 是 | 更新人姓名 |
| `updated_at` | 更新时间 | 日期时间 | timestamp | 是 | 更新时间 |
| `is_deleted` | 是否删除 | 布尔 | tinyint | 是 | 是否已删除 |
| `deleted_at` | 删除时间 | 日期时间 | timestamp | 是 | 删除时间 |

### 方法列表 (SQL 3 + GUI 8)

| # | 方法名称 | methodKey | 类型 | SQL操作 | 入参 |
|---|---------|-----------|------|--------|------|
| 1 | getAlertList | `FU9aGv2Zuh` | SQL | `SELECT` | 1 |
| 2 | getWarehouseSummary | `FU3ZfaZLPj` | SQL | `SELECT` | 0 |
| 3 | getLowStockCount | `FUhzR97DOC` | SQL | `SELECT` | 1 |
| 4 | 列表查询 | `FUsb8iYjRh` | GUI | `SELECT` | 19 +分页排序 |
| 5 | 新增 | `FU8Xen8xzH` | GUI | `INSERT` | 9 |
| 6 | 编辑 | `FUAkUucCVl` | GUI | `UPDATE` | 10 |
| 7 | 查看详情 | `FUY1usgMs9` | GUI | `SELECT` | 1 |
| 8 | 删除 | `FUxQYz4UvO` | GUI | `UPDATE` | 1 |
| 9 | 批量删除 | `FUpUpom9SD` | GUI | `UPDATE` | 1 |
| 10 | 批量导出 | `FUCoyQz1g4` | GUI | `SELECT` | 19 +分页排序 |
| 11 | 批量导入 | `FUPgHEgw07` | GUI | `BATCH_INSERT` | 0 |

### 方法详情

#### 1. getAlertList

- **methodKey**: `FU9aGv2Zuh`
- **类型**: SQL
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MOsWdYRJhQ&methodKey=FU9aGv2Zuh`

**请求 Body**:

```json
{
  "threshold": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `threshold` | string | 否 |  |

<details>
<summary>参考 SQL</summary>

```sql
SELECT
        product_id, product_name, product_code, warehouse_id, warehouse_name, quantity 
    FROM
        kdvungaasaaa_dev_inventory 
    WHERE
        is_deleted = 0  AND quantity <= @threshold ORDER BY quantity ASC
```
</details>

---

#### 2. getWarehouseSummary

- **methodKey**: `FU3ZfaZLPj`
- **类型**: SQL
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MOsWdYRJhQ&methodKey=FU3ZfaZLPj`

**请求 Body**:

```json
{}
```

<details>
<summary>参考 SQL</summary>

```sql
SELECT
        warehouse_id, warehouse_name, COUNT(*) AS product_count, SUM(quantity) AS total_quantity 
    FROM
        kdvungaasaaa_dev_inventory 
    WHERE
        is_deleted = 0 GROUP BY warehouse_id, warehouse_name
```
</details>

---

#### 3. getLowStockCount

- **methodKey**: `FUhzR97DOC`
- **类型**: SQL
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MOsWdYRJhQ&methodKey=FUhzR97DOC`

**请求 Body**:

```json
{
  "threshold": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `threshold` | string | 否 |  |

<details>
<summary>参考 SQL</summary>

```sql
SELECT
        COUNT(*) AS count 
    FROM
        kdvungaasaaa_dev_inventory 
    WHERE
        is_deleted = 0  AND quantity <= @threshold
```
</details>

---

#### 4. 列表查询

- **methodKey**: `FUsb8iYjRh`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOsWdYRJhQ&methodKey=FUsb8iYjRh`

**请求 Body**:

```json
{
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "pageSize": "<integer>",
  "price": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "quantity": "<integer>",
  "sn_quantity": "<integer>",
  "unit": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `pageSize` | integer | 否 | 每页条数 |
| `price` | integer | 否 | 参考单价 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `quantity` | integer | 否 | 当前库存数量 |
| `sn_quantity` | integer | 否 | SN码商品库存数量 |
| `unit` | string | 否 | 单位 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 5. 新增

- **methodKey**: `FU8Xen8xzH`
- **类型**: GUI
- **SQL操作**: `INSERT`

**Query**: `?appTag=prd&modelKey=MOsWdYRJhQ&methodKey=FU8Xen8xzH`

**请求 Body**:

```json
{
  "price": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "quantity": "<integer>",
  "sn_quantity": "<integer>",
  "unit": "<string>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `price` | integer | 否 | 参考单价 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `quantity` | integer | 否 | 当前库存数量 |
| `sn_quantity` | integer | 否 | SN码商品库存数量 |
| `unit` | string | 否 | 单位 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |

---

#### 6. 编辑

- **methodKey**: `FUAkUucCVl`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOsWdYRJhQ&methodKey=FUAkUucCVl`

**请求 Body**:

```json
{
  "id": "<integer>",
  "price": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "quantity": "<integer>",
  "sn_quantity": "<integer>",
  "unit": "<string>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |
| `price` | integer | 否 | 参考单价 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `quantity` | integer | 否 | 当前库存数量 |
| `sn_quantity` | integer | 否 | SN码商品库存数量 |
| `unit` | string | 否 | 单位 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |

---

#### 7. 查看详情

- **methodKey**: `FUY1usgMs9`
- **类型**: GUI
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MOsWdYRJhQ&methodKey=FUY1usgMs9`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 8. 删除

- **methodKey**: `FUxQYz4UvO`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOsWdYRJhQ&methodKey=FUxQYz4UvO`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 9. 批量删除

- **methodKey**: `FUpUpom9SD`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOsWdYRJhQ&methodKey=FUpUpom9SD`

**请求 Body**:

```json
{
  "ids": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `ids` | string | 否 | ID列表(逗号分隔) |

---

#### 10. 批量导出

- **methodKey**: `FUCoyQz1g4`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOsWdYRJhQ&methodKey=FUCoyQz1g4`

**请求 Body**:

```json
{
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "pageSize": "<integer>",
  "price": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "quantity": "<integer>",
  "sn_quantity": "<integer>",
  "unit": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `pageSize` | integer | 否 | 每页条数 |
| `price` | integer | 否 | 参考单价 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `quantity` | integer | 否 | 当前库存数量 |
| `sn_quantity` | integer | 否 | SN码商品库存数量 |
| `unit` | string | 否 | 单位 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 11. 批量导入

- **methodKey**: `FUPgHEgw07`
- **类型**: GUI
- **SQL操作**: `BATCH_INSERT`

**Query**: `?appTag=prd&modelKey=MOsWdYRJhQ&methodKey=FUPgHEgw07`

**请求 Body**:

```json
{}
```

---

## 盘点单明细表 {#mo0t3mvifs}

| 属性 | 值 |
|------|-----|
| modelKey | `MO0T3mVifs` |
| modelNameEn | `checkitem` |
| tableName | `checkitem` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 说明 |
|---------|---------|---------|-----------|------|------|
| `remark` | 备注 | 短文本 | varchar(255) | 否 |  |
| `profitamount` | 盈亏金额 | 整数 | int | 否 |  |
| `price` | 单价 | 小数 | decimal | 否 |  |
| `profitquantity` | 盈亏数量 | 整数 | int | 否 |  |
| `actualquantity` | 实盘数量 | 整数 | int | 否 |  |
| `bookquantity` | 账面数量 | 整数 | int | 否 |  |
| `unit` | 单位 | 短文本 | varchar(255) | 否 |  |
| `productcode` | 商品编码 | 短文本 | varchar(255) | 否 |  |
| `productname` | 商品名称 | 短文本 | varchar(255) | 否 |  |
| `productid` | 商品ID | 整数 | int | 否 |  |
| `orderno` | 单号 | 短文本 | varchar(255) | 否 |  |
| `orderid` | 主表ID | 整数 | int | 否 |  |
| `id` | 唯一标识 | 整数 | int | 是 | 唯一标识 |
| `creator` | 创建人 | 短文本 | varchar(255) | 是 | 创建人姓名 |
| `created_at` | 创建时间 | 日期时间 | timestamp | 是 | 创建时间 |
| `updater` | 更新人 | 短文本 | varchar(255) | 是 | 更新人姓名 |
| `updated_at` | 更新时间 | 日期时间 | timestamp | 是 | 更新时间 |
| `is_deleted` | 是否删除 | 布尔 | tinyint | 是 | 是否已删除 |
| `deleted_at` | 删除时间 | 日期时间 | timestamp | 是 | 删除时间 |

### 方法列表 (SQL 0 + GUI 8)

| # | 方法名称 | methodKey | 类型 | SQL操作 | 入参 |
|---|---------|-----------|------|--------|------|
| 1 | 列表查询 | `FUjedwjYjd` | GUI | `SELECT` | 22 +分页排序 |
| 2 | 新增 | `FUf8uvechL` | GUI | `INSERT` | 12 |
| 3 | 编辑 | `FUffcWxmy3` | GUI | `UPDATE` | 13 |
| 4 | 查看详情 | `FUYcsnH60S` | GUI | `SELECT` | 1 |
| 5 | 删除 | `FUuPMOZ2eU` | GUI | `UPDATE` | 1 |
| 6 | 批量删除 | `FULTQq4Skg` | GUI | `UPDATE` | 1 |
| 7 | 批量导出 | `FUUSqlUKzq` | GUI | `SELECT` | 22 +分页排序 |
| 8 | 批量导入 | `FUAEDRFBQ5` | GUI | `BATCH_INSERT` | 0 |

### 方法详情

#### 1. 列表查询

- **methodKey**: `FUjedwjYjd`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MO0T3mVifs&methodKey=FUjedwjYjd`

**请求 Body**:

```json
{
  "actualquantity": "<integer>",
  "bookquantity": "<integer>",
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "orderid": "<integer>",
  "orderno": "<string>",
  "pageSize": "<integer>",
  "price": "<integer>",
  "productcode": "<string>",
  "productid": "<integer>",
  "productname": "<string>",
  "profitamount": "<integer>",
  "profitquantity": "<integer>",
  "remark": "<string>",
  "unit": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `actualquantity` | integer | 否 | 实盘数量 |
| `bookquantity` | integer | 否 | 账面数量 |
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `orderid` | integer | 否 | 主表ID |
| `orderno` | string | 否 | 单号 |
| `pageSize` | integer | 否 | 每页条数 |
| `price` | integer | 否 | 单价 |
| `productcode` | string | 否 | 商品编码 |
| `productid` | integer | 否 | 商品ID |
| `productname` | string | 否 | 商品名称 |
| `profitamount` | integer | 否 | 盈亏金额 |
| `profitquantity` | integer | 否 | 盈亏数量 |
| `remark` | string | 否 | 备注 |
| `unit` | string | 否 | 单位 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 2. 新增

- **methodKey**: `FUf8uvechL`
- **类型**: GUI
- **SQL操作**: `INSERT`

**Query**: `?appTag=prd&modelKey=MO0T3mVifs&methodKey=FUf8uvechL`

**请求 Body**:

```json
{
  "actualquantity": "<integer>",
  "bookquantity": "<integer>",
  "orderid": "<integer>",
  "orderno": "<string>",
  "price": "<integer>",
  "productcode": "<string>",
  "productid": "<integer>",
  "productname": "<string>",
  "profitamount": "<integer>",
  "profitquantity": "<integer>",
  "remark": "<string>",
  "unit": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `actualquantity` | integer | 否 | 实盘数量 |
| `bookquantity` | integer | 否 | 账面数量 |
| `orderid` | integer | 否 | 主表ID |
| `orderno` | string | 否 | 单号 |
| `price` | integer | 否 | 单价 |
| `productcode` | string | 否 | 商品编码 |
| `productid` | integer | 否 | 商品ID |
| `productname` | string | 否 | 商品名称 |
| `profitamount` | integer | 否 | 盈亏金额 |
| `profitquantity` | integer | 否 | 盈亏数量 |
| `remark` | string | 否 | 备注 |
| `unit` | string | 否 | 单位 |

---

#### 3. 编辑

- **methodKey**: `FUffcWxmy3`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MO0T3mVifs&methodKey=FUffcWxmy3`

**请求 Body**:

```json
{
  "actualquantity": "<integer>",
  "bookquantity": "<integer>",
  "id": "<integer>",
  "orderid": "<integer>",
  "orderno": "<string>",
  "price": "<integer>",
  "productcode": "<string>",
  "productid": "<integer>",
  "productname": "<string>",
  "profitamount": "<integer>",
  "profitquantity": "<integer>",
  "remark": "<string>",
  "unit": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `actualquantity` | integer | 否 | 实盘数量 |
| `bookquantity` | integer | 否 | 账面数量 |
| `id` | integer | 否 | 记录ID |
| `orderid` | integer | 否 | 主表ID |
| `orderno` | string | 否 | 单号 |
| `price` | integer | 否 | 单价 |
| `productcode` | string | 否 | 商品编码 |
| `productid` | integer | 否 | 商品ID |
| `productname` | string | 否 | 商品名称 |
| `profitamount` | integer | 否 | 盈亏金额 |
| `profitquantity` | integer | 否 | 盈亏数量 |
| `remark` | string | 否 | 备注 |
| `unit` | string | 否 | 单位 |

---

#### 4. 查看详情

- **methodKey**: `FUYcsnH60S`
- **类型**: GUI
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MO0T3mVifs&methodKey=FUYcsnH60S`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 5. 删除

- **methodKey**: `FUuPMOZ2eU`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MO0T3mVifs&methodKey=FUuPMOZ2eU`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 6. 批量删除

- **methodKey**: `FULTQq4Skg`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MO0T3mVifs&methodKey=FULTQq4Skg`

**请求 Body**:

```json
{
  "ids": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `ids` | string | 否 | ID列表(逗号分隔) |

---

#### 7. 批量导出

- **methodKey**: `FUUSqlUKzq`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MO0T3mVifs&methodKey=FUUSqlUKzq`

**请求 Body**:

```json
{
  "actualquantity": "<integer>",
  "bookquantity": "<integer>",
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "orderid": "<integer>",
  "orderno": "<string>",
  "pageSize": "<integer>",
  "price": "<integer>",
  "productcode": "<string>",
  "productid": "<integer>",
  "productname": "<string>",
  "profitamount": "<integer>",
  "profitquantity": "<integer>",
  "remark": "<string>",
  "unit": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `actualquantity` | integer | 否 | 实盘数量 |
| `bookquantity` | integer | 否 | 账面数量 |
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `orderid` | integer | 否 | 主表ID |
| `orderno` | string | 否 | 单号 |
| `pageSize` | integer | 否 | 每页条数 |
| `price` | integer | 否 | 单价 |
| `productcode` | string | 否 | 商品编码 |
| `productid` | integer | 否 | 商品ID |
| `productname` | string | 否 | 商品名称 |
| `profitamount` | integer | 否 | 盈亏金额 |
| `profitquantity` | integer | 否 | 盈亏数量 |
| `remark` | string | 否 | 备注 |
| `unit` | string | 否 | 单位 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 8. 批量导入

- **methodKey**: `FUAEDRFBQ5`
- **类型**: GUI
- **SQL操作**: `BATCH_INSERT`

**Query**: `?appTag=prd&modelKey=MO0T3mVifs&methodKey=FUAEDRFBQ5`

**请求 Body**:

```json
{}
```

---

## 盘点单主表 {#mo5woka9sx}

| 属性 | 值 |
|------|-----|
| modelKey | `MO5WOkA9SX` |
| modelNameEn | `check_order` |
| tableName | `check_order` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 说明 |
|---------|---------|---------|-----------|------|------|
| `operator_name` | 操作人名称 | 短文本 | varchar(255) | 否 |  |
| `operator_id` | 操作人ID | 短文本 | varchar(255) | 否 |  |
| `remark` | 备注 | 长文本 | varchar(1024) | 否 |  |
| `status` | 状态 | 短文本 | varchar(255) | 否 |  |
| `total_profit_amount` | 盈亏总金额 | 整数 | int | 否 |  |
| `total_profit_quantity` | 盈亏总数量 | 整数 | int | 否 |  |
| `total_actual_quantity` | 实盘总数量 | 整数 | int | 否 |  |
| `total_book_quantity` | 账面总数量 | 整数 | int | 否 |  |
| `voucher_no` | 凭证号 | 短文本 | varchar(255) | 否 |  |
| `adjust_account` | 调整科目 | 短文本 | varchar(255) | 否 |  |
| `warehouse_name` | 仓库名称 | 短文本 | varchar(255) | 否 |  |
| `warehouse_id` | 仓库ID | 整数 | int | 否 |  |
| `order_date` | 单据日期 | 日期时间 | datetime | 否 |  |
| `order_no` | 单号 | 短文本 | varchar(255) | 否 |  |
| `id` | 唯一标识 | 整数 | int | 是 | 唯一标识 |
| `creator` | 创建人 | 短文本 | varchar(255) | 是 | 创建人姓名 |
| `created_at` | 创建时间 | 日期时间 | timestamp | 是 | 创建时间 |
| `updater` | 更新人 | 短文本 | varchar(255) | 是 | 更新人姓名 |
| `updated_at` | 更新时间 | 日期时间 | timestamp | 是 | 更新时间 |
| `is_deleted` | 是否删除 | 布尔 | tinyint | 是 | 是否已删除 |
| `deleted_at` | 删除时间 | 日期时间 | timestamp | 是 | 删除时间 |

### 方法列表 (SQL 0 + GUI 8)

| # | 方法名称 | methodKey | 类型 | SQL操作 | 入参 |
|---|---------|-----------|------|--------|------|
| 1 | 列表查询 | `FUQ56UBDHj` | GUI | `SELECT` | 25 +分页排序 |
| 2 | 新增 | `FUaAS7yYvZ` | GUI | `INSERT` | 14 |
| 3 | 编辑 | `FU6H93URI8` | GUI | `UPDATE` | 15 |
| 4 | 查看详情 | `FUefEHSt2t` | GUI | `SELECT` | 1 |
| 5 | 删除 | `FUlNcPIkiO` | GUI | `UPDATE` | 1 |
| 6 | 批量删除 | `FUmjgz0Nhc` | GUI | `UPDATE` | 1 |
| 7 | 批量导出 | `FUOScIIzUX` | GUI | `SELECT` | 25 +分页排序 |
| 8 | 批量导入 | `FU61w84DwD` | GUI | `BATCH_INSERT` | 0 |

### 方法详情

#### 1. 列表查询

- **methodKey**: `FUQ56UBDHj`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MO5WOkA9SX&methodKey=FUQ56UBDHj`

**请求 Body**:

```json
{
  "adjust_account": "<string>",
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_date_end": "<string>",
  "order_date_start": "<string>",
  "order_no": "<string>",
  "pageSize": "<integer>",
  "remark": "<string>",
  "status": "<string>",
  "total_actual_quantity": "<integer>",
  "total_book_quantity": "<integer>",
  "total_profit_amount": "<integer>",
  "total_profit_quantity": "<integer>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "voucher_no": "<string>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `adjust_account` | string | 否 | 调整科目 |
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_date_end` | string | 否 | 单据日期 结束 |
| `order_date_start` | string | 否 | 单据日期 起始 |
| `order_no` | string | 否 | 单号 |
| `pageSize` | integer | 否 | 每页条数 |
| `remark` | string | 否 | 备注 |
| `status` | string | 否 | 状态 |
| `total_actual_quantity` | integer | 否 | 实盘总数量 |
| `total_book_quantity` | integer | 否 | 账面总数量 |
| `total_profit_amount` | integer | 否 | 盈亏总金额 |
| `total_profit_quantity` | integer | 否 | 盈亏总数量 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `voucher_no` | string | 否 | 凭证号 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 2. 新增

- **methodKey**: `FUaAS7yYvZ`
- **类型**: GUI
- **SQL操作**: `INSERT`

**Query**: `?appTag=prd&modelKey=MO5WOkA9SX&methodKey=FUaAS7yYvZ`

**请求 Body**:

```json
{
  "adjust_account": "<string>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_date": "<string>",
  "order_no": "<string>",
  "remark": "<string>",
  "status": "<string>",
  "total_actual_quantity": "<integer>",
  "total_book_quantity": "<integer>",
  "total_profit_amount": "<integer>",
  "total_profit_quantity": "<integer>",
  "voucher_no": "<string>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `adjust_account` | string | 否 | 调整科目 |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_date` | string | 否 | 单据日期 |
| `order_no` | string | 否 | 单号 |
| `remark` | string | 否 | 备注 |
| `status` | string | 否 | 状态 |
| `total_actual_quantity` | integer | 否 | 实盘总数量 |
| `total_book_quantity` | integer | 否 | 账面总数量 |
| `total_profit_amount` | integer | 否 | 盈亏总金额 |
| `total_profit_quantity` | integer | 否 | 盈亏总数量 |
| `voucher_no` | string | 否 | 凭证号 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |

---

#### 3. 编辑

- **methodKey**: `FU6H93URI8`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MO5WOkA9SX&methodKey=FU6H93URI8`

**请求 Body**:

```json
{
  "adjust_account": "<string>",
  "id": "<integer>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_date": "<string>",
  "order_no": "<string>",
  "remark": "<string>",
  "status": "<string>",
  "total_actual_quantity": "<integer>",
  "total_book_quantity": "<integer>",
  "total_profit_amount": "<integer>",
  "total_profit_quantity": "<integer>",
  "voucher_no": "<string>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `adjust_account` | string | 否 | 调整科目 |
| `id` | integer | 否 | 记录ID |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_date` | string | 否 | 单据日期 |
| `order_no` | string | 否 | 单号 |
| `remark` | string | 否 | 备注 |
| `status` | string | 否 | 状态 |
| `total_actual_quantity` | integer | 否 | 实盘总数量 |
| `total_book_quantity` | integer | 否 | 账面总数量 |
| `total_profit_amount` | integer | 否 | 盈亏总金额 |
| `total_profit_quantity` | integer | 否 | 盈亏总数量 |
| `voucher_no` | string | 否 | 凭证号 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |

---

#### 4. 查看详情

- **methodKey**: `FUefEHSt2t`
- **类型**: GUI
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MO5WOkA9SX&methodKey=FUefEHSt2t`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 5. 删除

- **methodKey**: `FUlNcPIkiO`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MO5WOkA9SX&methodKey=FUlNcPIkiO`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 6. 批量删除

- **methodKey**: `FUmjgz0Nhc`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MO5WOkA9SX&methodKey=FUmjgz0Nhc`

**请求 Body**:

```json
{
  "ids": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `ids` | string | 否 | ID列表(逗号分隔) |

---

#### 7. 批量导出

- **methodKey**: `FUOScIIzUX`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MO5WOkA9SX&methodKey=FUOScIIzUX`

**请求 Body**:

```json
{
  "adjust_account": "<string>",
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_date_end": "<string>",
  "order_date_start": "<string>",
  "order_no": "<string>",
  "pageSize": "<integer>",
  "remark": "<string>",
  "status": "<string>",
  "total_actual_quantity": "<integer>",
  "total_book_quantity": "<integer>",
  "total_profit_amount": "<integer>",
  "total_profit_quantity": "<integer>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "voucher_no": "<string>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `adjust_account` | string | 否 | 调整科目 |
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_date_end` | string | 否 | 单据日期 结束 |
| `order_date_start` | string | 否 | 单据日期 起始 |
| `order_no` | string | 否 | 单号 |
| `pageSize` | integer | 否 | 每页条数 |
| `remark` | string | 否 | 备注 |
| `status` | string | 否 | 状态 |
| `total_actual_quantity` | integer | 否 | 实盘总数量 |
| `total_book_quantity` | integer | 否 | 账面总数量 |
| `total_profit_amount` | integer | 否 | 盈亏总金额 |
| `total_profit_quantity` | integer | 否 | 盈亏总数量 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `voucher_no` | string | 否 | 凭证号 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 8. 批量导入

- **methodKey**: `FU61w84DwD`
- **类型**: GUI
- **SQL操作**: `BATCH_INSERT`

**Query**: `?appTag=prd&modelKey=MO5WOkA9SX&methodKey=FU61w84DwD`

**请求 Body**:

```json
{}
```

---

## 调拨单明细表 {#moore8j0dl}

| 属性 | 值 |
|------|-----|
| modelKey | `MOORe8J0Dl` |
| modelNameEn | `transfer_item` |
| tableName | `transfer_item` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 说明 |
|---------|---------|---------|-----------|------|------|
| `remark` | 备注 | 短文本 | varchar(255) | 否 |  |
| `sn_codes` | SN码列表 | 长文本 | varchar(1024) | 否 |  |
| `sn_count` | SN码数量 | 整数 | int | 否 |  |
| `amount` | 金额 | 小数 | decimal | 否 |  |
| `price` | 单价 | 小数 | decimal | 否 |  |
| `quantity` | 数量 | 整数 | int | 否 |  |
| `unit` | 单位 | 短文本 | varchar(255) | 否 |  |
| `product_code` | 商品编码 | 短文本 | varchar(255) | 否 |  |
| `product_name` | 商品名称 | 短文本 | varchar(255) | 否 |  |
| `product_id` | 商品ID | 整数 | int | 否 |  |
| `order_no` | 单号 | 短文本 | varchar(255) | 否 |  |
| `order_id` | 主表ID | 整数 | int | 否 |  |
| `id` | 唯一标识 | 整数 | int | 是 | 唯一标识 |
| `creator` | 创建人 | 短文本 | varchar(255) | 是 | 创建人姓名 |
| `created_at` | 创建时间 | 日期时间 | timestamp | 是 | 创建时间 |
| `updater` | 更新人 | 短文本 | varchar(255) | 是 | 更新人姓名 |
| `updated_at` | 更新时间 | 日期时间 | timestamp | 是 | 更新时间 |
| `is_deleted` | 是否删除 | 布尔 | tinyint | 是 | 是否已删除 |
| `deleted_at` | 删除时间 | 日期时间 | timestamp | 是 | 删除时间 |

### 方法列表 (SQL 0 + GUI 8)

| # | 方法名称 | methodKey | 类型 | SQL操作 | 入参 |
|---|---------|-----------|------|--------|------|
| 1 | 列表查询 | `FU7HVtbbuq` | GUI | `SELECT` | 22 +分页排序 |
| 2 | 新增 | `FU0OPw5rsy` | GUI | `INSERT` | 12 |
| 3 | 编辑 | `FU2apUUpTE` | GUI | `UPDATE` | 13 |
| 4 | 查看详情 | `FUSEEGDgYd` | GUI | `SELECT` | 1 |
| 5 | 删除 | `FURjMexO9w` | GUI | `UPDATE` | 1 |
| 6 | 批量删除 | `FUMWrdtwSb` | GUI | `UPDATE` | 1 |
| 7 | 批量导出 | `FUdpY1IH5R` | GUI | `SELECT` | 22 +分页排序 |
| 8 | 批量导入 | `FU0uBYXqm9` | GUI | `BATCH_INSERT` | 0 |

### 方法详情

#### 1. 列表查询

- **methodKey**: `FU7HVtbbuq`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOORe8J0Dl&methodKey=FU7HVtbbuq`

**请求 Body**:

```json
{
  "amount": "<integer>",
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "order_id": "<integer>",
  "order_no": "<string>",
  "pageSize": "<integer>",
  "price": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "quantity": "<integer>",
  "remark": "<string>",
  "sn_codes": "<string>",
  "sn_count": "<integer>",
  "unit": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `amount` | integer | 否 | 金额 |
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `order_id` | integer | 否 | 主表ID |
| `order_no` | string | 否 | 单号 |
| `pageSize` | integer | 否 | 每页条数 |
| `price` | integer | 否 | 单价 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `quantity` | integer | 否 | 数量 |
| `remark` | string | 否 | 备注 |
| `sn_codes` | string | 否 | SN码列表 |
| `sn_count` | integer | 否 | SN码数量 |
| `unit` | string | 否 | 单位 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 2. 新增

- **methodKey**: `FU0OPw5rsy`
- **类型**: GUI
- **SQL操作**: `INSERT`

**Query**: `?appTag=prd&modelKey=MOORe8J0Dl&methodKey=FU0OPw5rsy`

**请求 Body**:

```json
{
  "amount": "<integer>",
  "order_id": "<integer>",
  "order_no": "<string>",
  "price": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "quantity": "<integer>",
  "remark": "<string>",
  "sn_codes": "<string>",
  "sn_count": "<integer>",
  "unit": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `amount` | integer | 否 | 金额 |
| `order_id` | integer | 否 | 主表ID |
| `order_no` | string | 否 | 单号 |
| `price` | integer | 否 | 单价 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `quantity` | integer | 否 | 数量 |
| `remark` | string | 否 | 备注 |
| `sn_codes` | string | 否 | SN码列表 |
| `sn_count` | integer | 否 | SN码数量 |
| `unit` | string | 否 | 单位 |

---

#### 3. 编辑

- **methodKey**: `FU2apUUpTE`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOORe8J0Dl&methodKey=FU2apUUpTE`

**请求 Body**:

```json
{
  "amount": "<integer>",
  "id": "<integer>",
  "order_id": "<integer>",
  "order_no": "<string>",
  "price": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "quantity": "<integer>",
  "remark": "<string>",
  "sn_codes": "<string>",
  "sn_count": "<integer>",
  "unit": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `amount` | integer | 否 | 金额 |
| `id` | integer | 否 | 记录ID |
| `order_id` | integer | 否 | 主表ID |
| `order_no` | string | 否 | 单号 |
| `price` | integer | 否 | 单价 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `quantity` | integer | 否 | 数量 |
| `remark` | string | 否 | 备注 |
| `sn_codes` | string | 否 | SN码列表 |
| `sn_count` | integer | 否 | SN码数量 |
| `unit` | string | 否 | 单位 |

---

#### 4. 查看详情

- **methodKey**: `FUSEEGDgYd`
- **类型**: GUI
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MOORe8J0Dl&methodKey=FUSEEGDgYd`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 5. 删除

- **methodKey**: `FURjMexO9w`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOORe8J0Dl&methodKey=FURjMexO9w`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 6. 批量删除

- **methodKey**: `FUMWrdtwSb`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOORe8J0Dl&methodKey=FUMWrdtwSb`

**请求 Body**:

```json
{
  "ids": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `ids` | string | 否 | ID列表(逗号分隔) |

---

#### 7. 批量导出

- **methodKey**: `FUdpY1IH5R`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOORe8J0Dl&methodKey=FUdpY1IH5R`

**请求 Body**:

```json
{
  "amount": "<integer>",
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "order_id": "<integer>",
  "order_no": "<string>",
  "pageSize": "<integer>",
  "price": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "quantity": "<integer>",
  "remark": "<string>",
  "sn_codes": "<string>",
  "sn_count": "<integer>",
  "unit": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `amount` | integer | 否 | 金额 |
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `order_id` | integer | 否 | 主表ID |
| `order_no` | string | 否 | 单号 |
| `pageSize` | integer | 否 | 每页条数 |
| `price` | integer | 否 | 单价 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `quantity` | integer | 否 | 数量 |
| `remark` | string | 否 | 备注 |
| `sn_codes` | string | 否 | SN码列表 |
| `sn_count` | integer | 否 | SN码数量 |
| `unit` | string | 否 | 单位 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 8. 批量导入

- **methodKey**: `FU0uBYXqm9`
- **类型**: GUI
- **SQL操作**: `BATCH_INSERT`

**Query**: `?appTag=prd&modelKey=MOORe8J0Dl&methodKey=FU0uBYXqm9`

**请求 Body**:

```json
{}
```

---

## 调拨单主表 {#moirlrmifh}

| 属性 | 值 |
|------|-----|
| modelKey | `MOIrlRmiFH` |
| modelNameEn | `transfer_order` |
| tableName | `transfer_order` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 说明 |
|---------|---------|---------|-----------|------|------|
| `operator_name` | 操作人名称 | 短文本 | varchar(255) | 否 |  |
| `operator_id` | 操作人ID | 短文本 | varchar(255) | 否 |  |
| `remark` | 备注 | 长文本 | varchar(1024) | 否 |  |
| `status` | 状态 | 短文本 | varchar(255) | 否 |  |
| `total_amount` | 总金额 | 小数 | decimal | 否 |  |
| `total_quantity` | 总数量 | 整数 | int | 否 |  |
| `in_warehouse_name` | 调入仓库名称 | 短文本 | varchar(255) | 否 |  |
| `in_warehouse_id` | 调入仓库ID | 整数 | int | 否 |  |
| `out_warehouse_name` | 调出仓库名称 | 短文本 | varchar(255) | 否 |  |
| `out_warehouse_id` | 调出仓库ID | 整数 | int | 否 |  |
| `order_date` | 单据日期 | 日期时间 | datetime | 否 |  |
| `order_no` | 单号 | 短文本 | varchar(255) | 否 |  |
| `id` | 唯一标识 | 整数 | int | 是 | 唯一标识 |
| `creator` | 创建人 | 短文本 | varchar(255) | 是 | 创建人姓名 |
| `created_at` | 创建时间 | 日期时间 | timestamp | 是 | 创建时间 |
| `updater` | 更新人 | 短文本 | varchar(255) | 是 | 更新人姓名 |
| `updated_at` | 更新时间 | 日期时间 | timestamp | 是 | 更新时间 |
| `is_deleted` | 是否删除 | 布尔 | tinyint | 是 | 是否已删除 |
| `deleted_at` | 删除时间 | 日期时间 | timestamp | 是 | 删除时间 |

### 方法列表 (SQL 0 + GUI 8)

| # | 方法名称 | methodKey | 类型 | SQL操作 | 入参 |
|---|---------|-----------|------|--------|------|
| 1 | 列表查询 | `FUW5FAbNha` | GUI | `SELECT` | 23 +分页排序 |
| 2 | 新增 | `FUDC3wl6P8` | GUI | `INSERT` | 12 |
| 3 | 编辑 | `FUhakKYGcF` | GUI | `UPDATE` | 13 |
| 4 | 查看详情 | `FU6Xezd5Pb` | GUI | `SELECT` | 1 |
| 5 | 删除 | `FUWPKGnSWG` | GUI | `UPDATE` | 1 |
| 6 | 批量删除 | `FU3tKvMjiB` | GUI | `UPDATE` | 1 |
| 7 | 批量导出 | `FUgNmAK4ZF` | GUI | `SELECT` | 23 +分页排序 |
| 8 | 批量导入 | `FUQdkyhrvX` | GUI | `BATCH_INSERT` | 0 |

### 方法详情

#### 1. 列表查询

- **methodKey**: `FUW5FAbNha`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOIrlRmiFH&methodKey=FUW5FAbNha`

**请求 Body**:

```json
{
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "in_warehouse_id": "<integer>",
  "in_warehouse_name": "<string>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_date_end": "<string>",
  "order_date_start": "<string>",
  "order_no": "<string>",
  "out_warehouse_id": "<integer>",
  "out_warehouse_name": "<string>",
  "pageSize": "<integer>",
  "remark": "<string>",
  "status": "<string>",
  "total_amount": "<integer>",
  "total_quantity": "<integer>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `in_warehouse_id` | integer | 否 | 调入仓库ID |
| `in_warehouse_name` | string | 否 | 调入仓库名称 |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_date_end` | string | 否 | 单据日期 结束 |
| `order_date_start` | string | 否 | 单据日期 起始 |
| `order_no` | string | 否 | 单号 |
| `out_warehouse_id` | integer | 否 | 调出仓库ID |
| `out_warehouse_name` | string | 否 | 调出仓库名称 |
| `pageSize` | integer | 否 | 每页条数 |
| `remark` | string | 否 | 备注 |
| `status` | string | 否 | 状态 |
| `total_amount` | integer | 否 | 总金额 |
| `total_quantity` | integer | 否 | 总数量 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 2. 新增

- **methodKey**: `FUDC3wl6P8`
- **类型**: GUI
- **SQL操作**: `INSERT`

**Query**: `?appTag=prd&modelKey=MOIrlRmiFH&methodKey=FUDC3wl6P8`

**请求 Body**:

```json
{
  "in_warehouse_id": "<integer>",
  "in_warehouse_name": "<string>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_date": "<string>",
  "order_no": "<string>",
  "out_warehouse_id": "<integer>",
  "out_warehouse_name": "<string>",
  "remark": "<string>",
  "status": "<string>",
  "total_amount": "<integer>",
  "total_quantity": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `in_warehouse_id` | integer | 否 | 调入仓库ID |
| `in_warehouse_name` | string | 否 | 调入仓库名称 |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_date` | string | 否 | 单据日期 |
| `order_no` | string | 否 | 单号 |
| `out_warehouse_id` | integer | 否 | 调出仓库ID |
| `out_warehouse_name` | string | 否 | 调出仓库名称 |
| `remark` | string | 否 | 备注 |
| `status` | string | 否 | 状态 |
| `total_amount` | integer | 否 | 总金额 |
| `total_quantity` | integer | 否 | 总数量 |

---

#### 3. 编辑

- **methodKey**: `FUhakKYGcF`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOIrlRmiFH&methodKey=FUhakKYGcF`

**请求 Body**:

```json
{
  "id": "<integer>",
  "in_warehouse_id": "<integer>",
  "in_warehouse_name": "<string>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_date": "<string>",
  "order_no": "<string>",
  "out_warehouse_id": "<integer>",
  "out_warehouse_name": "<string>",
  "remark": "<string>",
  "status": "<string>",
  "total_amount": "<integer>",
  "total_quantity": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |
| `in_warehouse_id` | integer | 否 | 调入仓库ID |
| `in_warehouse_name` | string | 否 | 调入仓库名称 |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_date` | string | 否 | 单据日期 |
| `order_no` | string | 否 | 单号 |
| `out_warehouse_id` | integer | 否 | 调出仓库ID |
| `out_warehouse_name` | string | 否 | 调出仓库名称 |
| `remark` | string | 否 | 备注 |
| `status` | string | 否 | 状态 |
| `total_amount` | integer | 否 | 总金额 |
| `total_quantity` | integer | 否 | 总数量 |

---

#### 4. 查看详情

- **methodKey**: `FU6Xezd5Pb`
- **类型**: GUI
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MOIrlRmiFH&methodKey=FU6Xezd5Pb`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 5. 删除

- **methodKey**: `FUWPKGnSWG`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOIrlRmiFH&methodKey=FUWPKGnSWG`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 6. 批量删除

- **methodKey**: `FU3tKvMjiB`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOIrlRmiFH&methodKey=FU3tKvMjiB`

**请求 Body**:

```json
{
  "ids": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `ids` | string | 否 | ID列表(逗号分隔) |

---

#### 7. 批量导出

- **methodKey**: `FUgNmAK4ZF`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOIrlRmiFH&methodKey=FUgNmAK4ZF`

**请求 Body**:

```json
{
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "in_warehouse_id": "<integer>",
  "in_warehouse_name": "<string>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_date_end": "<string>",
  "order_date_start": "<string>",
  "order_no": "<string>",
  "out_warehouse_id": "<integer>",
  "out_warehouse_name": "<string>",
  "pageSize": "<integer>",
  "remark": "<string>",
  "status": "<string>",
  "total_amount": "<integer>",
  "total_quantity": "<integer>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `in_warehouse_id` | integer | 否 | 调入仓库ID |
| `in_warehouse_name` | string | 否 | 调入仓库名称 |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_date_end` | string | 否 | 单据日期 结束 |
| `order_date_start` | string | 否 | 单据日期 起始 |
| `order_no` | string | 否 | 单号 |
| `out_warehouse_id` | integer | 否 | 调出仓库ID |
| `out_warehouse_name` | string | 否 | 调出仓库名称 |
| `pageSize` | integer | 否 | 每页条数 |
| `remark` | string | 否 | 备注 |
| `status` | string | 否 | 状态 |
| `total_amount` | integer | 否 | 总金额 |
| `total_quantity` | integer | 否 | 总数量 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 8. 批量导入

- **methodKey**: `FUQdkyhrvX`
- **类型**: GUI
- **SQL操作**: `BATCH_INSERT`

**Query**: `?appTag=prd&modelKey=MOIrlRmiFH&methodKey=FUQdkyhrvX`

**请求 Body**:

```json
{}
```

---

## 销售退货单明细表 {#mohwxl5rmk}

| 属性 | 值 |
|------|-----|
| modelKey | `MOHwXl5rMK` |
| modelNameEn | `sa_re_item` |
| tableName | `sa_re_item` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 说明 |
|---------|---------|---------|-----------|------|------|
| `remark` | 备注 | 长文本 | varchar(1024) | 否 |  |
| `sn_codes` | SN码列表 | 长文本 | varchar(1024) | 否 |  |
| `sn_count` | SN码数量 | 整数 | int | 否 |  |
| `amount` | 金额 | 小数 | decimal | 否 |  |
| `price` | 单价 | 小数 | decimal | 否 |  |
| `quantity` | 数量 | 整数 | int | 否 |  |
| `unit` | 单位 | 短文本 | varchar(255) | 否 |  |
| `product_code` | 商品编码 | 短文本 | varchar(255) | 否 |  |
| `product_name` | 商品名称 | 短文本 | varchar(255) | 否 |  |
| `product_id` | 商品ID | 整数 | int | 否 |  |
| `order_no` | 单号 | 短文本 | varchar(255) | 否 |  |
| `order_id` | 主表ID | 整数 | int | 否 |  |
| `id` | 唯一标识 | 整数 | int | 是 | 唯一标识 |
| `creator` | 创建人 | 短文本 | varchar(255) | 是 | 创建人姓名 |
| `created_at` | 创建时间 | 日期时间 | timestamp | 是 | 创建时间 |
| `updater` | 更新人 | 短文本 | varchar(255) | 是 | 更新人姓名 |
| `updated_at` | 更新时间 | 日期时间 | timestamp | 是 | 更新时间 |
| `is_deleted` | 是否删除 | 布尔 | tinyint | 是 | 是否已删除 |
| `deleted_at` | 删除时间 | 日期时间 | timestamp | 是 | 删除时间 |

### 方法列表 (SQL 0 + GUI 8)

| # | 方法名称 | methodKey | 类型 | SQL操作 | 入参 |
|---|---------|-----------|------|--------|------|
| 1 | 列表查询 | `FUsSZubXQP` | GUI | `SELECT` | 22 +分页排序 |
| 2 | 新增 | `FUPWcYQRZH` | GUI | `INSERT` | 12 |
| 3 | 编辑 | `FUXFdIKzWu` | GUI | `UPDATE` | 13 |
| 4 | 查看详情 | `FUNV5MqtFR` | GUI | `SELECT` | 1 |
| 5 | 删除 | `FUJILPWTi7` | GUI | `UPDATE` | 1 |
| 6 | 批量删除 | `FU3OO09WcA` | GUI | `UPDATE` | 1 |
| 7 | 批量导出 | `FU9F9JVVvI` | GUI | `SELECT` | 22 +分页排序 |
| 8 | 批量导入 | `FUEBb02ZQJ` | GUI | `BATCH_INSERT` | 0 |

### 方法详情

#### 1. 列表查询

- **methodKey**: `FUsSZubXQP`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOHwXl5rMK&methodKey=FUsSZubXQP`

**请求 Body**:

```json
{
  "amount": "<integer>",
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "order_id": "<integer>",
  "order_no": "<string>",
  "pageSize": "<integer>",
  "price": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "quantity": "<integer>",
  "remark": "<string>",
  "sn_codes": "<string>",
  "sn_count": "<integer>",
  "unit": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `amount` | integer | 否 | 金额 |
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `order_id` | integer | 否 | 主表ID |
| `order_no` | string | 否 | 单号 |
| `pageSize` | integer | 否 | 每页条数 |
| `price` | integer | 否 | 单价 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `quantity` | integer | 否 | 数量 |
| `remark` | string | 否 | 备注 |
| `sn_codes` | string | 否 | SN码列表 |
| `sn_count` | integer | 否 | SN码数量 |
| `unit` | string | 否 | 单位 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 2. 新增

- **methodKey**: `FUPWcYQRZH`
- **类型**: GUI
- **SQL操作**: `INSERT`

**Query**: `?appTag=prd&modelKey=MOHwXl5rMK&methodKey=FUPWcYQRZH`

**请求 Body**:

```json
{
  "amount": "<integer>",
  "order_id": "<integer>",
  "order_no": "<string>",
  "price": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "quantity": "<integer>",
  "remark": "<string>",
  "sn_codes": "<string>",
  "sn_count": "<integer>",
  "unit": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `amount` | integer | 否 | 金额 |
| `order_id` | integer | 否 | 主表ID |
| `order_no` | string | 否 | 单号 |
| `price` | integer | 否 | 单价 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `quantity` | integer | 否 | 数量 |
| `remark` | string | 否 | 备注 |
| `sn_codes` | string | 否 | SN码列表 |
| `sn_count` | integer | 否 | SN码数量 |
| `unit` | string | 否 | 单位 |

---

#### 3. 编辑

- **methodKey**: `FUXFdIKzWu`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOHwXl5rMK&methodKey=FUXFdIKzWu`

**请求 Body**:

```json
{
  "amount": "<integer>",
  "id": "<integer>",
  "order_id": "<integer>",
  "order_no": "<string>",
  "price": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "quantity": "<integer>",
  "remark": "<string>",
  "sn_codes": "<string>",
  "sn_count": "<integer>",
  "unit": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `amount` | integer | 否 | 金额 |
| `id` | integer | 否 | 记录ID |
| `order_id` | integer | 否 | 主表ID |
| `order_no` | string | 否 | 单号 |
| `price` | integer | 否 | 单价 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `quantity` | integer | 否 | 数量 |
| `remark` | string | 否 | 备注 |
| `sn_codes` | string | 否 | SN码列表 |
| `sn_count` | integer | 否 | SN码数量 |
| `unit` | string | 否 | 单位 |

---

#### 4. 查看详情

- **methodKey**: `FUNV5MqtFR`
- **类型**: GUI
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MOHwXl5rMK&methodKey=FUNV5MqtFR`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 5. 删除

- **methodKey**: `FUJILPWTi7`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOHwXl5rMK&methodKey=FUJILPWTi7`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 6. 批量删除

- **methodKey**: `FU3OO09WcA`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOHwXl5rMK&methodKey=FU3OO09WcA`

**请求 Body**:

```json
{
  "ids": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `ids` | string | 否 | ID列表(逗号分隔) |

---

#### 7. 批量导出

- **methodKey**: `FU9F9JVVvI`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOHwXl5rMK&methodKey=FU9F9JVVvI`

**请求 Body**:

```json
{
  "amount": "<integer>",
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "order_id": "<integer>",
  "order_no": "<string>",
  "pageSize": "<integer>",
  "price": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "quantity": "<integer>",
  "remark": "<string>",
  "sn_codes": "<string>",
  "sn_count": "<integer>",
  "unit": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `amount` | integer | 否 | 金额 |
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `order_id` | integer | 否 | 主表ID |
| `order_no` | string | 否 | 单号 |
| `pageSize` | integer | 否 | 每页条数 |
| `price` | integer | 否 | 单价 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `quantity` | integer | 否 | 数量 |
| `remark` | string | 否 | 备注 |
| `sn_codes` | string | 否 | SN码列表 |
| `sn_count` | integer | 否 | SN码数量 |
| `unit` | string | 否 | 单位 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 8. 批量导入

- **methodKey**: `FUEBb02ZQJ`
- **类型**: GUI
- **SQL操作**: `BATCH_INSERT`

**Query**: `?appTag=prd&modelKey=MOHwXl5rMK&methodKey=FUEBb02ZQJ`

**请求 Body**:

```json
{}
```

---

## 销售退货单主表 {#moky0pcw6w}

| 属性 | 值 |
|------|-----|
| modelKey | `MOky0Pcw6W` |
| modelNameEn | `sa_re_ord` |
| tableName | `sa_re_ord` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 说明 |
|---------|---------|---------|-----------|------|------|
| `operator_name` | 操作人名称 | 短文本 | varchar(255) | 否 |  |
| `operator_id` | 操作人ID | 短文本 | varchar(255) | 否 |  |
| `remark` | 备注 | 长文本 | varchar(1024) | 否 |  |
| `status` | 状态 | 短文本 | varchar(255) | 否 |  |
| `total_amount` | 总金额 | 小数 | decimal | 否 |  |
| `source_order_no` | 原出库单号 | 短文本 | varchar(255) | 否 |  |
| `warehouse_name` | 仓库名称 | 短文本 | varchar(255) | 否 |  |
| `warehouse_id` | 仓库ID | 整数 | int | 否 |  |
| `customer_name` | 客户名称 | 短文本 | varchar(255) | 否 |  |
| `customer_id` | 客户ID | 整数 | int | 否 |  |
| `order_date` | 单据日期 | 日期时间 | datetime | 否 |  |
| `order_no` | 单号 | 短文本 | varchar(255) | 否 |  |
| `id` | 唯一标识 | 整数 | int | 是 | 唯一标识 |
| `creator` | 创建人 | 短文本 | varchar(255) | 是 | 创建人姓名 |
| `created_at` | 创建时间 | 日期时间 | timestamp | 是 | 创建时间 |
| `updater` | 更新人 | 短文本 | varchar(255) | 是 | 更新人姓名 |
| `updated_at` | 更新时间 | 日期时间 | timestamp | 是 | 更新时间 |
| `is_deleted` | 是否删除 | 布尔 | tinyint | 是 | 是否已删除 |
| `deleted_at` | 删除时间 | 日期时间 | timestamp | 是 | 删除时间 |

### 方法列表 (SQL 0 + GUI 8)

| # | 方法名称 | methodKey | 类型 | SQL操作 | 入参 |
|---|---------|-----------|------|--------|------|
| 1 | 列表查询 | `FUQI57ueUm` | GUI | `SELECT` | 23 +分页排序 |
| 2 | 新增 | `FUg7l9v2dQ` | GUI | `INSERT` | 12 |
| 3 | 编辑 | `FUXY7dYmUj` | GUI | `UPDATE` | 13 |
| 4 | 查看详情 | `FU1gan9X1c` | GUI | `SELECT` | 1 |
| 5 | 删除 | `FUX4qpKVVC` | GUI | `UPDATE` | 1 |
| 6 | 批量删除 | `FUrGq8jTi7` | GUI | `UPDATE` | 1 |
| 7 | 批量导出 | `FUAj4U6Jv5` | GUI | `SELECT` | 23 +分页排序 |
| 8 | 批量导入 | `FU8uzCdJzp` | GUI | `BATCH_INSERT` | 0 |

### 方法详情

#### 1. 列表查询

- **methodKey**: `FUQI57ueUm`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOky0Pcw6W&methodKey=FUQI57ueUm`

**请求 Body**:

```json
{
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "customer_id": "<integer>",
  "customer_name": "<string>",
  "id": "<integer>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_date_end": "<string>",
  "order_date_start": "<string>",
  "order_no": "<string>",
  "pageSize": "<integer>",
  "remark": "<string>",
  "source_order_no": "<string>",
  "status": "<string>",
  "total_amount": "<integer>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `customer_id` | integer | 否 | 客户ID |
| `customer_name` | string | 否 | 客户名称 |
| `id` | integer | 否 | 记录ID |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_date_end` | string | 否 | 单据日期 结束 |
| `order_date_start` | string | 否 | 单据日期 起始 |
| `order_no` | string | 否 | 单号 |
| `pageSize` | integer | 否 | 每页条数 |
| `remark` | string | 否 | 备注 |
| `source_order_no` | string | 否 | 原出库单号 |
| `status` | string | 否 | 状态 |
| `total_amount` | integer | 否 | 总金额 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 2. 新增

- **methodKey**: `FUg7l9v2dQ`
- **类型**: GUI
- **SQL操作**: `INSERT`

**Query**: `?appTag=prd&modelKey=MOky0Pcw6W&methodKey=FUg7l9v2dQ`

**请求 Body**:

```json
{
  "customer_id": "<integer>",
  "customer_name": "<string>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_date": "<string>",
  "order_no": "<string>",
  "remark": "<string>",
  "source_order_no": "<string>",
  "status": "<string>",
  "total_amount": "<integer>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `customer_id` | integer | 否 | 客户ID |
| `customer_name` | string | 否 | 客户名称 |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_date` | string | 否 | 单据日期 |
| `order_no` | string | 否 | 单号 |
| `remark` | string | 否 | 备注 |
| `source_order_no` | string | 否 | 原出库单号 |
| `status` | string | 否 | 状态 |
| `total_amount` | integer | 否 | 总金额 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |

---

#### 3. 编辑

- **methodKey**: `FUXY7dYmUj`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOky0Pcw6W&methodKey=FUXY7dYmUj`

**请求 Body**:

```json
{
  "customer_id": "<integer>",
  "customer_name": "<string>",
  "id": "<integer>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_date": "<string>",
  "order_no": "<string>",
  "remark": "<string>",
  "source_order_no": "<string>",
  "status": "<string>",
  "total_amount": "<integer>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `customer_id` | integer | 否 | 客户ID |
| `customer_name` | string | 否 | 客户名称 |
| `id` | integer | 否 | 记录ID |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_date` | string | 否 | 单据日期 |
| `order_no` | string | 否 | 单号 |
| `remark` | string | 否 | 备注 |
| `source_order_no` | string | 否 | 原出库单号 |
| `status` | string | 否 | 状态 |
| `total_amount` | integer | 否 | 总金额 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |

---

#### 4. 查看详情

- **methodKey**: `FU1gan9X1c`
- **类型**: GUI
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MOky0Pcw6W&methodKey=FU1gan9X1c`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 5. 删除

- **methodKey**: `FUX4qpKVVC`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOky0Pcw6W&methodKey=FUX4qpKVVC`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 6. 批量删除

- **methodKey**: `FUrGq8jTi7`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOky0Pcw6W&methodKey=FUrGq8jTi7`

**请求 Body**:

```json
{
  "ids": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `ids` | string | 否 | ID列表(逗号分隔) |

---

#### 7. 批量导出

- **methodKey**: `FUAj4U6Jv5`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOky0Pcw6W&methodKey=FUAj4U6Jv5`

**请求 Body**:

```json
{
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "customer_id": "<integer>",
  "customer_name": "<string>",
  "id": "<integer>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_date_end": "<string>",
  "order_date_start": "<string>",
  "order_no": "<string>",
  "pageSize": "<integer>",
  "remark": "<string>",
  "source_order_no": "<string>",
  "status": "<string>",
  "total_amount": "<integer>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `customer_id` | integer | 否 | 客户ID |
| `customer_name` | string | 否 | 客户名称 |
| `id` | integer | 否 | 记录ID |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_date_end` | string | 否 | 单据日期 结束 |
| `order_date_start` | string | 否 | 单据日期 起始 |
| `order_no` | string | 否 | 单号 |
| `pageSize` | integer | 否 | 每页条数 |
| `remark` | string | 否 | 备注 |
| `source_order_no` | string | 否 | 原出库单号 |
| `status` | string | 否 | 状态 |
| `total_amount` | integer | 否 | 总金额 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 8. 批量导入

- **methodKey**: `FU8uzCdJzp`
- **类型**: GUI
- **SQL操作**: `BATCH_INSERT`

**Query**: `?appTag=prd&modelKey=MOky0Pcw6W&methodKey=FU8uzCdJzp`

**请求 Body**:

```json
{}
```

---

## 采购退货单明细表 {#mokm8p1d1b}

| 属性 | 值 |
|------|-----|
| modelKey | `MOkM8P1d1B` |
| modelNameEn | `pur_re_item` |
| tableName | `pur_re_item` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 说明 |
|---------|---------|---------|-----------|------|------|
| `remark` | 备注 | 短文本 | varchar(255) | 否 |  |
| `sn_codes` | SN码列表 | 长文本 | varchar(1024) | 否 |  |
| `sn_count` | SN码数量 | 整数 | int | 否 |  |
| `amount` | 金额 | 小数 | decimal | 否 |  |
| `price` | 单价 | 小数 | decimal | 否 |  |
| `quantity` | 数量 | 整数 | int | 否 |  |
| `unit` | 单位 | 短文本 | varchar(255) | 否 |  |
| `product_code` | 商品编码 | 短文本 | varchar(255) | 否 |  |
| `product_name` | 商品名称 | 短文本 | varchar(255) | 否 |  |
| `product_id` | 商品ID | 整数 | int | 否 |  |
| `order_no` | 单号 | 短文本 | varchar(255) | 否 |  |
| `order_id` | 主表ID | 整数 | int | 否 |  |
| `id` | 唯一标识 | 整数 | int | 是 | 唯一标识 |
| `creator` | 创建人 | 短文本 | varchar(255) | 是 | 创建人姓名 |
| `created_at` | 创建时间 | 日期时间 | timestamp | 是 | 创建时间 |
| `updater` | 更新人 | 短文本 | varchar(255) | 是 | 更新人姓名 |
| `updated_at` | 更新时间 | 日期时间 | timestamp | 是 | 更新时间 |
| `is_deleted` | 是否删除 | 布尔 | tinyint | 是 | 是否已删除 |
| `deleted_at` | 删除时间 | 日期时间 | timestamp | 是 | 删除时间 |

### 方法列表 (SQL 0 + GUI 8)

| # | 方法名称 | methodKey | 类型 | SQL操作 | 入参 |
|---|---------|-----------|------|--------|------|
| 1 | 列表查询 | `FU0Ni6lOWq` | GUI | `SELECT` | 22 +分页排序 |
| 2 | 新增 | `FU5qSwqWsW` | GUI | `INSERT` | 12 |
| 3 | 编辑 | `FU29Cq0hVc` | GUI | `UPDATE` | 13 |
| 4 | 查看详情 | `FU8pDdlcYD` | GUI | `SELECT` | 1 |
| 5 | 删除 | `FUgvKTGWiX` | GUI | `UPDATE` | 1 |
| 6 | 批量删除 | `FUXF7X6pzL` | GUI | `UPDATE` | 1 |
| 7 | 批量导出 | `FUc4qCd4MA` | GUI | `SELECT` | 22 +分页排序 |
| 8 | 批量导入 | `FUVRNEemj4` | GUI | `BATCH_INSERT` | 0 |

### 方法详情

#### 1. 列表查询

- **methodKey**: `FU0Ni6lOWq`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOkM8P1d1B&methodKey=FU0Ni6lOWq`

**请求 Body**:

```json
{
  "amount": "<integer>",
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "order_id": "<integer>",
  "order_no": "<string>",
  "pageSize": "<integer>",
  "price": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "quantity": "<integer>",
  "remark": "<string>",
  "sn_codes": "<string>",
  "sn_count": "<integer>",
  "unit": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `amount` | integer | 否 | 金额 |
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `order_id` | integer | 否 | 主表ID |
| `order_no` | string | 否 | 单号 |
| `pageSize` | integer | 否 | 每页条数 |
| `price` | integer | 否 | 单价 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `quantity` | integer | 否 | 数量 |
| `remark` | string | 否 | 备注 |
| `sn_codes` | string | 否 | SN码列表 |
| `sn_count` | integer | 否 | SN码数量 |
| `unit` | string | 否 | 单位 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 2. 新增

- **methodKey**: `FU5qSwqWsW`
- **类型**: GUI
- **SQL操作**: `INSERT`

**Query**: `?appTag=prd&modelKey=MOkM8P1d1B&methodKey=FU5qSwqWsW`

**请求 Body**:

```json
{
  "amount": "<integer>",
  "order_id": "<integer>",
  "order_no": "<string>",
  "price": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "quantity": "<integer>",
  "remark": "<string>",
  "sn_codes": "<string>",
  "sn_count": "<integer>",
  "unit": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `amount` | integer | 否 | 金额 |
| `order_id` | integer | 否 | 主表ID |
| `order_no` | string | 否 | 单号 |
| `price` | integer | 否 | 单价 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `quantity` | integer | 否 | 数量 |
| `remark` | string | 否 | 备注 |
| `sn_codes` | string | 否 | SN码列表 |
| `sn_count` | integer | 否 | SN码数量 |
| `unit` | string | 否 | 单位 |

---

#### 3. 编辑

- **methodKey**: `FU29Cq0hVc`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOkM8P1d1B&methodKey=FU29Cq0hVc`

**请求 Body**:

```json
{
  "amount": "<integer>",
  "id": "<integer>",
  "order_id": "<integer>",
  "order_no": "<string>",
  "price": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "quantity": "<integer>",
  "remark": "<string>",
  "sn_codes": "<string>",
  "sn_count": "<integer>",
  "unit": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `amount` | integer | 否 | 金额 |
| `id` | integer | 否 | 记录ID |
| `order_id` | integer | 否 | 主表ID |
| `order_no` | string | 否 | 单号 |
| `price` | integer | 否 | 单价 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `quantity` | integer | 否 | 数量 |
| `remark` | string | 否 | 备注 |
| `sn_codes` | string | 否 | SN码列表 |
| `sn_count` | integer | 否 | SN码数量 |
| `unit` | string | 否 | 单位 |

---

#### 4. 查看详情

- **methodKey**: `FU8pDdlcYD`
- **类型**: GUI
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MOkM8P1d1B&methodKey=FU8pDdlcYD`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 5. 删除

- **methodKey**: `FUgvKTGWiX`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOkM8P1d1B&methodKey=FUgvKTGWiX`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 6. 批量删除

- **methodKey**: `FUXF7X6pzL`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOkM8P1d1B&methodKey=FUXF7X6pzL`

**请求 Body**:

```json
{
  "ids": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `ids` | string | 否 | ID列表(逗号分隔) |

---

#### 7. 批量导出

- **methodKey**: `FUc4qCd4MA`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOkM8P1d1B&methodKey=FUc4qCd4MA`

**请求 Body**:

```json
{
  "amount": "<integer>",
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "order_id": "<integer>",
  "order_no": "<string>",
  "pageSize": "<integer>",
  "price": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "quantity": "<integer>",
  "remark": "<string>",
  "sn_codes": "<string>",
  "sn_count": "<integer>",
  "unit": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `amount` | integer | 否 | 金额 |
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `order_id` | integer | 否 | 主表ID |
| `order_no` | string | 否 | 单号 |
| `pageSize` | integer | 否 | 每页条数 |
| `price` | integer | 否 | 单价 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `quantity` | integer | 否 | 数量 |
| `remark` | string | 否 | 备注 |
| `sn_codes` | string | 否 | SN码列表 |
| `sn_count` | integer | 否 | SN码数量 |
| `unit` | string | 否 | 单位 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 8. 批量导入

- **methodKey**: `FUVRNEemj4`
- **类型**: GUI
- **SQL操作**: `BATCH_INSERT`

**Query**: `?appTag=prd&modelKey=MOkM8P1d1B&methodKey=FUVRNEemj4`

**请求 Body**:

```json
{}
```

---

## 采购退货单主表 {#mov8t2ah9x}

| 属性 | 值 |
|------|-----|
| modelKey | `MOV8t2Ah9X` |
| modelNameEn | `pur_re_ord` |
| tableName | `pur_re_ord` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 说明 |
|---------|---------|---------|-----------|------|------|
| `operator_name` | 操作人名称 | 短文本 | varchar(255) | 否 |  |
| `operator_id` | 操作人ID | 短文本 | varchar(255) | 否 |  |
| `remark` | 备注 | 长文本 | varchar(1024) | 否 |  |
| `status` | 状态 | 短文本 | varchar(255) | 否 |  |
| `total_amount` | 总金额 | 小数 | decimal | 否 |  |
| `source_order_no` | 原入库单号 | 短文本 | varchar(255) | 否 |  |
| `warehouse_name` | 仓库名称 | 短文本 | varchar(255) | 否 |  |
| `warehouse_id` | 仓库ID | 整数 | int | 否 |  |
| `supplier_name` | 供应商名称 | 短文本 | varchar(255) | 否 |  |
| `supplier_id` | 供应商ID | 整数 | int | 否 |  |
| `order_date` | 单据日期 | 日期时间 | datetime | 否 |  |
| `order_no` | 单号 | 短文本 | varchar(255) | 否 |  |
| `id` | 唯一标识 | 整数 | int | 是 | 唯一标识 |
| `creator` | 创建人 | 短文本 | varchar(255) | 是 | 创建人姓名 |
| `created_at` | 创建时间 | 日期时间 | timestamp | 是 | 创建时间 |
| `updater` | 更新人 | 短文本 | varchar(255) | 是 | 更新人姓名 |
| `updated_at` | 更新时间 | 日期时间 | timestamp | 是 | 更新时间 |
| `is_deleted` | 是否删除 | 布尔 | tinyint | 是 | 是否已删除 |
| `deleted_at` | 删除时间 | 日期时间 | timestamp | 是 | 删除时间 |

### 方法列表 (SQL 0 + GUI 8)

| # | 方法名称 | methodKey | 类型 | SQL操作 | 入参 |
|---|---------|-----------|------|--------|------|
| 1 | 列表查询 | `FUaZ4wLM6e` | GUI | `SELECT` | 23 +分页排序 |
| 2 | 新增 | `FUKfVnr5XQ` | GUI | `INSERT` | 12 |
| 3 | 编辑 | `FU1VDz9NRt` | GUI | `UPDATE` | 13 |
| 4 | 查看详情 | `FUrCduAiGn` | GUI | `SELECT` | 1 |
| 5 | 删除 | `FUi8k13k4F` | GUI | `UPDATE` | 1 |
| 6 | 批量删除 | `FU4tm0gFpl` | GUI | `UPDATE` | 1 |
| 7 | 批量导出 | `FUKu2Z0myj` | GUI | `SELECT` | 23 +分页排序 |
| 8 | 批量导入 | `FUEPCjocrT` | GUI | `BATCH_INSERT` | 0 |

### 方法详情

#### 1. 列表查询

- **methodKey**: `FUaZ4wLM6e`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOV8t2Ah9X&methodKey=FUaZ4wLM6e`

**请求 Body**:

```json
{
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_date_end": "<string>",
  "order_date_start": "<string>",
  "order_no": "<string>",
  "pageSize": "<integer>",
  "remark": "<string>",
  "source_order_no": "<string>",
  "status": "<string>",
  "supplier_id": "<integer>",
  "supplier_name": "<string>",
  "total_amount": "<integer>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_date_end` | string | 否 | 单据日期 结束 |
| `order_date_start` | string | 否 | 单据日期 起始 |
| `order_no` | string | 否 | 单号 |
| `pageSize` | integer | 否 | 每页条数 |
| `remark` | string | 否 | 备注 |
| `source_order_no` | string | 否 | 原入库单号 |
| `status` | string | 否 | 状态 |
| `supplier_id` | integer | 否 | 供应商ID |
| `supplier_name` | string | 否 | 供应商名称 |
| `total_amount` | integer | 否 | 总金额 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 2. 新增

- **methodKey**: `FUKfVnr5XQ`
- **类型**: GUI
- **SQL操作**: `INSERT`

**Query**: `?appTag=prd&modelKey=MOV8t2Ah9X&methodKey=FUKfVnr5XQ`

**请求 Body**:

```json
{
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_date": "<string>",
  "order_no": "<string>",
  "remark": "<string>",
  "source_order_no": "<string>",
  "status": "<string>",
  "supplier_id": "<integer>",
  "supplier_name": "<string>",
  "total_amount": "<integer>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_date` | string | 否 | 单据日期 |
| `order_no` | string | 否 | 单号 |
| `remark` | string | 否 | 备注 |
| `source_order_no` | string | 否 | 原入库单号 |
| `status` | string | 否 | 状态 |
| `supplier_id` | integer | 否 | 供应商ID |
| `supplier_name` | string | 否 | 供应商名称 |
| `total_amount` | integer | 否 | 总金额 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |

---

#### 3. 编辑

- **methodKey**: `FU1VDz9NRt`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOV8t2Ah9X&methodKey=FU1VDz9NRt`

**请求 Body**:

```json
{
  "id": "<integer>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_date": "<string>",
  "order_no": "<string>",
  "remark": "<string>",
  "source_order_no": "<string>",
  "status": "<string>",
  "supplier_id": "<integer>",
  "supplier_name": "<string>",
  "total_amount": "<integer>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_date` | string | 否 | 单据日期 |
| `order_no` | string | 否 | 单号 |
| `remark` | string | 否 | 备注 |
| `source_order_no` | string | 否 | 原入库单号 |
| `status` | string | 否 | 状态 |
| `supplier_id` | integer | 否 | 供应商ID |
| `supplier_name` | string | 否 | 供应商名称 |
| `total_amount` | integer | 否 | 总金额 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |

---

#### 4. 查看详情

- **methodKey**: `FUrCduAiGn`
- **类型**: GUI
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MOV8t2Ah9X&methodKey=FUrCduAiGn`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 5. 删除

- **methodKey**: `FUi8k13k4F`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOV8t2Ah9X&methodKey=FUi8k13k4F`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 6. 批量删除

- **methodKey**: `FU4tm0gFpl`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOV8t2Ah9X&methodKey=FU4tm0gFpl`

**请求 Body**:

```json
{
  "ids": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `ids` | string | 否 | ID列表(逗号分隔) |

---

#### 7. 批量导出

- **methodKey**: `FUKu2Z0myj`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOV8t2Ah9X&methodKey=FUKu2Z0myj`

**请求 Body**:

```json
{
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_date_end": "<string>",
  "order_date_start": "<string>",
  "order_no": "<string>",
  "pageSize": "<integer>",
  "remark": "<string>",
  "source_order_no": "<string>",
  "status": "<string>",
  "supplier_id": "<integer>",
  "supplier_name": "<string>",
  "total_amount": "<integer>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_date_end` | string | 否 | 单据日期 结束 |
| `order_date_start` | string | 否 | 单据日期 起始 |
| `order_no` | string | 否 | 单号 |
| `pageSize` | integer | 否 | 每页条数 |
| `remark` | string | 否 | 备注 |
| `source_order_no` | string | 否 | 原入库单号 |
| `status` | string | 否 | 状态 |
| `supplier_id` | integer | 否 | 供应商ID |
| `supplier_name` | string | 否 | 供应商名称 |
| `total_amount` | integer | 否 | 总金额 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 8. 批量导入

- **methodKey**: `FUEPCjocrT`
- **类型**: GUI
- **SQL操作**: `BATCH_INSERT`

**Query**: `?appTag=prd&modelKey=MOV8t2Ah9X&methodKey=FUEPCjocrT`

**请求 Body**:

```json
{}
```

---

## 销售出库单明细表 {#mog8t6pkm4}

| 属性 | 值 |
|------|-----|
| modelKey | `MOg8t6pKm4` |
| modelNameEn | `stock_out_item` |
| tableName | `stock_out_item` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 说明 |
|---------|---------|---------|-----------|------|------|
| `remark` | 备注 | 短文本 | varchar(255) | 否 |  |
| `sn_codes` | SN码列表 | 长文本 | varchar(1024) | 否 |  |
| `sn_count` | SN码数量 | 整数 | int | 否 |  |
| `amount` | 金额 | 小数 | decimal | 否 |  |
| `price` | 单价 | 小数 | decimal | 否 |  |
| `quantity` | 数量 | 整数 | int | 否 |  |
| `unit` | 单位 | 短文本 | varchar(255) | 否 |  |
| `product_code` | 商品编码 | 短文本 | varchar(255) | 否 |  |
| `product_name` | 商品名称 | 短文本 | varchar(255) | 否 |  |
| `product_id` | 商品ID | 整数 | int | 否 |  |
| `order_no` | 单号 | 短文本 | varchar(255) | 否 |  |
| `order_id` | 主表ID | 整数 | int | 否 |  |
| `id` | 唯一标识 | 整数 | int | 是 | 唯一标识 |
| `creator` | 创建人 | 短文本 | varchar(255) | 是 | 创建人姓名 |
| `created_at` | 创建时间 | 日期时间 | timestamp | 是 | 创建时间 |
| `updater` | 更新人 | 短文本 | varchar(255) | 是 | 更新人姓名 |
| `updated_at` | 更新时间 | 日期时间 | timestamp | 是 | 更新时间 |
| `is_deleted` | 是否删除 | 布尔 | tinyint | 是 | 是否已删除 |
| `deleted_at` | 删除时间 | 日期时间 | timestamp | 是 | 删除时间 |

### 方法列表 (SQL 0 + GUI 8)

| # | 方法名称 | methodKey | 类型 | SQL操作 | 入参 |
|---|---------|-----------|------|--------|------|
| 1 | 列表查询 | `FUj5beTcFQ` | GUI | `SELECT` | 22 +分页排序 |
| 2 | 新增 | `FUMQAdcAlW` | GUI | `INSERT` | 12 |
| 3 | 编辑 | `FUsNHVHaHs` | GUI | `UPDATE` | 13 |
| 4 | 查看详情 | `FU4VUQ2pR4` | GUI | `SELECT` | 1 |
| 5 | 删除 | `FUdd7H5W2n` | GUI | `UPDATE` | 1 |
| 6 | 批量删除 | `FUs09usTRE` | GUI | `UPDATE` | 1 |
| 7 | 批量导出 | `FUNsSt1MZd` | GUI | `SELECT` | 22 +分页排序 |
| 8 | 批量导入 | `FUjy6QNF3F` | GUI | `BATCH_INSERT` | 0 |

### 方法详情

#### 1. 列表查询

- **methodKey**: `FUj5beTcFQ`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOg8t6pKm4&methodKey=FUj5beTcFQ`

**请求 Body**:

```json
{
  "amount": "<integer>",
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "order_id": "<integer>",
  "order_no": "<string>",
  "pageSize": "<integer>",
  "price": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "quantity": "<integer>",
  "remark": "<string>",
  "sn_codes": "<string>",
  "sn_count": "<integer>",
  "unit": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `amount` | integer | 否 | 金额 |
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `order_id` | integer | 否 | 主表ID |
| `order_no` | string | 否 | 单号 |
| `pageSize` | integer | 否 | 每页条数 |
| `price` | integer | 否 | 单价 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `quantity` | integer | 否 | 数量 |
| `remark` | string | 否 | 备注 |
| `sn_codes` | string | 否 | SN码列表 |
| `sn_count` | integer | 否 | SN码数量 |
| `unit` | string | 否 | 单位 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 2. 新增

- **methodKey**: `FUMQAdcAlW`
- **类型**: GUI
- **SQL操作**: `INSERT`

**Query**: `?appTag=prd&modelKey=MOg8t6pKm4&methodKey=FUMQAdcAlW`

**请求 Body**:

```json
{
  "amount": "<integer>",
  "order_id": "<integer>",
  "order_no": "<string>",
  "price": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "quantity": "<integer>",
  "remark": "<string>",
  "sn_codes": "<string>",
  "sn_count": "<integer>",
  "unit": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `amount` | integer | 否 | 金额 |
| `order_id` | integer | 否 | 主表ID |
| `order_no` | string | 否 | 单号 |
| `price` | integer | 否 | 单价 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `quantity` | integer | 否 | 数量 |
| `remark` | string | 否 | 备注 |
| `sn_codes` | string | 否 | SN码列表 |
| `sn_count` | integer | 否 | SN码数量 |
| `unit` | string | 否 | 单位 |

---

#### 3. 编辑

- **methodKey**: `FUsNHVHaHs`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOg8t6pKm4&methodKey=FUsNHVHaHs`

**请求 Body**:

```json
{
  "amount": "<integer>",
  "id": "<integer>",
  "order_id": "<integer>",
  "order_no": "<string>",
  "price": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "quantity": "<integer>",
  "remark": "<string>",
  "sn_codes": "<string>",
  "sn_count": "<integer>",
  "unit": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `amount` | integer | 否 | 金额 |
| `id` | integer | 否 | 记录ID |
| `order_id` | integer | 否 | 主表ID |
| `order_no` | string | 否 | 单号 |
| `price` | integer | 否 | 单价 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `quantity` | integer | 否 | 数量 |
| `remark` | string | 否 | 备注 |
| `sn_codes` | string | 否 | SN码列表 |
| `sn_count` | integer | 否 | SN码数量 |
| `unit` | string | 否 | 单位 |

---

#### 4. 查看详情

- **methodKey**: `FU4VUQ2pR4`
- **类型**: GUI
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MOg8t6pKm4&methodKey=FU4VUQ2pR4`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 5. 删除

- **methodKey**: `FUdd7H5W2n`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOg8t6pKm4&methodKey=FUdd7H5W2n`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 6. 批量删除

- **methodKey**: `FUs09usTRE`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOg8t6pKm4&methodKey=FUs09usTRE`

**请求 Body**:

```json
{
  "ids": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `ids` | string | 否 | ID列表(逗号分隔) |

---

#### 7. 批量导出

- **methodKey**: `FUNsSt1MZd`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOg8t6pKm4&methodKey=FUNsSt1MZd`

**请求 Body**:

```json
{
  "amount": "<integer>",
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "order_id": "<integer>",
  "order_no": "<string>",
  "pageSize": "<integer>",
  "price": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "quantity": "<integer>",
  "remark": "<string>",
  "sn_codes": "<string>",
  "sn_count": "<integer>",
  "unit": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `amount` | integer | 否 | 金额 |
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `order_id` | integer | 否 | 主表ID |
| `order_no` | string | 否 | 单号 |
| `pageSize` | integer | 否 | 每页条数 |
| `price` | integer | 否 | 单价 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `quantity` | integer | 否 | 数量 |
| `remark` | string | 否 | 备注 |
| `sn_codes` | string | 否 | SN码列表 |
| `sn_count` | integer | 否 | SN码数量 |
| `unit` | string | 否 | 单位 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 8. 批量导入

- **methodKey**: `FUjy6QNF3F`
- **类型**: GUI
- **SQL操作**: `BATCH_INSERT`

**Query**: `?appTag=prd&modelKey=MOg8t6pKm4&methodKey=FUjy6QNF3F`

**请求 Body**:

```json
{}
```

---

## 销售出库单主表 {#moena360t5}

| 属性 | 值 |
|------|-----|
| modelKey | `MOenA360T5` |
| modelNameEn | `stock_out_order` |
| tableName | `stock_out_order` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 说明 |
|---------|---------|---------|-----------|------|------|
| `operator_name` | 操作人名称 | 短文本 | varchar(255) | 否 |  |
| `operator_id` | 操作人ID | 短文本 | varchar(255) | 否 |  |
| `remark` | 备注 | 长文本 | varchar(1024) | 否 |  |
| `status` | 状态 | 短文本 | varchar(255) | 否 |  |
| `unpaid_amount` | 未收款 | 整数 | int | 否 |  |
| `received_amount` | 已收款 | 整数 | int | 否 |  |
| `total_amount` | 总金额 | 小数 | decimal | 否 |  |
| `warehouse_name` | 仓库名称 | 短文本 | varchar(255) | 否 |  |
| `warehouse_id` | 仓库ID | 整数 | int | 否 |  |
| `customer_name` | 客户名称 | 短文本 | varchar(255) | 否 |  |
| `customer_id` | 客户ID | 整数 | int | 否 |  |
| `order_date` | 单据日期 | 日期时间 | datetime | 否 |  |
| `order_no` | 单号 | 短文本 | varchar(255) | 否 |  |
| `id` | 唯一标识 | 整数 | int | 是 | 唯一标识 |
| `creator` | 创建人 | 短文本 | varchar(255) | 是 | 创建人姓名 |
| `created_at` | 创建时间 | 日期时间 | timestamp | 是 | 创建时间 |
| `updater` | 更新人 | 短文本 | varchar(255) | 是 | 更新人姓名 |
| `updated_at` | 更新时间 | 日期时间 | timestamp | 是 | 更新时间 |
| `is_deleted` | 是否删除 | 布尔 | tinyint | 是 | 是否已删除 |
| `deleted_at` | 删除时间 | 日期时间 | timestamp | 是 | 删除时间 |

### 方法列表 (SQL 0 + GUI 8)

| # | 方法名称 | methodKey | 类型 | SQL操作 | 入参 |
|---|---------|-----------|------|--------|------|
| 1 | 列表查询 | `FUJwJkbOnk` | GUI | `SELECT` | 24 +分页排序 |
| 2 | 新增 | `FUUahJCtGe` | GUI | `INSERT` | 13 |
| 3 | 编辑 | `FUMC1YOXai` | GUI | `UPDATE` | 14 |
| 4 | 查看详情 | `FU2ViffXw4` | GUI | `SELECT` | 1 |
| 5 | 删除 | `FURLAv3gOp` | GUI | `UPDATE` | 1 |
| 6 | 批量删除 | `FUGjwYWEi4` | GUI | `UPDATE` | 1 |
| 7 | 批量导出 | `FUpBPZKxXy` | GUI | `SELECT` | 24 +分页排序 |
| 8 | 批量导入 | `FUvGaqggfa` | GUI | `BATCH_INSERT` | 0 |

### 方法详情

#### 1. 列表查询

- **methodKey**: `FUJwJkbOnk`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOenA360T5&methodKey=FUJwJkbOnk`

**请求 Body**:

```json
{
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "customer_id": "<integer>",
  "customer_name": "<string>",
  "id": "<integer>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_date_end": "<string>",
  "order_date_start": "<string>",
  "order_no": "<string>",
  "pageSize": "<integer>",
  "received_amount": "<integer>",
  "remark": "<string>",
  "status": "<string>",
  "total_amount": "<integer>",
  "unpaid_amount": "<integer>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `customer_id` | integer | 否 | 客户ID |
| `customer_name` | string | 否 | 客户名称 |
| `id` | integer | 否 | 记录ID |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_date_end` | string | 否 | 单据日期 结束 |
| `order_date_start` | string | 否 | 单据日期 起始 |
| `order_no` | string | 否 | 单号 |
| `pageSize` | integer | 否 | 每页条数 |
| `received_amount` | integer | 否 | 已收款 |
| `remark` | string | 否 | 备注 |
| `status` | string | 否 | 状态 |
| `total_amount` | integer | 否 | 总金额 |
| `unpaid_amount` | integer | 否 | 未收款 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 2. 新增

- **methodKey**: `FUUahJCtGe`
- **类型**: GUI
- **SQL操作**: `INSERT`

**Query**: `?appTag=prd&modelKey=MOenA360T5&methodKey=FUUahJCtGe`

**请求 Body**:

```json
{
  "customer_id": "<integer>",
  "customer_name": "<string>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_date": "<string>",
  "order_no": "<string>",
  "received_amount": "<integer>",
  "remark": "<string>",
  "status": "<string>",
  "total_amount": "<integer>",
  "unpaid_amount": "<integer>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `customer_id` | integer | 否 | 客户ID |
| `customer_name` | string | 否 | 客户名称 |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_date` | string | 否 | 单据日期 |
| `order_no` | string | 否 | 单号 |
| `received_amount` | integer | 否 | 已收款 |
| `remark` | string | 否 | 备注 |
| `status` | string | 否 | 状态 |
| `total_amount` | integer | 否 | 总金额 |
| `unpaid_amount` | integer | 否 | 未收款 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |

---

#### 3. 编辑

- **methodKey**: `FUMC1YOXai`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOenA360T5&methodKey=FUMC1YOXai`

**请求 Body**:

```json
{
  "customer_id": "<integer>",
  "customer_name": "<string>",
  "id": "<integer>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_date": "<string>",
  "order_no": "<string>",
  "received_amount": "<integer>",
  "remark": "<string>",
  "status": "<string>",
  "total_amount": "<integer>",
  "unpaid_amount": "<integer>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `customer_id` | integer | 否 | 客户ID |
| `customer_name` | string | 否 | 客户名称 |
| `id` | integer | 否 | 记录ID |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_date` | string | 否 | 单据日期 |
| `order_no` | string | 否 | 单号 |
| `received_amount` | integer | 否 | 已收款 |
| `remark` | string | 否 | 备注 |
| `status` | string | 否 | 状态 |
| `total_amount` | integer | 否 | 总金额 |
| `unpaid_amount` | integer | 否 | 未收款 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |

---

#### 4. 查看详情

- **methodKey**: `FU2ViffXw4`
- **类型**: GUI
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MOenA360T5&methodKey=FU2ViffXw4`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 5. 删除

- **methodKey**: `FURLAv3gOp`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOenA360T5&methodKey=FURLAv3gOp`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 6. 批量删除

- **methodKey**: `FUGjwYWEi4`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOenA360T5&methodKey=FUGjwYWEi4`

**请求 Body**:

```json
{
  "ids": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `ids` | string | 否 | ID列表(逗号分隔) |

---

#### 7. 批量导出

- **methodKey**: `FUpBPZKxXy`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOenA360T5&methodKey=FUpBPZKxXy`

**请求 Body**:

```json
{
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "customer_id": "<integer>",
  "customer_name": "<string>",
  "id": "<integer>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_date_end": "<string>",
  "order_date_start": "<string>",
  "order_no": "<string>",
  "pageSize": "<integer>",
  "received_amount": "<integer>",
  "remark": "<string>",
  "status": "<string>",
  "total_amount": "<integer>",
  "unpaid_amount": "<integer>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `customer_id` | integer | 否 | 客户ID |
| `customer_name` | string | 否 | 客户名称 |
| `id` | integer | 否 | 记录ID |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_date_end` | string | 否 | 单据日期 结束 |
| `order_date_start` | string | 否 | 单据日期 起始 |
| `order_no` | string | 否 | 单号 |
| `pageSize` | integer | 否 | 每页条数 |
| `received_amount` | integer | 否 | 已收款 |
| `remark` | string | 否 | 备注 |
| `status` | string | 否 | 状态 |
| `total_amount` | integer | 否 | 总金额 |
| `unpaid_amount` | integer | 否 | 未收款 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 8. 批量导入

- **methodKey**: `FUvGaqggfa`
- **类型**: GUI
- **SQL操作**: `BATCH_INSERT`

**Query**: `?appTag=prd&modelKey=MOenA360T5&methodKey=FUvGaqggfa`

**请求 Body**:

```json
{}
```

---

## 采购入库单明细表 {#moc2tebugk}

| 属性 | 值 |
|------|-----|
| modelKey | `MOc2tEbUGK` |
| modelNameEn | `stock_in_item` |
| tableName | `stock_in_item` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 说明 |
|---------|---------|---------|-----------|------|------|
| `remark` | 备注 | 短文本 | varchar(255) | 否 |  |
| `sn_codes` | SN码列表 | 长文本 | varchar(1024) | 否 |  |
| `sn_count` | SN码数量 | 整数 | int | 否 |  |
| `amount` | 金额 | 小数 | decimal | 否 |  |
| `price` | 单价 | 小数 | decimal | 否 |  |
| `quantity` | 数量 | 整数 | int | 否 |  |
| `unit` | 单位 | 短文本 | varchar(255) | 否 |  |
| `product_code` | 商品编码 | 短文本 | varchar(255) | 否 |  |
| `product_name` | 商品名称 | 短文本 | varchar(255) | 否 |  |
| `product_id` | 商品ID | 整数 | int | 否 |  |
| `order_no` | 单号 | 短文本 | varchar(255) | 否 |  |
| `order_id` | 主表ID | 整数 | int | 否 |  |
| `id` | 唯一标识 | 整数 | int | 是 | 唯一标识 |
| `creator` | 创建人 | 短文本 | varchar(255) | 是 | 创建人姓名 |
| `created_at` | 创建时间 | 日期时间 | timestamp | 是 | 创建时间 |
| `updater` | 更新人 | 短文本 | varchar(255) | 是 | 更新人姓名 |
| `updated_at` | 更新时间 | 日期时间 | timestamp | 是 | 更新时间 |
| `is_deleted` | 是否删除 | 布尔 | tinyint | 是 | 是否已删除 |
| `deleted_at` | 删除时间 | 日期时间 | timestamp | 是 | 删除时间 |

### 方法列表 (SQL 0 + GUI 8)

| # | 方法名称 | methodKey | 类型 | SQL操作 | 入参 |
|---|---------|-----------|------|--------|------|
| 1 | 列表查询 | `FUyWPF92Nx` | GUI | `SELECT` | 22 +分页排序 |
| 2 | 新增 | `FU9z5D8wAM` | GUI | `INSERT` | 12 |
| 3 | 编辑 | `FU5BdwhpML` | GUI | `UPDATE` | 13 |
| 4 | 查看详情 | `FUlojl65Wy` | GUI | `SELECT` | 1 |
| 5 | 删除 | `FUvHcN72IP` | GUI | `UPDATE` | 1 |
| 6 | 批量删除 | `FU5HWSR5JR` | GUI | `UPDATE` | 1 |
| 7 | 批量导出 | `FU6hEmkQVi` | GUI | `SELECT` | 22 +分页排序 |
| 8 | 批量导入 | `FUfCkjxVQi` | GUI | `BATCH_INSERT` | 0 |

### 方法详情

#### 1. 列表查询

- **methodKey**: `FUyWPF92Nx`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOc2tEbUGK&methodKey=FUyWPF92Nx`

**请求 Body**:

```json
{
  "amount": "<integer>",
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "order_id": "<integer>",
  "order_no": "<string>",
  "pageSize": "<integer>",
  "price": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "quantity": "<integer>",
  "remark": "<string>",
  "sn_codes": "<string>",
  "sn_count": "<integer>",
  "unit": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `amount` | integer | 否 | 金额 |
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `order_id` | integer | 否 | 主表ID |
| `order_no` | string | 否 | 单号 |
| `pageSize` | integer | 否 | 每页条数 |
| `price` | integer | 否 | 单价 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `quantity` | integer | 否 | 数量 |
| `remark` | string | 否 | 备注 |
| `sn_codes` | string | 否 | SN码列表 |
| `sn_count` | integer | 否 | SN码数量 |
| `unit` | string | 否 | 单位 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 2. 新增

- **methodKey**: `FU9z5D8wAM`
- **类型**: GUI
- **SQL操作**: `INSERT`

**Query**: `?appTag=prd&modelKey=MOc2tEbUGK&methodKey=FU9z5D8wAM`

**请求 Body**:

```json
{
  "amount": "<integer>",
  "order_id": "<integer>",
  "order_no": "<string>",
  "price": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "quantity": "<integer>",
  "remark": "<string>",
  "sn_codes": "<string>",
  "sn_count": "<integer>",
  "unit": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `amount` | integer | 否 | 金额 |
| `order_id` | integer | 否 | 主表ID |
| `order_no` | string | 否 | 单号 |
| `price` | integer | 否 | 单价 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `quantity` | integer | 否 | 数量 |
| `remark` | string | 否 | 备注 |
| `sn_codes` | string | 否 | SN码列表 |
| `sn_count` | integer | 否 | SN码数量 |
| `unit` | string | 否 | 单位 |

---

#### 3. 编辑

- **methodKey**: `FU5BdwhpML`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOc2tEbUGK&methodKey=FU5BdwhpML`

**请求 Body**:

```json
{
  "amount": "<integer>",
  "id": "<integer>",
  "order_id": "<integer>",
  "order_no": "<string>",
  "price": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "quantity": "<integer>",
  "remark": "<string>",
  "sn_codes": "<string>",
  "sn_count": "<integer>",
  "unit": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `amount` | integer | 否 | 金额 |
| `id` | integer | 否 | 记录ID |
| `order_id` | integer | 否 | 主表ID |
| `order_no` | string | 否 | 单号 |
| `price` | integer | 否 | 单价 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `quantity` | integer | 否 | 数量 |
| `remark` | string | 否 | 备注 |
| `sn_codes` | string | 否 | SN码列表 |
| `sn_count` | integer | 否 | SN码数量 |
| `unit` | string | 否 | 单位 |

---

#### 4. 查看详情

- **methodKey**: `FUlojl65Wy`
- **类型**: GUI
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MOc2tEbUGK&methodKey=FUlojl65Wy`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 5. 删除

- **methodKey**: `FUvHcN72IP`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOc2tEbUGK&methodKey=FUvHcN72IP`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 6. 批量删除

- **methodKey**: `FU5HWSR5JR`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOc2tEbUGK&methodKey=FU5HWSR5JR`

**请求 Body**:

```json
{
  "ids": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `ids` | string | 否 | ID列表(逗号分隔) |

---

#### 7. 批量导出

- **methodKey**: `FU6hEmkQVi`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOc2tEbUGK&methodKey=FU6hEmkQVi`

**请求 Body**:

```json
{
  "amount": "<integer>",
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "order_id": "<integer>",
  "order_no": "<string>",
  "pageSize": "<integer>",
  "price": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "quantity": "<integer>",
  "remark": "<string>",
  "sn_codes": "<string>",
  "sn_count": "<integer>",
  "unit": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `amount` | integer | 否 | 金额 |
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `order_id` | integer | 否 | 主表ID |
| `order_no` | string | 否 | 单号 |
| `pageSize` | integer | 否 | 每页条数 |
| `price` | integer | 否 | 单价 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `quantity` | integer | 否 | 数量 |
| `remark` | string | 否 | 备注 |
| `sn_codes` | string | 否 | SN码列表 |
| `sn_count` | integer | 否 | SN码数量 |
| `unit` | string | 否 | 单位 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 8. 批量导入

- **methodKey**: `FUfCkjxVQi`
- **类型**: GUI
- **SQL操作**: `BATCH_INSERT`

**Query**: `?appTag=prd&modelKey=MOc2tEbUGK&methodKey=FUfCkjxVQi`

**请求 Body**:

```json
{}
```

---

## 采购入库单主表 {#moin9ed2au}

| 属性 | 值 |
|------|-----|
| modelKey | `MOIN9eD2au` |
| modelNameEn | `stock_in_order` |
| tableName | `stock_in_order` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 说明 |
|---------|---------|---------|-----------|------|------|
| `operator_name` | 操作人名称 | 短文本 | varchar(255) | 否 |  |
| `operator_id` | 操作人ID | 短文本 | varchar(255) | 否 |  |
| `remark` | 备注 | 长文本 | varchar(1024) | 否 |  |
| `status` | 状态 | 短文本 | varchar(255) | 否 |  |
| `unpaid_amount` | 未付款 | 整数 | int | 否 |  |
| `paid_amount` | 已付款 | 整数 | int | 否 |  |
| `total_amount` | 总金额 | 小数 | decimal | 否 |  |
| `warehouse_name` | 仓库名称 | 短文本 | varchar(255) | 否 |  |
| `warehouse_id` | 仓库ID | 整数 | int | 否 |  |
| `supplier_name` | 供应商名称 | 短文本 | varchar(255) | 否 |  |
| `supplier_id` | 供应商ID | 整数 | int | 否 |  |
| `order_date` | 单据日期 | 日期时间 | datetime | 否 |  |
| `order_no` | 单号 | 短文本 | varchar(255) | 否 |  |
| `id` | 唯一标识 | 整数 | int | 是 | 唯一标识 |
| `creator` | 创建人 | 短文本 | varchar(255) | 是 | 创建人姓名 |
| `created_at` | 创建时间 | 日期时间 | timestamp | 是 | 创建时间 |
| `updater` | 更新人 | 短文本 | varchar(255) | 是 | 更新人姓名 |
| `updated_at` | 更新时间 | 日期时间 | timestamp | 是 | 更新时间 |
| `is_deleted` | 是否删除 | 布尔 | tinyint | 是 | 是否已删除 |
| `deleted_at` | 删除时间 | 日期时间 | timestamp | 是 | 删除时间 |

### 方法列表 (SQL 0 + GUI 8)

| # | 方法名称 | methodKey | 类型 | SQL操作 | 入参 |
|---|---------|-----------|------|--------|------|
| 1 | 列表查询 | `FUADr2TygU` | GUI | `SELECT` | 24 +分页排序 |
| 2 | 新增 | `FUlZOM13nS` | GUI | `INSERT` | 13 |
| 3 | 编辑 | `FUlQSDHuOv` | GUI | `UPDATE` | 14 |
| 4 | 查看详情 | `FU8N6CTRMZ` | GUI | `SELECT` | 1 |
| 5 | 删除 | `FU1WUGjjGO` | GUI | `UPDATE` | 1 |
| 6 | 批量删除 | `FUq6pQp2ka` | GUI | `UPDATE` | 1 |
| 7 | 批量导出 | `FUoTL911B2` | GUI | `SELECT` | 24 +分页排序 |
| 8 | 批量导入 | `FUVy8K8tlA` | GUI | `BATCH_INSERT` | 0 |

### 方法详情

#### 1. 列表查询

- **methodKey**: `FUADr2TygU`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOIN9eD2au&methodKey=FUADr2TygU`

**请求 Body**:

```json
{
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_date_end": "<string>",
  "order_date_start": "<string>",
  "order_no": "<string>",
  "pageSize": "<integer>",
  "paid_amount": "<integer>",
  "remark": "<string>",
  "status": "<string>",
  "supplier_id": "<integer>",
  "supplier_name": "<string>",
  "total_amount": "<integer>",
  "unpaid_amount": "<integer>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_date_end` | string | 否 | 单据日期 结束 |
| `order_date_start` | string | 否 | 单据日期 起始 |
| `order_no` | string | 否 | 单号 |
| `pageSize` | integer | 否 | 每页条数 |
| `paid_amount` | integer | 否 | 已付款 |
| `remark` | string | 否 | 备注 |
| `status` | string | 否 | 状态 |
| `supplier_id` | integer | 否 | 供应商ID |
| `supplier_name` | string | 否 | 供应商名称 |
| `total_amount` | integer | 否 | 总金额 |
| `unpaid_amount` | integer | 否 | 未付款 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 2. 新增

- **methodKey**: `FUlZOM13nS`
- **类型**: GUI
- **SQL操作**: `INSERT`

**Query**: `?appTag=prd&modelKey=MOIN9eD2au&methodKey=FUlZOM13nS`

**请求 Body**:

```json
{
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_date": "<string>",
  "order_no": "<string>",
  "paid_amount": "<integer>",
  "remark": "<string>",
  "status": "<string>",
  "supplier_id": "<integer>",
  "supplier_name": "<string>",
  "total_amount": "<integer>",
  "unpaid_amount": "<integer>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_date` | string | 否 | 单据日期 |
| `order_no` | string | 否 | 单号 |
| `paid_amount` | integer | 否 | 已付款 |
| `remark` | string | 否 | 备注 |
| `status` | string | 否 | 状态 |
| `supplier_id` | integer | 否 | 供应商ID |
| `supplier_name` | string | 否 | 供应商名称 |
| `total_amount` | integer | 否 | 总金额 |
| `unpaid_amount` | integer | 否 | 未付款 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |

---

#### 3. 编辑

- **methodKey**: `FUlQSDHuOv`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOIN9eD2au&methodKey=FUlQSDHuOv`

**请求 Body**:

```json
{
  "id": "<integer>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_date": "<string>",
  "order_no": "<string>",
  "paid_amount": "<integer>",
  "remark": "<string>",
  "status": "<string>",
  "supplier_id": "<integer>",
  "supplier_name": "<string>",
  "total_amount": "<integer>",
  "unpaid_amount": "<integer>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_date` | string | 否 | 单据日期 |
| `order_no` | string | 否 | 单号 |
| `paid_amount` | integer | 否 | 已付款 |
| `remark` | string | 否 | 备注 |
| `status` | string | 否 | 状态 |
| `supplier_id` | integer | 否 | 供应商ID |
| `supplier_name` | string | 否 | 供应商名称 |
| `total_amount` | integer | 否 | 总金额 |
| `unpaid_amount` | integer | 否 | 未付款 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |

---

#### 4. 查看详情

- **methodKey**: `FU8N6CTRMZ`
- **类型**: GUI
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MOIN9eD2au&methodKey=FU8N6CTRMZ`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 5. 删除

- **methodKey**: `FU1WUGjjGO`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOIN9eD2au&methodKey=FU1WUGjjGO`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 6. 批量删除

- **methodKey**: `FUq6pQp2ka`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOIN9eD2au&methodKey=FUq6pQp2ka`

**请求 Body**:

```json
{
  "ids": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `ids` | string | 否 | ID列表(逗号分隔) |

---

#### 7. 批量导出

- **methodKey**: `FUoTL911B2`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOIN9eD2au&methodKey=FUoTL911B2`

**请求 Body**:

```json
{
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_date_end": "<string>",
  "order_date_start": "<string>",
  "order_no": "<string>",
  "pageSize": "<integer>",
  "paid_amount": "<integer>",
  "remark": "<string>",
  "status": "<string>",
  "supplier_id": "<integer>",
  "supplier_name": "<string>",
  "total_amount": "<integer>",
  "unpaid_amount": "<integer>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_date_end` | string | 否 | 单据日期 结束 |
| `order_date_start` | string | 否 | 单据日期 起始 |
| `order_no` | string | 否 | 单号 |
| `pageSize` | integer | 否 | 每页条数 |
| `paid_amount` | integer | 否 | 已付款 |
| `remark` | string | 否 | 备注 |
| `status` | string | 否 | 状态 |
| `supplier_id` | integer | 否 | 供应商ID |
| `supplier_name` | string | 否 | 供应商名称 |
| `total_amount` | integer | 否 | 总金额 |
| `unpaid_amount` | integer | 否 | 未付款 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 8. 批量导入

- **methodKey**: `FUVy8K8tlA`
- **类型**: GUI
- **SQL操作**: `BATCH_INSERT`

**Query**: `?appTag=prd&modelKey=MOIN9eD2au&methodKey=FUVy8K8tlA`

**请求 Body**:

```json
{}
```

---

## SN操作日志表 {#moqg2psita}

| 属性 | 值 |
|------|-----|
| modelKey | `MOqg2psiTa` |
| modelNameEn | `sn_log` |
| tableName | `sn_log` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 说明 |
|---------|---------|---------|-----------|------|------|
| `remark` | 备注 | 长文本 | varchar(1024) | 否 |  |
| `operator_name` | 操作人名称 | 短文本 | varchar(255) | 否 |  |
| `operator_id` | 操作人ID | 短文本 | varchar(255) | 否 |  |
| `warehouse_name` | 仓库名称 | 短文本 | varchar(255) | 否 |  |
| `warehouse_id` | 仓库ID | 整数 | int | 否 |  |
| `order_type` | 单据类型 | 短文本 | varchar(255) | 否 |  |
| `order_no` | 关联单号 | 短文本 | varchar(255) | 否 |  |
| `operation_desc` | 操作描述 | 短文本 | varchar(255) | 否 |  |
| `operation_type` | 操作类型 | 短文本 | varchar(255) | 否 |  |
| `product_name` | 商品名称 | 短文本 | varchar(255) | 否 |  |
| `product_id` | 商品ID | 整数 | int | 否 |  |
| `sn_code` | SN码 | 短文本 | varchar(255) | 否 |  |
| `id` | 唯一标识 | 整数 | int | 是 | 唯一标识 |
| `creator` | 创建人 | 短文本 | varchar(255) | 是 | 创建人姓名 |
| `created_at` | 创建时间 | 日期时间 | timestamp | 是 | 创建时间 |
| `updater` | 更新人 | 短文本 | varchar(255) | 是 | 更新人姓名 |
| `updated_at` | 更新时间 | 日期时间 | timestamp | 是 | 更新时间 |
| `is_deleted` | 是否删除 | 布尔 | tinyint | 是 | 是否已删除 |
| `deleted_at` | 删除时间 | 日期时间 | timestamp | 是 | 删除时间 |

### 方法列表 (SQL 0 + GUI 8)

| # | 方法名称 | methodKey | 类型 | SQL操作 | 入参 |
|---|---------|-----------|------|--------|------|
| 1 | 列表查询 | `FUUBuLNhuu` | GUI | `SELECT` | 22 +分页排序 |
| 2 | 新增 | `FUtcrpdyV1` | GUI | `INSERT` | 12 |
| 3 | 编辑 | `FUgQeaGxdn` | GUI | `UPDATE` | 13 |
| 4 | 查看详情 | `FUizVrBBZG` | GUI | `SELECT` | 1 |
| 5 | 删除 | `FUe2DNDqym` | GUI | `UPDATE` | 1 |
| 6 | 批量删除 | `FUMT6O9PW2` | GUI | `UPDATE` | 1 |
| 7 | 批量导出 | `FU9T6BRfXi` | GUI | `SELECT` | 22 +分页排序 |
| 8 | 批量导入 | `FUVDkCqqDG` | GUI | `BATCH_INSERT` | 0 |

### 方法详情

#### 1. 列表查询

- **methodKey**: `FUUBuLNhuu`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOqg2psiTa&methodKey=FUUBuLNhuu`

**请求 Body**:

```json
{
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "operation_desc": "<string>",
  "operation_type": "<string>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_no": "<string>",
  "order_type": "<string>",
  "pageSize": "<integer>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "remark": "<string>",
  "sn_code": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `operation_desc` | string | 否 | 操作描述 |
| `operation_type` | string | 否 | 操作类型 |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_no` | string | 否 | 关联单号 |
| `order_type` | string | 否 | 单据类型 |
| `pageSize` | integer | 否 | 每页条数 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `remark` | string | 否 | 备注 |
| `sn_code` | string | 否 | SN码 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 2. 新增

- **methodKey**: `FUtcrpdyV1`
- **类型**: GUI
- **SQL操作**: `INSERT`

**Query**: `?appTag=prd&modelKey=MOqg2psiTa&methodKey=FUtcrpdyV1`

**请求 Body**:

```json
{
  "operation_desc": "<string>",
  "operation_type": "<string>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_no": "<string>",
  "order_type": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "remark": "<string>",
  "sn_code": "<string>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `operation_desc` | string | 否 | 操作描述 |
| `operation_type` | string | 否 | 操作类型 |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_no` | string | 否 | 关联单号 |
| `order_type` | string | 否 | 单据类型 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `remark` | string | 否 | 备注 |
| `sn_code` | string | 否 | SN码 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |

---

#### 3. 编辑

- **methodKey**: `FUgQeaGxdn`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOqg2psiTa&methodKey=FUgQeaGxdn`

**请求 Body**:

```json
{
  "id": "<integer>",
  "operation_desc": "<string>",
  "operation_type": "<string>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_no": "<string>",
  "order_type": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "remark": "<string>",
  "sn_code": "<string>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |
| `operation_desc` | string | 否 | 操作描述 |
| `operation_type` | string | 否 | 操作类型 |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_no` | string | 否 | 关联单号 |
| `order_type` | string | 否 | 单据类型 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `remark` | string | 否 | 备注 |
| `sn_code` | string | 否 | SN码 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |

---

#### 4. 查看详情

- **methodKey**: `FUizVrBBZG`
- **类型**: GUI
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MOqg2psiTa&methodKey=FUizVrBBZG`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 5. 删除

- **methodKey**: `FUe2DNDqym`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOqg2psiTa&methodKey=FUe2DNDqym`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 6. 批量删除

- **methodKey**: `FUMT6O9PW2`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOqg2psiTa&methodKey=FUMT6O9PW2`

**请求 Body**:

```json
{
  "ids": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `ids` | string | 否 | ID列表(逗号分隔) |

---

#### 7. 批量导出

- **methodKey**: `FU9T6BRfXi`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOqg2psiTa&methodKey=FU9T6BRfXi`

**请求 Body**:

```json
{
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "operation_desc": "<string>",
  "operation_type": "<string>",
  "operator_id": "<string>",
  "operator_name": "<string>",
  "order_no": "<string>",
  "order_type": "<string>",
  "pageSize": "<integer>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "remark": "<string>",
  "sn_code": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `operation_desc` | string | 否 | 操作描述 |
| `operation_type` | string | 否 | 操作类型 |
| `operator_id` | string | 否 | 操作人ID |
| `operator_name` | string | 否 | 操作人名称 |
| `order_no` | string | 否 | 关联单号 |
| `order_type` | string | 否 | 单据类型 |
| `pageSize` | integer | 否 | 每页条数 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `remark` | string | 否 | 备注 |
| `sn_code` | string | 否 | SN码 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 8. 批量导入

- **methodKey**: `FUVDkCqqDG`
- **类型**: GUI
- **SQL操作**: `BATCH_INSERT`

**Query**: `?appTag=prd&modelKey=MOqg2psiTa&methodKey=FUVDkCqqDG`

**请求 Body**:

```json
{}
```

---

## SN码表 {#mok2zj4aga}

| 属性 | 值 |
|------|-----|
| modelKey | `MOk2ZJ4aga` |
| modelNameEn | `sn_code` |
| tableName | `sn_code` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 说明 |
|---------|---------|---------|-----------|------|------|
| `remark` | 备注 | 长文本 | varchar(1024) | 否 |  |
| `customer_name` | 客户名称 | 短文本 | varchar(255) | 否 |  |
| `customer_id` | 客户ID | 整数 | int | 否 |  |
| `stock_out_time` | 出库时间 | 日期时间 | datetime | 否 |  |
| `stock_in_time` | 入库时间 | 日期时间 | datetime | 否 |  |
| `purchase_time` | 采购时间 | 日期时间 | datetime | 否 |  |
| `sale_price` | 销售价 | 整数 | int | 否 |  |
| `purchase_price` | 采购价 | 整数 | int | 否 |  |
| `source_order_type` | 来源单据类型 | 短文本 | varchar(255) | 否 |  |
| `source_order_no` | 来源单号 | 短文本 | varchar(255) | 否 |  |
| `status` | 状态 | 短文本 | varchar(255) | 否 |  |
| `warehouse_name` | 仓库名称 | 短文本 | varchar(255) | 否 |  |
| `warehouse_id` | 仓库ID | 整数 | int | 否 |  |
| `product_code` | 商品编码 | 短文本 | varchar(255) | 否 |  |
| `product_name` | 商品名称 | 短文本 | varchar(255) | 否 |  |
| `product_id` | 商品ID | 整数 | int | 否 |  |
| `sn_code` | SN码 | 短文本 | varchar(255) | 否 |  |
| `id` | 唯一标识 | 整数 | int | 是 | 唯一标识 |
| `creator` | 创建人 | 短文本 | varchar(255) | 是 | 创建人姓名 |
| `created_at` | 创建时间 | 日期时间 | timestamp | 是 | 创建时间 |
| `updater` | 更新人 | 短文本 | varchar(255) | 是 | 更新人姓名 |
| `updated_at` | 更新时间 | 日期时间 | timestamp | 是 | 更新时间 |
| `is_deleted` | 是否删除 | 布尔 | tinyint | 是 | 是否已删除 |
| `deleted_at` | 删除时间 | 日期时间 | timestamp | 是 | 删除时间 |

### 方法列表 (SQL 5 + GUI 8)

| # | 方法名称 | methodKey | 类型 | SQL操作 | 入参 |
|---|---------|-----------|------|--------|------|
| 1 | getStatusCount | `FUBkwoTsdZ` | SQL | `SELECT` | 0 |
| 2 | getByWarehouse | `FUzTSnSYnx` | SQL | `SELECT` | 1 |
| 3 | warehouse_id | `FUfOqMyhJV` | SQL | `SELECT` | 0 |
| 4 | getStockOutToday | `FUXHQf4isJ` | SQL | `SELECT` | 0 |
| 5 | scrap | `FUFTtY9af0` | SQL | `UPDATE` | 2 |
| 6 | 列表查询 | `FUG5LjJIRx` | GUI | `SELECT` | 30 +分页排序 |
| 7 | 新增 | `FUUjEoVur5` | GUI | `INSERT` | 17 |
| 8 | 编辑 | `FUU302EENf` | GUI | `UPDATE` | 18 |
| 9 | 查看详情 | `FUZTDMrkH7` | GUI | `SELECT` | 1 |
| 10 | 删除 | `FUoV37QEI0` | GUI | `UPDATE` | 1 |
| 11 | 批量删除 | `FU5DfOATRh` | GUI | `UPDATE` | 1 |
| 12 | 批量导出 | `FUEUHkNQAZ` | GUI | `SELECT` | 30 +分页排序 |
| 13 | 批量导入 | `FU2bmzxkbA` | GUI | `BATCH_INSERT` | 0 |

### 方法详情

#### 1. getStatusCount

- **methodKey**: `FUBkwoTsdZ`
- **类型**: SQL
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MOk2ZJ4aga&methodKey=FUBkwoTsdZ`

**请求 Body**:

```json
{}
```

<details>
<summary>参考 SQL</summary>

```sql
SELECT
        status, COUNT(*) AS count 
    FROM
        kdvpsiaaiaaa_dev_sn_code 
    WHERE
        is_deleted = 0 GROUP BY status
```
</details>

---

#### 2. getByWarehouse

- **methodKey**: `FUzTSnSYnx`
- **类型**: SQL
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MOk2ZJ4aga&methodKey=FUzTSnSYnx`

**请求 Body**:

```json
{
  "warehouse_id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `warehouse_id` | integer | 否 | 仓库ID |

<details>
<summary>参考 SQL</summary>

```sql
SELECT
        warehouse_id, warehouse_name, COUNT(*) AS count 
    FROM
        kdvpsiaaiaaa_dev_sn_code 
    WHERE
        is_deleted = 0  AND warehouse_id = @warehouse_id GROUP BY warehouse_id, warehouse_name
```
</details>

---

#### 3. warehouse_id

- **methodKey**: `FUfOqMyhJV`
- **类型**: SQL
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MOk2ZJ4aga&methodKey=FUfOqMyhJV`

**请求 Body**:

```json
{}
```

<details>
<summary>参考 SQL</summary>

```sql
SELECT
        warehouse_id, warehouse_name, COUNT(*) AS count 
    FROM
        kdvpsiaaiaaa_dev_sn_code 
    WHERE
        is_deleted = 0  AND DATE(stock_in_time) = CURDATE() GROUP BY warehouse_id, warehouse_name
```
</details>

---

#### 4. getStockOutToday

- **methodKey**: `FUXHQf4isJ`
- **类型**: SQL
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MOk2ZJ4aga&methodKey=FUXHQf4isJ`

**请求 Body**:

```json
{}
```

<details>
<summary>参考 SQL</summary>

```sql
SELECT
        warehouse_id, warehouse_name, COUNT(*) AS count 
    FROM
        kdvpsiaaiaaa_dev_sn_code 
    WHERE
        is_deleted = 0  AND DATE(stock_out_time) = CURDATE() GROUP BY warehouse_id, warehouse_name
```
</details>

---

#### 5. scrap

- **methodKey**: `FUFTtY9af0`
- **类型**: SQL
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOk2ZJ4aga&methodKey=FUFTtY9af0`

**请求 Body**:

```json
{
  "id": "<integer>",
  "reason": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |
| `reason` | string | 否 |  |

<details>
<summary>参考 SQL</summary>

```sql
UPDATE
        kdvpsiaaiaaa_dev_sn_code 
    SET
        status = 'SCRAP', remark = CONCAT(IFNULL(remark, ''), ' | 报废原因: ', @reason, ' | 报废时间: ', NOW()) 
    WHERE
        id = @id  AND is_deleted = 0
```
</details>

---

#### 6. 列表查询

- **methodKey**: `FUG5LjJIRx`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOk2ZJ4aga&methodKey=FUG5LjJIRx`

**请求 Body**:

```json
{
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "customer_id": "<integer>",
  "customer_name": "<string>",
  "id": "<integer>",
  "pageSize": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "purchase_price": "<integer>",
  "purchase_time_end": "<string>",
  "purchase_time_start": "<string>",
  "remark": "<string>",
  "sale_price": "<integer>",
  "sn_code": "<string>",
  "source_order_no": "<string>",
  "source_order_type": "<string>",
  "status": "<string>",
  "stock_in_time_end": "<string>",
  "stock_in_time_start": "<string>",
  "stock_out_time_end": "<string>",
  "stock_out_time_start": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `customer_id` | integer | 否 | 客户ID |
| `customer_name` | string | 否 | 客户名称 |
| `id` | integer | 否 | 记录ID |
| `pageSize` | integer | 否 | 每页条数 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `purchase_price` | integer | 否 | 采购价 |
| `purchase_time_end` | string | 否 | 采购时间 结束 |
| `purchase_time_start` | string | 否 | 采购时间 起始 |
| `remark` | string | 否 | 备注 |
| `sale_price` | integer | 否 | 销售价 |
| `sn_code` | string | 否 | SN码 |
| `source_order_no` | string | 否 | 来源单号 |
| `source_order_type` | string | 否 | 来源单据类型 |
| `status` | string | 否 | 状态 |
| `stock_in_time_end` | string | 否 | 入库时间 结束 |
| `stock_in_time_start` | string | 否 | 入库时间 起始 |
| `stock_out_time_end` | string | 否 | 出库时间 结束 |
| `stock_out_time_start` | string | 否 | 出库时间 起始 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 7. 新增

- **methodKey**: `FUUjEoVur5`
- **类型**: GUI
- **SQL操作**: `INSERT`

**Query**: `?appTag=prd&modelKey=MOk2ZJ4aga&methodKey=FUUjEoVur5`

**请求 Body**:

```json
{
  "customer_id": "<integer>",
  "customer_name": "<string>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "purchase_price": "<integer>",
  "purchase_time": "<string>",
  "remark": "<string>",
  "sale_price": "<integer>",
  "sn_code": "<string>",
  "source_order_no": "<string>",
  "source_order_type": "<string>",
  "status": "<string>",
  "stock_in_time": "<string>",
  "stock_out_time": "<string>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `customer_id` | integer | 否 | 客户ID |
| `customer_name` | string | 否 | 客户名称 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `purchase_price` | integer | 否 | 采购价 |
| `purchase_time` | string | 否 | 采购时间 |
| `remark` | string | 否 | 备注 |
| `sale_price` | integer | 否 | 销售价 |
| `sn_code` | string | 否 | SN码 |
| `source_order_no` | string | 否 | 来源单号 |
| `source_order_type` | string | 否 | 来源单据类型 |
| `status` | string | 否 | 状态 |
| `stock_in_time` | string | 否 | 入库时间 |
| `stock_out_time` | string | 否 | 出库时间 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |

---

#### 8. 编辑

- **methodKey**: `FUU302EENf`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOk2ZJ4aga&methodKey=FUU302EENf`

**请求 Body**:

```json
{
  "customer_id": "<integer>",
  "customer_name": "<string>",
  "id": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "purchase_price": "<integer>",
  "purchase_time": "<string>",
  "remark": "<string>",
  "sale_price": "<integer>",
  "sn_code": "<string>",
  "source_order_no": "<string>",
  "source_order_type": "<string>",
  "status": "<string>",
  "stock_in_time": "<string>",
  "stock_out_time": "<string>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `customer_id` | integer | 否 | 客户ID |
| `customer_name` | string | 否 | 客户名称 |
| `id` | integer | 否 | 记录ID |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `purchase_price` | integer | 否 | 采购价 |
| `purchase_time` | string | 否 | 采购时间 |
| `remark` | string | 否 | 备注 |
| `sale_price` | integer | 否 | 销售价 |
| `sn_code` | string | 否 | SN码 |
| `source_order_no` | string | 否 | 来源单号 |
| `source_order_type` | string | 否 | 来源单据类型 |
| `status` | string | 否 | 状态 |
| `stock_in_time` | string | 否 | 入库时间 |
| `stock_out_time` | string | 否 | 出库时间 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |

---

#### 9. 查看详情

- **methodKey**: `FUZTDMrkH7`
- **类型**: GUI
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MOk2ZJ4aga&methodKey=FUZTDMrkH7`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 10. 删除

- **methodKey**: `FUoV37QEI0`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOk2ZJ4aga&methodKey=FUoV37QEI0`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 11. 批量删除

- **methodKey**: `FU5DfOATRh`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOk2ZJ4aga&methodKey=FU5DfOATRh`

**请求 Body**:

```json
{
  "ids": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `ids` | string | 否 | ID列表(逗号分隔) |

---

#### 12. 批量导出

- **methodKey**: `FUEUHkNQAZ`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOk2ZJ4aga&methodKey=FUEUHkNQAZ`

**请求 Body**:

```json
{
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "customer_id": "<integer>",
  "customer_name": "<string>",
  "id": "<integer>",
  "pageSize": "<integer>",
  "product_code": "<string>",
  "product_id": "<integer>",
  "product_name": "<string>",
  "purchase_price": "<integer>",
  "purchase_time_end": "<string>",
  "purchase_time_start": "<string>",
  "remark": "<string>",
  "sale_price": "<integer>",
  "sn_code": "<string>",
  "source_order_no": "<string>",
  "source_order_type": "<string>",
  "status": "<string>",
  "stock_in_time_end": "<string>",
  "stock_in_time_start": "<string>",
  "stock_out_time_end": "<string>",
  "stock_out_time_start": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "warehouse_id": "<integer>",
  "warehouse_name": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `customer_id` | integer | 否 | 客户ID |
| `customer_name` | string | 否 | 客户名称 |
| `id` | integer | 否 | 记录ID |
| `pageSize` | integer | 否 | 每页条数 |
| `product_code` | string | 否 | 商品编码 |
| `product_id` | integer | 否 | 商品ID |
| `product_name` | string | 否 | 商品名称 |
| `purchase_price` | integer | 否 | 采购价 |
| `purchase_time_end` | string | 否 | 采购时间 结束 |
| `purchase_time_start` | string | 否 | 采购时间 起始 |
| `remark` | string | 否 | 备注 |
| `sale_price` | integer | 否 | 销售价 |
| `sn_code` | string | 否 | SN码 |
| `source_order_no` | string | 否 | 来源单号 |
| `source_order_type` | string | 否 | 来源单据类型 |
| `status` | string | 否 | 状态 |
| `stock_in_time_end` | string | 否 | 入库时间 结束 |
| `stock_in_time_start` | string | 否 | 入库时间 起始 |
| `stock_out_time_end` | string | 否 | 出库时间 结束 |
| `stock_out_time_start` | string | 否 | 出库时间 起始 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `warehouse_id` | integer | 否 | 仓库ID |
| `warehouse_name` | string | 否 | 仓库名称 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 13. 批量导入

- **methodKey**: `FU2bmzxkbA`
- **类型**: GUI
- **SQL操作**: `BATCH_INSERT`

**Query**: `?appTag=prd&modelKey=MOk2ZJ4aga&methodKey=FU2bmzxkbA`

**请求 Body**:

```json
{}
```

---

## 账户 {#moausbgpit}

| 属性 | 值 |
|------|-----|
| modelKey | `MOAusBgPiT` |
| modelNameEn | `account` |
| tableName | `account` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 说明 |
|---------|---------|---------|-----------|------|------|
| `remark` | 备注 | 长文本 | varchar(1024) | 否 |  |
| `current_balance` | 当前余额 | 整数 | int | 否 |  |
| `initial_balance` | 起初余额 | 整数 | int | 否 |  |
| `bank_account` | 银行账号 | 短文本 | varchar(255) | 否 |  |
| `bank_name` | 开户银行 | 短文本 | varchar(255) | 否 |  |
| `account_type` | 账户类型银行现金 | 短文本 | varchar(255) | 否 |  |
| `account_name` | 账户名称 | 短文本 | varchar(255) | 否 |  |
| `account_code` | 账户编码 | 短文本 | varchar(255) | 否 |  |
| `id` | 唯一标识 | 整数 | int | 是 | 唯一标识 |
| `creator` | 创建人 | 短文本 | varchar(255) | 是 | 创建人姓名 |
| `created_at` | 创建时间 | 日期时间 | timestamp | 是 | 创建时间 |
| `updater` | 更新人 | 短文本 | varchar(255) | 是 | 更新人姓名 |
| `updated_at` | 更新时间 | 日期时间 | timestamp | 是 | 更新时间 |
| `is_deleted` | 是否删除 | 布尔 | tinyint | 是 | 是否已删除 |
| `deleted_at` | 删除时间 | 日期时间 | timestamp | 是 | 删除时间 |

### 方法列表 (SQL 0 + GUI 8)

| # | 方法名称 | methodKey | 类型 | SQL操作 | 入参 |
|---|---------|-----------|------|--------|------|
| 1 | 列表查询 | `FUHgerXSOC` | GUI | `SELECT` | 18 +分页排序 |
| 2 | 新增 | `FUDiYnyCzb` | GUI | `INSERT` | 8 |
| 3 | 编辑 | `FUzqHOsuFZ` | GUI | `UPDATE` | 9 |
| 4 | 查看详情 | `FUeCQ9aGgK` | GUI | `SELECT` | 1 |
| 5 | 删除 | `FUwztwsCvd` | GUI | `UPDATE` | 1 |
| 6 | 批量删除 | `FUUSzfU6ZY` | GUI | `UPDATE` | 1 |
| 7 | 批量导出 | `FUGp5If8Yy` | GUI | `SELECT` | 18 +分页排序 |
| 8 | 批量导入 | `FUyPI7RxL1` | GUI | `BATCH_INSERT` | 0 |

### 方法详情

#### 1. 列表查询

- **methodKey**: `FUHgerXSOC`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOAusBgPiT&methodKey=FUHgerXSOC`

**请求 Body**:

```json
{
  "account_code": "<string>",
  "account_name": "<string>",
  "account_type": "<string>",
  "bank_account": "<string>",
  "bank_name": "<string>",
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "current_balance": "<integer>",
  "id": "<integer>",
  "initial_balance": "<integer>",
  "pageSize": "<integer>",
  "remark": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `account_code` | string | 否 | 账户编码 |
| `account_name` | string | 否 | 账户名称 |
| `account_type` | string | 否 | 账户类型银行现金 |
| `bank_account` | string | 否 | 银行账号 |
| `bank_name` | string | 否 | 开户银行 |
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `current_balance` | integer | 否 | 当前余额 |
| `id` | integer | 否 | 记录ID |
| `initial_balance` | integer | 否 | 起初余额 |
| `pageSize` | integer | 否 | 每页条数 |
| `remark` | string | 否 | 备注 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 2. 新增

- **methodKey**: `FUDiYnyCzb`
- **类型**: GUI
- **SQL操作**: `INSERT`

**Query**: `?appTag=prd&modelKey=MOAusBgPiT&methodKey=FUDiYnyCzb`

**请求 Body**:

```json
{
  "account_code": "<string>",
  "account_name": "<string>",
  "account_type": "<string>",
  "bank_account": "<string>",
  "bank_name": "<string>",
  "current_balance": "<integer>",
  "initial_balance": "<integer>",
  "remark": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `account_code` | string | 否 | 账户编码 |
| `account_name` | string | 否 | 账户名称 |
| `account_type` | string | 否 | 账户类型银行现金 |
| `bank_account` | string | 否 | 银行账号 |
| `bank_name` | string | 否 | 开户银行 |
| `current_balance` | integer | 否 | 当前余额 |
| `initial_balance` | integer | 否 | 起初余额 |
| `remark` | string | 否 | 备注 |

---

#### 3. 编辑

- **methodKey**: `FUzqHOsuFZ`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOAusBgPiT&methodKey=FUzqHOsuFZ`

**请求 Body**:

```json
{
  "account_code": "<string>",
  "account_name": "<string>",
  "account_type": "<string>",
  "bank_account": "<string>",
  "bank_name": "<string>",
  "current_balance": "<integer>",
  "id": "<integer>",
  "initial_balance": "<integer>",
  "remark": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `account_code` | string | 否 | 账户编码 |
| `account_name` | string | 否 | 账户名称 |
| `account_type` | string | 否 | 账户类型银行现金 |
| `bank_account` | string | 否 | 银行账号 |
| `bank_name` | string | 否 | 开户银行 |
| `current_balance` | integer | 否 | 当前余额 |
| `id` | integer | 否 | 记录ID |
| `initial_balance` | integer | 否 | 起初余额 |
| `remark` | string | 否 | 备注 |

---

#### 4. 查看详情

- **methodKey**: `FUeCQ9aGgK`
- **类型**: GUI
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MOAusBgPiT&methodKey=FUeCQ9aGgK`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 5. 删除

- **methodKey**: `FUwztwsCvd`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOAusBgPiT&methodKey=FUwztwsCvd`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 6. 批量删除

- **methodKey**: `FUUSzfU6ZY`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOAusBgPiT&methodKey=FUUSzfU6ZY`

**请求 Body**:

```json
{
  "ids": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `ids` | string | 否 | ID列表(逗号分隔) |

---

#### 7. 批量导出

- **methodKey**: `FUGp5If8Yy`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOAusBgPiT&methodKey=FUGp5If8Yy`

**请求 Body**:

```json
{
  "account_code": "<string>",
  "account_name": "<string>",
  "account_type": "<string>",
  "bank_account": "<string>",
  "bank_name": "<string>",
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "current_balance": "<integer>",
  "id": "<integer>",
  "initial_balance": "<integer>",
  "pageSize": "<integer>",
  "remark": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `account_code` | string | 否 | 账户编码 |
| `account_name` | string | 否 | 账户名称 |
| `account_type` | string | 否 | 账户类型银行现金 |
| `bank_account` | string | 否 | 银行账号 |
| `bank_name` | string | 否 | 开户银行 |
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `current_balance` | integer | 否 | 当前余额 |
| `id` | integer | 否 | 记录ID |
| `initial_balance` | integer | 否 | 起初余额 |
| `pageSize` | integer | 否 | 每页条数 |
| `remark` | string | 否 | 备注 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 8. 批量导入

- **methodKey**: `FUyPI7RxL1`
- **类型**: GUI
- **SQL操作**: `BATCH_INSERT`

**Query**: `?appTag=prd&modelKey=MOAusBgPiT&methodKey=FUyPI7RxL1`

**请求 Body**:

```json
{}
```

---

## 仓库 {#mo3lpithmu}

| 属性 | 值 |
|------|-----|
| modelKey | `MO3LPiTHMU` |
| modelNameEn | `warehouse` |
| tableName | `warehouse` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 说明 |
|---------|---------|---------|-----------|------|------|
| `remark` | 备注 | 长文本 | varchar(1024) | 否 |  |
| `warehouse_manager` | 仓库管理员 | 短文本 | varchar(255) | 否 |  |
| `warehouse_address` | 仓库地址 | 长文本 | varchar(1024) | 否 |  |
| `warehouse_name` | 仓库名称 | 短文本 | varchar(255) | 否 |  |
| `warehouse_code` | 仓库编码 | 短文本 | varchar(255) | 否 |  |
| `id` | 唯一标识 | 整数 | int | 是 | 唯一标识 |
| `creator` | 创建人 | 短文本 | varchar(255) | 是 | 创建人姓名 |
| `created_at` | 创建时间 | 日期时间 | timestamp | 是 | 创建时间 |
| `updater` | 更新人 | 短文本 | varchar(255) | 是 | 更新人姓名 |
| `updated_at` | 更新时间 | 日期时间 | timestamp | 是 | 更新时间 |
| `is_deleted` | 是否删除 | 布尔 | tinyint | 是 | 是否已删除 |
| `deleted_at` | 删除时间 | 日期时间 | timestamp | 是 | 删除时间 |

### 方法列表 (SQL 0 + GUI 8)

| # | 方法名称 | methodKey | 类型 | SQL操作 | 入参 |
|---|---------|-----------|------|--------|------|
| 1 | 列表查询 | `FUQYxNNGuG` | GUI | `SELECT` | 15 +分页排序 |
| 2 | 新增 | `FUCOPYNJ7K` | GUI | `INSERT` | 5 |
| 3 | 编辑 | `FUo00VnLkx` | GUI | `UPDATE` | 6 |
| 4 | 查看详情 | `FU68EKjRvx` | GUI | `SELECT` | 1 |
| 5 | 删除 | `FUaTjjfFE0` | GUI | `UPDATE` | 1 |
| 6 | 批量删除 | `FUPkYpontz` | GUI | `UPDATE` | 1 |
| 7 | 批量导出 | `FUlvSmHFsf` | GUI | `SELECT` | 15 +分页排序 |
| 8 | 批量导入 | `FUMsjXWwid` | GUI | `BATCH_INSERT` | 0 |

### 方法详情

#### 1. 列表查询

- **methodKey**: `FUQYxNNGuG`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MO3LPiTHMU&methodKey=FUQYxNNGuG`

**请求 Body**:

```json
{
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "pageSize": "<integer>",
  "remark": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "warehouse_address": "<string>",
  "warehouse_code": "<string>",
  "warehouse_manager": "<string>",
  "warehouse_name": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `pageSize` | integer | 否 | 每页条数 |
| `remark` | string | 否 | 备注 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `warehouse_address` | string | 否 | 仓库地址 |
| `warehouse_code` | string | 否 | 仓库编码 |
| `warehouse_manager` | string | 否 | 仓库管理员 |
| `warehouse_name` | string | 否 | 仓库名称 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 2. 新增

- **methodKey**: `FUCOPYNJ7K`
- **类型**: GUI
- **SQL操作**: `INSERT`

**Query**: `?appTag=prd&modelKey=MO3LPiTHMU&methodKey=FUCOPYNJ7K`

**请求 Body**:

```json
{
  "remark": "<string>",
  "warehouse_address": "<string>",
  "warehouse_code": "<string>",
  "warehouse_manager": "<string>",
  "warehouse_name": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `remark` | string | 否 | 备注 |
| `warehouse_address` | string | 否 | 仓库地址 |
| `warehouse_code` | string | 否 | 仓库编码 |
| `warehouse_manager` | string | 否 | 仓库管理员 |
| `warehouse_name` | string | 否 | 仓库名称 |

---

#### 3. 编辑

- **methodKey**: `FUo00VnLkx`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MO3LPiTHMU&methodKey=FUo00VnLkx`

**请求 Body**:

```json
{
  "id": "<integer>",
  "remark": "<string>",
  "warehouse_address": "<string>",
  "warehouse_code": "<string>",
  "warehouse_manager": "<string>",
  "warehouse_name": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |
| `remark` | string | 否 | 备注 |
| `warehouse_address` | string | 否 | 仓库地址 |
| `warehouse_code` | string | 否 | 仓库编码 |
| `warehouse_manager` | string | 否 | 仓库管理员 |
| `warehouse_name` | string | 否 | 仓库名称 |

---

#### 4. 查看详情

- **methodKey**: `FU68EKjRvx`
- **类型**: GUI
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MO3LPiTHMU&methodKey=FU68EKjRvx`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 5. 删除

- **methodKey**: `FUaTjjfFE0`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MO3LPiTHMU&methodKey=FUaTjjfFE0`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 6. 批量删除

- **methodKey**: `FUPkYpontz`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MO3LPiTHMU&methodKey=FUPkYpontz`

**请求 Body**:

```json
{
  "ids": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `ids` | string | 否 | ID列表(逗号分隔) |

---

#### 7. 批量导出

- **methodKey**: `FUlvSmHFsf`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MO3LPiTHMU&methodKey=FUlvSmHFsf`

**请求 Body**:

```json
{
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "pageSize": "<integer>",
  "remark": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "warehouse_address": "<string>",
  "warehouse_code": "<string>",
  "warehouse_manager": "<string>",
  "warehouse_name": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `pageSize` | integer | 否 | 每页条数 |
| `remark` | string | 否 | 备注 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `warehouse_address` | string | 否 | 仓库地址 |
| `warehouse_code` | string | 否 | 仓库编码 |
| `warehouse_manager` | string | 否 | 仓库管理员 |
| `warehouse_name` | string | 否 | 仓库名称 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 8. 批量导入

- **methodKey**: `FUMsjXWwid`
- **类型**: GUI
- **SQL操作**: `BATCH_INSERT`

**Query**: `?appTag=prd&modelKey=MO3LPiTHMU&methodKey=FUMsjXWwid`

**请求 Body**:

```json
{}
```

---

## 商品 {#moeuismd4j}

| 属性 | 值 |
|------|-----|
| modelKey | `MOeUIsmD4j` |
| modelNameEn | `product` |
| tableName | `product` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 说明 |
|---------|---------|---------|-----------|------|------|
| `remark` | 备注 | 长文本 | varchar(1024) | 否 |  |
| `is_sn_managed` | 是否SN码管理 | 整数 | int | 否 |  |
| `sale_price` | 销售价 | 整数 | int | 否 |  |
| `purchase_price` | 采购价 | 整数 | int | 否 |  |
| `spec` | 规格 | 短文本 | varchar(255) | 否 |  |
| `unit` | 单位 | 短文本 | varchar(255) | 否 |  |
| `product_type` | 商品类型型号 | 短文本 | varchar(255) | 否 |  |
| `product_name` | 商品名称 | 短文本 | varchar(255) | 否 |  |
| `product_code` | 商品编码 | 短文本 | varchar(255) | 否 |  |
| `id` | 唯一标识 | 整数 | int | 是 | 唯一标识 |
| `creator` | 创建人 | 短文本 | varchar(255) | 是 | 创建人姓名 |
| `created_at` | 创建时间 | 日期时间 | timestamp | 是 | 创建时间 |
| `updater` | 更新人 | 短文本 | varchar(255) | 是 | 更新人姓名 |
| `updated_at` | 更新时间 | 日期时间 | timestamp | 是 | 更新时间 |
| `is_deleted` | 是否删除 | 布尔 | tinyint | 是 | 是否已删除 |
| `deleted_at` | 删除时间 | 日期时间 | timestamp | 是 | 删除时间 |

### 方法列表 (SQL 0 + GUI 8)

| # | 方法名称 | methodKey | 类型 | SQL操作 | 入参 |
|---|---------|-----------|------|--------|------|
| 1 | 列表查询 | `FUcPuvGaEN` | GUI | `SELECT` | 19 +分页排序 |
| 2 | 新增 | `FUZUQvhIh9` | GUI | `INSERT` | 9 |
| 3 | 编辑 | `FUMutJUzWB` | GUI | `UPDATE` | 10 |
| 4 | 查看详情 | `FUOgJ5FJea` | GUI | `SELECT` | 1 |
| 5 | 删除 | `FUJPKoVKGz` | GUI | `UPDATE` | 1 |
| 6 | 批量删除 | `FUH5YRdvye` | GUI | `UPDATE` | 1 |
| 7 | 批量导出 | `FUJ0uxh8Ip` | GUI | `SELECT` | 19 +分页排序 |
| 8 | 批量导入 | `FUvqVlyzNs` | GUI | `BATCH_INSERT` | 0 |

### 方法详情

#### 1. 列表查询

- **methodKey**: `FUcPuvGaEN`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOeUIsmD4j&methodKey=FUcPuvGaEN`

**请求 Body**:

```json
{
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "is_sn_managed": "<integer>",
  "pageSize": "<integer>",
  "product_code": "<string>",
  "product_name": "<string>",
  "product_type": "<string>",
  "purchase_price": "<integer>",
  "remark": "<string>",
  "sale_price": "<integer>",
  "spec": "<string>",
  "unit": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `is_sn_managed` | integer | 否 | 是否SN码管理 |
| `pageSize` | integer | 否 | 每页条数 |
| `product_code` | string | 否 | 商品编码 |
| `product_name` | string | 否 | 商品名称 |
| `product_type` | string | 否 | 商品类型型号 |
| `purchase_price` | integer | 否 | 采购价 |
| `remark` | string | 否 | 备注 |
| `sale_price` | integer | 否 | 销售价 |
| `spec` | string | 否 | 规格 |
| `unit` | string | 否 | 单位 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 2. 新增

- **methodKey**: `FUZUQvhIh9`
- **类型**: GUI
- **SQL操作**: `INSERT`

**Query**: `?appTag=prd&modelKey=MOeUIsmD4j&methodKey=FUZUQvhIh9`

**请求 Body**:

```json
{
  "is_sn_managed": "<integer>",
  "product_code": "<string>",
  "product_name": "<string>",
  "product_type": "<string>",
  "purchase_price": "<integer>",
  "remark": "<string>",
  "sale_price": "<integer>",
  "spec": "<string>",
  "unit": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `is_sn_managed` | integer | 否 | 是否SN码管理 |
| `product_code` | string | 否 | 商品编码 |
| `product_name` | string | 否 | 商品名称 |
| `product_type` | string | 否 | 商品类型型号 |
| `purchase_price` | integer | 否 | 采购价 |
| `remark` | string | 否 | 备注 |
| `sale_price` | integer | 否 | 销售价 |
| `spec` | string | 否 | 规格 |
| `unit` | string | 否 | 单位 |

---

#### 3. 编辑

- **methodKey**: `FUMutJUzWB`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOeUIsmD4j&methodKey=FUMutJUzWB`

**请求 Body**:

```json
{
  "id": "<integer>",
  "is_sn_managed": "<integer>",
  "product_code": "<string>",
  "product_name": "<string>",
  "product_type": "<string>",
  "purchase_price": "<integer>",
  "remark": "<string>",
  "sale_price": "<integer>",
  "spec": "<string>",
  "unit": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |
| `is_sn_managed` | integer | 否 | 是否SN码管理 |
| `product_code` | string | 否 | 商品编码 |
| `product_name` | string | 否 | 商品名称 |
| `product_type` | string | 否 | 商品类型型号 |
| `purchase_price` | integer | 否 | 采购价 |
| `remark` | string | 否 | 备注 |
| `sale_price` | integer | 否 | 销售价 |
| `spec` | string | 否 | 规格 |
| `unit` | string | 否 | 单位 |

---

#### 4. 查看详情

- **methodKey**: `FUOgJ5FJea`
- **类型**: GUI
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MOeUIsmD4j&methodKey=FUOgJ5FJea`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 5. 删除

- **methodKey**: `FUJPKoVKGz`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOeUIsmD4j&methodKey=FUJPKoVKGz`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 6. 批量删除

- **methodKey**: `FUH5YRdvye`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOeUIsmD4j&methodKey=FUH5YRdvye`

**请求 Body**:

```json
{
  "ids": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `ids` | string | 否 | ID列表(逗号分隔) |

---

#### 7. 批量导出

- **methodKey**: `FUJ0uxh8Ip`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOeUIsmD4j&methodKey=FUJ0uxh8Ip`

**请求 Body**:

```json
{
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "is_sn_managed": "<integer>",
  "pageSize": "<integer>",
  "product_code": "<string>",
  "product_name": "<string>",
  "product_type": "<string>",
  "purchase_price": "<integer>",
  "remark": "<string>",
  "sale_price": "<integer>",
  "spec": "<string>",
  "unit": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `is_sn_managed` | integer | 否 | 是否SN码管理 |
| `pageSize` | integer | 否 | 每页条数 |
| `product_code` | string | 否 | 商品编码 |
| `product_name` | string | 否 | 商品名称 |
| `product_type` | string | 否 | 商品类型型号 |
| `purchase_price` | integer | 否 | 采购价 |
| `remark` | string | 否 | 备注 |
| `sale_price` | integer | 否 | 销售价 |
| `spec` | string | 否 | 规格 |
| `unit` | string | 否 | 单位 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 8. 批量导入

- **methodKey**: `FUvqVlyzNs`
- **类型**: GUI
- **SQL操作**: `BATCH_INSERT`

**Query**: `?appTag=prd&modelKey=MOeUIsmD4j&methodKey=FUvqVlyzNs`

**请求 Body**:

```json
{}
```

---

## 客户 {#moj7upujx2}

| 属性 | 值 |
|------|-----|
| modelKey | `MOj7UPuJx2` |
| modelNameEn | `customer` |
| tableName | `customer` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 说明 |
|---------|---------|---------|-----------|------|------|
| `remark` | 备注 | 长文本 | varchar(1024) | 否 |  |
| `address` | 地址 | 长文本 | varchar(1024) | 否 |  |
| `contact_phone` | 联系电话 | 短文本 | varchar(255) | 否 |  |
| `contact_person` | 联系人 | 短文本 | varchar(255) | 否 |  |
| `customer_name` | 客户名称 | 短文本 | varchar(255) | 否 |  |
| `customer_code` | 客户编码 | 短文本 | varchar(255) | 否 |  |
| `id` | 唯一标识 | 整数 | int | 是 | 唯一标识 |
| `creator` | 创建人 | 短文本 | varchar(255) | 是 | 创建人姓名 |
| `created_at` | 创建时间 | 日期时间 | timestamp | 是 | 创建时间 |
| `updater` | 更新人 | 短文本 | varchar(255) | 是 | 更新人姓名 |
| `updated_at` | 更新时间 | 日期时间 | timestamp | 是 | 更新时间 |
| `is_deleted` | 是否删除 | 布尔 | tinyint | 是 | 是否已删除 |
| `deleted_at` | 删除时间 | 日期时间 | timestamp | 是 | 删除时间 |

### 方法列表 (SQL 0 + GUI 8)

| # | 方法名称 | methodKey | 类型 | SQL操作 | 入参 |
|---|---------|-----------|------|--------|------|
| 1 | 列表查询 | `FUhljLxQOC` | GUI | `SELECT` | 16 +分页排序 |
| 2 | 新增 | `FUhdIhuhKP` | GUI | `INSERT` | 6 |
| 3 | 编辑 | `FUBLg4XVak` | GUI | `UPDATE` | 7 |
| 4 | 查看详情 | `FUkrgtof0H` | GUI | `SELECT` | 1 |
| 5 | 删除 | `FUvIfraor5` | GUI | `UPDATE` | 1 |
| 6 | 批量删除 | `FU1ezRzLc6` | GUI | `UPDATE` | 1 |
| 7 | 批量导出 | `FUgkOv0wRF` | GUI | `SELECT` | 16 +分页排序 |
| 8 | 批量导入 | `FUC5nKgXdO` | GUI | `BATCH_INSERT` | 0 |

### 方法详情

#### 1. 列表查询

- **methodKey**: `FUhljLxQOC`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOj7UPuJx2&methodKey=FUhljLxQOC`

**请求 Body**:

```json
{
  "address": "<string>",
  "contact_person": "<string>",
  "contact_phone": "<string>",
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "customer_code": "<string>",
  "customer_name": "<string>",
  "id": "<integer>",
  "pageSize": "<integer>",
  "remark": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `address` | string | 否 | 地址 |
| `contact_person` | string | 否 | 联系人 |
| `contact_phone` | string | 否 | 联系电话 |
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `customer_code` | string | 否 | 客户编码 |
| `customer_name` | string | 否 | 客户名称 |
| `id` | integer | 否 | 记录ID |
| `pageSize` | integer | 否 | 每页条数 |
| `remark` | string | 否 | 备注 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 2. 新增

- **methodKey**: `FUhdIhuhKP`
- **类型**: GUI
- **SQL操作**: `INSERT`

**Query**: `?appTag=prd&modelKey=MOj7UPuJx2&methodKey=FUhdIhuhKP`

**请求 Body**:

```json
{
  "address": "<string>",
  "contact_person": "<string>",
  "contact_phone": "<string>",
  "customer_code": "<string>",
  "customer_name": "<string>",
  "remark": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `address` | string | 否 | 地址 |
| `contact_person` | string | 否 | 联系人 |
| `contact_phone` | string | 否 | 联系电话 |
| `customer_code` | string | 否 | 客户编码 |
| `customer_name` | string | 否 | 客户名称 |
| `remark` | string | 否 | 备注 |

---

#### 3. 编辑

- **methodKey**: `FUBLg4XVak`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOj7UPuJx2&methodKey=FUBLg4XVak`

**请求 Body**:

```json
{
  "address": "<string>",
  "contact_person": "<string>",
  "contact_phone": "<string>",
  "customer_code": "<string>",
  "customer_name": "<string>",
  "id": "<integer>",
  "remark": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `address` | string | 否 | 地址 |
| `contact_person` | string | 否 | 联系人 |
| `contact_phone` | string | 否 | 联系电话 |
| `customer_code` | string | 否 | 客户编码 |
| `customer_name` | string | 否 | 客户名称 |
| `id` | integer | 否 | 记录ID |
| `remark` | string | 否 | 备注 |

---

#### 4. 查看详情

- **methodKey**: `FUkrgtof0H`
- **类型**: GUI
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MOj7UPuJx2&methodKey=FUkrgtof0H`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 5. 删除

- **methodKey**: `FUvIfraor5`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOj7UPuJx2&methodKey=FUvIfraor5`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 6. 批量删除

- **methodKey**: `FU1ezRzLc6`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOj7UPuJx2&methodKey=FU1ezRzLc6`

**请求 Body**:

```json
{
  "ids": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `ids` | string | 否 | ID列表(逗号分隔) |

---

#### 7. 批量导出

- **methodKey**: `FUgkOv0wRF`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOj7UPuJx2&methodKey=FUgkOv0wRF`

**请求 Body**:

```json
{
  "address": "<string>",
  "contact_person": "<string>",
  "contact_phone": "<string>",
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "customer_code": "<string>",
  "customer_name": "<string>",
  "id": "<integer>",
  "pageSize": "<integer>",
  "remark": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `address` | string | 否 | 地址 |
| `contact_person` | string | 否 | 联系人 |
| `contact_phone` | string | 否 | 联系电话 |
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `customer_code` | string | 否 | 客户编码 |
| `customer_name` | string | 否 | 客户名称 |
| `id` | integer | 否 | 记录ID |
| `pageSize` | integer | 否 | 每页条数 |
| `remark` | string | 否 | 备注 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 8. 批量导入

- **methodKey**: `FUC5nKgXdO`
- **类型**: GUI
- **SQL操作**: `BATCH_INSERT`

**Query**: `?appTag=prd&modelKey=MOj7UPuJx2&methodKey=FUC5nKgXdO`

**请求 Body**:

```json
{}
```

---

## 供应商表 {#momke9xgeh}

| 属性 | 值 |
|------|-----|
| modelKey | `MOmke9xgeH` |
| modelNameEn | `supplier` |
| tableName | `supplier` |

### 字段定义

| 字段编码 | 字段名称 | 业务类型 | 数据库类型 | 必填 | 说明 |
|---------|---------|---------|-----------|------|------|
| `remark` | 备注 | 长文本 | varchar(1024) | 否 |  |
| `address` | 地址 | 长文本 | varchar(1024) | 否 |  |
| `contact_phone` | 联系电话 | 短文本 | varchar(255) | 否 |  |
| `contact_person` | 联系人 | 短文本 | varchar(255) | 否 |  |
| `supplier_name` | 供应商名称 | 短文本 | varchar(255) | 否 |  |
| `supplier_code` | 供应商编码 | 短文本 | varchar(255) | 否 |  |
| `id` | 唯一标识 | 整数 | int | 是 | 唯一标识 |
| `creator` | 创建人 | 短文本 | varchar(255) | 是 | 创建人姓名 |
| `created_at` | 创建时间 | 日期时间 | timestamp | 是 | 创建时间 |
| `updater` | 更新人 | 短文本 | varchar(255) | 是 | 更新人姓名 |
| `updated_at` | 更新时间 | 日期时间 | timestamp | 是 | 更新时间 |
| `is_deleted` | 是否删除 | 布尔 | tinyint | 是 | 是否已删除 |
| `deleted_at` | 删除时间 | 日期时间 | timestamp | 是 | 删除时间 |

### 方法列表 (SQL 0 + GUI 8)

| # | 方法名称 | methodKey | 类型 | SQL操作 | 入参 |
|---|---------|-----------|------|--------|------|
| 1 | 列表查询 | `FUahi0uBQQ` | GUI | `SELECT` | 16 +分页排序 |
| 2 | 新增 | `FURNaL3qZ1` | GUI | `INSERT` | 6 |
| 3 | 编辑 | `FUxSx9jzAe` | GUI | `UPDATE` | 7 |
| 4 | 查看详情 | `FUZ32CRNo9` | GUI | `SELECT` | 1 |
| 5 | 删除 | `FUqg607gvT` | GUI | `UPDATE` | 1 |
| 6 | 批量删除 | `FUJnfXz4wQ` | GUI | `UPDATE` | 1 |
| 7 | 批量导出 | `FUgGELKOTB` | GUI | `SELECT` | 16 +分页排序 |
| 8 | 批量导入 | `FU97SWibIq` | GUI | `BATCH_INSERT` | 0 |

### 方法详情

#### 1. 列表查询

- **methodKey**: `FUahi0uBQQ`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOmke9xgeH&methodKey=FUahi0uBQQ`

**请求 Body**:

```json
{
  "address": "<string>",
  "contact_person": "<string>",
  "contact_phone": "<string>",
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "pageSize": "<integer>",
  "remark": "<string>",
  "supplier_code": "<string>",
  "supplier_name": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `address` | string | 否 | 地址 |
| `contact_person` | string | 否 | 联系人 |
| `contact_phone` | string | 否 | 联系电话 |
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `pageSize` | integer | 否 | 每页条数 |
| `remark` | string | 否 | 备注 |
| `supplier_code` | string | 否 | 供应商编码 |
| `supplier_name` | string | 否 | 供应商名称 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 2. 新增

- **methodKey**: `FURNaL3qZ1`
- **类型**: GUI
- **SQL操作**: `INSERT`

**Query**: `?appTag=prd&modelKey=MOmke9xgeH&methodKey=FURNaL3qZ1`

**请求 Body**:

```json
{
  "address": "<string>",
  "contact_person": "<string>",
  "contact_phone": "<string>",
  "remark": "<string>",
  "supplier_code": "<string>",
  "supplier_name": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `address` | string | 否 | 地址 |
| `contact_person` | string | 否 | 联系人 |
| `contact_phone` | string | 否 | 联系电话 |
| `remark` | string | 否 | 备注 |
| `supplier_code` | string | 否 | 供应商编码 |
| `supplier_name` | string | 否 | 供应商名称 |

---

#### 3. 编辑

- **methodKey**: `FUxSx9jzAe`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOmke9xgeH&methodKey=FUxSx9jzAe`

**请求 Body**:

```json
{
  "address": "<string>",
  "contact_person": "<string>",
  "contact_phone": "<string>",
  "id": "<integer>",
  "remark": "<string>",
  "supplier_code": "<string>",
  "supplier_name": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `address` | string | 否 | 地址 |
| `contact_person` | string | 否 | 联系人 |
| `contact_phone` | string | 否 | 联系电话 |
| `id` | integer | 否 | 记录ID |
| `remark` | string | 否 | 备注 |
| `supplier_code` | string | 否 | 供应商编码 |
| `supplier_name` | string | 否 | 供应商名称 |

---

#### 4. 查看详情

- **methodKey**: `FUZ32CRNo9`
- **类型**: GUI
- **SQL操作**: `SELECT`

**Query**: `?appTag=prd&modelKey=MOmke9xgeH&methodKey=FUZ32CRNo9`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 5. 删除

- **methodKey**: `FUqg607gvT`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOmke9xgeH&methodKey=FUqg607gvT`

**请求 Body**:

```json
{
  "id": "<integer>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `id` | integer | 否 | 记录ID |

---

#### 6. 批量删除

- **methodKey**: `FUJnfXz4wQ`
- **类型**: GUI
- **SQL操作**: `UPDATE`

**Query**: `?appTag=prd&modelKey=MOmke9xgeH&methodKey=FUJnfXz4wQ`

**请求 Body**:

```json
{
  "ids": "<string>"
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `ids` | string | 否 | ID列表(逗号分隔) |

---

#### 7. 批量导出

- **methodKey**: `FUgGELKOTB`
- **类型**: GUI
- **SQL操作**: `SELECT`
- **支持分页排序**: 是

**Query**: `?appTag=prd&modelKey=MOmke9xgeH&methodKey=FUgGELKOTB`

**请求 Body**:

```json
{
  "address": "<string>",
  "contact_person": "<string>",
  "contact_phone": "<string>",
  "created_at_end": "<string>",
  "created_at_start": "<string>",
  "creator": "<string>",
  "current": "<integer>",
  "id": "<integer>",
  "pageSize": "<integer>",
  "remark": "<string>",
  "supplier_code": "<string>",
  "supplier_name": "<string>",
  "updated_at_end": "<string>",
  "updated_at_start": "<string>",
  "updater": "<string>",
  "orders": [
    {
      "key": "<field>",
      "order": "DESC"
    }
  ]
}
```

**Body 入参说明**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `address` | string | 否 | 地址 |
| `contact_person` | string | 否 | 联系人 |
| `contact_phone` | string | 否 | 联系电话 |
| `created_at_end` | string | 否 | 创建时间 结束 |
| `created_at_start` | string | 否 | 创建时间 起始 |
| `creator` | string | 否 | 创建人 |
| `current` | integer | 否 | 当前页 |
| `id` | integer | 否 | 记录ID |
| `pageSize` | integer | 否 | 每页条数 |
| `remark` | string | 否 | 备注 |
| `supplier_code` | string | 否 | 供应商编码 |
| `supplier_name` | string | 否 | 供应商名称 |
| `updated_at_end` | string | 否 | 更新时间 结束 |
| `updated_at_start` | string | 否 | 更新时间 起始 |
| `updater` | string | 否 | 更新人 |
| `orders` | array | 否 | 排序规则，如 [{"key":"id","order":"DESC"}] |

---

#### 8. 批量导入

- **methodKey**: `FU97SWibIq`
- **类型**: GUI
- **SQL操作**: `BATCH_INSERT`

**Query**: `?appTag=prd&modelKey=MOmke9xgeH&methodKey=FU97SWibIq`

**请求 Body**:

```json
{}
```

---
