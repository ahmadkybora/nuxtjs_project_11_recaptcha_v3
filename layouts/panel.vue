<template>
  <div>
    <Navbar/>
    <Header/>
    <!--<Sidebar/>-->
    <Nuxt/>
    <Footer/>
  </div>
</template>

<script>
  import Navbar from "./panel/Navbar";
  import Header from "./panel/Header";
  import Sidebar from "./panel/Sidebar";
  import Footer from "./panel/Footer";
  export default {
    name: "panel",
    components: {Footer, Sidebar, Navbar, Header}
  }
</script>

<style scoped>

</style>
