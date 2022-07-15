import api from './commonApi';
import authHeader from './authHeader';

const converErrorMessageToDisplay = (errorMessage) => {
  switch (errorMessage) {
      case '"title" must be a string':
          return 'Title is required';
      default:
          return errorMessage;
  }
}

export default {
    getTodos() {
      return api.get('/todo', { headers: authHeader() }).then((response) => {
        return response.data.todos;
      });
    },

    addTodo(newTodo) {
      console.log(newTodo)
      return api.post('/todo', newTodo, { headers: authHeader() })
      .then((response) => {
        return {
          success: true,
          response
        }
      })            
      .catch (error => {
          if (error.response) {
              const errorMessage = converErrorMessageToDisplay(error.response.data.message);
              console.log(error.response.data.message);
              return {
                  success: false,
                  errorMessage,
              };
          }
      });
    },

    updateTodo(todo) {
      console.log(todo)
      return api.patch(`/todo/${todo.id}`, todo, { headers: authHeader() }).then((response) => {
        return response.data.todo;
      });
    },

    deleteTodo(todo) {
      return api.delete(`/todo/${todo.id}`, { headers: authHeader() });
    }
  
}