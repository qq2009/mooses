import { SVG } from '@svgdotjs/svg.js';
import { Emitter } from '@mooses/emitter';
import { EVENT_TYPE } from './emitter-type';
import { DRAWER_TYPE } from './drawer/constant';
import '@svgdotjs/svg.draggable.js';
import '@svgdotjs/svg.select.js';
import '@svgdotjs/svg.resize.js';

import BackgroundRenderer from './drawer/background-renderer';
import TextManager from './drawer/text-manager';
import LineManager from './drawer/line-manager';
import RectManager from './drawer/rect-manager';

export class SVGCanvas {
    options = {
        w: 320,
        h: 512,
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
     * @type {LineManager}
     * */
    lineManager = null;

    /**
     * @type {RectManager}
     * */
    rectManager = null;

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
            this.lineManager = new LineManager(this.canvas, this.emitter);
            this.rectManager = new RectManager(this.canvas, this.emitter);
            this.emitter.emit(EVENT_TYPE.INIT_SVGCANVAS);

            this.setupDragAndDrop();
        } else {
            console.error('SVGCanvas 需要一个有效的 DOM 元素来初始化画布。');
        }
    }

    render(astString) {
        const ast = JSON.parse(astString);
        this.clearCanvas();
        setTimeout(() => this.processAST(ast), 300);
    }

    processAST(ast) {
        ast.forEach((node) => {
            this.handleNode(node);
            if (node.children && node.children.length > 0) {
                this.processAST(node.children);
            }
        });
    }

    /**
     * 处理单个节点
     * @param {Object} node - AST 的单个节点
     */
    handleNode(node) {
        const ctx = this;
        // TODO: 渲染逻辑临时用先写到这里
        switch (node.type) {
            case DRAWER_TYPE.BACKGROUND_PANEL: {
                const { fill, height, width } = node.attr;
                const handle = this.backgroundRenderer.draw({ id: node.id });
                handle.target.setWidth(width);
                handle.target.setHeight(height);
                handle.target.setFill(fill);
                ctx.emitter.emit(EVENT_TYPE.UPDATE_CANVAS_WRAPPER, {
                    width,
                    height,
                });
                break;
            }

            case DRAWER_TYPE.TEXT_PANEL: {
                const {
                    x,
                    y,
                    content,
                    fontSize,
                    fill,
                    fontFamily,
                    fontWeight,
                    fontStyle,
                } = node.attr;

                const handle = this.textManager.addText(x, y, content, {
                    size: fontSize,
                    color: fill,
                    family: fontFamily,
                    weight: fontWeight,
                    style: fontStyle,
                    id: node.id,
                });

                // TODO: 创建出来的位置不对 有偏差 这里重新设置一下
                handle.target.setX(x);
                handle.target.setY(y);
                break;
            }

            case DRAWER_TYPE.LINE_PANEL: {
                const { plot, color, strokeWidth, strokeDasharray, transform } =
                    node.attr;

                const [x1, y1, x2, y2] = plot;
                const handle = this.lineManager.addLine(x1, y1, x2, y2, {
                    width: strokeWidth,
                    color: color,
                    dasharray: strokeDasharray,
                    id: node.id,
                });
                transform && handle.target.setTransform(transform);
                break;
            }

            case DRAWER_TYPE.RECT_PANEL: {
                const {
                    fill,
                    width,
                    height,
                    color,
                    strokeWidth,
                    strokeDasharray,
                    x,
                    y,
                    transform,
                } = node.attr;
                const handle = this.rectManager.addRect(x, y, width, height, {
                    fill: fill,
                    color: color,
                    width: strokeWidth,
                    dasharray: strokeDasharray,
                    id: node.id,
                });
                transform && handle.target.setTransform(transform);
                break;
            }

            default: {
                console.warn(`未知类型的节点: ${node.type}`);
                break;
            }
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
