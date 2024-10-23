<script setup>
import { ElCard } from 'element-plus';
import { mdrag } from '@mooses/directive';

const vMdrag = mdrag;

const optionsC = {
    // 启用边界限制
    boundaryLimit: true,
    // 设置初始位置
    initialPosition: { top: 50, left: 50 },
    // 指定手柄
    handle: '.handle',
    onStart: () => console.log('开始拖拽'),
    onMove: () => console.log('拖动中...'),
    onEnd: () => console.log('拖动结束！'),
};
</script>

<template>
    <ElCard>
        <template #header>
            <h2>手柄拖拽</h2>
        </template>
        <div class="parent">
            <div
                class="drag-a"
                v-mdrag="optionsC"
                style="width: 100px; height: 100px; background: red"
            >
                <div
                    class="handle"
                    style="width: 30px; height: 30px; background: yellow"
                ></div>
            </div>
        </div>
    </ElCard>
</template>

<style lang="scss" scoped>
.parent {
    width: 100%;
    height: 400px;
    background: lightgray;
    position: relative;
    outline: 1px solid yellow;

    .drag-a {
        width: 600px;
        height: 400px;
        background-color: red;
        position: absolute;
    }
}
</style>
