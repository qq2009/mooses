<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import { canvasWrapper } from '../../store/canvas-wrapper';
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
    const { w, h } = getWH();

    const scaledWidth = w * 1.5;
    const scaledHeight = h * 1.5;

    offsetX = (scaledWidth - canvasWrapper.width) / 2;
    offsetY = (scaledHeight - canvasWrapper.height) / 2;
}

function centerCanvas() {
    const wrapper = workareaRef.value;
    if (wrapper) {
        const { w, h } = getWH();
        const wrapperWidth = wrapper.clientWidth;
        const wrapperHeight = wrapper.clientHeight;

        const canvasWidth = w * 1.5;
        const canvasHeight = h * 1.5;

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
    const { w } = getWH();
    const minSpacing = 10;
    const spacing = Math.max(minSpacing, 10 * zoomLevel.value);
    const rulerWidth = w * 2;

    // 确定每个标签的间隔（50 为标签间隔的基准）
    const labelInterval = 50 * zoomLevel.value;
    let startPosition = Math.floor(-offsetX / labelInterval) * labelInterval;
    for (let i = startPosition; i < rulerWidth - offsetX; i += spacing) {
        const labelValue = (i / zoomLevel.value).toFixed(0);

        // 判断是否是带标签的位置
        const isLabelPosition = i % labelInterval === 0;
        const lineLength = isLabelPosition ? 20 : 10; // 标签刻度线更长

        // 绘制刻度线
        svgX.line(i + offsetX, 0, i + offsetX, lineLength).stroke({
            color: '#000',
            width: 1,
        });

        // 仅在整数倍的位置绘制标签
        if (isLabelPosition) {
            svgX.text(labelValue)
                .move(i + offsetX + 2, 8)
                .font({ size: 8 });
        }
    }
}

function drawRulerY() {
    svgY.clear();
    const { h } = getWH();
    const minSpacing = 10;
    const spacing = Math.max(minSpacing, 10 * zoomLevel.value);
    const rulerHeight = h * 2;

    // 确定每个标签的间隔（50 为标签间隔的基准）
    const labelInterval = 50 * zoomLevel.value;

    let startPosition = Math.floor(-offsetY / labelInterval) * labelInterval;

    // 从起始位置开始绘制
    for (let i = startPosition; i < rulerHeight - offsetY; i += spacing) {
        const labelValue = (i / zoomLevel.value).toFixed(0);

        // 判断是否是带标签的位置
        const isLabelPosition = i % labelInterval === 0;
        const lineLength = isLabelPosition ? 20 : 10;

        // 绘制刻度线
        svgY.line(0, i + offsetY, lineLength, i + offsetY).stroke({
            color: '#000',
            width: 1,
        });

        // 绘制标签
        if (isLabelPosition) {
            let xOffset = 8;
            let yOffset = i + offsetY + 4;

            // TODO：算法待优化
            if (['0'].includes(labelValue)) {
                xOffset = 14;
            } else if (['-50', '50'].includes(labelValue)) {
                xOffset = 12;
            }

            svgY.text(labelValue)
                .move(xOffset, yOffset)
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

function getWH() {
    const w = Math.max(canvasWrapper.minWrapperWidth, canvasWrapper.width);
    const h = Math.max(canvasWrapper.minWrapperHeight, canvasWrapper.height);

    return {
        w,
        h,
    };
}

onMounted(() => {
    setTimeout(() => {
        const { w, h } = getWH();

        computedOffset();

        svgX = SVG()
            .addTo(rulerXRef.value)
            .size(w * 2, 24);
        svgY = SVG()
            .addTo(rulerYRef.value)
            .size(24, h * 2);

        drawRulerX();
        drawRulerY();
        centerCanvas();
        handleScroll();
    }, 300);
});

watch(
    () => [canvasWrapper.width, canvasWrapper.height],
    () => {
        nextTick(() => {
            const { w, h } = getWH();
            computedOffset();

            drawRulerX();
            drawRulerY();
            centerCanvas();

            svgX.size(w * 2, 24);
            svgY.size(24, h * 2);
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
        <!--        <ElSelect class="zoom_select" v-model="zoomLevel">-->
        <!--            <ElOption label="90%" :value="0.9"></ElOption>-->
        <!--            <ElOption label="100%" :value="1"></ElOption>-->
        <!--            <ElOption label="300%" :value="3"></ElOption>-->
        <!--        </ElSelect>-->
    </div>
</template>

<style scoped>
.m-svg-canvas-wrapper {
    flex: 1;
    background-color: #ececee;
    position: relative;

    display: grid;
    grid-template-columns: 24px 1fr;
    grid-template-rows: 24px 1fr;
}

.ruler_corner {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    background-color: #ececee;
    pointer-events: none;
    user-select: none;
}

.ruler_x {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    background-color: #ececee;
    overflow: hidden;
    height: 24px;
    width: 100%;
    pointer-events: none;
    user-select: none;
}

.ruler_y {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    background-color: #ececee;
    overflow: hidden;
    width: 24px;
    height: 100%;
    pointer-events: none;
    user-select: none;
}

.workarea {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    overflow: auto;
}

.zoom_select {
    right: 0;
    bottom: 0;
    width: 120px;
    position: absolute;
}
</style>
