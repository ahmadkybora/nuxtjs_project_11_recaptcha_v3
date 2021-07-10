<template>
    <div class="container">
        <!--ProductRegister-->
        <ProductRegister v-if="hasPermissionCreateProduct === createProduct" :product="product" :editMode="editMode"></ProductRegister>
        <!--//-->
        <div class="row">
            <div class="col-md-12 text-center">
                <div class="row">
                    <div class="col-md-4">
                        <h3>Product Register</h3>
                    </div>
                    <div v-if="hasPermissionCreateProduct === createProduct" class="col-md-3 offset-5">
                        <button @click="registerProduct()" class="btn btn-success">
                            <span><i class="fa fa-user-plus"></i>Register</span>
                        </button>
                        <button id="close" ref="closeRegister" class="btn btn-danger" @click="closeModal()">close
                        </button>
                    </div>
                </div>
            </div>
            <!--//-->
            <form @submit.prevent="onFullTextSearch()" class="form-inline w-50 m-auto">
                <div class="input-group w-100 my-3">
                    <input type="text"
                           name="full_text_search"
                           id="full-text-search"
                           v-model="full_text_search"
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
            <!------------------------//------------------------>
            <!--<ProductSearch></ProductSearch>-->
            <!------------------------//------------------------>
            <table class="table table-striped tab-content table-bordered table-responsive">
                <thead class="text-center">
                <tr>
                    <th>#</th>
                    <th>Category Name</th>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>image</th>
                    <th>State</th>
                    <th>Created At / Updated At</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody class="text-center">
                <tr v-if="hasPermissionAllProduct === allProduct" v-for="(product, index) in products" :key="product.id">
                    <td>{{ index }}</td>
                    <!--<td v-text="product.ProductCategory.name.substring(0, 10)"></td>
                    <td v-text="product.name.substring(0, 10)"></td>
                    <td v-text="product.description.substring(0, 10)"></td>
                    <td v-text="product.ProductCategory.name.substring(0, 5)"></td>-->
                    <td v-text="product.ProductCategory.name"></td>
                    <td v-text="product.name"></td>
                    <td v-text="product.description"></td>
                    <td v-text="product.price"></td>
                    <td>
                        <img class="rounded-circle" :src="product.image" style="width: 50px; height: 50px">
                    </td>
                    <td>
                        <button v-if="product.state === 'ACTIVE'"
                                class="btn btn-success btn-sm disabled"
                                v-text="product.state">ACTIVE
                        </button>
                        <button v-if="product.state === 'INACTIVE'"
                                class="btn btn-warning btn-sm disabled"
                                v-text="product.state">INACTIVE
                        </button>
                        <button v-if="product.state === 'SUSPENDED'"
                                class="btn btn-secondary btn-sm disabled"
                                v-text="product.state">SUSPENDED
                        </button>
                        <button v-if="product.state === 'PENDING'"
                                class="btn btn-danger btn-sm disabled"
                                v-text="product.state">PENDING
                        </button>
                    </td>
                    <td>{{ product.createdAt + ' ' + product.updatedAt }}</td>
                    <td>
                        <a v-if="hasPermissionViewProduct === viewProduct"
                           @click="productShow(product)"
                           data-toggle="modal"
                           data-target="#exampleModal">
                            <i class="fas fa-eye text-primary"></i>
                        </a>

                        <ProductShow v-if="hasPermissionViewProduct === viewProduct"
                                     :showProduct="showProduct">
                        </ProductShow>
                        /
                        <a v-if="hasPermissionUpdateProduct === updateProduct"
                           href="#register"
                           @click="productEdit(product)"><i class="fas fa-pen text-success"></i>
                        </a>
                        /
                        <a v-if="hasPermissionDestroyProduct === destroyProduct"
                           @click="productDelete(product.id)"><i class="fas fa-trash text-danger"></i>
                        </a>
                    </td>
                </tr>
                </tbody>
                <thead class="text-center">
                <tr>
                    <th>#</th>
                    <th>Category Name</th>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>image</th>
                    <th>State</th>
                    <th>Created At / Updated At</th>
                    <th>Action</th>
                </tr>
                </thead>
            </table>
            <!---------pagination----------->
            <nav aria-label="...">
                <ul class="pagination pagination-sm">
                    <li v-if="current_page > 1"
                        class="page-item">
                        <a @click.prevent="changePage(current_page - 1)"
                           disabled="disabled"
                           class="page-link" href="#" tabindex="-1">
                            Previous
                        </a>
                    </li>
                    <li v-for="page in pages"
                        id="colorBtn"
                        class="page-item">
                        <a @click.prevent="changePage(page)" class="page-link" href="#">{{ page }}</a>
                    </li>
                    <li v-if="current_page < last_page" class="page-item">
                        <a @click.prevent="changePage(current_page + 1)" class="page-link"
                           href="#">Next</a>
                    </li>
                </ul>
            </nav>
            <!--:key="page === current_page"-->
            <!---------pagination----------->
        </div>
    </div>

</template>

<script>
    import $ from 'jquery';
    import ProductRegister from '../../components/panel/ProductRegister';
    import ProductShow from '../../components/panel/modal/ProductShow';
    import {ProductService} from '../../services/panel/ProductService';
    import {mapState} from 'vuex'
    import HelperFunctions from '../../helpers/HelperFunctions';
    import ProductSearch from '../../components/panel/search/ProductSearch';
    import Vue from 'vue';
    import VuejsPaginate from 'vuejs-paginate'

    Vue.component('paginate', VuejsPaginate);

    window.$ = $;
    export default {
        //middleware: 'checkAuthEmployee',
        layout: 'panel',
        name: "Products",
        components: {ProductRegister, ProductShow, ProductSearch},
        data() {
            return {
                allProduct: 'all-product',
                viewProduct: 'view-product',
                createProduct: 'create-product',
                updateProduct: 'update-product',
                destroyProduct: 'destroy-product',
                full_text_search: '',
                page: 10,
                offset: 4,
                name: '',
                description: '',
                product: '',
                editMode: false,
                showProduct: {
                    category: '',
                    title: '',
                    price: '',
                    description: ''
                },
            }
        },
        mounted() {
            return this.$store.dispatch('Products/getProducts');
        },
        computed: {
            ...mapState({
                per_page: state => state.Products.getProducts.per_page,
                last_page: state => state.Products.getProducts.last_page,
                from: state => state.Products.getProducts.from,
                to: state => state.Products.getProducts.to,
                current_page: state => state.Products.getProducts.current_page,
                total: state => state.Products.getProducts.total,
                products: state => state.Products.getProducts.data,
            }),
            pages() {
                let pagesArray = [];
                var form = this.current_page - this.offset;
                if (form < 1) {
                    form = 1
                }
                var to = form + (this.offset * 2);
                if (to >= this.last_page) {
                    to = this.last_page;
                }
                while (form <= to) {
                    pagesArray.push(form);
                    form++;
                }
                return pagesArray;
            },
            hasPermissionAllProduct() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.allProduct).toString();
            },
            hasPermissionViewProduct() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.viewProduct).toString();
            },
            hasPermissionCreateProduct() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.createProduct).toString();
            },
            hasPermissionUpdateProduct() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.updateProduct).toString();
            },
            hasPermissionDestroyProduct() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.destroyProduct).toString();
            },
        },
        methods: {
            changePage(page) {
                return this.$store.dispatch('Products/getProducts', page);
            },
            closeModal() {
                HelperFunctions.closeModal();
                this.product = '';
            },
            productShow(product) {
                this.showProduct = {
                    category: product.category[0].title,
                    title: product.title,
                    price: product.price,
                    description: product.description
                };
                //console.log(this.showProduct.category[0].title)
            },
            productEdit(product) {
                this.editMode = true;
                this.product = product;
            },
            productDelete(id) {
                return this.$store.dispatch('Products/deleteProduct', {id});
            },
            registerProduct() {
                this.editMode = false;
                this.product = '';
                $('#product-register').toggle();
            },
            onFullTextSearch() {
                const full_text_search = this.full_text_search;
                return this.$store.dispatch('Products/searchProduct', {full_text_search});
            },
        }
    }
</script>

<style scoped>

</style>
