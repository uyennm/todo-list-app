<template>
  <div class="todo-list">
    <p v-if="!todos.length">There are no todos yet.</p>
    <ul v-else>
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
  data() {
    return {
      todos: []
    }
  },
  methods: {
    addNewTodo(todo) {
      this.todos.push(todo)
    }
  }
}

</script>

<style lang="scss">
</style>