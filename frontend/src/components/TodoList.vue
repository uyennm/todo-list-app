<template>
  <div class="flex flex-col items-center">
    <p v-if="!todos.length">There are no todos yet.</p>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <div @click="setHasEditTodo" v-show="!hasEditTodo">
          <h3>{{ todo.title }}</h3>
          <p>{{ todo.description }}</p>
          
          <div class="button-group">
            <button @click="doneTodo(todo)">Done</button>
            <button @click="removeTodo(todo)">Remove</button>
          </div>
        </div>

        <form v-show="hasEditTodo" class="new-item-form" @submit.prevent="editTodo(todo)">
            <P>
                <label for="title">Title:</label>
                <input id="title" v-model="todo.title">
            </P>
            <P>
                <label for="description">Description:</label>
                <textarea id="description" v-model="todo.description"></textarea>
            </P>
            <p>
                <input type="submit" value="Save">
            </p>
        </form>

      </li>
    </ul>

    <TodoItem @add-todo="addNewTodo" />
  </div>
</template>
  
<script>
import TodoItem from './TodoItem.vue'
export default {
  data() {
    return {
      hasEditTodo: false,
    }
  },
  components: { TodoItem },
  methods: {
    addNewTodo(todo) {
      let data = {
        isAuthenticated: this.isAuthenticated,
        todo
      }
      this.$store.dispatch('todos/addTodo', data)
    },

    editTodo(todo) {
      let data = {
        isAuthenticated: this.isAuthenticated,
        todo
      }
      this.$store.dispatch('todos/editTodo', data).then(() => {
        this.unsetHasEditTodo();
      })
    },

    doneTodo(todo) {
      let data = {
        isAuthenticated: this.isAuthenticated,
        todo
      }
      this.$store.dispatch('todos/doneTodo', data)
    },

    removeTodo(todo) {
      let data = {
        isAuthenticated: this.isAuthenticated,
        todo
      }
      this.$store.dispatch('todos/removeTodo', data)
    },

    setHasEditTodo() {
      this.hasEditTodo = true
    },

    unsetHasEditTodo() {
      this.hasEditTodo = false
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
    this.$store.dispatch('todos/getAllTodos', this.isAuthenticated)
  }
}

</script>

<style scoped>

</style>