<template>
    <div class="container" id="register" style="display: block;" ref="register">
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-12">
                    <div class="jumbotron shadow-lg">
                        <h3 v-if="!editMode">Register Roles</h3>
                        <h3 v-if="editMode">Update Roles</h3>
                        <form @submit.prevent="editMode ? roleUpdate(role) : roleCreate()">
                            <!---------------------validation------------------->
                            <div class="my-3" v-if="editMode">
                                <!--//-->
                                <div v-if="$v.role.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.role.role.required">Role Name is
                                        required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.role.role.minLength">Role Name must
                                        have at
                                        least
                                        {{ $v.role.role.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.role.role.maxLength">Role Name must
                                        have at
                                        least
                                        {{ $v.role.role.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.role.permission.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.role.permission.required">First Name is required.
                                    </div>
                                </div>
                                <!--//-->
                            </div>
                            <div class="my-3" v-else>
                                <!--//-->
                                <div v-if="$v.roleName.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.roleName.required">First Name is required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.roleName.minLength">First Name must have at
                                        least
                                        {{ $v.roleName.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger" v-if="!$v.roleName.maxLength">First Name must have
                                        at
                                        least
                                        {{ $v.roleName.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.permission.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.permission.required">First Name is required.
                                    </div>
                                </div>
                                <!--//-->
                            </div>
                            <!---------------------end validation------------------->
                            <div class="row">
                                <!--//-->
                                <div class="col-md-6">
                                    <div class="form-group" v-if="editMode">
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.role.role.$error }"
                                               v-model.trim="$v.role.role.$model"
                                               name="role"
                                               id="role"
                                               class="form-control" placeholder="First Name">
                                    </div>
                                    <div class="form-group" v-else>
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.roleName.$error }"
                                               v-model.trim="$v.roleName.$model"
                                               name="role"
                                               id="role"
                                               class="form-control" placeholder="First Name">
                                    </div>
                                </div>
                                <!--//-->
                                <div class="col-md-6">
                                    <div class="form-group" v-if="editMode">
                                        <select :class="{ 'form-group--error': $v.role.permission.$error }"
                                                v-model.trim="$v.role.permission.$model"
                                                name="permission"
                                                id="permission"
                                                class="form-control"
                                                multiple="multiple">
                                            <option  multiple="multiple" value="" selected disabled hidden>Please Select Permissions</option>
                                            <option v-for="permission in permissions.data"
                                                    :value="permission.id"
                                                    v-text="permission.name">
                                            </option>
                                        </select>
                                    </div>
                                    <div class="form-group" v-else>
                                        <select :class="{ 'form-group--error': $v.permission.$error }"
                                                v-model.trim="$v.permission.$model"
                                                name="permission"
                                                id="permission"
                                                class="form-control"
                                                multiple="multiple">
                                            <option value="" selected disabled hidden>Please Select Permissions</option>
                                            <option v-for="permission in permissions.data"
                                                    :value="permission.id"
                                                    v-text="permission.name">
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <!--//-->
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
                                                       :class="{ 'form-group--error': $v.role.state.$error }"
                                                       v-model.trim="$v.role.state.$model"
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
                                                       :class="{ 'form-group--error': $v.role.state.$error }"
                                                       v-model.trim="$v.role.state.$model"
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
        email,
    } from 'vuelidate/lib/validators';

    export default {
        middleware: 'checkAuthEmployee',
        name: "UserRegister",
        props: ['role', 'editMode'],
        data() {
            return {
                id: '',
                roleName: '',
                permission: [],
                state: '',
                isSelected: false,
                showImage: '',
                submitStatus: '',
            }
        },
        validations: {
            role: {
                role: {
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(25)
                },
                permission: {
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(25)
                },
                state: {
                    required,
                }
            },
            roleName: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(25)
            },
            permission: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(25)
            },
            state: {
                required,
            }
        },
        mounted() {
            return this.$store.dispatch('Roles/allPermissions')
        },
        computed: {
            ...mapState({
                permissions: state => state.Roles.allPermissions,
                //showUser: state => state.Users.isUser,
                //editUser: state => state.Users.isUser,
                //deleteUser: state => state.Users.isUser,
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
            roleCreate() {
                /*this.$v.$touch();
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    this.submitStatus = 'PENDING';
                    setTimeout(() => {
                        this.submitStatus = 'OK'
                    }, 500);*/
                const isRegister = {
                    role: this.roleName,
                    permission: this.permission,
                    state: this.state,
                };
                return this.$store.dispatch('Roles/isRoleRegister', isRegister)
                    .then(() => {
                        this.roleName = '';
                        this.permission = '';
                        this.state = '';
                    })
                //}
            },
            roleUpdate(role) {
                const isUpdate = {
                    roleName: role.role,
                    permission: role.permission,
                };
                return this.$store.dispatch('Roles/isRoleUpdate', isUpdate)
            },
        }
    }
</script>

<style scoped>

</style>
