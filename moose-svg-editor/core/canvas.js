import { SVG } from '@svgdotjs/svg.js';
import '@svgdotjs/svg.draggable.js';
import '@svgdotjs/svg.select.js';
import '@svgdotjs/svg.resize.js';

export class SVGCanvas {
    /**
     * @type {SVGCanvas}
     * */
    static instance = null;

    /**
     * @type {Svg}
     * */
    draw = null;

    /**
     * SVGCanvas 类构造函数
     * @param {HTMLElement} element - SVG 的容器元素
     */
    constructor(element) {
        // 如果已经存在实例，则返回该实例，避免重复创建
        if (SVGCanvas.instance) {
            return SVGCanvas.instance;
        }

        if (element) {
            this.initSVG(element);
            SVGCanvas.instance = this;
        } else {
            console.error('SVGCanvas 需要一个有效的 DOM 元素来初始化画布。');
        }
    }

    /**
     * 清空 SVG 画布内容
     */
    clearCanvas() {
        if (this.draw) {
            // 清空画布中的所有元素
            this.draw.clear();
        }
    }

    /**
     * 初始化 SVG 画布
     * @param {HTMLElement} element - SVG 的容器元素
     */
    initSVG(element) {
        // 初始化 SVG 画布并设置视图框大小
        this.draw = SVG().addTo(element).size(800, 600);
    }

    /**
     * 静态方法，获取 SVGCanvas 实例
     * @param {HTMLElement?} element - SVG 的容器元素
     * @returns {SVGCanvas} SVGCanvas 的单例实例
     */
    static getInstance(element) {
        // 如果实例不存在且提供了元素，则创建新的实例
        if (!SVGCanvas.instance && element) {
            SVGCanvas.instance = new SVGCanvas(element);
        }
        return SVGCanvas.instance;
    }
}
