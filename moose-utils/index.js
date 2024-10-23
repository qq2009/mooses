/**
 * 暂停函数
 * @param { number } ms - 暂停时间(毫秒)
 * @returns Promise
 * */
export const wait = (ms) => new Promise((r) => setTimeout(r, ms));
