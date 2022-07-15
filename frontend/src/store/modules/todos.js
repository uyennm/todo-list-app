import todoApi from '../../api/todoApi'

const state = () => ({
    allTodos: [],
})

const getters = {
    todos(state) {
        if (state.allTodos)
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
        localStorage.setItem('todos', JSON.stringify(todos))
    },

    async addTodo({ commit, state }, data) {
        let newTodo = data.todo;
        if (data.isAuthenticated) {
            const { response, success, errorMessage } = await todoApi.addTodo(newTodo);
            if (success) {
                newTodo = response.data.todo;
                commit('addTodo', newTodo)
                localStorage.setItem('todos', JSON.stringify(state.allTodos))
            }
            return { success, errorMessage }
        } else {
            let success = true, errorMessage;
            if (!newTodo.title) {
                errorMessage = "Title is required";
                success = false;
            } else {
                commit('addTodo', newTodo)
                localStorage.setItem('todos', JSON.stringify(state.allTodos))
            }
            return { success, errorMessage }
        }

    },

    async editTodo({ commit, state }, data) {
        let newTodo = data.todo;
        if (data.isAuthenticated) {
            newTodo = await todoApi.updateTodo(data.todo)
        }
        commit('editTodo', newTodo)
        localStorage.setItem('todos', JSON.stringify(state.allTodos))
    },

    async doneTodo({ commit, state }, data) {
        let newTodo = data.todo
        if (data.isAuthenticated) {
            data.todo.isDone = true
            newTodo = await todoApi.updateTodo(data.todo)
        }
        commit('doneTodo', newTodo)
        localStorage.setItem('todos', JSON.stringify(state.allTodos))
    },

    async removeTodo({ commit, state }, data) {
        if (data.isAuthenticated) {
            await todoApi.deleteTodo(data.todo)
        }
        commit('removeTodo', data.todo)
        localStorage.setItem('todos', JSON.stringify(state.allTodos))
    }

}

const mutations = {
    setTodos (state, todos) {
        state.allTodos = todos || []
    },

    addTodo(state, todo) {
        state.allTodos.push(todo)
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