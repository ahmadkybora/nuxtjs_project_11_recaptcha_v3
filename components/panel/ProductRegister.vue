<template>
    <div class="container" id="register" style="display: none;" ref="register">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="jumbotron">
                        <h3 v-if="!editMode">Register Products</h3>
                        <h3 v-if="editMode">Update Products</h3>

                        <form @submit.prevent="editMode ? productUpdate(product) : productCreate()">
                            <!---------------------validation------------------->
                            <div class="my-3" v-if="editMode">
                                <!--//-->
                                <div v-if="$v.categoryId.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.categoryId.required">Brand is required.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.name.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.name.required">Name is required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.name.minLength">Name must have at
                                        least
                                        {{ $v.name.$params.minLength.min }} letters.
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
                                <div v-if="$v.price.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.price.required">Description is
                                        required.
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
                                <div v-if="$v.categoryId.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.categoryId.required">Brand is required.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.name.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.name.required">Name is required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.name.minLength">Name must have at
                                        least
                                        {{ $v.name.$params.minLength.min }} letters.
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
                                <div v-if="$v.price.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.price.required">Description is
                                        required.
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
                            <!---------------------end validation------------------->
                            <!--//-->
                            <div class="row">
                                <!--//-->
                                <div class="col-md-4">
                                    <!--//-->
                                    <div class="form-group" v-if="editMode">
                                        <!--//-->
                                        <select :class="{ 'form-group--error': $v.categoryId.$error }"
                                                v-model.trim="$v.categoryId.$model"
                                                name="categoryId"
                                                id="categoryId"
                                                class="form-control form__input">
                                            <option value="" selected disabled hidden>Please Select Category</option>
                                            <option v-for="category in categories.data" :value="category.id">
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
                                            <option value="" selected disabled hidden>Please Select Category</option>
                                            <option v-for="category in categories.data" :value="category.id"
                                                    v-text="category.name"></option>
                                        </select>
                                    </div>
                                    <!--//-->
                                </div>
                                <!--//-->
                                <div class="col-md-4">
                                    <!--//-->
                                    <div class="form-group" v-if="editMode">
                                        <!--//-->
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.name.$error }"
                                               v-model.trim="$v.name.$model"
                                               name="name"
                                               id="name"
                                               class="form-control form__input"
                                               placeholder="Title">
                                    </div>
                                    <!--//-->
                                    <div class="form-group" v-else>
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.name.$error }"
                                               v-model.trim="$v.name.$model"
                                               name="name"
                                               id="name"
                                               class="form-control form__input"
                                               placeholder="Title">
                                        <!--//-->
                                    </div>
                                </div>
                                <!--//-->
                                <div class="col-md-4">
                                    <div class="form-group" v-if="editMode">
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.product.name.$error }"
                                               v-model.trim="$v.product.price.$model"
                                               name="price"
                                               id="price"
                                               class="form-control"
                                               placeholder="Price">
                                    </div>
                                    <!--//-->
                                    <div class="form-group" v-else>
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.name.$error }"
                                               v-model.trim="$v.price.$model"
                                               name="price"
                                               id="price"
                                               class="form-control"
                                               placeholder="Price">
                                    </div>
                                    <!--//-->
                                </div>
                                <!--//-->
                            </div>
                            <!--//-->
                            <div class="row">
                                <!--//-->
                                <div class="col-md-12">
                                    <!--//-->
                                    <div class="form-group" v-if="editMode">
                                        <!--//-->
                                        <textarea :class="{ 'form-group--error': $v.product.description.$error }"
                                                  v-model.trim="$v.product.description.$model"
                                                  name="description"
                                                  id="description"
                                                  class="form-control"
                                                  placeholder="Description"
                                                  rows="7">
                                    </textarea>
                                        <!--//-->
                                    </div>
                                    <!--//-->
                                    <div class="form-group" v-else>
                                        <textarea :class="{ 'form-group--error': $v.description.$error }"
                                                  v-model.trim="$v.description.$model"
                                                  name="description"
                                                  id="description"
                                                  class="form-control"
                                                  placeholder="Description"
                                                  rows="7">
                                    </textarea>
                                    </div>
                                    <!--//-->
                                </div>
                            </div>
                            <!--//-->
                            <div class="col-md-12">
                                <div class="row">
                                    <!--//-->
                                    <div class="form-group">
                                        <!---------------------//--------------------->
                                        <div class="form-check form-check-inline col-md-2" v-if="editMode">
                                            <label class="form-check-label"
                                                   for="ACTIVE">
                                                <input class="form-check-input"
                                                       type="radio"
                                                       :class="{ 'form-group--error': $v.product.state.$error }"
                                                       v-model.trim="$v.product.state.$model"
                                                       name="state"
                                                       id="ACTIVE"
                                                       value="ACTIVE">
                                                ACTIVE
                                            </label>
                                        </div>
                                        <!--//-->
                                        <div class="form-check form-check-inline col-md-2" v-else>
                                            <label class="form-check-label" for="ACTIVE">
                                                <input class="form-check-input"
                                                       type="radio"
                                                       :class="{ 'form-group--error': $v.state.$error }"
                                                       v-model.trim="$v.state.$model"
                                                       name="state"
                                                       id="ACTIVE"
                                                       value="ACTIVE">
                                                ACTIVE
                                            </label>
                                        </div>
                                        <!--//-->
                                        <div class="form-check form-check-inline col-md-2" v-if="editMode">
                                            <label class="form-check-label"
                                                   for="INACTIVE">
                                                <input class="form-check-input"
                                                       type="radio"
                                                       :class="{ 'form-group--error': $v.product.state.$error }"
                                                       v-model.trim="$v.product.state.$model"
                                                       name="state"
                                                       id="INACTIVE"
                                                       value="INACTIVE">
                                                INACTIVE
                                            </label>
                                        </div>
                                        <!--//-->
                                        <div class="form-check form-check-inline col-md-2" v-else>
                                            <label class="form-check-label"
                                                   for="INACTIVE">
                                                <input class="form-check-input"
                                                       type="radio"
                                                       :class="{ 'form-group--error': $v.state.$error }"
                                                       v-model.trim="$v.state.$model"
                                                       name="state"
                                                       id="INACTIVE"
                                                       value="INACTIVE">
                                                INACTIVE
                                            </label>
                                        </div>
                                        <!--//-->
                                        <div class="form-check form-check-inline col-md-2">
                                            <label v-if="editMode" class="form-check-label"
                                                   for="SUSPENDED">
                                                <input class="form-check-input" type="radio"
                                                       v-model="product.state"
                                                       name="state" id="SUSPENDED" value="SUSPENDED">
                                                SUSPENDED
                                            </label>
                                            <label v-else class="form-check-label" for="SUSPENDED">
                                                <input class="form-check-input" type="radio" v-model="state"
                                                       name="state" id="SUSPENDED" value="SUSPENDED">
                                                SUSPENDED
                                            </label>
                                        </div>
                                        <!---------------------//--------------------->
                                        <div class="form-check form-check-inline col-md-3">
                                            <label v-if="editMode" class="form-check-label" for="PENDING">
                                                <input class="form-check-input"
                                                       type="radio"
                                                       v-model="product.state"
                                                       name="state" id="PENDING" value="PENDING">PENDING
                                            </label>
                                            <label v-else class="form-check-label" for="PENDING">
                                                <input class="form-check-input"
                                                       type="radio"
                                                       v-model="state"
                                                       name="state" id="PENDING" value="PENDING">PENDING
                                            </label>
                                        </div>
                                        <!---------------------//--------------------->
                                    </div>
                                    <!--//-->
                                    <div class="col-md-3">
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
                                </div>
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
                            <!------------------------------//---------------------------->
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
        name: "ProductRegister",
        props: ['category', 'editMode'],
        data() {
            return {
                id: '',
                categoryId: '',
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
            categoryId: {
                required,
            },
            description: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(255)
            },
            price: {
                required,
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
                categories: state => state.ProductCategories.allProductCategories,
            })
        },
        mounted() {
            return this.$store.dispatch('ProductCategories/allProductCategories');
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
            productCreate() {
                const isRegister = {
                    categoryId: this.categoryId,
                    name: this.name,
                    description: this.description,
                    price: this.price,
                    state: this.state,
                    image: this.image,
                };
                return this.$store.dispatch('Products/ProductCreate', isRegister)
            },
            productUpdate(product) {
                const isUpdate = {
                    id: product.id,
                    categoryId: product.categoryId,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    state: product.state,
                    image: product.image,
                };
                return this.$store.dispatch('Products/ProductsUpdate', isUpdate)
            }
        },
    }
</script>

<style scoped>

</style>
