import { EVENT_TYPE } from '../emitter-type';
import { DRAWER_TYPE } from './constant';

/**
 * 距形绘制类
 */
export default class RectManager {
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
            type: DRAWER_TYPE.RECT_PANEL,
            label: '距形',
            id: target.id(),
            el: target,
            target: {
                setId(id) {
                    target.id(id);
                },
                getX() {
                    return target.cx();
                },
                setX(x) {
                    target.cx(x);
                },
                getY() {
                    return target.cy();
                },
                setY(y) {
                    target.cy(y);
                },
                getFill() {
                    return target.fill();
                },
                setFill(color) {
                    target.fill(color);
                },
                getColor() {
                    return target.stroke();
                },
                setColor(val) {
                    target.stroke(val);
                },
                getWidth() {
                    return target.width();
                },
                setWidth(width) {
                    target.width(width);
                },
                getHeight() {
                    return target.height();
                },
                setHeight(height) {
                    target.height(height);
                },
                getStrokeWidth() {
                    return target.attr('stroke-width');
                },
                setStrokeWidth(val) {
                    target.stroke({ width: val });
                },
                getStrokeDasharray() {
                    return target.attr('stroke-dasharray');
                },
                setStrokeDasharray(val) {
                    target.stroke({ dasharray: val });
                },
                getTransform() {
                    return target.attr('transform');
                },
                setTransform(val) {
                    target.attr('transform', val);
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
                select: null,
            },
        };
    }

    /**
     * 绘制背景
     */
    addRect(x, y, w, h, options = {}) {
        const { canvas, emitter } = this;

        const rect = canvas
            .rect(w, h)
            .move(x, y)
            .attr({
                fill: options.fill || '#fff',
            })
            .stroke({
                color: options.color || '#000',
                width: options.width || 1,
                dasharray: options.dasharray || '0',
            });

        rect.draggable();

        const handler = this.createElementHandler(rect);

        const emitSelectEvent = () => {
            if (!handler.target.isSelect) {
                handler.target.isSelect = true;
                rect.select();
                rect.resize();
            }

            emitter.emit(EVENT_TYPE.SELECT_ELEMENT, handler);
        };

        handler.target.select = emitSelectEvent;

        rect.on('dragstart', emitSelectEvent);
        rect.on('click', emitSelectEvent);

        emitter.emit(EVENT_TYPE.ELEMENT_CREATED, handler);

        return handler;
    }
}
