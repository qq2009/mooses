<script setup>
import { ElCard } from 'element-plus';
import { MForm } from '@mooses/form';
import { columns } from './config';
</script>

<template>
    <div class="container">
        <ElCard>
            <template #header>
                <h2>基础用法</h2>
            </template>
            <MForm :columns="columns" />
        </ElCard>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}
</style>
