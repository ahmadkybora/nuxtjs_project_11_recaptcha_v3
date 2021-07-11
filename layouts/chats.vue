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
    import Navbar from "./chats/Navbar";
    import Header from "./chats/Header";
    import Sidebar from "./chats/Sidebar";
    import Footer from "./chats/Footer";
    export default {
        name: "chats",
        components: {Footer, Sidebar, Navbar, Header}
    }
</script>

<style scoped>

</style>
