<template>
  <div class="container">
    <div class="jumbotron">
      <div class="container">
        <div class="card">
          <div class="card-title">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    //middleware: 'checkAuthEmployee',
    middleware: 'auth',
    name: "index",
    layout: 'panel',
  }
</script>

<style scoped>

</style>
