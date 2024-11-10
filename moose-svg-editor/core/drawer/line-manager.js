import { EVENT_TYPE } from '../emitter-type';
import { DRAWER_TYPE } from './constant';

/**
 * 线绘制类
 * TODO：待实现画笔
 */
export default class LineManager {
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
        const ctx = this;
        const { canvas } = this;
        return {
            type: DRAWER_TYPE.LINE_PANEL,
            label: '直线',
            id: target.id(),
            el: target,
            target: {
                isSelect: false,
                setId(id) {
                    target.id(id);
                },
                getPlot() {
                    return target.plot().flat();
                },
                setPlot(x1, y1, x2, y2) {
                    target.plot(x1, y1, x2, y2);
                },
                getColor() {
                    return target.stroke();
                },
                setColor(val) {
                    target.stroke(val);
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
     * 新增线
     * */
    addLine(x1, y1, x2, y2, options = {}) {
        const { canvas, emitter } = this;
        const line = canvas.line(x1, y1, x2, y2).stroke({
            width: options.width || 1,
            color: options.color || '#000000',
            dasharray: options.dasharray || '0',
        });

        line.draggable();

        const handler = this.createElementHandler(line);

        const emitSelectEvent = () => {
            if (!handler.target.isSelect) {
                handler.target.isSelect = true;
                line.select({
                    createHandle: (group, p, index, pointArr, handleName) => {
                        // 控制左右拖拽
                        if ([3, 7].includes(index)) {
                            return group.circle(1);
                        }
                        return group.circle(0);
                    },
                    updateHandle: (group, p, index, pointArr, handleName) => {
                        return group.center(p[0], p[1]);
                    },
                });
                line.resize();
            }

            emitter.emit(EVENT_TYPE.SELECT_ELEMENT, handler);
        };

        handler.target.select = emitSelectEvent;

        line.on('dragstart', emitSelectEvent);
        line.on('click', emitSelectEvent);

        emitter.emit(EVENT_TYPE.ELEMENT_CREATED, handler);

        return handler;
    }
}
