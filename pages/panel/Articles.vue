<template>
    <div class="container">
        <!--UserRegister-->
        <ArticleRegister v-if="hasPermissionCreateArticle === createArticle" :article="article" :editMode="editMode"></ArticleRegister>
        <!--//-->
        <div class="row">
            <div class="col-md-12 text-center">
                <div class="row">
                    <div class="col-md-4">
                        <h3>Product Register</h3>
                    </div>
                    <div v-if="hasPermissionCreateArticle === createArticle" class="col-md-3 offset-5">
                        <button @click="registerUser()" class="btn btn-success">
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
                    <th>Category Name</th>
                    <th>Employee Name</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Created At / Updated At</th>
                    <th>Option</th>
                </tr>
                </thead>
                <tbody class="text-center">
                <tr v-if="hasPermissionAllArticle === allArticle"
                    v-for="(article, index) in articles" :key="article.id">
                    <td>{{ index }}</td>
                    <!--          <td v-text="article.Category.name.substring(0, 10)"></td>
                              <td v-text="article.Employee.username.substring(0, 10)"></td>
                              <td v-text="article.name.substring(0, 10)"></td>
                              <td v-text="article.description.substring(0, 10)"></td>-->
                    <td v-text="article.ArticleCategory.name"></td>
                    <td v-text="article.Employee.username"></td>
                    <td v-text="article.name"></td>
                    <td v-text="article.description"></td>
                    <td>
                        <img class="rounded-circle" :src="article.image" style="width: 50px; height: 50px">
                    </td>
                    <td>
                        <button v-if="article.status === 'ACTIVE'" class="btn btn-success btn-sm disabled"
                                v-text="article.status">ACTIVE
                        </button>
                        <button v-if="article.status === 'INACTIVE'" class="btn btn-warning btn-sm disabled"
                                v-text="article.status">INACTIVE
                        </button>
                        <button v-if="article.status === 'SUSPENDED'" class="btn btn-secondary btn-sm disabled"
                                v-text="article.status">SUSPENDED
                        </button>
                        <button v-if="article.status === 'PENDING'" class="btn btn-danger btn-sm disabled"
                                v-text="article.status">PENDING
                        </button>
                    </td>
                    <td>{{ article.createdAt + ' ' + article.updatedAt }}</td>
                    <td>
                        <a v-if="hasPermissionViewArticle ===viewArticle"
                           @click="" data-toggle="modal" data-target="#exampleModal">
                            <i class="fas fa-eye text-primary"></i>
                        </a>

                        <!--<ArticleShow v-if="hasPermissionAllArticle === allArticle"
                        :showArticle="showArticle"></ArticleShow>-->
                        /
                        <a v-if="hasPermissionUpdateArticle === updateArticle"
                           href="#register" @click=""><i class="fas fa-pen text-success"></i></a>
                        /
                        <a v-if="hasPermissionDestroyArticle === destroyArticle"
                           @click=""><i class="fas fa-trash text-danger"></i></a>
                    </td>
                </tr>
                </tbody>
                <thead class="text-center">
                <tr>
                    <th>#</th>
                    <th>Category Name</th>
                    <th>Employee Name</th>
                    <th>Name</th>
                    <th>Description</th>
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
    import ArticleRegister from '../../components/panel/ArticleRegister';
    import ArticleShow from '../../components/panel/modal/ArticleShow';
    import {mapState} from 'vuex';
    import HelperFunctions from '../../helpers/HelperFunctions';

    window.$ = $;
    export default {
        //middleware: 'auth',
        layout: 'panel',
        name: "Users",
        components: {ArticleRegister, ArticleShow},
        data() {
            return {
                allArticle: 'all-article',
                viewArticle: 'view-article',
                createArticle: 'create-article',
                updateArticle: 'update-article',
                destroyArticle: 'destroy-article',
                permissions: '',
                full_text_search: '',
                page: 1,
                employee: {},
                employees: {},
                getUsers: {},
                offset: 4,
                name: '',
                description: '',
                article: '',
                editMode: false,
                showBrand: {
                    title: '',
                    description: '',
                }
            }
        },
        mounted() {
            return this.$store.dispatch('Articles/getArticles');
        },
        computed: {
            ...mapState({
                per_page: state => state.Articles.getArticles.per_page,
                last_page: state => state.Articles.getArticles.last_page,
                from: state => state.Articles.getArticles.from,
                to: state => state.Articles.getArticles.to,
                current_page: state => state.Articles.getArticles.current_page,
                total: state => state.Articles.getArticles.total,
                articles: state => state.Articles.getArticles.data,
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
            hasPermissionAllArticle() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.allArticle).toString();
            },
            hasPermissionViewArticle() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.viewArticle).toString();
            },
            hasPermissionCreateArticle() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.createArticle).toString();
            },
            hasPermissionUpdateArticle() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.updateArticle).toString();
            },
            hasPermissionDestroyArticle() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.destroyArticle).toString();
            },
        },
        methods: {
            changePage(page) {
                /*this.$store.state.current_page = page;
                console.log(this.$store.state.current_page);*/
                //this.current_page = page;
                return this.$store.dispatch('Articles/getArticles', page);
            },
            closeModal() {
                HelperFunctions.closeModal();
            },
            brandShow(brand) {
                this.showBrand = {
                    title: brand.title,
                    description: brand.description,
                }
            },
            articleEdit(id) {
                return this.$store.dispatch('Articles/editBrand', {id});
            },
            articleDelete(id) {
                return this.$store.dispatch('Articles/deleteBrand', {id});
            },
            registerArticle() {
                $('#user-register').toggle();
            },
            onFullTextSearch() {
                const full_text_search = this.full_text_search;
                return this.$store.dispatch('Articles/searchBrand', {full_text_search});
            },
        }
    }
</script>

<style scoped>

</style>
