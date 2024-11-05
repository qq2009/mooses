<script setup>
import { reactive, watch } from 'vue';
import {
    ElForm,
    ElFormItem,
    ElColorPicker,
    ElSelect,
    ElOption,
} from 'element-plus';
import { updateCanvasWrapper } from '../../store/canvas-wrapper';
const props = defineProps({
    /**
     * @type { Rect }
     * */
    target: {
        type: Object,
        required: true,
    },
});

const sizes = [{ label: '800*600' }, { label: '1920*1080' }];

const attr = reactive({
    fill: '',
    size: '',
});

const { target } = props;

attr.fill = target.getFill();

const width = target.getWidth();
const height = target.getHeight();

attr.size = `${width}*${height}`;

watch(
    () => attr.fill,
    (val) => {
        target.setFill(val);
    },
);

watch(
    () => attr.size,
    (val) => {
        const [w, h] = val.split('*');
        target.setWidth(w);
        target.setHeight(h);
        updateCanvasWrapper(w, h);
    },
);
</script>

<template>
    <div class="background-panel">
        <h2 class="m-svg-attr-title">画板设计</h2>

        <ElForm :model="attr" label-position="left" label-width="auto">
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
