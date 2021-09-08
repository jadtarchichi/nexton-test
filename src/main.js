import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueUniversalModal from 'vue-universal-modal'
import 'vue-universal-modal/dist/index.css'

createApp(App)
    .use(VueAxios, axios)
    .use(router)
    .use(VueUniversalModal, {
        teleportTarget: '#modals'
    })
    .mount('#app');

    
