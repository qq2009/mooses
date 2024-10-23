<script setup>
import { ElCard } from 'element-plus';
import { mdrag } from '@mooses/directive';

const vMdrag = mdrag;

const options = {
    parent: document.body,
    initialPosition: { top: 120, left: 500 },
    onStart: () => console.log('开始拖拽'),
    onMove: () => console.log('拖动中...'),
    onEnd: () => console.log('拖动结束！'),
};
</script>

<template>
    <ElCard>
        <template #header>
            <h2>基础用法</h2>
        </template>
        <div class="parent" style="position: initial">
            <div
                class="drag-a"
                v-mdrag="options"
                style="width: 100px; height: 100px; background: red"
            ></div>
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
