import Vue from 'vue'
import App from './components/App.vue'
import store from './store'

new Vue({
    el: '#app',
    created: function () {
      window.Vue = this
    },
    // router,
    store,
    render: h => h(App)
  })