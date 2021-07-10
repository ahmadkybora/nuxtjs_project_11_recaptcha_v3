<template>
  <div>
    <!--<a data-toggle="modal" data-target="#exampleModal">
      <i class="fas fa-eye text-primary"></i>
    </a>-->

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p v-text="showUser.first_name"></p>
            <p v-text="showUser.last_name"></p>
            <p v-text="showUser.username"></p>
            <p v-text="showUser.email"></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    middleware: 'checkAuthEmployee',
    name: "UserShow",
    props: ['showUser'],
    computed: {
      ...mapState({
        //showUser: state => state.Users.isUser,
      })
    },
    /*mounted() {
        return this.$store.dispatch('Users/getUsers');
    },*/
  }
</script>

<style scoped>

</style>
