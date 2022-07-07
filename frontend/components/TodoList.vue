<template>
    <div class="todo-list">
        <p v-if="!todos.length">There are no todos yet.</p>
        <ul v-else>
            <li v-for="(todo, index) in todos" :key="index">
                <h3>{{ todo.title }}</h3>
                <p>{{ todo.description }}</p>
            </li>
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
    method: {
      addNewTodo(todo) {
        this.todos.push(todo)
      }
    }
  }

</script>

<style lang="scss">
  
</style>