<script setup>
import Toolbar from './toolbar/index.vue';
import CanvasWrapper from "./canvas-wrapper/index.vue"
import SvgCanvas from './svg-canvas/index.vue';
import PropertiesPanel from './properties-panel/index.vue';

</script>
<template>
    <div class="m-svg-editor">
        <Toolbar />
        <CanvasWrapper>
            <SvgCanvas />
        </CanvasWrapper>
        <PropertiesPanel />
    </div>
</template>
<style scoped>
.m-svg-editor {
    height: 100%;
    width: 100%;
    display: flex;
}
</style>

<style>
.svg_select_shape {
    stroke-width: 1;
    stroke-dasharray: 10 10;
    stroke: #000;
    stroke-opacity: 0.1;
    pointer-events: none;
    fill: none;
}

.svg_select_shape_pointSelect {
    stroke-width: 1;
    fill: none;
    stroke-dasharray: 10 10;
    stroke: #000;
    stroke-opacity: 0.8;
    pointer-events: none;
}

.svg_select_handle {
    stroke-width: 3;
    stroke: #000;
    fill: none;
}

.svg_select_handle_rot {
    fill: #fff;
    stroke: #000;
    stroke-width: 1;
    cursor: move;
}

.svg_select_handle_lt {
    cursor: nw-resize;
}

.svg_select_handle_rt {
    cursor: ne-resize;
}

.svg_select_handle_rb {
    cursor: se-resize;
}

.svg_select_handle_lb {
    cursor: sw-resize;
}

.svg_select_handle_t {
    cursor: n-resize;
}

.svg_select_handle_r {
    cursor: e-resize;
}

.svg_select_handle_b {
    cursor: s-resize;
}

.svg_select_handle_l {
    cursor: w-resize;
}

.svg_select_handle_point {
    stroke: #000;
    stroke-width: 1;
    cursor: move;
    fill: #fff;
}
</style>
