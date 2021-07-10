import '@/node_modules/bootstrap/dist/js/bootstrap.js';
import '@/node_modules/bootstrap/dist/css/bootstrap.css';
import '@/node_modules/jquery/dist/jquery.min.js';
import '@/node_modules/@fortawesome/fontawesome-free/css/all.css';
import '@/node_modules/@fortawesome/fontawesome-free/css/brands.css';
import '@/node_modules/@fortawesome/fontawesome-free/css/regular.css';
import '@/node_modules/@fortawesome/fontawesome-free/css/solid.css';
import '@/helpers/HelperFunctions.js';
import '@/node_modules/sweetalert2/dist/sweetalert2.all.min.js';
import '@/node_modules/sweetalert2/dist/sweetalert2.min.js';
import '@/node_modules/sweetalert2/dist/sweetalert2.min.css';
import '@/node_modules/vue2-dropzone/dist/vue2Dropzone.js';
import '@/node_modules/vue2-dropzone/dist/vue2Dropzone.min.css';
import '../helpers/ErrorHandler.js';
import Vue from 'vue';
import {
    HasError,
    AlertError,
    AlertErrors,
    AlertSuccess
} from 'vform'
import { ValidationProvider } from 'vee-validate';
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);
Vue.component(AlertErrors.name, AlertErrors);
Vue.component(AlertSuccess.name, AlertSuccess);
