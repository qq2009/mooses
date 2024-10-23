<script setup>
import { ElTableColumn, ElCard, ElButton } from 'element-plus';
import { MTable } from '@mooses/table';
import { columnsA, columnsB, columnsC, datum } from './config';
</script>

<template>
    <div class="container">
        <ElCard>
            <template #header>
                <h2>基础用法</h2>
            </template>
            <MTable :source="datum" :columns="columnsA" />
        </ElCard>

        <ElCard>
            <template #header>
                <h2>格式化数据</h2>
            </template>
            <MTable :source="datum" :columns="columnsB" />
        </ElCard>

        <ElCard>
            <template #header>
                <h2>自定义插槽</h2>
            </template>
            <MTable :source="datum" :columns="columnsC">
                <template #date>
                    <ElTableColumn label="Date">
                        <template #default="scope">
                            <ElButton size="small">打卡</ElButton>
                        </template>
                    </ElTableColumn>
                </template>
            </MTable>
        </ElCard>

        <ElCard>
            <template #header>
                <h2>自适应固定表头</h2>
            </template>
            <div class="fixed-body">
                <MTable :source="datum" :columns="columnsC">
                    <template #date>
                        <ElTableColumn label="Date">
                            <template #default="scope">
                                <ElButton size="small">打卡</ElButton>
                            </template>
                        </ElTableColumn>
                    </template>
                </MTable>
            </div>
        </ElCard>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    .fixed-body {
        height: 300px;
    }
}
</style>
