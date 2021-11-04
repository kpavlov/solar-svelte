import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import {glslify} from 'rollup-plugin-glslify';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        glslify(),
        svelte()
    ]
})
