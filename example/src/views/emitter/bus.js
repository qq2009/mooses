import { Emitter } from '@mooses/emitter';

export const emitter = new Emitter();

// 全局错误处理
emitter.onError((err) => {
    console.log(`捕捉到错误: ${err.message}`);
});
