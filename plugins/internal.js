import PanelNavbar from "../layouts/panel/Navbar";
import PanelHeader from "../layouts/panel/Header";
import PanelSidebar from "../layouts/panel/Sidebar";
import PanelFooter from "../layouts/panel/Footer";

import ProfileSidebar from "../layouts/profile/Sidebar";

import Vue from 'vue';

Vue.component('v-panel-navbar', PanelNavbar);
Vue.component('v-panel-header', PanelHeader);
Vue.component('v-panel-sidebar', PanelSidebar);
Vue.component('v-panel-footer', PanelFooter);
//Vue.component('pagination', require('laravel-vue-pagination'));

Vue.component('v-profile-sidebar', ProfileSidebar);
