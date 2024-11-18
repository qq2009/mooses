import "../js/protocolcheck.js";
import { Logger } from './logger';
import { Ws } from './ws';
import { EventEmitter } from './event-emitter';
import { createdHeader, createdMessage, getElementResizeAndPositionParams } from './utils';

export class HzVideoClient {
    // 启用日志
    static enableLogging() {
        Logger.isLoggingEnabled = true;
    }

    // 禁用日志
    static disableLogging() {
        Logger.isLoggingEnabled = false;
    }


    static defaultOptions = {
        ws: 'ws://127.0.0.1:4502/chat'
    };

    static eventEmitter = new EventEmitter(); // 事件管理器
    static _isInit = false;

    static get isInit() {
        return this._isInit;
    }

    static set isInit(value) {
        const prevValue = this._isInit;
        this._isInit = value;
        if (prevValue !== value) {
            Logger.log(`isInit 状态变更为: ${value}`);
            this.eventEmitter.emit('initStatusChanged', value);  // 触发状态改变事件
        }
    }

    static wsInstance = null;

    static connect() {
        return new Promise((resolve, reject) => {
            if (!this.isInit) {
                this.wsInstance = new Ws(this.defaultOptions.ws);

                // 订阅 WebSocket 事件
                this.wsInstance.on('close', () => {
                    this.isInit = false;  // 连接关闭时修改 isInit
                    this.isVideoInit = false;
                    this.isVideoShow = false;
                    this.isVideoHide = false;
                });

                this.wsInstance.on('open', () => {
                    this.isInit = true;
                });

                this.wsInstance.connect()
                    .then(() => {
                        this.isInit = true;  // 连接成功时修改 isInit
                        resolve();
                    })
                    .catch((error) => {
                        Logger.error('HzVideoClient 初始化失败:', error);
                        reject(error);
                    });
            } else {
                Logger.log('HzVideoClient 已经初始化');
                resolve();
            }
        });
    }

    // 订阅状态变更
    static onInitStatusChanged(callback) {
        this.eventEmitter.on('initStatusChanged', callback);
    }


    static el = null;

    static videoBuildEl(el) {
        this.el = el;
    }

    // 监听定时器id
    static listenMoveTimerId = null;

    // 开启监听浏览器移动
    static startListenMove() {
        let lastX = window.screenX;
        let lastY = window.screenY;
        let lastWidth = window.innerWidth;

        // 每100ms检查一次浏览器窗口的位置
        this.listenMoveTimerId = setInterval(async () => {
            const currentX = window.screenX;
            const currentY = window.screenY;
            const currentWidth = window.innerWidth;
            // 如果浏览器位置发生变化，表示浏览器被移动
            if (currentX !== lastX || currentY !== lastY) {
                // 更新最后的位置
                lastX = currentX;
                lastY = currentY;

                // 延迟300ms，确保窗口位置变化后能获取到最新的宽度，避免窗口位置错位
                setTimeout(async () => {
                    await this.videoResize();
                }, 300);
                Logger.log('浏览器被移动了');
            }

            // 检查浏览器宽度变化
            if (currentWidth !== lastWidth) {
                lastWidth = currentWidth;
                // 延迟300ms，确保窗口位置变化后能获取到最新的宽度，避免窗口位置错位
                setTimeout(async () => {
                    await this.videoResize();
                }, 300);
                Logger.log('浏览器宽度发生变化');
            }
        }, 100);
    }

    // 停止监听浏览器移动
    static stopListenMove() {
        clearInterval(this.listenMoveTimerId);
    }

    // 视频客户端是否初始化
    static isVideoInit = false;

    // 视频客户端初始化
    static videoInit() {
        return new Promise((resolve, reject) => {
            // 如果已经初始化，则不再进行初始化
            if (this.isVideoInit) {
                Logger.log('视频客户端已初始化，无需重复初始化');
                resolve();  // 直接解析成功的 Promise
                return;
            }

            // 视频相关的初始化逻辑
            if (this.isInit) {
                Logger.log('视频初始化成功');

                const header = createdHeader('Init');
                const message = createdMessage(header, { width: '600', height: '300' });

                // 使用 send 方法并返回 Promise
                this.wsInstance.send(message, header.msgId)
                    .then((response) => {
                        Logger.log('视频初始化消息发送成功:', response);
                        HzVideoClient.isVideoInit = true;
                        this.startListenMove();  // 开启监听浏览器移动
                        resolve(response);  // 成功时解析 Promise
                    })
                    .catch((error) => {
                        Logger.error('视频初始化消息发送失败:', error);
                        reject(error);  // 发送失败时拒绝 Promise
                    });
            } else {
                Logger.error('视频初始化失败: WebSocket 未连接');
                reject(new Error('视频初始化失败: WebSocket 未连接'));  // 如果 WebSocket 未连接，拒绝 Promise
            }
        });
    }

    // 显示视频客户端
    static isVideoShow = false;  // 用于标记视频是否已显示

    static videoShow() {
        return new Promise((resolve, reject) => {
            // 如果已经显示，则不再进行显示
            if (this.isVideoShow) {
                Logger.log('视频已显示，无需重复显示');
                resolve();  // 直接解析成功的 Promise
                return;
            }

            // 如果视频未初始化，则无法显示
            if (!this.isVideoInit) {
                Logger.error('视频未初始化，无法显示');
                reject(new Error('视频未初始化，无法显示'));
                return;
            }

            Logger.log('显示视频客户端');

            // 假设有一个视频显示逻辑
            const header = createdHeader('Show');
            const message = createdMessage(header);

            this.wsInstance.send(message, header.msgId)
                .then((response) => {
                    Logger.log('视频显示消息发送成功:', response);
                    this.isVideoShow = true;  // 标记视频为已显示
                    this.isVideoHide = false;
                    this.addVisibilityChangeListener();  // 添加监听器
                    resolve(response);  // 成功时解析 Promise
                })
                .catch((error) => {
                    Logger.error('视频显示消息发送失败:', error);
                    reject(error);  // 发送失败时拒绝 Promise
                });
        });
    }

    static isVideoHide = false;  // 用于标记视频是否已隐藏
    static videoHide(isRemove = true) {
        return new Promise((resolve, reject) => {

            // 如果已经隐藏，则不再进行隐藏
            if (this.isVideoHide) {
                Logger.log('视频已隐藏，无需重复隐藏');
                resolve();  // 直接解析成功的 Promise
                return;
            }

            // 如果视频未初始化，则无法隐藏
            if (!this.isVideoInit) {
                Logger.error('视频未初始化，无法隐藏');
                reject(new Error('视频未初始化，无法隐藏'));
                return;
            }

            Logger.log('隐藏视频客户端');

            // 假设有一个视频隐藏逻辑
            const header = createdHeader('Hide');
            const message = createdMessage(header);

            this.wsInstance.send(message, header.msgId)
                .then((response) => {
                    Logger.log('视频隐藏消息发送成功:', response);
                    this.isVideoShow = false;
                    this.isVideoHide = true;
                    isRemove && this.removeVisibilityChangeListener();  // 移除监听器
                    resolve(response);  // 成功时解析 Promise
                })
                .catch((error) => {
                    Logger.error('视频隐藏消息发送失败:', error);
                    reject(error);  // 发送失败时拒绝 Promise
                });
        });
    }

    // 改变控件大小
    static videoResize() {
        return new Promise((resolve, reject) => {

            if (!this.isVideoInit) {
                Logger.error('视频未初始化，无法改变控件大小');
                reject(new Error('视频未初始化，无法改变控件大小'));
                return;
            }

            if (this.el === null) {
                Logger.error('未绑定元素，无法改变控件大小位置');
                reject(new Error('未绑定元素，无法改变控件大小位置'));
                return;
            }

            Logger.log('改变客户端控件大小');

            const params = getElementResizeAndPositionParams(this.el);

            // 假设有一个视频隐藏逻辑
            const header = createdHeader('Resize');
            const message = createdMessage(header, params);

            this.wsInstance.send(message, header.msgId)
                .then((response) => {
                    Logger.log('改变客户端控件大小消息发送成功:', response);
                    resolve(response);
                })
                .catch((error) => {
                    Logger.error('改变客户端控件大小消息发送失败:', error);
                    reject(error);
                });
        });
    }

    startClient() {
        if (window.protocolCheck) {
            window.protocolCheck(
                'VideoClientApp://',
                () => {
                    console.log("打开失败");
                },
                () => {
                    console.log("打开成功");
                }
                )
        }
    }

    // 浏览器可见性变化时暂停或恢复视频
    static addVisibilityChangeListener() {
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
    }

    static removeVisibilityChangeListener() {
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }

    // 根据可见性来暂停或恢复视频
    static handleVisibilityChange() {
        if (document.hidden) {
            HzVideoClient.videoHide(false);
            Logger.log('浏览器窗口切换到后台');
        } else {
            HzVideoClient.videoShow();
            Logger.log('浏览器窗口恢复前台');
        }
    }

    // 销毁视频客户端
    static destroy() {
        if (this.wsInstance) {
            this.wsInstance.close();  // 关闭 WebSocket 连接
            Logger.log('WebSocket 连接已关闭');
        }
        this.isInit = false;
        this.isVideoShow = false;  // 重置视频显示状态
        this.isVideoInit = false;  // 重置视频初始化状态
    }
}
