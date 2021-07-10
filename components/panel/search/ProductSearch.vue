<template>
    <!--//-->
    <form @submit.prevent="onFullTextSearch()" class="form-inline w-50 m-auto">
        <div class="input-group w-100 my-3">
            <input type="text"
                   name="full_text_search"
                   id="full-text-search"
                   v-model="full_text_search"
                   class="form-control"
                   placeholder="Search...">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        </div>
    </form>
    <!--//-->
</template>

<script>
    import { ProductService } from '../../../services/panel/ProductService';
    export default {
        name: "ProductSearch",
        data() {
            return {
                full_text_search: ''
            }
        },
        methods: {
            onSearch() {
                return ProductService.onSearch()
            }
        }
    }
</script>

<style scoped>

</style>
