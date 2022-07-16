<template>
  <div class="flex flex-col" id="app">
    <div class="flex flex-row justify-between w-full mx-4">
      <h1 class="flex justify-start text-blue-400" @click="backToHomePage">Todo list</h1>
      <div class="flex items-center justify-end">
        <router-link
          class="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-base font-medium text-white bg-blue-400 hover:bg-blue-700"
          v-show="!isAuthenticated" to="/signup">Sign Up</router-link>
        <router-link
          class="ml-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          v-show="!isAuthenticated" to="/login">Log In</router-link>
        <a class="ml-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-base font-medium text-white bg-blue-400 hover:bg-blue-700"
          v-show="isAuthenticated" href @click.prevent="logOut">Log Out</a>
      </div>
    </div>
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
      // this.$router.push('/');
      location.reload();
    },

    backToHomePage() {
      if (this.$router.currentRoute.path === '/')
        location.reload();
      else
        this.$router.push('/');
    }
  },
  created() {
    this.$store.dispatch('auth/getUser')
  }
}
</script>

<style scoped>
h1 {
  cursor: pointer;
}
</style>