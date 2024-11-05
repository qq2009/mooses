import { Emitter } from '@mooses/emitter';

export const EVENT_TYPE = {
    // 元素选中
    SELECT_ELEMENT: 'CANVAS:SELECT_ELEMENT',
    // 元素创建
    ELEMENT_CREATED: 'CANVAS:ELEMENT_CREATED'
};

export const emitter = new Emitter();
