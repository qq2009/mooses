import {defineConfig} from 'vite'
import path from 'node:path';
import vue from '@vitejs/plugin-vue'

const resolve = (dir) => path.join(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
    base: '/mooses/',
    resolve: {
        alias: {
            '@': resolve('src'),
        },
    },
    plugins: [vue()],
})
