import type { VNode } from 'vue';
import type { TableColumnCtx } from 'element-plus/es/components/table';
import Table from "./index.vue";

export declare const MTable: InstanceType<typeof Table>;

// 定义格式化函数类型
type FormatterMethod<T> = (
    row: T,
    column: TableColumnCtx<T>,
    cellValue: any,
    index: number,
) => VNode | string;

interface TableColumnsConfig {
    // 列类型
    type?: 'default' | 'selection' | 'index' | 'expand';
    // 如果设置了 type=index，可以通过传递 index 属性来自定义索引
    index?: number | Function;
    // 显示的标题
    label: string;
    // 字段名称 对应列内容的字段名
    prop?: string;
    // 对应列的宽度
    width?: string | number;
    // 对齐方式
    align?: 'left' | 'center' | 'right';
    // 当内容过长被隐藏时显示 tooltip 提示
    showOverflowTooltip?: boolean;
    // 列插槽名
    slot?: string;
    // 格式化内容函数
    formatter?: FormatterMethod;
}

export function defineTableColumns(
    columns: TableColumnsConfig[],
): TableColumnsConfig[];
