import { EventEmitter } from './event-emitter';
import { Logger } from './logger';

export class Ws {
    ws = null;
    reconnectTimer = null;
    eventEmitter = new EventEmitter();

    // 存储消息 ID 和 Promise 的映射
    pendingPromises = new Map();

    constructor(url) {
        this.url = url;
        this.ws = new WebSocket(url);
        this.handleEvents();
    }

    handleEvents() {
        this.ws.onopen = () => {
            Logger.log('WebSocket 连接成功');
            this.eventEmitter.emit('open');
        };

        this.ws.onclose = () => {
            Logger.log('WebSocket 连接关闭');
            this.eventEmitter.emit('close');
            // 连接关闭，5秒后尝试重新连接
            this.reconnect();
        };

        this.ws.onerror = (error) => {
            Logger.error('WebSocket 错误:', error);
            this.eventEmitter.emit('error', error);
        };

        this.ws.onmessage = (event) => {
            Logger.log(`收到消息: ${event.data}`);
            try {
                const message = JSON.parse(event.data);
                const header = JSON.parse(message.header);
                const body = JSON.parse(message.body);

                if (this.pendingPromises.has(header.msgId)) {
                    const { resolve } = this.pendingPromises.get(header.msgId);
                    resolve(body);
                    this.pendingPromises.delete(header.msgId);
                } else {
                    Logger.warn(`收到无效的响应消息，未找到对应的 messageId: ${header.msgId}`);
                }
            } catch (error) {
                Logger.error('消息解析失败:', error);
            }
        };
    }

    connect() {
        return new Promise((resolve, reject) => {
            if (this.ws.readyState === WebSocket.OPEN) {
                resolve(); // 如果已经连接，直接返回
                return;
            }

            this.ws.onopen = () => {
                Logger.log('WebSocket 连接成功');
                resolve();
            };

            this.ws.onerror = (error) => {
                Logger.error('WebSocket 错误:', error);
                reject(error);
            };
        });
    }

    send(data,messageId) {
        return new Promise((resolve, reject) => {
            if (this.ws.readyState === WebSocket.OPEN) {

                if (typeof data === 'object') {
                    data = JSON.stringify(data);
                }

                this.pendingPromises.set(messageId, { resolve, reject });
                this.ws.send(data);

                Logger.log(`发送数据: ${data}`);
            } else {
                Logger.error('WebSocket 未打开，无法发送数据');
                reject(new Error('WebSocket 未打开，无法发送数据'));
            }
        });
    }

    reconnect() {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
        }

        this.reconnectTimer = setTimeout(() => {
            Logger.log('尝试重新连接 WebSocket...');
            this.ws = new WebSocket(this.url);
            this.handleEvents();
        }, 5000);
    }

    close() {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.close();
            Logger.log('WebSocket 连接已关闭');
        } else {
            Logger.error('WebSocket 未打开，无法关闭连接');
        }
    }

    on(event, listener) {
        // 订阅事件
        this.eventEmitter.on(event, listener);
    }

    off(event, listener) {
        // 取消订阅事件
        this.eventEmitter.off(event, listener);
    }
}
