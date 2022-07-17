<template>
  <div id="home">
    <TodoList :isDoneList="false" />
    <TodoForm @add-todo="addNewTodo" />
    <TodoList :isDoneList="true" />
    <notifications
        group="alert"
        position="top right"
    />
  </div>
</template>

<script>
import { notifyError } from './../services/notify'
import TodoList from './TodoList.vue'
import TodoForm from './TodoForm.vue'

export default {
  name: 'app',
  components: { TodoList, TodoForm },
  methods: {
    async addNewTodo(todo) {
      let newTodo = {
        id: this.nextAvailableId,
        title: todo.title,
        description: todo.description,
        isDone: todo.isDone,
      }
      let data = {
        isAuthenticated: this.isAuthenticated, 
        todo: newTodo
      }
      const { success, errorMessage } = await this.$store.dispatch('todos/addTodo', data);
      this.$store.dispatch('todos/increaseNextAvailableId', this.isAuthenticated);
      if (!success) {
        notifyError(errorMessage);
      }
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    },
    nextAvailableId() {
      return this.$store.getters['todos/nextAvailableId'];
    }
  }
}
</script>

<style lang="scss">
</style>