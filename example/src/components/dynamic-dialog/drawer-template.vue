<template>
    <ElDrawer
        v-model="visible"
        :size="size"
        class="drawer-template"
        append-to-body
        @closed="handleClosed"
    >
        <ElConfigProvider :locale="zhCn">
            <slot />
        </ElConfigProvider>
    </ElDrawer>
</template>

<script>
import { defineComponent, onMounted, provide, ref } from 'vue';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { PROVIDE_DYNAMIC_DIALOG } from '@/components/dynamic-dialog/components/config';

export default defineComponent({
    name: 'DrawerTemplate',
    components: { ElConfigProvider },
    props: {
        size: {
            type: String,
            default: '50%',
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
