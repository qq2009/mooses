<script setup>
import { useCanvas } from '../../hooks/canvas';

const canvas = useCanvas();

function clear() {
    canvas.clearCanvas();
}

function save() {
    const content = canvas.saveCanvasText();
}

function createText() {
    canvas.textManager.addText(10, 20, '你好');
}
</script>
<template>
    <div class="m-svg-toolbar">
        <button @click="clear">清空</button>
        <button @click="save">保存</button>
        <button @click="createText">加入文本</button>
    </div>
</template>
<style scoped>
.m-svg-toolbar {
    width: 14vw;
    padding: 10px;
    border-right: 1px solid #e5e5e5;
    background-color: #ffffff;
}
</style>
