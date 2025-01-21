<script setup>
import { ref } from 'vue';
import { useElementSize } from '@vueuse/core';
import { ElCol, ElButton, ElPagination } from 'element-plus';
import { MForm } from '@mooses/form';
import { MTable } from '@mooses/table';

const props = defineProps({
    conditions: {
        type: Array,
        default: () => [],
    },
    datum: {
        type: Array,
        default: () => [],
    },
    columns: {
        type: Array,
        default: () => [],
    },
});

const bodyEl = ref(null);
const { height } = useElementSize(bodyEl);

const handleSearch = () => {
    // Implement search logic
};

const handleReset = () => {
    // Implement reset logic
};
</script>

<template>
    <div class="m-cond-table">
        <div class="m-cond-conditions">
            <MForm :options="conditions">
                <template #handle>
                    <ElCol :span="4">
                        <ElButton @click="handleSearch">查询</ElButton>
                        <ElButton @click="handleReset">重置</ElButton>
                    </ElCol>
                </template>
            </MForm>
        </div>

        <div class="m-cond-handle">
            <slot name="cond-handle"></slot>
        </div>

        <div class="m-cond-body" ref="bodyEl">
            <MTable
                :height="height"
                :source="datum"
                :columns="columns"
                :slots="$slots"
            />
        </div>

        <div class="m-cond-page">
            <ElPagination
                :page-sizes="[10, 40, 80]"
                layout="total, prev, pager, next, sizes, jumper"
                :total="datum.length"
            />
        </div>
    </div>
</template>

<style scoped>
.m-cond-table {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.m-cond-conditions {
}

.m-cond-handle {
}

.m-cond-body {
    flex: 1;
    overflow-y: hidden;
}

.m-cond-page {
    display: flex;
    justify-content: end;
}
</style>
