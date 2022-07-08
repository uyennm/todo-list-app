<template>
  <div id="app">
    <h1>Todo list app</h1>
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
    }
</script>

<style lang="scss">
  
</style>