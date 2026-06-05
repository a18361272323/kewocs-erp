// Auto-generated from docs/MODEL_API_DOCS.md. Do not edit by hand.
// Run `npm run gen:api-contracts` after updating platform model docs.
export const MODEL_METHOD_CONTRACTS = {
  "MO08KyO9eU": {
    "fields": [
      "remark",
      "external_bill_status",
      "external_bill_no",
      "sync_time",
      "sync_status",
      "due_date",
      "bill_date",
      "balance_amount",
      "paid_amount",
      "amount",
      "counterparty_name",
      "counterparty_code",
      "counterparty_id",
      "counterparty_type",
      "biz_type",
      "source_no",
      "source_type",
      "flow_no",
      "id",
      "creator",
      "created_at",
      "updater",
      "updated_at",
      "is_deleted",
      "deleted_at"
    ],
    "methods": {
      "FUilTGHdFd": {
        "name": "getSummaryByType",
        "inputs": []
      },
      "FUCxUCbjdm": {
        "name": "getCounterpartySummary",
        "inputs": [
          "counterparty_id"
        ]
      },
      "FUH9BA8mXe": {
        "name": "getTodaySummary",
        "inputs": []
      },
      "FUC3UiW4pU": {
        "name": "列表查询",
        "inputs": [
          "amount",
          "balance_amount",
          "bill_date_end",
          "bill_date_start",
          "biz_type",
          "counterparty_code",
          "counterparty_id",
          "counterparty_name",
          "counterparty_type",
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "due_date_end",
          "due_date_start",
          "external_bill_no",
          "external_bill_status",
          "flow_no",
          "id",
          "pageSize",
          "paid_amount",
          "remark",
          "source_no",
          "source_type",
          "sync_status",
          "sync_time_end",
          "sync_time_start",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "orders"
        ]
      },
      "FUPktENU4l": {
        "name": "新增",
        "inputs": [
          "amount",
          "balance_amount",
          "bill_date",
          "biz_type",
          "counterparty_code",
          "counterparty_id",
          "counterparty_name",
          "counterparty_type",
          "due_date",
          "external_bill_no",
          "external_bill_status",
          "flow_no",
          "paid_amount",
          "remark",
          "source_no",
          "source_type",
          "sync_status",
          "sync_time"
        ]
      },
      "FUv6I0mjhC": {
        "name": "编辑",
        "inputs": [
          "amount",
          "balance_amount",
          "bill_date",
          "biz_type",
          "counterparty_code",
          "counterparty_id",
          "counterparty_name",
          "counterparty_type",
          "due_date",
          "external_bill_no",
          "external_bill_status",
          "flow_no",
          "id",
          "paid_amount",
          "remark",
          "source_no",
          "source_type",
          "sync_status",
          "sync_time"
        ]
      },
      "FUqDwSMSGq": {
        "name": "查看详情",
        "inputs": [
          "id"
        ]
      },
      "FUkRzzgZ8H": {
        "name": "删除",
        "inputs": [
          "id"
        ]
      },
      "FUxySmGeBj": {
        "name": "批量删除",
        "inputs": [
          "ids"
        ]
      },
      "FUIx58oD8g": {
        "name": "批量导出",
        "inputs": [
          "amount",
          "balance_amount",
          "bill_date_end",
          "bill_date_start",
          "biz_type",
          "counterparty_code",
          "counterparty_id",
          "counterparty_name",
          "counterparty_type",
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "due_date_end",
          "due_date_start",
          "external_bill_no",
          "external_bill_status",
          "flow_no",
          "id",
          "pageSize",
          "paid_amount",
          "remark",
          "source_no",
          "source_type",
          "sync_status",
          "sync_time_end",
          "sync_time_start",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "orders"
        ]
      },
      "FUIJibQIpw": {
        "name": "批量导入",
        "inputs": []
      }
    }
  },
  "MOsWdYRJhQ": {
    "fields": [
      "price",
      "sn_quantity",
      "quantity",
      "unit",
      "product_code",
      "product_name",
      "product_id",
      "warehouse_name",
      "warehouse_id",
      "id",
      "creator",
      "created_at",
      "updater",
      "updated_at",
      "is_deleted",
      "deleted_at"
    ],
    "methods": {
      "FU9aGv2Zuh": {
        "name": "getAlertList",
        "inputs": [
          "threshold"
        ]
      },
      "FU3ZfaZLPj": {
        "name": "getWarehouseSummary",
        "inputs": []
      },
      "FUhzR97DOC": {
        "name": "getLowStockCount",
        "inputs": [
          "threshold"
        ]
      },
      "FUsb8iYjRh": {
        "name": "列表查询",
        "inputs": [
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "pageSize",
          "price",
          "product_code",
          "product_id",
          "product_name",
          "quantity",
          "sn_quantity",
          "unit",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "warehouse_id",
          "warehouse_name",
          "orders"
        ]
      },
      "FU8Xen8xzH": {
        "name": "新增",
        "inputs": [
          "price",
          "product_code",
          "product_id",
          "product_name",
          "quantity",
          "sn_quantity",
          "unit",
          "warehouse_id",
          "warehouse_name"
        ]
      },
      "FUAkUucCVl": {
        "name": "编辑",
        "inputs": [
          "id",
          "price",
          "product_code",
          "product_id",
          "product_name",
          "quantity",
          "sn_quantity",
          "unit",
          "warehouse_id",
          "warehouse_name"
        ]
      },
      "FUY1usgMs9": {
        "name": "查看详情",
        "inputs": [
          "id"
        ]
      },
      "FUxQYz4UvO": {
        "name": "删除",
        "inputs": [
          "id"
        ]
      },
      "FUpUpom9SD": {
        "name": "批量删除",
        "inputs": [
          "ids"
        ]
      },
      "FUCoyQz1g4": {
        "name": "批量导出",
        "inputs": [
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "pageSize",
          "price",
          "product_code",
          "product_id",
          "product_name",
          "quantity",
          "sn_quantity",
          "unit",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "warehouse_id",
          "warehouse_name",
          "orders"
        ]
      },
      "FUPgHEgw07": {
        "name": "批量导入",
        "inputs": []
      }
    }
  },
  "MO0T3mVifs": {
    "fields": [
      "remark",
      "profitamount",
      "price",
      "profitquantity",
      "actualquantity",
      "bookquantity",
      "unit",
      "productcode",
      "productname",
      "productid",
      "orderno",
      "orderid",
      "id",
      "creator",
      "created_at",
      "updater",
      "updated_at",
      "is_deleted",
      "deleted_at"
    ],
    "methods": {
      "FUjedwjYjd": {
        "name": "列表查询",
        "inputs": [
          "actualquantity",
          "bookquantity",
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "orderid",
          "orderno",
          "pageSize",
          "price",
          "productcode",
          "productid",
          "productname",
          "profitamount",
          "profitquantity",
          "remark",
          "unit",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "orders"
        ]
      },
      "FUf8uvechL": {
        "name": "新增",
        "inputs": [
          "actualquantity",
          "bookquantity",
          "orderid",
          "orderno",
          "price",
          "productcode",
          "productid",
          "productname",
          "profitamount",
          "profitquantity",
          "remark",
          "unit"
        ]
      },
      "FUffcWxmy3": {
        "name": "编辑",
        "inputs": [
          "actualquantity",
          "bookquantity",
          "id",
          "orderid",
          "orderno",
          "price",
          "productcode",
          "productid",
          "productname",
          "profitamount",
          "profitquantity",
          "remark",
          "unit"
        ]
      },
      "FUYcsnH60S": {
        "name": "查看详情",
        "inputs": [
          "id"
        ]
      },
      "FUuPMOZ2eU": {
        "name": "删除",
        "inputs": [
          "id"
        ]
      },
      "FULTQq4Skg": {
        "name": "批量删除",
        "inputs": [
          "ids"
        ]
      },
      "FUUSqlUKzq": {
        "name": "批量导出",
        "inputs": [
          "actualquantity",
          "bookquantity",
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "orderid",
          "orderno",
          "pageSize",
          "price",
          "productcode",
          "productid",
          "productname",
          "profitamount",
          "profitquantity",
          "remark",
          "unit",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "orders"
        ]
      },
      "FUAEDRFBQ5": {
        "name": "批量导入",
        "inputs": []
      }
    }
  },
  "MO5WOkA9SX": {
    "fields": [
      "operator_name",
      "operator_id",
      "remark",
      "status",
      "total_profit_amount",
      "total_profit_quantity",
      "total_actual_quantity",
      "total_book_quantity",
      "voucher_no",
      "adjust_account",
      "warehouse_name",
      "warehouse_id",
      "order_date",
      "order_no",
      "id",
      "creator",
      "created_at",
      "updater",
      "updated_at",
      "is_deleted",
      "deleted_at"
    ],
    "methods": {
      "FUQ56UBDHj": {
        "name": "列表查询",
        "inputs": [
          "adjust_account",
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "operator_id",
          "operator_name",
          "order_date_end",
          "order_date_start",
          "order_no",
          "pageSize",
          "remark",
          "status",
          "total_actual_quantity",
          "total_book_quantity",
          "total_profit_amount",
          "total_profit_quantity",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "voucher_no",
          "warehouse_id",
          "warehouse_name",
          "orders"
        ]
      },
      "FUaAS7yYvZ": {
        "name": "新增",
        "inputs": [
          "adjust_account",
          "operator_id",
          "operator_name",
          "order_date",
          "order_no",
          "remark",
          "status",
          "total_actual_quantity",
          "total_book_quantity",
          "total_profit_amount",
          "total_profit_quantity",
          "voucher_no",
          "warehouse_id",
          "warehouse_name"
        ]
      },
      "FU6H93URI8": {
        "name": "编辑",
        "inputs": [
          "adjust_account",
          "id",
          "operator_id",
          "operator_name",
          "order_date",
          "order_no",
          "remark",
          "status",
          "total_actual_quantity",
          "total_book_quantity",
          "total_profit_amount",
          "total_profit_quantity",
          "voucher_no",
          "warehouse_id",
          "warehouse_name"
        ]
      },
      "FUefEHSt2t": {
        "name": "查看详情",
        "inputs": [
          "id"
        ]
      },
      "FUlNcPIkiO": {
        "name": "删除",
        "inputs": [
          "id"
        ]
      },
      "FUmjgz0Nhc": {
        "name": "批量删除",
        "inputs": [
          "ids"
        ]
      },
      "FUOScIIzUX": {
        "name": "批量导出",
        "inputs": [
          "adjust_account",
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "operator_id",
          "operator_name",
          "order_date_end",
          "order_date_start",
          "order_no",
          "pageSize",
          "remark",
          "status",
          "total_actual_quantity",
          "total_book_quantity",
          "total_profit_amount",
          "total_profit_quantity",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "voucher_no",
          "warehouse_id",
          "warehouse_name",
          "orders"
        ]
      },
      "FU61w84DwD": {
        "name": "批量导入",
        "inputs": []
      }
    }
  },
  "MOORe8J0Dl": {
    "fields": [
      "remark",
      "sn_codes",
      "sn_count",
      "amount",
      "price",
      "quantity",
      "unit",
      "product_code",
      "product_name",
      "product_id",
      "order_no",
      "order_id",
      "id",
      "creator",
      "created_at",
      "updater",
      "updated_at",
      "is_deleted",
      "deleted_at"
    ],
    "methods": {
      "FU7HVtbbuq": {
        "name": "列表查询",
        "inputs": [
          "amount",
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "order_id",
          "order_no",
          "pageSize",
          "price",
          "product_code",
          "product_id",
          "product_name",
          "quantity",
          "remark",
          "sn_codes",
          "sn_count",
          "unit",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "orders"
        ]
      },
      "FU0OPw5rsy": {
        "name": "新增",
        "inputs": [
          "amount",
          "order_id",
          "order_no",
          "price",
          "product_code",
          "product_id",
          "product_name",
          "quantity",
          "remark",
          "sn_codes",
          "sn_count",
          "unit"
        ]
      },
      "FU2apUUpTE": {
        "name": "编辑",
        "inputs": [
          "amount",
          "id",
          "order_id",
          "order_no",
          "price",
          "product_code",
          "product_id",
          "product_name",
          "quantity",
          "remark",
          "sn_codes",
          "sn_count",
          "unit"
        ]
      },
      "FUSEEGDgYd": {
        "name": "查看详情",
        "inputs": [
          "id"
        ]
      },
      "FURjMexO9w": {
        "name": "删除",
        "inputs": [
          "id"
        ]
      },
      "FUMWrdtwSb": {
        "name": "批量删除",
        "inputs": [
          "ids"
        ]
      },
      "FUdpY1IH5R": {
        "name": "批量导出",
        "inputs": [
          "amount",
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "order_id",
          "order_no",
          "pageSize",
          "price",
          "product_code",
          "product_id",
          "product_name",
          "quantity",
          "remark",
          "sn_codes",
          "sn_count",
          "unit",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "orders"
        ]
      },
      "FU0uBYXqm9": {
        "name": "批量导入",
        "inputs": []
      }
    }
  },
  "MOIrlRmiFH": {
    "fields": [
      "operator_name",
      "operator_id",
      "remark",
      "status",
      "total_amount",
      "total_quantity",
      "in_warehouse_name",
      "in_warehouse_id",
      "out_warehouse_name",
      "out_warehouse_id",
      "order_date",
      "order_no",
      "total_quantity",
      "id",
      "creator",
      "created_at",
      "updater",
      "updated_at",
      "is_deleted",
      "deleted_at"
    ],
    "methods": {
      "FUW5FAbNha": {
        "name": "列表查询",
        "inputs": [
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "in_warehouse_id",
          "in_warehouse_name",
          "operator_id",
          "operator_name",
          "order_date_end",
          "order_date_start",
          "order_no",
          "out_warehouse_id",
          "out_warehouse_name",
          "pageSize",
          "remark",
          "status",
          "total_amount",
          "total_quantity",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "orders"
        ]
      },
      "FUDC3wl6P8": {
        "name": "新增",
        "inputs": [
          "in_warehouse_id",
          "in_warehouse_name",
          "operator_id",
          "operator_name",
          "order_date",
          "order_no",
          "out_warehouse_id",
          "out_warehouse_name",
          "remark",
          "status",
          "total_amount",
          "total_quantity"
        ]
      },
      "FUhakKYGcF": {
        "name": "编辑",
        "inputs": [
          "id",
          "in_warehouse_id",
          "in_warehouse_name",
          "operator_id",
          "operator_name",
          "order_date",
          "order_no",
          "out_warehouse_id",
          "out_warehouse_name",
          "remark",
          "status",
          "total_amount",
          "total_quantity"
        ]
      },
      "FU6Xezd5Pb": {
        "name": "查看详情",
        "inputs": [
          "id"
        ]
      },
      "FUWPKGnSWG": {
        "name": "删除",
        "inputs": [
          "id"
        ]
      },
      "FU3tKvMjiB": {
        "name": "批量删除",
        "inputs": [
          "ids"
        ]
      },
      "FUgNmAK4ZF": {
        "name": "批量导出",
        "inputs": [
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "in_warehouse_id",
          "in_warehouse_name",
          "operator_id",
          "operator_name",
          "order_date_end",
          "order_date_start",
          "order_no",
          "out_warehouse_id",
          "out_warehouse_name",
          "pageSize",
          "remark",
          "status",
          "total_amount",
          "total_quantity",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "orders"
        ]
      },
      "FUQdkyhrvX": {
        "name": "批量导入",
        "inputs": []
      }
    }
  },
  "MOHwXl5rMK": {
    "fields": [
      "remark",
      "sn_codes",
      "sn_count",
      "amount",
      "price",
      "quantity",
      "unit",
      "product_code",
      "product_name",
      "product_id",
      "order_no",
      "order_id",
      "id",
      "creator",
      "created_at",
      "updater",
      "updated_at",
      "is_deleted",
      "deleted_at"
    ],
    "methods": {
      "FUsSZubXQP": {
        "name": "列表查询",
        "inputs": [
          "amount",
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "order_id",
          "order_no",
          "pageSize",
          "price",
          "product_code",
          "product_id",
          "product_name",
          "quantity",
          "remark",
          "sn_codes",
          "sn_count",
          "unit",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "orders"
        ]
      },
      "FUPWcYQRZH": {
        "name": "新增",
        "inputs": [
          "amount",
          "order_id",
          "order_no",
          "price",
          "product_code",
          "product_id",
          "product_name",
          "quantity",
          "remark",
          "sn_codes",
          "sn_count",
          "unit"
        ]
      },
      "FUXFdIKzWu": {
        "name": "编辑",
        "inputs": [
          "amount",
          "id",
          "order_id",
          "order_no",
          "price",
          "product_code",
          "product_id",
          "product_name",
          "quantity",
          "remark",
          "sn_codes",
          "sn_count",
          "unit"
        ]
      },
      "FUNV5MqtFR": {
        "name": "查看详情",
        "inputs": [
          "id"
        ]
      },
      "FUJILPWTi7": {
        "name": "删除",
        "inputs": [
          "id"
        ]
      },
      "FU3OO09WcA": {
        "name": "批量删除",
        "inputs": [
          "ids"
        ]
      },
      "FU9F9JVVvI": {
        "name": "批量导出",
        "inputs": [
          "amount",
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "order_id",
          "order_no",
          "pageSize",
          "price",
          "product_code",
          "product_id",
          "product_name",
          "quantity",
          "remark",
          "sn_codes",
          "sn_count",
          "unit",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "orders"
        ]
      },
      "FUEBb02ZQJ": {
        "name": "批量导入",
        "inputs": []
      }
    }
  },
  "MOky0Pcw6W": {
    "fields": [
      "operator_name",
      "operator_id",
      "remark",
      "status",
      "total_amount",
      "source_order_no",
      "warehouse_name",
      "warehouse_id",
      "customer_name",
      "customer_id",
      "order_date",
      "order_no",
      "id",
      "creator",
      "created_at",
      "updater",
      "updated_at",
      "is_deleted",
      "deleted_at"
    ],
    "methods": {
      "FUQI57ueUm": {
        "name": "列表查询",
        "inputs": [
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "customer_id",
          "customer_name",
          "id",
          "operator_id",
          "operator_name",
          "order_date_end",
          "order_date_start",
          "order_no",
          "pageSize",
          "remark",
          "source_order_no",
          "status",
          "total_amount",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "warehouse_id",
          "warehouse_name",
          "orders"
        ]
      },
      "FUg7l9v2dQ": {
        "name": "新增",
        "inputs": [
          "customer_id",
          "customer_name",
          "operator_id",
          "operator_name",
          "order_date",
          "order_no",
          "remark",
          "source_order_no",
          "status",
          "total_amount",
          "warehouse_id",
          "warehouse_name"
        ]
      },
      "FUXY7dYmUj": {
        "name": "编辑",
        "inputs": [
          "customer_id",
          "customer_name",
          "id",
          "operator_id",
          "operator_name",
          "order_date",
          "order_no",
          "remark",
          "source_order_no",
          "status",
          "total_amount",
          "warehouse_id",
          "warehouse_name"
        ]
      },
      "FU1gan9X1c": {
        "name": "查看详情",
        "inputs": [
          "id"
        ]
      },
      "FUX4qpKVVC": {
        "name": "删除",
        "inputs": [
          "id"
        ]
      },
      "FUrGq8jTi7": {
        "name": "批量删除",
        "inputs": [
          "ids"
        ]
      },
      "FUAj4U6Jv5": {
        "name": "批量导出",
        "inputs": [
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "customer_id",
          "customer_name",
          "id",
          "operator_id",
          "operator_name",
          "order_date_end",
          "order_date_start",
          "order_no",
          "pageSize",
          "remark",
          "source_order_no",
          "status",
          "total_amount",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "warehouse_id",
          "warehouse_name",
          "orders"
        ]
      },
      "FU8uzCdJzp": {
        "name": "批量导入",
        "inputs": []
      }
    }
  },
  "MOkM8P1d1B": {
    "fields": [
      "remark",
      "sn_codes",
      "sn_count",
      "amount",
      "price",
      "quantity",
      "unit",
      "product_code",
      "product_name",
      "product_id",
      "order_no",
      "order_id",
      "id",
      "creator",
      "created_at",
      "updater",
      "updated_at",
      "is_deleted",
      "deleted_at"
    ],
    "methods": {
      "FU0Ni6lOWq": {
        "name": "列表查询",
        "inputs": [
          "amount",
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "order_id",
          "order_no",
          "pageSize",
          "price",
          "product_code",
          "product_id",
          "product_name",
          "quantity",
          "remark",
          "sn_codes",
          "sn_count",
          "unit",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "orders"
        ]
      },
      "FU5qSwqWsW": {
        "name": "新增",
        "inputs": [
          "amount",
          "order_id",
          "order_no",
          "price",
          "product_code",
          "product_id",
          "product_name",
          "quantity",
          "remark",
          "sn_codes",
          "sn_count",
          "unit"
        ]
      },
      "FU29Cq0hVc": {
        "name": "编辑",
        "inputs": [
          "amount",
          "id",
          "order_id",
          "order_no",
          "price",
          "product_code",
          "product_id",
          "product_name",
          "quantity",
          "remark",
          "sn_codes",
          "sn_count",
          "unit"
        ]
      },
      "FU8pDdlcYD": {
        "name": "查看详情",
        "inputs": [
          "id"
        ]
      },
      "FUgvKTGWiX": {
        "name": "删除",
        "inputs": [
          "id"
        ]
      },
      "FUXF7X6pzL": {
        "name": "批量删除",
        "inputs": [
          "ids"
        ]
      },
      "FUc4qCd4MA": {
        "name": "批量导出",
        "inputs": [
          "amount",
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "order_id",
          "order_no",
          "pageSize",
          "price",
          "product_code",
          "product_id",
          "product_name",
          "quantity",
          "remark",
          "sn_codes",
          "sn_count",
          "unit",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "orders"
        ]
      },
      "FUVRNEemj4": {
        "name": "批量导入",
        "inputs": []
      }
    }
  },
  "MOV8t2Ah9X": {
    "fields": [
      "operator_name",
      "operator_id",
      "remark",
      "status",
      "total_amount",
      "source_order_no",
      "warehouse_name",
      "warehouse_id",
      "supplier_name",
      "supplier_id",
      "order_date",
      "order_no",
      "id",
      "creator",
      "created_at",
      "updater",
      "updated_at",
      "is_deleted",
      "deleted_at"
    ],
    "methods": {
      "FUaZ4wLM6e": {
        "name": "列表查询",
        "inputs": [
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "operator_id",
          "operator_name",
          "order_date_end",
          "order_date_start",
          "order_no",
          "pageSize",
          "remark",
          "source_order_no",
          "status",
          "supplier_id",
          "supplier_name",
          "total_amount",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "warehouse_id",
          "warehouse_name",
          "orders"
        ]
      },
      "FUKfVnr5XQ": {
        "name": "新增",
        "inputs": [
          "operator_id",
          "operator_name",
          "order_date",
          "order_no",
          "remark",
          "source_order_no",
          "status",
          "supplier_id",
          "supplier_name",
          "total_amount",
          "warehouse_id",
          "warehouse_name"
        ]
      },
      "FU1VDz9NRt": {
        "name": "编辑",
        "inputs": [
          "id",
          "operator_id",
          "operator_name",
          "order_date",
          "order_no",
          "remark",
          "source_order_no",
          "status",
          "supplier_id",
          "supplier_name",
          "total_amount",
          "warehouse_id",
          "warehouse_name"
        ]
      },
      "FUrCduAiGn": {
        "name": "查看详情",
        "inputs": [
          "id"
        ]
      },
      "FUi8k13k4F": {
        "name": "删除",
        "inputs": [
          "id"
        ]
      },
      "FU4tm0gFpl": {
        "name": "批量删除",
        "inputs": [
          "ids"
        ]
      },
      "FUKu2Z0myj": {
        "name": "批量导出",
        "inputs": [
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "operator_id",
          "operator_name",
          "order_date_end",
          "order_date_start",
          "order_no",
          "pageSize",
          "remark",
          "source_order_no",
          "status",
          "supplier_id",
          "supplier_name",
          "total_amount",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "warehouse_id",
          "warehouse_name",
          "orders"
        ]
      },
      "FUEPCjocrT": {
        "name": "批量导入",
        "inputs": []
      }
    }
  },
  "MOg8t6pKm4": {
    "fields": [
      "remark",
      "sn_codes",
      "sn_count",
      "amount",
      "price",
      "quantity",
      "unit",
      "product_code",
      "product_name",
      "product_id",
      "order_no",
      "order_id",
      "id",
      "creator",
      "created_at",
      "updater",
      "updated_at",
      "is_deleted",
      "deleted_at"
    ],
    "methods": {
      "FUj5beTcFQ": {
        "name": "列表查询",
        "inputs": [
          "amount",
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "order_id",
          "order_no",
          "pageSize",
          "price",
          "product_code",
          "product_id",
          "product_name",
          "quantity",
          "remark",
          "sn_codes",
          "sn_count",
          "unit",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "orders"
        ]
      },
      "FUMQAdcAlW": {
        "name": "新增",
        "inputs": [
          "amount",
          "order_id",
          "order_no",
          "price",
          "product_code",
          "product_id",
          "product_name",
          "quantity",
          "remark",
          "sn_codes",
          "sn_count",
          "unit"
        ]
      },
      "FUsNHVHaHs": {
        "name": "编辑",
        "inputs": [
          "amount",
          "id",
          "order_id",
          "order_no",
          "price",
          "product_code",
          "product_id",
          "product_name",
          "quantity",
          "remark",
          "sn_codes",
          "sn_count",
          "unit"
        ]
      },
      "FU4VUQ2pR4": {
        "name": "查看详情",
        "inputs": [
          "id"
        ]
      },
      "FUdd7H5W2n": {
        "name": "删除",
        "inputs": [
          "id"
        ]
      },
      "FUs09usTRE": {
        "name": "批量删除",
        "inputs": [
          "ids"
        ]
      },
      "FUNsSt1MZd": {
        "name": "批量导出",
        "inputs": [
          "amount",
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "order_id",
          "order_no",
          "pageSize",
          "price",
          "product_code",
          "product_id",
          "product_name",
          "quantity",
          "remark",
          "sn_codes",
          "sn_count",
          "unit",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "orders"
        ]
      },
      "FUjy6QNF3F": {
        "name": "批量导入",
        "inputs": []
      }
    }
  },
  "MOenA360T5": {
    "fields": [
      "operator_name",
      "operator_id",
      "remark",
      "status",
      "unpaid_amount",
      "received_amount",
      "total_amount",
      "warehouse_name",
      "warehouse_id",
      "customer_name",
      "customer_id",
      "order_date",
      "order_no",
      "id",
      "creator",
      "created_at",
      "updater",
      "updated_at",
      "is_deleted",
      "deleted_at"
    ],
    "methods": {
      "FUJwJkbOnk": {
        "name": "列表查询",
        "inputs": [
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "customer_id",
          "customer_name",
          "id",
          "operator_id",
          "operator_name",
          "order_date_end",
          "order_date_start",
          "order_no",
          "pageSize",
          "received_amount",
          "remark",
          "status",
          "total_amount",
          "unpaid_amount",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "warehouse_id",
          "warehouse_name",
          "orders"
        ]
      },
      "FUUahJCtGe": {
        "name": "新增",
        "inputs": [
          "customer_id",
          "customer_name",
          "operator_id",
          "operator_name",
          "order_date",
          "order_no",
          "received_amount",
          "remark",
          "status",
          "total_amount",
          "unpaid_amount",
          "warehouse_id",
          "warehouse_name"
        ]
      },
      "FUMC1YOXai": {
        "name": "编辑",
        "inputs": [
          "customer_id",
          "customer_name",
          "id",
          "operator_id",
          "operator_name",
          "order_date",
          "order_no",
          "received_amount",
          "remark",
          "status",
          "total_amount",
          "unpaid_amount",
          "warehouse_id",
          "warehouse_name"
        ]
      },
      "FU2ViffXw4": {
        "name": "查看详情",
        "inputs": [
          "id"
        ]
      },
      "FURLAv3gOp": {
        "name": "删除",
        "inputs": [
          "id"
        ]
      },
      "FUGjwYWEi4": {
        "name": "批量删除",
        "inputs": [
          "ids"
        ]
      },
      "FUpBPZKxXy": {
        "name": "批量导出",
        "inputs": [
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "customer_id",
          "customer_name",
          "id",
          "operator_id",
          "operator_name",
          "order_date_end",
          "order_date_start",
          "order_no",
          "pageSize",
          "received_amount",
          "remark",
          "status",
          "total_amount",
          "unpaid_amount",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "warehouse_id",
          "warehouse_name",
          "orders"
        ]
      },
      "FUvGaqggfa": {
        "name": "批量导入",
        "inputs": []
      }
    }
  },
  "MOc2tEbUGK": {
    "fields": [
      "remark",
      "sn_codes",
      "sn_count",
      "amount",
      "price",
      "quantity",
      "unit",
      "product_code",
      "product_name",
      "product_id",
      "order_no",
      "order_id",
      "id",
      "creator",
      "created_at",
      "updater",
      "updated_at",
      "is_deleted",
      "deleted_at"
    ],
    "methods": {
      "FUyWPF92Nx": {
        "name": "列表查询",
        "inputs": [
          "amount",
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "order_id",
          "order_no",
          "pageSize",
          "price",
          "product_code",
          "product_id",
          "product_name",
          "quantity",
          "remark",
          "sn_codes",
          "sn_count",
          "unit",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "orders"
        ]
      },
      "FU9z5D8wAM": {
        "name": "新增",
        "inputs": [
          "amount",
          "order_id",
          "order_no",
          "price",
          "product_code",
          "product_id",
          "product_name",
          "quantity",
          "remark",
          "sn_codes",
          "sn_count",
          "unit"
        ]
      },
      "FU5BdwhpML": {
        "name": "编辑",
        "inputs": [
          "amount",
          "id",
          "order_id",
          "order_no",
          "price",
          "product_code",
          "product_id",
          "product_name",
          "quantity",
          "remark",
          "sn_codes",
          "sn_count",
          "unit"
        ]
      },
      "FUlojl65Wy": {
        "name": "查看详情",
        "inputs": [
          "id"
        ]
      },
      "FUvHcN72IP": {
        "name": "删除",
        "inputs": [
          "id"
        ]
      },
      "FU5HWSR5JR": {
        "name": "批量删除",
        "inputs": [
          "ids"
        ]
      },
      "FU6hEmkQVi": {
        "name": "批量导出",
        "inputs": [
          "amount",
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "order_id",
          "order_no",
          "pageSize",
          "price",
          "product_code",
          "product_id",
          "product_name",
          "quantity",
          "remark",
          "sn_codes",
          "sn_count",
          "unit",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "orders"
        ]
      },
      "FUfCkjxVQi": {
        "name": "批量导入",
        "inputs": []
      }
    }
  },
  "MOIN9eD2au": {
    "fields": [
      "operator_name",
      "operator_id",
      "remark",
      "status",
      "unpaid_amount",
      "paid_amount",
      "total_amount",
      "warehouse_name",
      "warehouse_id",
      "supplier_name",
      "supplier_id",
      "order_date",
      "total_quantity",
      "order_no",
      "id",
      "creator",
      "created_at",
      "updater",
      "updated_at",
      "is_deleted",
      "deleted_at"
    ],
    "methods": {
      "FUADr2TygU": {
        "name": "列表查询",
        "inputs": [
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "operator_id",
          "operator_name",
          "order_date_end",
          "order_date_start",
          "order_no",
          "pageSize",
          "paid_amount",
          "remark",
          "status",
          "supplier_id",
          "supplier_name",
          "total_amount",
          "unpaid_amount",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "warehouse_id",
          "warehouse_name",
          "orders"
        ]
      },
      "FUlZOM13nS": {
        "name": "新增",
        "inputs": [
          "operator_id",
          "operator_name",
          "order_date",
          "order_no",
          "paid_amount",
          "remark",
          "status",
          "supplier_id",
          "supplier_name",
          "total_amount",
          "unpaid_amount",
          "warehouse_id",
          "warehouse_name"
        ]
      },
      "FUlQSDHuOv": {
        "name": "编辑",
        "inputs": [
          "id",
          "operator_id",
          "operator_name",
          "order_date",
          "order_no",
          "paid_amount",
          "remark",
          "status",
          "supplier_id",
          "supplier_name",
          "total_amount",
          "unpaid_amount",
          "warehouse_id",
          "warehouse_name"
        ]
      },
      "FU8N6CTRMZ": {
        "name": "查看详情",
        "inputs": [
          "id"
        ]
      },
      "FU1WUGjjGO": {
        "name": "删除",
        "inputs": [
          "id"
        ]
      },
      "FUq6pQp2ka": {
        "name": "批量删除",
        "inputs": [
          "ids"
        ]
      },
      "FUoTL911B2": {
        "name": "批量导出",
        "inputs": [
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "operator_id",
          "operator_name",
          "order_date_end",
          "order_date_start",
          "order_no",
          "pageSize",
          "paid_amount",
          "remark",
          "status",
          "supplier_id",
          "supplier_name",
          "total_amount",
          "unpaid_amount",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "warehouse_id",
          "warehouse_name",
          "orders"
        ]
      },
      "FUVy8K8tlA": {
        "name": "批量导入",
        "inputs": []
      }
    }
  },
  "MOqg2psiTa": {
    "fields": [
      "remark",
      "operator_name",
      "operator_id",
      "warehouse_name",
      "warehouse_id",
      "order_type",
      "order_no",
      "operation_desc",
      "operation_type",
      "product_name",
      "product_id",
      "sn_code",
      "id",
      "creator",
      "created_at",
      "updater",
      "updated_at",
      "is_deleted",
      "deleted_at"
    ],
    "methods": {
      "FUUBuLNhuu": {
        "name": "列表查询",
        "inputs": [
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "operation_desc",
          "operation_type",
          "operator_id",
          "operator_name",
          "order_no",
          "order_type",
          "pageSize",
          "product_id",
          "product_name",
          "remark",
          "sn_code",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "warehouse_id",
          "warehouse_name",
          "orders"
        ]
      },
      "FUtcrpdyV1": {
        "name": "新增",
        "inputs": [
          "operation_desc",
          "operation_type",
          "operator_id",
          "operator_name",
          "order_no",
          "order_type",
          "product_id",
          "product_name",
          "remark",
          "sn_code",
          "warehouse_id",
          "warehouse_name"
        ]
      },
      "FUgQeaGxdn": {
        "name": "编辑",
        "inputs": [
          "id",
          "operation_desc",
          "operation_type",
          "operator_id",
          "operator_name",
          "order_no",
          "order_type",
          "product_id",
          "product_name",
          "remark",
          "sn_code",
          "warehouse_id",
          "warehouse_name"
        ]
      },
      "FUizVrBBZG": {
        "name": "查看详情",
        "inputs": [
          "id"
        ]
      },
      "FUe2DNDqym": {
        "name": "删除",
        "inputs": [
          "id"
        ]
      },
      "FUMT6O9PW2": {
        "name": "批量删除",
        "inputs": [
          "ids"
        ]
      },
      "FU9T6BRfXi": {
        "name": "批量导出",
        "inputs": [
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "operation_desc",
          "operation_type",
          "operator_id",
          "operator_name",
          "order_no",
          "order_type",
          "pageSize",
          "product_id",
          "product_name",
          "remark",
          "sn_code",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "warehouse_id",
          "warehouse_name",
          "orders"
        ]
      },
      "FUVDkCqqDG": {
        "name": "批量导入",
        "inputs": []
      }
    }
  },
  "MOk2ZJ4aga": {
    "fields": [
      "remark",
      "customer_name",
      "customer_id",
      "stock_out_time",
      "stock_in_time",
      "purchase_time",
      "sale_price",
      "purchase_price",
      "source_order_type",
      "source_order_no",
      "status",
      "warehouse_name",
      "warehouse_id",
      "product_code",
      "product_name",
      "product_id",
      "sn_code",
      "model",
      "specification",
      "id",
      "creator",
      "created_at",
      "updater",
      "updated_at",
      "is_deleted",
      "deleted_at"
    ],
    "methods": {
      "FUBkwoTsdZ": {
        "name": "getStatusCount",
        "inputs": []
      },
      "FUzTSnSYnx": {
        "name": "getByWarehouse",
        "inputs": [
          "warehouse_id"
        ]
      },
      "FUfOqMyhJV": {
        "name": "warehouse_id",
        "inputs": []
      },
      "FUXHQf4isJ": {
        "name": "getStockOutToday",
        "inputs": []
      },
      "FUFTtY9af0": {
        "name": "scrap",
        "inputs": [
          "id",
          "reason"
        ]
      },
      "FUG5LjJIRx": {
        "name": "列表查询",
        "inputs": [
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "customer_id",
          "customer_name",
          "id",
          "pageSize",
          "product_code",
          "product_id",
          "product_name",
          "purchase_price",
          "purchase_time_end",
          "purchase_time_start",
          "remark",
          "sale_price",
          "sn_code",
          "source_order_no",
          "source_order_type",
          "status",
          "stock_in_time_end",
          "stock_in_time_start",
          "stock_out_time_end",
          "stock_out_time_start",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "warehouse_id",
          "warehouse_name",
          "orders"
        ]
      },
      "FUUjEoVur5": {
        "name": "新增",
        "inputs": [
          "customer_id",
          "customer_name",
          "product_code",
          "product_id",
          "product_name",
          "purchase_price",
          "purchase_time",
          "remark",
          "sale_price",
          "sn_code",
          "source_order_no",
          "source_order_type",
          "status",
          "stock_in_time",
          "stock_out_time",
          "warehouse_id",
          "warehouse_name"
        ]
      },
      "FUU302EENf": {
        "name": "编辑",
        "inputs": [
          "customer_id",
          "customer_name",
          "id",
          "product_code",
          "product_id",
          "product_name",
          "purchase_price",
          "purchase_time",
          "remark",
          "sale_price",
          "sn_code",
          "source_order_no",
          "source_order_type",
          "status",
          "stock_in_time",
          "stock_out_time",
          "warehouse_id",
          "warehouse_name"
        ]
      },
      "FUZTDMrkH7": {
        "name": "查看详情",
        "inputs": [
          "id"
        ]
      },
      "FUoV37QEI0": {
        "name": "删除",
        "inputs": [
          "id"
        ]
      },
      "FU5DfOATRh": {
        "name": "批量删除",
        "inputs": [
          "ids"
        ]
      },
      "FUEUHkNQAZ": {
        "name": "批量导出",
        "inputs": [
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "customer_id",
          "customer_name",
          "id",
          "pageSize",
          "product_code",
          "product_id",
          "product_name",
          "purchase_price",
          "purchase_time_end",
          "purchase_time_start",
          "remark",
          "sale_price",
          "sn_code",
          "source_order_no",
          "source_order_type",
          "status",
          "stock_in_time_end",
          "stock_in_time_start",
          "stock_out_time_end",
          "stock_out_time_start",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "warehouse_id",
          "warehouse_name",
          "orders"
        ]
      },
      "FU2bmzxkbA": {
        "name": "批量导入",
        "inputs": []
      }
    }
  },
  "MOAusBgPiT": {
    "fields": [
      "remark",
      "current_balance",
      "initial_balance",
      "bank_account",
      "bank_name",
      "account_type",
      "account_name",
      "account_code",
      "id",
      "creator",
      "created_at",
      "updater",
      "updated_at",
      "is_deleted",
      "deleted_at"
    ],
    "methods": {
      "FUHgerXSOC": {
        "name": "列表查询",
        "inputs": [
          "account_code",
          "account_name",
          "account_type",
          "bank_account",
          "bank_name",
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "current_balance",
          "id",
          "initial_balance",
          "pageSize",
          "remark",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "orders"
        ]
      },
      "FUDiYnyCzb": {
        "name": "新增",
        "inputs": [
          "account_code",
          "account_name",
          "account_type",
          "bank_account",
          "bank_name",
          "current_balance",
          "initial_balance",
          "remark"
        ]
      },
      "FUzqHOsuFZ": {
        "name": "编辑",
        "inputs": [
          "account_code",
          "account_name",
          "account_type",
          "bank_account",
          "bank_name",
          "current_balance",
          "id",
          "initial_balance",
          "remark"
        ]
      },
      "FUeCQ9aGgK": {
        "name": "查看详情",
        "inputs": [
          "id"
        ]
      },
      "FUwztwsCvd": {
        "name": "删除",
        "inputs": [
          "id"
        ]
      },
      "FUUSzfU6ZY": {
        "name": "批量删除",
        "inputs": [
          "ids"
        ]
      },
      "FUGp5If8Yy": {
        "name": "批量导出",
        "inputs": [
          "account_code",
          "account_name",
          "account_type",
          "bank_account",
          "bank_name",
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "current_balance",
          "id",
          "initial_balance",
          "pageSize",
          "remark",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "orders"
        ]
      },
      "FUyPI7RxL1": {
        "name": "批量导入",
        "inputs": []
      }
    }
  },
  "MO3LPiTHMU": {
    "fields": [
      "remark",
      "warehouse_manager",
      "warehouse_address",
      "warehouse_name",
      "warehouse_code",
      "id",
      "creator",
      "created_at",
      "updater",
      "updated_at",
      "is_deleted",
      "deleted_at"
    ],
    "methods": {
      "FUQYxNNGuG": {
        "name": "列表查询",
        "inputs": [
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "pageSize",
          "remark",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "warehouse_address",
          "warehouse_code",
          "warehouse_manager",
          "warehouse_name",
          "orders"
        ]
      },
      "FUCOPYNJ7K": {
        "name": "新增",
        "inputs": [
          "remark",
          "warehouse_address",
          "warehouse_code",
          "warehouse_manager",
          "warehouse_name"
        ]
      },
      "FUo00VnLkx": {
        "name": "编辑",
        "inputs": [
          "id",
          "remark",
          "warehouse_address",
          "warehouse_code",
          "warehouse_manager",
          "warehouse_name"
        ]
      },
      "FU68EKjRvx": {
        "name": "查看详情",
        "inputs": [
          "id"
        ]
      },
      "FUaTjjfFE0": {
        "name": "删除",
        "inputs": [
          "id"
        ]
      },
      "FUPkYpontz": {
        "name": "批量删除",
        "inputs": [
          "ids"
        ]
      },
      "FUlvSmHFsf": {
        "name": "批量导出",
        "inputs": [
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "pageSize",
          "remark",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "warehouse_address",
          "warehouse_code",
          "warehouse_manager",
          "warehouse_name",
          "orders"
        ]
      },
      "FUMsjXWwid": {
        "name": "批量导入",
        "inputs": []
      }
    }
  },
  "MOeUIsmD4j": {
    "fields": [
      "remark",
      "is_sn_managed",
      "sale_price",
      "purchase_price",
      "spec",
      "unit",
      "product_type",
      "product_name",
      "product_code",
      "id",
      "creator",
      "created_at",
      "updater",
      "updated_at",
      "is_deleted",
      "deleted_at"
    ],
    "methods": {
      "FUcPuvGaEN": {
        "name": "列表查询",
        "inputs": [
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "is_sn_managed",
          "pageSize",
          "product_code",
          "product_name",
          "product_type",
          "purchase_price",
          "remark",
          "sale_price",
          "spec",
          "unit",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "orders"
        ]
      },
      "FUZUQvhIh9": {
        "name": "新增",
        "inputs": [
          "is_sn_managed",
          "product_code",
          "product_name",
          "product_type",
          "purchase_price",
          "remark",
          "sale_price",
          "spec",
          "unit"
        ]
      },
      "FUMutJUzWB": {
        "name": "编辑",
        "inputs": [
          "id",
          "is_sn_managed",
          "product_code",
          "product_name",
          "product_type",
          "purchase_price",
          "remark",
          "sale_price",
          "spec",
          "unit"
        ]
      },
      "FUOgJ5FJea": {
        "name": "查看详情",
        "inputs": [
          "id"
        ]
      },
      "FUJPKoVKGz": {
        "name": "删除",
        "inputs": [
          "id"
        ]
      },
      "FUH5YRdvye": {
        "name": "批量删除",
        "inputs": [
          "ids"
        ]
      },
      "FUJ0uxh8Ip": {
        "name": "批量导出",
        "inputs": [
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "is_sn_managed",
          "pageSize",
          "product_code",
          "product_name",
          "product_type",
          "purchase_price",
          "remark",
          "sale_price",
          "spec",
          "unit",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "orders"
        ]
      },
      "FUvqVlyzNs": {
        "name": "批量导入",
        "inputs": []
      }
    }
  },
  "MOj7UPuJx2": {
    "fields": [
      "remark",
      "address",
      "contact_phone",
      "contact_person",
      "customer_name",
      "customer_code",
      "id",
      "creator",
      "created_at",
      "updater",
      "updated_at",
      "is_deleted",
      "deleted_at"
    ],
    "methods": {
      "FUhljLxQOC": {
        "name": "列表查询",
        "inputs": [
          "address",
          "contact_person",
          "contact_phone",
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "customer_code",
          "customer_name",
          "id",
          "pageSize",
          "remark",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "orders"
        ]
      },
      "FUhdIhuhKP": {
        "name": "新增",
        "inputs": [
          "address",
          "contact_person",
          "contact_phone",
          "customer_code",
          "customer_name",
          "remark"
        ]
      },
      "FUBLg4XVak": {
        "name": "编辑",
        "inputs": [
          "address",
          "contact_person",
          "contact_phone",
          "customer_code",
          "customer_name",
          "id",
          "remark"
        ]
      },
      "FUkrgtof0H": {
        "name": "查看详情",
        "inputs": [
          "id"
        ]
      },
      "FUvIfraor5": {
        "name": "删除",
        "inputs": [
          "id"
        ]
      },
      "FU1ezRzLc6": {
        "name": "批量删除",
        "inputs": [
          "ids"
        ]
      },
      "FUgkOv0wRF": {
        "name": "批量导出",
        "inputs": [
          "address",
          "contact_person",
          "contact_phone",
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "customer_code",
          "customer_name",
          "id",
          "pageSize",
          "remark",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "orders"
        ]
      },
      "FUC5nKgXdO": {
        "name": "批量导入",
        "inputs": []
      }
    }
  },
  "MOmke9xgeH": {
    "fields": [
      "remark",
      "address",
      "contact_phone",
      "contact_person",
      "supplier_name",
      "supplier_code",
      "id",
      "creator",
      "created_at",
      "updater",
      "updated_at",
      "is_deleted",
      "deleted_at"
    ],
    "methods": {
      "FUahi0uBQQ": {
        "name": "列表查询",
        "inputs": [
          "address",
          "contact_person",
          "contact_phone",
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "pageSize",
          "remark",
          "supplier_code",
          "supplier_name",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "orders"
        ]
      },
      "FURNaL3qZ1": {
        "name": "新增",
        "inputs": [
          "address",
          "contact_person",
          "contact_phone",
          "remark",
          "supplier_code",
          "supplier_name"
        ]
      },
      "FUxSx9jzAe": {
        "name": "编辑",
        "inputs": [
          "address",
          "contact_person",
          "contact_phone",
          "id",
          "remark",
          "supplier_code",
          "supplier_name"
        ]
      },
      "FUZ32CRNo9": {
        "name": "查看详情",
        "inputs": [
          "id"
        ]
      },
      "FUqg607gvT": {
        "name": "删除",
        "inputs": [
          "id"
        ]
      },
      "FUJnfXz4wQ": {
        "name": "批量删除",
        "inputs": [
          "ids"
        ]
      },
      "FUgGELKOTB": {
        "name": "批量导出",
        "inputs": [
          "address",
          "contact_person",
          "contact_phone",
          "created_at_end",
          "created_at_start",
          "creator",
          "current",
          "id",
          "pageSize",
          "remark",
          "supplier_code",
          "supplier_name",
          "updated_at_end",
          "updated_at_start",
          "updater",
          "orders"
        ]
      },
      "FU97SWibIq": {
        "name": "批量导入",
        "inputs": []
      }
    }
  }
}
