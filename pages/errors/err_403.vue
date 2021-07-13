<template>
    <div class="container">
        <div class="jumbotron text-center">
            <h1 v-text="err_403.statusCode"></h1>
            <h1 v-text="err_403.message"></h1>
            <h1 v-text="err_403.icon"></h1>
            <img :src="err_403.img" :style="err_403.style">
        </div>
    </div>
</template>

<script>
    import Errors from '../../api/errors/errors';

    export default {
        layout: 'auth',
        name: "err_403",
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
