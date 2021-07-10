import Axios from 'axios'
import Swal from 'sweetalert2';

window.Swal = Swal;
import HelperFunctions from '../../helpers/HelperFunctions';

const state = () => ({
    isProducts: {},
    getProducts: {},
    getProductsPagination: {},
    popularProducts: {},
    isFile: {},
});

const getters = {
    isProducts(state) {
        return state.isProducts
    },
    getProducts(state) {
        return state.getProducts
    },
    popularProducts(state) {
        return state.popularProducts
    },
};

const actions = {
    async isProducts(context) {
        await Axios.get(Axios.defaults.baseURL + 'products')
            .then(res => {
                const isProducts = res.data.data;
                //const popularProducts = res.data.data.popular_products;
                context.commit('isProducts', isProducts);
                //context.commit('popularProducts', popularProducts)
            })
            .catch(err => {
                Swal.fire('Warning!', err, 'warning',
                );
            })
    },

    /**
     *
     * @param context
     * @param page
     * @returns {Promise<void>}
     */
    async getProducts(context, page = 1) {
        await Axios.get(Axios.defaults.baseURL + `panel/products?page= ${page}`)
            .then(res => {
                const getProducts = res.data.data;
                console.log(getProducts);
                context.commit('getProducts', getProducts)
            })
            .catch(err => {
                console.log(err)
            })
    },
    async isProductUpdate(context, payload) {
        const isUpdate = {
            id: payload.id,
            category_id: payload.category_id,
            title: payload.title,
            description: payload.description,
            price: payload.price,
            icon: payload.icon,
            status: payload.status,
        };
        await Axios.patch(Axios.defaults.baseURL + 'panel/products/' + payload.id, isUpdate)
            .then(res => {
                switch (res.status) {
                    case 200:
                        Swal.fire('Success!', res.data.message, 'success')
                            .then(() => {
                                HelperFunctions.closeModal();
                            });
                        break;
                    case 403:
                        Swal.fire('Warning!', res.data.message, 'warning')
                            .then(() => {
                                location.reload();
                            });
                        break;
                    case 503:
                        Swal.fire('Danger!', 'Service is Unavailable', 'error');
                        break;
                    default:
                        Swal.fire('Warning!', 'Your Basic Information', 'warning');
                        break;
                }
            })
            .catch(err => {
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
    async ProductCreate(context, payload) {
        let formData = new FormData();
        formData.append("categoryId", payload.categoryId);
        formData.append("name", payload.name);
        formData.append("description", payload.description);
        formData.append("price", payload.price);
        formData.append("image", payload.image);
        formData.append("status", payload.status);

        await Axios.post(Axios.defaults.baseURL + 'panel/products/store', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                switch (res.status) {
                    case 201:
                        Swal.fire('Success!', res.data.message, 'success')
                            .then(() => {
                                const getProducts = res.data.data;
                                context.commit('getProducts', getProducts);
                                this.$router.push('/panel/products');
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
    async deleteProduct(context, payload) {
        await Swal.fire({
            title: 'Are you sure?',
            text: "It will be deleted permanently!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            showLoaderOnConfirm: true,
        }).then((result) => {
            if (result.value) {
                Axios.delete(Axios.defaults.baseURL + 'panel/product/' + payload.id)
                    .then(res => {
                        switch (res.status) {
                            case 200:
                                Swal.fire('Success!', res.data.message, 'success')
                                    .then(() => {
                                        let idx = context.state.getProducts.indexOf(payload.id);
                                        context.state.getProducts.splice(idx, 1);
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
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        });
    },
    uploadFile() {
        /*console.log([...file])
        axios.post('/import', file,{ headers: {
                'Content-Type': 'multipart/form-data'
            }})
            .then(response => {
                console.log(response.data)
                context.commit('importTodos', response.data)
            })
            .catch(error => {
                console.log(error.response.data)
            })*/
    },

    async ProductLike(context, payload) {
        const ProductLike = {
            username: payload.username,
            productId: payload.productId,
        };
        await Axios.post(Axios.defaults.baseURL + 'product-likes', ProductLike)
            .then(res => {
                switch (res.status) {
                    case 200:
                        Swal.fire('Success!', res.data.message, 'success')
                            .then(() => {
                                const getProducts = res.data.data;
                                context.commit('getProducts', getProducts);
                                this.$router.push('/panel/products');
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

    async ProductDisLike(context, payload) {
        const ProductLike = {
            username: payload.username,
            productId: payload.productId,
        };
        await Axios.post(Axios.defaults.baseURL + 'product-dislikes', ProductLike)
            .then(res => {
                switch (res.status) {
                    case 200:
                        Swal.fire('Success!', res.data.message, 'success')
                            .then(() => {
                                const getProducts = res.data.data;
                                context.commit('getProducts', getProducts);
                                this.$router.push('/');
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

    async ProductFavorite(context, payload) {
        const ProductFavorite = {
            username: payload.username,
            productId: payload.productId,
        };
        await Axios.post(Axios.defaults.baseURL + 'product-favorite', ProductFavorite)
            .then(res => {
                switch (res.status) {
                    case 200:
                        Swal.fire('Success!', res.data.message, 'success')
                            .then(() => {
                                const getProducts = res.data.data;
                                context.commit('getProducts', getProducts);
                                this.$router.push('/panel/products');
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

    async ProductUnFavorite(context, payload) {
        const ProductUnFavorite = {
            username: payload.username,
            productId: payload.productId,
        };
        await Axios.post(Axios.defaults.baseURL + 'product-unfavorite', ProductUnFavorite)
            .then(res => {
                switch (res.status) {
                    case 200:
                        Swal.fire('Success!', res.data.message, 'success')
                            .then(() => {
                                const getProducts = res.data.data;
                                context.commit('getProducts', getProducts);
                                this.$router.push('/');
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
    }
};

const mutations = {
    isFile(state, payload) {
        state.isFile = payload
    },
    isProducts(state, payload) {
        state.isProducts = payload
    },
    getProducts(state, payload) {
        state.getProducts = payload
    },
    popularProducts(state, payload) {
        state.popularProducts = payload
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
