import { useDynamic } from '@mooses/dynamic';
import DynamicDialog from './dynamic-dialog.vue';

function initializeDialogProps() {
    return {
        title: 'Tips',
        width: '500',
    };
}

export function useDynamicDialog(initialProps = {}) {
    const props = {
        ...initializeDialogProps(),
        ...initialProps,
    };
    return useDynamic(DynamicDialog, props, { isTeleporting: true });
}
