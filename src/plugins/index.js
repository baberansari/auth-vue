import pinia from '../stores';
import router from '../routes';
import { abilitiesPlugin } from '@casl/vue';
import { ability } from '@/plugins/ability'; // the global ability instance


import 'primeicons/primeicons.css';

import '@fortawesome/fontawesome-free/css/all.css';
import 'boxicons/css/boxicons.min.css';
import '../assets/admin/css/login.css';
import '../assets/css/chat.css';
import '../assets/admin/css/style.css';
import '../assets/admin/css/welcomeAdmin.css';
import '../assets/admin/css/dashboard_2.css';
import '../assets/admin/css/dashboard_1.css';
import '../assets/admin/css/dashboard_1.css';

// import '../assets/admin/js/script.js';
import Tooltip from 'primevue/tooltip';

export function registerPlugins(app) {
   
    app.use(pinia);
    app.use(router);
    app.use(abilitiesPlugin, ability, {
        useGlobalProperties: true
    });
   
}

const directives = {
    tooltip: Tooltip
};

const components = {
 
};
const plugins = [pinia, router,  [
    abilitiesPlugin,
    ability,
    {
        useGlobalProperties: true
    }
]];

export { directives, components, plugins };
