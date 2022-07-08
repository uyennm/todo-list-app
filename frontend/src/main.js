import Vue from 'vue'
import App from './components/App.vue'
import store from './store'
import '../src/stylesheets/tailwind.css'

new Vue({
    el: '#app',
    created: function () {
      window.Vue = this
    }, 
    // router,
    store,
    render: h => h(App)
  })