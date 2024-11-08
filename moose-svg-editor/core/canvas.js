import { SVG } from '@svgdotjs/svg.js';
import { Emitter } from '@mooses/emitter';
import { EVENT_TYPE } from './emitter-type';
import '@svgdotjs/svg.draggable.js';
import '@svgdotjs/svg.select.js';
import '@svgdotjs/svg.resize.js';

import BackgroundRenderer from './drawer/background-renderer';
import TextManager from './drawer/text-manager';

export class SVGCanvas {
    options = {
        w: 800,
        h: 600,
    };

    emitter = new Emitter();

    emitter_type = EVENT_TYPE;

    /**
     * @type {Svg}
     * */
    canvas = null;

    /**
     * @type {BackgroundRenderer}
     * */
    backgroundRenderer = null;

    /**
     * @type {TextManager}
     * */
    textManager = null;

    /**
     * SVGCanvas 类构造函数
     * @param { Object } options - 画布配置项
     */
    constructor(options = {}) {
        this.options = { ...this.options, ...options };
    }

    /**
     * 清空 SVG 画布内容
     */
    clearCanvas() {
        if (this.canvas) {
            // 清空画布中的所有元素
            this.canvas.clear();
            this.backgroundRenderer.draw();
            this.emitter.emit(EVENT_TYPE.ELEMENT_CLEARED);
        }
    }

    /**
     * 保存画布内容
     */
    saveCanvasText() {
        if (this.canvas) {
            return this.canvas.svg();
        }
    }

    /**
     * 初始化 SVG 画布
     * @param {HTMLElement} element - SVG 的容器元素
     */
    initSVG(element) {
        if (element) {
            this.canvas = SVG();
            const { w, h } = this.options;
            this.canvas.addTo(element).size(w, h);
            this.backgroundRenderer = new BackgroundRenderer(
                this.canvas,
                this.emitter,
            );
            this.textManager = new TextManager(this.canvas, this.emitter);
            this.emitter.emit(EVENT_TYPE.INIT_SVGCANVAS);

            this.setupDragAndDrop();
        } else {
            console.error('SVGCanvas 需要一个有效的 DOM 元素来初始化画布。');
        }
    }

    setupDragAndDrop() {
        const ctx = this;
        ctx.canvas.on('dragover', (event) => {
            event.preventDefault();
        });
        ctx.canvas.on('drop', (event) => {
            event.preventDefault();
            const { offsetX: x, offsetY: y } = event;
            const options = event.dataTransfer.getData('options');
            if (options) {
                ctx.emitter.emit(EVENT_TYPE.DRAG_DROP, { ctx, x, y, options });
            }
        });
    }
}
