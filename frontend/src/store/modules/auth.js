import authApi from './../../api/authApi';

const user = JSON.parse(localStorage.getItem('user'));
const token = JSON.parse(localStorage.getItem('token'));

const state = {
    status: user ? { loggedIn: true } : { loggedIn: false },
    user: user ? user : null,
    token: token ? token : null
}

const getters = {
    isAuthenticated: (state) => state.user !== null,
}

const actions = {
    async login({ commit }, user) {
        const { response, success, errorMessage } = await authApi.login(user);
        if (success) {
            commit('loginSuccess', response.data);
        }
        else {
            commit('loginFailure');
        }
        return { success, errorMessage } 
    },

    logout({ commit }) {
        authApi.logout();
        commit('logout');
    },

    async signup({ commit }, user) {
        const { response, success, errorMessage } = await authApi.signup(user);
        if (success) {
            commit('signupSuccess', response.data);
        }
        else {
            commit('signupFailure');
        }
        return { success, errorMessage } 
    },
}

const mutations = {
    loginSuccess(state, data) {
        state.status.loggedIn = true;
        state.user = data.user;
        state.token = data.token;
    },

    loginFailure(state) {
        state.status.loggedIn = false;
        state.user = null;
        state.token = null;
    },

    logout(state) {
        state.status.loggedIn = false;
        state.user = null;
        state.token = null;
    },

    signupSuccess(state, data) {
        state.status.loggedIn = true;
        state.user = data.ser;
        state.token = data.token;
    },

    signupFailure(state) {
        state.status.loggedIn = false;
        state.user = null;
        state.token = null;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}