<script setup>
import { reactive, watch, onUnmounted } from 'vue';
import { ElForm, ElFormItem, ElInput, ElColorPicker } from 'element-plus';

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
    fontSize: '',
    fill: '',
});

const { target } = props;

attr.content = target.getText();
attr.fontSize = target.getSize();
attr.fill = target.getFill();

watch(() => attr.content, (val) => {
    target.setText(val);
});

watch(() => attr.fontSize, (val) => {
    target.setSize(val);
});

watch(() => attr.fill, (val) => {
    target.setFill(val);
});

onUnmounted(() => {
    target.deselectAll();
})
</script>

<template>
    <div class="text-panel">
        <h2>文字</h2>

        <ElForm :model="attr" label-position="left" label-width="auto">
            <ElFormItem label="内容">
                <ElInput
                    v-model="attr.content"
                    placeholder="请输入内容"
                ></ElInput>
            </ElFormItem>

            <ElFormItem label="字体大小">
                <ElInput
                    v-model="attr.fontSize"
                    placeholder="请输入字体大小"
                ></ElInput>
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
