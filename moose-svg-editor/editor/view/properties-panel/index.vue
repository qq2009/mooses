<script setup>
import { ref } from 'vue';
import { useCanvas } from '../../hooks/canvas';
import { dll } from './config';

const canvas = useCanvas();

const selectedElementType = ref('');
const selectedElementKey = ref('');
const selectedElementData = ref(null);

function handleElementSelection({ type, target, id }) {
    selectedElementType.value = type;
    selectedElementKey.value = id;
    selectedElementData.value = target;
}

canvas.emitter.on(canvas.emitter_type.SELECT_ELEMENT, handleElementSelection);
</script>

<template>
    <div class="m-svg-attr">
        <template v-if="selectedElementData !== null">
            <component
                :is="dll[selectedElementType]"
                :target="selectedElementData"
                :key="selectedElementKey"
            />
        </template>
    </div>
</template>

<style scoped>
.m-svg-attr {
    flex: 1;
}
</style>
<style>
.m-svg-attr-title {
    font-size: 18px;
}
</style>
