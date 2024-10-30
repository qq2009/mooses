<script setup>
import { ref, watch, defineEmits, onMounted } from 'vue';
import { ElFormItem, ElSelectV2, ElOption } from 'element-plus';

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
        console.warn('MSelect Invalid options format');
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
        <ElSelectV2
            v-model="value"
            v-bind="$attrs"
            :options="optionList"
        ></ElSelectV2>
    </ElFormItem>
</template>

<style scoped></style>
