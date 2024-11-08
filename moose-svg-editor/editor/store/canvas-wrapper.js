import { reactive } from 'vue';

export function resetCanvasWrapper() {
    canvasWrapper.width = 800;
    canvasWrapper.height = 600;
}

export const canvasWrapper = reactive({
    width: 800,
    height: 600,
    // 最小画布宽
    minWrapperWidth: 1200,
    // 最小画布高
    minWrapperHeight: 800,
});

export function updateCanvasWrapper(width, height) {
    canvasWrapper.width = width;
    canvasWrapper.height = height;
}
