// Importar jQuery e torná-lo global
import './jquery-setup';


import './template/vendor.min.js'
// Vamos criar uma função de inicialização que será chamada após o DOM estar pronto
window.initTemplateScripts = function() {
    // Importar o app.min.js diretamente pode ser problemático se ele executa código na importação
    // Em vez disso, podemos tentar inicializar manualmente as funções necessárias
    if (window.ColorAdmin && typeof window.ColorAdmin.init === 'function') {
        window.ColorAdmin.init();
    }
};
//import './template/app.min.js'

import './bootstrap';
import '../scss/app.scss';

import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { createPinia } from 'pinia';

// Importar Bootstrap JS
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
    return pages[`./Pages/${name}.vue`]
  },
  setup({ el, App, props, plugin }) {
    const app = createApp({ render: () => h(App, props) });
    const pinia = createPinia();
    
    app.use(plugin); // Plugin Inertia
    app.use(pinia); // Plugin Pinia
    
    app.mount(el);
    setTimeout(() => {
        window.initTemplateScripts();
  }, 100);
  },
})
