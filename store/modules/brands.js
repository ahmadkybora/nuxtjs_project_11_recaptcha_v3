import Axios from 'axios'
import Swal from "sweetalert2";

window.Swal = Swal;

const state = () => ({
    allBrands: {},
    isBrands: {},
    getBrands: {},
    popularBrands: {},
    //current_page: {},
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

    async allBrands(context, all = 'all') {
        console.log(this.$auth.strategy.token.get());
        await this.$axios.get(`panel/brands?all=${all}`)
            .then(res => {
                const allBrands = res.data.data;
                context.commit('allBrands', allBrands);
            }).catch(err => {
                console.log(err)
            })
    },

    async isBrands(context) {
        await Axios.get(Axios.defaults.baseURL + 'brands')
            .then(res => {
                const isBrands = res.data.data.brands;
                //const popularBrands = res.data.data.popular_brands;
                context.commit('isBrands', isBrands);
                //context.commit('popularBrands', popularBrands)
            }).catch(err => {
                console.log(err)
            })
    },

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

    async RegisterBrand(context, payload) {
        let formData = new FormData();

        formData.append('name', payload.name);
        formData.append('employeeId', payload.employeeId);
        formData.append('description', payload.description);
        formData.append('state', payload.state);
        formData.append('image', payload.image);

        await Axios.post(Axios.defaults.baseURL + 'panel/brands/store', formData,
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
                                const getBrands = res.data.data;
                                context.commit('getBrands', getBrands);
                                this.$router.push('/panel/brands');
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
    },

    async searchBrand(context, payload) {
        const full_text_search = {
            full_text_search: payload.full_text_search
        };

        await Axios.post(Axios.defaults.baseURL + 'panel/brands/search', full_text_search)
            .then(res => {
                switch (res.status) {
                    case 200:
                        Swal.fire('Success!', res.data.message, 'success')
                            .then(() => {
                                const getBrands = res.data.data;
                                context.commit('getBrands', getBrands);
                                this.$router.push('/panel/brands');
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
