import api from './commonApi';
import authHeader from './authHeader';

export default {
    getTodos() {
      return api.get('/todo', { headers: authHeader() }).then((response) => {
        return response.data.todos;
      });
    },

    addTodo(newTodo) {
      return api.post('/todo', newTodo, { headers: authHeader() }).then((response) => {
        return response.data.todo;
      });
    },

    updateTodo(todo) {
      return api.patch(`/todo/${todo.id}`, todo, { headers: authHeader() }).then((response) => {
        return response.data.todo;
      });
    },

    deleteTodo(todo) {
      return api.delete(`/todo/${todo.id}`, { headers: authHeader() });
    }
  
}