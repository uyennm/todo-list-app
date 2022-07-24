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
        const { response, success, errorMessage } = await authApi.login(user);
        if (success) {
            const currUser = {
                username: response.data.user.username,
                token: response.data.token,
            }

            if (response.data.token) {
                localStorageService.setUser(currUser);
            }

            commit('loginSuccess', currUser);
        }
        return { success, errorMessage } 
    },

    logout({ commit }) {
        localStorageService.removeTodos();
        localStorageService.removeUser();
        commit('logout');
    },

    async signup({ commit }, user) {
        const { response, success, errorMessage } = await authApi.signup(user);
        if (success) {
            const currUser = {
                username: response.data.user.username,
                token: response.data.token,
            }
    
            if (response.data.token) {
                localStorageService.setUser(currUser);
            }

            commit('signupSuccess', currUser);
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

    logout(state) {
        state.user.username = null;
        state.user.token = null;
    },

    signupSuccess(state, currUser) {
        state.user = currUser;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}