<template>
    <div class="container" id="register" style="display: block;" ref="register">
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-12">
                    <div class="jumbotron shadow-lg">
                        <h3>Edit Profile</h3>

                        <form @submit.prevent="userUpdate(user)">
                            <!---------------------validation------------------->
                            <div class="my-3">
                                <!--//-->
                                <div v-if="$v.user.first_name.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.user.first_name.required">First Name is
                                        required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.user.first_name.minLength">Last Name must
                                        have at
                                        least
                                        {{ $v.user.first_name.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.user.first_name.maxLength">First Name must
                                        have at
                                        least
                                        {{ $v.user.first_name.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.user.last_name.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.user.last_name.required">Last Name is
                                        required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.user.last_name.minLength">Last Name must
                                        have at
                                        least
                                        {{ $v.user.last_name.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.user.last_name.maxLength">First Name must
                                        have at
                                        least
                                        {{ $v.user.last_name.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.user.username.$anyDirty">
                                    <div class="error alert-danger" v-if="!$v.user.username.required">Username is
                                        required.
                                    </div>
                                    <div class="error alert-danger" v-if="!$v.user.username.minLength">Username must
                                        have at
                                        least
                                        {{ $v.user.username.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger" v-if="!$v.user.username.maxLength">Username must
                                        have at
                                        least
                                        {{ $v.user.username.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.user.email.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.user.email.required">Email is required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.user.email.email">Email is invalid.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.user.mobile.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.user.mobile.required">Mobile is
                                        required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.user.mobile.minLength">Mobile must have
                                        at least
                                        {{ $v.user.mobile.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.user.mobile.maxLength">Mobile must
                                        have at
                                        least
                                        {{ $v.user.mobile.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.user.home_phone.$anyDirty">
                                    <div class="error alert-danger" v-if="!$v.user.home_phone.required">Home Phone is
                                        required.
                                    </div>
                                    <div class="error alert-danger" v-if="!$v.user.home_phone.minLength">Home Phone must
                                        have at
                                        least
                                        {{ $v.user.home_phone.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger" v-if="!$v.user.home_phone.maxLength">Home Phone must
                                        have at
                                        least
                                        {{ $v.user.home_phone.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.user.zip_code.$anyDirty">
                                    <div class="error alert-danger" v-if="!$v.user.zip_code.required">Zip Code is
                                        required.
                                    </div>
                                    <div class="error alert-danger" v-if="!$v.user.zip_code.minLength">Zip Code must
                                        have at
                                        least
                                        {{ $v.user.zip_code.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger" v-if="!$v.user.zip_code.maxLength">Zip Code must
                                        have at
                                        least
                                        {{ $v.user.zip_code.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.user.password.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.user.password.required">Password is
                                        required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.user.password.minLength">Password must
                                        have at
                                        least
                                        {{ $v.user.password.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger" v-if="!$v.user.password.maxLength">Password must
                                        have at
                                        least
                                        {{ $v.user.password.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.user.confirmation_password.$anyDirty">
                                    <div class="error alert-danger" v-if="!$v.user.confirmation_password.required">
                                        Password Confirmation is
                                        required.
                                    </div>
                                    <div class="error alert-danger" v-if="!$v.user.confirmation_password.minLength">Last
                                        Password Confirmation
                                        must have at
                                        least
                                        {{ $v.user.confirmation_password.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger" v-if="!$v.user.confirmation_password.maxLength">
                                        Password Confirmation
                                        must have at
                                        least
                                        {{ $v.user.confirmation_password.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.user.home_address.$anyDirty">
                                    <div class="error alert-danger" v-if="!$v.user.home_address.required">Home Address
                                        is
                                        required.
                                    </div>
                                    <div class="error alert-danger" v-if="!$v.user.home_address.minLength">Home Address
                                        must have at
                                        least
                                        {{ $v.user.home_address.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger" v-if="!$v.user.home_address.maxLength">Home Address
                                        must have
                                        at
                                        least
                                        {{ $v.user.home_address.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.user.work_address.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.user.work_address.required">Work Address is
                                        required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.user.work_address.minLength">Work Address
                                        must have at
                                        least
                                        {{ $v.user.work_address.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.user.work_address.maxLength">Work Address must
                                        have
                                        at
                                        least
                                        {{ $v.user.work_address.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.user.image.$anyDirty">
                                    <div class="error alert-danger" v-if="!$v.user.image.required">Image is
                                        required.
                                    </div>
                                </div>
                                <!--//-->
                            </div>
                            <!---------------------end validation------------------->
                            <div class="row">
                                <!--//-->
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.user.first_name.$error }"
                                               v-model.trim="$v.user.first_name.$model"
                                               name="first_name"
                                               id="first-name"
                                               class="form-control" placeholder="First Name">
                                    </div>
                                </div>
                                <!--//-->
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.user.last_name.$error }"
                                               v-model.trim="$v.user.last_name.$model"
                                               id="last-name"
                                               class="form-control" placeholder="Last Name">
                                    </div>
                                </div>
                                <!--//-->
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.user.username.$error }"
                                               v-model.trim="$v.user.username.$model"
                                               name="username"
                                               id="username"
                                               class="form-control" placeholder="User Name">
                                    </div>
                                </div>
                                <!--//-->
                            </div>
                            <!--//-->
                            <div class="row">
                                <!--//-->
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="email"
                                               :class="{ 'form-group--error': $v.user.email.$error }"
                                               v-model.trim="$v.user.email.$model"
                                               name="email"
                                               id="email"
                                               class="form-control" placeholder="Email">
                                    </div>
                                </div>
                                <!--//-->
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="number"
                                               :class="{ 'form-group--error': $v.user.mobile.$error }"
                                               v-model.trim="$v.user.mobile.$model"
                                               name="mobile"
                                               id="mobile"
                                               class="form-control" placeholder="Mobile">
                                    </div>
                                </div>
                                <!--//-->
                                <div class="col-md-4">
                                    <!--//-->
                                    <div class="form-group">
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.user.home_phone.$error }"
                                               v-model.trim="$v.user.home_phone.$model"
                                               name="home_phone"
                                               id=home-phone
                                               class="form-control"
                                               placeholder="Home Phone">
                                    </div>
                                    <!--//-->
                                </div>
                            </div>
                            <!--//-->
                            <div class="row">
                                <!--//-->
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.user.zip_code.$error }"
                                               v-model.trim="$v.user.zip_code.$model"
                                               name="zip_code"
                                               id="zip-code"
                                               class="form-control"
                                               placeholder="Zip Code">
                                    </div>
                                </div>
                                <!--//-->
                                <div class="col-md-4">
                                    <!--//-->
                                    <div class="form-group">
                                        <input type="password"
                                               :class="{ 'form-group--error': $v.user.password.$error }"
                                               v-model.trim="$v.user.password.$model"
                                               name="password"
                                               id="password"
                                               class="form-control"
                                               placeholder="Password">
                                    </div>
                                    <!--//-->
                                </div>
                                <div class="col-md-4">
                                    <!--//-->
                                    <div class="form-group">
                                        <input type="password"
                                               :class="{ 'form-group--error': $v.user.confirmation_password.$error }"
                                               v-model.trim="$v.user.confirmation_password.$model"
                                               name="confirmation_password"
                                               id="confirmation-password"
                                               class="form-control"
                                               placeholder="Password Confirmation">
                                    </div>
                                    <!--//-->
                                </div>
                            </div>
                            <!--//-->
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                    <textarea :class="{ 'form-group--error': $v.user.home_address.$error }"
                                              v-model.trim="$v.user.home_address.$model"
                                              name="home_address"
                                              id="home-address"
                                              class="form-control"
                                              placeholder="Home Address"
                                              rows="3">
                                    </textarea>
                                    </div>
                                    <!--//-->
                                </div>
                            </div>
                            <!--//-->
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                    <textarea :class="{ 'form-group--error': $v.user.work_address.$error }"
                                              v-model.trim="$v.user.work_address.$model"
                                              name="work_address"
                                              id="work-address"
                                              class="form-control"
                                              placeholder="Work Address"
                                              rows="3"></textarea>
                                    </div>
                                    <!--//-->
                                </div>
                            </div>
                            <!--//-->
                            <div class="row">
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
                                        <button class="btn btn-primary" type="submit">Update</button>
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
        email,
    } from 'vuelidate/lib/validators';

    export default {
        middleware: 'auth',
        layout: "profile",
        name: "index",
        data() {
            return {
                image: '',
                isSelected: false,
                showImage: '',
                submitStatus: '',
            }
        },
        validations: {
            user: {
                first_name: {
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(25)
                },
                last_name: {
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(25)
                },
                username: {
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(25)
                },
                email: {
                    required,
                    email,
                },
                mobile: {
                    required,
                    minLength: minLength(11),
                    maxLength: maxLength(15)
                },
                home_phone: {
                    required,
                    minLength: minLength(11),
                    maxLength: maxLength(15)
                },
                zip_code: {
                    required,
                    minLength: minLength(10),
                    maxLength: maxLength(15)
                },
                password: {
                    required,
                    minLength: minLength(8),
                    maxLength: maxLength(25)
                },
                confirmation_password: {
                    required,
                    minLength: minLength(8),
                    maxLength: maxLength(25)
                },
                home_address: {
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(255)
                },
                work_address: {
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(255)
                },
                state: {
                    required,
                },
                image: {
                    required,
                },
            },
        },
        mounted() {
            console.log(this.image);
            return this.$store.dispatch('Users/myUser')
        },
        computed: {
            ...mapState({
                user: state => state.Users.myUser.data,
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
            userUpdate(user) {
                const isUpdate = {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    username: user.username,
                    email: user.email,
                    mobile: user.mobile,
                    home_phone: user.home_phone,
                    zip_code: user.zip_code,
                    password: user.password,
                    confirmation_password: user.confirmation_password,
                    home_address: user.home_address,
                    work_address: user.work_address,
                    image: this.image,
                };
                return this.$store.dispatch('Users/myUserUpdate', isUpdate);
            },
        }
    }
</script>

<style scoped>

</style>
