<template>
    <div class="container">
        <!--UserRegister-->
        <BrandRegister v-if="hasPermissionCreateBrand === createBrand"></BrandRegister>
        <!--//-->
        <div class="row">
            <div class="col-md-12 text-center">
                <div class="row">
                    <div class="col-md-4">
                        <h3>Brands Register</h3>
                    </div>
                    <div v-if="hasPermissionCreateBrand === createBrand" class="col-md-3 offset-5">
                        <button @click="registerBrand()" class="btn btn-success">
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
                    <th>Name</th>
                    <th>Description</th>
                    <th>Employee</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Created At / Updated At</th>
                    <th>Option</th>
                </tr>
                </thead>
                <tbody class="text-center">
                <tr v-if="hasPermissionAllBrand === allBrand"
                    v-for="(brand, index) in brands" :key="brand.id">
                    <td>{{ index }}</td>
                    <td v-text="brand.name"></td>
                    <td v-text="brand.description"></td>
                    <td v-text="brand.Employee.username"></td>
                    <td>
                        <img class="rounded-circle" :src="brand.image" style="width: 50px; height: 50px">
                    </td>
                    <td>
                        <button v-if="brand.state === 'ACTIVE'" class="btn btn-success btn-sm disabled"
                                v-text="brand.state">ACTIVE
                        </button>
                        <button v-if="brand.state === 'INACTIVE'" class="btn btn-warning btn-sm disabled"
                                v-text="brand.state">INACTIVE
                        </button>
                        <button v-if="brand.state === 'SUSPENDED'" class="btn btn-secondary btn-sm disabled"
                                v-text="brand.state">SUSPENDED
                        </button>
                        <button v-if="brand.state === 'PENDING'" class="btn btn-danger btn-sm disabled"
                                v-text="brand.state">PENDING
                        </button>
                    </td>
                    <td>{{ brand.createdAt + ' ' + brand.updatedAt }}</td>
                    <td>
                        <a v-if="hasPermissionViewBrand === viewBrand"
                           @click="brandShow(brand.id)" data-toggle="modal" data-target="#exampleModal">
                            <i class="fas fa-eye text-primary"></i>
                        </a>

                        <BrandShow v-if="hasPermissionViewBrand === viewBrand"
                                   :showBrand="showBrand">
                        </BrandShow>
                        /
                        <a v-if="hasPermissionUpdateBrand === updateBrand"
                           href="#register" @click="brandEdit(brand.id)"><i class="fas fa-pen text-success"></i>
                        </a>
                        /
                        <a v-if="hasPermissionDestroyBrand === destroyBrand"
                           @click="brandDelete(brand.id)"><i class="fas fa-trash text-danger"></i>
                        </a>
                    </td>
                </tr>
                </tbody>
                <thead class="text-center">
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Employee</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Created At / Updated At</th>
                    <th>Option</th>
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
    import BrandRegister from '../../components/panel/BrandRegister';
    import BrandShow from '../../components/panel/modal/BrandShow';
    import {BrandService} from '../../services/panel/BrandService';
    import {mapState} from 'vuex';
    import HelperFunctions from '../../helpers/HelperFunctions';

    window.$ = $;
    export default {
        //middleware: 'checkAuthEmployee',
        middleware: 'auth',
        layout: 'panel',
        name: "Brands",
        components: {BrandRegister, BrandShow},
        data() {
            return {
                allBrand: 'all-brand',
                viewBrand: 'view-brand',
                createBrand: 'create-brand',
                updateBrand: 'update-brand',
                destroyBrand: 'destroy-brand',
                full_text_search: '',
                page: 1,
                employee: {},
                employees: {},
                getUsers: {},
                offset: 4,
                name: '',
                description: '',
                showBrand: {
                    title: '',
                    description: '',
                }
            }
        },
        mounted() {
            return this.$store.dispatch('Brands/getBrands');
        },
        computed: {
            ...mapState({
                per_page: state => state.Brands.getBrands.per_page,
                last_page: state => state.Brands.getBrands.last_page,
                from: state => state.Brands.getBrands.from,
                to: state => state.Brands.getBrands.to,
                current_page: state => state.Brands.getBrands.current_page,
                total: state => state.Brands.getBrands.total,
                brands: state => state.Brands.getBrands.data,
                //showBrand: state => state.Brands.isUser,
                //editBrand: state => state.Brands.isUser,
                //deleteUser: state => state.Users.isUser,
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
            hasPermissionAllBrand() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.allBrand).toString();
            },
            hasPermissionViewBrand() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.viewBrand).toString();
            },
            hasPermissionCreateBrand() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.createBrand).toString();
            },
            hasPermissionUpdateBrand() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.updateBrand).toString();
            },
            hasPermissionDestroyBrand() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.destroyBrand).toString();
            },
        },
        methods: {
            changePage(page) {
                /*this.$store.state.current_page = page;
                console.log(this.$store.state.current_page);*/
                //this.current_page = page;
                return this.$store.dispatch('Brands/getBrands', page);
            },
            closeModal() {
                HelperFunctions.closeModal();
            },
            userAll() {
                this.getUsers = BrandService.All()
            },
            userPaginate() {

            },
            brandShow(brand) {
                this.showBrand = {
                    title: brand.title,
                    description: brand.description,
                }
            },
            brandEdit(id) {
                return this.$store.dispatch('Brands/editBrand', {id});
            },
            brandDelete(id) {
                return this.$store.dispatch('Brands/deleteBrand', {id});
            },
            registerBrand() {
                $('#user-register').toggle();
            },
            onFullTextSearch() {
                const full_text_search = this.full_text_search;
                return this.$store.dispatch('Brands/searchBrand', {full_text_search});
            },
        }
    }
</script>

<style scoped>

</style>
