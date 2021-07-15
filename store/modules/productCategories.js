import {success, error} from '../../helpers/ErrorHandler';

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
        await this.$axios.get(`panel/product-categories?all=${all}`)
            .then(res => {
                const allProductCategories = res.data.data;
                context.commit('allProductCategories', allProductCategories);
            })
            .catch(err => {
                error(err)
            })
    },

    /**
     *
     * @param context
     */
    async isProductCategories(context) {
        await this.$axios.get('product-categories')
            .then(res => {
                const isProductCategories = res.data.data;
                //const popularProductCategories = res.data.data.popular_product_categories;
                context.commit('isProductCategories', isProductCategories);
                //context.commit('popularProductCategories', popularProductCategories);
            }).catch(err => {
                error(err);
            })
    },

    /**
     *
     * @param context
     * @returns {Promise<void>}
     */
    async getProductCategories(context) {
        await this.$axios.get('panel/product-categories')
            .then(res => {
                const getProductCategories = res.data.data;
                context.commit('getProductCategories', getProductCategories)
            }).catch(err => {
                error(err);
            })
    },

    /**
     *
     * @param context
     * @param payload
     */
    async isProductCategoriesUpdate(context, payload) {
        const isUpdate = {
            id: payload.id,
            brand_id: payload.brand_id,
            title: payload.title,
            description: payload.description,
        };
        await this.$axios.patch(`panel/product-categories${payload.id}`, isUpdate)
            .then(res => {
                const getProductCategories = res.data.data.data;
                context.commit('getProductCategories', getProductCategories)
            })
            .catch(err => {
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
    async ProductCategoriesCreate(context, payload) {
        let formData = new FormData();
        formData.append("brandId", payload.brandId);
        formData.append("employeeId", payload.employeeId);
        formData.append("name", payload.name);
        formData.append("description", payload.description);
        formData.append("state", payload.state);
        formData.append("image", payload.image);
        await this.$axios.post('panel/product-categories/store', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            .then(res => {
                const getProductCategories = res.data.data;
                context.commit('getProductCategories', getProductCategories);
                this.$router.push('/panel/product-categories');
            })
            .catch(err => {
                error(err);
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
