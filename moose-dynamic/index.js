import { render, h, getCurrentInstance, Teleport } from 'vue';

function genContainer() {
    return document.createElement('div');
}

function initializeOptions(options) {
    return {
        // 控制是否开启 Teleport
        isTeleporting: false,
        // 插入目标
        teleportTarget: document.body,
        ...options,
    };
}

export function useDynamic(component, props = {}, options = {}) {
    const settings = initializeOptions(options);
    const instance = getCurrentInstance();
    const { appContext } = instance;

    function load(slot, slotProps = {}) {
        let container = genContainer();
        const vnode = h(component, props, () => h(slot, slotProps));
        vnode.appContext = appContext;

        if (settings.isTeleporting) {
            const teleportVnode = h(Teleport, { to: settings.teleportTarget }, [
                vnode,
            ]);
            render(teleportVnode, container);
        } else {
            render(vnode, container);
        }
    }

    return load;
}
