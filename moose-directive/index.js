import { enableDrag } from '@mooses/drag';

export const mdrag = {
    mounted(el, binding) {
        const option = binding.value || {};
        const { parent = el.parentElement, handle } = option;

        if (handle) {
            const dom = el.querySelector(handle) || el;
            Object.assign(option, {
                handle: dom,
            });
        }

        const disableDrag = enableDrag(el, parent, option);
        // 清理函数：在元素解绑时移除拖拽功能
        el._disableDrag = disableDrag;
    },
    unmounted(el) {
        // 在组件销毁时，解绑事件监听，防止内存泄漏
        if (el._disableDrag) {
            el._disableDrag();
        }
    },
};
