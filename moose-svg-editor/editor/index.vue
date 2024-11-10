<script setup>
import {
    defineProps,
    markRaw,
    defineExpose,
    defineEmits,
    onUnmounted,
} from 'vue';
import { setCanvas } from './hooks/canvas';
import {
    resetCanvasWrapper,
    updateCanvasWrapper,
} from './store/canvas-wrapper';
import { resetLayers, generateAST } from './store/layer-manager';
import Toolbar from './view/toolbar/index.vue';
import CanvasWrapper from './view/canvas-wrapper/index.vue';
import SvgCanvas from './view/svg-canvas/index.vue';
import PropertiesPanel from './view/properties-panel/index.vue';
import LayerManager from './view/layer-manager/index.vue';

import { SVGCanvas } from '../core/canvas';

defineProps({
    isToolbar: {
        type: Boolean,
        default: true,
    },
});

const emits = defineEmits(['dragDrop', 'delayer']);

const canvas = markRaw(new SVGCanvas());

setCanvas(canvas);

canvas.emitter.on(canvas.emitter_type.DRAG_DROP, (options) =>
    emits('dragDrop', options),
);

canvas.emitter.on(
    canvas.emitter_type.UPDATE_CANVAS_WRAPPER,
    ({ width, height }) => updateCanvasWrapper(width, height),
);

canvas.emitter.on(canvas.emitter_type.DELAYER, ({ id }) => {
    emits('delayer', id);
});

defineExpose({
    saveCanvasText() {
        return canvas.saveCanvasText();
    },
    render(astSting) {
        canvas.render(astSting);
    },
    generateAST,
});

onUnmounted(() => {
    resetCanvasWrapper();
    resetLayers();
});
</script>
<template>
    <div class="m-svg-editor">
        <template v-if="isToolbar">
            <Toolbar />
        </template>

        <CanvasWrapper>
            <SvgCanvas />
        </CanvasWrapper>

        <div class="m-svg-side-panel">
            <PropertiesPanel />
            <LayerManager />
        </div>
    </div>
</template>
<style scoped>
.m-svg-editor {
    height: 100%;
    width: 100%;
    flex: 1;
    display: flex;
}

.m-svg-side-panel {
    display: flex;
    flex-direction: column;
    width: 18vw;
    padding-left: 10px;
    padding-right: 10px;
    border-left: 1px solid #e5e5e5;
    background-color: #ffffff;
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
