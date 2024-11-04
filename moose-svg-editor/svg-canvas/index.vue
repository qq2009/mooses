<script setup>
import { ref, computed, onMounted } from 'vue';
import { canvasWrapper } from '../store/canvas-wrapper';
import { SVGCanvas } from '../core/canvas';
import { BackgroundDrawer } from '../core/drawer/background-drawer';
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
        new SVGCanvas(canvasRef.value);
        BackgroundDrawer.draw();
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
