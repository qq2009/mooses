<script setup>
import { ref, watch } from 'vue';
import { ElFormItem, ElRadioGroup, ElRadio } from 'element-plus';

const props = defineProps({
    field: {
        type: String,
        required: true,
    },
    defaultValue: {
        type: [String, Number],
        default: '',
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
        console.warn('MRadio Invalid options format');
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
        <ElRadioGroup v-model="value" v-bind="$attrs">
            <ElRadio
                v-for="option in optionList"
                :key="option[valueKey]"
                :value="option[valueKey]"
            >
                {{ option[labelKey] }}
            </ElRadio>
        </ElRadioGroup>
    </ElFormItem>
</template>

<style scoped></style>
