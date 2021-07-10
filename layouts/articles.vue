<template>
    <div>
        <Navbar/>
        <Header/>
        <Sidebar/>
        <Nuxt/>
        <Footer/>
    </div>
</template>

<script>
    import Navbar from "./articles/Navbar";
    import Header from "./articles/Header";
    import Sidebar from "./articles/Sidebar";
    import Footer from "./articles/Footer";
    export default {
        name: "articles",
        components: {Footer, Sidebar, Navbar, Header}
    }
</script>

<style scoped>

</style>
