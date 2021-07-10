<template>
    <div class="container">
        <!--ProductRegister-->
        <MyTransactionRegister :transaction="transaction" :editMode="editMode"></MyTransactionRegister>
        <!--//-->
        <div class="row">
            <!--//-->
            <div class="col-md-12 text-center">
                <div class="row">
                    <div class="col-md-4">
                        <h3>Transactions Register</h3>
                    </div>
                    <div class="col-md-3 offset-5">
                        <button @click="registerTransaction()" class="btn btn-success">
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
                    <th>Transaction Code</th>
                    <th>Amount</th>
                    <th>Image</th>
                    <th>State</th>
                    <th>Confirmed At</th>
                    <th>Created At / Updated At</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody class="text-center">
                <tr v-for="(transaction, index) in transactions" :key="transaction.id">
                    <td>{{ index }}</td>
                    <td v-text="transaction.transaction_code"></td>
                    <td v-text="transaction.amount"></td>
                    <td>
                        <img class="rounded-circle" :src="transaction.image" style="width: 50px; height: 50px">
                    </td>
                    <td>
                        <button v-if="transaction.state === 'ACTIVE'" class="btn btn-success btn-sm disabled"
                                v-text="transaction.state">ACTIVE
                        </button>
                        <button v-if="transaction.state === 'INACTIVE'" class="btn btn-warning btn-sm disabled"
                                v-text="transaction.state">INACTIVE
                        </button>
                        <button v-if="transaction.state === 'SUSPENDED'" class="btn btn-secondary btn-sm disabled"
                                v-text="transaction.state">SUSPENDED
                        </button>
                        <button v-if="transaction.state === 'PENDING'" class="btn btn-danger btn-sm disabled"
                                v-text="transaction.state">PENDING
                        </button>
                    </td>
                    <td v-text="transaction.confirmedAt"></td>
                    <td>{{ transaction.createdAt + ' ' + transaction.updatedAt }}</td>
                    <td>
                        <a @click="transactionShow(transaction)" data-toggle="modal" data-target="#exampleModal">
                            <i class="fas fa-eye text-primary"></i>
                        </a>

                        <!-- <ProductCategoryShow :showCategory="showCategory"></ProductCategoryShow>-->
                        /
                        <a href="#register" @click="transactionEdit(transaction)"><i
                                class="fas fa-pen text-success"></i></a>
                        /
                        <a @click="transactionDelete(transaction.id)"><i class="fas fa-trash text-danger"></i></a>
                    </td>
                </tr>
                </tbody>
                <thead class="text-center">
                <tr>
                    <th>#</th>
                    <th>Transaction Code</th>
                    <th>Amount</th>
                    <th>Image</th>
                    <th>State</th>
                    <th>Confirmed At</th>
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
    import MyTransactionRegister from '../../../components/profile/MyTransactionRegister';
    //import ProductCategoryShow from '../../../components/panel/modal/ProductCategoryShow';
    import {mapState} from 'vuex'
    import HelperFunctions from '../../../helpers/HelperFunctions';

    window.$ = $;
    export default {
        //middleware: 'auth',
        layout: 'profile',
        name: "Index",
        components: {MyTransactionRegister},
        data() {
            return {
                full_text_search: '',
                page: 1,
                transaction: {},
                //transactions: {},
                offset: 4,
                name: '',
                description: '',
                editMode: false,
                showCategory: {
                    brand: '',
                    title: '',
                    description: ''
                },
            }
        },
        mounted() {
            return this.$store.dispatch('Transactions/myTransactions');
        },
        computed: {
            ...mapState({
                transactions: state => state.Transactions.myTransactions.data,
                per_page: state => state.Transactions.myTransactions.per_page,
                last_page: state => state.Transactions.myTransactions.last_page,
                from: state => state.Transactions.myTransactions.from,
                to: state => state.Transactions.myTransactions.to,
                current_page: state => state.Transactions.myTransactions.current_page,
                total: state => state.Transactions.myTransactions.total,
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
        },
        methods: {
            changePage(page) {
                return this.$store.dispatch('Transactions/myTransactions', page);
            },
            closeModal() {
                HelperFunctions.closeModal();
            },
            transactionShow(category) {
                this.showCategory = {
                    brand: category.brand[0].title,
                    title: category.title,
                    description: category.description
                };
            },
            transactionEdit(category) {
                this.editMode = true;
                this.category = category;
            },
            transactionDelete(id) {
                return this.$store.dispatch('Transactions/deleteMyTransactions', {id});
            },
            registerTransaction() {
                this.editMode = false;
                this.transaction = '';
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
