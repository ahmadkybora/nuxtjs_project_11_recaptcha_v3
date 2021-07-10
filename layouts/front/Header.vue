<template>
    <div class="container-fluid">
        <!--//-->
        <nav class="navbar navbar-expand-lg navbar-light shadow-md">
            <ul class="navbar-nav justify-content-center w-100 list-unstyled my-3">
                <li class="nav-item mx-5">
                    <a href="#" class="nav-link">
                        <i class="fa fa-home"></i>
                        Home
                    </a>
                </li>
                <li class="nav-item mx-5 dropdown">
                    <a href="#"
                       class="nav-link dropdown-toggle"
                       data-toggle="dropdown">
                        Products
                    </a>
                    <div class="dropdown-menu">
                        <a href="" class="dropdown-item"></a>
                        <a href="" class="dropdown-item"></a>
                        <a href="" class="dropdown-item"></a>
                        <a href="" class="dropdown-item"></a>
                    </div>
                </li>
                <li class="nav-item mx-5 dropdown">
                    <a href=""
                       class="nav-link dropdown-toggle"
                       data-toggle="dropdown">
                        Articles
                    </a>
                    <div class="dropdown-menu">
                        <a href="" class="dropdown-item"></a>
                        <a href="" class="dropdown-item"></a>
                        <a href="" class="dropdown-item"></a>
                        <a href="" class="dropdown-item"></a>
                    </div>
                </li>
                <li class="nav-item mx-5 dropdown">
                    <a href="#"
                       class="nav-link dropdown-toggle"
                       data-toggle="dropdown">
                        Threads
                    </a>
                    <div class="dropdown-menu">
                        <a href="" class="dropdown-item"></a>
                        <a href="" class="dropdown-item"></a>
                        <a href="" class="dropdown-item"></a>
                        <a href="" class="dropdown-item"></a>
                    </div>
                </li>
                <li class="nav-item mx-5">
                    <a href="" class="nav-link">
                        <i class=""></i>
                        About
                    </a>
                </li>
                <li class="nav-item">
                    <a href="" class="nav-link">
                        <i class=""></i>
                        Contact Us
                    </a>
                </li>
            </ul>
        </nav>
        <!--//-->
        <!--<div class="row">
            <div class="col" v-for="item in items" :key="item.id">
                <div :style="item.color">
                    <nuxt-link class="btn" v-text="item.title" :to="item.route" prefetch></nuxt-link>
                    <div class="text-center" :style="item.color"><i :class="item.icon"></i></div>
                </div>
            </div>
        </div>-->
    </div>
</template>

<script>
    import HeaderItems from '../../api/front/HeaderItems.json';

    export default {
        name: 'Header',
        data() {
            return {
                items: HeaderItems
            }
        }
    }
</script>

<style scoped>
    .btn {
        background-color: aquamarine;
        border-radius: 15px;
    }

    .container-fluid {
        background-color: skyblue;
        border-radius: 15px;
    }
</style>
