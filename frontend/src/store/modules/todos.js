import todoApi from '../../api/todoApi'
import localStorageService from './../../services/localStorage'

const state = () => ({
    allTodos: [],
    nextAvailableId: 1, // for unauthenticated user
})

const getters = {
    todos(state) {
        if (state.allTodos)
        return state.allTodos.filter(todo => !todo.isDone)
    },
    doneTodos(state) {
        return state.allTodos.filter(todo => todo.isDone)
    },
    nextAvailableId(state) {
        return state.nextAvailableId;
    } 
}

const actions = {
    getNextAvailableId({ commit }, isAuthenticated) {
        if (!isAuthenticated){
            if (!localStorageService.getNextAvailableId()) {
                localStorageService.initAvailableId();
            }
            let id = localStorageService.getNextAvailableId();
            commit('setNextAvailableId', id);
        }
    },

    increaseNextAvailableId({ commit, state }, isAuthenticated) {
        if (!isAuthenticated){
            commit('increaseNextAvailableId');
            localStorageService.setNextAvailableId(state.nextAvailableId);
        }
    },

    async getAllTodos ({ commit, rootState }, isAuthenticated) {
        let todos;
        if (!isAuthenticated) {
            todos = localStorageService.getTodos();
            commit('setTodos', todos);
            localStorageService.setTodos(todos);
            return { success: true }
        } else {
            let { response, success, errorMessage } = await todoApi.getTodos(rootState.auth.user.token);
            if (success) {
                todos = response.data.todos;
                commit('setTodos', todos);
                localStorageService.setTodos(todos);
            } 
            return { success, errorMessage }
        }
    },

    async addTodo({ commit, state, rootState }, data) {
        let newTodo = data.todo;
        if (data.isAuthenticated) {
            const { response, success, errorMessage } = await todoApi.addTodo(newTodo, rootState.auth.user.token);
            if (success) {
                newTodo = response.data.todo;
                commit('addTodo', newTodo);
                localStorageService.setTodos(state.allTodos);
            }
            return { success, errorMessage }
        } else {
            let success = true, errorMessage;
            if (!newTodo.title) {
                errorMessage = "Title is required";
                success = false;
            } else {
                commit('addTodo', newTodo);
                localStorageService.setTodos(state.allTodos);
            }
            return { success, errorMessage }
        }

    },

    async editTodo({ commit, state, rootState }, data) {
        let newTodo = data.todo;
        if (data.isAuthenticated) {
            let { response, success, errorMessage } = await todoApi.updateTodo(data.todo, rootState.auth.user.token)
            if (success) {
                newTodo = response.data.todo;
                commit('editTodo', newTodo);
                localStorageService.setTodos(state.allTodos);
            }
            return { success, errorMessage }
        }
        commit('editTodo', newTodo);
        localStorageService.setTodos(state.allTodos);
        return { success: true }
    },

    async doneTodo({ commit, state, rootState }, data) {
        let newTodo = data.todo
        if (data.isAuthenticated) {
            data.todo.isDone = true
            let { response, success, errorMessage } = await todoApi.updateTodo(data.todo, rootState.auth.user.token);
            if (success) {
                newTodo = response.data.todo;
                commit('doneTodo', newTodo);
                localStorageService.setTodos(state.allTodos);
            }
            return { success, errorMessage }
        }
        commit('doneTodo', newTodo);
        localStorageService.setTodos(state.allTodos);
        return { success: true }
    },

    async removeTodo({ commit, state, rootState }, data) {
        if (data.isAuthenticated) {
            let { success, errorMessage } = await todoApi.deleteTodo(data.todo, rootState.auth.user.token)
            if (success) {
                commit('removeTodo', data.todo);
                localStorageService.setTodos(state.allTodos);
            }
            return { success, errorMessage }
        }
        commit('removeTodo', data.todo);
        localStorageService.setTodos(state.allTodos);
        return { success: true }
    }
}

const mutations = {
    setNextAvailableId(state, id) {
        state.nextAvailableId = id;
    },

    increaseNextAvailableId(state) {
        state.nextAvailableId += 1;
    },

    setTodos(state, todos) {
        state.allTodos = todos || []
    },

    addTodo(state, todo) {
        state.allTodos.push(todo)
    },

    editTodo(state, todo) {
        let index = state.allTodos.findIndex(item => item.id == todo.id)
        state.allTodos[index].title = todo.title;
        state.allTodos[index].description = todo.description;
    },

    doneTodo(state, todo) {
        let index = state.allTodos.findIndex(item => item.id == todo.id)
        state.allTodos[index].isDone = true
    },

    removeTodo(state, todo) {
        // let index = state.allTodos.findIndex(item => item.id == todo.id)
        // state.allTodos.splice(index, 1)
        state.allTodos = state.allTodos.filter(item => item.id !== todo.id)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}