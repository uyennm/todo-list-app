import todoApi from '../../api/todoApi'

const state = () => ({
    allTodos: [],
})

const getters = {
    todos(state) {
        return state.allTodos.filter(todo => !todo.isDone)
    },
    doneTodos(state) {
        return state.allTodos.filter(todo => todo.isDone)
    }
}

const actions = {
    async getAllTodos ({ commit }, isAuthenticated) {
        var todos;
        if (!isAuthenticated) {
            todos = JSON.parse(localStorage.getItem('todos'))
        } else {
            todos = await todoApi.getTodos()
        }

        commit('setTodos', todos)
    },

    async addTodo({ commit, state }, isAuthenticated, newTodo) {
        if (!isAuthenticated) {
            commit('addTodo', newTodo)
            localStorage.setItem('todos', JSON.stringify(state.allTodos))
        } else {
            await todoApi.addTodo(newTodo)
            commit('addTodo', newTodo)
        }
    },

    async editTodo({ commit, state }, isAuthenticated, todo) {
        if (!isAuthenticated) {
            commit('editTodo', todo)
            localStorage.setItem('todos', JSON.stringify(state.allTodos))
        } else {
            await todoApi.updateTodo(todo)
            commit('editTodo', todo)
        }
    },

    async doneTodo({ commit, state }, isAuthenticated, todo) {
        if (!isAuthenticated) {
            commit('doneTodo', todo)
            localStorage.setItem('todos', JSON.stringify(state.allTodos))
        } else {
            todo.isDone = true
            await todoApi.updateTodo(todo)
            commit('doneTodo', todo)
        }
    },

    async removeTodo({ commit, state }, isAuthenticated, todo) {
        if (!isAuthenticated) {
            commit('removeTodo', todo)
            localStorage.setItem('todos', JSON.stringify(state.allTodos))
        } else {
            await todoApi.deleteTodo(todo)
            commit('removeTodo', todo)
        }
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
        state.allTodos[index].isDone = true
    },

    removeTodo(state, todo) {
        var index = state.allTodos.findIndex(item => item.title === todo.title)
        state.allTodos.splice(index, 1)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}