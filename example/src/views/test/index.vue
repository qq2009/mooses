<script setup>
import { shallowRef, toRef } from 'vue';

const props = defineProps({
    name: {
        type: String,
        default: '',
    },
});

const a = shallowRef({
    count: 1,
});

const name = toRef(() => props.name);

const handle = () => {
    a.value = { count: 222 };
}
</script>

<template>
    <div class="test">{{ a.count }} <button @click="handle">调整</button></div>
</template>

<style scoped></style>
