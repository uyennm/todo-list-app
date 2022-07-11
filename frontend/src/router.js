import Vue from 'vue'
import Router from 'vue-router'
import App from './components/App.vue'
import Login from './components/LogIn.vue'
import Signup from './components/SignUp.vue'

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: App
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/signup',
            component: Signup
        }
    ]
})