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
        var todos = JSON.parse(localStorage.getItem('todos'))
        console.log(todos)
        if (!todos) {
            todos = await todoListApi.getTodos()
            localStorage.setItem('todos', JSON.stringify(todos))
        }
        commit('setTodos', todos)
    },

    addTodo({ commit, state }, todo) {
        // await todoListApi.addTodo(todo)
        commit('addTodo', todo)
        localStorage.setItem('todos', JSON.stringify(state.allTodos))
    },

    editTodo({ commit, state }, todo) {
        commit('editTodo', todo)
        localStorage.setItem('todos', JSON.stringify(state.allTodos))
    },

    doneTodo({ commit, state }, todo) {
        commit('doneTodo', todo)
        localStorage.setItem('todos', JSON.stringify(state.allTodos))
    },

    removeTodo({ commit, state }, todo) {
        commit('removeTodo', todo)
        localStorage.setItem('todos', JSON.stringify(state.allTodos))
    }

}

const mutations = {
    setTodos (state, todos) {
        state.allTodos = todos
    },

    getTodo(state, todo) {
        state.newTodo = todo
    },

    addTodo(state, todo) {
        state.allTodos.push({
            title: todo.title,
            description: todo.description,
            isDone: false,
        })
    },

    editTodo(state, todo) {
        var index = state.allTodos.findIndex(item => item.title === todo.title)
        state.allTodos[index].title = todo.title;
        state.allTodos[index].description = todo.description;
    },

    doneTodo(state, todo) {
        var index = state.allTodos.findIndex(item => item.title === todo.title)
        state.allTodos[index].isDone = !state.allTodos[index].isDone
    },

    removeTodo(state, todo) {
        var index = state.allTodos.findIndex(item => item.title === todo.title)
        state.allTodos.splice(index, 1)
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