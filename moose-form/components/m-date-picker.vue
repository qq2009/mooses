<script setup>
import { ref, watch } from 'vue';
import { ElFormItem, ElDatePicker } from 'element-plus';

const props = defineProps({
    field: {
        type: String,
        default: '',
    },
    t: {
        type: String,
        default: 'date',
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
});

const { field, defaultValue, startField, endField, t } = props;
const emits = defineEmits(['update']);
const value = ref(defaultValue);

watch(value, (val) => {
    handleUpdate(val);
});

function handleUpdate(val = value.value) {
    if (['monthrange', 'yearrange', 'daterange', 'datetimerange'].includes(t)) {
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
        <ElDatePicker v-model="value" v-bind="$attrs" :type="t" />
    </ElFormItem>
</template>

<style scoped></style>
