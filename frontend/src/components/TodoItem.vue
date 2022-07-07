<template>
    <div>
        <form class="new-item-form" @submit.prevent="onSubmit">
            <P>
                <label for="title">Title:</label>
                <input id="title" v-model="title">
            </P>

            <P>
                <label for="description">Description:</label>
                <textarea id="description" v-model="description"></textarea>
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
            title: null,
            description: null,
        }
    },
    methods: {
        onSubmit() {
            let todo = {
                title: this.title,
                description: this.description,
            }
            this.$emit('add-todo', todo)
            this.title = null
            this.description = null
        }
    }
}
</script>

<style lang="scss">
</style>