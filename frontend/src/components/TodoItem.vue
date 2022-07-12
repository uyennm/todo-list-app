<template>
    <div class="border-2 border-solid border-blue-400 rounded">
        <form class="new-item-form" @submit.prevent="onSubmit">
            <P>
                <label for="title">Title:</label>
                <input id="title" v-model="todo.title">
            </P>

            <P>
                <label for="description">Description:</label>
                <textarea id="description" v-model="todo.description"></textarea>
            </P>

            <p>
                <input type="submit" value="Add">
            </p>
        </form>
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