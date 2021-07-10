import Axios from 'axios'
import Swal from "sweetalert2";
import HelperFunctions from "../../helpers/HelperFunctions";

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

    async myCart(context) {
        await this.$axios.get('profile/my-cart')
            .then(res => {
                const myCart = res.data.data;
                if (myCart.length === 0)
                    this.$router.push('/');
                context.commit('myCart', myCart);
            }).catch(err => {
                console.log(err)
            })
    },

    async removeFromCart(context, payload) {
        await Axios.delete(Axios.defaults.baseURL + 'profile/cart/remove/' + payload)
            .then(res => {
                const getCart = res.data.data;
                context.commit('getCart', getCart);
                switch (res.status) {
                    case 200:
                        Swal.fire('Success!', res.data.message, 'success')
                            .then(() => {
                                if (getCart.length === 0)
                                    this.$router.push('/');
                                let idx = context.state.getCart.indexOf(payload);
                                context.state.getCart.splice(idx, 1);
                            });
                        break;

                    case 403:
                        Swal.fire('Warning!', res.data.message, 'warning')
                            .then(() => {
                                location.reload();
                            });
                        break;

                    default:
                        Swal.fire('Warning!', 'Your Basic Information', 'warning');
                        break;
                }
            })
            .catch(err => {
                switch (err.response.status) {
                    case 422:
                        var errMsg = [];
                        for (var error in err.response.data.errors) {
                            Swal.fire('Error!', error, 'error')
                                .then(() => {

                                });
                        }
                        break;

                    case 500:
                        Swal.fire('Danger!', 'Service is Unavailable', 'error')
                            .then(() => {
                                //location.reload();
                            });
                        break;

                    case 503:
                        Swal.fire('Danger!', 'Service is Unavailable', 'error')
                            .then(() => {
                                //location.reload();
                            });
                        break;

                    default:
                        Swal.fire('Warning!', 'Your Basic Information', 'warning');
                        break;
                }
            })
    },

    async addToCart(context, payload) {
        await Axios.post(Axios.defaults.baseURL + 'profile/cart/add', {
            product_id: payload.productId,
            quantity: payload.totalQty
        })
            .then(res => {
                const getCart = res.data.data.data;
                context.commit('getCart', getCart);
                switch (res.status) {
                    case 200:
                        Swal.fire('Success!', res.data.message, 'success')
                            .then(() => {
                                location.reload();
                            });
                        break;

                    case 403:
                        Swal.fire('Warning!', res.data.message, 'warning')
                            .then(() => {
                                location.reload();
                            });
                        break;

                    default:
                        Swal.fire('Warning!', 'Your Basic Information', 'warning');
                        break;
                }
            })
            .catch(err => {
                switch (err.response.status) {
                    case 422:
                        var errMsg = [];
                        for (var error in err.response.data.errors) {
                            Swal.fire('Error!', error, 'error')
                                .then(() => {

                                });
                        }
                        break;

                    case 500:
                        Swal.fire('Danger!', 'Service is Unavailable', 'error')
                            .then(() => {
                                //location.reload();
                            });
                        break;

                    case 503:
                        Swal.fire('Danger!', 'Service is Unavailable', 'error')
                            .then(() => {
                                //location.reload();
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
