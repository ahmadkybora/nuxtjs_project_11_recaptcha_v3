<template>
    <div>
        <Navbar/>
        <Header/>
        <Banner/>
        <Products/>
        <PopularProducts/>
        <ProductCategories/>
        <popular-product-categories/>
        <PopularBrands/>
        <Articles/>
        <ArticleCategories/>
        <PopularArticles/>
        <Nuxt/>
        <Brands/>
        <Footer/>
    </div>
</template>

<script>
    import Navbar from '../front/Navbar'
    import Header from '../front/Header'
    import Banner from '../front/Banner'
    import Products from '../front/products/Products'
    import Footer from '../front/Footer'
    import ProductCategories from '../front/product-categories/ProductCategories'
    import Brands from '../front/brands/Brands'
    import ArticleCategories from '../front/article-categories/ArticleCategories'
    import Articles from '../front/articles/Articles'
    import PopularProducts from '../front/products/PopularProducts'
    import PopularBrands from '../front/brands/PopularBrands'
    import PopularArticles from '../front/articles/PopularArticles'
    import PopularProductCategories from "../front/product-categories/PopularProductCategories";

    export default {
        name: "index",
        components: {
            PopularProductCategories,
            PopularArticles,
            PopularBrands,
            PopularProducts,
            Articles,
            ArticleCategories,
            Brands,
            ProductCategories,
            Footer,
            Products,
            Banner,
            Header,
            Navbar
        }
    }
</script>

<style scoped>

</style>
