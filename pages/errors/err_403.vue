<template>
    <div class="container">
        <div class="jumbotron text-center">
            <h1 v-text="err_403.statusCode"></h1>
            <h1 v-text="err_403.message"></h1>
            <h1 v-text="err_403.icon"></h1>
            <img src="../../assets/img/403-error.png" :style="err_403.style">
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
            err_403() {
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].statusCode === "403") {
                        return this.items[i];
                    }
                }
            }
        },
    }
</script>

<style scoped>

</style>
