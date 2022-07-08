<template>
    <div class="border-2 border-solid border-blue-400 rounded">
        <form class="login-form" @submit.prevent="signup">
            <P>
                <label for="username">Username:</label>
                <input id="username" v-model="username">
            </P>

            <P>
                <label for="password">Password:</label>
                <input id="password" type="password" v-model="password">
            </P>

            <P>
                <label for="confirmPassword">Confirm password:</label>
                <input id="confirmPassword" type="password" v-model="confirmPassword">
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
            // let todo = {
            //     title: this.title,
            //     description: this.description,
            // }
            // this.$emit('add-todo', todo)
            // this.title = null
            // this.description = null
        }
    }
}
</script>

<style lang="scss">
</style>