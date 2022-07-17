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
    async getTodos(token) {
      let response;
      try {
        response = await api.get('/todo', { headers: authHeader(token) });
        return response.data.todos;
      } catch (error) {
        if (error.response) {
          const errorMessage = convertErrorMessageToDisplay(error.response.data.message);
          return errorMessage;
        }
      }
    },

    async addTodo(newTodo, token) {
      let response;
      try {
        response = await api.post('/todo', newTodo, { headers: authHeader(token) })
        return {
          success: true,
          response
        }
      } catch (error) {
        if (error.response) {
          const errorMessage = convertErrorMessageToDisplay(error.response.data.message);
          return {
              success: false,
              errorMessage,
          };
        }
      }      
    },

    async updateTodo(todo, token) {
      let response;
      try {
        response = await api.patch(`/todo/${todo.id}`, todo, { headers: authHeader(token) });
        return response.data.todo;
      } catch (error) {
        if (error.response) {
          const errorMessage = convertErrorMessageToDisplay(error.response.data.message);
          return errorMessage;
        }
      }
    },

    async deleteTodo(todo, token) {
      try {
        await api.delete(`/todo/${todo.id}`, { headers: authHeader(token) });
      } catch (error) {
        if (error.response) {
          const errorMessage = convertErrorMessageToDisplay(error.response.data.message);
          return errorMessage;
        }
      }
    }
}