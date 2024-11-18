export class Logger {
    // 控制日志是否启用
    static isLoggingEnabled = false;

    // 打印日志
    static log(message) {
        if (Logger.isLoggingEnabled) {
            console.log('%c' + message, 'color: green; font-weight: bold;');
            // 打印堆栈追踪
            // console.trace('调用来源');
        }
    }

    // 打印错误日志
    static error(message) {
        if (Logger.isLoggingEnabled) {
            console.error('%c' + message, 'color: red; font-weight: bold;');
            // 打印堆栈追踪
            // console.trace('调用来源');
        }
    }

    // 启用日志
    static enableLogging() {
        Logger.isLoggingEnabled = true;
    }

    // 禁用日志
    static disableLogging() {
        Logger.isLoggingEnabled = false;
    }
}