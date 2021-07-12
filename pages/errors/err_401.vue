<template>
    <div>
        <p>salam</p>
        <div v-for="item in items" :key="item.id">
            <h1 v-text="item.message"></h1>
            <h1 v-text="item.statusCode"></h1>
        </div>
    </div>
</template>

<script>
    import Errors from '../../api/errors/errors';

    export default {
        layout: "error",
        name: "err_401",
        component : {Errors},
        data() {
            return {
                items: Errors
            }
        }
    }
</script>

<style scoped>

</style>
