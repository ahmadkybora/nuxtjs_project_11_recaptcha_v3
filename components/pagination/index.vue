<template>
    <nav aria-label="...">
        <ul class="pagination pagination-sm">
            <li v-if="pagination.current_page > 1" :disabled="pagination.current_page <= 1"
                class="page-item">
                <a @click.prevent="changePage(pagination.current_page - 1)"
                   disabled="disabled"
                   class="page-link" href="#" tabindex="-1">
                    Previous
                </a>
            </li>
            <li v-for="page in pages" :key="page === pagination.current_page" class="page-item">
                <a @click.prevent="changePage(page)" class="page-link btn btn-primary" href="#">{{ page }}</a>
            </li>
            <li v-if="pagination.current_page < pagination.last_page" class="page-item">
                <a @click.prevent="changePage(pagination.current_page + 1)" class="page-link"
                   href="#">Next</a>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                pagination: {
                    total: 0,
                    per_page: 0,
                    last_page: 0,
                    from: 0,
                    to: 0,
                    current_page: 1
                },
                offset: 4,
            }
        }
    }
</script>

<style scoped>

</style>
