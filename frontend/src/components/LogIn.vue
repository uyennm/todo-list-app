<template>
    <div>
        <form class="login-form" @submit.prevent="login">
            <P>
                <label for="username">Username:</label>
                <input id="username" v-model="username" v-validate="'required'">
            </P>

            <P>
                <label for="password">Password:</label>
                <input id="password" type="password" v-model="password" v-validate="'required'">
            </P>

            <p>
                <input type="submit" value="Submit">
            </p>
        </form>
    </div>
</template>

<script>
import { threadId } from 'worker_threads'

export default {
    data() {
        return {
            username: null,
            password: null,
        }
    },
    methods: {
        login() {
            if (this.username && this.password) {
                this.$store.dispatch('auth/login', username, password);
            }
        }
    }
}
</script>

<style lang="scss">
</style>