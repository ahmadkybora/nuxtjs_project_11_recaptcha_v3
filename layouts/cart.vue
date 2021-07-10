<template>
    <div class="container-fluid">
        <Header/>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-9">
                    <Nuxt/>
                </div>
                <div class="col-md-3">
                    <Sidebar/>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>
    import Header from './profile/cart/header';
    import Sidebar from './profile/cart/sidebar';
    import Footer from './profile/cart/footer';

    export default {
        name: "cart",
        components: {Header, Sidebar, Footer},
    }
</script>

<style scoped>

</style>
