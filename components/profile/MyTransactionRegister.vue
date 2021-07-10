<template>
    <div class="container" id="register" style="display: block;" ref="register">
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-12">
                    <div class="jumbotron shadow-lg">
                        <h3 v-if="!editMode">Register Transactions</h3>
                        <h3 v-if="editMode">Update Transactions</h3>
                        <form @submit.prevent="editMode ? transactionUpdate(transaction) : transactionCreate()">
                            <!---------------------validation------------------->
                            <div class="my-3" v-if="editMode">
                                <!--//-->
                                <div v-if="$v.transaction.transaction_code.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.transaction.transaction_code.required">First Name is
                                        required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.transaction.transaction_code.minLength">Last Name must
                                        have at
                                        least
                                        {{ $v.transaction.transaction_code.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.transaction.transaction_code.maxLength">First Name must
                                        have at
                                        least
                                        {{ $v.transaction.transaction_code.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.transaction.amount.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.transaction.amount.required">Last Name is
                                        required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.transaction.amount.minLength">Last Name must
                                        have at
                                        least
                                        {{ $v.transaction.amount.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.transaction.amount.maxLength">First Name must
                                        have at
                                        least
                                        {{ $v.transaction.amount.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.transaction.bankId.$anyDirty">
                                    <div class="error alert-danger" v-if="!$v.transaction.bankId.required">Username is
                                        required.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.transaction.image.$anyDirty">
                                    <div class="error alert-danger" v-if="!$v.transaction.image.required">Username is
                                        required.
                                    </div>
                                </div>
                                <!--//-->
                            </div>
                            <div class="my-3" v-else>
                                <!--//-->
                                <div v-if="$v.transaction_code.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.transaction_code.required">Transaction Code is
                                        required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.transaction_code.minLength">Transaction Code must
                                        have at
                                        least
                                        {{ $v.transaction_code.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.transaction_code.maxLength">Transaction Code must
                                        have at
                                        least
                                        {{ $v.transaction_code.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.amount.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.amount.required">Amount is
                                        required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.amount.minLength">Amount must
                                        have at
                                        least
                                        {{ $v.amount.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.amount.maxLength">Amount must
                                        have at
                                        least
                                        {{ $v.amount.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.bankId.$anyDirty">
                                    <div class="error alert-danger" v-if="!$v.bankId.required">Bank is
                                        required.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.image.$anyDirty">
                                    <div class="error alert-danger" v-if="!$v.image.required">Image is
                                        required.
                                    </div>
                                </div>
                                <!--//-->
                            </div>
                            <!---------------------end validation------------------->
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group" v-if="editMode">
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.transaction.transaction_code.$error }"
                                               v-model.trim="$v.transaction.transaction_code.$model"
                                               name="transaction_code"
                                               id="transaction-code"
                                               class="form-control" placeholder="Transaction Code">
                                    </div>
                                    <div class="form-group" v-else>
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.transaction_code.$error }"
                                               v-model.trim="$v.transaction_code.$model"
                                               name="transaction_code"
                                               id="transaction-code"
                                               class="form-control" placeholder="Transaction Code">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group" v-if="editMode">
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.transaction.amount.$error }"
                                               v-model.trim="$v.transaction.amount.$model"
                                               name="amount"
                                               id="amount"
                                               class="form-control"
                                               placeholder="Amount">
                                    </div>
                                    <div class="form-group" v-else>
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.amount.$error }"
                                               v-model.trim="$v.amount.$model"
                                               name="amount"
                                               id="amount"
                                               class="form-control"
                                               placeholder="Amount">
                                    </div>
                                </div>
                                <!--//-->
                                <div class="col-md-4">
                                    <div class="form-group" v-if="editMode">
                                        <select
                                                :class="{ 'form-group--error': $v.transaction.bankId.$error }"
                                                v-model.trim="$v.transaction.bankId.$model"
                                                name="bankId"
                                                id="bankId"
                                                class="form-control">
                                            <option value="">Please Select Bank</option>
                                            <option v-for="bank in banks" :value="bank.id"
                                                    v-text="bank.title">
                                            </option>
                                        </select>
                                    </div>
                                    <!--//-->
                                    <div class="form-group" v-else>
                                        <select
                                                :class="{ 'form-group--error': $v.bankId.$error }"
                                                v-model.trim="$v.bankId.$model"
                                                name="bankId"
                                                id="bankId"
                                                class="form-control">
                                            <option value="">Please Select Bank</option>
                                            <option v-for="bank in banks" :value="bank.id"
                                                    v-text="bank.title">
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <!--//-->
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="file" @change="onFileSelected" name="image" id="image"
                                               class="form-control">
                                    </div>
                                    <div v-if="isSelected !== false">
                                        <img class="rounded-circle" :src="showImage"
                                             style="width: 100px; height: 100px">
                                    </div>
                                </div>

                            </div>
                            <!--//-->
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <button v-if="!editMode" class="btn btn-success" type="submit">Register</button>
                                        <button v-if="editMode" class="btn btn-primary" type="submit">Update</button>
                                        <p class="typo__p alert-success" v-if="submitStatus === 'OK'">Registered is
                                            successfully!</p>
                                        <p class="typo__p alert-danger" v-if="submitStatus === 'ERROR'">Please fill the
                                            form correctly.</p>
                                        <p class="typo__p alert-warning" v-if="submitStatus === 'PENDING'">
                                            Sending...</p>
                                    </div>
                                </div>
                            </div>
                            <!--//-->
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {
        required,
        minLength,
        maxLength,
    } from 'vuelidate/lib/validators';

    export default {
        middleware: 'auth',
        layout: 'profile',
        name: "MyTransactionRegister",
        data() {
            return {
                id: '',
                transaction_code: '',
                bankId: '',
                amount: '',
                image: '',
                isSelected: false,
                showImage: '',
                submitStatus: '',
            }
        },
        validations: {
            transaction: {
                transaction_code: {
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(25)
                },
                bankId: {
                    required,
                },
                amount: {
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(25)
                },
                image: {
                    required,
                },
            },
            transaction_code: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(25)
            },
            bankId: {
                required,
            },
            amount: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(25)
            },
            image: {
                required,
            },
        },
        mounted() {
            return this.$store.dispatch('Banks/allBanks')
        },
        props: ['transaction', 'editMode'],
        computed: {
            ...mapState({
                banks: state => state.Banks.allBanks.data,
            })
        },
        methods: {
            onFileSelected(event) {
                this.image = event.target.files[0];
                let fileReader = new FileReader();
                fileReader.readAsDataURL(this.image);
                fileReader.onload = (e) => {
                    this.showImage = e.target.result;
                };
                this.isSelected = true;
            },
            transactionCreate() {
                /*this.$v.$touch();
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    this.submitStatus = 'PENDING';
                    setTimeout(() => {
                        this.submitStatus = 'OK'
                    }, 500);*/
                const isRegister = {
                    transaction_code: this.transaction_code,
                    bankId: this.bankId,
                    amount: this.amount,
                    image: this.image,
                };
                return this.$store.dispatch('Transactions/myTransactionRegister', isRegister)
                    .then(() => {
                        this.transaction_code = '';
                        this.amount = '';
                        this.image = '';
                    })
                //}
            },
            transactionUpdate(transaction) {
                const isUpdate = {
                    transaction_code: transaction.transaction_code,
                    bankId: transaction.bankId,
                    amount: transaction.amount,
                    image: transaction.image,
                };
                return this.$store.dispatch('Transactions/myTransactionUpdate', isUpdate)
            },
        }
    }
</script>

<style scoped>

</style>
