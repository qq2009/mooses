<script setup>
import { ref, watch } from 'vue';
import { ElFormItem, ElSlider } from 'element-plus';

const props = defineProps({
    field: {
        type: String,
        required: true,
    },
    defaultValue: {
        type: [Number, Object],
        default: 0,
    },
});

const { field, defaultValue } = props;
const emits = defineEmits(['update']);
const value = ref(defaultValue);

watch(value, (val) => {
    handleUpdate(val);
});

function handleUpdate(val = value.value) {
    emits('update', { [field]: val });
}

handleUpdate();
</script>

<template>
    <ElFormItem v-bind="$attrs">
        <ElSlider v-model="value" v-bind="$attrs" />
    </ElFormItem>
</template>

<style scoped></style>
