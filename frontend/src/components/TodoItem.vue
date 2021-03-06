<template>
  <div class="flex flex-row w-full">
    <div class="w-5/6 font-sans font-light text-2xl text-center bg-grey-lightest pt-1 rounded-lg" v-show="!hasEditTodo">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>

    <form v-show="hasEditTodo" class="flex flex-row justify-center w-full" @submit.prevent="editTodo(todo)">
      <div class="w-5/6 flex flex-col items-center ml-5">
        <input class="shadow border rounded w-5/6 py-2 px-3 mt-3 mb-2 text-grey-darker" id="title" placeholder="Title"
          v-model="todo.title">
        <textarea class="shadow border rounded w-5/6 py-2 px-3 mt-3 mb-2 text-grey-darker" id="description"
          placeholder="Description" v-model="todo.description"></textarea>
      </div>
      <div class="w-1/6 flex flex-col items-center pr-2 mr-2">
        <div class="h-1/3 w-full"></div>
        <button class=" bg-gray-300 p-2 m-2 border-2 rounded hover:bg-gray-500 border-green hover:bg-green">
          <font-awesome-icon icon="fa-solid fa-floppy-disk" />
        </button>
        <div class="h-1/3 w-full"></div>
      </div>
    </form>

    <div v-show="!hasEditTodo" class="flex flex-col w-1/6 text-right pr-2 items-center">
      <button class=" bg-gray-300 p-2 ml-2 mr-2 my-2 border-2 rounded hover:bg-gray-500 border-green hover:bg-green"
        @click="setHasEditTodo">
        <font-awesome-icon icon="fa-solid fa-pencil" />
      </button>
      <button
        class=" bg-green-300 p-2 ml-2 mr-2 my-2 border-2 rounded hover:bg-green-500 text-green border-green hover:bg-green"
        v-show="!isDoneTodo" @click="doneTodo(todo)">
        <font-awesome-icon icon="fa-solid fa-check" />
      </button>
      <button
        class=" bg-red-300 p-2 ml-2 mr-2 my-2 border-2 rounded hover:bg-red-500 text-green border-green hover:bg-green"
        @click="removeTodo(todo)">
        <font-awesome-icon icon="fa-solid fa-trash" />
      </button>
    </div>

    <notifications group="alert" position="top right" />
  </div>
</template>

<script>
import { notifyError } from './../services/notify';

export default {
  data() {
    return {
      hasEditTodo: false,
    }
  },
  props: {
    id: Number,
    title: String,
    description: String,
    isDoneTodo: Boolean,
  },
  methods: {

    async editTodo(todo) {
      let data = {
        isAuthenticated: this.isAuthenticated,
        todo
      }
      const { success, errorMessage } = await this.$store.dispatch('todos/editTodo', data);
      if (success) {
        this.unsetHasEditTodo();
      } else {
        notifyError(errorMessage);
      }
    },

    async doneTodo(todo) {
      let data = {
        isAuthenticated: this.isAuthenticated,
        todo
      }
      const { success, errorMessage } = await this.$store.dispatch('todos/doneTodo', data);
      if (!success) {
        notifyError(errorMessage);
      }
    },

    async removeTodo(todo) {
      let data = {
        isAuthenticated: this.isAuthenticated,
        todo
      }
      const { success, errorMessage } = await this.$store.dispatch('todos/removeTodo', data);
      if (!success) {
        notifyError(errorMessage);
      }
    },

    setHasEditTodo() {
      this.hasEditTodo = true
    },

    unsetHasEditTodo() {
      this.hasEditTodo = false
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },

    todo() {
      let todo = { id:this.id, title: this.title, description: this.description }
      return todo;
    },
  }
}

</script>

<style scoped>
.todo-card {
  background-color: rgb(245, 201, 119);
}
</style>