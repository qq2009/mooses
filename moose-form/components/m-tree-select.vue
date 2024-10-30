<script setup>
import { ref, watch, defineEmits } from 'vue';
import { ElFormItem, ElTreeSelect } from 'element-plus';

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

const value = ref(props.defaultValue);
const optionList = ref([]);

const loadOptions = async () => {
    if (typeof options === 'function') {
        optionList.value = await options();
    } else if (Array.isArray(options)) {
        optionList.value = options;
    } else {
        console.warn('MTreeSelect Invalid options format');
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
        <ElTreeSelect
            v-model="value"
            v-bind="$attrs"
            :data="optionList"
        ></ElTreeSelect>
    </ElFormItem>
</template>

<style scoped></style>
