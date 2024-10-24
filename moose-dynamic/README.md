# useDynamic 函数使用文档

## 概述

useDynamic 是一个 Vue 3 的自定义 Hook，帮助你在应用中动态加载和卸载组件，
并支持使用 Teleport 将组件渲染到特定的 DOM 位置。
该函数可以简化复杂的场景，如弹窗、动态表单等，提供灵活的组件生命周期管理。

## 功能概述

-   动态加载组件：按需创建和加载 Vue 组件
-   支持 Teleport：将组件渲染到指定的目标位置（如 document.body）
-   属性和插槽传递：支持初始属性、动态属性更新，以及插槽内容
-   自动卸载：提供组件卸载机制，确保内存和 DOM 清理

## 函数签名

```javascript
useDynamic(
    component: Object,                  // 要动态加载的 Vue 组件
    initialProps?: Object,              // 组件的初始属性 (可选)
    options?: Object                    // 配置选项 (可选)
): Object
```

## 参数说明

| 参数         |  类型  | 必填 | 必填 |         描述         |
| ------------ | :----: | :--: | :--: | :------------------: |
| component    | Object |  是  |  -   |  Vue 组件，必须传入  |
| initialProps | Object |  否  |  {}  |  组件的初始属性对象  |
| options      | Object |  否  |  {}  | 配置选项对象，见下表 |

## options 对象参数

| 参数           |    类型     | 必填 |     必填      |                            描述                             |
| -------------- | :---------: | :--: | :-----------: | :---------------------------------------------------------: |
| isTeleporting  |   Boolean   |  否  |     false     |                 是否使用 Teleport 渲染组件                  |
| teleportTarget | HTMLElement |  否  | document.body |         Teleport 目标元素，表示组件将被插入到该目标         |
| onMount        |  Function   |  否  |     null      | 组件挂载完成后执行的回调函数，接收已渲染的 DOM 元素作为参数 |
