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
    },

    initAvailableId() {
        localStorage.setItem('nextAvailableId', '1');
    },

    getNextAvailableId() {
        return JSON.parse(localStorage.getItem('nextAvailableId'));
    },

    setNextAvailableId(id) {
        localStorage.setItem('nextAvailableId', JSON.stringify(id));
    }
}