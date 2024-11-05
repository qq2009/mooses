import { SVGCanvas } from '../canvas';
import { emitter, EVENT_TYPE } from '../emitter';
/**
 * 表格绘制类
 */
export class TableDrawer {
    /**
     * @type { G }
     * */
    instance = null;

    /**
     * 绘制背景
     */
    draw() {
        const canvas = SVGCanvas.getInstance();
        // 表格参数
        const rows = 3; // 行数
        const cols = 4; // 列数
        const cellWidth = 100; // 单元格宽度
        const cellHeight = 50; // 单元格高度

        // 创建表格组
        const tableGroup = canvas.draw.group();

        // 循环生成单元格
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * cellWidth;
                const y = row * cellHeight;

                // 创建矩形
                const cellRect = tableGroup
                    .rect(cellWidth, cellHeight)
                    .move(x, y)
                    .fill('#f0f0f0')
                    .stroke({ color: '#333', width: 1 });

                // 创建文字
                const cellText = tableGroup
                    .text(`R${row + 1}C${col + 1}`)
                    .move(x + cellWidth / 2, y + cellHeight / 2)
                    .font({ size: 14, anchor: 'middle', leading: '1.5em' })
                    .fill('#333');
            }
        }

        tableGroup.draggable();

        emitter.emit(EVENT_TYPE.ELEMENT_CREATED, {
            id: tableGroup.id(),
            label: '表格',
            el: tableGroup,
        });

        const emitSelectEvent = () => {
            emitter.emit(EVENT_TYPE.SELECT_ELEMENT, {
                type: 'table-panel',
                target: {},
            });
        };

        tableGroup.on('dragstart', emitSelectEvent);
        tableGroup.on('click', emitSelectEvent);

        this.instance = tableGroup;
    }
}
