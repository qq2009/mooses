<script setup>
import { ElCard, ElButton } from 'element-plus';
import { emitter } from '../bus';

const register = () => {
    emitter.setMaxListeners(2);
    emitter.on('event', () => console.log('Listener 1'));
    emitter.on('event', () => console.log('Listener 2'));
    emitter.on('event', () => console.log('Listener 3')); // 输出警告: Max listeners exceeded
};
</script>

<template>
    <ElCard>
        <template #header>
            <h2>最大监听器数量限制</h2>
        </template>
        <div>
            <ElButton @click="register">最大注册2个同类型事件</ElButton>
        </div>
    </ElCard>
</template>

<style lang="scss" scoped></style>
