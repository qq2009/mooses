export { default as MTable } from './index.vue';

/**
 * 列配置
 * @typedef { Object } TableColumnsConfig
 * @property { 'default' | 'selection' | 'index' | 'expand' } type - 列的类型
 * @property { number | Function } index - 如果设置了 type=index，可以通过传递 index 属性来自定义索引
 *
 * @property { string } label - 显示的标题
 * @property { string } prop - 字段名称 对应列内容的字段名
 * @property { string | number } width - 对应列的宽度
 * @property { 'left' | 'center' | 'right' } align - 对齐方式
 * @property { boolean } showOverflowTooltip - 当内容过长被隐藏时显示 tooltip
 *
 * @property { string } slot - 列插槽名
 *
 * @property { Function } formatter - 格式化内容
 * 函数签名：(row, column, cellValue, index) => VNode | string
 * @param { any } row - 行的数据
 * @param { any } column - 列的信息
 * @param { any } cellValue - 单元格的值
 * @param { number } index - 单元格的索引
 *
 * */

/**
 * 定义列配置
 *
 * @param {Array<TableColumnsConfig>} columns 列配置数组
 * @returns {Array<TableColumnsConfig>} 返回列配置数组
 */
export function defineTableColumns(columns) {
    return columns;
}
