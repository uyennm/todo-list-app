<template>
  <div id="app">
    <h1>Todo list app</h1>
    <li>
      <router-link to="/signup">Sign Up</router-link>
    </li>
    <li>
      <router-link to="/login">Log In</router-link>
    </li>
    <li>
      <a href @click.prevent="logOut">Log Out</a>
    </li>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app',
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss">
</style>