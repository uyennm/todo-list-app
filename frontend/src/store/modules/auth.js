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
    login({ commit }, user) {
        return authApi.login(user).then(
            response => {
                commit('loginSuccess', response.data);
                return Promise.resolve(response);
            },
            error => {
                commit('loginFailure');
                return Promise.reject(error);
            }
        );
    },

    logout({ commit }) {
        authApi.logout();
        commit('logout');
    },

    signup({ commit }, user) {
        return authApi.signup(user).then(
            response => {
                commit('signupSuccess', response.data);
                return Promise.resolve(response);
            },
            error => {
                commit('signupFailure');
                return Promise.reject(error);
            }
        );
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