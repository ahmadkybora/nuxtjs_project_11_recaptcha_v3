import Axios from 'axios'
import Swal from "sweetalert2";

window.Swal = Swal;

const state = () => ({
    allProductCategories: {},
    isProductCategories: {},
    getProductCategories: {},
    popularProductCategories: {},
});

const getters = {
    allProductCategories(state) {
        return state.allProductCategories
    },
    isProductCategories(state) {
        return state.isProductCategories
    },
    getProductCategories(state) {
        return state.getProducts
    },
    popularProductCategories(state) {
        return state.popularProductCategories
    },
};

const actions = {
    /**
     *
     * @param context
     * @param all
     * @returns {Promise<void>}
     */
    async allProductCategories(context, all = 'all') {
        await Axios.get(Axios.defaults.baseURL + `panel/product-categories?all=${all}`)
            .then(res => {
                const allProductCategories = res.data.data;
                context.commit('allProductCategories', allProductCategories);
            }).catch(err => {
                console.log(err)
            })
    },

    /**
     *
     * @param context
     */
    async isProductCategories(context) {
        await Axios.get(Axios.defaults.baseURL + 'product-categories')
            .then(res => {
            const isProductCategories = res.data.data;
            //const popularProductCategories = res.data.data.popular_product_categories;
            context.commit('isProductCategories', isProductCategories);
            //context.commit('popularProductCategories', popularProductCategories);
        }).catch(err => {
            console.log(err)
        })
    },

    async getProductCategories(context) {
        await Axios.get(Axios.defaults.baseURL + 'panel/product-categories')
            .then(res => {
                const getProductCategories = res.data.data;
                context.commit('getProductCategories', getProductCategories)
            }).catch(err => {
                console.log(err)
            })
    },

    isProductCategoriesUpdate(context, payload) {
        const isUpdate = {
            id: payload.id,
            brand_id: payload.brand_id,
            title: payload.title,
            description: payload.description,
        };
        Axios.patch(Axios.defaults.baseURL + 'panel/product-categories' + payload.id, isUpdate)
            .then(res => {
                const getProductCategories = res.data.data.data;
                context.commit('getProductCategories', getProductCategories)
            }).catch(err => {
            console.log(err)
        })
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     * @constructor
     */
    async ProductCategoriesCreate(context, payload) {
        let formData = new FormData();
        formData.append("brandId", payload.brandId);
        formData.append("employeeId", payload.employeeId);
        formData.append("name", payload.name);
        formData.append("description", payload.description);
        formData.append("state", payload.state);
        formData.append("image", payload.image);
        await Axios.post(Axios.defaults.baseURL + 'panel/product-categories/store', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            .then(res => {
                switch (res.status) {
                    case 200:
                        Swal.fire('Success!', res.data.message, 'success')
                            .then(() => {
                                const getProductCategories = res.data.data;
                                context.commit('getProductCategories', getProductCategories);
                                this.$router.push('/panel/product-categories');
                            });
                        break;
                    case 403:
                        Swal.fire('Warning!', res.data.message, 'warning')
                            .then(() => {

                            });
                        break;
                    case 422:
                        alert("ok");
                        Swal.fire('Error!', 'whooops', 'error')
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
            }).catch(err => {
                switch (err.response.status) {
                    case 422:
                        for (let i = 0; i < err.response.data.errors.length; i++) {
                            Swal.fire('Warning!', err.response.data.errors[i].message, 'warning')
                                .then(() => {

                                });
                        }
                        break;
                    case 503:
                        for (let i = 0; i < err.response.data.errors.length; i++) {
                            Swal.fire('Warning!', err.response.data.errors[i].message, 'warning')
                                .then(() => {

                                });
                        }
                        break;
                    default:
                        Swal.fire('Warning!', 'Your Basic Information', 'warning');
                        break;
                }
            })
    }
};

const mutations = {
    allProductCategories(state, payload) {
        state.allProductCategories = payload
    },
    isProductCategories(state, payload) {
        state.isProductCategories = payload
    },
    getProductCategories(state, payload) {
        state.getProductCategories = payload
    },
    popularProductCategories(state, payload) {
        state.popularProductCategories = payload
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
