<template>
    <section>
        <div class="container-fluid my-3">
            <div class="row bg-warning align-items-center" style="height: 75vh;">
                <div class="col-lg-8 col-md-6 text-center">
                    <h1 class="display-3 text-white">
                        wow you are
                        <span class="display-2">good</span>
                    </h1>
                    <h2 class="display-4 my-5">Wow is good</h2>
                    <a href="" class="btn btn-light btn-lg">my panel</a>
                    <a href="" class="btn btn-outline-light btn-lg">your panel</a>
                </div>
                <div class="col-lg-4 col-md-6">
                    <img src="../../assets/banner.jpg" class="img-fluid d-none d-md-block"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'Banner',
    }
</script>

<style scoped>
    .container-fluid {
        width: 2000px;
        height: 760px;
    }

    /*.btn {
        background-color: aquamarine;
        border-radius: 15px;
    }*/

    .container-fluid {
        border-radius: 15px;
    }
</style>
