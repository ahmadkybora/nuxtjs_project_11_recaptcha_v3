<template>
    <div class="container">
        <div class="jumbotron text-center">
            <h1 v-text="err_500.statusCode"></h1>
            <h1 v-text="err_500.message"></h1>
            <h1 v-text="err_500.icon"></h1>
            <img src="../../assets/img/500-error.jpg" :style="err_500.style">
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
            err_500() {
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].statusCode === "500") {
                        return this.items[i];
                    }
                }
            }
        },
    }
</script>

<style scoped>

</style>
