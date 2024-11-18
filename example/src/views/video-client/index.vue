<script setup>
import { onMounted, ref, onUnmounted } from 'vue';

/**
 * @type {Ref<HTMLDivElement>}
 * */
const rangeRef = ref(null);

window.HzVideoClient.enableLogging();


function init() {
    window.HzVideoClient.videoInit();
}

function show() {
    window.HzVideoClient.videoShow();
}

function hide() {
    window.HzVideoClient.videoHide();
}

function resize() {
    window.HzVideoClient.videoResize();
}

onMounted(async () => {
    try {
        await window.HzVideoClient.connect();
        await window.HzVideoClient.videoInit();
        await window.HzVideoClient.videoBuildEl(rangeRef.value);
        await window.HzVideoClient.videoResize();
        await window.HzVideoClient.videoShow();
    } catch (error) {

    }
});

onUnmounted(async () => {
    try {
        await window.HzVideoClient.videoHide();
        await window.HzVideoClient.videoBuildEl(null);
    } catch (error) {}
})
</script>

<template>
    <div class="video-client">
        <div class="range" ref="rangeRef"></div>

        <ElButton @click="init">初始化</ElButton>
        <ElButton @click="show">显示</ElButton>
        <ElButton @click="hide">隐藏</ElButton>
        <ElButton @click="resize">改变大小位置</ElButton>
    </div>
</template>

<style scoped lang="scss">
.video-client {
    height: 100vh;

    .range {
        width: 40%;
        height: 300px;
        background-color: #72767b;
    }
}
</style>
