<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const list = ref([
    {
        name: '拖拽',
        docs: '拖拽，支持边界限制、吸附、栅格对齐、速度控制及拖拽回调',
        path: '/drag',
    },
    {
        name: '事件管理器',
        docs: '支持事件监听、触发、一次性监听、优先级、错误处理和事件日志功能',
        path: '/emitter',
    },
    {
        name: 'dynamic',
        docs: '',
        path: '/dynamic',
    },
    {
        name: '表单设计',
        docs: '表单设计器',
        path: '/form',
    },
    {
        name: 'svg-editor',
        docs: 'svg 编辑器',
        path: '/svg-editor',
    },
]);

function handle(path) {
    router.push({ path });
}
</script>

<template>
    <nav class="navbar bg-body-tertiary">
        <div class="container">
            <a class="navbar-brand" href="#">Navbar</a>
            <h1 class="navbar-title">Mooses</h1>
        </div>
    </nav>

    <main>
        <section class="py-5 text-center container">
            <div class="row py-lg-5">
                <div class="col-lg-6 col-md-8 mx-auto">
                    <h1 class="fw-light">Album example</h1>
                    <p class="lead text-body-secondary">
                        Something short and leading about the collection
                        below—its contents, the creator, etc. Make it short and
                        sweet, but not too short so folks don’t simply skip over
                        it entirely.
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
                                <svg
                                    class="bd-placeholder-img card-img-top"
                                    width="100%"
                                    height="225"
                                    xmlns="http://www.w3.org/2000/svg"
                                    role="img"
                                    aria-label="Placeholder: Thumbnail"
                                    preserveAspectRatio="xMidYMid slice"
                                    focusable="false"
                                >
                                    <title>Placeholder</title>

                                    <rect
                                        width="100%"
                                        height="100%"
                                        fill="#55595c"
                                    ></rect>

                                    <text
                                        x="50%"
                                        y="50%"
                                        fill="#eceeef"
                                        dy=".3em"
                                    >
                                        Thumbnail
                                    </text>
                                </svg>
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

    <footer class="text-body-secondary py-5">
        <div class="container">
            <p class="mb-1">
                Album example is © Bootstrap, but please download and customize
                it for yourself!
            </p>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
.navbar {
    padding: 0.75rem 0;
    box-shadow:
        0 0.5rem 1rem rgba(0, 0, 0, 0.15),
        inset 0 -1px 0 rgba(255, 255, 255, 0.15);
    background-image: linear-gradient(rgba(#712cf9, 1), rgba(#712cf9, 0.95));

    .navbar-title {
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
