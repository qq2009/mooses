/**
 * 启用元素的拖拽功能
 *
 * @param element 需要启用拖拽功能的DOM元素
 * @param container 拖拽容器的DOM元素
 * @param options 配置选项，可选参数
 */
export function enableDrag(element, container, options = {}) {
    let isDragging = false;
    let offsetX, offsetY;

    // 获取并初始化配置选项
    const settings = initializeOptions(options);

    // 设置元素的初始位置
    initializePosition(element, settings.initialPosition);

    // 设置手柄样式
    settings.handle.style.cursor = 'grab';

    // 拖拽开始事件
    function onMouseDown(e) {
        isDragging = true;
        const elementRect = element.getBoundingClientRect();
        offsetX = e.clientX - elementRect.left;
        offsetY = e.clientY - elementRect.top;
        settings.handle.style.cursor = 'grabbing';
        // 调用拖拽开始回调
        settings.onStart(e);

        // 绑定拖拽移动和拖拽结束事件
        bindDragEvents();
    }

    // 拖拽移动事件
    function onMouseMove(e) {
        if (!isDragging) return;

        const containerRect = container.getBoundingClientRect();
        let { newLeft, newTop } = calculateNewPosition(
            e,
            element,
            containerRect,
            offsetX,
            offsetY,
            settings.maxSpeed,
        );

        // 检查是否需要进行边界限制
        if (settings.boundaryLimit) {
            const elementRect = element.getBoundingClientRect();
            ({ newLeft, newTop } = enforceBoundaries(
                newLeft,
                newTop,
                elementRect,
                containerRect,
            ));
        }

        // 如果启用了吸附功能，进行吸附检查
        if (settings.snapToBoundary) {
            const elementRect = element.getBoundingClientRect();
            ({ newLeft, newTop } = applySnapToBoundary(
                newLeft,
                newTop,
                elementRect,
                containerRect,
                settings.snapThreshold,
            ));
        }

        // 如果启用了栅格对齐，进行栅格对齐处理
        if (settings.enableGridSnap) {
            ({ newLeft, newTop } = applyGridSnap(
                newLeft,
                newTop,
                settings.gridSize,
            ));
        }

        // 根据拖拽方向更新元素位置
        updatePosition(element, newLeft, newTop, settings.direction);

        // 调用拖拽移动回调
        settings.onMove({ top: newTop, left: newLeft }, e);
    }

    // 拖拽结束事件
    function onMouseUp(e) {
        isDragging = false;
        settings.handle.style.cursor = 'grab';
        // 调用拖拽结束回调
        settings.onEnd(e);
        unbindDragEvents();
    }

    // 初始化选项
    function initializeOptions(options) {
        return {
            // 是否启用边界限制
            boundaryLimit: false,
            // 拖拽方向：'horizontal', 'vertical', 'both'
            direction: 'both',
            // 拖拽时的最大速度限制（单位：像素）
            maxSpeed: 40,
            // // 初始位置
            initialPosition: { top: 0, left: 0 },
            // 是否启用边界吸附
            snapToBoundary: false,
            // 吸附的距离阈值，单位：像素
            snapThreshold: 20,
            // 是否启用栅格对齐
            enableGridSnap: false,
            // 栅格大小，单位：像素
            gridSize: 10,
            // 自定义手柄，默认为元素本身
            handle: element,
            // 拖拽开始回调
            onStart: () => {},
            // 拖拽移动回调
            onMove: () => {},
            // 拖拽结束回调
            onEnd: () => {},
            ...options,
        };
    }

    // 初始化元素位置
    function initializePosition(element, initialPosition) {
        element.style.left = `${initialPosition.left}px`;
        element.style.top = `${initialPosition.top}px`;
        // 确保元素绝对定位
        element.style.position = 'absolute';
    }

    // 计算新位置并限制速度
    function calculateNewPosition(
        e,
        element,
        containerRect,
        offsetX,
        offsetY,
        maxSpeed,
    ) {
        let newLeft = e.clientX - offsetX - containerRect.left;
        let newTop = e.clientY - offsetY - containerRect.top;

        // 限制最大速度 防止位置跳动
        const deltaX = Math.min(
            Math.max(newLeft - parseFloat(element.style.left), -maxSpeed),
            maxSpeed,
        );
        const deltaY = Math.min(
            Math.max(newTop - parseFloat(element.style.top), -maxSpeed),
            maxSpeed,
        );

        newLeft = parseFloat(element.style.left) + deltaX;
        newTop = parseFloat(element.style.top) + deltaY;

        return { newLeft, newTop };
    }

    // 检查并限制边界
    function enforceBoundaries(newLeft, newTop, elementRect, containerRect) {
        if (newLeft < 0) newLeft = 0;
        if (newTop < 0) newTop = 0;
        if (newLeft + elementRect.width > containerRect.width) {
            newLeft = containerRect.width - elementRect.width;
        }
        if (newTop + elementRect.height > containerRect.height) {
            newTop = containerRect.height - elementRect.height;
        }
        return { newLeft, newTop };
    }

    // 边界吸附检查
    function applySnapToBoundary(
        newLeft,
        newTop,
        elementRect,
        containerRect,
        snapThreshold,
    ) {
        // 吸附左边界
        if (newLeft < snapThreshold) {
            newLeft = 0;
        }

        // 吸附右边界
        if (
            containerRect.width - (newLeft + elementRect.width) <
            snapThreshold
        ) {
            newLeft = containerRect.width - elementRect.width;
        }

        // 吸附上边界
        if (newTop < snapThreshold) {
            newTop = 0;
        }

        // 吸附下边界
        if (
            containerRect.height - (newTop + elementRect.height) <
            snapThreshold
        ) {
            newTop = containerRect.height - elementRect.height;
        }
        return { newLeft, newTop };
    }

    // 栅格对齐检查
    function applyGridSnap(newLeft, newTop, gridSize) {
        // 对齐到最近的栅格点
        newLeft = Math.round(newLeft / gridSize) * gridSize;
        newTop = Math.round(newTop / gridSize) * gridSize;
        return { newLeft, newTop };
    }

    // 更新元素位置
    function updatePosition(element, newLeft, newTop, direction) {
        if (direction === 'horizontal') {
            element.style.left = `${newLeft}px`;
        } else if (direction === 'vertical') {
            element.style.top = `${newTop}px`;
        } else {
            element.style.left = `${newLeft}px`;
            element.style.top = `${newTop}px`;
        }
    }

    // 绑定拖拽移动与结束事件
    function bindDragEvents() {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    // 解绑拖拽移动与结束事件
    function unbindDragEvents() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    // 绑定拖拽开始事件
    settings.handle.addEventListener('mousedown', onMouseDown);

    // 提供外部禁用拖拽功能
    return () => {
        unbindDragEvents();
        settings.handle.removeEventListener('mousedown', onMouseDown);
    };
}
