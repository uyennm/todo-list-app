import Vue from 'vue'
import App from './components/App.vue'
import store from './store'
import '../src/stylesheets/tailwind.css'
import { router } from './router'

new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');