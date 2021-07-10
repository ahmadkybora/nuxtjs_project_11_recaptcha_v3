<template>
    <div class="container" id="register" style="display: block;" ref="register">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="jumbotron">
                        <h3 v-if="!editMode">Register Articles</h3>
                        <h3 v-if="editMode">Update Articles</h3>

                        <form @submit.prevent="editMode ? articleUpdate(article) : articleCreate()">
                            <!---------------------validation------------------->
                            <div class="my-3" v-if="editMode">
                                <!--//-->
                                <div v-if="$v.product.name.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.name.required">Name is required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.name.minLength">Name must have at least
                                        {{ $v.name.$params.minLength.min }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.employeeId.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.employeeId.required">Employee is required.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.description.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.description.required">Description is
                                        required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.description.minLength">Name must have at
                                        least
                                        {{ $v.description.$params.minLength.min }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.state.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.state.required">Status is required.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.employee.first_name.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.image.required">Image is required.
                                    </div>
                                </div>
                                <!--//-->
                            </div>
                            <div class="my-3" v-else>
                                <!--//-->
                                <div v-if="$v.name.$anyDirty">
                                    <div class="error alert-danger" v-if="!$v.name.required">Name is required.</div>
                                    <div class="error alert-danger" v-if="!$v.name.minLength">Name must have at least
                                        {{ $v.name.$params.minLength.min }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.employeeId.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.employeeId.required">Employee is required.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.categoryId.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.categoryId.required">Category is required.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.description.$anyDirty">
                                    <div class="error alert-danger" v-if="!$v.description.required">Description is
                                        required.
                                    </div>
                                    <div class="error alert-danger" v-if="!$v.description.minLength">Name must have at
                                        least
                                        {{ $v.description.$params.minLength.min }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.state.$anyDirty">
                                    <div class="error alert-danger" v-if="!$v.state.required">Status is required.</div>
                                </div>
                                <!--//-->
                                <div v-if="$v.image.$anyDirty">
                                    <div class="error alert-danger" v-if="!$v.image.required">Image is required.</div>
                                </div>
                                <!--//-->
                            </div>
                            <!---------------------end validation------------------->
                            <!--//-->
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group" v-if="editMode">
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.product.name.$error }"
                                               v-model.trim="$v.product.name.$model"
                                               name="name"
                                               id="name"
                                               class="form-control form__input"
                                               placeholder="Insert Title">
                                    </div>
                                    <div class="form-group" v-else>
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.name.$error }"
                                               v-model.trim="$v.name.$model"
                                               name="name"
                                               id="title"
                                               class="form-control form__input"
                                               placeholder="Insert Title">
                                    </div>
                                </div>
                                <!--//-->
                                <div class="col-md-4">
                                    <div class="form-group" v-if="editMode">
                                        <select :class="{ 'form-group--error': $v.product.categoryId.$error }"
                                                v-model.trim="$v.product.categoryId.$model"
                                                name="categoryId"
                                                id="categoryId"
                                                class="form-control form__input">
                                            <option value="">Please Select Category</option>
                                            <option v-for="category in categories" :value="category.id"
                                                    v-text="category.name">
                                            </option>
                                        </select>
                                    </div>
                                    <!--//-->
                                    <div class="form-group" v-else>
                                        <select :class="{ 'form-group--error': $v.categoryId.$error }"
                                                v-model.trim="$v.categoryId.$model"
                                                name="categoryId"
                                                id="categoryId"
                                                class="form-control form__input">
                                            <option value="">Please Select Category</option>
                                            <option v-for="category in categories" :value="category.id"
                                                    v-text="category.name"></option>
                                        </select>
                                    </div>
                                </div>
                                <!--//-->
                                <div class="col-md-4">
                                    <div class="form-group" v-if="editMode">
                                        <select :class="{ 'form-group--error': $v.product.employeeId.$error }"
                                                v-model.trim="$v.product.employeeId.$model"
                                                name="employeeId"
                                                id="employeeId"
                                                class="form-control">
                                            <option value="">Please Select Employee</option>
                                            <option v-for="employee in employees" :value="employee.id"
                                                    v-text="employee.name">
                                            </option>
                                        </select>
                                    </div>
                                    <!--//-->
                                    <div class="form-group" v-else>
                                        <select :class="{ 'form-group--error': $v.employeeId.$error }"
                                                v-model.trim="$v.employeeId.$model"
                                                name="employeeId"
                                                id="employeeId"
                                                class="form-control">
                                            <option value="">Please Select Employee</option>
                                            <option v-for="employee in employees" :value="employee.id"
                                                    v-text="employee.username">
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <!--//-->
                            </div>
                            <!--//-->
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group" v-if="editMode">
                                    <textarea :class="{ 'form-group--error': $v.description.$error }"
                                              v-model.trim="$v.description.$model"
                                              name="description"
                                              id="description"
                                              class="form-control form__input"
                                              placeholder="Description"
                                              rows="7">
                                    </textarea>
                                    </div>
                                    <!--//-->
                                    <div class="form-group" v-else>
                                    <textarea :class="{ 'form-group--error': $v.description.$error }"
                                              v-model.trim="$v.description.$model"
                                              name="description"
                                              id="description"
                                              class="form-control form__input"
                                              placeholder="Description"
                                              rows="7">
                                    </textarea>
                                    </div>
                                </div>
                            </div>
                            <!--//-->
                            <div class="row">
                                <!--//-->
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <div class="form-check">
                                            <input class="form-check-input"
                                                   type="radio"
                                                   v-model="state"
                                                   name="status"
                                                   id="ACTIVE"
                                                   value="ACTIVE">
                                            <label class="form-check-label" for="ACTIVE">
                                                ACTIVE
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input"
                                                   type="radio"
                                                   v-model="state"
                                                   name="status"
                                                   id="INACTIVE"
                                                   value="INACTIVE">
                                            <label class="form-check-label" for="INACTIVE">
                                                INACTIVE
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" v-model="state"
                                                   name="status" id="SUSPENDED" value="SUSPENDED">
                                            <label class="form-check-label" for="SUSPENDED">
                                                SUSPENDED
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" v-model="state"
                                                   name="status" id="PENDING" value="PENDING">
                                            <label class="form-check-label" for="PENDING">
                                                PENDING
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <!--//-->
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="file"
                                               @change="onFileSelected"
                                               name="image"
                                               id="image"
                                               class="form-control">
                                    </div>
                                    <div v-if="isSelected !== false">
                                        <img class="rounded-circle" :src="showImage"
                                             style="width: 100px; height: 100px">
                                    </div>
                                </div>
                                <!--//-->
                            </div>
                            <!--//-->
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <button v-if="!editMode" class="btn btn-success" type="submit">Register</button>
                                        <button v-if="editMode" class="btn btn-primary" type="submit">Update</button>
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
        between
    } from 'vuelidate/lib/validators';

    export default {
        middleware: 'checkAuthEmployee',
        name: "BrandRegister",
        mounted() {
            this.$store.dispatch('Employees/allEmployees');
            return this.$store.dispatch('ArticleCategories/allArticleCategories');
        },
        data() {
            return {
                name: '',
                employeeId: '',
                categoryId: '',
                description: '',
                state: '',
                image: '',
                submitStatus: '',
                isSelected: false,
                showImage: '',
            }
        },
        validations: {
            name: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(255)
            },
            employeeId: {
                required,
            },
            categoryId: {
                required,
            },
            description: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(255)
            },
            state: {
                required,
            },
            image: {
                required,
            },
        },
        computed: {
            ...mapState({
                employees: state => state.Employees.allEmployees.data,
                categories: state => state.ArticleCategories.allArticleCategories.data,
            })
        },
        props: ['product', 'editMode'],
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
            articleCreate() {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    this.submitStatus = 'PENDING';
                    setTimeout(() => {
                        this.submitStatus = 'OK'
                    }, 500);
                    const isRegister = {
                        name: this.name,
                        employeeId: this.employeeId,
                        categoryId: this.categoryId,
                        description: this.description,
                        state: this.state,
                        image: this.image,
                    };
                    return this.$store.dispatch('Articles/RegisterArticle', isRegister)
                    /*.then(() => {
                        this.name = '';
                        this.employeeId = '';
                        this.description = '';
                        this.state = '';
                        this.image = '';
                        this.submitStatus = '';
                        this.isSelected = false;
                        this.showImage = '';
                    })*/
                }
            },
            articleUpdate(employee) {
                const isUpdate = {
                    id: employee.id,
                    first_name: employee.first_name,
                    last_name: employee.last_name,
                    username: employee.username,
                    email: employee.email,
                    mobile: employee.mobile,
                    home_phone: employee.home_phone,
                    zip_code: employee.zip_code,
                    password: employee.password,
                    confirmation_password: employee.confirmation_password,
                    home_address: employee.home_address,
                    work_address: employee.work_address,
                    state: employee.state,
                    image: employee.image,
                };
                return this.$store.dispatch('Employees/isEmployeeUpdate', isUpdate)
            }
        }
    }
</script>

<style scoped>

</style>
