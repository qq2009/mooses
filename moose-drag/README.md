# enableDrag 函数使用文档

## 概述

enableDrag 是一个为标签元素添加拖拽功能的函数。
该函数允许开发者为网页中的元素启用可拖拽的交互效果，
同时提供了灵活的自定义选项，例如拖拽方向的限制、边界吸附、栅格对齐等功能。

## 函数签名

```javascript
enableDrag(element: HTMLElement, container: HTMLElement, options?: Object): Function
```

## 参数说明

| 参数      |    类型     | 必填 |                     描述                     |
| --------- | :---------: | :--: | :------------------------------------------: |
| element   | HTMLElement |  是  |           启用拖拽功能的 DOM 元素            |
| container | HTMLElement |  是  |              markdown编译为html              |
| options   |   Object    |  否  | 可选配置对象，用于自定义拖拽行为（详见下表） |

## 配置选项

options 对象可以包含以下属性：

| 属性           |   类型   |  默认值  |                                      描述                                      |
| -------------- | :------: | :------: | :----------------------------------------------------------------------------: |
| boundaryLimit  | boolean  |  false   |                        是否限制元素只能在容器内部拖动。                        |
| direction      |  string  |  'both'  | 限制拖拽方向，可选值：'horizontal'（水平）、'vertical'（垂直）、'both'（两者） |
| maxSpeed       |  number  |    40    |               限制拖拽速度（单位：像素），用于避免拖拽时移动过快               |
| snapToBoundary | boolean  |  false   |             是否启用边界吸附功能，元素靠近容器边界时自动对齐到边缘             |
| snapThreshold  |  number  |    20    |                     吸附到容器边缘的距离阈值（单位：像素）                     |
| enableGridSnap | boolean  |  false   |                  是否启用栅格对齐，拖拽时元素会对齐到栅格网格                  |
| gridSize       |  number  |    10    |          栅格对齐的网格尺寸（单位：像素），启用 enableGridSnap 时有效          |
| onStart        | function | () => {} |                              拖拽开始时的回调函数                              |
| onMove         | function | () => {} |        拖拽移动时的回调函数，传递当前拖拽位置 { top, left } 和事件对象         |
| onEnd          | function | () => {} |                              拖拽结束时的回调函数                              |

## 示例

### 示例1：启用基础拖拽

```javascript
enableDrag(element, container);
```

### 示例2：限制拖拽方向并启用边界限制

```javascript
enableDrag(element, container, {
    // 限制在容器内拖动
    boundaryLimit: true,
    // 只允许水平拖动
    direction: 'horizontal',
});
```

### 示例3：启用边界吸附和栅格对齐

```javascript
enableDrag(element, container, {
    // 启用边界吸附
    snapToBoundary: true,
    // 吸附距离阈值为 15 像素
    snapThreshold: 15,
    // 启用栅格对齐
    enableGridSnap: true,
    // 栅格大小为 20 像素
    gridSize: 20,
});
```

### 示例4：使用回调函数

```javascript
enableDrag(element, container, {
    onStart: () => {
        console.log('开始拖拽');
    },
    onMove: (position) => {
        console.log('当前位置:', position);
    },
    onEnd: () => {
        console.log('结束拖拽');
    },
});
```
