export const WILDCARD = '*';

export class Emitter {
    constructor() {
        this._events = {};
        this._maxListeners = Infinity;
        this._paused = false;
        this._loggingEnabled = false;
        this._errorHandler = null;
    }

    /**
     * 设置最大监听器数量
     */
    setMaxListeners(limit) {
        this._maxListeners = limit;
    }

    /**
     * 启用日志记录
     */
    enableLogging() {
        this._loggingEnabled = true;
    }

    /**
     * 禁用日志记录
     */
    disableLogging() {
        this._loggingEnabled = false;
    }

    /**
     * 监听事件
     * @param { string } evts - 事件名
     * @param {(function(): void)|*} callback - 回调函数
     * @param { boolean } [once=false] - 是否只监听一次
     * @param { number } [priority=0] - 优先级
     * @param { number } [times=Infinity] - 限制触发次数
     */
    on(evts, callback, { once = false, priority = 0, times = Infinity } = {}) {
        evts.split(',').forEach((evKey) => {
            evKey = evKey.trim();
            if (!this._events[evKey]) {
                this._events[evKey] = [];
            }
            if (this._events[evKey].length >= this._maxListeners) {
                console.warn(`Max listeners exceeded for event: ${evKey}`);
            }
            this._events[evKey].push({ callback, once, priority, times });
            this._events[evKey].sort((a, b) => b.priority - a.priority); // 根据优先级排序
        });
        return this;
    }

    /**
     * 监听事件一次
     */
    once(evts, callback) {
        return this.on(evts, callback, { once: true });
    }

    /**
     * 触发事件
     */
    async emit(evts, ...eventArgs) {
        if (this._paused) return;
        evts.split(',').forEach((evt) => {
            const events = this._events[evt] || [];
            const wildcardEvents = this._events[WILDCARD] || [];

            const doEmit = async (es) => {
                let length = es.length;
                for (let i = 0; i < length; i++) {
                    if (!es[i]) continue;

                    const { callback, once, times } = es[i];
                    try {
                        await Promise.resolve(callback.apply(this, eventArgs));
                    } catch (error) {
                        if (this._errorHandler) this._errorHandler(error);
                    }

                    es[i].times--;
                    if (once || es[i].times <= 0) {
                        es.splice(i, 1);
                        length--;
                        i--;
                    }
                }
            };

            doEmit(events);
            doEmit(wildcardEvents);

            if (this._loggingEnabled) {
                console.log(`Event emitted: ${evt}`, eventArgs);
            }
        });
    }

    /**
     * 获取监听器列表
     */
    listeners(eventName) {
        return this._events[eventName] || [];
    }

    /**
     * 获取所有事件
     */
    getEvents() {
        return this._events;
    }

    /**
     * 取消监听事件
     */
    off(evts, callback) {
        if (!evts) {
            this._events = {};
            return this;
        }

        evts.split(',').forEach((evt) => {
            if (!callback) {
                delete this._events[evt];
            } else {
                const events = this._events[evt] || [];
                let length = events.length;
                for (let i = 0; i < length; i++) {
                    if (events[i].callback === callback) {
                        events.splice(i, 1);
                        length--;
                        i--;
                    }
                }
                if (events.length === 0) delete this._events[evt];
            }
        });
        return this;
    }

    /**
     * 暂停事件触发
     */
    pause() {
        this._paused = true;
    }

    /**
     * 恢复事件触发
     */
    resume() {
        this._paused = false;
    }

    /**
     * 设置全局错误处理器
     */
    onError(callback) {
        this._errorHandler = callback;
    }
}
