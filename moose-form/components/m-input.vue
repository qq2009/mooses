<script setup>
import { ref, watch, defineEmits } from 'vue';
import { ElFormItem, ElInput } from 'element-plus';

const props = defineProps({
    field: {
        type: String,
        required: true,
    },
    defaultValue: {
        type: String,
        default: '',
    },
});

const { field, defaultValue } = props;
const emits = defineEmits(['update']);
const value = ref(defaultValue);

watch(value, (val) => {
    handleUpdate(val);
});

function handleUpdate(val = value.value) {
    emits('update', { [props.field]: val });
}

handleUpdate();
</script>

<template>
    <ElFormItem v-bind="$attrs">
        <ElInput v-model="value" v-bind="$attrs" />
    </ElFormItem>
</template>

<style scoped></style>
