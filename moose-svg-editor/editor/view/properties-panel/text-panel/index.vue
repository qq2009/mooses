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
import {
    weightOptions,
    styleOptions,
    familyOptions,
    sizeOptions,
} from './config';

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
attr.fontFamily = target.getFontFamily();
attr.fontWeight = target.getWeight();
attr.fontStyle = target.getFontStyle();

function hasTemplateString(str) {
    const regex = /^\$\{.*\}$/;
    return regex.test(str);
}

const isTemplateString = hasTemplateString(attr.content);

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

watch(
    () => attr.fontFamily,
    (val) => {
        target.setFontFamily(`${val}`);
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
            <!--    TODO: 如果是模版字符串 不让修改        -->
            <template v-if="!isTemplateString">
                <ElFormItem label="内容">
                    <ElInput
                        v-model="attr.content"
                        placeholder="请输入内容"
                    ></ElInput>
                </ElFormItem>
            </template>

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
                <ElSelect v-model="attr.fontSize" placeholder="请选择字体大小">
                    <ElOption
                        v-for="(size, size_idx) in sizeOptions"
                        :key="size_idx"
                        :label="size"
                        :value="size"
                    />
                </ElSelect>
            </ElFormItem>

            <ElFormItem label="文本字体">
                <ElSelect v-model="attr.fontFamily" placeholder="请选择字体">
                    <ElOption
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
