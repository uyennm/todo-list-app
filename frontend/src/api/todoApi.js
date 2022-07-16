import api from './commonApi';
import authHeader from './authHeader';

const convertErrorMessageToDisplay = (errorMessage) => {
  switch (errorMessage) {
      case '"title" must be a string':
          return 'Title is required';
      default:
          return errorMessage;
  }
}

export default {
    getTodos(token) {
      return api.get('/todo', { headers: authHeader(token) }).then((response) => {
        return response.data.todos;
      });
    },

    addTodo(newTodo, token) {
      return api.post('/todo', newTodo, { headers: authHeader(token) })
      .then((response) => {
        return {
          success: true,
          response
        }
      })            
      .catch (error => {
          if (error.response) {
              const errorMessage = convertErrorMessageToDisplay(error.response.data.message);
              return {
                  success: false,
                  errorMessage,
              };
          }
      });
    },

    updateTodo(todo, token) {
      return api.patch(`/todo/${todo.id}`, todo, { headers: authHeader(token) }).then((response) => {
        return response.data.todo;
      });
    },

    deleteTodo(todo, token) {
      return api.delete(`/todo/${todo.id}`, { headers: authHeader(token) });
    }
  
}