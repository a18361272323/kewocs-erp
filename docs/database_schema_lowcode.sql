-- ============================================
-- 科沃斯ERP - 低开平台适配版数据库结构
-- 注意：本版本去掉索引创建语句，适配低开平台托管模型
-- ============================================

-- ---------------------------------------------
-- 一、基础资料表（账款管理同步）
-- ---------------------------------------------

-- 供应商表
CREATE TABLE supplier (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    supplier_code   VARCHAR(50) COMMENT '供应商编码',
    supplier_name   VARCHAR(100) NOT NULL COMMENT '供应商名称',
    contact_person  VARCHAR(50) COMMENT '联系人',
    contact_phone   VARCHAR(20) COMMENT '联系电话',
    address         VARCHAR(255) COMMENT '地址',
    remark          VARCHAR(500) COMMENT '备注',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    creator     BIGINT COMMENT '创建人',
    updater     BIGINT COMMENT '更新人',
    is_deleted      TINYINT(1) DEFAULT 0 COMMENT '是否删除'
) COMMENT '供应商表';

-- 客户表
CREATE TABLE customer (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    customer_code   VARCHAR(50) COMMENT '客户编码',
    customer_name   VARCHAR(100) NOT NULL COMMENT '客户名称',
    contact_person  VARCHAR(50) COMMENT '联系人',
    contact_phone   VARCHAR(20) COMMENT '联系电话',
    address         VARCHAR(255) COMMENT '地址',
    remark          VARCHAR(500) COMMENT '备注',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    creator     BIGINT COMMENT '创建人',
    updater     BIGINT COMMENT '更新人',
    is_deleted      TINYINT(1) DEFAULT 0 COMMENT '是否删除'
) COMMENT '客户表';

-- 商品表（关联SN码的核心商品）
CREATE TABLE product (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    product_code    VARCHAR(50) COMMENT '商品编码',
    product_name    VARCHAR(100) NOT NULL COMMENT '商品名称',
    product_type    VARCHAR(50) COMMENT '商品类型/型号',
    unit            VARCHAR(20) DEFAULT '台' COMMENT '单位',
    spec            VARCHAR(100) COMMENT '规格',
    purchase_price  DECIMAL(12,2) COMMENT '采购价',
    sale_price      DECIMAL(12,2) COMMENT '销售价',
    is_sn_managed   TINYINT(1) DEFAULT 1 COMMENT '是否SN码管理',
    remark          VARCHAR(500) COMMENT '备注',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    creator     BIGINT COMMENT '创建人',
    updater     BIGINT COMMENT '更新人',
    is_deleted      TINYINT(1) DEFAULT 0 COMMENT '是否删除'
) COMMENT '商品表（需SN管理的商品）';

-- 仓库表
CREATE TABLE warehouse (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    warehouse_code  VARCHAR(50) COMMENT '仓库编码',
    warehouse_name  VARCHAR(100) NOT NULL COMMENT '仓库名称',
    warehouse_address VARCHAR(255) COMMENT '仓库地址',
    warehouse_manager VARCHAR(50) COMMENT '仓库管理员',
    remark          VARCHAR(500) COMMENT '备注',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    creator     BIGINT COMMENT '创建人',
    updater     BIGINT COMMENT '更新人',
    is_deleted      TINYINT(1) DEFAULT 0 COMMENT '是否删除'
) COMMENT '仓库表';

-- 账户表（银行账户）
CREATE TABLE account (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    account_code    VARCHAR(50) COMMENT '账户编码',
    account_name    VARCHAR(100) NOT NULL COMMENT '账户名称',
    account_type    VARCHAR(20) COMMENT '账户类型（银行/现金）',
    bank_name       VARCHAR(100) COMMENT '开户银行',
    bank_account    VARCHAR(50) COMMENT '银行账号',
    initial_balance DECIMAL(14,2) DEFAULT 0 COMMENT '起初余额',
    current_balance DECIMAL(14,2) DEFAULT 0 COMMENT '当前余额',
    remark          VARCHAR(500) COMMENT '备注',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    creator     BIGINT COMMENT '创建人',
    updater     BIGINT COMMENT '更新人',
    is_deleted      TINYINT(1) DEFAULT 0 COMMENT '是否删除'
) COMMENT '账户表';

-- ---------------------------------------------
-- 二、SN码核心表
-- ---------------------------------------------

-- SN码表
CREATE TABLE sn_code (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    sn_code         VARCHAR(100) NOT NULL COMMENT 'SN码',
    product_id      BIGINT COMMENT '商品ID',
    product_name    VARCHAR(100) COMMENT '商品名称',
    product_code    VARCHAR(50) COMMENT '商品编码',
    warehouse_id    BIGINT COMMENT '仓库ID',
    warehouse_name  VARCHAR(100) COMMENT '仓库名称',
    status          VARCHAR(20) DEFAULT 'PURCHASED' COMMENT '状态(PURCHASED采购中/INSTOCK库存/SOLD已售/RETURN退货中/SCRAPPED报废)',
    source_order_no VARCHAR(50) COMMENT '来源单号',
    source_order_type VARCHAR(30) COMMENT '来源单据类型',
    purchase_price  DECIMAL(12,2) COMMENT '采购价',
    sale_price      DECIMAL(12,2) COMMENT '销售价',
    purchase_time   DATETIME COMMENT '采购时间',
    stock_in_time   DATETIME COMMENT '入库时间',
    stock_out_time  DATETIME COMMENT '出库时间',
    customer_id     BIGINT COMMENT '客户ID',
    customer_name   VARCHAR(100) COMMENT '客户名称',
    remark          VARCHAR(500) COMMENT '备注',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    creator     BIGINT COMMENT '创建人',
    updater     BIGINT COMMENT '更新人',
    is_deleted      TINYINT(1) DEFAULT 0 COMMENT '是否删除'
) COMMENT 'SN码表';

-- SN操作日志表
CREATE TABLE sn_log (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    sn_code         VARCHAR(100) NOT NULL COMMENT 'SN码',
    product_id      BIGINT COMMENT '商品ID',
    product_name    VARCHAR(100) COMMENT '商品名称',
    operation_type  VARCHAR(30) NOT NULL COMMENT '操作类型(采购入库/销售出库/退货入库/报废/调拨)',
    operation_desc  VARCHAR(200) COMMENT '操作描述',
    order_no        VARCHAR(50) COMMENT '关联单号',
    order_type      VARCHAR(30) COMMENT '单据类型',
    warehouse_id    BIGINT COMMENT '仓库ID',
    warehouse_name  VARCHAR(100) COMMENT '仓库名称',
    operator_id     BIGINT COMMENT '操作人ID',
    operator_name   VARCHAR(50) COMMENT '操作人名称',
    remark          VARCHAR(500) COMMENT '备注',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    creator     BIGINT COMMENT '创建人',
    is_deleted      TINYINT(1) DEFAULT 0 COMMENT '是否删除'
) COMMENT 'SN操作日志表';

-- ---------------------------------------------
-- 三、采购入库
-- ---------------------------------------------

-- 采购入库单主表
CREATE TABLE stock_in_order (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    order_no        VARCHAR(50) NOT NULL COMMENT '单号',
    order_date      DATE NOT NULL COMMENT '单据日期',
    supplier_id     BIGINT COMMENT '供应商ID',
    supplier_name   VARCHAR(100) COMMENT '供应商名称',
    warehouse_id    BIGINT COMMENT '仓库ID',
    warehouse_name  VARCHAR(100) COMMENT '仓库名称',
    total_amount    DECIMAL(14,2) DEFAULT 0 COMMENT '总金额',
    paid_amount     DECIMAL(14,2) DEFAULT 0 COMMENT '已付款',
    unpaid_amount   DECIMAL(14,2) DEFAULT 0 COMMENT '未付款',
    status          VARCHAR(20) DEFAULT 'PENDING' COMMENT '状态(PENDING待入库/COMPLETED已完成/CANCELLED已取消)',
    remark          VARCHAR(500) COMMENT '备注',
    operator_id     BIGINT COMMENT '操作人ID',
    operator_name   VARCHAR(50) COMMENT '操作人名称',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    creator     BIGINT COMMENT '创建人',
    updater     BIGINT COMMENT '更新人',
    is_deleted      TINYINT(1) DEFAULT 0 COMMENT '是否删除'
) COMMENT '采购入库单主表';

-- 采购入库单明细表
CREATE TABLE stock_in_item (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    order_id        BIGINT NOT NULL COMMENT '主表ID',
    order_no        VARCHAR(50) COMMENT '单号',
    product_id      BIGINT COMMENT '商品ID',
    product_name    VARCHAR(100) COMMENT '商品名称',
    product_code    VARCHAR(50) COMMENT '商品编码',
    unit            VARCHAR(20) COMMENT '单位',
    quantity        INT DEFAULT 0 COMMENT '数量',
    price           DECIMAL(12,2) DEFAULT 0 COMMENT '单价',
    amount          DECIMAL(14,2) DEFAULT 0 COMMENT '金额',
    sn_count        INT DEFAULT 0 COMMENT 'SN码数量',
    sn_codes        TEXT COMMENT 'SN码列表(JSON)',
    remark          VARCHAR(500) COMMENT '备注',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    creator     BIGINT COMMENT '创建人',
    updater     BIGINT COMMENT '更新人',
    is_deleted      TINYINT(1) DEFAULT 0 COMMENT '是否删除'
) COMMENT '采购入库单明细表';

-- ---------------------------------------------
-- 四、销售出库
-- ---------------------------------------------

-- 销售出库单主表
CREATE TABLE stock_out_order (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    order_no        VARCHAR(50) NOT NULL COMMENT '单号',
    order_date      DATE NOT NULL COMMENT '单据日期',
    customer_id     BIGINT COMMENT '客户ID',
    customer_name   VARCHAR(100) COMMENT '客户名称',
    warehouse_id    BIGINT COMMENT '仓库ID',
    warehouse_name  VARCHAR(100) COMMENT '仓库名称',
    total_amount    DECIMAL(14,2) DEFAULT 0 COMMENT '总金额',
    received_amount DECIMAL(14,2) DEFAULT 0 COMMENT '已收款',
    unpaid_amount   DECIMAL(14,2) DEFAULT 0 COMMENT '未收款',
    status          VARCHAR(20) DEFAULT 'PENDING' COMMENT '状态(PENDING待出库/COMPLETED已完成/CANCELLED已取消)',
    remark          VARCHAR(500) COMMENT '备注',
    operator_id     BIGINT COMMENT '操作人ID',
    operator_name   VARCHAR(50) COMMENT '操作人名称',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    creator     BIGINT COMMENT '创建人',
    updater     BIGINT COMMENT '更新人',
    is_deleted      TINYINT(1) DEFAULT 0 COMMENT '是否删除'
) COMMENT '销售出库单主表';

-- 销售出库单明细表
CREATE TABLE stock_out_item (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    order_id        BIGINT NOT NULL COMMENT '主表ID',
    order_no        VARCHAR(50) COMMENT '单号',
    product_id      BIGINT COMMENT '商品ID',
    product_name    VARCHAR(100) COMMENT '商品名称',
    product_code    VARCHAR(50) COMMENT '商品编码',
    unit            VARCHAR(20) COMMENT '单位',
    quantity        INT DEFAULT 0 COMMENT '数量',
    price           DECIMAL(12,2) DEFAULT 0 COMMENT '单价',
    amount          DECIMAL(14,2) DEFAULT 0 COMMENT '金额',
    sn_count        INT DEFAULT 0 COMMENT 'SN码数量',
    sn_codes        TEXT COMMENT 'SN码列表(JSON)',
    remark          VARCHAR(500) COMMENT '备注',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    creator     BIGINT COMMENT '创建人',
    updater     BIGINT COMMENT '更新人',
    is_deleted      TINYINT(1) DEFAULT 0 COMMENT '是否删除'
) COMMENT '销售出库单明细表';

-- ---------------------------------------------
-- 五、退货管理
-- ---------------------------------------------

-- 采购退货单主表
CREATE TABLE pur_re_ord (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    order_no        VARCHAR(50) NOT NULL COMMENT '单号',
    order_date      DATE NOT NULL COMMENT '单据日期',
    supplier_id     BIGINT COMMENT '供应商ID',
    supplier_name   VARCHAR(100) COMMENT '供应商名称',
    warehouse_id    BIGINT COMMENT '仓库ID',
    warehouse_name  VARCHAR(100) COMMENT '仓库名称',
    source_order_no VARCHAR(50) COMMENT '原入库单号',
    total_amount    DECIMAL(14,2) DEFAULT 0 COMMENT '总金额',
    status          VARCHAR(20) DEFAULT 'PENDING' COMMENT '状态(PENDING待退货/COMPLETED已完成/CANCELLED已取消)',
    remark          VARCHAR(500) COMMENT '备注',
    operator_id     BIGINT COMMENT '操作人ID',
    operator_name   VARCHAR(50) COMMENT '操作人名称',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    creator     BIGINT COMMENT '创建人',
    updater     BIGINT COMMENT '更新人',
    is_deleted      TINYINT(1) DEFAULT 0 COMMENT '是否删除'
) COMMENT '采购退货单主表';

-- 采购退货单明细表
CREATE TABLE pur_re_item (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    order_id        BIGINT NOT NULL COMMENT '主表ID',
    order_no        VARCHAR(50) COMMENT '单号',
    product_id      BIGINT COMMENT '商品ID',
    product_name    VARCHAR(100) COMMENT '商品名称',
    product_code    VARCHAR(50) COMMENT '商品编码',
    unit            VARCHAR(20) COMMENT '单位',
    quantity        INT DEFAULT 0 COMMENT '数量',
    price           DECIMAL(12,2) DEFAULT 0 COMMENT '单价',
    amount          DECIMAL(14,2) DEFAULT 0 COMMENT '金额',
    sn_count        INT DEFAULT 0 COMMENT 'SN码数量',
    sn_codes        TEXT COMMENT 'SN码列表(JSON)',
    remark          VARCHAR(500) COMMENT '备注',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    creator     BIGINT COMMENT '创建人',
    updater     BIGINT COMMENT '更新人',
    is_deleted      TINYINT(1) DEFAULT 0 COMMENT '是否删除'
) COMMENT '采购退货单明细表';

-- 销售退货单主表
CREATE TABLE sa_re_ord (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    order_no        VARCHAR(50) NOT NULL COMMENT '单号',
    order_date      DATE NOT NULL COMMENT '单据日期',
    customer_id     BIGINT COMMENT '客户ID',
    customer_name   VARCHAR(100) COMMENT '客户名称',
    warehouse_id    BIGINT COMMENT '仓库ID',
    warehouse_name  VARCHAR(100) COMMENT '仓库名称',
    source_order_no VARCHAR(50) COMMENT '原出库单号',
    total_amount    DECIMAL(14,2) DEFAULT 0 COMMENT '总金额',
    status          VARCHAR(20) DEFAULT 'PENDING' COMMENT '状态(PENDING待退货/COMPLETED已完成/CANCELLED已取消)',
    remark          VARCHAR(500) COMMENT '备注',
    operator_id     BIGINT COMMENT '操作人ID',
    operator_name   VARCHAR(50) COMMENT '操作人名称',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    creator     BIGINT COMMENT '创建人',
    updater     BIGINT COMMENT '更新人',
    is_deleted      TINYINT(1) DEFAULT 0 COMMENT '是否删除'
) COMMENT '销售退货单主表';

-- 销售退货单明细表
CREATE TABLE sa_re_item (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    order_id        BIGINT NOT NULL COMMENT '主表ID',
    order_no        VARCHAR(50) COMMENT '单号',
    product_id      BIGINT COMMENT '商品ID',
    product_name    VARCHAR(100) COMMENT '商品名称',
    product_code    VARCHAR(50) COMMENT '商品编码',
    unit            VARCHAR(20) COMMENT '单位',
    quantity        INT DEFAULT 0 COMMENT '数量',
    price           DECIMAL(12,2) DEFAULT 0 COMMENT '单价',
    amount          DECIMAL(14,2) DEFAULT 0 COMMENT '金额',
    sn_count        INT DEFAULT 0 COMMENT 'SN码数量',
    sn_codes        TEXT COMMENT 'SN码列表(JSON)',
    remark          VARCHAR(500) COMMENT '备注',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    creator     BIGINT COMMENT '创建人',
    updater     BIGINT COMMENT '更新人',
    is_deleted      TINYINT(1) DEFAULT 0 COMMENT '是否删除'
) COMMENT '销售退货单明细表';

-- ---------------------------------------------
-- 六、仓库管理
-- ---------------------------------------------

-- 调拨单主表
CREATE TABLE transfer_order (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    order_no        VARCHAR(50) NOT NULL COMMENT '单号',
    order_date      DATE NOT NULL COMMENT '单据日期',
    out_warehouse_id BIGINT COMMENT '调出仓库ID',
    out_warehouse_name VARCHAR(100) COMMENT '调出仓库名称',
    in_warehouse_id BIGINT COMMENT '调入仓库ID',
    in_warehouse_name VARCHAR(100) COMMENT '调入仓库名称',
    total_quantity  INT DEFAULT 0 COMMENT '总数量',
    total_amount    DECIMAL(14,2) DEFAULT 0 COMMENT '总金额',
    status          VARCHAR(20) DEFAULT 'PENDING' COMMENT '状态(PENDING待调拨/COMPLETED已完成/CANCELLED已取消)',
    remark          VARCHAR(500) COMMENT '备注',
    operator_id     BIGINT COMMENT '操作人ID',
    operator_name   VARCHAR(50) COMMENT '操作人名称',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    creator     BIGINT COMMENT '创建人',
    updater     BIGINT COMMENT '更新人',
    is_deleted      TINYINT(1) DEFAULT 0 COMMENT '是否删除'
) COMMENT '调拨单主表';

-- 调拨单明细表
CREATE TABLE transfer_item (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    order_id        BIGINT NOT NULL COMMENT '主表ID',
    order_no        VARCHAR(50) COMMENT '单号',
    product_id      BIGINT COMMENT '商品ID',
    product_name    VARCHAR(100) COMMENT '商品名称',
    product_code    VARCHAR(50) COMMENT '商品编码',
    unit            VARCHAR(20) COMMENT '单位',
    quantity        INT DEFAULT 0 COMMENT '数量',
    price           DECIMAL(12,2) DEFAULT 0 COMMENT '单价',
    amount          DECIMAL(14,2) DEFAULT 0 COMMENT '金额',
    sn_count        INT DEFAULT 0 COMMENT 'SN码数量',
    sn_codes        TEXT COMMENT 'SN码列表(JSON)',
    remark          VARCHAR(500) COMMENT '备注',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    creator     BIGINT COMMENT '创建人',
    updater     BIGINT COMMENT '更新人',
    is_deleted      TINYINT(1) DEFAULT 0 COMMENT '是否删除'
) COMMENT '调拨单明细表';

-- 盘点单主表
CREATE TABLE check_order (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    order_no        VARCHAR(50) NOT NULL COMMENT '单号',
    order_date      DATE NOT NULL COMMENT '单据日期',
    warehouse_id    BIGINT COMMENT '仓库ID',
    warehouse_name  VARCHAR(100) COMMENT '仓库名称',
    adjust_account  VARCHAR(100) COMMENT '调整科目',
    voucher_no      VARCHAR(50) COMMENT '凭证号',
    total_book_quantity INT DEFAULT 0 COMMENT '账面总数量',
    total_actual_quantity INT DEFAULT 0 COMMENT '实盘总数量',
    total_profit_quantity INT DEFAULT 0 COMMENT '盈亏总数量',
    total_profit_amount DECIMAL(14,2) DEFAULT 0 COMMENT '盈亏总金额',
    status          VARCHAR(20) DEFAULT 'PENDING' COMMENT '状态(PENDING待盘点/COMPLETED已完成/CANCELLED已取消)',
    remark          VARCHAR(500) COMMENT '备注',
    operator_id     BIGINT COMMENT '操作人ID',
    operator_name   VARCHAR(50) COMMENT '操作人名称',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    creator     BIGINT COMMENT '创建人',
    updater     BIGINT COMMENT '更新人',
    is_deleted      TINYINT(1) DEFAULT 0 COMMENT '是否删除'
) COMMENT '盘点单主表';

-- 盘点单明细表
CREATE TABLE check_item (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    order_id        BIGINT NOT NULL COMMENT '主表ID',
    order_no        VARCHAR(50) COMMENT '单号',
    product_id      BIGINT COMMENT '商品ID',
    product_name    VARCHAR(100) COMMENT '商品名称',
    product_code    VARCHAR(50) COMMENT '商品编码',
    unit            VARCHAR(20) COMMENT '单位',
    book_quantity   INT DEFAULT 0 COMMENT '账面数量',
    actual_quantity INT DEFAULT 0 COMMENT '实盘数量',
    profit_quantity INT DEFAULT 0 COMMENT '盈亏数量',
    price           DECIMAL(12,2) DEFAULT 0 COMMENT '单价',
    profit_amount   DECIMAL(14,2) DEFAULT 0 COMMENT '盈亏金额',
    remark          VARCHAR(500) COMMENT '备注',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    creator     BIGINT COMMENT '创建人',
    updater     BIGINT COMMENT '更新人',
    is_deleted      TINYINT(1) DEFAULT 0 COMMENT '是否删除'
) COMMENT '盘点单明细表';

-- ---------------------------------------------
-- 七、库存台账（每个仓库每个商品的实时库存）
-- ---------------------------------------------

CREATE TABLE inventory (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    warehouse_id    BIGINT NOT NULL COMMENT '仓库ID',
    warehouse_name   VARCHAR(100) COMMENT '仓库名称',
    product_id      BIGINT NOT NULL COMMENT '商品ID',
    product_name    VARCHAR(100) COMMENT '商品名称',
    product_code    VARCHAR(50) COMMENT '商品编码',
    unit            VARCHAR(20) COMMENT '单位',
    quantity        INT DEFAULT 0 COMMENT '当前库存数量（不含SN）',
    sn_quantity     INT DEFAULT 0 COMMENT 'SN码商品库存数量',
    price           DECIMAL(12,2) DEFAULT 0 COMMENT '参考单价',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    creator     BIGINT COMMENT '创建人',
    updater     BIGINT COMMENT '更新人',
    is_deleted      TINYINT(1) DEFAULT 0 COMMENT '是否删除',
    UNIQUE KEY uk_warehouse_product (warehouse_id, product_id) COMMENT '仓库+商品唯一'
) COMMENT '库存台账表';

-- ---------------------------------------------
-- 九、财务流水对接表（业财一体化关键）
-- ---------------------------------------------
-- 财务流水对接表：业务单据与账款管理的桥梁
-- 记录待同步/已同步的应收/应付数据

CREATE TABLE finance_flow (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    flow_no         VARCHAR(50) NOT NULL COMMENT '流水号(唯一)',
    source_type     VARCHAR(20) NOT NULL COMMENT '来源类型(STOCK_OUT-销售出库/SALE_RETURN-销退)',
    source_no       VARCHAR(50) NOT NULL COMMENT '来源单号',
    biz_type        VARCHAR(20) NOT NULL DEFAULT 'AR' COMMENT '业务类型(仅AR-应收,应付由账款管理手动处理)',
    counterparty_type VARCHAR(20) NOT NULL COMMENT '往来单位类型(CUSTOMER-客户)',
    counterparty_id BIGINT NOT NULL COMMENT '客户ID',
    counterparty_code VARCHAR(50) COMMENT '客户编码',
    counterparty_name VARCHAR(100) NOT NULL COMMENT '客户名称',
    amount          DECIMAL(14,2) NOT NULL DEFAULT 0 COMMENT '应收/应付金额',
    paid_amount     DECIMAL(14,2) NOT NULL DEFAULT 0 COMMENT '已核销金额',
    balance_amount  DECIMAL(14,2) NOT NULL DEFAULT 0 COMMENT '待核销金额',
    bill_date       DATE NOT NULL COMMENT '单据日期',
    due_date        DATE COMMENT '到期日期',
    sync_status     VARCHAR(20) NOT NULL DEFAULT 'PENDING' COMMENT '同步状态(PENDING-待推送/SUCCESS-已推送/FAILED-失败)',
    sync_time       DATETIME COMMENT '同步时间',
    external_bill_no VARCHAR(50) COMMENT '外部账单号(账款管理返回)',
    external_bill_status VARCHAR(20) COMMENT '外部账单状态',
    remark          VARCHAR(500) COMMENT '备注',
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    creator     BIGINT COMMENT '创建人',
    updater     BIGINT COMMENT '更新人',
    is_deleted      TINYINT(1) DEFAULT 0 COMMENT '是否删除'
) COMMENT '财务流水对接表';

-- ============================================
-- END
-- ============================================
