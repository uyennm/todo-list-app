<template>
  <div id="home">
    <TodoList :isDoneList="false" />
    <TodoForm @add-todo="addNewTodo" />
    <TodoList :isDoneList="true" />
  </div>
</template>

<script>
import TodoList from './TodoList.vue'
import TodoForm from './TodoForm.vue'

export default {
  name: 'app',
  components: { TodoList, TodoForm },
  methods: {
    addNewTodo(todo) {
      let data = {
        isAuthenticated: this.isAuthenticated,
        todo
      }
      this.$store.dispatch('todos/addTodo', data)
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    }
  }
}
</script>

<style lang="scss">
</style>