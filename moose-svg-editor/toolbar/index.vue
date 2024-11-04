<script setup>
import { SVGCanvas } from '../core/canvas';
import { TextDrawer } from '../core/drawer/text-drawer';
import { TableDrawer } from '../core/drawer/table-drawer';

function clear() {
    const canvas = SVGCanvas.getInstance();
    canvas.clearCanvas();
}

function save() {
    const canvas = SVGCanvas.getInstance();
    const content = canvas.draw.svg();
    console.log(content);
}

function createText() {
    const text = new TextDrawer();
    text.draw();
}

function createTable() {
    const table = new TableDrawer();
    table.draw();
}
</script>
<template>
    <div class="m-svg-toolbar">
        <button @click="clear">清空</button>
        <button @click="save">保存</button>

        <button @click="createText">加入文本</button>
        <button @click="createTable">加入表格</button>
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
