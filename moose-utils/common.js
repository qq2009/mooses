/**
 * 暂停函数
 * @param { number } ms - 暂停时间(毫秒)
 * @returns Promise
 * */
export const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export const loadPageVar = (Url, sVar) => {
    return decodeURI(
        Url.replace(
            new RegExp(
                '^(?:.*[&\\?]' +
                    encodeURI(sVar).replace(/[.+*]/g, '\\$&') +
                    '(?:\\=([^&]*))?)?.*$',
                'i',
            ),
            '$1',
        ),
    );
};

/**
 * 浮点值相加
 * */
function add(a1, a2, a3 = 100) {
    const b1 = Math.round(a1 * a3);
    const b2 = Math.round(a2 * a3);
    return (b1 + b2) / a3;
}
