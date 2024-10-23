<script setup>
import { ElCard, ElButton } from 'element-plus';
import { emitter } from '../bus';

const register = () => {
    emitter.on('task', () => console.log('优先级 1'), { priority: 1 });
    emitter.on('task', () => console.log('优先级 10'), { priority: 10 });
};

const emit = () => {
    emitter.emit('task');
};
</script>

<template>
    <ElCard>
        <template #header>
            <h2>事件优先级</h2>
        </template>
        <div>
            <h3>权重越大 事件越靠前</h3>
            <ElButton @click="register">注册</ElButton>
            <ElButton @click="emit">触发</ElButton>
        </div>
    </ElCard>
</template>

<style lang="scss" scoped></style>
