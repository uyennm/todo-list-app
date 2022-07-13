<template>
  <div id="home">
    <TodoList />
    <TodoForm @add-todo="addNewTodo" />
    <DoneList />
  </div>
</template>

<script>
import TodoList from './TodoList.vue'
import DoneList from './DoneList.vue'
import TodoForm from './TodoForm.vue'

export default {
  name: 'app',
  components: { TodoList, DoneList, TodoForm },
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