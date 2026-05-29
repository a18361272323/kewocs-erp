# 科沃斯ERP系统 - 完整业务流程图

> 本文档详细描述用户在ERP系统和账款管理系统中的完整操作流程，以及系统各模块之间的数据联动关系。

---

## 一、基础数据准备（系统初始化）

```mermaid
flowchart TB
    subgraph BASE["基础数据管理"]
        B1["货品管理<br/>新增货品（PRODUCT）<br/>设置 hasSn=1 标记SN商品<br/>定义成本价/销售价/单位"]
        B2["客户管理<br/>新增客户（CUSTOMER）<br/>配置客户编码<br/>用于账款管理推送"]
        B3["供应商管理<br/>新增供应商（SUPPLIER）"]
        B4["仓库管理<br/>新增仓库（WAREHOUSE）"]
        B5["账户管理<br/>新增收付款账户（ACCOUNT）"]
    end
    B1 --> B2 --> B3 --> B4 --> B5
    B5 --> READY["基础数据就绪<br/>可进行业务操作"]
```

---

## 二、SN码全生命周期状态机

```mermaid
flowchart LR
    P["PURCHASED<br/>已采购"] --> I["INSTOCK<br/>在库"]
    I --> S["SOLD<br/>已销售"]
    S --> R["RETURN<br/>已退货"]
    R --> I
    I -.-> T["调拨中"]
    T --> I
    I -.-> C["盘点中"]
    C --> I
    C --> L["LOST<br/>盘亏"]
```

---

## 三、采购管理流程

### 3.1 采购入库

```mermaid
flowchart TB
    subgraph PURCHASE_IN["采购入库流程"]
        PI1["用户操作：采购入库单<br/>选择供应商 + 仓库"]
        PI2["扫描SN码（每台机器唯一）<br/>或手动输入SN"]
        PI3["选择对应货品品类<br/>录入单价"]
        PI4["确认入库"]
    end

    subgraph SYS_PI["系统自动执行"]
        SPI1["创建入库单（STOCK_IN）"]
        SPI2["创建入库明细（STOCK_IN_DETAIL）"]
        SPI3["生成SN码记录（SN_CODE）<br/>状态 = INSTOCK"]
        SPI4["库存台账（INVENTORY）更新<br/>该品类数量 +N"]
    end

    PI1 --> PI2 --> PI3 --> PI4
    PI4 --> SPI1 --> SPI2 --> SPI3 --> SPI4
```

### 3.2 采购付款

```mermaid
flowchart TB
    subgraph PAYMENT["采购付款流程"]
        PP1["用户操作：采购付款单<br/>选择供应商"]
        PP2["选择付款账户"]
        PP3["填写付款金额/日期/备注"]
        PP4["确认付款"]
    end

    subgraph SYS_PP["系统自动执行"]
        SPP1["创建付款记录（FINANCE/PAYMENT）"]
        SPP2["财务流水更新<br/>记录支出"]
    end

    PP1 --> PP2 --> PP3 --> PP4
    PP4 --> SPP1 --> SPP2
```

### 3.3 采购退货

```mermaid
flowchart TB
    subgraph PURCHASE_RETURN["采购退货流程"]
        PR1["用户操作：采购退货单<br/>选择供应商 + 仓库"]
        PR2["选择原入库的SN码<br/>（必须是INSTOCK状态）"]
        PR3["填写退货原因"]
        PR4["确认退货"]
    end

    subgraph SYS_PR["系统自动执行"]
        SPR1["创建退货单（PURCHASE_RETURN）"]
        SPR2["更新SN状态<br/>INSTOCK → PURCHASED/已退货"]
        SPR3["库存台账更新<br/>该品类数量 -N"]
    end

    PR1 --> PR2 --> PR3 --> PR4
    PR4 --> SPR1 --> SPR2 --> SPR3
```

---

## 四、销售管理流程

### 4.1 销售订单

```mermaid
flowchart TB
    subgraph SALE_ORDER["销售订单流程"]
        SO1["用户操作：销售订单<br/>选择客户 + 仓库"]
        SO2["选择货品品类<br/>（来自PRODUCT基础数据）"]
        SO3["填写销售数量"]
        SO4["保存销售单"]
    end

    subgraph SYS_SO["系统自动执行"]
        SSO1["库存校验<br/>查询该仓库该品类的INSTOCK数量"]
        SSO2{"库存是否充足?"}
        SSO3["❌ 阻止保存<br/>提示库存不足"]
        SSO4["✅ 创建销售单（SALE_ORDER）<br/>状态 = CONFIRMED"]
        SSO5["提示：请在出库时录入SN码"]
    end

    SO1 --> SO2 --> SO3 --> SO4
    SO4 --> SSO1 --> SSO2
    SSO2 -->|否| SSO3
    SSO2 -->|是| SSO4 --> SSO5
```

### 4.2 销售出库

```mermaid
flowchart TB
    subgraph STOCK_OUT["销售出库流程"]
        STO1["用户操作：销售出库单<br/>从销售单点击'出库'跳转"]
        STO2["系统加载该仓库<br/>所有INSTOCK状态的SN商品"]
        STO3["用户选择具体要出库的SN码<br/>（每台机器唯一）"]
        STO4["填写出库数量<br/>max ≤ 可用库存"]
        STO5["确认出库"]
    end

    subgraph SYS_STO["系统自动执行"]
        SSTO1["创建出库单（STOCK_OUT）"]
        SSTO2["创建出库明细（STOCK_OUT_DETAIL）<br/>关联具体SN码"]
        SSTO3["更新SN状态<br/>INSTOCK → SOLD"]
        SSTO4["库存台账更新<br/>该品类数量 -N"]
        SSTO5["推送应收单到账款管理<br/>携带：销售单号/客户编码/金额/商品明细"]
    end

    STO1 --> STO2 --> STO3 --> STO4 --> STO5
    STO5 --> SSTO1 --> SSTO2 --> SSTO3 --> SSTO4 --> SSTO5
```

### 4.3 账款管理联动（ERP ↔ 账款管理）

```mermaid
flowchart TB
    subgraph ERP_PUSH["ERP系统侧"]
        EP1["销售出库确认"]
        EP2["调用账款管理接口<br/>应收单推送"]
        EP3["携带参数：<br/>billCode=销售单号<br/>customerCode=客户编码<br/>amount=应收金额<br/>detail=商品明细"]
    end

    subgraph XFT["账款管理系统"]
        X1["接收应收单"]
        X2["生成应收账单"]
        X3["财务人员/业务人员操作<br/>创建回款认领单"]
        X4["确认回款"]
        X5["触发事件推送<br/>XFTACR003<br/>已回款金额变更通知"]
    end

    subgraph CONNECTOR["连接器"]
        C1["接收XFTACR003事件"]
        C2["解析回款数据<br/>单据号/回款金额/回款日期"]
    end

    subgraph ERP_RECEIVE["ERP系统侧"]
        ER1["连接器更新ERP收款数据"]
        ER2["收款单（Collection）只读查询<br/>展示已回款金额"]
        ER3["应收单已回款金额更新"]
    end

    EP1 --> EP2 --> EP3 --> X1 --> X2 --> X3 --> X4 --> X5
    X5 --> C1 --> C2 --> ER1 --> ER2
    ER1 --> ER3
```

### 4.4 销售退货

```mermaid
flowchart TB
    subgraph SALE_RETURN["销售退货流程"]
        SR1["用户操作：销售退货单<br/>选择客户 + 仓库"]
        SR2["选择已销售的SN码<br/>（必须是SOLD状态）"]
        SR3["填写退货原因"]
        SR4["确认退货"]
    end

    subgraph SYS_SR["系统自动执行"]
        SSR1["创建销售退货单（SALE_RETURN）"]
        SSR2["更新SN状态<br/>SOLD → INSTOCK"]
        SSR3["库存台账更新<br/>该品类数量 +N"]
        SSR4["调用账款管理接口<br/>删除对应应收单"]
    end

    SR1 --> SR2 --> SR3 --> SR4
    SR4 --> SSR1 --> SSR2 --> SSR3 --> SSR4
```

---

## 五、仓库管理流程

### 5.1 库存台账（实时查询）

```mermaid
flowchart LR
    subgraph INVENTORY["库存台账（INVENTORY）"]
        I1["按品类汇总展示"]
        I2["显示各仓库库存数量"]
        I3["显示INSTOCK状态的SN明细"]
    end

    I1 --> I2 --> I3
    I3 --> SN["SN码详情<br/>每台机器唯一标识"]
```

### 5.2 调拨单（SN级调拨）

```mermaid
flowchart TB
    subgraph TRANSFER["调拨单流程"]
        TF1["用户操作：调拨单<br/>选择调出仓库"]
        TF2["系统加载该仓库<br/>所有INSTOCK状态的SN商品"]
        TF3["用户勾选要调拨的<br/>具体SN码（多选）"]
        TF4["选择调入仓库<br/>（不能与调出仓库相同）"]
        TF5["保存调拨单<br/>状态 = PENDING"]
        TF6["确认调拨"]
    end

    subgraph SYS_TF["系统自动执行"]
        STF1["创建调拨单（TRANSFER）"]
        STF2["创建调拨明细（TRANSFER_DETAIL）<br/>记录每个SN的调出/调入"]
        STF3["逐条更新SN记录<br/>warehouseId = 调入仓库<br/>warehouseName = 调入仓库名"]
        STF4["调拨单状态更新<br/>PENDING → COMPLETED"]
    end

    TF1 --> TF2 --> TF3 --> TF4 --> TF5 --> TF6
    TF6 --> STF1 --> STF2 --> STF3 --> STF4
```

### 5.3 盘点单（SN级盘点）

```mermaid
flowchart TB
    subgraph CHECK["盘点单流程"]
        CK1["用户操作：盘点单<br/>选择盘点仓库"]
        CK2["系统自动加载该仓库<br/>所有INSTOCK状态的SN商品<br/>作为账面库存"]
        CK3["扫描实盘SN码<br/>（手持扫码设备/手动输入）"]
        CK4["系统比对：<br/>扫描到且系统存在 → 正常<br/>系统有但未扫描到 → 盘亏<br/>扫描到但系统无 → 盘盈"]
        CK5["可手动标记'已盘'<br/>补充漏扫的SN"]
        CK6["完成盘点"]
    end

    subgraph SYS_CK["系统自动执行"]
        SCK1["创建盘点单（CHECK）<br/>状态 = CHECKING"]
        SCK2["创建盘点明细（CHECK_DETAIL）<br/>记录每个SN的盘点结果"]
        SCK3["盘亏的SN更新状态<br/>INSTOCK → LOST"]
        SCK4["盘点单状态更新<br/>CHECKING → COMPLETED"]
        SCK5["库存台账实时更新<br/>盘亏数量从库存中扣除"]
    end

    CK1 --> CK2 --> CK3 --> CK4 --> CK5 --> CK6
    CK6 --> SCK1 --> SCK2 --> SCK3 --> SCK4 --> SCK5
```

---

## 六、移动端扫码作业流程

```mermaid
flowchart TB
    subgraph MOBILE["移动端（Vant4）"]
        M1["首页：选择功能模块"]
        M2["采购入库<br/>扫码SN → 选品类+单价 → 确认入库"]
        M3["销售出库<br/>选销售单 → 扫码SN → 确认出库"]
        M4["销售退货<br/>扫码SN → 确认退货"]
    end

    subgraph API["共用API层"]
        A1["snApi.create() 创建SN"]
        A2["snApi.edit() 更新SN状态/仓库"]
        A3["stockInApi.save() 保存入库单"]
        A4["stockOutApi.confirm() 确认出库"]
        A5["pushReceivable() 推送应收单"]
    end

    M1 --> M2 --> A3 --> A1
    M1 --> M3 --> A4 --> A2 --> A5
    M1 --> M4 --> A2
```

---

## 七、完整业务闭环图

```mermaid
flowchart TB
    subgraph PREP["① 基础数据准备"]
        P1["货品建档<br/>hasSn=1"]
        P2["客户建档<br/>配置编码"]
        P3["供应商建档"]
        P4["仓库/账户建档"]
    end

    subgraph BUY["② 采购入库"]
        B1["创建入库单<br/>扫描SN码"]
        B2["SN状态 = INSTOCK"]
        B3["库存台账 +N"]
    end

    subgraph SALE["③ 销售出库"]
        S1["创建销售单<br/>库存校验"]
        S2["创建出库单<br/>选择具体SN"]
        S3["SN状态 = SOLD"]
        S4["库存台账 -N"]
        S5["推送应收单<br/>到账款管理"]
    end

    subgraph FINANCE["④ 账款管理"]
        F1["生成应收账单"]
        F2["用户创建回款认领单"]
        F3["确认回款"]
        F4["推送XFTACR003<br/>回款变更通知"]
    end

    subgraph SYNC["⑤ ERP同步回款"]
        Y1["连接器接收事件"]
        Y2["更新ERP收款数据"]
        Y3["收款单查询展示"]
    end

    subgraph RETURN["⑥ 退货/调拨/盘点"]
        R1["销售退货 → SN恢复INSTOCK<br/>删除应收单"]
        R2["调拨单 → SN变更仓库"]
        R3["盘点单 → 盘亏SN标记LOST"]
    end

    PREP --> BUY --> SALE --> FINANCE --> SYNC
    SALE --> RETURN
    BUY --> RETURN
```

---

## 八、各模块数据模型关系

| 模块 | 主表 | 明细表 | SN关联 | 账款管理关联 |
|------|------|--------|--------|-------------|
| 采购入库 | STOCK_IN | STOCK_IN_DETAIL | SN_CODE（创建INSTOCK） | 无 |
| 采购付款 | PAYMENT | - | 无 | 无 |
| 销售订单 | SALE_ORDER | SALE_ORDER_DETAIL | 无（出库时才关联） | 无 |
| 销售出库 | STOCK_OUT | STOCK_OUT_DETAIL | SN_CODE（更新SOLD） | 推送应收单 |
| 销售退货 | SALE_RETURN | SALE_RETURN_DETAIL | SN_CODE（恢复INSTOCK） | 删除应收单 |
| 调拨单 | TRANSFER | TRANSFER_DETAIL | SN_CODE（变更仓库） | 无 |
| 盘点单 | CHECK | CHECK_DETAIL | SN_CODE（更新LOST） | 无 |
| 库存台账 | INVENTORY | - | SN_CODE（实时统计） | 无 |
| 财务流水 | FINANCE | - | 无 | 连接器同步回款 |
