<template>
    <div class="container">
        <div class="jumbotron">
            <div class="row">
                <div class="col-lg-12">
                    <div class="form-group">
                <textarea class="form-control col-lg-12"
                          rows="10"
                          placeholder="type...">
                </textarea>
                    </div>
                </div>
                <div class="col-lg-12">
                    <form>
                        <div class="form-group">
                <textarea class="form-control col-lg-12"
                          rows="10"
                          placeholder="type...">
                </textarea>
                        </div>

                        <div class="row">
                            <div class="form-group">
                                <input type="file" class="form-control">
                            </div>
                            <div class="form-group">
                                <button class="btn btn-primary">send</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        layout: "chats",
        name: "index"
    }
</script>

<style scoped>

</style>
