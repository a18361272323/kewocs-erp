-- ============================================================
-- 科沃斯ERP - 低开平台数据库结构
-- 适配薪福通低开平台托管模型
-- ============================================================

-- 说明：
-- 1. 字段命名使用驼峰（camelCase），避开关键字
-- 2. 主键统一使用 id (Long类型)
-- 3. 时间字段使用 createTime, updateTime
-- 4. 软删除字段统一使用 isDeleted
-- 5. 关联账款管理的表：supplier, customer, product, warehouse, account
-- 6. 自己维护的表：snCode, snLog, stockInOrder, stockInItem, stockOutOrder, stockOutItem,
--                   purchaseReturnOrder, purchaseReturnItem, saleReturnOrder, saleReturnItem,
--                   transferOrder, transferItem, checkOrder, checkItem

-- ============================================================
-- 一、基础资料表（数据来自账款管理同步）
-- ============================================================

-- 1. 供应商表
CREATE TABLE supplier (
    id BIGINT PRIMARY KEY COMMENT '主键ID',
    supplierCode VARCHAR(50) COMMENT '供应商编码',
    supplierName VARCHAR(200) COMMENT '供应商名称',
    contactPerson VARCHAR(100) COMMENT '联系人',
    contactPhone VARCHAR(50) COMMENT '联系电话',
    address VARCHAR(500) COMMENT '地址',
    bankName VARCHAR(200) COMMENT '开户银行',
    bankAccount VARCHAR(100) COMMENT '银行账号',
    taxNumber VARCHAR(50) COMMENT '税号',
    enabled BOOLEAN DEFAULT TRUE COMMENT '是否启用',
    createTime DATETIME COMMENT '创建时间',
    updateTime DATETIME COMMENT '更新时间',
    isDeleted BOOLEAN DEFAULT FALSE COMMENT '软删除标志'
);

-- 2. 客户表
CREATE TABLE customer (
    id BIGINT PRIMARY KEY COMMENT '主键ID',
    customerCode VARCHAR(50) COMMENT '客户编码',
    customerName VARCHAR(200) COMMENT '客户名称',
    customerType VARCHAR(20) COMMENT '客户类型：RETAIL-零售，WHOLESALE-批发',
    contactPerson VARCHAR(100) COMMENT '联系人',
    contactPhone VARCHAR(50) COMMENT '联系电话',
    province VARCHAR(50) COMMENT '省份',
    city VARCHAR(50) COMMENT '城市',
    district VARCHAR(50) COMMENT '区县',
    address VARCHAR(500) COMMENT '详细地址',
    bankName VARCHAR(200) COMMENT '开户银行',
    bankAccount VARCHAR(100) COMMENT '银行账号',
    taxNumber VARCHAR(50) COMMENT '税号',
    creditLimit DECIMAL(15,2) DEFAULT 0 COMMENT '信用额度',
    enabled BOOLEAN DEFAULT TRUE COMMENT '是否启用',
    createTime DATETIME COMMENT '创建时间',
    updateTime DATETIME COMMENT '更新时间',
    isDeleted BOOLEAN DEFAULT FALSE COMMENT '软删除标志'
);

-- 3. 商品表
CREATE TABLE product (
    id BIGINT PRIMARY KEY COMMENT '主键ID',
    productCode VARCHAR(50) COMMENT '商品编码',
    productName VARCHAR(200) COMMENT '商品名称',
    productType VARCHAR(50) COMMENT '商品类型：ROBOT-扫地机器人，FURNITURE-家具',
    brand VARCHAR(100) COMMENT '品牌',
    category VARCHAR(100) COMMENT '分类',
    spec VARCHAR(200) COMMENT '规格型号',
    unit VARCHAR(20) DEFAULT '台' COMMENT '单位',
    costPrice DECIMAL(15,2) DEFAULT 0 COMMENT '成本价',
    salePrice DECIMAL(15,2) DEFAULT 0 COMMENT '销售价',
    retailPrice DECIMAL(15,2) DEFAULT 0 COMMENT '零售价',
    barCode VARCHAR(100) COMMENT '条形码',
    imageUrl VARCHAR(500) COMMENT '商品图片',
    enabled BOOLEAN DEFAULT TRUE COMMENT '是否启用',
    createTime DATETIME COMMENT '创建时间',
    updateTime DATETIME COMMENT '更新时间',
    isDeleted BOOLEAN DEFAULT FALSE COMMENT '软删除标志'
);

-- 4. 仓库表
CREATE TABLE warehouse (
    id BIGINT PRIMARY KEY COMMENT '主键ID',
    warehouseCode VARCHAR(50) COMMENT '仓库编码',
    warehouseName VARCHAR(200) COMMENT '仓库名称',
    warehouseType VARCHAR(20) COMMENT '仓库类型：MAIN-主仓，BRANCH-分仓，STORE-门店',
    province VARCHAR(50) COMMENT '省份',
    city VARCHAR(50) COMMENT '城市',
    address VARCHAR(500) COMMENT '详细地址',
    manager VARCHAR(100) COMMENT '负责人',
    contactPhone VARCHAR(50) COMMENT '联系电话',
    isDefault BOOLEAN DEFAULT FALSE COMMENT '是否默认仓库',
    enabled BOOLEAN DEFAULT TRUE COMMENT '是否启用',
    createTime DATETIME COMMENT '创建时间',
    updateTime DATETIME COMMENT '更新时间',
    isDeleted BOOLEAN DEFAULT FALSE COMMENT '软删除标志'
);

-- 5. 账户表
CREATE TABLE account (
    id BIGINT PRIMARY KEY COMMENT '主键ID',
    accountCode VARCHAR(50) COMMENT '账户编码',
    accountName VARCHAR(200) COMMENT '账户名称',
    accountType VARCHAR(20) COMMENT '账户类型：CASH-现金，BANK-银行，WECHAT-微信，ALIPAY-支付宝',
    bankName VARCHAR(200) COMMENT '开户银行',
    bankAccount VARCHAR(100) COMMENT '银行账号',
    initialBalance DECIMAL(15,2) DEFAULT 0 COMMENT '起初余额',
    currentBalance DECIMAL(15,2) DEFAULT 0 COMMENT '当前余额',
    isDefault BOOLEAN DEFAULT FALSE COMMENT '是否默认账户',
    enabled BOOLEAN DEFAULT TRUE COMMENT '是否启用',
    createTime DATETIME COMMENT '创建时间',
    updateTime DATETIME COMMENT '更新时间',
    isDeleted BOOLEAN DEFAULT FALSE COMMENT '软删除标志'
);

-- ============================================================
-- 二、SN码核心表
-- ============================================================

-- 6. SN码表
CREATE TABLE sn_code (
    id BIGINT PRIMARY KEY COMMENT '主键ID',
    snCode VARCHAR(100) NOT NULL UNIQUE COMMENT 'SN码',
    productId BIGINT COMMENT '商品ID',
    productCode VARCHAR(50) COMMENT '商品编码',
    productName VARCHAR(200) COMMENT '商品名称',
    productSpec VARCHAR(200) COMMENT '商品规格',
    status VARCHAR(20) NOT NULL DEFAULT 'PURCHASED' COMMENT '状态：PURCHASED-已采购，INSTOCK-已入库，SOLD-已销售，RETURN-已退货，SCRAPPED-已报废',
    warehouseId BIGINT COMMENT '当前仓库ID',
    warehouseName VARCHAR(200) COMMENT '当前仓库名称',
    supplierId BIGINT COMMENT '供应商ID',
    purchaseOrderNo VARCHAR(50) COMMENT '采购单号',
    stockInOrderNo VARCHAR(50) COMMENT '入库单号',
    stockInTime DATETIME COMMENT '入库时间',
    saleOrderNo VARCHAR(50) COMMENT '销售单号',
    stockOutOrderNo VARCHAR(50) COMMENT '出库单号',
    stockOutTime DATETIME COMMENT '出库时间',
    customerId BIGINT COMMENT '客户ID',
    customerName VARCHAR(200) COMMENT '客户名称',
    costPrice DECIMAL(15,2) COMMENT '成本价',
    salePrice DECIMAL(15,2) COMMENT '销售价',
    remark VARCHAR(500) COMMENT '备注',
    createTime DATETIME COMMENT '创建时间',
    updateTime DATETIME COMMENT '更新时间',
    isDeleted BOOLEAN DEFAULT FALSE COMMENT '软删除标志'
);

-- 7. SN操作日志表
CREATE TABLE sn_log (
    id BIGINT PRIMARY KEY COMMENT '主键ID',
    snCode VARCHAR(100) NOT NULL COMMENT 'SN码',
    snId BIGINT COMMENT 'SN码ID',
    productName VARCHAR(200) COMMENT '商品名称',
    operationType VARCHAR(50) NOT NULL COMMENT '操作类型：PURCHASE-采购，STOCK_IN-入库，STOCK_OUT-出库，TRANSFER-调拨，RETURN_IN-退货入库，RETURN_OUT-退货出库，SCRAP-报废',
    orderNo VARCHAR(50) COMMENT '关联单号',
    orderType VARCHAR(50) COMMENT '单据类型',
    fromWarehouseId BIGINT COMMENT '源仓库ID',
    fromWarehouseName VARCHAR(200) COMMENT '源仓库名称',
    toWarehouseId BIGINT COMMENT '目标仓库ID',
    toWarehouseName VARCHAR(200) COMMENT '目标仓库名称',
    operator VARCHAR(100) COMMENT '操作人',
    remark VARCHAR(500) COMMENT '备注',
    createTime DATETIME COMMENT '创建时间',
    isDeleted BOOLEAN DEFAULT FALSE COMMENT '软删除标志'
);

-- ============================================================
-- 三、采购管理表
-- ============================================================

-- 8. 采购入库单主表
CREATE TABLE stock_in_order (
    id BIGINT PRIMARY KEY COMMENT '主键ID',
    orderNo VARCHAR(50) NOT NULL UNIQUE COMMENT '入库单号',
    orderType VARCHAR(20) DEFAULT 'PURCHASE' COMMENT '单据类型：PURCHASE-采购入库，PURCHASE_RETURN-采购退货出库',
    supplierId BIGINT COMMENT '供应商ID',
    supplierName VARCHAR(200) COMMENT '供应商名称',
    warehouseId BIGINT COMMENT '仓库ID',
    warehouseName VARCHAR(200) COMMENT '仓库名称',
    totalAmount DECIMAL(15,2) DEFAULT 0 COMMENT '单据总金额',
    paidAmount DECIMAL(15,2) DEFAULT 0 COMMENT '已付款金额',
    unpaidAmount DECIMAL(15,2) DEFAULT 0 COMMENT '未付款金额',
    invoiceNo VARCHAR(50) COMMENT '发票号',
    handler VARCHAR(100) COMMENT '经办人',
    department VARCHAR(100) COMMENT '部门',
    remark VARCHAR(500) COMMENT '备注',
    status VARCHAR(20) DEFAULT 'PENDING' COMMENT '状态：PENDING-待入库，COMPLETED-已完成，CANCELLED-已取消',
    operator VARCHAR(100) COMMENT '操作员',
    createTime DATETIME COMMENT '创建时间',
    updateTime DATETIME COMMENT '更新时间',
    isDeleted BOOLEAN DEFAULT FALSE COMMENT '软删除标志'
);

-- 9. 采购入库单明细表
CREATE TABLE stock_in_item (
    id BIGINT PRIMARY KEY COMMENT '主键ID',
    orderId BIGINT NOT NULL COMMENT '入库单ID',
    orderNo VARCHAR(50) COMMENT '入库单号',
    productId BIGINT COMMENT '商品ID',
    productCode VARCHAR(50) COMMENT '商品编码',
    productName VARCHAR(200) COMMENT '商品名称',
    productSpec VARCHAR(200) COMMENT '规格型号',
    unit VARCHAR(20) COMMENT '单位',
    quantity INT DEFAULT 0 COMMENT '应入库数量',
    receivedQuantity INT DEFAULT 0 COMMENT '实际入库数量',
    snCount INT DEFAULT 0 COMMENT 'SN码数量',
    price DECIMAL(15,2) DEFAULT 0 COMMENT '单价',
    amount DECIMAL(15,2) DEFAULT 0 COMMENT '金额',
    remark VARCHAR(500) COMMENT '备注',
    createTime DATETIME COMMENT '创建时间',
    isDeleted BOOLEAN DEFAULT FALSE COMMENT '软删除标志'
);

-- ============================================================
-- 四、销售管理表
-- ============================================================

-- 10. 销售出库单主表
CREATE TABLE stock_out_order (
    id BIGINT PRIMARY KEY COMMENT '主键ID',
    orderNo VARCHAR(50) NOT NULL UNIQUE COMMENT '出库单号',
    orderType VARCHAR(20) DEFAULT 'SALE' COMMENT '单据类型：SALE-销售出库，SALE_RETURN-销售退货入库',
    customerId BIGINT COMMENT '客户ID',
    customerName VARCHAR(200) COMMENT '客户名称',
    warehouseId BIGINT COMMENT '仓库ID',
    warehouseName VARCHAR(200) COMMENT '仓库名称',
    totalAmount DECIMAL(15,2) DEFAULT 0 COMMENT '单据总金额',
    receivedAmount DECIMAL(15,2) DEFAULT 0 COMMENT '已收款金额',
    unpaidAmount DECIMAL(15,2) DEFAULT 0 COMMENT '未收款金额',
    discountRate DECIMAL(5,2) DEFAULT 1 COMMENT '折扣率',
    discountAmount DECIMAL(15,2) DEFAULT 0 COMMENT '折扣金额',
    invoiceNo VARCHAR(50) COMMENT '发票号',
    handler VARCHAR(100) COMMENT '经办人',
    department VARCHAR(100) COMMENT '部门',
    deliveryAddress VARCHAR(500) COMMENT '送货地址',
    remark VARCHAR(500) COMMENT '备注',
    status VARCHAR(20) DEFAULT 'PENDING' COMMENT '状态：PENDING-待出库，COMPLETED-已完成，CANCELLED-已取消',
    operator VARCHAR(100) COMMENT '操作员',
    createTime DATETIME COMMENT '创建时间',
    updateTime DATETIME COMMENT '更新时间',
    isDeleted BOOLEAN DEFAULT FALSE COMMENT '软删除标志'
);

-- 11. 销售出库单明细表
CREATE TABLE stock_out_item (
    id BIGINT PRIMARY KEY COMMENT '主键ID',
    orderId BIGINT NOT NULL COMMENT '出库单ID',
    orderNo VARCHAR(50) COMMENT '出库单号',
    productId BIGINT COMMENT '商品ID',
    productCode VARCHAR(50) COMMENT '商品编码',
    productName VARCHAR(200) COMMENT '商品名称',
    productSpec VARCHAR(200) COMMENT '规格型号',
    unit VARCHAR(20) COMMENT '单位',
    quantity INT DEFAULT 0 COMMENT '应出库数量',
    shippedQuantity INT DEFAULT 0 COMMENT '实际出库数量',
    snCount INT DEFAULT 0 COMMENT 'SN码数量',
    price DECIMAL(15,2) DEFAULT 0 COMMENT '单价',
    amount DECIMAL(15,2) DEFAULT 0 COMMENT '金额',
    remark VARCHAR(500) COMMENT '备注',
    createTime DATETIME COMMENT '创建时间',
    isDeleted BOOLEAN DEFAULT FALSE COMMENT '软删除标志'
);

-- ============================================================
-- 五、退货管理表
-- ============================================================

-- 12. 采购退货单主表
CREATE TABLE purchase_return_order (
    id BIGINT PRIMARY KEY COMMENT '主键ID',
    orderNo VARCHAR(50) NOT NULL UNIQUE COMMENT '退货单号',
    sourceOrderNo VARCHAR(50) COMMENT '原采购单号',
    supplierId BIGINT COMMENT '供应商ID',
    supplierName VARCHAR(200) COMMENT '供应商名称',
    warehouseId BIGINT COMMENT '仓库ID',
    warehouseName VARCHAR(200) COMMENT '仓库名称',
    totalAmount DECIMAL(15,2) DEFAULT 0 COMMENT '退货总金额',
    returnAmount DECIMAL(15,2) DEFAULT 0 COMMENT '已退款金额',
    unpaidAmount DECIMAL(15,2) DEFAULT 0 COMMENT '未退款金额',
    reason VARCHAR(500) COMMENT '退货原因',
    handler VARCHAR(100) COMMENT '经办人',
    department VARCHAR(100) COMMENT '部门',
    remark VARCHAR(500) COMMENT '备注',
    status VARCHAR(20) DEFAULT 'PENDING' COMMENT '状态：PENDING-待退货，COMPLETED-已完成，CANCELLED-已取消',
    operator VARCHAR(100) COMMENT '操作员',
    createTime DATETIME COMMENT '创建时间',
    updateTime DATETIME COMMENT '更新时间',
    isDeleted BOOLEAN DEFAULT FALSE COMMENT '软删除标志'
);

-- 13. 采购退货单明细表
CREATE TABLE purchase_return_item (
    id BIGINT PRIMARY KEY COMMENT '主键ID',
    orderId BIGINT NOT NULL COMMENT '退货单ID',
    orderNo VARCHAR(50) COMMENT '退货单号',
    sourceOrderNo VARCHAR(50) COMMENT '原采购单号',
    sourceItemId BIGINT COMMENT '原采购明细ID',
    productId BIGINT COMMENT '商品ID',
    productCode VARCHAR(50) COMMENT '商品编码',
    productName VARCHAR(200) COMMENT '商品名称',
    productSpec VARCHAR(200) COMMENT '规格型号',
    unit VARCHAR(20) COMMENT '单位',
    quantity INT DEFAULT 0 COMMENT '退货数量',
    snCount INT DEFAULT 0 COMMENT 'SN码数量',
    price DECIMAL(15,2) DEFAULT 0 COMMENT '退货单价',
    amount DECIMAL(15,2) DEFAULT 0 COMMENT '退货金额',
    remark VARCHAR(500) COMMENT '备注',
    createTime DATETIME COMMENT '创建时间',
    isDeleted BOOLEAN DEFAULT FALSE COMMENT '软删除标志'
);

-- 14. 销售退货单主表
CREATE TABLE sale_return_order (
    id BIGINT PRIMARY KEY COMMENT '主键ID',
    orderNo VARCHAR(50) NOT NULL UNIQUE COMMENT '退货单号',
    sourceOrderNo VARCHAR(50) COMMENT '原销售单号',
    customerId BIGINT COMMENT '客户ID',
    customerName VARCHAR(200) COMMENT '客户名称',
    warehouseId BIGINT COMMENT '仓库ID',
    warehouseName VARCHAR(200) COMMENT '仓库名称',
    totalAmount DECIMAL(15,2) DEFAULT 0 COMMENT '退货总金额',
    returnAmount DECIMAL(15,2) DEFAULT 0 COMMENT '已退款金额',
    unpaidAmount DECIMAL(15,2) DEFAULT 0 COMMENT '未退款金额',
    reason VARCHAR(500) COMMENT '退货原因',
    handler VARCHAR(100) COMMENT '经办人',
    department VARCHAR(100) COMMENT '部门',
    remark VARCHAR(500) COMMENT '备注',
    status VARCHAR(20) DEFAULT 'PENDING' COMMENT '状态：PENDING-待退货，COMPLETED-已完成，CANCELLED-已取消',
    operator VARCHAR(100) COMMENT '操作员',
    createTime DATETIME COMMENT '创建时间',
    updateTime DATETIME COMMENT '更新时间',
    isDeleted BOOLEAN DEFAULT FALSE COMMENT '软删除标志'
);

-- 15. 销售退货单明细表
CREATE TABLE sale_return_item (
    id BIGINT PRIMARY KEY COMMENT '主键ID',
    orderId BIGINT NOT NULL COMMENT '退货单ID',
    orderNo VARCHAR(50) COMMENT '退货单号',
    sourceOrderNo VARCHAR(50) COMMENT '原销售单号',
    sourceItemId BIGINT COMMENT '原销售明细ID',
    productId BIGINT COMMENT '商品ID',
    productCode VARCHAR(50) COMMENT '商品编码',
    productName VARCHAR(200) COMMENT '商品名称',
    productSpec VARCHAR(200) COMMENT '规格型号',
    unit VARCHAR(20) COMMENT '单位',
    quantity INT DEFAULT 0 COMMENT '退货数量',
    snCount INT DEFAULT 0 COMMENT 'SN码数量',
    price DECIMAL(15,2) DEFAULT 0 COMMENT '退货单价',
    amount DECIMAL(15,2) DEFAULT 0 COMMENT '退货金额',
    remark VARCHAR(500) COMMENT '备注',
    createTime DATETIME COMMENT '创建时间',
    isDeleted BOOLEAN DEFAULT FALSE COMMENT '软删除标志'
);

-- ============================================================
-- 六、仓库管理表
-- ============================================================

-- 16. 调拨单主表
CREATE TABLE transfer_order (
    id BIGINT PRIMARY KEY COMMENT '主键ID',
    orderNo VARCHAR(50) NOT NULL UNIQUE COMMENT '调拨单号',
    outWarehouseId BIGINT COMMENT '调出仓库ID',
    outWarehouseName VARCHAR(200) COMMENT '调出仓库名称',
    inWarehouseId BIGINT COMMENT '调入仓库ID',
    inWarehouseName VARCHAR(200) COMMENT '调入仓库名称',
    totalQuantity INT DEFAULT 0 COMMENT '调拨总数量',
    totalAmount DECIMAL(15,2) DEFAULT 0 COMMENT '调拨总金额',
    handler VARCHAR(100) COMMENT '经办人',
    department VARCHAR(100) COMMENT '部门',
    remark VARCHAR(500) COMMENT '备注',
    status VARCHAR(20) DEFAULT 'PENDING' COMMENT '状态：PENDING-待调拨，COMPLETED-已完成，CANCELLED-已取消',
    operator VARCHAR(100) COMMENT '操作员',
    createTime DATETIME COMMENT '创建时间',
    updateTime DATETIME COMMENT '更新时间',
    isDeleted BOOLEAN DEFAULT FALSE COMMENT '软删除标志'
);

-- 17. 调拨单明细表
CREATE TABLE transfer_item (
    id BIGINT PRIMARY KEY COMMENT '主键ID',
    orderId BIGINT NOT NULL COMMENT '调拨单ID',
    orderNo VARCHAR(50) COMMENT '调拨单号',
    productId BIGINT COMMENT '商品ID',
    productCode VARCHAR(50) COMMENT '商品编码',
    productName VARCHAR(200) COMMENT '商品名称',
    productSpec VARCHAR(200) COMMENT '规格型号',
    unit VARCHAR(20) COMMENT '单位',
    quantity INT DEFAULT 0 COMMENT '调拨数量',
    snCount INT DEFAULT 0 COMMENT 'SN码数量',
    price DECIMAL(15,2) DEFAULT 0 COMMENT '单价',
    amount DECIMAL(15,2) DEFAULT 0 COMMENT '金额',
    remark VARCHAR(500) COMMENT '备注',
    createTime DATETIME COMMENT '创建时间',
    isDeleted BOOLEAN DEFAULT FALSE COMMENT '软删除标志'
);

-- 18. 盘点单主表
CREATE TABLE check_order (
    id BIGINT PRIMARY KEY COMMENT '主键ID',
    orderNo VARCHAR(50) NOT NULL UNIQUE COMMENT '盘点单号',
    warehouseId BIGINT COMMENT '仓库ID',
    warehouseName VARCHAR(200) COMMENT '仓库名称',
    checkDate DATE COMMENT '盘点日期',
    totalBookQuantity INT DEFAULT 0 COMMENT '账面总数量',
    totalActualQuantity INT DEFAULT 0 COMMENT '实盘总数量',
    totalProfitQuantity INT DEFAULT 0 COMMENT '盘盈总数量',
    totalLossQuantity INT DEFAULT 0 COMMENT '盘亏总数量',
    totalProfitAmount DECIMAL(15,2) DEFAULT 0 COMMENT '盘盈总金额',
    totalLossAmount DECIMAL(15,2) DEFAULT 0 COMMENT '盘亏总金额',
    adjustAccount VARCHAR(200) COMMENT '调整科目',
    voucherNo VARCHAR(50) COMMENT '凭证号',
    handler VARCHAR(100) COMMENT '经办人',
    department VARCHAR(100) COMMENT '部门',
    remark VARCHAR(500) COMMENT '备注',
    status VARCHAR(20) DEFAULT 'PENDING' COMMENT '状态：PENDING-盘点中，COMPLETED-已完成',
    operator VARCHAR(100) COMMENT '操作员',
    createTime DATETIME COMMENT '创建时间',
    updateTime DATETIME COMMENT '更新时间',
    isDeleted BOOLEAN DEFAULT FALSE COMMENT '软删除标志'
);

-- 19. 盘点单明细表
CREATE TABLE check_item (
    id BIGINT PRIMARY KEY COMMENT '主键ID',
    orderId BIGINT NOT NULL COMMENT '盘点单ID',
    orderNo VARCHAR(50) COMMENT '盘点单号',
    productId BIGINT COMMENT '商品ID',
    productCode VARCHAR(50) COMMENT '商品编码',
    productName VARCHAR(200) COMMENT '商品名称',
    productSpec VARCHAR(200) COMMENT '规格型号',
    unit VARCHAR(20) COMMENT '单位',
    bookQuantity INT DEFAULT 0 COMMENT '账面数量',
    actualQuantity INT DEFAULT 0 COMMENT '实盘数量',
    profitQuantity INT DEFAULT 0 COMMENT '盘盈数量',
    lossQuantity INT DEFAULT 0 COMMENT '盘亏数量',
    price DECIMAL(15,2) DEFAULT 0 COMMENT '单价',
    profitAmount DECIMAL(15,2) DEFAULT 0 COMMENT '盘盈金额',
    lossAmount DECIMAL(15,2) DEFAULT 0 COMMENT '盘亏金额',
    remark VARCHAR(500) COMMENT '备注',
    createTime DATETIME COMMENT '创建时间',
    isDeleted BOOLEAN DEFAULT FALSE COMMENT '软删除标志'
);

-- ============================================================
-- 索引
-- ============================================================
CREATE INDEX idx_sn_code ON sn_code(snCode);
CREATE INDEX idx_sn_status ON sn_code(status);
CREATE INDEX idx_sn_product ON sn_code(productId);
CREATE INDEX idx_sn_warehouse ON sn_code(warehouseId);
CREATE INDEX idx_sn_log_sn ON sn_log(snCode);
CREATE INDEX idx_sn_log_operation ON sn_log(operationType);
CREATE INDEX idx_stock_in_order ON stock_in_order(orderNo);
CREATE INDEX idx_stock_in_order_supplier ON stock_in_order(supplierId);
CREATE INDEX idx_stock_in_item_order ON stock_in_item(orderId);
CREATE INDEX idx_stock_out_order ON stock_out_order(orderNo);
CREATE INDEX idx_stock_out_order_customer ON stock_out_order(customerId);
CREATE INDEX idx_stock_out_item_order ON stock_out_item(orderId);
CREATE INDEX idx_purchase_return_order ON purchase_return_order(orderNo);
CREATE INDEX idx_purchase_return_item_order ON purchase_return_item(orderId);
CREATE INDEX idx_sale_return_order ON sale_return_order(orderNo);
CREATE INDEX idx_sale_return_item_order ON sale_return_item(orderId);
CREATE INDEX idx_transfer_order ON transfer_order(orderNo);
CREATE INDEX idx_transfer_item_order ON transfer_item(orderId);
CREATE INDEX idx_check_order ON check_order(orderNo);
CREATE INDEX idx_check_order_warehouse ON check_order(warehouseId);
CREATE INDEX idx_check_item_order ON check_item(orderId);
