import Axios from 'axios';
import Swal from "sweetalert2";

const state = () => ({
    allEmployees: {},
    getEmployees: {},
    isEmployee: {},
});

const getters = {
    allEmployees(state) {
        return state.allEmployees
    },
    getEmployees(state) {
        return state.getEmployees;
    },
    isEmployee(state) {
        return state.isEmployee
    },
};

const actions = {
    /**
     *
     * @param context
     * @param all
     * @returns {Promise<void>}
     */
    async allEmployees(context, all = 'all') {
        await Axios.get(Axios.defaults.baseURL + `panel/employees?all=${all}`)
            .then(res => {
                const allEmployees = res.data.data;
                context.commit('allEmployees', allEmployees);
            }).catch(err => {
                console.log(err)
            })
    },

    /**
     *
     * @param context
     * @param page
     * @returns {Promise<void>}
     */
    async getEmployees(context, page = 1) {
        await Axios.get(Axios.defaults.baseURL + `panel/employees?page=${page}`)
            .then(res => {
                const getEmployees = res.data.data;
                context.commit('getEmployees', getEmployees);
            }).catch(err => {
                console.log(err)
            })
    },

    showEmployee(context, payload) {
        const employeeId = payload.id;
        const employees = context.state.getEmployees;
        console.log(employees[3].id);
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].id === employeeId) {
                const isEmployee = employees[i];
                context.commit('isEmployee', isEmployee);
            }
        }
    },

    editEmployee(context, payload) {
        const employeeId = payload.id;
        const employees = context.state.getEmployees;
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].id === employeeId) {
                const isEmployee = employees[i];
                context.commit('isEmployee', isEmployee);
            }
        }
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async deleteEmployee(context, payload) {
        await Axios.post(Axios.defaults.baseURL + `panel/employees/destroy/${payload.id}`)
            .then(res => {
                switch (res.status) {
                    case 200:
                        Swal.fire('Success!', res.data.message, 'success')
                            .then(() => {
                                const getEmployees = res.data.data;
                                context.commit('getEmployees', getEmployees);
                                this.$router.push('/panel/employees');
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
    },

    /**
     * craete Employee
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async isEmployeeRegister(context, payload) {
        let formData = new FormData();
        formData.append('first_name', payload.first_name);
        formData.append('last_name', payload.last_name);
        formData.append('username', payload.username);
        formData.append('email', payload.email);
        formData.append('mobile', payload.mobile);
        formData.append('home_phone', payload.home_phone);
        formData.append('zip_code', payload.zip_code);
        formData.append('password', payload.password);
        formData.append('confirmation_password', payload.confirmation_password);
        formData.append('home_address', payload.home_address);
        formData.append('work_address', payload.work_address);
        formData.append('state', payload.state);
        formData.append('image', payload.image);

        await Axios.post(Axios.defaults.baseURL + 'panel/employees/store', formData,
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
                                const getEmployees = res.data.data;
                                context.commit('getEmployees', getEmployees);
                                this.$router.push('/panel/employees');
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

    /**
     * update Employee
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async isEmployeeUpdate(context, payload) {
        let formData = new FormData();
        formData.append('first_name', payload.first_name);
        formData.append('last_name', payload.last_name);
        formData.append('username', payload.username);
        formData.append('email', payload.email);
        formData.append('mobile', payload.mobile);
        formData.append('home_phone', payload.home_phone);
        formData.append('zip_code', payload.zip_code);
        formData.append('password', payload.password);
        formData.append('confirmation_password', payload.confirmation_password);
        formData.append('home_address', payload.home_address);
        formData.append('work_address', payload.work_address);
        formData.append('state', payload.state);
        formData.append('image', payload.image);

        await Axios.post(Axios.defaults.baseURL + 'panel/employees/update/' + payload.id, formData,
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
                                const getEmployees = res.data.data;
                                context.commit('getEmployees', getEmployees);
                                this.$router.push('/panel/employees');
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
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async searchEmployee(context, payload) {
        const full_text_search = {
            full_text_search: payload.full_text_search
        };

        await Axios.post(Axios.defaults.baseURL + 'panel/employees/search', full_text_search)
            .then(res => {
                switch (res.status) {
                    case 200:
                        Swal.fire('Success!', res.data.message, 'success')
                            .then(() => {
                                const getEmployees = res.data.data;
                                context.commit('getEmployees', getEmployees);
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
    isEmployee(state, payload) {
        state.isEmployee = payload
    },
    allEmployees(state, payload) {
        state.allEmployees = payload
    },
    getEmployees(state, payload) {
        state.getEmployees = payload
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
