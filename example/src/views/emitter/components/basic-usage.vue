<script setup>
import { ElCard, ElButton } from 'element-plus';
import { emitter } from '../bus';

const register = () => {
    emitter.on('Hello', (name) => {
        console.log(`Hello, ${name}!`);
    });
};

const emit = () => {
    emitter.emit('Hello', '赵铁柱');
};
</script>

<template>
    <ElCard>
        <template #header>
            <h2>基础用法</h2>
        </template>
        <div>
            <ElButton @click="register">注册 Hello</ElButton>
            <ElButton @click="emit">触发 Hello</ElButton>
        </div>
    </ElCard>
</template>

<style lang="scss" scoped></style>
