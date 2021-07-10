<template>
    <div class="container-fluid">
        <div class="container">
            <div class="row">
                <div class="col-md-2" v-for="item in items" :key="item.id">
                    <p :style="item.style">
                        <i :class="item.icon"></i>
                        {{ item.title }}
                    </p>
                    <span>
                        <p></p>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import FooterItems from '../../api/front/FooterItems.json'

  export default {
    name: 'Footer',
    data () {
      return {
        items: FooterItems,
      }
    }
  }
</script>

<style scoped>
    .container-fluid {
        background-color: #7f828b;
        height: 500px;
    }
</style>
