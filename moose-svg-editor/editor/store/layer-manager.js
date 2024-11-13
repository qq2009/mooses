import { ref } from 'vue';

const DRAWER_TYPE = {
    TEXT_PANEL: 'text-panel',
    BACKGROUND_PANEL: 'background-panel',
    LINE_PANEL: 'line-panel',
    RECT_PANEL: 'rect-panel',
};

export const layers = ref([]);

export function resetLayers() {
    layers.value = [];
}

export function toPageFirst() {
    const [A] = layers.value;
    A.target.select();
}

export function generateAST(layout = layers.value) {
    if (!Array.isArray(layout) || layout.length === 0) {
        return [];
    }

    return layout.map((node) => {
        const newNode = {
            id: node.id,
            label: node.label,
            type: node.type,
            attr: {},
            children: [],
        };

        if (node.type === DRAWER_TYPE.BACKGROUND_PANEL) {
            Object.assign(newNode.attr, {
                width: node.target.getWidth(),
                height: node.target.getHeight(),
                fill: node.target.getFill(),
            });
        }

        if (node.type === DRAWER_TYPE.TEXT_PANEL) {
            Object.assign(newNode.attr, {
                x: node.target.getX(),
                y: node.target.getY(),
                content: node.target.getText(),
                fontSize: node.target.getSize(),
                fill: node.target.getFill(),
                fontFamily: node.target.getFontFamily(),
                fontWeight: node.target.getWeight(),
                fontStyle: node.target.getFontStyle(),
            });
        }

        if (node.type === DRAWER_TYPE.LINE_PANEL) {
            Object.assign(newNode.attr, {
                plot: node.target.getPlot(),
                color: node.target.getColor(),
                strokeWidth: node.target.getStrokeWidth(),
                strokeDasharray: node.target.getStrokeDasharray(),
                transform: node.target.getTransform(),
            });
        }

        if (node.type === DRAWER_TYPE.RECT_PANEL) {
            Object.assign(newNode.attr, {
                fill: node.target.getFill(),
                width: node.target.getWidth(),
                height: node.target.getHeight(),
                color: node.target.getColor(),
                strokeWidth: node.target.getStrokeWidth(),
                strokeDasharray: node.target.getStrokeDasharray(),
                x: node.target.getX(),
                y: node.target.getY(),
                transform: node.target.getTransform(),
            });
        }

        if (node.children && Array.isArray(node.children)) {
            newNode.children = generateAST(node.children);
        }

        return newNode;
    });
}
