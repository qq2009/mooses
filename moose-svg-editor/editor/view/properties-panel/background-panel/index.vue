<script setup>
import { reactive, watch } from 'vue';
import {
    ElForm,
    ElFormItem,
    ElColorPicker,
    ElSelect,
    ElOption,
    ElInput,
} from 'element-plus';

import { updateCanvasWrapper } from '../../../store/canvas-wrapper';

const props = defineProps({
    /**
     * @type { Rect }
     * */
    target: {
        type: Object,
        required: true,
    },
});

const sizes = [
    { label: '320*512' },
    { label: '380*400' },
    { label: '2752*56' },
];

const attr = reactive({
    fill: '',
    size: '',
    width: '',
    height: '',
});

const { target } = props;

attr.fill = target.getFill();
attr.width = target.getWidth();
attr.height = target.getHeight();
attr.size = `${attr.width}*${attr.height}`;

watch(
    () => attr.fill,
    (val) => {
        target.setFill(val);
    },
);

watch(
    () => attr.width,
    (val) => {
        target.setWidth(val);
        updateCanvasWrapper(val, attr.height);
    },
);

watch(
    () => attr.height,
    (val) => {
        target.setHeight(val);
        updateCanvasWrapper(attr.width, val);
    },
);

watch(
    () => attr.size,
    (val) => {
        const [w, h] = val.split('*');
        attr.width = w;
        attr.height = h;
    },
);
</script>

<template>
    <div class="background-panel">
        <h2 class="m-svg-attr-title">画板设计</h2>

        <ElForm :model="attr" label-position="left" label-width="auto">
            <ElFormItem label="宽">
                <ElInput type="number" v-model.number="attr.width"></ElInput>
            </ElFormItem>
            <ElFormItem label="高">
                <ElInput type="number" v-model.number="attr.height"></ElInput>
            </ElFormItem>
            <ElFormItem label="背景颜色">
                <ElColorPicker v-model="attr.fill"></ElColorPicker>
            </ElFormItem>
            <ElFormItem label="常见尺寸">
                <ElSelect v-model="attr.size">
                    <template v-for="(size, size_idx) of sizes" :key="size_idx">
                        <ElOption
                            :value="size.label"
                            :label="size.label"
                        ></ElOption>
                    </template>
                </ElSelect>
            </ElFormItem>
        </ElForm>
    </div>
</template>

<style scoped></style>
