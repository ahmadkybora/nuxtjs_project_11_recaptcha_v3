import {success, error} from '../../helpers/ErrorHandler';

const state = () => ({
    myCart: {},
    isCart: {},
});

const getters = {
    getCart(state) {
        return state.myCart
    },
    isCart(state) {
        return state.isUser
    },
};

const actions = {

    /**
     *
     * @param context
     * @returns {Promise<void>}
     */
    async myCart(context) {
        await this.$axios.get('profile/my-cart')
            .then(res => {
                const myCart = res.data.data;
                if (myCart.length === 0)
                    this.$router.push('/');
                context.commit('myCart', myCart);
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
    async removeFromCart(context, payload) {
        await this.$axios.delete('profile/cart/remove/' + payload)
            .then(res => {
                const getCart = res.data.data;
                context.commit('getCart', getCart);
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
    async addToCart(context, payload) {
        await this.$axios.post('profile/cart/add', {
            product_id: payload.productId,
            quantity: payload.totalQty
        })
            .then(res => {
                const getCart = res.data.data.data;
                context.commit('getCart', getCart);
            })
            .catch(err => {
                error(err);
            })
    },
};

const mutations = {
    myCart(state, payload) {
        state.myCart = payload
    },
    isCart(state, payload) {
        state.isCart = payload
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
