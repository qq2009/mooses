import { SVGCanvas } from '../canvas';
import { emitter, EVENT_TYPE } from '../emitter';

/**
 * 文字绘制类
 *
 */
export class TextDrawer {
    /**
     * @type { G }
     * */
    instance = null;

    /**
     * 绘制背景
     */
    draw(enable) {
        let isSelect = false;

        const canvas = SVGCanvas.getInstance();
        const text = canvas.draw
            .text('Double-click to edit')
            .move(100, 100)
            .fill('#000')
            .font({ size: 16, weight: 'normal', style: 'normal' });

        text.draggable();

        emitter.emit(EVENT_TYPE.ELEMENT_CREATED, {
            id: text.id(),
            label: '文字',
            el: text,
        });

        // text.on('dblclick', () => {
        // const newText = prompt('Enter new text:', text.text())
        // if (newText !== null) text.text(newText)
        // })

        // 更新选中框大小以适应文字长度
        function updateSelectBox() {
            text.select(false);
            text.select({
                createHandle: (group, p, index, pointArr, handleName) => {
                    return group.circle(0);
                },
                updateHandle: (group, p, index, pointArr, handleName) => {
                    return group.center(p[0], p[1]);
                },
            });
        }

        const emitSelectEvent = (enable) => {
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
                    id: text.id(),
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
                        updateSelectBox();
                    },
                    getSize() {
                        return text.font('size');
                    },
                    setSize(size) {
                        text.font({ size: size || 0 });
                    },
                    getWeight() {
                        return text.font('weight');
                    },
                    setWeight(weight) {
                        text.font({ weight });
                    },
                    getFontStyle() {
                        return text.font('style');
                    },
                    setFontStyle(style) {
                        text.font({ style });
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
