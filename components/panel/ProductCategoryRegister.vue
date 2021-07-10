<template>
    <div class="container" id="register" style="display: block;" ref="register">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="jumbotron">
                        <h3 v-if="!editMode">Register Product Categories</h3>
                        <h3 v-if="editMode">Update Product Categories</h3>

                        <form @submit.prevent="editMode ? categoryUpdate(category) : categoryCreate()">
                            <!---------------------validation------------------->
                            <div class="my-3" v-if="editMode">
                                <!--//-->
                                <div v-if="$v.brandId.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.brandId.required">Brand is required.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.employeeId.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.employeeId.required">Brand is required.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.title.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.title.required">Name is required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.title.minLength">Name must have at
                                        least
                                        {{ $v.title.$params.minLength.min }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.description.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.description.required">Description is
                                        required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.description.minLength">Description must have at
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
                                <div v-if="$v.image.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.image.required">Image is required.
                                    </div>
                                </div>
                                <!--//-->
                            </div>
                            <div class="my-3" v-else>
                                <!--//-->
                                <div v-if="$v.name.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.name.required">Name is required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.name.minLength">Name must have at least
                                        {{ $v.name.$params.minLength.min }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.brandId.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.brandId.required">Brand is required.
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
                                <!--//-->
                                <div class="col-md-4">
                                    <!--//-->
                                    <div class="form-group" v-if="editMode">
                                        <select :class="{ 'form-group--error': $v.category.brandId.$error }"
                                                v-model.trim="$v.category.brandId.$model"
                                                name="brandId"
                                                id="brandId"
                                                class="form-control form__input">
                                            <option value="">Please Select Brand</option>
                                            <option v-for="brand in brands" :value="brand.id"
                                                    v-text="brand.name"></option>
                                        </select>
                                    </div>
                                    <!--//-->
                                    <div class="form-group" v-else>
                                        <select :class="{ 'form-group--error': $v.brandId.$error }"
                                                v-model.trim="$v.brandId.$model"
                                                name="brandId"
                                                id="brandId"
                                                class="form-control form__input">
                                            <option value="">Please Select Brand</option>
                                            <option v-for="brand in brands" :value="brand.id"
                                                    v-text="brand.name"></option>
                                        </select>
                                    </div>
                                    <!--//-->
                                </div>
                                <!--//-->
                                <div class="col-md-4">
                                    <!--//-->
                                    <div class="form-group" v-if="editMode">
                                        <select :class="{ 'form-group--error': $v.category.employeeId.$error }"
                                                v-model.trim="$v.category.employeeId.$model"
                                                name="employeeId"
                                                id="employeeId"
                                                class="form-control form__input">
                                            <option value="">Please Select Employee</option>
                                            <option v-for="employee in employees"
                                                    :value="employee.id"
                                                    v-text="employee.username"></option>
                                        </select>
                                    </div>
                                    <!--//-->
                                    <div class="form-group" v-else>
                                        <select :class="{ 'form-group--error': $v.employeeId.$error }"
                                                v-model.trim="$v.employeeId.$model"
                                                name="employeeId"
                                                id="employeeId"
                                                class="form-control form__input">
                                            <option value="">Please Select Employee</option>
                                            <option v-for="employee in employees"
                                                    :value="employee.id"
                                                    v-text="employee.username"></option>
                                        </select>
                                    </div>
                                    <!--//-->
                                </div>
                                <!--//-->
                                <div class="col-md-4">
                                    <!--//-->
                                    <div class="form-group" v-if="editMode">
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.category.name.$error }"
                                               v-model.trim="$v.category.name.$model"
                                               name="name"
                                               id="name"
                                               class="form-control form__input"
                                               placeholder="Name">
                                    </div>
                                    <!--//-->
                                    <div class="form-group" v-else>
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.name.$error }"
                                               v-model.trim="$v.name.$model"
                                               name="name"
                                               id="name"
                                               class="form-control form__input"
                                               placeholder="Name">
                                    </div>
                                    <!--//-->
                                </div>
                                <!--//-->
                            </div>
                            <!--//-->
                            <div class="row">
                                <!--//-->
                                <div class="col-md-12">
                                    <div class="form-group" v-if="editMode">
                                    <textarea :class="{ 'form-group--error': $v.category.description.$error }"
                                              v-model.trim="$v.category.description.$model"
                                              name="description"
                                              id="description"
                                              class="form-control form__input"
                                              placeholder="Description"
                                              rows="7">
                                    </textarea>
                                    </div>
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
                                <!--//-->
                            </div>
                            <!--//-->
                            <div class="row">
                                <!--//-->
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <!--//-->
                                        <div class="form-check" v-if="editMode">
                                            <input class="form-check-input form__input"
                                                   type="radio"
                                                   :class="{ 'form-group--error': $v.category.state.$error }"
                                                   v-model.trim="$v.category.state.$model"
                                                   name="state"
                                                   id="ACTIVE"
                                                   value="ACTIVE">
                                            <label class="form-check-label" for="ACTIVE">
                                                ACTIVE
                                            </label>
                                        </div>
                                        <div class="form-check" v-else>
                                            <input class="form-check-input form__input"
                                                   type="radio"
                                                   :class="{ 'form-group--error': $v.state.$error }"
                                                   v-model.trim="$v.state.$model"
                                                   name="state"
                                                   id="ACTIVE"
                                                   value="ACTIVE">
                                            <label class="form-check-label" for="ACTIVE">
                                                ACTIVE
                                            </label>
                                        </div>
                                        <!--//-->
                                        <div class="form-check" v-if="editMode">
                                            <input class="form-check-input form__input"
                                                   type="radio"
                                                   :class="{ 'form-group--error': $v.category.state.$error }"
                                                   v-model.trim="$v.category.state.$model"
                                                   name="state"
                                                   id="INACTIVE"
                                                   value="INACTIVE">
                                            <label class="form-check-label" for="INACTIVE">
                                                INACTIVE
                                            </label>
                                        </div>
                                        <!--//-->
                                        <div class="form-check" v-else>
                                            <input class="form-check-input form__input"
                                                   type="radio"
                                                   :class="{ 'form-group--error': $v.state.$error }"
                                                   v-model.trim="$v.state.$model"
                                                   name="state"
                                                   id="INACTIVE"
                                                   value="INACTIVE">
                                            <label class="form-check-label" for="INACTIVE">
                                                INACTIVE
                                            </label>
                                        </div>
                                        <!--//-->
                                        <div class="form-check" v-if="editMode">
                                            <input class="form-check-input form__input"
                                                   type="radio"
                                                   :class="{ 'form-group--error': $v.category.state.$error }"
                                                   v-model.trim="$v.category.state.$model"
                                                   name="state"
                                                   id="SUSPENDED"
                                                   value="SUSPENDED">
                                            <label class="form-check-label" for="SUSPENDED">
                                                SUSPENDED
                                            </label>
                                        </div>
                                        <div class="form-check" v-else>
                                            <input class="form-check-input form__input"
                                                   type="radio"
                                                   :class="{ 'form-group--error': $v.state.$error }"
                                                   v-model.trim="$v.state.$model"
                                                   name="state"
                                                   id="SUSPENDED"
                                                   value="SUSPENDED">
                                            <label class="form-check-label" for="SUSPENDED">
                                                SUSPENDED
                                            </label>
                                        </div>
                                        <!--//-->
                                        <div class="form-check" v-if="editMode">
                                            <input class="form-check-input form__input"
                                                   type="radio"
                                                   :class="{ 'form-group--error': $v.category.state.$error }"
                                                   v-model.trim="$v.category.state.$model"
                                                   name="state"
                                                   id="PENDING"
                                                   value="PENDING">
                                            <label class="form-check-label" for="PENDING">
                                                PENDING
                                            </label>
                                        </div>
                                        <!--//-->
                                        <div class="form-check" v-else>
                                            <input class="form-check-input form__input"
                                                   type="radio"
                                                   :class="{ 'form-group--error': $v.state.$error }"
                                                   v-model.trim="$v.state.$model"
                                                   name="state"
                                                   id="PENDING"
                                                   value="PENDING">
                                            <label class="form-check-label" for="PENDING">
                                                PENDING
                                            </label>
                                        </div>
                                        <!--//-->
                                    </div>
                                </div>
                                <!--//-->
                                <div class="col-md-6">
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
        name: "ProductCategoryRegister",
        props: ['category', 'editMode'],
        data() {
            return {
                id: '',
                brandId: '',
                employeeId: '',
                name: '',
                description: '',
                state: '',
                image: '',
                isSelected: false,
                showImage: '',
                submitStatus: '',
            }
        },
        validations: {
            name: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(255)
            },
            brandId: {
                required,
            },
            employeeId: {
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
                brands: state => state.Brands.allBrands.data,
                employees: state => state.Employees.allEmployees.data,
            })
        },
        mounted() {
            this.$store.dispatch('Brands/allBrands');
            return this.$store.dispatch('Employees/allEmployees');
            /*return this.$store.dispatch('Brands/allBrands', 'Employees/allEmployees');*/
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
            categoryCreate() {
                const isRegister = {
                    brandId: this.brandId,
                    employeeId: this.employeeId,
                    name: this.name,
                    description: this.description,
                    state: this.state,
                    image: this.image,
                };
                return this.$store.dispatch('ProductCategories/ProductCategoriesCreate', isRegister)
            },
            categoryUpdate(category) {
                const isUpdate = {
                    id: category.id,
                    brandId: category.brandId,
                    employeeId: category.employeeId,
                    name: category.name,
                    description: category.description,
                };
                return this.$store.dispatch('ProductCategories/isProductCategoriesUpdate', isUpdate)
            }
        },
    }
</script>

<style scoped>

</style>
