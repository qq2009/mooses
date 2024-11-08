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
    return {
        width: `${canvasWrapper.width * 1.5}px`,
        height: `${canvasWrapper.height * 1.5}px`,
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
