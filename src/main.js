import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueUniversalModal from 'vue-universal-modal'
import 'vue-universal-modal/dist/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas)

createApp(App)
    .use(router)
    .use(VueUniversalModal, {
        teleportTarget: '#modals'
    })
    .component("font-icon", FontAwesomeIcon)
    .mount('#app');

    
