import {success, error} from '../../helpers/ErrorHandler';

const state = () => ({
    allBrands: {},
    isBrands: {},
    getBrands: {},
    popularBrands: {},
});

const getters = {
    allBrands(state) {
        return state.allBrands
    },
    isBrands(state) {
        return state.isBrands
    },
    getBrands(state) {
        return state.getBrands
    },
    popularBrands(state) {
        return state.popularBrands
    },
};

const actions = {

    /**
     *
     * @param context
     * @param all
     * @returns {Promise<void>}
     */
    async allBrands(context, all = 'all') {
        await this.$axios.get(`panel/brands?all=${all}`)
            .then(res => {
                const allBrands = res.data.data;
                context.commit('allBrands', allBrands);
            }).catch(err => {
                error(err);
            })
    },

    /**
     *
     * @param context
     * @returns {Promise<void>}
     */
    async isBrands(context) {
        await this.$axios.get('brands')
            .then(res => {
                const isBrands = res.data.data.brands;
                //const popularBrands = res.data.data.popular_brands;
                context.commit('isBrands', isBrands);
                //context.commit('popularBrands', popularBrands)
            }).catch(err => {
                error(err);
            })
    },

    /**
     *
     * @param context
     * @param page
     * @returns {Promise<void>}
     */
    async getBrands(context, page = 1) {
        await this.$axios.get(`panel/brands?page=${page}`)
            .then(res => {
                const getBrands = res.data.data;
                console.log(getBrands);
                context.commit('getBrands', getBrands)
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
    async RegisterBrand(context, payload) {
        let formData = new FormData();

        formData.append('name', payload.name);
        formData.append('employeeId', payload.employeeId);
        formData.append('description', payload.description);
        formData.append('state', payload.state);
        formData.append('image', payload.image);

        await this.$axios.post('panel/brands/store', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            .then(async res => {
                const getBrands = res.data.data;
                context.commit('getBrands', getBrands);
                await success(res);
                this.$router.push('/panel/brands');
            }).catch(err => {
                error(err)
            })
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async searchBrand(context, payload) {
        const full_text_search = {
            full_text_search: payload.full_text_search
        };

        await this.$axios.post('panel/brands/search', full_text_search)
            .then(res => {
                const getBrands = res.data.data;
                context.commit('getBrands', getBrands);
                this.$router.push('/panel/brands');
            }).catch(err => {
                error(err);
            })
    }
};

const mutations = {
    allBrands(state, payload) {
        state.allBrands = payload
    },
    isBrands(state, payload) {
        state.isBrands = payload
    },
    getBrands(state, payload) {
        state.getBrands = payload
    },
    popularBrands(state, payload) {
        state.popularBrands = payload
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
