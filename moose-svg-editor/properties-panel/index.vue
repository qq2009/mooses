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
        <template v-if="selectedElementData !== null">
            <component
                :is="dll[selectedElementType]"
                :target="selectedElementData"
                :key="selectedElementData.id"
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
