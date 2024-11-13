export const DRAWER_TYPE = {
    TEXT_PANEL: 'text-panel',
    BACKGROUND_PANEL: 'background-panel',
    LINE_PANEL: 'line-panel',
    RECT_PANEL: 'rect-panel',
};

export function generateUUID() {
    return 'editor-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
