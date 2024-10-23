<script setup>
import { ref } from 'vue';
import { ElDialog } from 'element-plus';

const visible = ref(true);
</script>

<template>
    <ElDialog v-model="visible" v-bind="$attrs">
        <slot></slot>
    </ElDialog>
</template>

<style scoped lang="scss"></style>
