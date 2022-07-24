import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Login from './components/LogIn.vue'
import Signup from './components/SignUp.vue'
import store from './store/index'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (from.name === null) {
        store.dispatch('auth/getUser');
        store.dispatch('todos/getNextAvailableId', store.getters['auth/isAuthenticated']);
    }
    if ((to.name === 'login' || to.name === 'signup') && store.getters['auth/isAuthenticated']) {
      next({ name: 'home' });
    }
    else next()
});

export default router;