<template>
    <div class="container col-md-4 mt-5">
        <div class="jumbotron">
            <h3>Login Form</h3>
            <form @submit.prevent="onLogin()">
                <div class="form-group">
                    <input type="text" class="form-control" v-model="username" name="username" id="username"
                           placeholder="Enter Username">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" v-model="password" name="password" id="password"
                           placeholder="Password">
                </div>

                <div class="form-group">
                    <label>Remember me</label>
                    <input type="checkbox" value="remember_me"/>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Login</button>
                    <nuxt-link to="/forget-password" class="text-primary">Forget Password?</nuxt-link>
                </div>
            </form>
            <div class="form-group">
                <p>
                    Dont have account?
                    <nuxt-link to="/register" class="text-primary">Register</nuxt-link>
                </p>
            </div>
            <div class="form-group">
                <nuxt-link to="/" class="text-success">Go to Home</nuxt-link>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        //middleware: 'isUserLoggedIn',
        //middleware: 'guest',
        layout: 'auth',
        name: 'Login',
        data() {
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            async onLogin() {
                const google_rECAPTCHA = await this.$recaptcha.execute('login');
                const Login = {
                    google_rECAPTCHA,
                    username: this.username,
                    password: this.password,
                };
                return this.$store.dispatch('Auth/isUserLogin', Login);
            },
            beforeDestroy() {
                this.$recaptcha.destroy()
            }
        },
        async mounted() {
            try {
                await this.$recaptcha.init()
            } catch (e) {
                console.error(e);
            }
        }
    }
</script>

<style scoped>

</style>
