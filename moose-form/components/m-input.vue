<script setup>
import { ref } from 'vue';
import { ElFormItem, ElInput } from 'element-plus';

const value = ref('');
</script>

<template>
    <ElFormItem>
        <ElInput v-model="value" />
    </ElFormItem>
</template>

<style scoped></style>
