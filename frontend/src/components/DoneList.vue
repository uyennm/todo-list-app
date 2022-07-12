<template>
  <div class="flex flex-col items-center">
    <p v-if="!todos.length">There are no done todos yet.</p>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">

        <div @click="setHasEditTodo" v-show="!hasEditTodo">
          <h3>{{ todo.title }}</h3>
          <p>{{ todo.description }}</p>
          
          <div class="button-group">
            <button @click="removeTodo(todo)">Remove</button>
          </div>
        </div>

        <form v-show="hasEditTodo" class="edit-todo-form" @submit.prevent="editTodo(todo)">
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

  </div>
</template>
  
<script>
export default {
  data() {
    return {
      hasEditTodo: false,
    }
  },
  methods: {

    editTodo(todo) {
      let data = {
        isAuthenticated: this.isAuthenticated,
        todo
      }
      this.$store.dispatch('todos/editTodo', data).then(() => {
        this.unsetHasEditTodo();
      })
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