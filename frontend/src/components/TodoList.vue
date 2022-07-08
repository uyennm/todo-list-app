<template>
  <div class="todo-list">
    <p v-if="!todos.length">There are no todos yet.</p>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <h3>{{ todo.title }}</h3>
        <p>{{ todo.description }}</p>
      </li>
      <!-- <button @click="editTodo(todo)">Edit</button>
      <button @click="doneTodo(todo)">Done</button>
      <button @click="removeTodo(todo)">Remove</button> -->
    </ul>

    <TodoItem @add-todo="addNewTodo" />
  </div>
</template>
  
<script>
import TodoItem from './TodoItem.vue'
export default {
  components: { TodoItem },
  methods: {
    addNewTodo(todo) {
      this.$store.dispatch('todos/addTodo', todo)
    },

    // editTodo(todo) {
    //   this.$store.todos.dispatch('editTodo', todo)
    // },

    // doneTodo(todo) {
    //   this.$store.todos.dispatch('doneTodo', todo)
    // },

    // removeTodo(todo) {
    //   this.$store.todos.dispatch('removeTodo', todo)
    // }
  },
  computed: {
    todos() {
      return this.$store.getters['todos/todos']
    }
  },
  created() {
    this.$store.dispatch('todos/getAllTodos')
  }
}

</script>

<style lang="scss">
</style>