<script setup>
import { ref, computed, onMounted } from 'vue';
import { canvasWrapper } from '../../store/canvas-wrapper';
import { useCanvas } from '../../hooks/canvas';

const canvas = useCanvas();

/**
 * @type {Ref<HTMLDivElement>}
 * */
const canvasRef = ref(null);

const style = computed(() => {
    const w = Math.max(canvasWrapper.minWrapperWidth, canvasWrapper.width);
    const h = Math.max(canvasWrapper.minWrapperHeight, canvasWrapper.height);
    return {
        width: `${w * 1.5}px`,
        height: `${h * 1.5}px`,
    };
});

onMounted(() => {
    if (canvasRef.value) {
        canvas.initSVG(canvasRef.value);
        canvas.backgroundRenderer.draw();
    }
});
</script>

<template>
    <div ref="canvasRef" class="m-svg-canvas" :style="style"></div>
</template>

<style scoped>
.m-svg-canvas {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
