<template>
  <div class="flex w-screen h-auto p-4">
    <div class="w-1/3 h-full bg-grey-darkest"></div>
    <div class="flex-col w-1/3 h-full bg-blue-100 rounded-lg p-2 shadow-md">
      <p v-if="!todos.length">There are no todos yet.</p>
      <div class="flex bg-grey-light w-auto h-auto p-2 mt-4 rounded-lg todo-card" v-for="(todo, index) in todos"
        :key="index">
        <div class="w-5/6 font-sans font-light text-2xl text-center bg-grey-lightest pt-1 rounded-lg"
          @click="setHasEditTodo" v-show="!hasEditTodo">
          <h3>{{
              todo.title
          }}</h3>
          <p>{{ todo.description }}</p>
        </div>

        <div class="w-1/6 text-right pr-2 flex flex-col">
          <button class="basic-1/2 p-2 mt-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
            @click="doneTodo(todo)">Done</button>
          <button class="basic-1/2 p-2 mt-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
            @click="removeTodo(todo)">Remove</button>
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
      </div>

      <TodoItem @add-todo="addNewTodo" />
    </div>
    <div class="w-1/3 h-full bg-grey-darkest"></div>
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
.todo-card {
  background-color: rgb(243, 180, 63);
}
</style>