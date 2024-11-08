<script setup>
import { MSvgEditor } from '@mooses/svg-editor';
import { useDynamicDialog } from '@/components/dynamic-dialog/index';
import ReadWrite from '@/views/svg-editor/read-write.vue';
const dynamicDialog = useDynamicDialog();

function handleOpen() {
    dynamicDialog.load(
        {
            title: '信息发布',
            type: 'dialog',
            fullscreen: true,
            modalClass: 'info-play-dialog',
        },
        ReadWrite,
    );
}
</script>

<template>
    <div class="svg-editor">
        <button @click="handleOpen">Open</button>
        <!--        <MSvgEditor />-->
    </div>
</template>

<style scoped lang="scss">
.svg-editor {
    height: 100vh;
}
</style>
<style lang="scss">
.info-play-dialog {
    .el-dialog {
        margin: initial;
        padding: initial;
    }

    .el-dialog__header {
        display: none;
    }
}
</style>
