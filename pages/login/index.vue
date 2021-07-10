<template>
  <div class="container col-md-4 mt-5">
    <div class="jumbotron">
      <nuxt-link to="/" class="btn btn-success">Home</nuxt-link>
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
          <button type="submit" class="btn btn-primary">Login</button>
        </div>
      </form>
      <nuxt-link to="/register" class="btn btn-primary">Register</nuxt-link>
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
      onLogin() {
        const Login = {
          username: this.username,
          password: this.password,
        };
        return this.$store.dispatch('Auth/isUserLogin', Login);
      }
    }
  }
</script>

<style scoped>

</style>
