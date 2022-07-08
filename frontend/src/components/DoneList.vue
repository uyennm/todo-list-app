<template>
  <div class="flex flex-col items-center">
    <p v-if="!todos.length">There are no done todos yet.</p>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <h3>{{ todo.title }}</h3>
        <p>{{ todo.description }}</p>

        <button @click="editTodo(todo)">Edit</button>
        <button @click="removeTodo(todo)">Remove</button>
      </li>
    </ul>

  </div>
</template>
  
<script>
export default {
  methods: {

    editTodo(todo) {
      this.$store.dispatch('todos/editTodo', todo)
    },

    removeTodo(todo) {
      this.$store.dispatch('todos/removeTodo', todo)
    }
  },
  computed: {
    todos() {
      return this.$store.getters['todos/doneTodos']
    }
  },
}

</script>

<style scoped>

</style>