<template>
    <div class="container">
        <!--UserRegister-->
        <ArticleCategoryRegister v-if="hasPermissionCreateArticleCategory === createArticleCategory"></ArticleCategoryRegister>
        <!--//-->
        <div class="row">
            <div class="col-md-12 text-center">
                <div class="row">
                    <div class="col-md-4">
                        <h3>Product Register</h3>
                    </div>
                    <div v-if="hasPermissionCreateArticleCategory === createArticleCategory" class="col-md-3 offset-5">
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
                    <th>Author</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Created At / Updated At</th>
                    <th>Option</th>
                </tr>
                </thead>
                <tbody class="text-center">
                <tr v-if="hasPermissionAllArticleCategory === allArticleCategory"
                    v-for="(category, index) in categories" :key="category.id">
                    <td>{{ index }}</td>
                    <!--<td v-text="category.Employee.username.substring(0, 5)"></td>
                    <td v-text="category.name.substring(0, 5)"></td>
                    <td v-text="category.description.substring(0, 5)"></td>-->
                    <td v-text="category.Employee.username"></td>
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
                        <a v-if="hasPermissionViewArticleCategory === viewArticleCategory"
                           @click="categoryShow(category)"
                           data-toggle="modal"
                           data-target="#exampleModal">
                            <i class="fas fa-eye text-primary"></i>
                        </a>

                        <ArticleCategoryShow
                                v-if="hasPermissionViewArticleCategory === viewArticleCategory"
                                             :showCategory="showCategory">
                        </ArticleCategoryShow>
                        /
                        <a v-if="hasPermissionUpdateArticleCategory === updateArticleCategory"
                           href="#register"
                           @click="categoryEdit(category.id)">
                            <i class="fas fa-pen text-success"></i>
                        </a>
                        /
                        <a v-if="hasPermissionDestroyArticleCategory === destroyArticleCategory"
                           @click="categoryDelete(category.id)"><i class="fas fa-trash text-danger"></i></a>
                    </td>
                </tr>
                </tbody>
                <thead class="text-center">
                <tr>
                    <th>#</th>
                    <th>Author</th>
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
    <!--//-->
</template>

<script>
    import $ from 'jquery';
    import ArticleCategoryRegister from '../../components/panel/ArticleCategoryRegister';
    import ArticleCategoryShow from '../../components/panel/modal/ArticleCategoryShow';
    import {ArticleCategoryService} from '../../services/panel/ArticleCategoryService';
    import HelperFunctions from '../../helpers/HelperFunctions';

    import {mapState} from 'vuex'

    window.$ = $;
    export default {
        //middleware: 'checkAuthEmployee',
        layout: 'panel',
        name: "Users",
        components: {ArticleCategoryRegister, ArticleCategoryShow},
        data() {
            return {
                allArticleCategory: 'all-article-category',
                viewArticleCategory: 'view-article-category',
                createArticleCategory: 'create-article-category',
                updateArticleCategory: 'update-article-category',
                destroyArticleCategory: 'destroy-article-category',
                permissions: '',
                full_text_search: '',
                page: 1,
                employee: {},
                employees: {},
                offset: 4,
                name: '',
                description: '',
                showCategory: {
                    title: '',
                    description: '',
                    author: '',
                }
            }
        },
        mounted() {
            return this.$store.dispatch('ArticleCategories/getArticleCategories');
        },
        computed: {
            ...mapState({
                per_page: state => state.ArticleCategories.getArticleCategories.per_page,
                last_page: state => state.ArticleCategories.getArticleCategories.last_page,
                from: state => state.ArticleCategories.getArticleCategories.from,
                to: state => state.ArticleCategories.getArticleCategories.to,
                current_page: state => state.ArticleCategories.getArticleCategories.current_page,
                total: state => state.ArticleCategories.getArticleCategories.total,
                categories: state => state.ArticleCategories.getArticleCategories.data,
                //showCategory: state => state.ArticleCategories.isUser,
                //editUser: state => state.ArticleCategories.isUser,
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
            hasPermissionAllArticleCategory() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.allArticleCategory).toString();
            },
            hasPermissionViewArticleCategory() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.viewArticleCategory).toString();
            },
            hasPermissionCreateArticleCategory() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.createArticleCategory).toString();
            },
            hasPermissionUpdateArticleCategory() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.updateArticleCategory).toString();
            },
            hasPermissionDestroyArticleCategory() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.destroyArticleCategory).toString();
            },
        },
        methods: {
            closeModal() {
                HelperFunctions.closeModal();
            },
            categoryShow(category) {
                this.showCategory = {
                    title: category.title,
                    description: category.description,
                    author: category.author[0].username,
                }
            },
            categoryEdit(id) {
                return this.$store.dispatch('ArticleCategories/editUser', {id});
            },
            categoryDelete(id) {
                return this.$store.dispatch('ArticleCategories/deleteUser', {id});
            },
            registerCategory() {
                $('#article-categories-register').toggle();
            },
            onFullTextSearch() {
                const full_text_search = this.full_text_search;
                return this.$store.dispatch('ArticleCategories/searchArticleCategory', {full_text_search});
            },
        }
    }
</script>

<style scoped>

</style>
