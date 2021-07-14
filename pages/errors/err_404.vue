<template>
    <div class="container">
        <div class="jumbotron text-center">
            <h1 v-text="err_404.statusCode"></h1>
            <h1 v-text="err_404.message"></h1>
            <h1 v-text="err_404.icon"></h1>
            <img src="../../assets/img/404-error.jpg" :style="err_404.style">
        </div>
    </div>
</template>

<script>
    import Errors from '../../api/errors/errors';

    export default {
        layout: 'auth',
        name: "errorPage",
        component: {Errors},
        data() {
            return {
                items: Errors,
            }
        },
        computed: {
            err_404() {
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].statusCode === "404") {
                        return this.items[i];
                    }
                }
            }
        },
    }
</script>

<style scoped>

</style>
