<template>
    <!--//-->
    <nav class="navbar navbar-expand-lg navbar-light shadow-md">
        <a href="" class="navbar-brand text-warning ml-3">
            <i class="fas fa-dove" style="font-size: 25px"></i>
        </a>
        <!--//-->
        <form action="" class="form-inline w-50 m-auto">
            <div class="input-group w-100">
                <input type="text" v-model="search" class="form-control" placeholder="Search...">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </form>
        <!--//-->
        <div class="row">
            <div v-if="$auth.loggedIn">
                <button @click="isUserLogout()" class="btn btn-warning" style="border-radius: 15px;">Logout</button>
                <button class="btn btn-success" style="border-radius: 15px;">Welcome: {{ username }}</button>
                <ul class="navbar-nav justify-content-center w-100 list-unstyled my-3">
                    <li class="nav-item mx-5 dropdown">
                        <a href="#"
                           class="nav-link dropdown-toggle"
                           data-toggle="dropdown">
                            Profile
                        </a>
                        <div class="dropdown-menu">
                            <div v-for="item in items"
                                 :key="item.id">
                                <nuxt-link :to="item.route"
                                           class="dropdown-item"
                                           :class="item.color">
                                    <i :class="item.icon"></i>
                                    {{ item.name }}
                                </nuxt-link>
                                <hr>
                            </div>
                        </div>
                    </li>
                </ul>
                <nuxt-link to="/profile/cart"><i class="fa fa-cart-plus fa-2x text-secondary"
                                                 aria-hidden="true"></i>
                </nuxt-link>
            </div>
            <div v-else>
                <nuxt-link class="bbtn btn" to="/login">Login</nuxt-link>
                <nuxt-link class="bbtn btn" to="/register">Register</nuxt-link>
            </div>
        </div>
        <!--//-->
    </nav>
    <!--//-->
</template>

<script>
    import ProfileItems from '../../api/front/ProfileItems';
    import {mapState} from 'vuex';
    //import { mapGetters } from 'vuex'

    export default {
        name: 'Navbar',
        data() {
            return {
                search: '',
                items: ProfileItems,
            }
        },
        computed: {
            ...mapState({
                username: state => state.Auth.username,
                /*fullName: state => state.Auth.isUser,
                isAuthenticated: state => state.Auth.tokenUser*/
            }),
            /*...mapState({
                isAuthenticated: state => state.Auth.isAuthenticated,
                loggedInUser: state => state.Auth.loggedInUser,
            })*/
            /*user(){
                return window.localStorage.getItem(user);
            }*/
        },
        methods: {
            isUserLogout() {
                return this.$store.dispatch('Auth/isUserLogout');
            }
        },
        mounted() {

            //console.log(this.$auth.user);
            //this.$auth.logout();
            /*            console.log(this.$store.state.auth.user);
                        console.log(this.$store.state.auth);*/
            this.$store.dispatch('Auth/isUserLogin');
            return this.$store.dispatch('Auth/isUserLogin');
            //console.log(this.fullName)
        }
    }
</script>

<style scoped>
    .container-fluid {
        height: 100px;
    }

    .bbtn {
        background-color: aquamarine;
        border-radius: 15px;
    }

    .input-group > .form-control, .input-group > .form-control-plaintext, .input-group > .custom-select, .input-group > .custom-file {
        flex: auto;
    }
</style>
