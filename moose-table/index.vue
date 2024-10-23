<script setup>
import { defineProps } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';

const props = defineProps({
    /**
     * 数据源
     * */
    source: {
        type: Array,
        default: () => [],
    },
    /**
     * @type ColumnConfig[]
     * */
    columns: {
        type: Array,
        default: () => [],
    },
    height: {
        type: [String, Number],
    },
});
</script>

<template>
    <ElTable :data="source" :height="height">
        <template v-for="column in columns" :key="column.name">
            <template v-if="column.slot">
                <slot :name="column.slot"></slot>
            </template>
            <template v-else>
                <ElTableColumn v-bind="column" />
            </template>
        </template>
    </ElTable>
</template>

<style scoped></style>
