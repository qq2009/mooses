import { defineFormColumns } from '@mooses/form';

export const options = defineFormColumns([
    {
        type: 'input',
        field: 'a1',
        label: '姓名',
        span: 12,
        prop: 'a1',
        placeholder: '请输入姓名',
        rules: [
            {
                required: true,
                message: 'Please input Activity name',
                trigger: 'blur',
            },
        ],
    },
    {
        type: 'input-number',
        field: 'a13',
        label: '统计数',
        span: 12,
    },
    {
        type: 'select',
        field: 'a2',
        label: '性别',
        span: 12,
        placeholder: '选择性别',
        options: [
            {
                label: '男',
                value: 1,
            },
            {
                label: '女',
                value: 2,
            },
        ],
    },
    {
        type: 'select-v2',
        field: 'a3',
        label: '年龄',
        span: 12,
        placeholder: '选择年龄',
        options: [
            {
                label: '18',
                value: '18',
            },
            {
                label: '20',
                value: '20',
            },
        ],
    },
    {
        type: 'time-picker',
        field: 'a4',
        label: '时间',
        valueFormat: 'HH:mm:ss',
        placeholder: '选择时间',
        span: 12,
    },
    {
        type: 'time-picker',
        isRange: true,
        startField: 'a5',
        endField: 'a6',
        label: '时间区间',
        valueFormat: 'HH:mm:ss',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        span: 12,
    },
    {
        type: 'cascader',
        field: 'a7',
        label: '地址',
        span: 12,
        options: [
            {
                value: 'guide',
                label: 'Guide',
                children: [
                    {
                        value: 'disciplines',
                        label: 'Disciplines',
                        children: [
                            {
                                value: 'consistency',
                                label: 'Consistency',
                            },
                            {
                                value: 'feedback',
                                label: 'Feedback',
                            },
                            {
                                value: 'efficiency',
                                label: 'Efficiency',
                            },
                            {
                                value: 'controllability',
                                label: 'Controllability',
                            },
                        ],
                    },
                    {
                        value: 'navigation',
                        label: 'Navigation',
                        children: [
                            {
                                value: 'side nav',
                                label: 'Side Navigation',
                            },
                            {
                                value: 'top nav',
                                label: 'Top Navigation',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        type: 'tree-select',
        field: 'a8',
        label: '地址',
        span: 12,
        options: [
            {
                value: 'guide',
                label: 'Guide',
                children: [
                    {
                        value: 'disciplines',
                        label: 'Disciplines',
                        children: [
                            {
                                value: 'consistency',
                                label: 'Consistency',
                            },
                            {
                                value: 'feedback',
                                label: 'Feedback',
                            },
                            {
                                value: 'efficiency',
                                label: 'Efficiency',
                            },
                            {
                                value: 'controllability',
                                label: 'Controllability',
                            },
                        ],
                    },
                    {
                        value: 'navigation',
                        label: 'Navigation',
                        children: [
                            {
                                value: 'side nav',
                                label: 'Side Navigation',
                            },
                            {
                                value: 'top nav',
                                label: 'Top Navigation',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        type: 'time-select',
        field: 'a9',
        label: '时间',
        span: 12,
        start: '08:30',
        step: '00:15',
        end: '18:30',
    },
    {
        type: 'switch',
        field: 'a10',
        label: '开关',
        span: 12,
    },
    {
        type: 'slider',
        field: 'a11',
        label: '开关',
        span: 12,
    },
    {
        type: 'radio',
        field: 'a12',
        label: '单选框',
        span: 12,
        defaultValue: 1,
        options: [
            {
                label: '男',
                value: 1,
            },
            {
                label: '女',
                value: 2,
            },
        ],
    },
    {
        type: 'input-number',
        field: 'a14',
        label: '统计数',
        span: 12,
    },
    {
        type: 'date-picker',
        field: 'a15',
        label: '选择某一天',
        t: 'date',
        span: 12,
    },
    {
        type: 'color-picker',
        field: 'a16',
        label: '颜色选择器',
        span: 12,
    },
    {
        type: 'checkbox',
        field: 'a17',
        label: '多选框',
        span: 12,
        options: [
            {
                label: '男',
                value: 1,
            },
            {
                label: '女',
                value: 2,
            },
        ],
    },
]);
