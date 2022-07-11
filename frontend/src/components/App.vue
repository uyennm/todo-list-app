<template>
  <div id="app">
    <h1>Todo list app</h1>
    <router-link to="/signup">Sign Up</router-link>
    <router-link to="/login">Log In</router-link>
    <router-view />
    <TodoList />
    <DoneList />
  </div>
</template>

<script>
import TodoList from './TodoList.vue'
import DoneList from './DoneList.vue'

export default {
  name: 'app',
  components: { TodoList, DoneList },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    }
  }
}
</script>

<style lang="scss">
</style>