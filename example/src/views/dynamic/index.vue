<script setup>
import { ElButton } from 'element-plus';

import { useDynamicDialog } from '@mooses/dynamic-dialog';
import { useDynamicDrawer } from '@mooses/dynamic-drawer';

import { MForm } from '@mooses/form';
import { options } from '../form/config';

import Content from '@/views/dynamic/components/content.vue';

const dynamicDialog = useDynamicDialog();
const dynamicDrawer = useDynamicDrawer();

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

function handleOpenDrawer() {
    const destroyComponent = dynamicDrawer.load(
        MForm,
        {
            options,
        },
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
        <ElButton @click="handleOpenDialog">对话框</ElButton>
        <ElButton @click="handleOpenDrawer">抽屉</ElButton>
    </div>
</template>

<style scoped lang="scss"></style>
