import { getCurrentInstance, onUnmounted, h, render } from 'vue';
import DialogTemplate from './dialog-template.vue';
import DrawerTemplate from './drawer-template.vue';

// 内置组件注册
export const module_registry = {};

function genContainer() {
    return document.createElement('div');
}

const defaultProps = {
    closeOnClickModal: false,
    closeOnPressEscape: false,
};

const loadDict = {
    drawer: DrawerTemplate,
    dialog: DialogTemplate,
};

const loadDefaultType = 'drawer';

export function useDynamicDialog() {
    let uuid = 1;
    const stack = new Map();

    const instance = getCurrentInstance();
    const { appContext } = instance;

    // 页面卸载关闭所有打开组件
    onUnmounted(() => {
        close();
    });

    function load(props = {}, context, contextProps = {}) {
        let container = genContainer();
        container.className = 'dynamic-dialog';

        let registryComponent = context;
        if (module_registry[context]) {
            registryComponent = module_registry[context];
        }

        function onClosed() {
            render(null, container);
            container = null;
            stack.delete(uuid);
        }

        const { type, ...args } = props;
        const typeKey = type || loadDefaultType;
        const mergeProps = { ...defaultProps, onClosed, ...args };

        const vnode = h(loadDict[typeKey], mergeProps, () =>
            h(registryComponent, contextProps),
        );

        vnode.appContext = appContext;
        render(vnode, container);
        // appendTo?.appendChild(container);

        stack.set(uuid, vnode.component);
        uuid++;
    }

    function close() {
        stack.forEach((vm) => {
            vm.proxy.close();
        });
        stack.clear();
    }

    return {
        load,
        close,
    };
}
