<script setup>
import { ref } from 'vue';
import { ElTree, ElLink } from 'element-plus';
import { useCanvas } from '../../hooks/canvas';
import { layers, resetLayers } from '../../store/layer-manager';
import { DRAWER_TYPE } from '../../../core/drawer/constant';

/**
 * @type { Ref<ElTree> }
 * */
const treeRef = ref(null);
const canvas = useCanvas();
const currentKey = ref('');

const defaultProps = {
    children: 'children',
    label: 'label',
};

function addLayer({ id, label, type, target, el }) {
    const newLayer = {
        id,
        label,
        type,
        target,
        el,
        children: [],
    };

    if (layers.value.length) {
        const [node] = layers.value;
        node.children.push(newLayer);
    } else {
        layers.value.push(newLayer);
    }
}

function removeLayer({ id, target }) {
    const node = treeRef.value.getNode(id);
    if (node) {
        treeRef.value.remove(node);
        target.deselectAll();
        target.remove();
        canvas.emitter.emit(canvas.emitter_type.DELAYER, { id });
        if (currentKey.value === id) {
            const [node] = layers.value;
            node.target.select();
        }
    }
}

function handleElementSelection({ id }) {
    currentKey.value = id;
    treeRef.value.setCurrentKey(id);
}

function handleCurrentChange(data) {
    currentKey.value = data.id;
    data.target.select();
}

canvas.emitter.on(canvas.emitter_type.ELEMENT_CREATED, addLayer);

canvas.emitter.on(canvas.emitter_type.ELEMENT_CLEARED, resetLayers);

canvas.emitter.on(canvas.emitter_type.SELECT_ELEMENT, handleElementSelection);
</script>

<template>
    <div class="layer-manager">
        <h2 class="layer-manager-title">图层</h2>
        <ElTree
            ref="treeRef"
            node-key="id"
            highlight-current
            default-expand-all
            :data="layers"
            :props="defaultProps"
            :expand-on-click-node="false"
            @current-change="handleCurrentChange"
        >
            <template #default="{ node, data }">
                <span class="layer-manager-tree-node">
                    <span>{{ node.label }}</span>
                    <template
                        v-if="
                            ![DRAWER_TYPE.BACKGROUND_PANEL].includes(data.type)
                        "
                    >
                        <ElLink type="danger" @click.stop="removeLayer(data)"
                            >删除</ElLink
                        >
                    </template>
                </span>
            </template>
        </ElTree>
    </div>
</template>

<style scoped>
.layer-manager {
    height: 40vh;
    background-color: #ececee;
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

::v-deep(.el-tree) {
    background-color: transparent;
}
</style>
