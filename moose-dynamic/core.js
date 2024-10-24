import { render, h, getCurrentInstance, Teleport, onUnmounted } from 'vue';

// 生成新的 div 容器元素
function genContainer() {
    return document.createElement('div');
}

// 初始化选项，合并默认选项和传入选项
function initializeOptions(options) {
    return {
        // 控制是否开启 Teleport 功能
        isTeleporting: false,
        // Teleport 的目标元素，默认为 document.body
        teleportTarget: document.body,
        // 组件挂载完成后的回调函数
        onMount: null,
        // 合并传入的其他选项
        ...options,
    };
}

// 动态加载组件的钩子函数
export function useDynamic(component, initialProps = {}, options = {}) {
    // 唯一标识符
    let uuid = 1;
    // 存储已加载组件的卸载函数
    const stack = new Map();

    // 初始化设置
    const settings = initializeOptions(options);
    // 取当前组件实例
    const instance = getCurrentInstance();

    // 检查是否在 setup 函数中调用
    if (!instance) {
        throw new Error('useDynamic 必须在 setup 函数中调用');
    }

    // 获取应用上下文
    const { appContext } = instance;

    // 加载组件的函数
    function load(slot, slotProps = {}, replenishProps = {}) {
        const container = genContainer();

        // 创建组件的虚拟节点
        const vnode = h(
            component,
            // 合并初始属性和传入属性
            { ...initialProps, ...replenishProps },
            // 如果有插槽，则创建插槽的虚拟节点
            slot ? () => h(slot, slotProps) : null,
        );

        // 绑定应用上下文
        vnode.appContext = appContext;

        try {
            // 根据设置决定是否使用 Teleport 功能来渲染组件
            if (settings.isTeleporting && settings.teleportTarget) {
                const teleportVnode = h(
                    Teleport,
                    { to: settings.teleportTarget },
                    // 将组件的虚拟节点放入 Teleport 中
                    [vnode],
                );
                render(teleportVnode, container);
            } else {
                render(vnode, container);
            }

            // 调用挂载完成后的回调函数
            if (typeof settings.onMount === 'function') {
                // 传入挂载的元素
                settings.onMount(vnode.el);
            }

            // 生成当前组件的唯一标识符，并存储卸载函数到 stack 中
            const currentUuid = uuid++;
            stack.set(currentUuid, () => {
                // 卸载组件，通过将容器内容设置为 null 来实现
                render(null, container);
                // 从 stack 中删除卸载函数
                stack.delete(currentUuid);
            });

            // 返回一个函数，用于手动销毁当前组件实例
            return function destroy() {
                if (stack.has(currentUuid)) {
                    stack.get(currentUuid)();
                }
            };
        } catch (error) {
            console.error('组件渲染时出现错误:', error);
        }
    }

    // 卸载所有已加载的组件实例的函数
    function destroyAll() {
        stack.forEach((unmountFn) => unmountFn());
        stack.clear();
    }

    // 当前实例被卸载时，自动调用 destroyAll 函数来清理所有动态加载的组件实例
    onUnmounted(() => {
        destroyAll();
    });

    return {
        load,
        destroyAll,
    };
}
