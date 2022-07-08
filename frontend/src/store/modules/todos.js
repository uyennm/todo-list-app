import todoListApi from '../../api/todoList'

const state = () => ({
    allTodos: [],
    newTodo: null,
})

const getters = {
    newTodo(state) {
        return state.newTodo
    },
    todos(state) {
        return state.allTodos.filter(todo => !todo.isDone)
    },
    doneTodos(state) {
        return state.allTodos.filter(todo => todo.isDone)
    }
}

const actions = {
    async getAllTodos ({ commit }) {
        const todos = await todoListApi.getTodos()
        commit('setTodos', todos)
    },
    async addTodo({ commit }, todo) {
        await todoListApi.addTodo(todo)
        commit('addTodo', todo)
    }
}

const mutations = {
    setTodos (state, todos) {
        state.allTodos = todos
    },
    getTodo(state, todo) {
        state.newTodo = todo
    },
    addTodo(state, todo){
        state.allTodos.push({
            title: todo.title,
            description: todo.description,
            isDone: false,
        })
    },

    clearNewTodo(state) {
        state.newTodo = null
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}