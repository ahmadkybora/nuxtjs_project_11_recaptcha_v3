import {success, error} from '../../helpers/ErrorHandler';

const state = () => ({
    isProducts: {},
    getProducts: {},
    getProductsPagination: {},
    popularProducts: {},
    isFile: {},
});

const getters = {
    isProducts(state) {
        return state.isProducts
    },
    getProducts(state) {
        return state.getProducts
    },
    popularProducts(state) {
        return state.popularProducts
    },
};

const actions = {
    async isProducts(context) {
        await this.$axios.get('products')
            .then(res => {
                const isProducts = res.data.data;
                //const popularProducts = res.data.data.popular_products;
                context.commit('isProducts', isProducts);
                //context.commit('popularProducts', popularProducts)
            })
            .catch(err => {
                error(err);
            })
    },

    /**
     *
     * @param context
     * @param page
     * @returns {Promise<void>}
     */
    async getProducts(context, page = 1) {
        await this.$axios.get(`panel/products?page= ${page}`)
            .then(res => {
                const getProducts = res.data.data;
                console.log(getProducts);
                context.commit('getProducts', getProducts)
            })
            .catch(err => {
                error(err);
            })
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async isProductUpdate(context, payload) {
        const isUpdate = {
            id: payload.id,
            category_id: payload.category_id,
            title: payload.title,
            description: payload.description,
            price: payload.price,
            icon: payload.icon,
            status: payload.status,
        };
        await this.$axios.patch(`panel/products/${payload.id}`, isUpdate)
            .then(res => {

            })
            .catch(err => {
                error(err);
            })
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     * @constructor
     */
    async ProductCreate(context, payload) {
        let formData = new FormData();
        formData.append("categoryId", payload.categoryId);
        formData.append("name", payload.name);
        formData.append("description", payload.description);
        formData.append("price", payload.price);
        formData.append("image", payload.image);
        formData.append("status", payload.status);

        await this.$axios.post('panel/products/store', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                const getProducts = res.data.data;
                context.commit('getProducts', getProducts);
                this.$router.push('/panel/products');
            })
            .catch(err => {
                error(err);
            })
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async deleteProduct(context, payload) {
        await Swal.fire({
            title: 'Are you sure?',
            text: "It will be deleted permanently!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            showLoaderOnConfirm: true,
        }).then((result) => {
            if (result.value) {
                Axios.delete(Axios.defaults.baseURL + 'panel/product/' + payload.id)
                    .then(res => {
                        switch (res.status) {
                            case 200:
                                Swal.fire('Success!', res.data.message, 'success')
                                    .then(() => {
                                        let idx = context.state.getProducts.indexOf(payload.id);
                                        context.state.getProducts.splice(idx, 1);
                                    });
                                break;
                            case 403:
                                Swal.fire('Warning!', res.data.message, 'warning')
                                    .then(() => {

                                    });
                                break;
                            case 503:
                                Swal.fire('Danger!', 'Service is Unavailable', 'error');
                                break;
                            default:
                                Swal.fire('Warning!', 'Your Basic Information', 'warning');
                                break;
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        });
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     * @constructor
     */
    async ProductLike(context, payload) {
        const ProductLike = {
            username: payload.username,
            productId: payload.productId,
        };
        await this.$axios.post('product-likes', ProductLike)
            .then(res => {
                const getProducts = res.data.data;
                context.commit('getProducts', getProducts);
                this.$router.push('/panel/products');
            })
            .catch(err => {
                error(err);
            })
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     * @constructor
     */
    async ProductDisLike(context, payload) {
        const ProductLike = {
            username: payload.username,
            productId: payload.productId,
        };
        await this.$axios.post('product-dislikes', ProductLike)
            .then(res => {
                const getProducts = res.data.data;
                context.commit('getProducts', getProducts);
                this.$router.push('/');
            })
            .catch(err => {
                error(err);
            })
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     * @constructor
     */
    async ProductFavorite(context, payload) {
        const ProductFavorite = {
            username: payload.username,
            productId: payload.productId,
        };
        await this.$axios.post('product-favorite', ProductFavorite)
            .then(res => {
                const getProducts = res.data.data;
                context.commit('getProducts', getProducts);
                this.$router.push('/panel/products');
            })
            .catch(err => {
                error(err);
            })
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     * @constructor
     */
    async ProductUnFavorite(context, payload) {
        const ProductUnFavorite = {
            username: payload.username,
            productId: payload.productId,
        };
        await this.$axios.post('product-unfavorite', ProductUnFavorite)
            .then(res => {
                const getProducts = res.data.data;
                context.commit('getProducts', getProducts);
                this.$router.push('/');
            })
            .catch(err => {
                error(err);
            })
    }
};

const mutations = {
    isFile(state, payload) {
        state.isFile = payload
    },
    isProducts(state, payload) {
        state.isProducts = payload
    },
    getProducts(state, payload) {
        state.getProducts = payload
    },
    popularProducts(state, payload) {
        state.popularProducts = payload
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
