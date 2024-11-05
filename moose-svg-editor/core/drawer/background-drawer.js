import { SVGCanvas } from '../canvas';
import { emitter, EVENT_TYPE } from '../emitter';
/**
 * 背景绘制类，用于绘制 SVG 背景
 */
export class BackgroundDrawer {
    /**
     * @type { Rect }
     * */
    static instance = null;

    /**
     * 绘制背景
     */
    static draw() {
        const canvas = SVGCanvas.getInstance();
        const rect = canvas.draw.rect('100%', '100%');

        rect.attr({
            fill: '#fff',
            stroke: 'transparent',
        });

        const emitSelectEvent = () => {
            emitter.emit(EVENT_TYPE.SELECT_ELEMENT, {
                type: 'background-panel',
                target: {
                    id: rect.id(),
                    getFill() {
                        return rect.fill();
                    },
                    setFill(color) {
                        rect.fill(color);
                    },
                    getWidth() {
                        return canvas.draw.width();
                    },
                    setWidth(width) {
                        canvas.draw.width(width);
                    },
                    getHeight() {
                        return canvas.draw.height();
                    },
                    setHeight(height) {
                        canvas.draw.height(height);
                    },
                },
            });
        };

        emitSelectEvent();

        rect.on('click', emitSelectEvent);

        BackgroundDrawer.instance = rect;
    }
}
