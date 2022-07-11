import authApi from './../../api/authApi';

const user = JSON.parse(localStorage.getItem('user'));
const state = user 
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

const getters = {
    isAuthenticated: (state) => state.user !== null,
}

const actions = {
    login({ commit }, user) {
        return authApi.login(user).then(
            user => {
                commit('loginSuccess', user);
                return Promise.resolve(user);
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
            user => {
                commit('signupSuccess', user);
                return Promise.resolve(user);
            },
            error => {
                commit('signupFailure');
                return Promise.reject(error);
            }
        );
    },
}

const mutations = {
    loginSuccess(state, user) {
        state.status.loggedIn = true;
        state.user = user;
    },

    loginFailure(state) {
        state.status.loggedIn = false;
        state.user = null;
    },

    logout(state) {
        state.status.loggedIn = false;
        state.user = null;
    },

    signupSuccess(state, user) {
        state.status.loggedIn = true;
        state.user = user;
    },

    signupFailure(state) {
        state.status.loggedIn = false;
        state.user = null;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}