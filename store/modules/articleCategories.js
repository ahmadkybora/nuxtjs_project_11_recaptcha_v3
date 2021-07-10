import Axios from 'axios'
import Swal from "sweetalert2";

const state = () => ({
    allArticleCategories: {},
    isArticleCategories: {},
    getArticleCategories: {},
    popularArticleCategories: {},
});

const getters = {
    allArticleCategories(state) {
        return state.allArticleCategories
    },
    isArticleCategories(state) {
        return state.isArticleCategories
    },
    getArticleCategories(state) {
        return state.getArticleCategories
    },
    popularArticleCategories(state) {
        return state.popularArticleCategories
    },
};

const actions = {

    /**
     *
     * @param context
     * @param all
     * @returns {Promise<void>}
     */
    async allArticleCategories(context, all = 'all') {
        await Axios.get(Axios.defaults.baseURL + `panel/article-categories?all=${all}`)
            .then(res => {
                const allArticleCategories = res.data.data;
                context.commit('allArticleCategories', allArticleCategories);
            }).catch(err => {
                console.log(err)
            })
    },

    /**
     *
     * @param context
     */
    isArticleCategories(context) {
        Axios.get(Axios.defaults.baseURL + 'article-categories')
            .then(res => {
                const isArticleCategories = res.data.data;
                console.log(isArticleCategories);
                //const popularArticleCategories = res.data.data.popular_articles;
                context.commit('isArticleCategories', isArticleCategories);
                //context.commit('popularArticleCategories', popularArticleCategories)
            }).catch(err => {
            console.log(err)
        })
    },

    /**
     *
     * @param context
     */
    async getArticleCategories(context, page = 1) {
        await Axios.get(Axios.defaults.baseURL + `panel/article-categories?page=${page}`)
            .then(res => {
                const getArticleCategories = res.data.data;
                context.commit('getArticleCategories', getArticleCategories);
            }).catch(err => {
                console.log(err)
            })
    },

    async RegisterArticleCategory(context, payload) {
        let formData = new FormData();
        formData.append('employeeId', payload.employeeId);
        formData.append('name', payload.name);
        formData.append('description', payload.description);
        formData.append('state', payload.state);
        formData.append('image', payload.image);

        await Axios.post(Axios.defaults.baseURL + 'panel/article-categories/store', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            .then(res => {
                switch (res.status) {
                    case 200:
                        Swal.fire('Warning!', res.data.message, 'warning')
                            .then(() => {

                            });
                        break;
                    case 201:
                        Swal.fire('Success!', res.data.message, 'success')
                            .then(() => {
                                const getArticleCategories = res.data.data;
                                context.commit('getArticleCategories', getArticleCategories);
                                this.$router.push('/panel/article-categories');
                            });
                        break;
                    case 403:
                        Swal.fire('Warning!', res.data.message, 'warning')
                            .then(() => {

                            });
                        break;
                    default:
                        Swal.fire('Warning!', 'Your Basic Information', 'warning');
                        break;
                }
            }).catch(err => {
                switch (err.response.status) {
                    case 422:
                        if (err.response.data.errors === null) {
                            Swal.fire('Warning!', err.response.data.message, 'warning')
                                .then(() => {

                                });
                        }
                        for (let i = 0; i < err.response.data.errors.length; i++) {
                            Swal.fire('Warning!', err.response.data.errors[i].message, 'warning')
                                .then(() => {

                                });
                        }
                        break;
                    case 403:
                        Swal.fire('Warning!', err.response.data.errors.message, 'warning')
                            .then(() => {

                            });
                        break;
                    case 404:
                        Swal.fire('Warning!', '404 Not Found!', 'warning')
                            .then(() => {

                            });
                        break;
                    case 500:
                        Swal.fire('Warning!', 'Service is unavailable', 'warning')
                            .then(() => {

                            });
                        break;
                    case 503:
                        Swal.fire('Warning!', 'Service is unavailable', 'warning')
                            .then(() => {

                            });
                        break;
                    default:
                        Swal.fire('Warning!', 'Your Basic Information', 'warning');
                        break;
                }
            })
    },
};

const mutations = {
    allArticleCategories(state, payload) {
        state.allArticleCategories = payload
    },
    isArticleCategories(state, payload) {
        state.isArticleCategories = payload
    },
    getArticleCategories(state, payload) {
        state.getArticleCategories = payload
    },
    popularArticleCategories(state, payload) {
        state.popularArticleCategories = payload
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
