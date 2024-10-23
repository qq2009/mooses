<script setup>
import { ElCard } from 'element-plus';
import { mdrag } from '@mooses/directive';
import GridContainer from '@/views/drag/components/grid-container.vue';

const options = {
    // 启用边界限制
    boundaryLimit: true,
    // 设置初始位置
    initialPosition: { top: 0, left: 0 },
    // 指定手柄
    handle: '.handle',
    enableGridSnap: true,
    gridSize: 60,
    onStart: () => console.log('开始拖拽'),
    onMove: () => console.log('拖动中...'),
    onEnd: () => console.log('拖动结束！'),
};

const vMdrag = mdrag;
</script>

<template>
    <ElCard>
        <template #header>
            <h2>栅格对齐</h2>
        </template>
        <div class="parent">
            <GridContainer />

            <div
                class="drag-a"
                v-mdrag="options"
                style="width: 60px; height: 60px; background: red"
            >
                <div
                    class="handle"
                    style="width: 60px; height: 60px; background: yellow"
                ></div>
            </div>
        </div>
    </ElCard>
</template>

<style scoped>
.parent {
    width: 1200px;
    height: 360px;
    background: lightgray;
    position: relative;
    outline: 1px solid yellow;

    .drag-a {
        background-color: red;
        position: absolute;
    }
}
</style>
