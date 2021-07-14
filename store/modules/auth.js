import {success, error} from '../../helpers/ErrorHandler';

const state = () => ({
    tokenEmployee: window.localStorage.getItem('token-employee'),
    tokenUser: window.localStorage.getItem('token-user'),
    isUser: window.localStorage.getItem('is-user'),
    username: window.localStorage.getItem('username'),
    full_name: window.localStorage.getItem('full_name'),
    is_employee: window.localStorage.getItem('is-employee'),
    isEmployee: window.localStorage.getItem('is-admin'),
    roles: window.localStorage.getItem('is-admin'),
    permissions: window.localStorage.getItem('permissions'),
    myPermissions: {},
    isEmployeeLogin: {
        first_name: '',
        last_name: '',
        username: '',
    },
    isEmployeeRegister: {},
    isUserLogin: {
        first_name: '',
        last_name: '',
        username: '',
    },
    isUserRegister: {},
    //forgetPassword: window.localStorage.getItem('forget-password')
    forgetPassword: ''
});

const getters = {
    forgetPassword(state) {
        return state.forgetPassword
    },
    myPermissions(state) {
        //console.log(state.myPermissions);
        return state.myPermissions
    },
    isAuthenticated(state) {
        return state.auth.loggedIn
    },
    loggedInUser(state) {
        return state.auth.user
    },

    isAuthenticatedUser(state) {
        return state.tokenUser
    },
    isAuthenticatedEmployee(state) {
        return state.tokenEmployee
    },
    fullNameUser(state) {
        return state.isUserLogin.first_name + ' ' + state.isUserLogin.last_name;
    },
    fullNameEmployee(state) {
        return state.isEmployeeLogin.first_name + ' ' + state.isEmployeeLogin.last_name;
    },
    getUsers(state) {
        return state.forgetPassword
    },
};

const actions = {

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async isEmployeeRegister(context, payload) {
        const register = {
            first_name: payload.first_name,
            last_name: payload.last_name,
            username: payload.username,
            email: payload.email,
            mobile: payload.mobile,
            home_phone: payload.home_phone,
            zip_code: payload.zip_code,
            password: payload.password,
            home_address: payload.home_address,
            work_address: payload.work_address,
        };
        await this.$axios.post('register', register)
            .then(res => {
                const isRegister = res.data.data.data;
                context.commit('isRegister', isRegister);
            })
            .catch(err => {
                error(err);
            });

    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async isEmployeeLogin(context, payload) {
        const login = {
            username: payload.username,
            password: payload.password,
        };
        await this.$axios.post('login', login);
        const auth = await this.$auth.loginWith('local', {data: login});
        if (auth) {
            const username = auth.data.data.username;
            const full_name = auth.data.data.first_name + ' ' + auth.data.data.last_name;
            const token = auth.data.data.accessToken;
            const is_admin = auth.data.data.isAdmin;
            const roles = auth.data.data.roles;
            const permissions = auth.data.data.permissions;
            let myPermissions = [];
            for (let i = 0; i < permissions.length; i++) {
                myPermissions[i] = permissions[i].Permission.name;
            }

            window.localStorage.setItem('permissions', myPermissions);
            context.commit('myPermissions', myPermissions);

            window.localStorage.setItem('username', username);
            window.localStorage.setItem('full_name', full_name);
            window.localStorage.setItem('is-admin', is_admin);
            window.localStorage.setItem('roles', roles);

            await this.$auth.setUser(username);
            await this.$auth.setUserToken(token);
            await this.$router.push('/panel/dashboard');
        }
    },

    /**
     *
     * @param context
     * @returns {Promise<void>}
     */
    async isEmployeeLogout(context) {
        await this.$axios.get('logout');

        window.localStorage.removeItem('full_name');
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('is-admin');
        window.localStorage.removeItem('roles');

        window.localStorage.removeItem('permissions');

        delete window.localStorage.getItem('full_name');
        delete window.localStorage.getItem('username');
        delete window.localStorage.getItem('is-admin');
        delete window.localStorage.getItem('roles');
        delete window.localStorage.getItem('permissions');

        await this.$auth.logout();

        /*await this.$axios.get('logout', {
            headers: {
                Authorization: 'Bearer ' + context.state.tokenEmployee,
            }
        })
            .then(() => {
                window.localStorage.removeItem('token-employee');
                window.localStorage.removeItem('is-admin');
                window.localStorage.removeItem('is-employee');

                delete context.state.tokenEmployee;
                delete context.state.isEmployee;
                delete context.state.is_employee;

                window.location.reload();
            })
            .catch(err => {
            })*/
    },

    /**
     *
     * @param context
     * @param payload
     */
    async isUserRegister(context, payload) {
        const register = {
            first_name: payload.first_name,
            last_name: payload.last_name,
            username: payload.username,
            email: payload.email,
            mobile: payload.mobile,
            home_phone: payload.home_phone,
            zip_code: payload.zip_code,
            password: payload.password,
            confirmation_password: payload.confirmation_password,
            home_address: payload.home_address,
            work_address: payload.work_address,
        };
        await this.$axios.post('register', register)
            .then(async res => {
                const isRegister = res.data.data;
                context.commit('isRegister', isRegister);
                await success(res);
                this.$router.push('/panel/login');
            }).catch(err => {
                error(err);
            })
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async isUserLogin(context, payload) {
        const login = {
            google_rECAPTCHA: payload.google_rECAPTCHA,
            username: payload.username,
            password: payload.password,
        };

        await this.$axios.post('login', login)
            .then(async (result) => {
                if (result) {
                    const auth = await this.$auth.loginWith('local', {data: login});
                    if (auth) {
                        const username = auth.data.data.username;
                        const full_name = auth.data.data.first_name + ' ' + auth.data.data.last_name;
                        const token = auth.data.data.accessToken;
                        window.localStorage.setItem('username', username);
                        window.localStorage.setItem('full_name', full_name);
                        await this.$auth.setUser(username);
                        await this.$auth.setUserToken(token);
                        await this.$router.push('/')
                    }
                }
            })
            .catch(async err => {
                await error(err);
                return this.$router.push('errors/401')
            });
    },

    /**
     *
     * @param context
     * @returns {Promise<void>}
     */
    async isUserLogout(context) {
        await this.$axios.get('logout')
            .then(async result => {
                if (result) {
                    window.localStorage.removeItem('username');
                    window.localStorage.removeItem('full_name');

                    delete window.localStorage.getItem('username');
                    delete window.localStorage.getItem('full_name');
                    await this.$auth.logout();
                }
            })
            .catch(err => {
                error(err);
            });
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async forgetPassword(context, payload) {
        const forgetPassword = {
            google_rECAPTCHA: payload.google_rECAPTCHA,
            email: payload.email,
        };
        await this.$axios.post('forget-password', forgetPassword)
            .then(async (res) => {
                const forgetPassword = res.data.data.data;
                console.log(forgetPassword);
                //window.localStorage.setItem('forget-password', forgetPassword);
                context.commit('forgetPassword', forgetPassword);
                //console.log(forgetPassword);
                await success(res);
                return this.$router.push('/')
            }).catch((err) => {
                error(err)
            });
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async resetPassword(context, payload) {
        const resetPassword = {
            google_rECAPTCHA: payload.google_rECAPTCHA,
            signature: payload.signature,
            current_password: payload.current_password,
            new_password: payload.new_password,
            new_confirmation_password: payload.new_confirmation_password,
        };
        await this.$axios.post('reset-password/:signature', resetPassword)
            .then(async (res) => {
                const forgetPassword = res.data.data.data;
                //window.localStorage.setItem('forget-password', forgetPassword);
                context.commit('forgetPassword', forgetPassword);
                await success(res);
                return this.$router.push('/')
            }).catch((err) => {
                error(err)
            });
    },
};

const mutations = {
    forgetPassword(state, payload) {
        state.forgetPassword = payload
    },
    myPermissions(state, payload) {
        console.log(payload.myPermissions);
        state.myPermissions = payload.myPermissions;
    },
    accessToken(state, payload) {
        state.token = payload.token
    },
    isEmployeeRegister(state, payload) {
        state.status = 'success';
        state.token = payload.token;
        state.user = payload.user;
    },
    isEmployeeLogin(state, payload) {
        state.isEmployeeLogin = payload;
    },
    isUserRegister(state, payload) {
        state.status = 'success';
        state.token = payload.token;
        state.user = payload.user;
    },
    isEmployeeLogout(state) {
        state.tokenEmployee = '';
    },
    isUserLogin(state, payload) {
        state.tokenUser = payload;
    },
    isUserLogout(state) {
        state.token = '';
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
