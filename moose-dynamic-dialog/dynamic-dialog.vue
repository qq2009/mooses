<script setup>
import { ref } from 'vue';
import { ElDialog } from 'element-plus';

const visible = ref(true);
</script>

<template>
    <ElDialog class="moose-dynamic-dialog" v-model="visible" v-bind="$attrs">
        <slot></slot>
    </ElDialog>
</template>

<style scoped lang="scss"></style>
