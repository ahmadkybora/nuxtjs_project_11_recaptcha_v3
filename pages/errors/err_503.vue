<template>
    <div class="container">
        <div class="jumbotron text-center">
            <h1 v-text="err_503.statusCode"></h1>
            <h1 v-text="err_503.message"></h1>
            <h1 v-text="err_503.icon"></h1>
            <img :src="err_503.img" :style="err_503.style">
        </div>
    </div>
</template>

<script>
    import Errors from '../../api/errors/errors';

    export default {
        layout: 'auth',
        name: "err_503",
        component: {Errors},
        data() {
            return {
                items: Errors,
            }
        },
        computed: {
            err_503() {
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].statusCode === "503") {
                        return this.items[i];
                    }
                }
            }
        },
    }
</script>

<style scoped>

</style>
