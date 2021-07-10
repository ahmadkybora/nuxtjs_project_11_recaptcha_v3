<template>
    <div class="container">
        <!--ProductRegister-->
        <ProductCategoryRegister v-if="hasPermissionCreateProductCategory === createProductCategory" :category="category" :editMode="editMode"></ProductCategoryRegister>
        <!--//-->
        <div class="row">
            <!--//-->
            <div class="col-md-12 text-center">
                <div class="row">
                    <div class="col-md-4">
                        <h3>Product Categories Register</h3>
                    </div>
                    <div v-if="hasPermissionCreateProductCategory === createProductCategory" class="col-md-3 offset-5">
                        <button @click="registerCategory()" class="btn btn-success">
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
            <table class="table table-striped tab-content table-bordered table-responsive">
                <thead class="text-center">
                <tr>
                    <th>#</th>
                    <th>Brand</th>
                    <th>Employee</th>
                    <th>name</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>State</th>
                    <th>Created At / Updated At</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody class="text-center">
                <tr v-if="hasPermissionAllProductCategory === allProductCategory"
                    v-for="(category, index) in categories.data"
                    :key="category.id">
                    <td>{{ index }}</td>
                    <td v-text="category.Brand.name"></td>
                    <td v-text="category.Employee.username"></td>
                    <!--          <td v-text="category.name.substring(0, 10)"></td>
                              <td v-text="category.description.substring(0, 10)"></td>-->
                    <td v-text="category.name"></td>
                    <td v-text="category.description"></td>
                    <td>
                        <img class="rounded-circle" :src="category.image" style="width: 50px; height: 50px">
                    </td>
                    <td>
                        <button v-if="category.state === 'ACTIVE'" class="btn btn-success btn-sm disabled"
                                v-text="category.state">ACTIVE
                        </button>
                        <button v-if="category.state === 'INACTIVE'" class="btn btn-warning btn-sm disabled"
                                v-text="category.state">INACTIVE
                        </button>
                        <button v-if="category.state === 'SUSPENDED'" class="btn btn-secondary btn-sm disabled"
                                v-text="category.state">SUSPENDED
                        </button>
                        <button v-if="category.state === 'PENDING'" class="btn btn-danger btn-sm disabled"
                                v-text="category.state">PENDING
                        </button>
                    </td>
                    <td>{{ category.createdAt + ' ' + category.updatedAt }}</td>
                    <td>
                        <a v-if="hasPermissionViewProductCategory === viewProductCategory"
                           @click="categoryShow(category)"
                           data-toggle="modal"
                           data-target="#exampleModal">
                            <i class="fas fa-eye text-primary"></i>
                        </a>

                        <ProductCategoryShow v-if="hasPermissionViewProductCategory === viewProductCategory"
                                             :showCategory="showCategory">
                        </ProductCategoryShow>
                        /
                        <a v-if="hasPermissionUpdateProductCategory === updateProductCategory"
                           href="#register"
                           @click="categoryEdit(category)"><i class="fas fa-pen text-success"></i>
                        </a>
                        /
                        <a v-if="hasPermissionDestroyProductCategory === destroyProductCategory"
                           @click="categoryDelete(category.id)"><i class="fas fa-trash text-danger"></i>
                        </a>
                    </td>
                </tr>
                </tbody>
                <thead class="text-center">
                <tr>
                    <th>#</th>
                    <th>Brand</th>
                    <th>Employee</th>
                    <th>name</th>
                    <th>Description</th>
                    <th>Image</th>
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
    import ProductCategoryRegister from '../../components/panel/ProductCategoryRegister';
    import ProductCategoryShow from '../../components/panel/modal/ProductCategoryShow';
    import {ProductCategoryService} from '../../services/panel/ProductCategoryService';
    import {mapState} from 'vuex'
    import HelperFunctions from '../../helpers/HelperFunctions';

    window.$ = $;
    export default {
        //middleware: 'checkAuthEmployee',
        layout: 'panel',
        name: "ProductCategories",
        components: {ProductCategoryRegister, ProductCategoryShow},
        data() {
            return {
                allProductCategory: 'all-product-category',
                viewProductCategory: 'view-product-category',
                createProductCategory: 'create-product-category',
                updateProductCategory: 'update-product-category',
                destroyProductCategory: 'destroy-product-category',
                full_text_search: '',
                page: 1,
                employee: {},
                employees: {},
                offset: 4,
                name: '',
                description: '',
                category: '',
                editMode: false,
                showCategory: {
                    brand: '',
                    title: '',
                    description: ''
                },
            }
        },
        mounted() {
            return this.$store.dispatch('ProductCategories/getProductCategories');
        },
        computed: {
            ...mapState({
                categories: state => state.ProductCategories.getProductCategories,
                per_page: state => state.ProductCategories.getProductCategories.per_page,
                last_page: state => state.ProductCategories.getProductCategories.last_page,
                from: state => state.ProductCategories.getProductCategories.from,
                to: state => state.ProductCategories.getProductCategories.to,
                current_page: state => state.ProductCategories.getProductCategories.current_page,
                total: state => state.ProductCategories.getProductCategories.total,
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
            hasPermissionAllProductCategory() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.allProductCategory).toString();
            },
            hasPermissionViewProductCategory() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.viewProductCategory).toString();
            },
            hasPermissionCreateProductCategory() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.createProductCategory).toString();
            },
            hasPermissionUpdateProductCategory() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.updateProductCategory).toString();
            },
            hasPermissionDestroyProductCategory() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.destroyProductCategory).toString();
            },
        },
        methods: {
            closeModal() {
                HelperFunctions.closeModal();
            },
            categoryShow(category) {
                this.showCategory = {
                    brand: category.brand[0].title,
                    title: category.title,
                    description: category.description
                };
            },
            categoryEdit(category) {
                this.editMode = true;
                this.category = category;
            },
            categoryDelete(id) {
                return this.$store.dispatch('ProductCategories/deleteCategory', {id});
            },
            registerCategory() {
                this.editMode = false;
                this.category = '';
                $('#user-register').toggle();
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
