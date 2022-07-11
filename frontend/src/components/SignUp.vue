<template>
    <div class="border-2 border-solid border-blue-400 rounded">
        <form class="signup-form" @submit.prevent="signup">
            <P>
                <label for="username">Username:</label>
                <input id="username" v-model="username" v-validate="'required|min:3|max:20'">
            </P>

            <P>
                <label for="password">Password:</label>
                <input id="password" type="password" v-model="password" v-validate="'required|min:6|max:40'">
            </P>

            <P>
                <label for="confirmPassword">Confirm password:</label>
                <input id="confirmPassword" type="password" v-model="confirmPassword" v-validate="'required|min:6|max:40'">
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
            username: null,
            password: null,
            confirmPassword: null,
        }
    },
    methods: {
        signup() {
            this.$validator.validate().then(isValid => {
                if (isValid) {
                    this.$store.dispatch('auth/signup', username, password, passwordConfirm);
                }
            });
        }
    }
}
</script>

<style lang="scss">
</style>