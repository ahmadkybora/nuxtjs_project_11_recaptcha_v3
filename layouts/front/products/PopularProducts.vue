<template>
    <div class="container">
        <h3 class="text-center">Popular Products</h3>
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
                <div v-for="product in popularProducts" :key="product.id" class="col-md-2">
                    <div class="card" style="width: 15rem; border-radius: 15px">
                        <img v-if="!loading"
                             class="card-img-top circle float-right"
                             src="../../../assets/loader.gif"
                             alt="Card image cap"
                             style="width: 230px; height:150px;">
                        <img v-else class="card-img-top float-right" :src="product.icon" alt="Card image cap"
                             style="width:150px;">
                        <div class="card-body">
                            <!--<h5 class="card-title" v-text="product.title.substring(0, 10)"></h5>
                            <p class="card-text" v-text="product.description.substring(0, 10)"></p>-->
                            <h5 class="card-title" v-text="product.title"></h5>
                            <p class="card-text" v-text="product.description"></p>
                            <p class="card-text">Price: {{ product.price }}</p>
                        </div>
                        <div class="card-footer">
                            <div class="row">
                                <div class="col" v-for="item in items" :key="item.id">
                                <span :class="item.color">
                                    <i :class="item.icon"></i>
                                    <nuxt-link :to="item.route"></nuxt-link>
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </carousel>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';

    window.$ = $;
    import carousel from 'vue-owl-carousel'
    import {mapState} from 'vuex'
    import ProductItems from '../../../api/front/ProductItems.json';

    export default {
        name: "PopularProducts",
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
            return this.$store.dispatch('Products/isProducts');
        },
        computed: mapState({
            popularProducts: state => state.Products.popularProducts
        }),
        methods: {
            likes(product) {
                let likes = {
                    product: product.id,
                    state: 'LIKE',
                };
                return this.$store.dispatch('likes', likes);
            },
            dislikes(product) {
                let dislikes = {
                    product: product.id,
                    state: 'DISLIKE',
                };
                return this.$store.dispatch('dislikes', dislikes);
            }
        }
    }
</script>

<style scoped>

</style>
