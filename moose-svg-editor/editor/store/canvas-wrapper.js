import { reactive } from 'vue';

export function resetCanvasWrapper() {
    canvasWrapper.width = 320;
    canvasWrapper.height = 512;
}

export const canvasWrapper = reactive({
    width: 320,
    height: 512,
    // 最小画布宽
    minWrapperWidth: 1200,
    // 最小画布高
    minWrapperHeight: 800,
});

export function updateCanvasWrapper(width, height) {
    canvasWrapper.width = width;
    canvasWrapper.height = height;
}
