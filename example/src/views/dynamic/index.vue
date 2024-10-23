<script setup>
import { ElButton } from 'element-plus';

import { useDynamic } from '@mooses/dynamic';
import DialogTest from '@/views/dynamic/components/dialog-test.vue';
import Content from '@/views/dynamic/components/content.vue';

const dialog = useDynamic(
    DialogTest,
    {
        title: 'Tips',
        width: '500',
    },
    { isTeleporting: true },
);

function handleOpenDialog() {
    dialog(Content, {});
}
</script>

<template>
    <div class="dynamic container">
        <ElButton @click="handleOpenDialog">测试</ElButton>
    </div>
</template>

<style scoped lang="scss"></style>
