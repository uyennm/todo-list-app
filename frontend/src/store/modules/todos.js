import todoApi from '../../api/todoApi'
import localStorageService from './../../services/localStorage'

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
    async getAllTodos ({ commit, rootState }, isAuthenticated) {
        let todos;
        if (!isAuthenticated) {
            todos = localStorageService.getTodos();
        } else {
            try {
                todos = await todoApi.getTodos(rootState.auth.user.token);
            } catch (error) {
                return error;
            }
        }
        commit('setTodos', todos);
        localStorageService.setTodos(todos);
    },

    async addTodo({ commit, state, rootState }, data) {
        let newTodo = data.todo;
        if (data.isAuthenticated) {
            const { response, success, errorMessage } = await todoApi.addTodo(newTodo, rootState.auth.user.token);
            if (success) {
                newTodo = response.data.todo;
                commit('addTodo', newTodo)
                localStorageService.setTodos(state.allTodos);
            }
            return { success, errorMessage }
        } else {
            let success = true, errorMessage;
            if (!newTodo.title) {
                errorMessage = "Title is required";
                success = false;
            } else {
                commit('addTodo', newTodo)
                localStorageService.setTodos(state.allTodos);
            }
            return { success, errorMessage }
        }

    },

    async editTodo({ commit, state, rootState }, data) {
        let newTodo = data.todo;
        if (data.isAuthenticated) {
            newTodo = await todoApi.updateTodo(data.todo, rootState.auth.user.token)
        }
        commit('editTodo', newTodo)
        localStorageService.setTodos(state.allTodos);
    },

    async doneTodo({ commit, state, rootState }, data) {
        let newTodo = data.todo
        if (data.isAuthenticated) {
            data.todo.isDone = true
            newTodo = await todoApi.updateTodo(data.todo, rootState.auth.user.token)
        }
        commit('doneTodo', newTodo)
        localStorageService.setTodos(state.allTodos);
    },

    async removeTodo({ commit, state, rootState }, data) {
        if (data.isAuthenticated) {
            await todoApi.deleteTodo(data.todo, rootState.auth.user.token)
        }
        commit('removeTodo', data.todo)
        localStorageService.setTodos(state.allTodos);
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