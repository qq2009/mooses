import {defineConfig} from 'vite'
import path from 'node:path';
import vue from '@vitejs/plugin-vue'

const resolve = (dir) => path.join(__dirname, dir);

const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;

// https://vitejs.dev/config/
export default defineConfig({
    base: '/mooses/',
    resolve: {
        alias: {
            '@': resolve('src'),
        },
    },
    plugins: [vue()],
    server: {
        port: 8000
    },
    build: {
        rollupOptions: {
            output: {
                // https://github.com/rollup/rollup/blob/master/src/utils/sanitizeFileName.ts
                sanitizeFileName(name) {
                    const match = DRIVE_LETTER_REGEX.exec(name);
                    const driveLetter = match ? match[0] : '';
                    // substr 是被淘汰語法，因此要改 slice
                    return (
                        driveLetter +
                        name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "")
                    );
                },
            },
        },
    },
})
