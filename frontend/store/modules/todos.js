import todos from '../../api/todoList'

const state = () => ({
    allTodo: []
})

const getters = {}

const actions = {
    async getAllTodos ({ commit }) {
        const todos = await todos.getTodos()
        commit('setTodos', todos)
    }
}

const mutations = {
    setTodos (state, todos) {
        state.allTodo = todos
    }
}

export default {
    namespace: true,
    state,
    getters,
    actions,
    mutations
}