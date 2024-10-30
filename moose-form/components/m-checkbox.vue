<script setup>
import { ref, watch, defineEmits } from 'vue';
import { ElFormItem, ElCheckboxGroup, ElCheckbox } from 'element-plus';

const props = defineProps({
    field: {
        type: String,
        required: true,
    },
    defaultValue: {
        type: [Array],
        default: () => [],
    },
    options: {
        type: [Array, Function],
        default: () => [],
    },
    labelKey: {
        type: String,
        default: 'label',
    },
    valueKey: {
        type: String,
        default: 'value',
    },
});

const { field, defaultValue, options, labelKey, valueKey } = props;
const emits = defineEmits(['update']);

const value = ref(defaultValue);
const optionList = ref([]);

const loadOptions = async () => {
    if (typeof options === 'function') {
        optionList.value = await options();
    } else if (Array.isArray(options)) {
        optionList.value = options;
    } else {
        console.warn('MCheckbox Invalid options format');
    }
};

watch(value, (val) => {
    handleUpdate(val);
});

function handleUpdate(val = value.value) {
    emits('update', { [props.field]: val });
}

loadOptions();
handleUpdate();
</script>

<template>
    <ElFormItem v-bind="$attrs">
        <ElCheckboxGroup v-model="value" v-bind="$attrs">
            <ElCheckbox
                v-for="option in optionList"
                :key="option[valueKey]"
                :label="option[valueKey]"
                :value="option[valueKey]"
            ></ElCheckbox>
        </ElCheckboxGroup>
    </ElFormItem>
</template>

<style scoped></style>
