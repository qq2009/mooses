import { ref } from 'vue';

const DRAWER_TYPE = {
    TEXT_PANEL: 'text-panel',
    BACKGROUND_PANEL: 'background-panel',
};

export const layers = ref([]);

export function resetLayers() {
    layers.value = [];
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

        if (node.children && Array.isArray(node.children)) {
            newNode.children = generateAST(node.children);
        }

        return newNode;
    });
}
