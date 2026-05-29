"use strict";
const LAYOUT_SCHEMA = {
    type: 'page',
    _id: 'unique-id-79920a6ad4ee',
    data: {
        xcScreen: 'WIDE'
    },
    initApi: {
        type: 'data_table_method'
    },
    body: [
        {
            type: 'table',
            _id: 'unique-id-741a7bdd7be4',
            align: 'spaceBetween',
            combine: false,
            rowKey: 'id',
            size: 'small',
            title: '表格',
            data: {
                xcTableFilterParams: {
                    $$course_teacher: {
                        type: 'EXPRESSION',
                        value: '${xcUser.photo/xcUser.userName/xcUser.sapId}'
                    }
                }
            },
            dataSource: {
                code: {
                    js: 'return {\r\n  "total": 10,\r\n  "current": 1,\r\n  "pageSize": 10,\r\n  "summary": {},\r\n  "list": [\r\n    {\r\n      "id": 1,\r\n      "course_title": "纪律处分条例",\r\n      "course_category": "党建学习",\r\n      "course_teacher": "张三",\r\n      "created_at": "2025-08-01"\r\n    },\r\n    {\r\n      "id": 2,\r\n      "course_title": "坚守服务底线，共情感动客户",\r\n      "course_category": "集团文化",\r\n      "course_teacher": "李四",\r\n      "created_at": "2025-08-02"\r\n    },\r\n    {\r\n      "id": 3,\r\n      "course_title": "常用办公软件使用技巧",\r\n      "course_category": "办公技能",\r\n      "course_teacher": "王五",\r\n      "created_at": "2025-08-03"\r\n    },\r\n    {\r\n      "id": 4,\r\n      "course_title": "培养工作中的情商",\r\n      "course_category": "职业素养",\r\n      "course_teacher": "赵六",\r\n      "created_at": "2025-08-04"\r\n    },\r\n    {\r\n      "id": 5,\r\n      "course_title": "职业形象与商务礼仪",\r\n      "course_category": "新员工培训",\r\n      "course_teacher": "孙七",\r\n      "created_at": "2025-08-05"\r\n    },\r\n    {\r\n      "id": 6,\r\n      "course_title": "如何实施员工辅导",\r\n      "course_category": "师资培养",\r\n      "course_teacher": "周八",\r\n      "created_at": "2025-08-06"\r\n    },\r\n    {\r\n      "id": 7,\r\n      "course_title": "新入职员工保密培训",\r\n      "course_category": "新员工培训",\r\n      "course_teacher": "吴九",\r\n      "created_at": "2025-08-07"\r\n    },\r\n    {\r\n      "id": 8,\r\n      "course_title": "办公消防安全指南",\r\n      "course_category": "新员工培训",\r\n      "course_teacher": "郑十",\r\n      "created_at": "2025-08-08"\r\n    },\r\n    {\r\n      "id": 9,\r\n      "course_title": "项目管理",\r\n      "course_category": "新员工培训",\r\n      "course_teacher": "钱十一",\r\n      "created_at": "2025-08-09"\r\n    },\r\n    {\r\n      "id": 10,\r\n      "course_title": "UI设计",\r\n      "course_category": "办公技能",\r\n      "course_teacher": "孙十二",\r\n      "created_at": "2025-08-10"\r\n    }\r\n  ]\r\n}'
                },
                type: 'code'
            },
            pagination: {
                defaultPageSize: 10
            },
            rowSelection: {
                enable: false
            },
            slotArea: [],
            filter: [
                {
                    type: 'input',
                    _id: 'unique-id-a1e714ec67fb',
                    label: '课程名称',
                    name: 'course_title',
                    placeholder: '请输入内容',
                    layoutConfig: {
                        span: 6
                    }
                },
                {
                    type: 'single-select',
                    _id: 'unique-id-523698c52741',
                    alias: '课程种类',
                    label: '课程种类',
                    name: 'course_category',
                    placeholder: '请选择',
                    show: 'SELECT',
                    dataSource: {
                        type: 'data_table_method'
                    },
                    layoutConfig: {
                        span: 6
                    },
                    options: [
                        {
                            label: '新员工培训',
                            value: 'a'
                        },
                        {
                            label: '党建学习',
                            value: 'b'
                        },
                        {
                            label: '集团文化',
                            value: 'c'
                        },
                        {
                            label: '师资培养',
                            value: 'd'
                        },
                        {
                            label: '职业素养',
                            value: 'e'
                        },
                        {
                            label: '办公技能',
                            value: 'f'
                        }
                    ]
                },
                {
                    type: 'personnel',
                    _id: 'unique-id-6c12428a3e20',
                    label: '课程讲师',
                    name: 'course_teacher',
                    layoutConfig: {
                        span: 6
                    }
                },
                {
                    type: 'date-range-picker',
                    _id: 'unique-id-33aefbffbe63',
                    label: '创建时间',
                    name: 'created_at',
                    placeholder: '请选择',
                    layoutConfig: {
                        span: 6
                    }
                }
            ],
            topBarArea: [
                {
                    type: 'button',
                    _funcKey: 'add',
                    _id: 'unique-id-2a641e36b6c5',
                    alias: '新增',
                    text: '新增',
                    events: {
                        onClick: [
                            {
                                options: {
                                    schema: {
                                        _funcKey: 'addModal',
                                        data: {
                                            submitLoading: false
                                        },
                                        size: 'custom',
                                        footer: [
                                            {
                                                buttonType: 'default',
                                                _id: 'unique-id-0c4cc5ea56d0',
                                                label: '取消',
                                                type: 'button',
                                                events: {
                                                    onClick: [
                                                        {
                                                            nodeName: '关闭弹窗/抽屉',
                                                            options: {
                                                                nodeId: 'unique-id-a56eb805fef2'
                                                            },
                                                            action: 'closePopups',
                                                            actionId: 'closePopups022'
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                buttonType: 'primary',
                                                $$loading: {
                                                    type: 'EXPRESSION',
                                                    value: '${submitLoading}'
                                                },
                                                alias: '确定',
                                                _id: 'unique-id-893b987ced9e',
                                                label: '确定',
                                                type: 'button',
                                                events: {
                                                    onClick: [
                                                        {
                                                            options: {
                                                                _id: 'unique-id-a56eb805fef2',
                                                                list: [
                                                                    {
                                                                        name: 'submitLoading',
                                                                        value: {
                                                                            mode: 'CONSTANT',
                                                                            value: true
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            action: 'updateStore',
                                                            actionId: 'updateStore882',
                                                            eventName: '更新数据域'
                                                        },
                                                        {
                                                            options: {
                                                                component: {
                                                                    page: 'unique-id-9f16d2fb7279'
                                                                },
                                                                method: {
                                                                    page: 'submit'
                                                                },
                                                                range: 'page'
                                                            },
                                                            action: 'dispatchAction',
                                                            actionId: 'dispatchAction449',
                                                            callback: {
                                                                onSuccess: [
                                                                    {
                                                                        options: {
                                                                            _id: 'unique-id-a56eb805fef2',
                                                                            list: [
                                                                                {
                                                                                    name: 'submitLoading',
                                                                                    value: {
                                                                                        mode: 'CONSTANT',
                                                                                        value: false
                                                                                    }
                                                                                }
                                                                            ]
                                                                        },
                                                                        action: 'updateStore',
                                                                        actionId: 'updateStore832',
                                                                        eventName: '更新数据域'
                                                                    },
                                                                    {
                                                                        options: {
                                                                            nodeId: [
                                                                                'unique-id-a56eb805fef2'
                                                                            ]
                                                                        },
                                                                        action: 'closePopups',
                                                                        actionId: 'closePopups030',
                                                                        eventName: '关闭弹窗/抽屉'
                                                                    },
                                                                    {
                                                                        options: {
                                                                            component: {
                                                                                page: 'unique-id-741a7bdd7be4'
                                                                            },
                                                                            method: {
                                                                                page: 'refresh'
                                                                            },
                                                                            range: 'page'
                                                                        },
                                                                        action: 'dispatchAction',
                                                                        actionId: 'dispatchAction021',
                                                                        eventName: '调用指定组件方法'
                                                                    }
                                                                ]
                                                            },
                                                            eventName: '调用指定组件方法'
                                                        }
                                                    ]
                                                }
                                            }
                                        ],
                                        alias: '新建弹窗',
                                        _id: 'unique-id-a56eb805fef2',
                                        label: '新建',
                                        type: 'modal',
                                        content: [
                                            {
                                                visible: true,
                                                buttonArea: [],
                                                preserve: true,
                                                body: [],
                                                type: 'form',
                                                layout: 'vertical',
                                                _funcKey: 'addForm',
                                                labelAlign: 'right',
                                                enableButtonArea: false,
                                                alias: '新建表单',
                                                _id: 'unique-id-9f16d2fb7279',
                                                api: {},
                                                defaultValueType: 'visual'
                                            }
                                        ],
                                        height: {
                                            mode: 'max',
                                            value: '600px'
                                        }
                                    },
                                    type: 'custom'
                                },
                                action: 'addModal',
                                actionId: 'addModal055',
                                eventName: '新建弹窗'
                            }
                        ]
                    }
                },
                {
                    type: 'button',
                    _funcKey: 'batchDelete',
                    _id: 'unique-id-c176bc2bf320',
                    alias: '批量删除',
                    buttonType: 'danger',
                    text: '批量删除',
                    $$disabled: {
                        type: 'EXPRESSION',
                        value: '${!xcTableSelectedRows?.ids?.length > 0}'
                    },
                    events: {
                        onClick: [
                            {
                                options: {
                                    schema: {
                                        _funcKey: 'batchDeleteModal',
                                        data: {
                                            submitLoading: false
                                        },
                                        size: 'custom',
                                        footer: [
                                            {
                                                buttonType: 'default',
                                                _id: 'unique-id-817cf58f3260',
                                                label: '取消',
                                                type: 'button',
                                                events: {
                                                    onClick: [
                                                        {
                                                            nodeName: '关闭弹窗/抽屉',
                                                            options: {
                                                                nodeId: 'unique-id-0cd63572ad10'
                                                            },
                                                            action: 'closePopups',
                                                            actionId: 'closePopups022'
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                buttonType: 'primary',
                                                $$loading: {
                                                    type: 'EXPRESSION',
                                                    value: '${submitLoading}'
                                                },
                                                alias: '确定',
                                                _id: 'unique-id-8c4fdece0250',
                                                label: '确定',
                                                type: 'button',
                                                events: {
                                                    onClick: [
                                                        {
                                                            options: {
                                                                _id: 'unique-id-0cd63572ad10',
                                                                list: [
                                                                    {
                                                                        name: 'submitLoading',
                                                                        value: {
                                                                            mode: 'CONSTANT',
                                                                            value: true
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            action: 'updateStore',
                                                            actionId: 'updateStore882',
                                                            eventName: '更新数据域'
                                                        },
                                                        {
                                                            options: {
                                                                component: {
                                                                    page: 'unique-id-7d653b99d1ee'
                                                                },
                                                                method: {
                                                                    page: 'submit'
                                                                },
                                                                range: 'page'
                                                            },
                                                            action: 'dispatchAction',
                                                            actionId: 'dispatchAction449',
                                                            callback: {
                                                                onSuccess: [
                                                                    {
                                                                        options: {
                                                                            _id: 'unique-id-0cd63572ad10',
                                                                            list: [
                                                                                {
                                                                                    name: 'submitLoading',
                                                                                    value: {
                                                                                        mode: 'CONSTANT',
                                                                                        value: false
                                                                                    }
                                                                                }
                                                                            ]
                                                                        },
                                                                        action: 'updateStore',
                                                                        actionId: 'updateStore832',
                                                                        eventName: '更新数据域'
                                                                    },
                                                                    {
                                                                        options: {
                                                                            nodeId: [
                                                                                'unique-id-0cd63572ad10'
                                                                            ]
                                                                        },
                                                                        action: 'closePopups',
                                                                        actionId: 'closePopups030',
                                                                        eventName: '关闭弹窗/抽屉'
                                                                    },
                                                                    {
                                                                        options: {
                                                                            component: {
                                                                                page: 'unique-id-741a7bdd7be4'
                                                                            },
                                                                            method: {
                                                                                page: 'refresh'
                                                                            },
                                                                            range: 'page'
                                                                        },
                                                                        action: 'dispatchAction',
                                                                        actionId: 'dispatchAction021',
                                                                        eventName: '调用指定组件方法'
                                                                    }
                                                                ]
                                                            },
                                                            eventName: '调用指定组件方法'
                                                        }
                                                    ]
                                                }
                                            }
                                        ],
                                        width: '520px',
                                        alias: '批量删除弹窗',
                                        _id: 'unique-id-0cd63572ad10',
                                        label: '批量删除',
                                        type: 'modal',
                                        content: [
                                            {
                                                visible: true,
                                                buttonArea: [],
                                                preserve: true,
                                                body: [
                                                    {
                                                        _id: 'unique-id-61f9f51ca12e',
                                                        type: 'text',
                                                        content: '是否确认删除？'
                                                    }
                                                ],
                                                type: 'form',
                                                layout: 'vertical',
                                                _funcKey: 'batchDeleteForm',
                                                labelAlign: 'right',
                                                enableButtonArea: false,
                                                alias: '批量删除表单',
                                                noBordered: true,
                                                _id: 'unique-id-7d653b99d1ee',
                                                api: {},
                                                defaultValueType: 'visual'
                                            }
                                        ],
                                        height: {
                                            mode: 'fix',
                                            value: '200px'
                                        }
                                    },
                                    type: 'custom'
                                },
                                action: 'addModal',
                                actionId: 'addModal055',
                                eventName: '批量删除弹窗'
                            }
                        ]
                    }
                }
            ],
            columns: [
                {
                    type: 'table-column',
                    _id: 'unique-id-94d910938644',
                    alias: '课程名称',
                    label: '课程名称',
                    name: 'course_title',
                    width: 232,
                    body: [
                        {
                            type: 'text',
                            _id: 'unique-id-62e4a19669ed',
                            name: 'name',
                            $$content: {
                                type: 'EXPRESSION',
                                value: '${xcTableValue}'
                            }
                        }
                    ]
                },
                {
                    type: 'table-column',
                    _id: 'unique-id-74786e4692ca',
                    label: '课程种类',
                    name: 'course_category',
                    body: [
                        {
                            type: 'text',
                            _id: 'unique-id-9a5d3a92595a',
                            name: 'course_category',
                            $$content: {
                                type: 'EXPRESSION',
                                value: '${xcTableValue}'
                            }
                        }
                    ]
                },
                {
                    type: 'table-column',
                    _id: 'unique-id-9b3cfa4630e8',
                    alias: '课程讲师',
                    label: '课程讲师',
                    name: 'course_teacher',
                    mapping: {
                        enable: true,
                        mappingType: 'simple',
                        simpleValue: 'text',
                        $$options: {
                            type: 'EXPRESSION',
                            value: ''
                        }
                    },
                    body: [
                        {
                            type: 'container',
                            _id: 'unique-id-1232f8ae174f',
                            className: '',
                            flex: {
                                alignItems: 'center',
                                enable: true,
                                justify: 'flex-start',
                                direction: 'row'
                            },
                            style: {},
                            body: [
                                {
                                    type: 'text',
                                    _id: 'unique-id-f28c12d9fbed',
                                    ellipsis: true,
                                    maxRow: 1,
                                    $$content: {
                                        type: 'EXPRESSION',
                                        value: "${CONCAT(xcUser?.name ?? '讲师001','/',xcUser?.memberId ?? '000001')}"
                                    },
                                    style: {
                                        overflow: 'hidden',
                                        'white-space': 'nowrap',
                                        width: '120px',
                                        marginBottom: 0,
                                        'text-overflow': 'ellipsis'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'table-column',
                    _id: 'unique-id-a1717e320d71',
                    alias: '创建时间',
                    label: '创建时间',
                    name: 'created_at',
                    mapping: {
                        enable: true,
                        mappingType: 'simple',
                        simpleValue: 'text'
                    },
                    body: [
                        {
                            type: 'text',
                            _id: 'unique-id-3f680c12d4bd',
                            name: 'created_at',
                            $$content: {
                                type: 'EXPRESSION',
                                value: '${xcTableValue}'
                            }
                        }
                    ]
                },
                {
                    type: 'table-column',
                    _id: 'unique-id-f8dd987c7cec',
                    alias: '操作',
                    columnType: 'operation',
                    label: '操作',
                    name: 'operation',
                    mapping: {
                        enable: false,
                        mappingType: 'simple',
                        simpleValue: 'text'
                    },
                    body: [
                        {
                            type: 'button',
                            _funcKey: 'operationEdit',
                            _id: 'unique-id-45eef31cd786',
                            alias: '编辑',
                            buttonType: 'link',
                            size: 'small',
                            text: '编辑',
                            events: {
                                onClick: [
                                    {
                                        options: {
                                            schema: {
                                                _funcKey: 'operationEditModal',
                                                data: {
                                                    submitLoading: false
                                                },
                                                size: 'custom',
                                                footer: [
                                                    {
                                                        buttonType: 'default',
                                                        _id: 'unique-id-18c0a1a7c9ee',
                                                        label: '取消',
                                                        type: 'button',
                                                        events: {
                                                            onClick: [
                                                                {
                                                                    nodeName: '关闭弹窗/抽屉',
                                                                    options: {
                                                                        nodeId: 'unique-id-2ba78d8587fb'
                                                                    },
                                                                    action: 'closePopups',
                                                                    actionId: 'closePopups022'
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        buttonType: 'primary',
                                                        $$loading: {
                                                            type: 'EXPRESSION',
                                                            value: '${submitLoading}'
                                                        },
                                                        alias: '确定',
                                                        _id: 'unique-id-06a24d82f761',
                                                        label: '确定',
                                                        type: 'button',
                                                        events: {
                                                            onClick: [
                                                                {
                                                                    options: {
                                                                        _id: 'unique-id-2ba78d8587fb',
                                                                        list: [
                                                                            {
                                                                                name: 'submitLoading',
                                                                                value: {
                                                                                    mode: 'CONSTANT',
                                                                                    value: true
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    action: 'updateStore',
                                                                    actionId: 'updateStore882',
                                                                    eventName: '更新数据域'
                                                                },
                                                                {
                                                                    options: {
                                                                        component: {
                                                                            page: 'unique-id-3268df870756'
                                                                        },
                                                                        method: {
                                                                            page: 'submit'
                                                                        },
                                                                        range: 'page'
                                                                    },
                                                                    action: 'dispatchAction',
                                                                    actionId: 'dispatchAction449',
                                                                    callback: {
                                                                        onSuccess: [
                                                                            {
                                                                                options: {
                                                                                    _id: 'unique-id-2ba78d8587fb',
                                                                                    list: [
                                                                                        {
                                                                                            name: 'submitLoading',
                                                                                            value: {
                                                                                                mode: 'CONSTANT',
                                                                                                value: false
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                action: 'updateStore',
                                                                                actionId: 'updateStore832',
                                                                                eventName: '更新数据域'
                                                                            },
                                                                            {
                                                                                options: {
                                                                                    nodeId: [
                                                                                        'unique-id-2ba78d8587fb'
                                                                                    ]
                                                                                },
                                                                                action: 'closePopups',
                                                                                actionId: 'closePopups030',
                                                                                eventName: '关闭弹窗/抽屉'
                                                                            },
                                                                            {
                                                                                options: {
                                                                                    component: {
                                                                                        page: 'unique-id-741a7bdd7be4'
                                                                                    },
                                                                                    method: {
                                                                                        page: 'refresh'
                                                                                    },
                                                                                    range: 'page'
                                                                                },
                                                                                action: 'dispatchAction',
                                                                                actionId: 'dispatchAction021',
                                                                                eventName: '调用指定组件方法'
                                                                            }
                                                                        ]
                                                                    },
                                                                    eventName: '调用指定组件方法'
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                alias: '编辑弹窗',
                                                _id: 'unique-id-2ba78d8587fb',
                                                label: '编辑',
                                                type: 'modal',
                                                content: [
                                                    {
                                                        touched: true,
                                                        visible: true,
                                                        $$defaultValue: {
                                                            type: 'JAVASCRIPT',
                                                            value: 'return JSON.stringify(xcTableRow)'
                                                        },
                                                        buttonArea: [],
                                                        preserve: true,
                                                        body: [],
                                                        type: 'form',
                                                        layout: 'vertical',
                                                        _funcKey: 'operationEditForm',
                                                        labelAlign: 'right',
                                                        enableButtonArea: false,
                                                        alias: '编辑表单',
                                                        _id: 'unique-id-3268df870756',
                                                        api: {},
                                                        defaultValueType: 'code'
                                                    }
                                                ],
                                                height: {
                                                    mode: 'max',
                                                    value: '600px'
                                                }
                                            },
                                            type: 'custom'
                                        },
                                        action: 'addModal',
                                        actionId: 'addModal055',
                                        eventName: '编辑弹窗'
                                    }
                                ]
                            }
                        },
                        {
                            type: 'button',
                            _funcKey: 'operationDetail',
                            _id: 'unique-id-dfbfe138aae4',
                            alias: '查看详情',
                            buttonType: 'link',
                            size: 'small',
                            text: '查看详情',
                            events: {
                                onClick: [
                                    {
                                        options: {
                                            schema: {
                                                _funcKey: 'operationDetailModal',
                                                data: {
                                                    submitLoading: false
                                                },
                                                size: 'custom',
                                                footer: [
                                                    {
                                                        buttonType: 'default',
                                                        _id: 'unique-id-33bd4e269f56',
                                                        label: '取消',
                                                        type: 'button',
                                                        events: {
                                                            onClick: [
                                                                {
                                                                    nodeName: '关闭弹窗/抽屉',
                                                                    options: {
                                                                        nodeId: 'unique-id-0f38f6304ea8'
                                                                    },
                                                                    action: 'closePopups',
                                                                    actionId: 'closePopups022'
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        buttonType: 'primary',
                                                        alias: '确定',
                                                        _id: 'unique-id-db8170231549',
                                                        label: '确定',
                                                        type: 'button',
                                                        events: {
                                                            onClick: [
                                                                {
                                                                    nodeName: '关闭弹窗/抽屉',
                                                                    options: {
                                                                        nodeId: [
                                                                            'unique-id-0f38f6304ea8'
                                                                        ]
                                                                    },
                                                                    action: 'closePopups',
                                                                    actionId: 'closePopups030'
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                alias: '查看详情弹窗',
                                                _id: 'unique-id-0f38f6304ea8',
                                                label: '查看详情',
                                                type: 'modal',
                                                content: [
                                                    {
                                                        visible: true,
                                                        buttonArea: [],
                                                        initApi: {},
                                                        readOnly: true,
                                                        preserve: true,
                                                        body: [],
                                                        type: 'form',
                                                        layout: 'vertical',
                                                        _funcKey: 'operationDetailForm',
                                                        labelAlign: 'right',
                                                        enableButtonArea: false,
                                                        alias: '查看详情表单',
                                                        _id: 'unique-id-0f02259d274c',
                                                        api: {}
                                                    }
                                                ],
                                                height: {
                                                    mode: 'max',
                                                    value: '600px'
                                                }
                                            },
                                            type: 'custom'
                                        },
                                        action: 'addModal',
                                        actionId: 'addModal055',
                                        eventName: '查看详情弹窗'
                                    }
                                ]
                            }
                        },
                        {
                            type: 'button',
                            _funcKey: 'operationDetail',
                            _id: 'unique-id-b7bc46ca8e1a',
                            alias: '发布课程',
                            buttonType: 'link',
                            size: 'small',
                            text: '发布课程',
                            events: {
                                onClick: [
                                    {
                                        options: {
                                            schema: {
                                                _funcKey: 'operationDetailModal',
                                                data: {
                                                    submitLoading: false
                                                },
                                                size: 'custom',
                                                footer: [
                                                    {
                                                        buttonType: 'default',
                                                        _id: 'unique-id-40734ba8ef8f',
                                                        label: '取消',
                                                        type: 'button',
                                                        events: {
                                                            onClick: [
                                                                {
                                                                    nodeName: '关闭弹窗/抽屉',
                                                                    options: {
                                                                        nodeId: 'unique-id-e0fb3779db99'
                                                                    },
                                                                    action: 'closePopups',
                                                                    actionId: 'closePopups022'
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        buttonType: 'primary',
                                                        alias: '确定',
                                                        _id: 'unique-id-176bccb41a89',
                                                        label: '确定',
                                                        type: 'button',
                                                        events: {
                                                            onClick: [
                                                                {
                                                                    nodeName: '关闭弹窗/抽屉',
                                                                    options: {
                                                                        nodeId: [
                                                                            'unique-id-e0fb3779db99'
                                                                        ]
                                                                    },
                                                                    action: 'closePopups',
                                                                    actionId: 'closePopups030'
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                alias: '查看详情弹窗',
                                                _id: 'unique-id-e0fb3779db99',
                                                label: '查看详情',
                                                type: 'modal',
                                                content: [
                                                    {
                                                        visible: true,
                                                        buttonArea: [],
                                                        initApi: {},
                                                        readOnly: true,
                                                        preserve: true,
                                                        body: [],
                                                        type: 'form',
                                                        layout: 'vertical',
                                                        _funcKey: 'operationDetailForm',
                                                        labelAlign: 'right',
                                                        enableButtonArea: false,
                                                        alias: '查看详情表单',
                                                        _id: 'unique-id-da28876e22b1',
                                                        api: {}
                                                    }
                                                ],
                                                height: {
                                                    mode: 'max',
                                                    value: '600px'
                                                }
                                            },
                                            type: 'custom'
                                        },
                                        action: 'addModal',
                                        actionId: 'addModal055',
                                        eventName: '查看详情弹窗'
                                    }
                                ]
                            }
                        },
                        {
                            type: 'button',
                            _funcKey: 'operationDelete',
                            _id: 'unique-id-d76457f5740b',
                            alias: '删除',
                            buttonType: 'danger-no-border',
                            size: 'small',
                            text: '删除',
                            events: {
                                onClick: [
                                    {
                                        options: {
                                            schema: {
                                                _funcKey: 'operationDeleteModal',
                                                data: {
                                                    submitLoading: false
                                                },
                                                size: 'custom',
                                                footer: [
                                                    {
                                                        buttonType: 'default',
                                                        _id: 'unique-id-2f7330b87a9a',
                                                        label: '取消',
                                                        type: 'button',
                                                        events: {
                                                            onClick: [
                                                                {
                                                                    nodeName: '关闭弹窗/抽屉',
                                                                    options: {
                                                                        nodeId: 'unique-id-65dcaedc91a7'
                                                                    },
                                                                    action: 'closePopups',
                                                                    actionId: 'closePopups022'
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        buttonType: 'primary',
                                                        $$loading: {
                                                            type: 'EXPRESSION',
                                                            value: '${submitLoading}'
                                                        },
                                                        alias: '确定',
                                                        _id: 'unique-id-656486f2f961',
                                                        label: '确定',
                                                        type: 'button',
                                                        events: {
                                                            onClick: [
                                                                {
                                                                    options: {
                                                                        _id: 'unique-id-65dcaedc91a7',
                                                                        list: [
                                                                            {
                                                                                name: 'submitLoading',
                                                                                value: {
                                                                                    mode: 'CONSTANT',
                                                                                    value: true
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    action: 'updateStore',
                                                                    actionId: 'updateStore882',
                                                                    eventName: '更新数据域'
                                                                },
                                                                {
                                                                    options: {
                                                                        component: {
                                                                            page: 'unique-id-36de7349a040'
                                                                        },
                                                                        method: {
                                                                            page: 'submit'
                                                                        },
                                                                        range: 'page'
                                                                    },
                                                                    action: 'dispatchAction',
                                                                    actionId: 'dispatchAction449',
                                                                    callback: {
                                                                        onSuccess: [
                                                                            {
                                                                                options: {
                                                                                    _id: 'unique-id-65dcaedc91a7',
                                                                                    list: [
                                                                                        {
                                                                                            name: 'submitLoading',
                                                                                            value: {
                                                                                                mode: 'CONSTANT',
                                                                                                value: false
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                action: 'updateStore',
                                                                                actionId: 'updateStore832',
                                                                                eventName: '更新数据域'
                                                                            },
                                                                            {
                                                                                options: {
                                                                                    nodeId: [
                                                                                        'unique-id-65dcaedc91a7'
                                                                                    ]
                                                                                },
                                                                                action: 'closePopups',
                                                                                actionId: 'closePopups030',
                                                                                eventName: '关闭弹窗/抽屉'
                                                                            },
                                                                            {
                                                                                options: {
                                                                                    component: {
                                                                                        page: 'unique-id-741a7bdd7be4'
                                                                                    },
                                                                                    method: {
                                                                                        page: 'refresh'
                                                                                    },
                                                                                    range: 'page'
                                                                                },
                                                                                action: 'dispatchAction',
                                                                                actionId: 'dispatchAction021',
                                                                                eventName: '调用指定组件方法'
                                                                            }
                                                                        ]
                                                                    },
                                                                    eventName: '调用指定组件方法'
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                width: '520px',
                                                alias: '删除弹窗',
                                                _id: 'unique-id-65dcaedc91a7',
                                                label: '删除',
                                                type: 'modal',
                                                content: [
                                                    {
                                                        visible: true,
                                                        buttonArea: [],
                                                        preserve: true,
                                                        body: [
                                                            {
                                                                _id: 'unique-id-02bdcde69e5a',
                                                                type: 'text',
                                                                content: '是否确认删除？'
                                                            }
                                                        ],
                                                        type: 'form',
                                                        layout: 'vertical',
                                                        _funcKey: 'operationDeleteForm',
                                                        labelAlign: 'right',
                                                        enableButtonArea: false,
                                                        alias: '删除表单',
                                                        noBordered: true,
                                                        _id: 'unique-id-36de7349a040',
                                                        api: {},
                                                        defaultValueType: 'visual'
                                                    }
                                                ],
                                                height: {
                                                    mode: 'fix',
                                                    value: '200px'
                                                }
                                            },
                                            type: 'custom'
                                        },
                                        action: 'addModal',
                                        actionId: 'addModal055',
                                        eventName: '删除弹窗'
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ]
};
const TABLE_SCHEMA = {
    type: 'page',
    _id: 'unique-id-79920a6ad4ee',
    data: {
        xcScreen: 'WIDE'
    },
    initApi: {
        type: 'data_table_method'
    },
    body: [
        {
            type: 'table',
            _id: 'unique-id-741a7bdd7be4',
            align: 'spaceBetween',
            rowKey: 'id',
            size: 'small',
            title: '表格',
            data: {
                xcTableFilterParams: {
                    $$course_teacher: {
                        type: 'EXPRESSION',
                        value: '${xcUser.photo/xcUser.userName/xcUser.sapId}'
                    }
                }
            },
            dataSource: {
                code: {
                    js: 'return {\r\n  "total": 10,\r\n  "current": 1,\r\n  "pageSize": 10,\r\n  "summary": {},\r\n  "list": [\r\n    {\r\n      "id": 1,\r\n      "course_title": "纪律处分条例",\r\n      "course_category": "党建学习",\r\n      "course_teacher": "张三",\r\n      "created_at": "2025-08-01"\r\n    },\r\n    {\r\n      "id": 2,\r\n      "course_title": "坚守服务底线，共情感动客户",\r\n      "course_category": "集团文化",\r\n      "course_teacher": "李四",\r\n      "created_at": "2025-08-02"\r\n    },\r\n    {\r\n      "id": 3,\r\n      "course_title": "常用办公软件使用技巧",\r\n      "course_category": "办公技能",\r\n      "course_teacher": "王五",\r\n      "created_at": "2025-08-03"\r\n    },\r\n    {\r\n      "id": 4,\r\n      "course_title": "培养工作中的情商",\r\n      "course_category": "职业素养",\r\n      "course_teacher": "赵六",\r\n      "created_at": "2025-08-04"\r\n    },\r\n    {\r\n      "id": 5,\r\n      "course_title": "职业形象与商务礼仪",\r\n      "course_category": "新员工培训",\r\n      "course_teacher": "孙七",\r\n      "created_at": "2025-08-05"\r\n    },\r\n    {\r\n      "id": 6,\r\n      "course_title": "如何实施员工辅导",\r\n      "course_category": "师资培养",\r\n      "course_teacher": "周八",\r\n      "created_at": "2025-08-06"\r\n    },\r\n    {\r\n      "id": 7,\r\n      "course_title": "新入职员工保密培训",\r\n      "course_category": "新员工培训",\r\n      "course_teacher": "吴九",\r\n      "created_at": "2025-08-07"\r\n    },\r\n    {\r\n      "id": 8,\r\n      "course_title": "办公消防安全指南",\r\n      "course_category": "新员工培训",\r\n      "course_teacher": "郑十",\r\n      "created_at": "2025-08-08"\r\n    },\r\n    {\r\n      "id": 9,\r\n      "course_title": "项目管理",\r\n      "course_category": "新员工培训",\r\n      "course_teacher": "钱十一",\r\n      "created_at": "2025-08-09"\r\n    },\r\n    {\r\n      "id": 10,\r\n      "course_title": "UI设计",\r\n      "course_category": "办公技能",\r\n      "course_teacher": "孙十二",\r\n      "created_at": "2025-08-10"\r\n    }\r\n  ]\r\n}'
                },
                type: 'code'
            },
            height: {
                mode: 'adapt'
            },
            pagination: {
                defaultPageSize: 10
            },
            rowSelection: {
                enable: true
            },
            style: {
                marginBottom: null,
                marginTop: null
            },
            zebraConfig: {
                open: false
            },
            slotArea: [],
            filter: [
                {
                    type: 'input',
                    _id: 'unique-id-a1e714ec67fb',
                    label: '课程名称',
                    name: 'course_title',
                    placeholder: '请输入内容',
                    layoutConfig: {
                        span: 6
                    }
                },
                {
                    type: 'single-select',
                    _id: 'unique-id-523698c52741',
                    alias: '课程种类',
                    label: '课程种类',
                    name: 'course_category',
                    placeholder: '请选择',
                    show: 'SELECT',
                    dataSource: {
                        type: 'data_table_method'
                    },
                    layoutConfig: {
                        span: 6
                    },
                    options: [
                        {
                            label: '新员工培训',
                            value: 'a'
                        },
                        {
                            label: '党建学习',
                            value: 'b'
                        },
                        {
                            label: '集团文化',
                            value: 'c'
                        },
                        {
                            label: '师资培养',
                            value: 'd'
                        },
                        {
                            label: '职业素养',
                            value: 'e'
                        },
                        {
                            label: '办公技能',
                            value: 'f'
                        }
                    ]
                },
                {
                    type: 'personnel',
                    _id: 'unique-id-6c12428a3e20',
                    label: '课程讲师',
                    name: 'course_teacher',
                    layoutConfig: {
                        span: 6
                    }
                },
                {
                    type: 'date-range-picker',
                    _id: 'unique-id-33aefbffbe63',
                    label: '创建时间',
                    name: 'created_at',
                    placeholder: '请选择',
                    layoutConfig: {
                        span: 6
                    }
                }
            ],
            topBarArea: [
                {
                    type: 'button',
                    _funcKey: 'add',
                    _id: 'unique-id-2a641e36b6c5',
                    alias: '新增',
                    text: '新增',
                    events: {
                        onClick: [
                            {
                                options: {
                                    schema: {
                                        _funcKey: 'addModal',
                                        data: {
                                            submitLoading: false
                                        },
                                        size: 'custom',
                                        footer: [
                                            {
                                                buttonType: 'default',
                                                _id: 'unique-id-0c4cc5ea56d0',
                                                label: '取消',
                                                type: 'button',
                                                events: {
                                                    onClick: [
                                                        {
                                                            nodeName: '关闭弹窗/抽屉',
                                                            options: {
                                                                nodeId: 'unique-id-a56eb805fef2'
                                                            },
                                                            action: 'closePopups',
                                                            actionId: 'closePopups022'
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                buttonType: 'primary',
                                                $$loading: {
                                                    type: 'EXPRESSION',
                                                    value: '${submitLoading}'
                                                },
                                                alias: '确定',
                                                _id: 'unique-id-893b987ced9e',
                                                label: '确定',
                                                type: 'button',
                                                events: {
                                                    onClick: [
                                                        {
                                                            options: {
                                                                _id: 'unique-id-a56eb805fef2',
                                                                list: [
                                                                    {
                                                                        name: 'submitLoading',
                                                                        value: {
                                                                            mode: 'CONSTANT',
                                                                            value: true
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            action: 'updateStore',
                                                            actionId: 'updateStore882',
                                                            eventName: '更新数据域'
                                                        },
                                                        {
                                                            options: {
                                                                component: {
                                                                    page: 'unique-id-9f16d2fb7279'
                                                                },
                                                                method: {
                                                                    page: 'submit'
                                                                },
                                                                range: 'page'
                                                            },
                                                            action: 'dispatchAction',
                                                            actionId: 'dispatchAction449',
                                                            callback: {
                                                                onSuccess: [
                                                                    {
                                                                        options: {
                                                                            _id: 'unique-id-a56eb805fef2',
                                                                            list: [
                                                                                {
                                                                                    name: 'submitLoading',
                                                                                    value: {
                                                                                        mode: 'CONSTANT',
                                                                                        value: false
                                                                                    }
                                                                                }
                                                                            ]
                                                                        },
                                                                        action: 'updateStore',
                                                                        actionId: 'updateStore832',
                                                                        eventName: '更新数据域'
                                                                    },
                                                                    {
                                                                        options: {
                                                                            nodeId: [
                                                                                'unique-id-a56eb805fef2'
                                                                            ]
                                                                        },
                                                                        action: 'closePopups',
                                                                        actionId: 'closePopups030',
                                                                        eventName: '关闭弹窗/抽屉'
                                                                    },
                                                                    {
                                                                        options: {
                                                                            component: {
                                                                                page: 'unique-id-741a7bdd7be4'
                                                                            },
                                                                            method: {
                                                                                page: 'refresh'
                                                                            },
                                                                            range: 'page'
                                                                        },
                                                                        action: 'dispatchAction',
                                                                        actionId: 'dispatchAction021',
                                                                        eventName: '调用指定组件方法'
                                                                    }
                                                                ]
                                                            },
                                                            eventName: '调用指定组件方法'
                                                        }
                                                    ]
                                                }
                                            }
                                        ],
                                        alias: '新建弹窗',
                                        _id: 'unique-id-a56eb805fef2',
                                        label: '新建',
                                        type: 'modal',
                                        content: [
                                            {
                                                visible: true,
                                                buttonArea: [],
                                                preserve: true,
                                                body: [],
                                                type: 'form',
                                                layout: 'vertical',
                                                _funcKey: 'addForm',
                                                labelAlign: 'right',
                                                enableButtonArea: false,
                                                alias: '新建表单',
                                                _id: 'unique-id-9f16d2fb7279',
                                                api: {},
                                                defaultValueType: 'visual'
                                            }
                                        ],
                                        height: {
                                            mode: 'max',
                                            value: '600px'
                                        }
                                    },
                                    type: 'custom'
                                },
                                action: 'addModal',
                                actionId: 'addModal055',
                                eventName: '新建弹窗'
                            }
                        ]
                    }
                },
                {
                    type: 'button',
                    _funcKey: 'batchDelete',
                    _id: 'unique-id-c176bc2bf320',
                    alias: '批量删除',
                    buttonType: 'danger',
                    text: '批量删除',
                    $$disabled: {
                        type: 'EXPRESSION',
                        value: '${!xcTableSelectedRows?.ids?.length > 0}'
                    },
                    events: {
                        onClick: [
                            {
                                options: {
                                    schema: {
                                        _funcKey: 'batchDeleteModal',
                                        data: {
                                            submitLoading: false
                                        },
                                        size: 'custom',
                                        footer: [
                                            {
                                                buttonType: 'default',
                                                _id: 'unique-id-817cf58f3260',
                                                label: '取消',
                                                type: 'button',
                                                events: {
                                                    onClick: [
                                                        {
                                                            nodeName: '关闭弹窗/抽屉',
                                                            options: {
                                                                nodeId: 'unique-id-0cd63572ad10'
                                                            },
                                                            action: 'closePopups',
                                                            actionId: 'closePopups022'
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                buttonType: 'primary',
                                                $$loading: {
                                                    type: 'EXPRESSION',
                                                    value: '${submitLoading}'
                                                },
                                                alias: '确定',
                                                _id: 'unique-id-8c4fdece0250',
                                                label: '确定',
                                                type: 'button',
                                                events: {
                                                    onClick: [
                                                        {
                                                            options: {
                                                                _id: 'unique-id-0cd63572ad10',
                                                                list: [
                                                                    {
                                                                        name: 'submitLoading',
                                                                        value: {
                                                                            mode: 'CONSTANT',
                                                                            value: true
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            action: 'updateStore',
                                                            actionId: 'updateStore882',
                                                            eventName: '更新数据域'
                                                        },
                                                        {
                                                            options: {
                                                                component: {
                                                                    page: 'unique-id-7d653b99d1ee'
                                                                },
                                                                method: {
                                                                    page: 'submit'
                                                                },
                                                                range: 'page'
                                                            },
                                                            action: 'dispatchAction',
                                                            actionId: 'dispatchAction449',
                                                            callback: {
                                                                onSuccess: [
                                                                    {
                                                                        options: {
                                                                            _id: 'unique-id-0cd63572ad10',
                                                                            list: [
                                                                                {
                                                                                    name: 'submitLoading',
                                                                                    value: {
                                                                                        mode: 'CONSTANT',
                                                                                        value: false
                                                                                    }
                                                                                }
                                                                            ]
                                                                        },
                                                                        action: 'updateStore',
                                                                        actionId: 'updateStore832',
                                                                        eventName: '更新数据域'
                                                                    },
                                                                    {
                                                                        options: {
                                                                            nodeId: [
                                                                                'unique-id-0cd63572ad10'
                                                                            ]
                                                                        },
                                                                        action: 'closePopups',
                                                                        actionId: 'closePopups030',
                                                                        eventName: '关闭弹窗/抽屉'
                                                                    },
                                                                    {
                                                                        options: {
                                                                            component: {
                                                                                page: 'unique-id-741a7bdd7be4'
                                                                            },
                                                                            method: {
                                                                                page: 'refresh'
                                                                            },
                                                                            range: 'page'
                                                                        },
                                                                        action: 'dispatchAction',
                                                                        actionId: 'dispatchAction021',
                                                                        eventName: '调用指定组件方法'
                                                                    }
                                                                ]
                                                            },
                                                            eventName: '调用指定组件方法'
                                                        }
                                                    ]
                                                }
                                            }
                                        ],
                                        width: '520px',
                                        alias: '批量删除弹窗',
                                        _id: 'unique-id-0cd63572ad10',
                                        label: '批量删除',
                                        type: 'modal',
                                        content: [
                                            {
                                                visible: true,
                                                buttonArea: [],
                                                preserve: true,
                                                body: [
                                                    {
                                                        _id: 'unique-id-61f9f51ca12e',
                                                        type: 'text',
                                                        content: '是否确认删除？'
                                                    }
                                                ],
                                                type: 'form',
                                                layout: 'vertical',
                                                _funcKey: 'batchDeleteForm',
                                                labelAlign: 'right',
                                                enableButtonArea: false,
                                                alias: '批量删除表单',
                                                noBordered: true,
                                                _id: 'unique-id-7d653b99d1ee',
                                                api: {},
                                                defaultValueType: 'visual'
                                            }
                                        ],
                                        height: {
                                            mode: 'fix',
                                            value: '200px'
                                        }
                                    },
                                    type: 'custom'
                                },
                                action: 'addModal',
                                actionId: 'addModal055',
                                eventName: '批量删除弹窗'
                            }
                        ]
                    }
                }
            ],
            columns: [
                {
                    type: 'table-column',
                    _id: 'unique-id-94d910938644',
                    alias: '课程封面',
                    label: '课程封面',
                    name: 'course_cover',
                    widthM: 48,
                    body: [
                        {
                            type: 'image',
                            _id: 'unique-id-ef4eb7bd67f7',
                            fit: 'contain',
                            preview: true,
                            size: 'custom',
                            width: '80px',
                            image: {
                                img: '//s3gw.cmbchina.com/lt5230-images-prd/TFQ1NC4wMQ==/a87cb2a3705641a7bb906f80f966f064'
                            }
                        }
                    ]
                },
                {
                    type: 'table-column',
                    _id: 'unique-id-53ff66f4c00a',
                    alias: '课程名称',
                    label: '课程名称',
                    name: 'course_title',
                    width: 256,
                    body: []
                },
                {
                    type: 'table-column',
                    _id: 'unique-id-74786e4692ca',
                    label: '课程种类',
                    name: 'course_category',
                    body: [
                        {
                            type: 'tag',
                            _id: 'unique-id-69604ec51190',
                            borderRadius: 20,
                            displayMode: 'rounded',
                            fill: 'border',
                            size: 'small',
                            color: {
                                mode: 'quick',
                                quick: 'orange'
                            },
                            $$content: {
                                type: 'EXPRESSION',
                                value: '${xcTableValue}'
                            },
                            $$visible: {
                                type: 'EXPRESSION',
                                value: "${xcTableValue === '党建学习'}"
                            }
                        },
                        {
                            type: 'tag',
                            _id: 'unique-id-7998cbeb4097',
                            borderRadius: 20,
                            displayMode: 'rounded',
                            fill: 'border',
                            size: 'small',
                            color: {
                                mode: 'quick',
                                quick: 'purple'
                            },
                            $$content: {
                                type: 'EXPRESSION',
                                value: '${xcTableValue}'
                            },
                            $$visible: {
                                type: 'EXPRESSION',
                                value: "${xcTableValue ==='师资培养'}"
                            }
                        },
                        {
                            type: 'tag',
                            _id: 'unique-id-643559203632',
                            borderRadius: 20,
                            displayMode: 'rounded',
                            fill: 'border',
                            size: 'small',
                            color: {
                                mode: 'quick',
                                quick: 'magenta'
                            },
                            $$content: {
                                type: 'EXPRESSION',
                                value: '${xcTableValue}'
                            },
                            $$visible: {
                                type: 'EXPRESSION',
                                value: "${xcTableValue === '新员工培训'}"
                            }
                        },
                        {
                            type: 'tag',
                            _id: 'unique-id-20f8d9a7b9bb',
                            borderRadius: 20,
                            displayMode: 'rounded',
                            fill: 'border',
                            size: 'small',
                            color: {
                                mode: 'quick',
                                quick: 'volcano'
                            },
                            $$content: {
                                type: 'EXPRESSION',
                                value: '${xcTableValue}'
                            },
                            $$visible: {
                                type: 'EXPRESSION',
                                value: "${xcTableValue == '集团文化'}"
                            }
                        },
                        {
                            type: 'tag',
                            _id: 'unique-id-cd54a3f25b32',
                            borderRadius: 20,
                            displayMode: 'rounded',
                            fill: 'border',
                            size: 'small',
                            color: {
                                mode: 'quick',
                                quick: 'processing'
                            },
                            $$content: {
                                type: 'EXPRESSION',
                                value: '${xcTableValue}'
                            },
                            $$visible: {
                                type: 'EXPRESSION',
                                value: "${xcTableValue=='办公技能'}"
                            }
                        },
                        {
                            type: 'tag',
                            _id: 'unique-id-a3c809762d3b',
                            borderRadius: 20,
                            displayMode: 'rounded',
                            fill: 'border',
                            size: 'small',
                            color: {
                                mode: 'quick',
                                quick: 'cyan'
                            },
                            $$content: {
                                type: 'EXPRESSION',
                                value: '${xcTableValue}'
                            },
                            $$visible: {
                                type: 'EXPRESSION',
                                value: "${xcTableValue=='职业素养'}"
                            }
                        }
                    ]
                },
                {
                    type: 'table-column',
                    _id: 'unique-id-1380045dff4b',
                    alias: '课程讲师',
                    ellipsis: false,
                    label: '课程讲师',
                    name: 'course_teacher',
                    mapping: {
                        mode: 'simple',
                        enable: true,
                        mappingType: 'text',
                        simpleValue: 'text',
                        $$options: {
                            type: 'EXPRESSION',
                            value: ''
                        }
                    },
                    body: [
                        {
                            type: 'container',
                            _id: 'unique-id-e0bbb92e339b',
                            className: '',
                            flex: {
                                alignItems: 'center',
                                enable: true,
                                justify: 'flex-start',
                                direction: 'row'
                            },
                            style: {},
                            body: [
                                {
                                    type: 'text',
                                    _id: 'unique-id-f28c12d9fbed',
                                    ellipsis: true,
                                    maxRow: 1,
                                    $$content: {
                                        type: 'EXPRESSION',
                                        value: "${CONCAT(xcUser?.name ?? '讲师001','/',xcUser?.memberId ?? '000001')}"
                                    },
                                    style: {
                                        overflow: 'hidden',
                                        'white-space': 'nowrap',
                                        width: '120px',
                                        marginBottom: 0,
                                        'text-overflow': 'ellipsis'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'table-column',
                    _id: 'unique-id-2f731bf6d771',
                    alias: '开课时间',
                    ellipsis: false,
                    label: '开课时间',
                    name: 'created_at',
                    sortable: true,
                    mapping: {
                        mode: 'simple',
                        enable: true,
                        mappingType: 'custom',
                        simpleValue: 'text',
                        $$options: {
                            type: 'EXPRESSION',
                            value: '${TODAY()}'
                        }
                    },
                    body: []
                },
                {
                    type: 'table-column',
                    _id: 'unique-id-f8dd987c7cec',
                    alias: '操作',
                    columnType: 'operation',
                    label: '操作',
                    name: 'operation',
                    mapping: {
                        enable: false,
                        mappingType: 'simple',
                        simpleValue: 'text'
                    },
                    body: [
                        {
                            type: 'button',
                            _funcKey: 'operationEdit',
                            _id: 'unique-id-45eef31cd786',
                            alias: '编辑',
                            buttonType: 'link',
                            size: 'small',
                            text: '编辑',
                            events: {
                                onClick: [
                                    {
                                        options: {
                                            schema: {
                                                _funcKey: 'operationEditModal',
                                                data: {
                                                    submitLoading: false
                                                },
                                                size: 'custom',
                                                footer: [
                                                    {
                                                        buttonType: 'default',
                                                        _id: 'unique-id-18c0a1a7c9ee',
                                                        label: '取消',
                                                        type: 'button',
                                                        events: {
                                                            onClick: [
                                                                {
                                                                    nodeName: '关闭弹窗/抽屉',
                                                                    options: {
                                                                        nodeId: 'unique-id-2ba78d8587fb'
                                                                    },
                                                                    action: 'closePopups',
                                                                    actionId: 'closePopups022'
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        buttonType: 'primary',
                                                        $$loading: {
                                                            type: 'EXPRESSION',
                                                            value: '${submitLoading}'
                                                        },
                                                        alias: '确定',
                                                        _id: 'unique-id-06a24d82f761',
                                                        label: '确定',
                                                        type: 'button',
                                                        events: {
                                                            onClick: [
                                                                {
                                                                    options: {
                                                                        _id: 'unique-id-2ba78d8587fb',
                                                                        list: [
                                                                            {
                                                                                name: 'submitLoading',
                                                                                value: {
                                                                                    mode: 'CONSTANT',
                                                                                    value: true
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    action: 'updateStore',
                                                                    actionId: 'updateStore882',
                                                                    eventName: '更新数据域'
                                                                },
                                                                {
                                                                    options: {
                                                                        component: {
                                                                            page: 'unique-id-3268df870756'
                                                                        },
                                                                        method: {
                                                                            page: 'submit'
                                                                        },
                                                                        range: 'page'
                                                                    },
                                                                    action: 'dispatchAction',
                                                                    actionId: 'dispatchAction449',
                                                                    callback: {
                                                                        onSuccess: [
                                                                            {
                                                                                options: {
                                                                                    _id: 'unique-id-2ba78d8587fb',
                                                                                    list: [
                                                                                        {
                                                                                            name: 'submitLoading',
                                                                                            value: {
                                                                                                mode: 'CONSTANT',
                                                                                                value: false
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                action: 'updateStore',
                                                                                actionId: 'updateStore832',
                                                                                eventName: '更新数据域'
                                                                            },
                                                                            {
                                                                                options: {
                                                                                    nodeId: [
                                                                                        'unique-id-2ba78d8587fb'
                                                                                    ]
                                                                                },
                                                                                action: 'closePopups',
                                                                                actionId: 'closePopups030',
                                                                                eventName: '关闭弹窗/抽屉'
                                                                            },
                                                                            {
                                                                                options: {
                                                                                    component: {
                                                                                        page: 'unique-id-741a7bdd7be4'
                                                                                    },
                                                                                    method: {
                                                                                        page: 'refresh'
                                                                                    },
                                                                                    range: 'page'
                                                                                },
                                                                                action: 'dispatchAction',
                                                                                actionId: 'dispatchAction021',
                                                                                eventName: '调用指定组件方法'
                                                                            }
                                                                        ]
                                                                    },
                                                                    eventName: '调用指定组件方法'
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                alias: '编辑弹窗',
                                                _id: 'unique-id-2ba78d8587fb',
                                                label: '编辑',
                                                type: 'modal',
                                                content: [
                                                    {
                                                        touched: true,
                                                        visible: true,
                                                        $$defaultValue: {
                                                            type: 'JAVASCRIPT',
                                                            value: 'return JSON.stringify(xcTableRow)'
                                                        },
                                                        buttonArea: [],
                                                        preserve: true,
                                                        body: [],
                                                        type: 'form',
                                                        layout: 'vertical',
                                                        _funcKey: 'operationEditForm',
                                                        labelAlign: 'right',
                                                        enableButtonArea: false,
                                                        alias: '编辑表单',
                                                        _id: 'unique-id-3268df870756',
                                                        api: {},
                                                        defaultValueType: 'code'
                                                    }
                                                ],
                                                height: {
                                                    mode: 'max',
                                                    value: '600px'
                                                }
                                            },
                                            type: 'custom'
                                        },
                                        action: 'addModal',
                                        actionId: 'addModal055',
                                        eventName: '编辑弹窗'
                                    }
                                ]
                            }
                        },
                        {
                            type: 'button',
                            _funcKey: 'operationDetail',
                            _id: 'unique-id-dfbfe138aae4',
                            alias: '查看详情',
                            buttonType: 'link',
                            size: 'small',
                            text: '查看详情',
                            events: {
                                onClick: [
                                    {
                                        options: {
                                            schema: {
                                                _funcKey: 'operationDetailModal',
                                                data: {
                                                    submitLoading: false
                                                },
                                                size: 'custom',
                                                footer: [
                                                    {
                                                        buttonType: 'default',
                                                        _id: 'unique-id-33bd4e269f56',
                                                        label: '取消',
                                                        type: 'button',
                                                        events: {
                                                            onClick: [
                                                                {
                                                                    nodeName: '关闭弹窗/抽屉',
                                                                    options: {
                                                                        nodeId: 'unique-id-0f38f6304ea8'
                                                                    },
                                                                    action: 'closePopups',
                                                                    actionId: 'closePopups022'
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        buttonType: 'primary',
                                                        alias: '确定',
                                                        _id: 'unique-id-db8170231549',
                                                        label: '确定',
                                                        type: 'button',
                                                        events: {
                                                            onClick: [
                                                                {
                                                                    nodeName: '关闭弹窗/抽屉',
                                                                    options: {
                                                                        nodeId: [
                                                                            'unique-id-0f38f6304ea8'
                                                                        ]
                                                                    },
                                                                    action: 'closePopups',
                                                                    actionId: 'closePopups030'
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                alias: '查看详情弹窗',
                                                _id: 'unique-id-0f38f6304ea8',
                                                label: '查看详情',
                                                type: 'modal',
                                                content: [
                                                    {
                                                        visible: true,
                                                        buttonArea: [],
                                                        initApi: {},
                                                        readOnly: true,
                                                        preserve: true,
                                                        body: [],
                                                        type: 'form',
                                                        layout: 'vertical',
                                                        _funcKey: 'operationDetailForm',
                                                        labelAlign: 'right',
                                                        enableButtonArea: false,
                                                        alias: '查看详情表单',
                                                        _id: 'unique-id-0f02259d274c',
                                                        api: {}
                                                    }
                                                ],
                                                height: {
                                                    mode: 'max',
                                                    value: '600px'
                                                }
                                            },
                                            type: 'custom'
                                        },
                                        action: 'addModal',
                                        actionId: 'addModal055',
                                        eventName: '查看详情弹窗'
                                    }
                                ]
                            }
                        },
                        {
                            type: 'button',
                            _funcKey: 'operationDelete',
                            _id: 'unique-id-d76457f5740b',
                            alias: '删除',
                            buttonType: 'danger-no-border',
                            size: 'small',
                            text: '删除',
                            events: {
                                onClick: [
                                    {
                                        options: {
                                            schema: {
                                                _funcKey: 'operationDeleteModal',
                                                data: {
                                                    submitLoading: false
                                                },
                                                size: 'custom',
                                                footer: [
                                                    {
                                                        buttonType: 'default',
                                                        _id: 'unique-id-2f7330b87a9a',
                                                        label: '取消',
                                                        type: 'button',
                                                        events: {
                                                            onClick: [
                                                                {
                                                                    nodeName: '关闭弹窗/抽屉',
                                                                    options: {
                                                                        nodeId: 'unique-id-65dcaedc91a7'
                                                                    },
                                                                    action: 'closePopups',
                                                                    actionId: 'closePopups022'
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        buttonType: 'primary',
                                                        $$loading: {
                                                            type: 'EXPRESSION',
                                                            value: '${submitLoading}'
                                                        },
                                                        alias: '确定',
                                                        _id: 'unique-id-656486f2f961',
                                                        label: '确定',
                                                        type: 'button',
                                                        events: {
                                                            onClick: [
                                                                {
                                                                    options: {
                                                                        _id: 'unique-id-65dcaedc91a7',
                                                                        list: [
                                                                            {
                                                                                name: 'submitLoading',
                                                                                value: {
                                                                                    mode: 'CONSTANT',
                                                                                    value: true
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    action: 'updateStore',
                                                                    actionId: 'updateStore882',
                                                                    eventName: '更新数据域'
                                                                },
                                                                {
                                                                    options: {
                                                                        component: {
                                                                            page: 'unique-id-36de7349a040'
                                                                        },
                                                                        method: {
                                                                            page: 'submit'
                                                                        },
                                                                        range: 'page'
                                                                    },
                                                                    action: 'dispatchAction',
                                                                    actionId: 'dispatchAction449',
                                                                    callback: {
                                                                        onSuccess: [
                                                                            {
                                                                                options: {
                                                                                    _id: 'unique-id-65dcaedc91a7',
                                                                                    list: [
                                                                                        {
                                                                                            name: 'submitLoading',
                                                                                            value: {
                                                                                                mode: 'CONSTANT',
                                                                                                value: false
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                action: 'updateStore',
                                                                                actionId: 'updateStore832',
                                                                                eventName: '更新数据域'
                                                                            },
                                                                            {
                                                                                options: {
                                                                                    nodeId: [
                                                                                        'unique-id-65dcaedc91a7'
                                                                                    ]
                                                                                },
                                                                                action: 'closePopups',
                                                                                actionId: 'closePopups030',
                                                                                eventName: '关闭弹窗/抽屉'
                                                                            },
                                                                            {
                                                                                options: {
                                                                                    component: {
                                                                                        page: 'unique-id-741a7bdd7be4'
                                                                                    },
                                                                                    method: {
                                                                                        page: 'refresh'
                                                                                    },
                                                                                    range: 'page'
                                                                                },
                                                                                action: 'dispatchAction',
                                                                                actionId: 'dispatchAction021',
                                                                                eventName: '调用指定组件方法'
                                                                            }
                                                                        ]
                                                                    },
                                                                    eventName: '调用指定组件方法'
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                width: '520px',
                                                alias: '删除弹窗',
                                                _id: 'unique-id-65dcaedc91a7',
                                                label: '删除',
                                                type: 'modal',
                                                content: [
                                                    {
                                                        visible: true,
                                                        buttonArea: [],
                                                        preserve: true,
                                                        body: [
                                                            {
                                                                _id: 'unique-id-02bdcde69e5a',
                                                                type: 'text',
                                                                content: '是否确认删除？'
                                                            }
                                                        ],
                                                        type: 'form',
                                                        layout: 'vertical',
                                                        _funcKey: 'operationDeleteForm',
                                                        labelAlign: 'right',
                                                        enableButtonArea: false,
                                                        alias: '删除表单',
                                                        noBordered: true,
                                                        _id: 'unique-id-36de7349a040',
                                                        api: {},
                                                        defaultValueType: 'visual'
                                                    }
                                                ],
                                                height: {
                                                    mode: 'fix',
                                                    value: '200px'
                                                }
                                            },
                                            type: 'custom'
                                        },
                                        action: 'addModal',
                                        actionId: 'addModal055',
                                        eventName: '删除弹窗'
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ]
};
const FORM_SCHEMA = {
    type: 'page',
    _id: 'unique-id-51631769d383',
    data: {
        xcScreen: 'WIDE'
    },
    initApi: {
        type: 'data_table_method'
    },
    body: [
        {
            type: 'form',
            _id: 'unique-id-81b3aec3fb8e',
            alias: '示例表单页',
            enableButtonArea: true,
            label: '示例表单页',
            labelAlign: 'right',
            layout: 'vertical',
            preserve: true,
            toolbarPlacement: 'right',
            visible: true,
            body: [
                {
                    type: 'switch',
                    _id: 'unique-id-3810a75b8b3c',
                    defaultValue: 1,
                    label: '开关',
                    name: 'switch',
                    layoutConfig: {
                        span: 12
                    },
                    options: [
                        {
                            label: '打开',
                            value: 1
                        },
                        {
                            label: '关闭',
                            value: 0
                        }
                    ]
                },
                {
                    type: 'switch',
                    _id: 'unique-id-7b564d652f19',
                    defaultValue: 1,
                    label: '开关',
                    name: 'switch1',
                    size: 'small',
                    visible: true,
                    layoutConfig: {
                        span: 12
                    },
                    options: [
                        {
                            label: '',
                            value: 1
                        },
                        {
                            label: '',
                            value: 0
                        }
                    ]
                },
                {
                    type: 'file-upload',
                    _id: 'unique-id-cd8e8433792d',
                    allowDownload: true,
                    allowPreview: false,
                    btnLabel: '文件上传',
                    draggable: false,
                    label: '文件上传',
                    manual: false,
                    maxNumber: 10,
                    mode: 'MULTIPLE',
                    name: 'fileUpload',
                    visible: true,
                    docFormat: [
                        {
                            types: [
                                '.doc',
                                '.docx',
                                '.wps',
                                '.txt',
                                '.pdf',
                                '.xls',
                                '.xlsx',
                                '.ppt',
                                '.pptx',
                                '.xml',
                                '.htm',
                                '.html'
                            ],
                            category: 'WORD'
                        },
                        {
                            types: [
                                '.rar',
                                '.zip',
                                '.7z'
                            ],
                            category: 'PACKAGE'
                        }
                    ],
                    layoutConfig: {
                        span: 12
                    },
                    maxSize: {
                        unit: 'MB',
                        size: 10
                    }
                },
                {
                    type: 'image-upload',
                    _id: 'unique-id-399c967ab060',
                    alias: '图片上传',
                    allowDownload: true,
                    label: '图片上传',
                    maxNumber: 10,
                    name: 'image_upload',
                    styleMode: 'PICTURE',
                    docFormat: [
                        {
                            types: [
                                '.jpg',
                                '.jpeg',
                                '.png',
                                '.webp',
                                '.gif',
                                '.bmp'
                            ],
                            category: 'PICTURE'
                        }
                    ],
                    layoutConfig: {
                        span: 12
                    },
                    maxSize: {
                        unit: 'MB',
                        size: 10
                    }
                },
                {
                    type: 'file-upload',
                    _id: 'unique-id-f27643f05bdd',
                    allowDownload: true,
                    allowPreview: false,
                    btnLabel: '文件上传',
                    draggable: true,
                    label: '文件上传',
                    manual: false,
                    maxNumber: 10,
                    mode: 'MULTIPLE',
                    name: 'fileUpload',
                    visible: true,
                    docFormat: [
                        {
                            types: [
                                '.doc',
                                '.docx',
                                '.wps',
                                '.txt',
                                '.pdf',
                                '.xls',
                                '.xlsx',
                                '.ppt',
                                '.pptx',
                                '.xml',
                                '.htm',
                                '.html'
                            ],
                            category: 'WORD'
                        },
                        {
                            types: [
                                '.rar',
                                '.zip',
                                '.7z'
                            ],
                            category: 'PACKAGE'
                        }
                    ],
                    layoutConfig: {
                        span: 12
                    },
                    maxSize: {
                        unit: 'MB',
                        size: 10
                    }
                },
                {
                    type: 'image-upload',
                    _id: 'unique-id-a4d6597dc1c8',
                    alias: '图片上传',
                    label: '图片上传',
                    maxNumber: 10,
                    name: 'image_upload',
                    styleMode: 'PICTURE_CARD',
                    docFormat: [
                        {
                            types: [
                                '.jpg',
                                '.jpeg',
                                '.png',
                                '.webp',
                                '.gif',
                                '.bmp'
                            ],
                            category: 'PICTURE'
                        }
                    ],
                    layoutConfig: {
                        span: 12
                    },
                    maxSize: {
                        unit: 'MB',
                        size: 10
                    }
                },
                {
                    type: 'single-select',
                    _id: 'unique-id-43e77358f4cb',
                    alias: '单选',
                    label: '单选',
                    name: 'single_select',
                    placeholder: '请选择',
                    show: 'SELECT',
                    layoutConfig: {
                        block: false,
                        span: 12
                    },
                    options: [
                        {
                            label: '选项一',
                            value: 'a'
                        },
                        {
                            label: '选项二',
                            value: 'b'
                        }
                    ]
                },
                {
                    type: 'cascade',
                    _id: 'unique-id-80eb942e7de7',
                    alias: '级联',
                    label: '级联',
                    name: 'cascade',
                    placeholder: '请选择',
                    layoutConfig: {
                        span: 12
                    },
                    options: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            label: '选项1_1_1',
                                            value: '1_1_1'
                                        }
                                    ],
                                    label: '选项1_1',
                                    value: '1_1'
                                }
                            ],
                            label: '选项一',
                            value: '1'
                        },
                        {
                            label: '选项二',
                            value: '2'
                        }
                    ]
                },
                {
                    type: 'input',
                    _id: 'unique-id-48a27c3a2ec1',
                    alias: '短文本',
                    label: '短文本',
                    name: 'input',
                    placeholder: '请输入内容',
                    layoutConfig: {
                        span: 12
                    }
                },
                {
                    type: 'input-number',
                    _id: 'unique-id-58e3bda7fb17',
                    alias: '数字输入框',
                    label: '数字输入框',
                    name: 'inputnumber',
                    placeholder: '请输入数字',
                    layoutConfig: {
                        span: 12
                    }
                },
                {
                    type: 'time-picker',
                    _id: 'unique-id-1ab9d1cc0b5a',
                    alias: '时间',
                    label: '时间',
                    name: 'time-picker',
                    placeholder: '请选择',
                    layoutConfig: {
                        span: 12
                    }
                },
                {
                    type: 'date-range-picker',
                    _id: 'unique-id-9e731ec1b9c5',
                    alias: '日期范围',
                    label: '日期范围',
                    name: 'date-range-picker',
                    placeholder: '请选择',
                    layoutConfig: {
                        span: 12
                    }
                },
                {
                    type: 'date-picker',
                    _id: 'unique-id-ca1fbf527c2d',
                    alias: '日期',
                    label: '日期',
                    name: 'date-picker',
                    placeholder: '请选择',
                    layoutConfig: {
                        span: 12
                    }
                },
                {
                    type: 'time-range-picker',
                    _id: 'unique-id-e3dd9576653f',
                    alias: '时间范围',
                    label: '时间范围',
                    name: 'time-range-picker',
                    placeholder: '请选择',
                    layoutConfig: {
                        span: 12
                    }
                },
                {
                    type: 'landline-phone',
                    _id: 'unique-id-b85b617c7d0e',
                    alias: '固定电话',
                    label: '固定电话',
                    name: 'landline_phone',
                    placeholder: '请输入固定电话',
                    visible: true,
                    layoutConfig: {
                        span: 12
                    }
                },
                {
                    type: 'phone-number',
                    _id: 'unique-id-b5e731a19f86',
                    alias: '手机号',
                    label: '手机号',
                    name: 'phone_number',
                    placeholder: '请输入手机号',
                    visible: true,
                    layoutConfig: {
                        span: 12
                    }
                },
                {
                    type: 'id-card',
                    _id: 'unique-id-a111e55a3bca',
                    alias: '身份证',
                    label: '身份证',
                    name: 'id_card',
                    placeholder: '请输入身份证号码',
                    layoutConfig: {
                        span: 12
                    }
                },
                {
                    type: 'area',
                    _id: 'unique-id-b751294894de',
                    alias: '地区',
                    areaType: 'DISTRICT',
                    label: '地区',
                    name: 'area',
                    placeholder: '请选择',
                    visible: true,
                    layoutConfig: {
                        span: 12
                    }
                },
                {
                    type: 'personnel',
                    _id: 'unique-id-53c6a19990e6',
                    alias: '人员',
                    label: '人员',
                    name: 'personnel',
                    layoutConfig: {
                        span: 12
                    }
                },
                {
                    type: 'department',
                    _id: 'unique-id-cdcd82d8a246',
                    alias: '机构',
                    label: '机构',
                    name: 'department',
                    layoutConfig: {
                        span: 12
                    }
                },
                {
                    type: 'textarea',
                    _id: 'unique-id-0bd366b4ff20',
                    label: '长文本',
                    name: 'textarea',
                    placeholder: '请输入内容'
                },
                {
                    type: 'rich-text',
                    _id: 'unique-id-41bfe3e77a1e',
                    alias: '富文本',
                    label: '富文本',
                    name: 'rich_text',
                    placeholder: '请输入',
                    showMenubar: true,
                    toolbar: [
                        'alignleft',
                        'aligncenter',
                        'alignright',
                        'outdent',
                        'indent',
                        'removeformat',
                        'anchor',
                        'codesample',
                        'rtl',
                        'typography'
                    ]
                },
                {
                    type: 'json',
                    _id: 'unique-id-9271ebbc9b35',
                    label: 'JSON',
                    name: 'json'
                }
            ],
            buttonArea: [
                {
                    type: 'button',
                    _id: 'unique-id-87bcbf359923',
                    alias: '辅助按钮',
                    buttonType: 'default',
                    text: '辅助按钮'
                },
                {
                    type: 'button',
                    _id: 'unique-id-bfb12beaaf1b',
                    alias: '次要按钮',
                    buttonType: 'primary-border',
                    text: '次要按钮'
                },
                {
                    type: 'button',
                    '': '主要按钮',
                    _id: 'unique-id-93216c1addfe',
                    buttonType: 'primary',
                    text: '主要按钮'
                }
            ]
        }
    ]
};
window.xcodeThemePreviewSchema = {
    layout: LAYOUT_SCHEMA,
    table: TABLE_SCHEMA,
    form: FORM_SCHEMA
};
