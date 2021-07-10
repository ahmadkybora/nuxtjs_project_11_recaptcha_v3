<template>
    <nav>
        <div class="container" style="height: 100px">
            <div class="row">
                <div class="col-3">
                    <v-panel-sidebar></v-panel-sidebar>
                    <!--<v-profile-sidebar></v-profile-sidebar>-->
                </div>
                <div class="col-7"></div>
                <div class="col-2">
                    <div class="text-center">
                        <!--<span v-if="isLoggedIn">
                        <button class="btn btn-warning btn-circle">
                            <span @click="isLogout()">Logout</span>
                        </button>
                        </span>-->
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    import $ from 'jquery';
    import {mapState} from 'vuex';

    window.$ = $;
    export default {
        //middleware: 'checkAuthEmployee',
        name: "Navbar",
        data() {
            return {
                drawer: ''
            }
        },
        computed: mapState({
            isLoggedIn: state => state.getters.isAuthenticated
        }),
        methods: {
            isLogout() {
                this.$store.dispatch('isLogout')
                    .then(() => {
                        this.$router.push('/login')
                    });
            },
        }
    }
</script>

<style scoped>
    .btn-circle {
        width: 60px;
        height: 30px;
        padding: 6px 0px;
        border-radius: 15px;
        text-align: center;
        font-size: 12px;
        line-height: 1.42857;
    }
</style>
