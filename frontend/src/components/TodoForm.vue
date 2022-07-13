<template>
    <div class="flex w-screen h-auto p-4 my-5">
        <div class="w-1/3 h-full bg-grey-darkest"></div>
        <form class="flex flex-row w-1/3 justify-center bg-blue-100 rounded-lg p-2 shadow-md new-item-form" @submit.prevent="onSubmit">
            <div class="w-5/6 flex flex-col items-center ml-5">
                <input class="shadow border rounded w-5/6 py-2 px-3 mt-3 mb-2 text-grey-darker" id="title" placeholder="Title" v-model="todo.title">
                <textarea class="shadow border rounded w-5/6 py-2 px-3 mt-3 mb-2 text-grey-darker" id="description" placeholder="Description" v-model="todo.description"></textarea>
            </div>
            <div class="w-1/6 flex flex-col items-center pr-2 mr-4">
                <div class="h-1/3 w-full"></div>
                <button class=" bg-gray-300 p-2 m-2 border-2 rounded hover:bg-gray-500 border-green hover:bg-green"><font-awesome-icon icon="fa-solid fa-plus" /></button>
                <div class="h-1/3 w-full"></div>
            </div>
        </form>
        <div class="w-1/3 h-full bg-grey-darkest"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            todo: {
                id: null,
                title: null,
                description: null,
                isDone: false,
            }
        }
    },
    methods: {
        onSubmit() {
            let newTodo = {
                id: null,
                title: this.todo.title,
                description: this.todo.description,
                isDone: this.todo.isDone
            }

            this.$emit('add-todo', newTodo)
            this.todo.title = null
            this.todo.description = null
            this.todo.isDone = false
        }
    }
}
</script>

<style lang="scss">
</style>