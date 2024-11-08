import { ref } from 'vue';
import { emitter, EVENT_TYPE } from '../../core/emitter.js';
export const layers = ref([]);

export const addLayer = (id, label, el) => {
    const newLayer = {
        id,
        label,
        elements: el,
        children: [],
    };
    layers.value.push(newLayer);
};

export const removeLayer = (target) => {
    const index = layers.value.findIndex((node) => node.id === target.id);
    if (![undefined].includes(index)) {
        target.elements.remove();
        layers.value.splice(index, 1);
    }
};

emitter.on(EVENT_TYPE.ELEMENT_CREATED, ({ id, label, el }) =>
    addLayer(id, label, el),
);
