<script setup>
import { ref, watch } from 'vue';
import { ElFormItem, ElSelectV2 } from 'element-plus';

const props = defineProps({
    field: {
        type: String,
        required: true,
    },
    defaultValue: {
        type: String,
        default: '',
    },
    options: {
        type: [Array, Function],
        default: () => [],
    },
});

const { field, defaultValue, options } = props;
const emits = defineEmits(['update']);

const value = ref(defaultValue);
const optionList = ref([]);

const loadOptions = async () => {
    if (typeof options === 'function') {
        optionList.value = await options();
    } else if (Array.isArray(options)) {
        optionList.value = options;
    } else {
        console.warn('MVselect Invalid options format');
    }
};

watch(value, (val) => {
    handleUpdate(val);
});

function handleUpdate(val = value.value) {
    emits('update', { [field]: val });
}

loadOptions();
handleUpdate();
</script>

<template>
    <ElFormItem v-bind="$attrs">
        <ElSelectV2
            v-model="value"
            v-bind="$attrs"
            :options="optionList"
        ></ElSelectV2>
    </ElFormItem>
</template>

<style scoped></style>
