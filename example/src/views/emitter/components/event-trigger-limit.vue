<script setup>
import { ElCard, ElButton } from 'element-plus';
import { emitter } from '../bus';

const register = () => {
    emitter.on(
        'limitedEvent',
        () => {
            console.log('This will be logged twice');
        },
        { times: 2 },
    );
};

const emit = () => {
    emitter.emit('limitedEvent');
};

</script>

<template>
    <ElCard>
        <template #header>
            <h2>限制事件触发次数</h2>
        </template>
        <div>
            <ElButton @click="register">注册限制调用2次事件</ElButton>
            <ElButton @click="emit">触发</ElButton>
        </div>
    </ElCard>
</template>

<style lang="scss" scoped></style>
