<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import { canvasWrapper } from '../store/canvas-wrapper';
import { SVG } from '@svgdotjs/svg.js';

/**
 * @type { Ref<HTMLDivElement> }
 * */
const rulerXRef = ref(null);
/**
 * @type { Ref<HTMLDivElement> }
 * */
const rulerYRef = ref(null);
/**
 * @type { Ref<HTMLDivElement> }
 * */
const workareaRef = ref(null);

const zoomLevel = ref(1);

// 计算偏移
let offsetX = 0;
let offsetY = 0;

// 偏移计算
function computedOffset() {
    const scaledWidth = canvasWrapper.width * 1.5;
    const scaledHeight = canvasWrapper.height * 1.5;

    offsetX = (scaledWidth - canvasWrapper.width) / 2;
    offsetY = (scaledHeight - canvasWrapper.height) / 2;
}

function centerCanvas() {
    const wrapper = workareaRef.value;
    if (wrapper) {
        const wrapperWidth = wrapper.clientWidth;
        const wrapperHeight = wrapper.clientHeight;

        const canvasWidth = canvasWrapper.width * 1.5;
        const canvasHeight = canvasWrapper.height * 1.5;

        wrapper.scrollLeft = (canvasWidth - wrapperWidth) / 2;
        wrapper.scrollTop = (canvasHeight - wrapperHeight) / 2;
    }
}

/**
 * @type {Svg}
 * */
let svgX = null;
/**
 * @type {Svg}
 * */
let svgY = null;

function drawRulerX() {
    svgX.clear();

    const minSpacing = 10;
    const spacing = Math.max(minSpacing, 10 * zoomLevel.value);
    const rulerWidth = canvasWrapper.width * 2;

    // 从 offsetX 偏移处开始绘制
    for (let i = -offsetX; i < rulerWidth - offsetX; i += spacing) {
        const label = (i / zoomLevel.value).toFixed(0);
        svgX.line(i + offsetX, 0, i + offsetX, 10).stroke({
            color: '#000',
            width: 1,
        });

        if (i % (50 * zoomLevel.value) === 0) {
            svgX.text(label)
                .move(i + offsetX + 2, 8)
                .font({ size: 8 });
        }
    }
}

function drawRulerY() {
    svgY.clear();

    const minSpacing = 10;
    const spacing = Math.max(minSpacing, 10 * zoomLevel.value);
    const rulerHeight = canvasWrapper.height * 2;

    // 从 offsetY 偏移处开始绘制
    for (let i = -offsetY; i < rulerHeight - offsetY; i += spacing) {

        const label = (i / zoomLevel.value).toFixed(0);

        svgY.line(0, i + offsetY, 10, i + offsetY).stroke({
            color: '#000',
            width: 1,
        });

        if (i % (50 * zoomLevel.value) === 0) {
            svgY.text(label)
                .move(8, i + offsetY + 2)
                .font({ size: 8 })
                .rotate(90);
        }
    }
}

function handleScroll() {
    const scrollLeft = workareaRef.value.scrollLeft;
    const scrollTop = workareaRef.value.scrollTop;
    svgX.attr({ style: `transform: translateX(${-scrollLeft}px);` });
    svgY.attr({ style: `transform: translateY(${-scrollTop}px);` });
}

onMounted(() => {
    svgX = SVG()
        .addTo(rulerXRef.value)
        .size(canvasWrapper.width * 2, 20);
    svgY = SVG()
        .addTo(rulerYRef.value)
        .size(20, canvasWrapper.height * 2);
    computedOffset();
    drawRulerX();
    drawRulerY();
    centerCanvas();
    handleScroll();
});

watch(
    () => [canvasWrapper.width, canvasWrapper.height],
    () => {
        nextTick(() => {
            computedOffset();
            drawRulerX();
            drawRulerY();
            centerCanvas();

            svgX.size(canvasWrapper.width * 2, 20);
            svgY.size(20, canvasWrapper.height * 2);
            handleScroll();
        });
    },
);

watch(zoomLevel, () => {
    drawRulerX();
    drawRulerY();
});
</script>

<template>
    <div class="m-svg-canvas-wrapper">
        <div class="ruler_corner"></div>
        <div ref="rulerXRef" class="ruler_x"></div>
        <div ref="rulerYRef" class="ruler_y"></div>
        <div ref="workareaRef" class="workarea" @scroll="handleScroll">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.m-svg-canvas-wrapper {
    flex: 1;
    background-color: #ececee;
    position: relative;

    display: grid;
    grid-template-columns: 20px 1fr;
    grid-template-rows: 20px 1fr;
}

.ruler_corner {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    background-color: #ececee;
}

.ruler_x {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    background-color: #ececee;
    overflow: hidden;
    height: 20px;
    width: 100%;
}

.ruler_y {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    background-color: #ececee;
    overflow: hidden;
    width: 20px;
    height: 100%;
}

.workarea {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    overflow: auto;
}
</style>
