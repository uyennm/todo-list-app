export default {
    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    },

    getUser() {
        return JSON.parse(localStorage.getItem('user'));
    },

    removeUser() {
        localStorage.removeItem('user');
    },

    setTodos(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
    },

    getTodos() {
        return JSON.parse(localStorage.getItem('todos'));
    },

    removeTodos() {
        localStorage.removeItem('todos');
    }
}