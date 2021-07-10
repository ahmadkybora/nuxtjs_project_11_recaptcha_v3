<template>
  <div>
    <Navbar/>
    <Header/>
    <Banner/>
    <Products/>
    <PopularProducts/>
    <ProductCategories/>
    <popular-product-categories/>
    <brands/>
    <PopularBrands/>
    <Articles/>
    <PopularArticles/>
    <ArticleCategories/>
    <Nuxt/>
    <Footer/>
  </div>
</template>

<script>
  import Navbar from '../layouts/front/Navbar'
  import Header from '../layouts/front/Header'
  import Banner from '../layouts/front/Banner'
  import Products from '../layouts/front/products/Products'
  import Footer from '../layouts/front/Footer'
  import ProductCategories from '../layouts/front/product-categories/ProductCategories'
  import Brands from '../layouts/front/brands/Brands'
  import ArticleCategories from '../layouts/front/article-categories/ArticleCategories'
  import Articles from '../layouts/front/articles/Articles'
  import PopularProducts from '../layouts/front/products/PopularProducts'
  import PopularBrands from '../layouts/front/brands/PopularBrands'
  import PopularArticles from '../layouts/front/articles/PopularArticles'
  import PopularProductCategories from "../layouts/front/product-categories/PopularProductCategories";

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

<style>

</style>
