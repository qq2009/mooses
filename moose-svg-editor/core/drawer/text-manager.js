import { EVENT_TYPE } from '../emitter-type';
import { DRAWER_TYPE } from './constant';

/**
 * 文字绘制类
 */
export default class TextManager {
    /**
     * @type { Svg }
     * */
    canvas = null;

    /**
     * @type { Emitter }
     * */
    emitter = null;

    constructor(canvas, emitter) {
        this.canvas = canvas;
        this.emitter = emitter;
    }

    /**
     * @param { Text } target
     * */
    updateSelectBox(target) {
        target.select(false);
        target.select({
            createHandle: (group, p, index, pointArr, handleName) => {
                return group.circle(0);
            },
            updateHandle: (group, p, index, pointArr, handleName) => {
                return group.center(p[0], p[1]);
            },
        });
    }

    /**
     * @param { Text } target
     * */
    createElementHandler(target) {
        const { canvas } = this;
        return {
            type: DRAWER_TYPE.TEXT_PANEL,
            label: '文字标签',
            id: target.id(),
            target: {
                isSelect: false,
                getFill() {
                    return target.fill();
                },
                setFill(color) {
                    target.fill(color);
                },
                getText() {
                    return target.text();
                },
                setText(newContent) {
                    target.text(newContent);
                    updateSelectBox();
                },
                getSize() {
                    return target.font('size');
                },
                setSize(size) {
                    target.font({ size: size || 0 });
                },
                getWeight() {
                    return target.font('weight');
                },
                setWeight(weight) {
                    target.font({ weight });
                },
                getFontStyle() {
                    return target.font('style');
                },
                setFontStyle(style) {
                    target.font({ style });
                },
                getFontFamily() {
                    return target.font('family');
                },
                setFontFamily(family) {
                    target.font({
                        family,
                    });
                },
                remove() {
                    target.remove();
                },
                deselectAll() {
                    if (this.isSelect) {
                        this.isSelect = false;
                        target.select(false);
                        target.resize(false);
                    }
                },
                select: null
            },
        };
    }

    /**
     * 新增文字
     * */
    addText(x, y, content, options = {}) {
        const { canvas, emitter } = this;
        const text = canvas
            .text(content)
            .move(x, y)
            .font({
                size: options.size || 16,
                fill: options.color || '#000',
                weight: options.weight || 'normal',
                style: options.style || 'normal',
                family: '宋体',
            });

        text.draggable();

        const handler = this.createElementHandler(text);

        const emitSelectEvent = (enable) => {
            if (!handler.target.isSelect) {
                handler.target.isSelect = true;
                text.select({
                    createHandle: (group, p, index, pointArr, handleName) => {
                        return group.circle(0);
                    },
                    updateHandle: (group, p, index, pointArr, handleName) => {
                        return group.center(p[0], p[1]);
                    },
                });
                text.resize();
            }

            emitter.emit(EVENT_TYPE.SELECT_ELEMENT, handler);
        };

        handler.target.select = emitSelectEvent;
        text.on('dragstart', emitSelectEvent);
        text.on('click', emitSelectEvent);


        emitter.emit(EVENT_TYPE.ELEMENT_CREATED, handler);
    }
}
