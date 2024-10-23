<script setup>
import { ElCard, ElButton } from 'element-plus';
import { emitter } from '../bus';

const register = () => {
    emitter.on('user.create', (name) => {
        console.log(`User created: ${user}`);
    });

    emitter.on('user.create', (name) => {
        console.log(`User created: ${user}`);
    });
};

const emit = () => {
    emitter.emit('user.create', '赵铁柱');
};

const off = () => {
    emitter.off('user.*');
};
</script>

<template>
    <ElCard>
        <template #header>
            <h2>事件命名空间</h2>
        </template>
        <div>
            <ElButton @click="register">注册2个事件</ElButton>
            <ElButton @click="emit">触发</ElButton>
            <ElButton @click="off">取消所有相关事件</ElButton>
        </div>
    </ElCard>
</template>

<style lang="scss" scoped></style>
