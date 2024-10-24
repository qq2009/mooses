<script setup>
import { ElButton } from 'element-plus';

import { useDynamic } from '@mooses/dynamic';
import { useDynamicForm } from './useDynamicForm';

import DialogTest from '@/views/dynamic/components/dialog-test.vue';
import Content from '@/views/dynamic/components/content.vue';

const dynamicDialog = useDynamic(
    DialogTest,
    {
        title: 'Tips',
        width: '500',
    },
    { isTeleporting: true },
);

const { loadForm } = useDynamicForm({
    title: '用户信息表单',
    initialFormData: {
        username: '',
        email: '',
    },
    rules: {
        username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
    },
    onSubmit(data) {
        console.log('表单提交的数据:', data);
    },
    onCancel() {
        console.log('表单取消');
    },
});

function handleOpenDialog() {
    const destroyComponent = dynamicDialog.load(
        Content,
        {},
        {
            onClosed() {
                destroyComponent();
            },
        },
    );
}
</script>

<template>
    <div class="dynamic container">
        <ElButton @click="handleOpenDialog">测试</ElButton>
        <ElButton @click="loadForm">打开动态表单</ElButton>
    </div>
</template>

<style scoped lang="scss"></style>
