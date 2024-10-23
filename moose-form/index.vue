<script setup>
import { defineProps, defineComponent, ref } from 'vue';
import { ElForm } from 'element-plus';
import MInput from './components/m-input.vue';

defineComponent({
    name: 'MForm',
    components: {
        input: MInput,
    },
});

const props = defineProps({
    /**
     * @type Array<FormInputConfig>
     * */
    columns: {
        type: Array,
        default: () => [],
    },
});

const form = ref({
    name: 1,
});
</script>

<template>
    <ElForm :model="form">
        <template v-for="column of columns">
            <component :is="column.type"></component>
        </template>
    </ElForm>
</template>

<style scoped></style>
