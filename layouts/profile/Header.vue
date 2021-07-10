<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg shadow-lg navbar-light bg-light">
            <ul class="navbar-nav justify-content-center"
                v-for="item in items"
                :key="item.id">
                <li class="nav-item mx-3" :style="item.color">
                    <i :class="item.icon"></i>
                    <nuxt-link class="nav-link"
                               :to="item.route"
                               v-text="item.title">
                    </nuxt-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    import HeaderItems from '../../api/panel/HeaderItems.json';

    export default {
        //middleware: 'checkAuthEmployee',
        name: "Header",
        data() {
            return {
                items: HeaderItems
            }
        }
    }
</script>

<style scoped>

</style>
