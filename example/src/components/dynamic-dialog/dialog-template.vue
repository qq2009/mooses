<template>
    <ElDialog
        v-model="visible"
        :width="width"
        :top="top"
        class="dialog-template"
        append-to-body
        @closed="handleClosed"
    >
        <ElConfigProvider :locale="zhCn">
            <slot />
        </ElConfigProvider>
    </ElDialog>
</template>

<script>
import { defineComponent, onMounted, provide, ref } from 'vue';
import { ElConfigProvider } from 'element-plus';
import { PROVIDE_DYNAMIC_DIALOG } from './components/config';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

export default defineComponent({
    name: 'DialogTemplate',
    components: { ElConfigProvider },
    props: {
        top: {
            type: String,
            default: '10vh',
        },
        width: {
            type: String,
            default: '90%',
        },
    },
    emits: ['closed'],
    setup(props, { emit }) {
        const visible = ref(false);

        const close = () => {
            visible.value = false;
        };

        const handleClosed = () => {
            emit('closed');
        };

        provide(PROVIDE_DYNAMIC_DIALOG, {
            close,
        });

        onMounted(() => {
            visible.value = true;
        });
        return {
            visible,
            close,
            handleClosed,
            zhCn,
        };
    },
});
</script>

<style lang="scss">
</style>
