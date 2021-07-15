import {success, error} from '../../helpers/ErrorHandler';

/*
|--------------------------------------------------------------------------
| State Part
|--------------------------------------------------------------------------
*/
const state = () => ({
    allArticleCategories: {},
    isArticleCategories: {},
    getArticleCategories: {},
    popularArticleCategories: {},
});

/*
|--------------------------------------------------------------------------
| Getters Part
|--------------------------------------------------------------------------
*/
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

/*
|--------------------------------------------------------------------------
| Actions Part
|--------------------------------------------------------------------------
*/
const actions = {

    /**
     *
     * @param context
     * @param all
     * @returns {Promise<void>}
     */
    async allArticleCategories(context, all = 'all') {
        await this.$axios.get(`panel/article-categories?all=${all}`)
            .then(res => {
                const allArticleCategories = res.data.data;
                context.commit('allArticleCategories', allArticleCategories);
                success(res)
            }).catch(err => {
                error(err)
            })
    },

    /**
     *
     * @param context
     */
    async isArticleCategories(context) {
        await this.$axios.get('article-categories')
            .then(res => {
                const isArticleCategories = res.data.data;
                console.log(isArticleCategories);
                //const popularArticleCategories = res.data.data.popular_articles;
                context.commit('isArticleCategories', isArticleCategories);
                //context.commit('popularArticleCategories', popularArticleCategories)
            }).catch(err => {
                error(err)
            })
    },

    /**
     *
     * @param context
     */
    async getArticleCategories(context, page = 1) {
        await this.$axios.get(`panel/article-categories?page=${page}`)
            .then(res => {
                const getArticleCategories = res.data.data;
                context.commit('getArticleCategories', getArticleCategories);
            }).catch(err => {
                error(err)
            })
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     * @constructor
     */
    async RegisterArticleCategory(context, payload) {
        let formData = new FormData();
        formData.append('employeeId', payload.employeeId);
        formData.append('name', payload.name);
        formData.append('description', payload.description);
        formData.append('state', payload.state);
        formData.append('image', payload.image);

        await this.$axios.post('panel/article-categories/store', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            .then(res => {
                const getArticleCategories = res.data.data;
                context.commit('getArticleCategories', getArticleCategories);
                success(res);
                this.$router.push('/panel/article-categories');
            }).catch(err => {
                error(err);
            })
    },
};

/*
|--------------------------------------------------------------------------
| Mutations Part
|--------------------------------------------------------------------------
*/
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
