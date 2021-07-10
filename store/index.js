import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex);
Axios.defaults.baseURL = 'http://localhost:3001/api/';
//Vue.prototype.$http = Axios;

import Auth from './modules/auth';
import Users from './modules/users';
import Employees from './modules/employees';
import Products from './modules/products';
import ProductCategories from './modules/productCategories';
import Articles from './modules/articles';
import ArticleCategories from './modules/articleCategories';
import Brands from './modules/brands';
import Carts from './modules/carts';
import Transactions from './modules/transactions';
import Banks from './modules/banks';
import Roles from './modules/roles';
//import Dashboard from './modules/Dashboard';

const employeeToken = window.localStorage.getItem('token-employee');
const userToken = window.localStorage.getItem('token-user');

if (employeeToken !== null && employeeToken !== undefined) {
    this.$axios.setHeader('Authorization', `Bearer ${employeeToken}`);
    this.$axios.setHeader('Accept', 'Application/json');
    Axios.defaults.headers.common.Authorization = `Bearer ${employeeToken}`;
    Axios.defaults.headers.common.Accept = 'Application/json';
    Axios.defaults.headers.common['X-Requested-With'] = 'XmlHttpRequest';
}

if (userToken !== null && userToken !== undefined) {
    this.$axios.setHeader('Authorization', `Bearer ${userToken}`);
    this.$axios.setHeader('Accept', 'Application/json');
    Axios.defaults.headers.common.Authorization = `Bearer ${userToken}`;
    Axios.defaults.headers.common.Accept = 'Application/json';
    Axios.defaults.headers.common['X-Requested-With'] = 'XmlHttpRequest';
}

const createStore = () => {

    return new Vuex.Store({
        state: () => ({
            /*      tokenEmployee: window.localStorage.getItem('token-employee'),
                  tokenUser: window.localStorage.getItem('token-user'),*/
            /*auth: {
                loggedIn: '',
                user: {
                    username: 'ahmad'
                },
            }*/
        }),
        actions: {},
        mutations: {},
        getters: {
            /*isAuthenticated(state) {
                return state.auth.loggedIn
            },

            loggedInUser(state) {
                return state.auth.user
            }*/
        },
        modules: {
            Auth,
            Users,
            Employees,
            Products,
            ProductCategories,
            Articles,
            ArticleCategories,
            Brands,
            Carts,
            Transactions,
            Banks,
            Roles,
            //Dashboard
        }
    })
};

export default createStore;
