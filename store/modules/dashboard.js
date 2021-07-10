/*
import Axios from 'axios'
import Swal from "sweetalert2";

const state = () => ({
    isArticles: {},
    isArticle: {},
    getArticles: {},
    popularArticles: {},
});

const getters = {
    isArticles (state) {
        return state.isArticles
    },
    getArticles (state) {
        return state.getArticles
    },
    popularArticles (state) {
        return state.popularArticles
    },
};

const actions = {
    isArticles (context) {
        Axios.get(Axios.defaults.baseURL + 'articles').then(res => {
            const isArticles = res.data.data;
            //const popularArticles = res.data.data.popular_articles;
            context.commit('isArticles', isArticles);
            //context.commit('popularArticles', popularArticles)
        }).catch(err => {
            console.log(err)
        })
    },

    /!**
     *
     * @param context
     * @param page
     *!/
    getArticles (context, page = 1) {
        Axios.get(Axios.defaults.baseURL + `panel/articles?page=${page}`)
            .then(res => {
                const getArticles = res.data.data;
                context.commit('getArticles', getArticles)
            }).catch(err => {
            console.log(err)
        })
    },
    showArticle (context, payload) {
        const articleId = payload.article.id;
        const articles = context.state.getArticles;
        console.log(articles[3].id);
        for (let i = 0; i < articles.length; i++) {
            if (articles[i].id === articleId) {
                const isArticle = articles[i];
                context.commit('isArticle', isArticle);
            }
        }
    },

    async RegisterArticle(context, payload) {
        let formData = new FormData();
        formData.append('employeeId', payload.employeeId);
        formData.append('categoryId', payload.categoryId);
        formData.append('name', payload.name);
        formData.append('description', payload.description);
        formData.append('state', payload.state);
        formData.append('image', payload.image);

        await Axios.post(Axios.defaults.baseURL + 'panel/articles/store', formData,
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
                                const getArticles = res.data.data;
                                context.commit('getArticles', getArticles);
                                this.$router.push('/panel/articles');
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
    isArticles (state, payload) {
        state.isArticles = payload
    },
    isArticle (state, payload) {
        state.isArticle = payload
    },
    getArticles (state, payload) {
        state.getArticles = payload
    },
    popularArticles (state, payload) {
        state.popularArticles = payload
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
*/
