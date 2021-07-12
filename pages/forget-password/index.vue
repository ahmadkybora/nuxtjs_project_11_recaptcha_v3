<template>
    <div class="container col-md-4 mt-5">
        <div class="jumbotron">
            <h3>Forget Password Form</h3>
            <form @submit.prevent="onForgetPassword()">
                <div class="form-group">
                    <input type="text"
                           class="form-control"
                           v-model="current_password"
                           name="current_password"
                           id="current-password"
                           placeholder="Enter Current Password...">
                </div>
                <div class="form-group">
                    <input type="password"
                           class="form-control"
                           v-model="new_password"
                           name="new_password"
                           id="new-password"
                           placeholder="Enter New Password...">
                </div>
                <div class="form-group">
                    <input type="password"
                           class="form-control"
                           v-model="confirmation_password"
                           name="confirmation_password"
                           id="confirmation-password"
                           placeholder="Enter Password Confirmation...">
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Send</button>
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
        name: 'index',
        data() {
            return {
                current_password: '',
                new_password: '',
                confirmation_password: '',
            }
        },
        methods: {
            async onForgetPassword() {
                const google_rECAPTCHA = await this.$recaptcha.execute('login');
                const forgetPassword = {
                    google_rECAPTCHA,
                    current_password: this.current_password,
                    new_password: this.new_password,
                    confirmation_password: this.confirmation_password,
                };
                return this.$store.dispatch('Auth/forgetPassword', forgetPassword);
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
