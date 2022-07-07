<template>
  <div id="app">
    <h1>Todo list app</h1>
    <TodoList/>
  </div>
</template>

<script>
    import TodoList from './TodoList.vue'
    export default {
        name: 'app',
        components: { TodoList },
    }
</script>

<style lang="scss">
  
</style>