import api from './commonApi';
import authHeader from './authHeader';
import catchError from './../utils/catchError';

export default {
    async getTodos(token) {
      let response;
      try {
        response = await api.get('/todo', { headers: authHeader(token) });
        return {
          success: true,
          response,
        }
      } catch (error) {
        return catchError(error);
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
        return catchError(error);
      }      
    },

    async updateTodo(todo, token) {
      let response;
      try {
        response = await api.patch(`/todo/${todo.id}`, todo, { headers: authHeader(token) });
        return {
          success: true,
          response,
        }
      } catch (error) {
        return catchError(error);
      }
    },

    async deleteTodo(todo, token) {
      try {
        await api.delete(`/todo/${todo.id}`, { headers: authHeader(token) });
        return {
          success: true,
        }
      } catch (error) {
        return catchError(error);
      }
    }
}