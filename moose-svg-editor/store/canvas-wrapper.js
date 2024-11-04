import { reactive } from 'vue';

export const canvasWrapper = reactive({
    width: 800,
    height: 600,
});

export function updateCanvasWrapper(width, height) {
    canvasWrapper.width = width;
    canvasWrapper.height = height;
}
