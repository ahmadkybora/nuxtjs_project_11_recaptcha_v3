<template>
    <div class="container">
        <h3 class="text-center">Popular Brands</h3>
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
            <div v-for="brand in popularBrands" :key="brand.id" class="col-md-2">
                <div class="card" style="width: 15rem; border-radius: 15px">
                    <img v-if="!loading"
                         class="card-img-top circle float-right"
                         src="../../../assets/loader.gif"
                         alt="Card image cap"
                         style="width: 230px; height:150px;">
                    <img v-else class="card-img-top float-right" :src="brand.icon" alt="Card image cap"
                         style="width:150px;">
                    <div class="card-body">
                        <!--<h5 class="card-title" v-text="brand.title.substring(0, 10)"></h5>
                        <p class="card-text" v-text="brand.description.substring(0, 10)"></p>-->
                        <h5 class="card-title" v-text="brand.title"></h5>
                        <p class="card-text" v-text="brand.description"></p>
                        <p class="card-text">Price: {{ brand.price }}</p>
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col"><a><i class="text-primary fas fa-info"></i></a></div>
                            <div class="col"><a><i class="text-success fas fa-shopping-basket"></i></a></div>
                            <div class="col"><a><i class="text-danger fas fa-heart"></i></a></div>
                            <div @click="likes(brand)" class="col">
                                <a><i class="text-primary fa fa-thumbs-down"></i></a>
                            </div>
                            <div @click="dislikes(brand)" class="col">
                                <a><i class="text-primary fa fa-thumbs-up"></i></a>
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
    import BrandItems from '../../../api/front/BrandItems.json';
    import { mapState } from 'vuex';

    export default {
        name: "PopularBrands",
        components: {carousel},

        data() {
            return {
                items: BrandItems,
                loading: true,
                search: '',
            }
        },
        mounted() {
            this.loading = false;
            return this.$store.dispatch('Brands/isBrands');
        },
        computed: mapState({
            popularBrands: state => state.Brands.popularBrands
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
