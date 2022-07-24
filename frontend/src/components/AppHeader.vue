<template>
    <div class="flex flex-row justify-between w-full mx-4">
        <router-link class="flex justify-start text-blue-400" to="/">
            <h1>Todo list</h1>
        </router-link>
        <div class="flex items-center justify-end">
            <router-link
                class="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-base font-medium text-white bg-blue-400 hover:bg-blue-700"
                v-show="!isAuthenticated" to="/signup">Sign Up</router-link>
            <router-link
                class="ml-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                v-show="!isAuthenticated" to="/login">Log In</router-link>
            <h3 class="ml-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 text-base font-medium text-black"
                v-show="isAuthenticated">Hello {{ username }}</h3>
            <a class="ml-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-base font-medium text-white bg-blue-400 hover:bg-blue-700"
                v-show="isAuthenticated" href @click.prevent="logOut">Log Out</a>
        </div>
    </div>
</template>

<script>

export default {
    computed: {
        isAuthenticated() {
            return this.$store.getters['auth/isAuthenticated']
        },
        username() {
            return this.$store.getters['auth/username']
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout');
            location.reload();
        },
    }
}
</script>

<style scoped>
</style>