import { SVGCanvas } from '../canvas';
import { emitter, EVENT_TYPE } from '../emitter';
/**
 * 表格绘制类
 */
export class TextDrawer {
    /**
     * @type { G }
     * */
    instance = null;

    /**
     * 绘制背景
     */
    draw() {
        let isSelect = false;

        const canvas = SVGCanvas.getInstance();
        const text = canvas.draw
            .text('Double-click to edit')
            .move(100, 100)
            .fill('#000')
            .font({ size: 16 });

        text.draggable();

        // text.on('dblclick', () => {
        // const newText = prompt('Enter new text:', text.text())
        // if (newText !== null) text.text(newText)
        // })

        const emitSelectEvent = () => {
            if (!isSelect) {
                isSelect = true;
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

            emitter.emit(EVENT_TYPE.SELECT_ELEMENT, {
                type: 'text-panel',
                target: {
                    getFill() {
                        return text.fill();
                    },
                    setFill(color) {
                        text.fill(color);
                    },
                    getText() {
                        return text.text();
                    },
                    setText(newContent) {
                        text.text(newContent);
                    },
                    getSize() {
                        return text.font('size');
                    },
                    setSize(size) {
                        text.font({ size: size || 0 });
                    },
                    deselectAll() {
                        if (isSelect) {
                            isSelect = false;
                            text.select(false);
                            text.resize(false);
                        }
                    },
                },
            });
        };

        text.on('dragstart', emitSelectEvent);
        text.on('click', emitSelectEvent);
    }
}
