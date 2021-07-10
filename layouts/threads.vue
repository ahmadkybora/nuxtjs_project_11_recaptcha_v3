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
    import Navbar from "./threads/Navbar";
    import Header from "./threads/Header";
    import Sidebar from "./threads/Sidebar";
    import Footer from "./threads/Footer";
    export default {
        name: "products",
        components: {Footer, Sidebar, Navbar, Header}
    }
</script>

<style scoped>

</style>
