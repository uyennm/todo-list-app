import authApi from './../../api/authApi';
import localStorageService from './../../services/localStorage';

const state = {
    user: {
        username: null,
        token: null,
    }
}

const getters = {
    isAuthenticated: (state) => state.user.token !== null,
    username: (state) => state.user.username,
}

const actions = {
    getUser({ commit }) {
        const user = localStorageService.getUser();
        commit('setUser', user);
    },

    async login({ commit }, user) {
        const { currUser, success, errorMessage } = await authApi.login(user);
        if (success) {
            commit('loginSuccess', currUser);
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
        const { currUser, success, errorMessage } = await authApi.signup(user);
        if (success) {
            commit('signupSuccess', currUser);
        }
        else {
            commit('signupFailure');
        }
        return { success, errorMessage } 
    },
}

const mutations = {
    setUser (state, user) {
        if (user) {
            state.user.username = user.username;
            state.user.token = user.token;
        }
    },

    loginSuccess(state, currUser) {
        state.user = currUser;
    },

    loginFailure(state) {
        state.user.username = null;
        state.user.token = null;
    },

    logout(state) {
        state.user.username = null;
        state.user.token = null;
    },

    signupSuccess(state, currUser) {
        state.user = currUser;
    },

    signupFailure(state) {
        state.user.username = null;
        state.user.token = null;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}