const state = () => ({
    user: null // name, token
})

const getters = {
    isAuthenticated: (state) => state.user !== null,
}

const actions = {
    signUp() {

    },

    logIn() {

    },

}

const mutations = {
    
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}