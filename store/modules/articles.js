import {success, error} from '../../helpers/ErrorHandler';

const state = () => ({
    isArticles: {},
    isArticle: {},
    getArticles: {},
    popularArticles: {},
});

const getters = {
    isArticles(state) {
        return state.isArticles
    },
    getArticles(state) {
        return state.getArticles
    },
    popularArticles(state) {
        return state.popularArticles
    },
};

const actions = {

    /**
     *
     * @param context
     * @returns {Promise<void>}
     */
    async isArticles(context) {
        await this.$axios.get('articles').then(res => {
            const isArticles = res.data.data;
            //const popularArticles = res.data.data.popular_articles;
            context.commit('isArticles', isArticles);
            //context.commit('popularArticles', popularArticles)
        }).catch(err => {
            error(err)
        })
    },

    /**
     *
     * @param context
     * @param page
     */
    async getArticles(context, page = 1) {
        await this.$axios.get(`panel/articles?page=${page}`)
            .then(res => {
                const getArticles = res.data.data;
                context.commit('getArticles', getArticles)
            }).catch(err => {
                error(err)
            })
    },

    /**
     *
     * @param context
     * @param payload
     */
    showArticle(context, payload) {
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

        await this.$axios.post('panel/articles/store', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            .then(async res => {
                const getArticles = res.data.data;
                context.commit('getArticles', getArticles);
                await success(res);
                this.$router.push('/panel/articles');
            })
            .catch(err => {
                error(err);
            })
    },
};

const mutations = {
    isArticles(state, payload) {
        state.isArticles = payload
    },
    isArticle(state, payload) {
        state.isArticle = payload
    },
    getArticles(state, payload) {
        state.getArticles = payload
    },
    popularArticles(state, payload) {
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
