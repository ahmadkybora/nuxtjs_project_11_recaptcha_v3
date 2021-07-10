<template>
  <div class="container col-md-4 mt-5">
    <div class="jumbotron">
      <h3>Login Admin Form</h3>
      <form @submit.prevent="onLogin()">
        <div class="form-group">
          <input type="text"
                 class="form-control"
                 v-model="username"
                 name="username"
                 id="username"
                 placeholder="Enter Username...">
        </div>
        <div class="form-group">
          <input type="password"
                 class="form-control"
                 v-model="password"
                 id="password"
                 placeholder="Enter Password...">
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    //middleware: 'isEmployeeLoggedIn',
    //middleware: 'guest',
    layout: 'auth',
    name: 'index',
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
        return this.$store.dispatch('Auth/isEmployeeLogin', Login);
      }
    }
  }
</script>

<style scoped>

</style>
