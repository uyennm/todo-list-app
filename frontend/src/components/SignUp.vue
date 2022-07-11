<template>
    <div class="border-2 border-solid border-blue-400 rounded">
        <form class="signup-form" @submit.prevent="signup">
            <P>
                <label for="username">Username:</label>
                <input id="username" v-model="user.username">
            </P>

            <P>
                <label for="password">Password:</label>
                <input id="password" type="password" v-model="user.password">
            </P>

            <P>
                <label for="confirmPassword">Confirm password:</label>
                <input id="confirmPassword" type="password" v-model="user.passwordConfirm">
            </P>

            <p>
                <input type="submit" value="Submit">
            </p>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                username: null,
                password: null,
                passwordConfirm: null
            }
        }
    },
    methods: {
        signup() {
            this.$store.dispatch('auth/signup', this.user);
        }
    }
}

</script>

<style lang="scss">
</style>