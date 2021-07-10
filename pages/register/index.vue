<template>
    <div class="container" id="user-register">
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-12">
                    <div class="jumbotron">
                      <nuxt-link to="/" class="btn btn-success">Home</nuxt-link>
                      <h3>Register Users</h3>
                        <form @submit.prevent="onRegister()">

                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="text" v-model="first_name" name="first_name" id="first-name"
                                               class="form-control" placeholder="First Name">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="text" v-model="last_name" name="last_name" id="last-name"
                                               class="form-control" placeholder="Last Name">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="text" v-model="username" name="username" id="username"
                                               class="form-control" placeholder="User Name">
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="email" v-model="email" name="email" id="email"
                                               class="form-control" placeholder="Email">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="number" v-model="mobile" name="mobile" id="mobile"
                                               class="form-control" placeholder="Mobile">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="text" v-model="home_phone" name="home_phone" id=home-phone
                                               class="form-control" placeholder="Home Phone">
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="text" v-model="zip_code" name="zip_code" id="zip-code"
                                               class="form-control" placeholder="Zip Code">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="password" v-model="password" name="password" id="password"
                                               class="form-control" placeholder="Password">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input type="password" v-model="confirmation_password" name="confirmation_password" id="confirmation-password"
                                               class="form-control" placeholder="Password Confirmation">
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                    <textarea v-model="home_address" name="home_address" id="home-address"
                                              class="form-control" placeholder="Home Address" rows="3"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                    <textarea v-model="work_address" name="work_address" id="work-address"
                                              class="form-control" placeholder="Work Address" rows="3"></textarea>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <button class="btn btn-primary" type="submit">Register</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <nuxt-link to="/login" class="btn btn-primary">Login</nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        //middleware: 'isEmployeeLoggedIn',
        //middleware: 'guest',
        name: "UserRegister",
        layout: 'auth',
        data () {
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
            }
        },
        methods: {
            onRegister() {
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
                };
                return this.$store.dispatch('Auth/isUserRegister', isRegister)
            },
        }
    }
</script>

<style scoped>

</style>
