<script setup>
import { ref } from 'vue';
import { emitter, EVENT_TYPE } from '../core/emitter';
import { dll } from './config';

const selectedElementType = ref('');
const selectedElementData = ref(null);

function handleElementSelection({ type, target }) {
    selectedElementType.value = type;
    selectedElementData.value = target;
}

emitter.on(EVENT_TYPE.SELECT_ELEMENT, handleElementSelection);
</script>

<template>
    <div class="m-svg-attr">
        <component
            :is="dll[selectedElementType]"
            :target="selectedElementData"
        />
    </div>
</template>

<style scoped>
.m-svg-attr {
    width: 18vw;
    padding: 10px;
    border-left: 1px solid #e5e5e5;
    background-color: #ffffff;
}
</style>
