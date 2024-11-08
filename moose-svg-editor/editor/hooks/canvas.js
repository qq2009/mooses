import { provide, inject } from 'vue';

const CANVAS_PROVIDE_KEY = Symbol('CANVAS_PROVIDE_KEY');

export const setCanvas = (canvas) => {
    provide(CANVAS_PROVIDE_KEY, canvas);
};

/**
 * @return { SVGCanvas }
 * */
export const useCanvas = () => {
    return inject(CANVAS_PROVIDE_KEY);
};
