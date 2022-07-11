<template>
  <div class="flex flex-col items-center">
    <p v-if="!todos.length">There are no done todos yet.</p>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <h3>{{ todo.title }}</h3>
        <p>{{ todo.description }}</p>

        <button @click="editTodo(isAuthenticated, todo)">Edit</button>
        <button @click="removeTodo(isAuthenticated, todo)">Remove</button>
      </li>
    </ul>

  </div>
</template>
  
<script>
export default {
  methods: {

    editTodo(isAuthenticated, todo) {
      this.$store.dispatch('todos/editTodo', isAuthenticated, todo)
    },

    removeTodo(isAuthenticated, todo) {
      this.$store.dispatch('todos/removeTodo', isAuthenticated, todo)
    }
  },
  computed: {
    todos() {
      return this.$store.getters['todos/doneTodos']
    },

    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    }
  },
}

</script>

<style scoped>

</style>