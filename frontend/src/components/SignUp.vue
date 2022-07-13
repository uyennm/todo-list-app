<template>
    <div class="flex w-screen h-auto p-4 my-5">
        <div class="w-1/3 h-full bg-grey-darkest"></div>
        <form class="flex flex-col w-1/3 bg-blue-100 rounded-lg p-2 shadow-md signup-form" @submit.prevent="signup">
            <div class="flex items-center flex-col">
                <input class="shadow border rounded w-5/6 py-2 px-3 mt-3 mb-2 text-grey-darker" id="username" placeholder="Username" v-model="user.username">
                <input class="shadow border rounded w-5/6 py-2 px-3 mt-3 mb-2 text-grey-darker" id="password" placeholder="Password" type="password" v-model="user.password">
                <input class="shadow border rounded w-5/6 py-2 px-3 mt-3 mb-2 text-grey-darker" id="passwordConfirm" placeholder="Confirm password" type="password" v-model="user.passwordConfirm">
            </div>
            <button type="submit" class="flex self-end bg-gray-300 p-2 m-2 border-2 rounded hover:bg-gray-500 border-green hover:bg-green">Submit</button>
        </form>
        <div class="w-1/3 h-full bg-grey-darkest"></div>
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
            this.$store.dispatch('auth/signup', this.user).then(() => {
                this.$router.push('/');
            });
        }
    }
}

</script>

<style lang="scss">
</style>