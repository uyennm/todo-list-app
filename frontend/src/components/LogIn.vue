<template>
    <div class="flex w-screen h-auto p-4 my-5">
        <div class="w-1/3 h-full bg-grey-darkest"></div>
        <form class="flex flex-col w-1/3 bg-blue-100 rounded-lg p-2 shadow-md login-form" @submit.prevent="login">
            <div class="flex items-center flex-col">
                <input class="shadow border rounded w-5/6 py-2 px-3 mt-3 mb-2 text-grey-darker" id="username" placeholder="Username" v-model="user.username">
                <input class="shadow border rounded w-5/6 py-2 px-3 mt-3 mb-2 text-grey-darker" id="password" placeholder="Password" type="password" v-model="user.password">
            </div>
            <button type="submit" class="flex self-end bg-gray-300 p-2 m-2 border-2 rounded hover:bg-gray-500 border-green hover:bg-green">Submit</button>
        </form>
        <div class="w-1/3 h-full bg-grey-darkest"></div>
        <notifications
            group="alert"
            position="top right"
        />
    </div>
</template>

<script>
import { notifyError, notifySuccess } from './../services/notify';

export default {
    data() {
        return {
            user: {
                username: null,
                password: null
            }
        }
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters['auth/isAuthenticated']
        },
    },
    methods: {
        async login() {
            const {success, errorMessage } = await this.$store.dispatch('auth/login', this.user);

            if (success) {
                notifySuccess('Log in successfully')
                this.$router.push('/');
            } else {
                notifyError(errorMessage)
            }
        }
    },
    created() {
        if (this.isAuthenticated) {
            this.$router.push('/');
        }
    }
}
</script>

<style lang="scss">
</style>