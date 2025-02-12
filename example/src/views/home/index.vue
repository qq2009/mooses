<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const list = ref([
    {
        name: '常用模版',
        docs: '常用模版',
        path: '/template',
        bg: '/mooses/images/dragging.png',
    },
    {
        name: '拖拽',
        docs: '拖拽，支持边界限制、吸附、栅格对齐、速度控制及拖拽回调',
        path: '/drag',
        bg: '/mooses/images/dragging.png',
    },
    {
        name: '事件管理器',
        docs: '支持事件监听、触发、一次性监听、优先级、错误处理和事件日志功能',
        path: '/emitter',
        bg: '/mooses/images/dragging.png',
    },
    {
        name: 'dynamic',
        docs: '动态组件',
        path: '/dynamic',
        bg: '/mooses/images/dragging.png',
    },
    {
        name: '表单设计',
        docs: '表单设计器',
        path: '/form',
        bg: '/mooses/images/dragging.png',
    },
    {
        name: 'svg-editor',
        docs: 'svg 编辑器',
        path: '/svg-editor',
        bg: '/mooses/images/dragging.png',
    },
    {
        name: 'video-client',
        docs: '视频客户端',
        path: '/video-client',
        bg: '/mooses/images/dragging.png',
    },
    {
        name: 'cond-table',
        docs: '条件表格',
        path: '/cond-table',
        bg: '/mooses/images/dragging.png',
    },
]);

function handle(path) {
    router.push({ path });
}
</script>

<template>
    <nav class="navbar bg-body-tertiary">
        <div class="container">
            <!--            <a class="navbar-brand" href="#">Navbar</a>-->
            <h1 class="navbar-title">Mooses</h1>
        </div>
    </nav>

    <main>
        <section class="py-5 text-center container">
            <div class="row py-lg-5">
                <div class="col-lg-6 col-md-8 mx-auto">
                    <p class="lead text-body-secondary">
                        Standing on the shoulders of giants.
                    </p>
                </div>
            </div>
        </section>

        <div class="album py-5 bg-body-tertiary">
            <div class="container">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <template v-for="item of list">
                        <div class="col" @click="handle(item.path)">
                            <div class="card shadow-sm">
                                <img
                                    :src="item.bg"
                                    alt="背景"
                                    style="width: 100%; height: 225px"
                                />
                                <div class="card-body">
                                    <p class="card-text">
                                        {{ item.docs }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </main>

    <!--    <footer class="text-body-secondary py-5">-->
    <!--        <div class="container">-->
    <!--            <p class="mb-1">-->
    <!--                Album example is © Bootstrap, but please download and customize-->
    <!--                it for yourself!-->
    <!--            </p>-->
    <!--        </div>-->
    <!--    </footer>-->
</template>

<style lang="scss" scoped>
.navbar {
    padding: 0.75rem 0;
    box-shadow:
        0 0.5rem 1rem rgba(0, 0, 0, 0.15),
        inset 0 -1px 0 rgba(255, 255, 255, 0.15);
    background-image: linear-gradient(rgba(#712cf9, 1), rgba(#712cf9, 0.95));

    .navbar-title {
        font-size: 22px;
        font-weight: 600;
        color: #fff;
    }

    .container {
        height: 40px;
        display: flex;
        align-items: center;
    }
}
</style>
