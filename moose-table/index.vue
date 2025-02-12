<script setup>
import { defineProps, useSlots } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';

const slots = useSlots();

const props = defineProps({
    /**
     * 数据源
     * */
    source: {
        type: Array,
        default: () => [],
    },
    /**
     * @type TableColumnsConfig[]
     * */
    columns: {
        type: Array,
        default: () => [],
    },
    height: {
        type: [String, Number],
    },
    slots: {
        type: Object,
        default: () => ({}),
    },
});

const mergeSlots = {
    ...slots,
    ...props.slots,
};

console.log(mergeSlots);
</script>

<template>
    <ElTable :data="source" :height="height">
        <template v-for="column in columns" :key="column.name">
            <template v-if="column.slot">
                <component :is="mergeSlots[column.slot]" />
            </template>
            <template v-else>
                <ElTableColumn v-bind="column" />
            </template>
        </template>
    </ElTable>
</template>

<style scoped></style>
