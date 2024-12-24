<script setup>
import { defineComponent, ref, computed, defineExpose, defineProps } from 'vue';
import { ElForm, ElRow, ElCol } from 'element-plus';
import { DLL } from './config';

defineComponent({
    name: 'MForm',
});

const props = defineProps({
    /**
     * 表单配置项数组
     * @type { Array<FormConfig> }
     * */
    options: {
        type: Array,
        required: true,
    },
    // 栅格间隔
    gutter: {
        type: Number,
        default: 20,
    },
    // 栅格占据的列数
    span: {
        type: Number,
        default: 24,
    },
});

const { options: formOptionsProp, span } = props;
// 表单引用
const formRef = ref(null);
// 表单数据
const form = ref({});

// 确保options始终为数组类型
const formOptions = computed(() => formOptionsProp || []);

// 根据类型获取对应的组件
const getComponentType = (type) => DLL[type] || 'div';

// 获取列跨度，优先使用列配置中的span，否则使用默认的span
const getSpan = (column) => column.span || span;

// 处理组件更新事件，更新表单数据模型
const handleUpdate = (newValue) => {
    Object.keys(newValue).forEach((key) => {
        // 保留这个判断用来确保不会向form.value添加不必要的属性
        // if (form.value.hasOwnProperty(key)) {
        form.value[key] = newValue[key];
        // }
    });
};

// 表单验证方法，返回Promise异步处理验证结果
function validate() {
    return new Promise((resolve, reject) => {
        formRef.value.validate((valid) => {
            if (valid) {
                resolve(form.value);
            } else {
                resolve(false);
            }
        });
    });
}

defineExpose({
    validate,
});
</script>

<template>
    <ElForm class="moose-form" :model="form" ref="formRef" v-bind="$attrs">
        <ElRow :gutter="gutter">
            <template v-for="column of formOptions" :key="column.name">
                <ElCol :span="getSpan(column)">
                    <component
                        class="moose-form__item"
                        :is="getComponentType(column.type)"
                        v-bind="column"
                        @update="handleUpdate"
                    />
                </ElCol>
            </template>
        </ElRow>
    </ElForm>
</template>

<style scoped></style>
