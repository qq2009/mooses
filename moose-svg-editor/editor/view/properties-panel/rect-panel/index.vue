<script setup>
import { onUnmounted, reactive, watch } from 'vue';
import {
    ElForm,
    ElFormItem,
    ElColorPicker,
    ElSelect,
    ElOption,
    ElInput,
} from 'element-plus';
import { dasharrayOptions } from './config';

const props = defineProps({
    /**
     * @type { Rect }
     * */
    target: {
        type: Object,
        required: true,
    },
});

const attr = reactive({
    fill: '',
    color: '',
    strokeWidth: '',
    strokeDasharray: '',
});

const { target } = props;

attr.fill = target.getFill();
attr.color = target.getColor();
attr.strokeWidth = target.getStrokeWidth();
attr.strokeDasharray = target.getStrokeDasharray();

watch(
    () => attr.fill,
    (val) => {
        target.setFill(val);
    },
);

watch(
    () => attr.color,
    (val) => {
        target.setColor(val);
    },
);

watch(
    () => attr.strokeWidth,
    (val) => {
        target.setStrokeWidth(val);
    },
);

watch(
    () => attr.strokeDasharray,
    (val) => {
        target.setStrokeDasharray(val);
    },
);

onUnmounted(() => {
    target.deselectAll();
});
</script>

<template>
    <div class="rect-panel">
        <h2 class="m-svg-attr-title">矩形</h2>

        <ElForm :model="attr" label-position="left" label-width="auto">
            <ElFormItem label="线宽">
                <ElInput v-model="attr.strokeWidth"></ElInput>
            </ElFormItem>
            <ElFormItem label="点画">
                <ElSelect
                    v-model="attr.strokeDasharray"
                    placeholder="请选择点画"
                >
                    <ElOption
                        v-for="(dasharray, dasharray_idx) in dasharrayOptions"
                        :key="dasharray_idx"
                        :label="dasharray.label"
                        :value="dasharray.value"
                    />
                </ElSelect>
            </ElFormItem>
            <ElFormItem label="背景颜色">
                <ElColorPicker v-model="attr.fill"></ElColorPicker>
            </ElFormItem>
            <ElFormItem label="边框颜色">
                <ElColorPicker v-model="attr.color"></ElColorPicker>
            </ElFormItem>
        </ElForm>
    </div>
</template>

<style scoped></style>
