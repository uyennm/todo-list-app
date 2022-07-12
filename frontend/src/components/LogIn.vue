<template>
    <div>
        <form class="login-form" @submit.prevent="login">
            <P>
                <label for="username">Username:</label>
                <input id="username" v-model="user.username">
            </P>

            <P>
                <label for="password">Password:</label>
                <input id="password" type="password" v-model="user.password">
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
                password: null
            }
        }
    },
    methods: {
        login() {
            if (this.user.username && this.user.password) {
                this.$store.dispatch('auth/login', this.user).then(() => {
                    this.$router.push('/');
                });
            }
        }
    }
}
</script>

<style lang="scss">
</style>