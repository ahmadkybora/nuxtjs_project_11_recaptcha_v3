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
    import Navbar from "./profile/Navbar";
    import Header from "./profile/Header";
    import Sidebar from "./profile/Sidebar";
    import Footer from "./profile/Footer";
    export default {
        name: "profile",
        components: {Footer, Sidebar, Navbar, Header}
    }
</script>

<style scoped>

</style>
