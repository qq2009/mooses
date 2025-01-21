<script setup>
import { MCondTable } from '@mooses/cond-table';
import { columnsA, datum, options } from './config';
</script>

<template>
    <div class="cond-table">
        <MCondTable :datum="datum" :columns="columnsA" :conditions="options">
            <template #cond-handle>
                <ElButton>新增角色</ElButton>
                <ElButton>绑定用户</ElButton>
            </template>
            <template #operate>
                <ElTableColumn label="操作">
                    <template #default>
                        <ElButton>编辑</ElButton>
                        <ElButton>删除</ElButton>
                    </template>
                </ElTableColumn>
            </template>
        </MCondTable>
    </div>
</template>

<style lang="scss" scoped>
.cond-table {
    height: 100vh;
}
</style>
