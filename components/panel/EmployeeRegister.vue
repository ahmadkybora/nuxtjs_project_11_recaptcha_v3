<template>
    <div class="container" id="register" style="display: block;" ref="register">
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-12">
                    <div class="jumbotron">
                        <h3 v-if="!editMode">Register Employees</h3>
                        <h3 v-if="editMode">Update Employees</h3>

                        <form @submit.prevent="editMode ? employeeUpdate(employee) : createEmployee()">
                            <!--//-->
                            <!--<div v-if="$v.first_name.$anyDirty">
                                <div class="error mt-1 mr-2" v-if="!$v.first_name.required">
                                    First Name is required.
                                </div>
                                <div class="error mt-1 mr-1" v-if="$v.first_name">
                                    First Name is ok.
                                </div>
                            </div>-->
                            <!--//-->
                            <!--<div>
                                <input v-model="" :placeholder="$touch()"
                                @blur="$v.first_name.$touch()"
                                :danger="$v.first_name.$error && $v.first_name.$dirty"
                                danger-text="invalid">
                            </div>-->
                            <!---------------------validation------------------->
                            <div class="my-3" v-if="editMode">
                                <!--//-->
                                <div v-if="$v.employee.first_name.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.first_name.required">
                                        First Name is required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.first_name.minLength">
                                        Last Name must
                                        have at
                                        least
                                        {{ $v.employee.first_name.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.first_name.maxLength">First Name
                                        must
                                        have at
                                        least
                                        {{ $v.employee.first_name.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.last_name.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.last_name.required">
                                        Last Name is required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.last_name.minLength">
                                        Last Name must have at least {{ $v.employee.last_name.$params.minLength.min }}
                                        letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.last_name.maxLength">First Name
                                        must
                                        have at
                                        least
                                        {{ $v.employee.last_name.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.username.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.username.required">Username is
                                        required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.username.minLength">Username must
                                        have at
                                        least
                                        {{ $v.employee.username.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.username.maxLength">Username must
                                        have at
                                        least
                                        {{ $v.employee.username.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.email.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.email.required">Email is
                                        required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.email.email">Email is invalid.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.mobile.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.mobile.required">Mobile is
                                        required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.mobile.minLength">Mobile must
                                        have
                                        at least
                                        {{ $v.employee.mobile.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.mobile.maxLength">Mobile must
                                        have at
                                        least
                                        {{ $v.employee.mobile.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.home_phone.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.home_phone.required">Home Phone is
                                        required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.home_phone.minLength">Home Phone
                                        must
                                        have at
                                        least
                                        {{ $v.employee.home_phone.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.home_phone.maxLength">Home Phone
                                        must
                                        have at
                                        least
                                        {{ $v.employee.home_phone.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.zip_code.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.zip_code.required">Zip Code is
                                        required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.zip_code.minLength">Zip Code must
                                        have at
                                        least
                                        {{ $v.employee.zip_code.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.zip_code.maxLength">Zip Code must
                                        have at
                                        least
                                        {{ $v.employee.zip_code.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.password.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.password.required">Password is
                                        required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.password.minLength">Password must
                                        have at
                                        least
                                        {{ $v.employee.password.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.password.maxLength">Password must
                                        have at
                                        least
                                        {{ $v.employee.password.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.confirmation_password.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.confirmation_password.required">
                                        Password Confirmation is
                                        required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.confirmation_password.minLength">
                                        Last
                                        Password Confirmation
                                        must have at
                                        least
                                        {{ $v.employee.confirmation_password.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.confirmation_password.maxLength">
                                        Password Confirmation
                                        must have at
                                        least
                                        {{ $v.employee.confirmation_password.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.home_address.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.home_address.required">Home
                                        Address
                                        is
                                        required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.home_address.minLength">Home
                                        Address
                                        must have at
                                        least
                                        {{ $v.employee.home_address.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.home_address.maxLength">Home
                                        Address
                                        must have
                                        at
                                        least
                                        {{ $v.employee.home_address.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.work_address.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.work_address.required">Work
                                        Address
                                        is
                                        required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.work_address.minLength">Work
                                        Address
                                        must have at
                                        least
                                        {{ $v.employee.work_address.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.work_address.maxLength">Work Address must
                                        have
                                        at
                                        least
                                        {{ $v.work_address.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.state.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.state.required">Status is
                                        required.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.image.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.employee.image.required">Image is
                                        required.
                                    </div>
                                </div>
                                <!--//-->
                            </div>
                            <div class="my-3" v-else>
                                <!--//-->
                                <div v-if="$v.first_name.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.first_name.required">First Name is required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.first_name.minLength">First Name must have at
                                        least
                                        {{ $v.first_name.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.first_name.maxLength">First Name must have
                                        at
                                        least
                                        {{ $v.first_name.$params.maxLength.max }} letters.
                                    </div>
                                    <!--<div v-else class="error alert-success">
                                        First Name is ok.
                                    </div>-->
                                </div>
                                <!--//-->
                                <div v-if="$v.last_name.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.last_name.required">Last Name is required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.last_name.minLength">Last Name must have
                                        at
                                        least
                                        {{ $v.last_name.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.last_name.maxLength">Last Name must have
                                        at
                                        least
                                        {{ $v.last_name.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.username.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.username.required">Username is required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.username.minLength">Username must have at
                                        least
                                        {{ $v.username.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.username.maxLength">Username must have at
                                        least
                                        {{ $v.username.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.email.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.email.required">Email is required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.email.email">Email is invalid.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.mobile.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.mobile.required">Mobile is required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.mobile.minLength">Mobile must have at
                                        least
                                        {{ $v.mobile.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.mobile.maxLength">Mobile must have at
                                        least
                                        {{ $v.mobile.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.home_phone.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.home_phone.required">Home Phone is
                                        required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.home_phone.minLength">Home Phone must have
                                        at
                                        least
                                        {{ $v.home_phone.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.home_phone.maxLength">Home Phone must have
                                        at
                                        least
                                        {{ $v.home_phone.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.zip_code.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.zip_code.required">Zip code is required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.zip_code.minLength">Zip code must have at
                                        least
                                        {{ $v.zip_code.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.zip_code.maxLength">Zip code must have at
                                        least
                                        {{ $v.zip_code.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.password.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.password.required">Password is required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.password.minLength">Password must have at
                                        least
                                        {{ $v.password.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.password.maxLength">Password must have at
                                        least
                                        {{ $v.password.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.confirmation_password.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.confirmation_password.required">Password
                                        Confirmation is
                                        required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.confirmation_password.minLength">Password
                                        Confirmation
                                        must have at
                                        least
                                        {{ $v.confirmation_password.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.confirmation_password.maxLength">Password
                                        Confirmation
                                        must have at
                                        least
                                        {{ $v.confirmation_password.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.home_address.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.home_address.required">Home Address is
                                        required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.home_address.minLength">Home Address must
                                        have
                                        at
                                        least
                                        {{ $v.home_address.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.home_address.maxLength">Home Address must
                                        have
                                        at
                                        least
                                        {{ $v.home_address.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.work_address.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.work_address.required">Work Address is
                                        required.
                                    </div>
                                    <div class="error alert-danger"
                                         v-if="!$v.work_address.minLength">Work Address must
                                        have
                                        at
                                        least
                                        {{ $v.work_address.$params.minLength.min }} letters.
                                    </div>
                                    <div class="error alert-danger" v-if="!$v.work_address.maxLength">Work Address must
                                        have
                                        at
                                        least
                                        {{ $v.work_address.$params.maxLength.max }} letters.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.state.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.state.required">Status is
                                        required.
                                    </div>
                                </div>
                                <!--//-->
                                <div v-if="$v.image.$anyDirty">
                                    <div class="error alert-danger"
                                         v-if="!$v.image.required">Image is
                                        required.
                                    </div>
                                </div>
                                <!--//-->
                            </div>
                            <!---------------------end validation------------------->
                            <div class="row">
                                <!--//-->
                                <div class="col-md-4">
                                    <!--//-->
                                    <div class="form-group" v-if="editMode">
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.employee.first_name.$error }"
                                               v-model.trim="$v.employee.first_name.$model"
                                               name="first_name"
                                               id="first-name"
                                               class="form-control"
                                               placeholder="First Name">
                                    </div>
                                    <!--//-->
                                    <div class="form-group" v-else>
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.first_name.$error }"
                                               v-model.trim="$v.first_name.$model"
                                               name="first_name"
                                               id="first-name"
                                               class="form-control"
                                               placeholder="First Name">
                                    </div>
                                    <!--//-->
                                </div>
                                <!--//-->
                                <div class="col-md-4">
                                    <!--//-->
                                    <div class="form-group" v-if="editMode">
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.employee.last_name.$error }"
                                               v-model.trim="$v.employee.last_name.$model"
                                               id="last-name"
                                               class="form-control"
                                               placeholder="Last Name">
                                    </div>
                                    <!--//-->
                                    <div class="form-group" v-else>
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.last_name.$error }"
                                               v-model.trim="$v.last_name.$model"
                                               id="last-name"
                                               class="form-control"
                                               placeholder="Last Name">
                                    </div>
                                    <!--//-->
                                </div>
                                <!--//-->
                                <div class="col-md-4">
                                    <!--//-->
                                    <div class="form-group" v-if="editMode">
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.employee.username.$error }"
                                               v-model.trim="$v.employee.username.$model"
                                               name="username"
                                               id="username"
                                               class="form-control"
                                               placeholder="User Name">
                                    </div>
                                    <!--//-->
                                    <div class="form-group" v-else>
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.username.$error }"
                                               v-model.trim="$v.username.$model"
                                               name="username"
                                               id="username"
                                               class="form-control" placeholder="User Name">
                                    </div>
                                    <!--//-->
                                </div>
                            </div>
                            <!--//-->
                            <div class="row">
                                <!--//-->
                                <div class="col-md-4">
                                    <!--//-->
                                    <div class="form-group" v-if="editMode">
                                        <input type="email"
                                               :class="{ 'form-group--error': $v.employee.email.$error }"
                                               v-model.trim="$v.employee.email.$model"
                                               name="email"
                                               id="email"
                                               class="form-control" placeholder="Email">
                                    </div>
                                    <!--//-->
                                    <div class="form-group" v-else>
                                        <input type="email"
                                               :class="{ 'form-group--error': $v.email.$error }"
                                               v-model.trim="$v.email.$model"
                                               name="email"
                                               id="email"
                                               class="form-control" placeholder="Email">
                                    </div>
                                    <!--//-->
                                </div>
                                <!--//-->
                                <div class="col-md-4">
                                    <!--//-->
                                    <div class="form-group" v-if="editMode">
                                        <input type="number"
                                               :class="{ 'form-group--error': $v.employee.mobile.$error }"
                                               v-model.trim="$v.employee.mobile.$model"
                                               name="mobile"
                                               id="mobile"
                                               class="form-control" placeholder="Mobile">
                                    </div>
                                    <!--//-->
                                    <div class="form-group" v-else>
                                        <input type="number"
                                               :class="{ 'form-group--error': $v.mobile.$error }"
                                               v-model.trim="$v.mobile.$model"
                                               name="mobile"
                                               id="mobile"
                                               class="form-control" placeholder="Mobile">
                                    </div>
                                    <!--//-->
                                </div>
                                <!--//-->
                                <div class="col-md-4">
                                    <!--//-->
                                    <div class="form-group" v-if="editMode">
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.employee.home_phone.$error }"
                                               v-model.trim="$v.employee.home_phone.$model"
                                               name="home_phone"
                                               id=home-phone
                                               class="form-control"
                                               placeholder="Home Phone">
                                    </div>
                                    <!--//-->
                                    <div class="form-group" v-else>
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.home_phone.$error }"
                                               v-model.trim="$v.home_phone.$model"
                                               name="home_phone"
                                               id=home-phone
                                               class="form-control"
                                               placeholder="Home Phone">
                                    </div>
                                    <!--//-->
                                </div>
                                <!--//-->
                            </div>
                            <!--//-->
                            <div class="row">
                                <!--//-->
                                <div class="col-md-4">
                                    <!--//-->
                                    <div class="form-group" v-if="editMode">
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.employee.zip_code.$error }"
                                               v-model.trim="$v.employee.zip_code.$model"
                                               name="zip_code"
                                               id="zip-code"
                                               class="form-control"
                                               placeholder="Zip Code">
                                    </div>
                                    <!--//-->
                                    <div class="form-group" v-else>
                                        <input type="text"
                                               :class="{ 'form-group--error': $v.zip_code.$error }"
                                               v-model.trim="$v.zip_code.$model"
                                               name="zip_code"
                                               id="zip-code"
                                               class="form-control"
                                               placeholder="Zip Code">
                                    </div>
                                    <!--//-->
                                </div>
                                <!--//-->
                                <div class="col-md-4">
                                    <!--//-->
                                    <div class="form-group" v-if="editMode">
                                        <input type="password"
                                               :class="{ 'form-group--error': $v.employee.password.$error }"
                                               v-model.trim="$v.employee.password.$model"
                                               name="password"
                                               id="password"
                                               class="form-control"
                                               placeholder="Password">
                                    </div>
                                    <!--//-->
                                    <div class="form-group" v-else>
                                        <input type="password"
                                               :class="{ 'form-group--error': $v.password.$error }"
                                               v-model.trim="$v.password.$model"
                                               name="password"
                                               id="password"
                                               class="form-control"
                                               placeholder="Password">
                                    </div>
                                    <!--//-->
                                </div>
                                <!--//-->
                                <div class="col-md-4">
                                    <div class="form-group" v-if="editMode">
                                        <input type="password"
                                               :class="{ 'form-group--error': $v.employee.confirmation_password.$error }"
                                               v-model.trim="$v.employee.confirmation_password.$model"
                                               name="confirmation_password"
                                               id="confirmation-password"
                                               class="form-control"
                                               placeholder="Password Confirmation">
                                    </div>
                                    <!--//-->
                                    <div class="form-group" v-else>
                                        <input type="password"
                                               :class="{ 'form-group--error': $v.confirmation_password.$error }"
                                               v-model.trim="$v.confirmation_password.$model"
                                               name="confirmation_password"
                                               id="confirmation-password"
                                               class="form-control" placeholder="Password Confirmation">
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
                                    <textarea :class="{ 'form-group--error': $v.employee.home_address.$error }"
                                              v-model.trim="$v.employee.home_address.$model"
                                              name="home_address"
                                              id="home-address"
                                              class="form-control"
                                              placeholder="Home Address"
                                              rows="3">
                                    </textarea>
                                    </div>
                                    <!--//-->
                                    <div class="form-group" v-else>
                                    <textarea :class="{ 'form-group--error': $v.home_address.$error }"
                                              v-model.trim="$v.home_address.$model"
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
                                <!--//-->
                                <div class="col-md-12">
                                    <div class="form-group" v-if="editMode">
                                    <textarea :class="{ 'form-group--error': $v.employee.work_address.$error }"
                                              v-model.trim="$v.employee.work_address.$model"
                                              name="work_address"
                                              id="work-address"
                                              class="form-control"
                                              placeholder="Work Address"
                                              rows="3"></textarea>
                                    </div>
                                    <!--//-->
                                    <div class="form-group" v-else>
                                    <textarea :class="{ 'form-group--error': $v.work_address.$error }"
                                              v-model.trim="$v.work_address.$model"
                                              name="work_address"
                                              id="work-address"
                                              class="form-control"
                                              placeholder="Work Address" rows="3"></textarea>
                                    </div>
                                </div>
                            </div>
                            <!--//-->
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">

                                    </div>
                                </div>
                                <!--//-->
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <div class="form-check" v-if="editMode">
                                            <input class="form-check-input"
                                                   type="radio"
                                                   v-model="employee.state"
                                                   name="state"
                                                   id="ACTIVE"
                                                   value="ACTIVE">
                                            <label class="form-check-label" for="ACTIVE">
                                                ACTIVE
                                            </label>
                                        </div>
                                        <!--//-->
                                        <div class="form-check" v-else>
                                            <input class="form-check-input"
                                                   type="radio"
                                                   v-model="state"
                                                   name="state"
                                                   id="ACTIVE"
                                                   value="ACTIVE">
                                            <label class="form-check-label" for="ACTIVE">
                                                ACTIVE
                                            </label>
                                        </div>
                                        <!--//-->
                                        <div class="form-check" v-if="editMode">
                                            <input class="form-check-input"
                                                   type="radio"
                                                   v-model="employee.state"
                                                   name="state"
                                                   id="INACTIVE"
                                                   value="INACTIVE">
                                            <label class="form-check-label" for="INACTIVE">
                                                INACTIVE
                                            </label>
                                        </div>
                                        <!--//-->
                                        <div class="form-check" v-else>
                                            <input class="form-check-input"
                                                   type="radio"
                                                   v-model="state"
                                                   name="state"
                                                   id="INACTIVE"
                                                   value="INACTIVE">
                                            <label class="form-check-label" for="INACTIVE">
                                                INACTIVE
                                            </label>
                                        </div>
                                        <!--//-->
                                        <div class="form-check" v-if="editMode">
                                            <input class="form-check-input"
                                                   type="radio"
                                                   v-model="employee.state"
                                                   name="state"
                                                   id="SUSPENDED"
                                                   value="SUSPENDED">
                                            <label class="form-check-label" for="SUSPENDED">
                                                SUSPENDED
                                            </label>
                                        </div>
                                        <!--//-->
                                        <div class="form-check" v-else>
                                            <input class="form-check-input"
                                                   type="radio"
                                                   v-model="state"
                                                   name="state"
                                                   id="SUSPENDED"
                                                   value="SUSPENDED">
                                            <label class="form-check-label" for="SUSPENDED">
                                                SUSPENDED
                                            </label>
                                        </div>
                                        <!--//-->
                                        <div class="form-check" v-if="editMode">
                                            <input class="form-check-input" type="radio" v-model="employee.state"
                                                   name="state" id="PENDING" value="PENDING">
                                            <label class="form-check-label" for="PENDING">
                                                PENDING
                                            </label>
                                        </div>
                                        <!--//-->
                                        <div class="form-check" v-else>
                                            <input class="form-check-input" type="radio" v-model="state"
                                                   name="state" id="PENDING" value="PENDING">
                                            <label class="form-check-label" for="PENDING">
                                                PENDING
                                            </label>
                                        </div>
                                        <!--//-->
                                    </div>
                                </div>
                                <!--//-->
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
                                <!--//-->
                            </div>
                            <!--//-->
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <button v-if="!editMode" class="btn btn-success" type="submit">Register
                                        </button>
                                        <button v-if="editMode" class="btn btn-primary" type="submit">Update
                                        </button>
                                        <p class="typo__p alert-success" v-if="submitStatus === 'OK'">Registered is
                                            successfully!</p>
                                        <p class="typo__p alert-danger" v-if="submitStatus === 'ERROR'">Please fill
                                            the
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
    import Vue from 'vue'
    import Vuelidate from 'vuelidate'

    Vue.use(Vuelidate);

    import {
        required,
        minLength,
        maxLength,
        email,
    } from 'vuelidate/lib/validators';

    export default {
        middleware: 'checkAuthEmployee',
        name: "EmployeeRegister",
        data() {
            return {
                first_name: '',
                last_name: '',
                username: '',
                email: '',
                mobile: '',
                home_phone: '',
                zip_code: '',
                password: '',
                confirmation_password: '',
                home_address: '',
                work_address: '',
                state: '',
                image: '',
                isSelected: false,
                showImage: '',
                submitStatus: '',
            }
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
                maxLength: maxLength(25),
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
        props: ['employee', 'editMode'],
        mounted() {
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
            createEmployee() {
                const isRegister = {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    username: this.username,
                    email: this.email,
                    mobile: this.mobile,
                    home_phone: this.home_phone,
                    zip_code: this.zip_code,
                    password: this.password,
                    confirmation_password: this.confirmation_password,
                    home_address: this.home_address,
                    work_address: this.work_address,
                    state: this.state,
                    image: this.image,
                };
                return this.$store.dispatch('Employees/isEmployeeRegister', isRegister)
            },
            employeeUpdate(employee) {
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
