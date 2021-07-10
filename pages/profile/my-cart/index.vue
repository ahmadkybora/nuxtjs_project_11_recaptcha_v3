<template>
    <div class="container col-md-12">
        <div class="jumbotron">
            <!--//-->
            <h3>Your cart</h3>
            <!--//-->
            <div class="row">
                <!--//-->
                <div class="col-lg-4" v-for="cart in carts" :key="cart.id">
                    <div class="card" style="width: 20rem; border-radius: 15px">
                        <!--//-->
                        <div class="card-header">
                            <button type="button" @click="removeFromCart(cart.id)" class="close" aria-label="Close"
                                    style="color: red;">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <!--//-->
                        <img v-if="loading"
                             class="card-img-top circle float-right"
                             src="../../../assets/loader.gif"
                             alt="Card image cap"
                             style="width: 230px; height:150px;">
                        <!--//-->
                        <!-- <img v-else class="card-img-top float-right" :src="cart.products.icon" alt="Card image cap" style="width:150px;">-->
                        <img v-else
                             class="card-img-top circle float-right"
                             src="https://placeimg.com/200/200/any?1"
                             alt="Card image cap"
                             style="width: 315px; height:180px;">
                        <!--//-->
                        <div class="card-body">
                            <h5 class="card-title" v-text="cart.products.title"></h5>
                            <p class="card-text">Price: <strong>{{ cart.products.price }} $</strong></p>
                            <div class="row">
                                <div class="col-md-5">

                                    <p class="card-text">Quantity: <strong>{{ cart.quantity }}</strong></p>
                                </div>
                                <div class="col-md-7">
                                    <div class="row">
                                        <div class="col-md-2">
                                            <span @click.prevent="addToCart(cart, state)">
                                                <i class="fa fa-minus text-danger"></i>
                                            </span>
                                        </div>
                                        <div class="col-md-6">
                                            <input @blur.prevent="addToCart(cart, state = true)"
                                                   type="number"
                                                   class="form-control"
                                                   v-model="qty">
                                        </div>
                                        <div class="col-md-2">
                                            <span @click.prevent="addToCart(cart, state)">
                                                <i class="fa fa-plus text-success"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--//-->
                        <div class="card-footer">
                            <div class="row">
                                <div class="col" v-for="item in items" :key="item.id">
                                <span :class="item.color">
                                    <a @click="info(item.route, cart.product_id)"><i :class="item.icon"></i></a>
                                </span>
                                </div>
                            </div>
                        </div>
                        <!--//-->
                    </div>
                    <br>
                </div>
            </div>
            <!--//-->
            <br>
            <hr>
            <!--//-->
            <h3>Total Price:</h3>
            <!--//-->
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import CartItems from '../../../api/profile/CartItems.json';

    export default {
        //middleware: 'checkAuthEmployee',
        layout: 'profile',
        name: "index",
        data() {
            return {
                loading: true,
                items: CartItems,
                qty: 1,
                counter: 1,
                state: false,
            }
        },
        mounted() {
            this.loading = false;
            return this.$store.dispatch('Carts/myCart');
        },
        computed: {
            ...mapState({
                carts: state => state.Carts.myCart.data
            })
        },
        methods: {
            info(item, product_id) {
                switch (item) {
                    case "/product/show":
                        alert(1, product_id);
                        break;

                    case "/favorite":
                        alert(2, product_id);
                        break;

                    case "/dislike":
                        alert(3, product_id);
                        break;

                    case "/like":
                        alert(4, product_id);
                        break;
                }
            },
            removeFromCart(cartId) {
                this.$store.dispatch('Carts/removeFromCart', cartId);
            },
            addToCart(cart) {
                var totalQty;
                var quantity = parseInt(cart.quantity);
                var productId = cart.product_id;
                this.state ? totalQty = quantity + this.qty : totalQty = quantity + this.counter;
                console.log(totalQty);
                this.$store.dispatch('Carts/addToCart', {productId, totalQty});
            }
        }
    }
</script>

<style scoped>

</style>
