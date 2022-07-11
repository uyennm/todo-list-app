<template>
  <div class="flex flex-col items-center">
    <p v-if="!todos.length">There are no todos yet.</p>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <h3>{{ todo.title }}</h3>
        <p>{{ todo.description }}</p>

        <button @click="editTodo(isAuthenticated, todo)">Edit</button>
        <button @click="doneTodo(isAuthenticated, todo)">Done</button>
        <button @click="removeTodo(isAuthenticated, todo)">Remove</button>
      </li>
    </ul>

    <TodoItem @add-todo="addNewTodo" />
  </div>
</template>
  
<script>
import TodoItem from './TodoItem.vue'
export default {
  components: { TodoItem },
  methods: {
    addNewTodo(isAuthenticated, todo) {
      this.$store.dispatch('todos/addTodo', isAuthenticated, todo)
    },

    editTodo(isAuthenticated, todo) {
      this.$store.dispatch('todos/editTodo', isAuthenticated, todo)
    },

    doneTodo(isAuthenticated, todo) {
      this.$store.dispatch('todos/doneTodo', isAuthenticated, todo)
    },

    removeTodo(isAuthenticated, todo) {
      this.$store.dispatch('todos/removeTodo', isAuthenticated, todo)
    }
  },
  computed: {
    todos() {
      return this.$store.getters['todos/todos']
    },

    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    }
  },
  created() {
    this.$store.dispatch('todos/getAllTodos')
  }
}

</script>

<style scoped>

</style>