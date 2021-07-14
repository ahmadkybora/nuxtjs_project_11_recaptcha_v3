<template>
    <div class="container">
        <div class="jumbotron text-center">
            <h1 v-text="err_401.statusCode" class="text-danger"></h1>
            <h1 v-text="err_401.message"></h1>
            <h1 v-text="err_401.icon"></h1>
            <img src="../../assets/img/401-error.jpg" :style="err_401.style">
        </div>
    </div>
</template>

<script>
    import Errors from '../../api/errors/errors';

    export default {
        layout: 'errorPage',
        name: "err_401",
        component: {Errors},
        data() {
            return {
                items: Errors,
            }
        },
        computed: {
            err_401() {
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].statusCode === "401") {
                        return this.items[i];
                    }
                }
            }
        },
    }
</script>

<style scoped>

</style>
