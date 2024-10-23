export { default as MForm } from './index.vue';

/**
 * 表单项配置
 * @typedef {Object} FormInputConfig
 * @property { 'input' } type - 表单类型
 * */

/**
 * 定义列配置
 *
 * @param {Array<FormInputConfig|FormInputConfig>} columns 列配置数组
 * @returns {Array<FormInputConfig>} 返回列配置数组
 */
export function defineFormColumns(columns) {
    return columns;
}
