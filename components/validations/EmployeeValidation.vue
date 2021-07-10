<template>
    <div v-if="editMode">
        <!--//-->
        <div class="error alert-danger" v-if="!$v.employee.first_name.required">First Name is
            required.
        </div>
        <div class="error alert-danger" v-if="!$v.employee.first_name.minLength">Last Name must
            have at
            least
            {{ $v.employee.first_name.$params.minLength.min }} letters.
        </div>
        <div class="error alert-danger" v-if="!$v.employee.first_name.maxLength">First Name must
            have at
            least
            {{ $v.employee.first_name.$params.maxLength.max }} letters.
        </div>
        <!--//-->
        <div class="error alert-danger" v-if="!$v.employee.last_name.required">Last Name is
            required.
        </div>
        <div class="error alert-danger" v-if="!$v.employee.last_name.minLength">Last Name must
            have at
            least
            {{ $v.employee.last_name.$params.minLength.min }} letters.
        </div>
        <div class="error alert-danger" v-if="!$v.employee.last_name.maxLength">First Name must
            have at
            least
            {{ $v.employee.last_name.$params.maxLength.max }} letters.
        </div>
        <!--//-->
        <div class="error alert-danger" v-if="!$v.employee.username.required">Username is
            required.
        </div>
        <div class="error alert-danger" v-if="!$v.employee.username.minLength">Username must
            have at
            least
            {{ $v.employee.username.$params.minLength.min }} letters.
        </div>
        <div class="error alert-danger" v-if="!$v.employee.username.maxLength">Username must
            have at
            least
            {{ $v.employee.username.$params.maxLength.max }} letters.
        </div>
        <!--//-->
        <div class="error alert-danger" v-if="!$v.employee.email.required">Email is required.
        </div>
        <div class="error alert-danger" v-if="!$v.employee.email.email">Email is invalid.
        </div>
        <!--//-->
        <div class="error alert-danger" v-if="!$v.employee.mobile.required">Mobile is
            required.
        </div>
        <div class="error alert-danger" v-if="!$v.employee.mobile.minLength">Mobile must have
            at least
            {{ $v.employee.mobile.$params.minLength.min }} letters.
        </div>
        <div class="error alert-danger" v-if="!$v.employee.mobile.maxLength">Mobile must
            have at
            least
            {{ $v.employee.mobile.$params.maxLength.max }} letters.
        </div>
        <!--//-->
        <div class="error alert-danger" v-if="!$v.employee.home_phone.required">Home Phone is
            required.
        </div>
        <div class="error alert-danger" v-if="!$v.employee.home_phone.minLength">Home Phone must
            have at
            least
            {{ $v.employee.home_phone.$params.minLength.min }} letters.
        </div>
        <div class="error alert-danger" v-if="!$v.employee.home_phone.maxLength">Home Phone must
            have at
            least
            {{ $v.employee.home_phone.$params.maxLength.max }} letters.
        </div>
        <!--//-->
        <div class="error alert-danger" v-if="!$v.employee.zip_code.required">Zip Code is
            required.
        </div>
        <div class="error alert-danger" v-if="!$v.employee.zip_code.minLength">Zip Code must
            have at
            least
            {{ $v.employee.zip_code.$params.minLength.min }} letters.
        </div>
        <div class="error alert-danger" v-if="!$v.employee.zip_code.maxLength">Zip Code must
            have at
            least
            {{ $v.employee.zip_code.$params.maxLength.max }} letters.
        </div>
        <!--//-->
        <div class="error alert-danger" v-if="!$v.employee.password.required">Password is
            required.
        </div>
        <div class="error alert-danger" v-if="!$v.employee.password.minLength">Password must
            have at
            least
            {{ $v.employee.password.$params.minLength.min }} letters.
        </div>
        <div class="error alert-danger" v-if="!$v.employee.password.maxLength">Password must
            have at
            least
            {{ $v.employee.password.$params.maxLength.max }} letters.
        </div>
        <!--//-->
        <div class="error alert-danger" v-if="!$v.employee.confirmation_password.required">
            Password Confirmation is
            required.
        </div>
        <div class="error alert-danger" v-if="!$v.employee.confirmation_password.minLength">Last
            Password Confirmation
            must have at
            least
            {{ $v.employee.confirmation_password.$params.minLength.min }} letters.
        </div>
        <div class="error alert-danger" v-if="!$v.employee.confirmation_password.maxLength">
            Password Confirmation
            must have at
            least
            {{ $v.employee.confirmation_password.$params.maxLength.max }} letters.
        </div>
        <!--//-->
        <div class="error alert-danger" v-if="!$v.employee.home_address.required">Home Address is
            required.
        </div>
        <div class="error alert-danger" v-if="!$v.employee.home_address.minLength">Home Address
            must have at
            least
            {{ $v.employee.home_address.$params.minLength.min }} letters.
        </div>
        <div class="error alert-danger" v-if="!$v.employee.home_address.maxLength">Home Address
            must have
            at
            least
            {{ $v.employee.home_address.$params.maxLength.max }} letters.
        </div>
        <!--//-->
        <div class="error alert-danger" v-if="!$v.employee.work_address.required">Work Address is
            required.
        </div>
        <div class="error alert-danger" v-if="!$v.employee.work_address.minLength">Work Address
            must have at
            least
            {{ $v.employee.work_address.$params.minLength.min }} letters.
        </div>
        <div class="error alert-danger" v-if="!$v.work_address.maxLength">Work Address must have
            at
            least
            {{ $v.work_address.$params.maxLength.max }} letters.
        </div>
        <!--//-->
        <div class="error alert-danger" v-if="!$v.employee.state.required">Status is
            required.
        </div>
        <!--//-->
        <div class="error alert-danger" v-if="!$v.employee.image.required">Image is
            required.
        </div>
        <!--//-->
    </div>
    <div v-else>
        <!--//-->
        <div class="error alert-danger" v-if="!$v.first_name.required">First Name is required.
        </div>
        <div class="error alert-danger" v-if="!$v.first_name.minLength">First Name must have at
            least
            {{ $v.first_name.$params.minLength.min }} letters.
        </div>
        <div class="error alert-danger" v-if="!$v.first_name.maxLength">First Name must have at
            least
            {{ $v.first_name.$params.maxLength.max }} letters.
        </div>
        <!--//-->
        <div class="error alert-danger" v-if="!$v.last_name.required">Last Name is required.
        </div>
        <div class="error alert-danger" v-if="!$v.last_name.minLength">Last Name must have at
            least
            {{ $v.last_name.$params.minLength.min }} letters.
        </div>
        <div class="error alert-danger" v-if="!$v.last_name.maxLength">Last Name must have at
            least
            {{ $v.last_name.$params.maxLength.max }} letters.
        </div>
        <!--//-->
        <div class="error alert-danger" v-if="!$v.username.required">Username is required.
        </div>
        <div class="error alert-danger" v-if="!$v.username.minLength">Username must have at
            least
            {{ $v.username.$params.minLength.min }} letters.
        </div>
        <div class="error alert-danger" v-if="!$v.username.maxLength">Username must have at
            least
            {{ $v.username.$params.maxLength.max }} letters.
        </div>
        <!--//-->
        <div class="error alert-danger" v-if="!$v.email.required">Email is required.
        </div>
        <div class="error alert-danger" v-if="!$v.email.email">Email is invalid.
        </div>
        <!--//-->
        <div class="error alert-danger" v-if="!$v.mobile.required">Mobile is required.
        </div>
        <div class="error alert-danger" v-if="!$v.mobile.minLength">Mobile must have at least
            {{ $v.mobile.$params.minLength.min }} letters.
        </div>
        <div class="error alert-danger" v-if="!$v.mobile.maxLength">Mobile must have at
            least
            {{ $v.mobile.$params.maxLength.max }} letters.
        </div>
        <!--//-->
        <div class="error alert-danger" v-if="!$v.home_phone.required">Home Phone is required.
        </div>
        <div class="error alert-danger" v-if="!$v.home_phone.minLength">Home Phone must have at
            least
            {{ $v.home_phone.$params.minLength.min }} letters.
        </div>
        <div class="error alert-danger" v-if="!$v.home_phone.maxLength">Home Phone must have at
            least
            {{ $v.home_phone.$params.maxLength.max }} letters.
        </div>
        <!--//-->
        <div class="error alert-danger" v-if="!$v.zip_code.required">Zip code is required.
        </div>
        <div class="error alert-danger" v-if="!$v.zip_code.minLength">Zip code must have at
            least
            {{ $v.zip_code.$params.minLength.min }} letters.
        </div>
        <div class="error alert-danger" v-if="!$v.zip_code.maxLength">Zip code must have at
            least
            {{ $v.zip_code.$params.maxLength.max }} letters.
        </div>
        <!--//-->
        <div class="error alert-danger" v-if="!$v.password.required">Password is required.
        </div>
        <div class="error alert-danger" v-if="!$v.password.minLength">Password must have at
            least
            {{ $v.password.$params.minLength.min }} letters.
        </div>
        <div class="error alert-danger" v-if="!$v.password.maxLength">Password must have at
            least
            {{ $v.password.$params.maxLength.max }} letters.
        </div>
        <!--//-->
        <div class="error alert-danger" v-if="!$v.confirmation_password.required">Password Confirmation is
            required.
        </div>
        <div class="error alert-danger" v-if="!$v.confirmation_password.minLength">Password Confirmation
            must have at
            least
            {{ $v.confirmation_password.$params.minLength.min }} letters.
        </div>
        <div class="error alert-danger" v-if="!$v.confirmation_password.maxLength">Password Confirmation
            must have at
            least
            {{ $v.confirmation_password.$params.maxLength.max }} letters.
        </div>
        <!--//-->
        <div class="error alert-danger" v-if="!$v.home_address.required">Home Address is
            required.
        </div>
        <div class="error alert-danger" v-if="!$v.home_address.minLength">Home Address must have at
            least
            {{ $v.home_address.$params.minLength.min }} letters.
        </div>
        <div class="error alert-danger" v-if="!$v.home_address.maxLength">Home Address must have
            at
            least
            {{ $v.home_address.$params.maxLength.max }} letters.
        </div>
        <!--//-->
        <div class="error alert-danger" v-if="!$v.work_address.required">Work Address is
            required.
        </div>
        <div class="error alert-danger" v-if="!$v.work_address.minLength">Work Address must have at
            least
            {{ $v.work_address.$params.minLength.min }} letters.
        </div>
        <div class="error alert-danger" v-if="!$v.work_address.maxLength">Work Address must have
            at
            least
            {{ $v.work_address.$params.maxLength.max }} letters.
        </div>
        <!--//-->
        <div class="error alert-danger" v-if="!$v.state.required">Status is
            required.
        </div>
        <!--//-->
        <div class="error alert-danger" v-if="!$v.image.required">Image is
            required.
        </div>
        <!--//-->
    </div>
</template>

<script>
    import {
        required,
        minLength,
        maxLength,
        email,
    } from 'vuelidate/lib/validators';

    export default {
        data() {
            return {}
        },
        validations: {
            employee: {
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
        props: ['editModeVal', 'employeeVal']
    }
</script>

<style></style>
