import api from './commonApi';

export default {
    getTodos() {
      return api.get('/todo').then((response) => {
        return response.data.todos;
      });
    },

    addTodo(newTodo) {
      return api.post('/todo', newTodo);
    },

    updateTodo(todo) {
      return api.patch(`/todo/${todo.id}`, todo);
    },

    deleteTodo(todo) {
      return api.delete(`/todo/${todo.id}`);
    }
  
}