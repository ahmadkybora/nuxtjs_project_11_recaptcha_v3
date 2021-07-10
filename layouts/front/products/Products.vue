<template>
    <section class="bg-light my-3">
        <div class="container">
            <h3 class="text-center">Products</h3>
            <!--//-->
            <form action="" class="form-inline w-50 m-auto">
                <div class="input-group w-100">
                    <input type="text"
                           v-model="search"
                           class="form-control"
                           placeholder="Search...">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </form>
            <!--//-->
            <div class="row my-5">
                <carousel :autoplay="true" :nav="false">
                    <div v-for="product in products" :key="product.id" class="col-md-2">
                        <div class="card" style="width: 15rem; border-radius: 15px">
                            <!--//-->
                            <img v-if="loading"
                                 class="card-img-top circle float-right"
                                 src="../../../assets/loader.gif"
                                 alt="Card image cap"
                                 style="width: 230px; height:150px;">
                            <!--//-->
                            <img v-else
                                 class="card-img-top
                         float-right"
                                 :src="product.image"
                                 alt="Card image cap"
                                 style="width: 230px; height:150px;">
                            <!--//-->
                            <!--<img v-else
                                 class="card-img-top circle float-right"
                                 src="https://placeimg.com/200/200/any?1"
                                 alt="Card image cap"
                                 style="width: 230px; height:150px;">-->
                            <!--//-->
                            <div class="card-body">
                                <h5 class="card-title" v-text="product.title"></h5>
                                <p class="card-text" v-text="product.description"></p>
                                <p class="card-text">Price: {{ product.price }}</p>
                            </div>
                            <!--//-->
                            <div class="card-footer">
                                <div class="row">
                                    <div class="col" v-for="item in items" :key="item.id">
                                <span :class="item.color">
                                    <a @click="info(item.route, product.id)"><i :class="item.icon"></i></a>
                                </span>
                                    </div>
                                </div>
                            </div>
                            <!--//-->
                        </div>
                    </div>
                </carousel>
                <!--//-->
            </div>
        </div>
    </section>
</template>

<script>
    import $ from 'jquery';

    window.$ = $;
    import carousel from 'vue-owl-carousel'
    import {mapState} from 'vuex'
    import ProductItems from '../../../api/front/ProductItems.json';

    export default {
        name: "Products",
        components: {carousel},
        data() {
            return {
                loading: true,
                items: ProductItems,
                search: '',
            }
        },
        mounted() {
            this.loading = false;
            this.$store.dispatch('Products/ProductLike');
            return this.$store.dispatch('Products/isProducts');
        },
        computed: {
            ...mapState({
                products: state => state.Products.isProducts.data
            })
        },
        methods: {
            info(item, productId) {
                switch (item) {
                    case "/profile/cart/add":
                        var totalQty = 1;
                        this.$store.dispatch('Carts/addToCart', {productId, totalQty});
                        break;

                    case "/product/show":
                        alert(2);
                        break;

                    case "/favorite":
                        const ProductFavorite = {
                            username: window.localStorage.getItem('username'),
                            productId: productId,
                        };
                        this.$store.dispatch('Products/ProductFavorite', ProductFavorite);
                        break;

                    case "/dislike":
                        const ProductDisLike = {
                            username: window.localStorage.getItem('username'),
                            productId: productId,
                        };
                        this.$store.dispatch('Products/ProductDisLike', ProductDisLike);
                        break;

                    case "/like":
                        const ProductLike = {
                            username: window.localStorage.getItem('username'),
                            productId: productId,
                        };
                        this.$store.dispatch('Products/ProductLike', ProductLike);
                        break;
                }
            },
        }
    }
</script>

<style scoped>

</style>
