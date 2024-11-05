<script setup>
import { ElTree, ElLink } from 'element-plus';
import { layers, removeLayer } from '../store/layer-manager';

const defaultProps = {
    children: 'children',
    label: 'label',
};
</script>

<template>
    <div class="layer-manager">
        <h2 class="layer-manager-title">图层管理</h2>
        <ElTree :data="layers" :props="defaultProps">
            <template #default="{ node, data }">
                <span class="layer-manager-tree-node">
                    <span>{{ node.label }}</span>
                    <ElLink type="danger" @click="removeLayer(data)"
                        >删除</ElLink
                    >
                </span>
            </template>
        </ElTree>
    </div>
</template>

<style scoped>
.layer-manager {
    height: 40vh;
    background-color: red;
}

.layer-manager-title {
    font-size: 18px;
}

.layer-manager-tree-node {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
