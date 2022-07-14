import Vue from 'vue'
import App from './components/App.vue'
import store from './store'
import '../src/stylesheets/tailwind.css'
import { router } from './router'
import Notifications from 'vue-notification';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck, faTrash, faPencil, faPlus, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

library.add(faCheck, faTrash, faPencil, faPlus, faFloppyDisk)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Notifications)

new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');