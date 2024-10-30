<script setup>
import { ref, watch, defineEmits } from 'vue';
import { ElFormItem, ElTimePicker } from 'element-plus';

const props = defineProps({
    field: {
        type: String,
        default: '',
    },
    startField: {
        type: String,
        default: '',
    },
    endField: {
        type: String,
        default: '',
    },
    defaultValue: {
        type: [String, Array],
        default: '',
    },
    isRange: {
        type: Boolean,
        default: false,
    },
});

const { field, defaultValue, isRange, startField, endField } = props;
const emits = defineEmits(['update']);
const value = ref(defaultValue);

watch(value, (val) => {
    handleUpdate(val);
});

function handleUpdate(val = value.value) {
    if (isRange) {
        emits('update', {
            [startField]: Array.isArray(val) ? val[0] : '',
            [endField]: Array.isArray(val) ? val[1] : '',
        });
    } else {
        emits('update', { [field]: val || '' });
    }
}

handleUpdate();
</script>

<template>
    <ElFormItem v-bind="$attrs">
        <ElTimePicker v-model="value" v-bind="$attrs" :isRange="isRange" />
    </ElFormItem>
</template>

<style scoped></style>
