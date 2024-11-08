import { inject } from 'vue';

export const PROVIDE_DYNAMIC_DIALOG = 'PROVIDE_DYNAMIC_DIALOG';

export function useDynamicDialogMethod() {
    const dynamicDialog = inject(PROVIDE_DYNAMIC_DIALOG);
    if (!dynamicDialog) {
        throw new Error(
            'useDynamicDialog must be called inside a <dynamic-dialog> component',
        );
    }
    return dynamicDialog;
}
