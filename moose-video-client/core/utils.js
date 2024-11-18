function generateUUIDv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function formatDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function isBrowserMaximized() {
    // 获取浏览器的窗口尺寸
    const outerWidth = window.outerWidth;
    const outerHeight = window.outerHeight;
    // 获取屏幕的有效区域去除任务栏
    const screenAvailWidth = window.screen.availWidth;
    const screenAvailHeight = window.screen.availHeight;
    // 判断浏览器是否最大化
    return (outerWidth >= screenAvailWidth && outerHeight >= screenAvailHeight);
}

function getBrowserInfo() {
    const userAgent = navigator.userAgent.toLowerCase();

    // 判断是否为Edge浏览器
    if (userAgent.indexOf('edg') > -1) {
        return 'Edge';
    }
    // 判断是否为Firefox浏览器
    if (userAgent.indexOf('firefox') > -1) {
        return 'Firefox';
    }
    // 判断是否为Chrome浏览器
    if (userAgent.indexOf('chrome') > -1 && userAgent.indexOf('edge') === -1) {
        return 'Chrome';
    }
    // 默认返回未知浏览器
    return 'Unknown';
}

function detectBrowser() {
    const browser = getBrowserInfo();  // 获取浏览器信息

    switch (browser) {
        case 'Edge':
            return {
                x: 12,
                y: 12,
                maximizedX: 5,
                maximizedY: 4
            };
        case 'Firefox':
            return {
                x: 6,
                y: 6,
                maximizedX: 8,
                maximizedY: 8
            };
        case 'Chrome':
            return {
                x: 8,
                y: 8,
                maximizedX: 0,
                maximizedY: 0
            };
        default:
            return {
                x: 0,
                y: 0,
                maximizedX: 0,
                maximizedY: 0
            };
    }
}

export function debounce(func, delay) {
    let timer = null;

    return function(...args) {
        // 每次触发事件时，清除上一次的定时器
        if (timer) {
            clearTimeout(timer);
        }

        // 设置新的定时器
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

export function getElementResizeAndPositionParams(element) {
    const elementRect = element.getBoundingClientRect();
    // 获取浏览器窗口相对于屏幕的位置
    const browserWindowX = window.screenX || window.screenLeft;
    const browserWindowY = window.screenY || window.screenTop;
    // 获取浏览器工具栏高度，估算地址栏和工具栏的高度
    // 通过计算 window.outerHeight 和 window.innerHeight 的差异
    const browserToolbarHeight = window.outerHeight - window.innerHeight;

    const detect = detectBrowser()

    // 浏览器窗口化内缩的边界调整
    const borderAdjustmentX = !isBrowserMaximized() ? detect.x : detect.maximizedX;
    const borderAdjustmentY = !isBrowserMaximized() ? detect.y : detect.maximizedY;

    const screenLeft = elementRect.left + browserWindowX + borderAdjustmentX;
    const screenTop = elementRect.top + browserWindowY + browserToolbarHeight - borderAdjustmentY;

    // 客户端只支持整数
    return {
        width: parseInt(elementRect.width),
        height: parseInt(elementRect.height),
        mgy: parseInt(screenTop, 10),
        mgx: parseInt(screenLeft, 10)
    };
}

export function createdHeader(type) {
    return {
        msgId: generateUUIDv4(),
        msgType: type,
        sendTime: formatDate()
    };
}

export function createdMessage(header, body = {}) {
    return {
        header: JSON.stringify(header),
        body: JSON.stringify(body)
    };
}