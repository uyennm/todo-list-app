<template>
  <div id="home">
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