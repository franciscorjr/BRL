import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/scss/app.scss', 'resources/js/app.js'],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls:{
                    base: null,
                    includeAbsolute: false
                }
            }
        }),
        
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm-bundler.js',
            '@': '/resources/js',
            'jquery': 'jquery/dist/jquery.js',
        },
    },
    define: {
        // Isso ajuda com bibliotecas que usam process.env
        'process.env': {},
    },
    // Adicione isto para tornar o jQuery disponível globalmente
    optimizeDeps: {
        include: ['jquery']
    },
});
