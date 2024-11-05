<script setup>
import { reactive, watch, onUnmounted } from 'vue';
import {
    ElForm,
    ElFormItem,
    ElInput,
    ElColorPicker,
    ElSegmented,
    ElSelect,
    ElOption,
} from 'element-plus';

const props = defineProps({
    /**
     * @type { Rect }
     * */
    target: {
        type: Object,
        required: true,
    },
});

const weightOptions = ['normal', 'bold'];
const styleOptions = ['normal', 'italic'];

const familyOptions = [
    {
        value: '默认',
        label: '',
    },
    {
        value: '楷体',
        label: '楷体',
    },
];

const attr = reactive({
    content: '',
    fill: '',
    fontFamily: '',
    fontSize: '',
    fontWeight: '',
    fontStyle: '',
});

const { target } = props;

attr.content = target.getText();
attr.fontSize = target.getSize();
attr.fill = target.getFill();
attr.fontWeight = target.getWeight();
attr.fontStyle = target.getFontStyle();

watch(
    () => attr.content,
    (val) => {
        target.setText(val);
    },
);

watch(
    () => attr.fontSize,
    (val) => {
        target.setSize(val);
    },
);

watch(
    () => attr.fill,
    (val) => {
        target.setFill(val);
    },
);

watch(
    () => attr.fontWeight,
    (val) => {
        target.setWeight(val);
    },
);

watch(
    () => attr.fontStyle,
    (val) => {
        target.setFontStyle(val);
    },
);

onUnmounted(() => {
    target.deselectAll();
});
</script>

<template>
    <div class="text-panel">
        <h2 class="m-svg-attr-title">文字</h2>

        <ElForm :model="attr" label-position="left" label-width="auto">
            <ElFormItem label="内容">
                <ElInput
                    v-model="attr.content"
                    placeholder="请输入内容"
                ></ElInput>
            </ElFormItem>

            <ElFormItem label="字体粗细">
                <ElSegmented
                    v-model="attr.fontWeight"
                    :options="weightOptions"
                ></ElSegmented>
            </ElFormItem>

            <ElFormItem label="字体字形">
                <ElSegmented
                    v-model="attr.fontStyle"
                    :options="styleOptions"
                ></ElSegmented>
            </ElFormItem>

            <ElFormItem label="字体大小">
                <ElInput
                    v-model="attr.fontSize"
                    placeholder="请输入字体大小"
                ></ElInput>
            </ElFormItem>

            <ElFormItem label="文本字体">
                <ElSelect v-model="attr.fontFamily" placeholder="请选择字体">
                    <el-option
                        v-for="(family, family_idx) in familyOptions"
                        :key="family_idx"
                        :label="family.label"
                        :value="family.value"
                    />
                </ElSelect>
            </ElFormItem>

            <ElFormItem label="文本颜色">
                <ElColorPicker v-model="attr.fill"></ElColorPicker>
            </ElFormItem>
        </ElForm>
    </div>
</template>

<style scoped></style>

<!--
font-size 字体大小
fill 文本颜色

-->
