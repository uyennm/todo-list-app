<template>
  <div class="flex w-screen h-auto p-4">
    <div class="w-1/3 h-full bg-grey-darkest"></div>
    <div class="flex flex-col w-1/3 h-full bg-blue-100 rounded-lg p-2 shadow-md">
      <p v-if="!todos.length">There are no <span v-show="isDoneList">done</span> todos yet.</p>
      <div class="flex bg-orange-300 w-auto h-auto p-2 mx-2 my-3 rounded-lg todo-card" v-for="(todo, index) in todos"
        :key="index">
        <TodoItem :id="todo.id" :title="todo.title" :description="todo.description" :is-done-todo="isDoneList" />
      </div>

    </div>
    <div class="w-1/3 h-full bg-grey-darkest"></div>
    <notifications group="alert" position="top right" />
  </div>
</template>
  
<script>
import TodoItem from './TodoItem.vue';
import { notifyError } from './../services/notify';

export default {
  props: {
    isDoneList: Boolean,
  },
  components: { TodoItem },
  computed: {
    todos() {
      if (this.isDoneList)
        return this.$store.getters['todos/doneTodos']
      else
        return this.$store.getters['todos/todos']
    },

    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
  },
  created() {
    const { success, errorMessage } = this.$store.dispatch('todos/getAllTodos', this.isAuthenticated);
    if (!success) {
      notifyError(errorMessage);
    }
  }
}

</script>

<style scoped>
.todo-card {
  background-color: rgb(245, 201, 119);
}
</style>