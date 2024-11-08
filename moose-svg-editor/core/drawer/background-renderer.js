import { EVENT_TYPE } from '../emitter-type';
import { DRAWER_TYPE } from './constant';

/**
 * 背景绘制类
 */
export default class BackgroundRenderer {
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
     * @param { Rect } target - 操作源
     * */
    createElementHandler(target) {
        const { canvas } = this;
        return {
            type: DRAWER_TYPE.BACKGROUND_PANEL,
            label: '背景',
            id: target.id(),
            target: {
                getFill() {
                    return target.fill();
                },
                setFill(color) {
                    target.fill(color);
                },
                getWidth() {
                    return canvas.width();
                },
                setWidth(width) {
                    canvas.width(width);
                },
                getHeight() {
                    return canvas.height();
                },
                setHeight(height) {
                    canvas.height(height);
                },
                select: null,
            },
        };
    }

    /**
     * 绘制背景
     */
    draw() {
        const { canvas, emitter } = this;
        const rect = canvas.rect('100%', '100%');

        rect.attr({
            fill: '#fff',
        });

        const handler = this.createElementHandler(rect);

        const emitSelectEvent = () => {
            emitter.emit(EVENT_TYPE.SELECT_ELEMENT, handler);
        };

        handler.target.select = emitSelectEvent;

        emitSelectEvent();

        rect.on('click', emitSelectEvent);

        emitter.emit(EVENT_TYPE.ELEMENT_CREATED, handler);
    }
}
