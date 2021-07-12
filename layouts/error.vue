<template>
    <div>
        <Navbar/>
        <Header/>
        <Nuxt/>
        <Footer/>
    </div>
</template>

<script>
    import Navbar from "./errors/Navbar";
    import Header from "./errors/Header";
    import Footer from "./errors/Footer";
    export default {
        name: "error",
        components: {Footer, Navbar, Header}
    }
</script>

<style scoped>

</style>
