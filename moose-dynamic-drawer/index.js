import { useDynamic } from '@mooses/dynamic';
import DynamicDrawer from './dynamic-drawer.vue';

function initializeDialogProps() {
    return {
        title: 'Tips',
        direction: 'rtl'
    };
}

export function useDynamicDrawer(initialProps = {}) {
    const props = {
        ...initializeDialogProps(),
        ...initialProps,
    };
    return useDynamic(DynamicDrawer, props, { isTeleporting: true });
}
