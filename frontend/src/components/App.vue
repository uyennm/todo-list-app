<template>
  <div id="app">
    <h1>Todo list app</h1>
    <button>Sign Up</button>
    <button>Log In</button>
    <TodoList/>
    <DoneList/>
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
            this.$store.getters['auth/isAuthenticated']
          }
        }
    }
</script>

<style lang="scss">
  
</style>