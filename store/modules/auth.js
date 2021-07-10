import Axios from 'axios'
import Swal from "sweetalert2";

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
});

const getters = {
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
    }
};

const actions = {
    isEmployeeRegister(context, payload) {
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
        Axios.post(Axios.defaults.baseURL + 'register', register)
            .then(res => {
                const isRegister = res.data.data.data;
                context.commit('isRegister', isRegister);
            });

    },
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
            console.log(myPermissions);
            window.localStorage.setItem('permissions', myPermissions);
            context.commit('myPermissions', myPermissions);

            window.localStorage.setItem('username', username);
            window.localStorage.setItem('full_name', full_name);
            window.localStorage.setItem('is-admin', is_admin);
            window.localStorage.setItem('roles', roles);
            //alert(permissions);
            /*let myPermissions = [];
            for (let i = 0; i < permissions.length; i++) {
                myPermissions = permissions[i].permissionId;
            }
            context.commit('myPermissions', myPermissions);*/

            await this.$auth.setUser(username);
            await this.$auth.setUserToken(token);
            await this.$router.push('/panel/dashboard');
        }
        /*.then(res => {
            const employee = res.data.data;
            const tokenEmployee = employee.accessToken;
            const isLogin = {
                username: employee.username,
                first_name: employee.first_name,
                last_name: employee.last_name,
            };
            context.state.isEmployeeLogin.first_name = employee.first_name;
            context.state.isEmployeeLogin.last_name = employee.last_name;
            context.state.isEmployeeLogin.username = employee.username;

            let is_employee = isLogin.first_name + ' ' + isLogin.last_name;
            let is_admin = isLogin.username;

            window.localStorage.setItem('token-employee', tokenEmployee);
            window.localStorage.setItem('is-admin', is_admin);
            window.localStorage.setItem('is-employee', is_employee);

            //window.localStorage.setItem('token-employee', JSON.stringify(isLogin));

            //if (JSON.parse(window.localStorage.getItem('token')) != null)
            if (window.localStorage.getItem('token-employee') != null && window.localStorage.getItem('is-admin') != null) {
                if (is_admin === 'admin') {
                    this.$router.push('/panel/dashboard');
                    //location.reload();
                } else {
                    this.$router.push('/panel/dashboard');
                    //location.reload();
                }
            }
        })
        .catch(err => {
            console.log(err);
        })*/
    },
    async isEmployeeLogout(context) {
        /*window.localStorage.removeItem('token-employee');
        window.localStorage.removeItem('is-admin');
        window.location.reload();*/

        await this.$axios.get('logout');

        window.localStorage.removeItem('full_name');
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('is-admin');
        window.localStorage.removeItem('roles');
        /*for (let i = 0; i < permissions.length; i++) {
            window.localStorage.setItem(`permissions[${i}]`, permissions[i].permissionId);
        }*/
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
    isUserRegister(context, payload) {
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
        Axios.post(Axios.defaults.baseURL + 'register', register)
            .then(res => {
                switch (res.status) {
                    case 201:
                        Swal.fire('Success!', res.data.message, 'success')
                            .then(() => {
                                const isRegister = res.data.data;
                                context.commit('isRegister', isRegister);
                                this.$router.push('/panel/login');
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

    async isUserLogin(context, payload) {
        try {
            const login = {
                username: payload.username,
                password: payload.password,
            };
            await this.$axios.post('login', login);
            /*.then(res => {
                const user = res.data.data;
                const tokenUser = user.accessToken;
                const isLogin = {
                    username: user.username,
                    first_name: user.first_name,
                    last_name: user.last_name,
                };
            })
            .catch(err => {
                console.log(err);
            });*/
            const auth = await this.$auth.loginWith('local', {data: login});
                if (auth) {

                const username = auth.data.data.username;
                const full_name = auth.data.data.first_name + ' ' + auth.data.data.last_name;
                const token = auth.data.data.accessToken;

                window.localStorage.setItem('username', username);
                window.localStorage.setItem('full_name', full_name);
                //window.localStorage.getItem(user);
                /*console.log(user);
                console.log(token);*/
                //this.$auth.user = user;
                await this.$auth.setUser(username);
                await this.$auth.setUserToken(token);
                //console.log(this.$auth.user);
                //this.$auth.strategy.token.set(token);
                /*console.log(this.$auth.user);
                this.$auth.setUserToken(token);*/
                //this.$auth.setStrategy('local');
                //this.$auth.loggedIn = true;
                //console.log(this.$auth);
                /*const loggedIn = true;
                const user = {
                    first_name: auth.data.data.first_name,
                    last_name: auth.data.data.last_name,
                    username: auth.data.data.username,
                };
                context.isUserLogin = user.first_name;
                context.isUserLogin = user.last_name;
                context.isUserLogin = user.username;

                console.log(user);
                context.commit('isAuthenticated', loggedIn);
                context.commit('loggedInUser', user);*/

                this.$router.push('/')
            }
        } catch (e) {
            console.log(e);
            //this.error = e.response.data.message
        }
        /*context.state.isUserLogin.first_name = user.first_name;
        context.state.isUserLogin.last_name = user.last_name;

        let full_name = isLogin.first_name + ' ' + isLogin.last_name;
        let username = isLogin.username;

        window.localStorage.setItem('token-user', tokenUser);
        window.localStorage.setItem('full_name', full_name);
        window.localStorage.setItem('username', username);*/

        /*if (window.localStorage.getItem('token-user') != null) {
            if (username) {
                this.$router.push('/');
                window.location.reload();
            } else {
                this.$router.push('/login');
                //location.reload();
            }
        }*/

        /*try {
            const login = {
                username: payload.username,
                password: payload.password,
            };
            let response = await this.$auth.loginWith('customStrategy', { data: login });
            console.log(response)
        } catch (err) {
            console.log(err)
        }*/
    },
    async isUserLogout(context) {
        await this.$axios.get('logout');

        window.localStorage.removeItem('username');
        window.localStorage.removeItem('full_name');

        delete window.localStorage.getItem('username');
        delete window.localStorage.getItem('full_name');
        /*await this.$axios.get('logout', {
            headers: {
                Authorization: 'Bearer ' + this.$auth.strategy.token.get(),
            }
        });*/
        await this.$auth.logout();
        /*Axios.get(Axios.defaults.baseURL + 'logout', {
            headers: {
                Authorization: 'Bearer ' + context.state.tokenUser,
            }
        })
            .then(() => {
                window.localStorage.removeItem('token-user');
                window.localStorage.removeItem('is-user');
                delete context.state.tokenUser;
                delete context.state.isUser;
                window.location.reload();
            })
            .catch(err => {
            })*/
    }
};

const mutations = {
    /*isAuthenticated(state, payload) {
        state.auth.loggedIn = payload.loggedIn;
    },
    loggedInUser(state, payload) {
        state.auth.user = payload.user;
        console.log(state.auth.user)
    },*/
    myPermissions(state, payload) {
        console.log(payload.myPermissions);
        state.myPermissions = payload.myPermissions;
        //console.log(state.myPermissions);
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
