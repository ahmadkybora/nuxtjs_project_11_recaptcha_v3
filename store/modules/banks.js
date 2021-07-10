import Axios from 'axios'
import Swal from "sweetalert2";

const state = () => ({
    getBanks: {},
    allBanks: {},
    isBank: {},
});

const getters = {
    getBanks(state) {
        return state.getUsers
    },
    isBank(state) {
        return state.isUser
    },
};

const actions = {

    // panel
    async allBanks(context, all = 'all') {
        await this.$axios.get(`panel/banks?page=${all}`)
            .then(res => {
                const allBanks = res.data.data;
                context.commit('allBanks', allBanks);
            }).catch(err => {
                console.log(err)
            })
    },

    async getBanks(context, page = 1) {
        await this.$axios.get(`panel/banks?page=${page}`)
            .then(res => {
                const getBanks = res.data.data;
                context.commit('getBanks', getBanks);
            }).catch(err => {
                console.log(err)
            })
    },

    showBank(context, payload) {
        const userId = payload.id;
        const users = context.state.getUsers;
        console.log(users[3].id);
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === userId) {
                const isUser = users[i];
                context.commit('isUser', isUser);
            }
        }
    },

    editBank(context, payload) {
        const userId = payload.id;
        const users = context.state.getUsers;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === userId) {
                const isUser = users[i];
                context.commit('isUser', isUser);
            }
        }
    },

    async isBankRegister(context, payload) {
        let formData = new FormData();

        formData.append('title', payload.id);
        formData.append('account_number', payload.account_number);

        await this.$axios.post('panel/banks/store', formData)
            .then(res => {
                switch (res.status) {
                    case 201:
                        Swal.fire('Success!', res.data.message, 'success')
                            .then(() => {
                                const getBanks = res.data.data;
                                context.commit('getBanks', getBanks);
                                //this.$router.push('/panel/users');
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

    async isBankUpdate(context, payload) {
        let formData = new FormData();

        formData.append('title', payload.id);
        formData.append('account_number', payload.account_number);

        await this.$axios.post('panel/banks/' + payload.id, formData)
            .then(res => {
                const getBanks = res.data.data;
                context.commit('getBanks', getBanks);
            }).catch(err => {
                console.log(err)
            })
    },

    /**
     *
     * @param context
     * @param payload
     */
    deleteBank(context, payload) {
        state.isUser = payload.id;
        const id = payload.id;
        Axios.delete(Axios.defaults.baseURL + 'panel/users/' + id)
            .then(() => {
                /*let idx = user.indexOf(id)
                const getUsers = state.getUsers.splice(idx,1)*/
                //context.commit('deleteUser', getUsers);
            }).catch(err => {
            console.log(err)
        })
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async searchBank(context, payload) {
        const full_text_search = {
            full_text_search: payload.full_text_search
        };

        await Axios.post(Axios.defaults.baseURL + 'panel/users/search', full_text_search)
            .then(res => {
                switch (res.status) {
                    case 200:
                        Swal.fire('Success!', res.data.message, 'success')
                            .then(() => {
                                const getUsers = res.data.data;
                                context.commit('getUsers', getUsers);
                            });
                        break;
                    case 403:
                        Swal.fire('Warning!', res.data.message, 'warning')
                            .then(() => {

                            });
                        break;
                    case 422:
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
    myBank(state, payload) {
        state.myBank = payload
    },
    isUser(state, payload) {
        state.isUser = payload
    },
    allBanks(state, payload) {
        state.allBanks = payload
    },
    getBanks(state, payload) {
        state.getBanks = payload
    },
    showBank(state, payload) {
        state.isBank = payload
    },
    editBank(state, payload) {
        state.isBank = payload
    },
    deleteBank(state, payload) {
        state.getBanks = payload
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
