<template>
    <div class="container">
        <!--UserRegister-->
        <RoleRegister v-if="hasPermissionCreateRole === createRole" :role="role" :editMode="editMode"></RoleRegister>
        <!--//-->
        <div class="row">
            <!--//-->
            <div class="col-md-12 text-center">
                <div class="row">
                    <div class="col-md-4">
                        <h3>Role Register</h3>
                    </div>
                    <div v-if="hasPermissionCreateRole === createRole" class="col-md-3 offset-5">
                        <button @click="registerUser()" class="btn btn-success">
                            <span><i class="fa fa-user-plus"></i>Register</span>
                        </button>
                        <button id="close" ref="closeRegister" class="btn btn-danger" @click="closeModal()">close
                        </button>
                    </div>
                </div>
            </div>
            <!--//-->
            <form @submit.prevent="onFullTextSearch()" class="form-inline w-50 m-auto">
                <div class="input-group w-100 my-3">
                    <input type="text"
                           name="full_text_search"
                           id="full-text-search"
                           v-model="full_text_search"
                           class="form-control"
                           placeholder="Search...">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </form>
            <!--//-->
            <table class="table table-hover table-light shadow-lg table-striped tab-content table-bordered table-responsive">
                <thead class="text-center">
                <tr>
                    <th>#</th>
                    <th>Role Name</th>
                    <th>Permission Names</th>
                    <th>Status</th>
                    <th>Created At / Updated At</th>
                    <th>Option</th>
                </tr>
                </thead>
                <tbody v-if="hasPermissionAllRole === allRole" class="text-center">
                <tr v-for="(role, index) in roles" :key="role.id">
                    <td>{{ index }}</td>
                    <td v-text="role.name"></td>
                    <span v-for="p in role.PermissionRoles">
                        <td style="font-size: small" v-text="p.Permission.name"></td>
                    </span>
                    <td>
                        <button v-if="role.state === 'ACTIVE'" class="btn btn-success btn-sm disabled"
                                v-text="role.state">ACTIVE
                        </button>
                        <button v-if="role.state === 'INACTIVE'" class="btn btn-warning btn-sm disabled"
                                v-text="role.state">INACTIVE
                        </button>
                        <button v-if="role.state === 'SUSPENDED'" class="btn btn-secondary btn-sm disabled"
                                v-text="role.state">SUSPENDED
                        </button>
                        <button v-if="role.state === 'PENDING'" class="btn btn-danger btn-sm disabled"
                                v-text="role.state">PENDING
                        </button>
                    </td>
                    <td>{{ role.createdAt + ' ' + role.updatedAt }}</td>
                    <td>
                        <a v-if="hasPermissionViewRole === viewRole"
                           @click="userShow(role)"
                           data-toggle="modal"
                           data-target="#exampleModal">
                            <i class="fas fa-eye text-primary"></i>
                        </a>
                        <UserShow :showUser="showUser"></UserShow>
                        /
                        <a v-if="hasPermissionUpdateRole === updateRole"
                           href="#register"
                           @click="userEdit(role)">
                            <i class="fas fa-pen text-success"></i>
                        </a>
                        /
                        <a v-if="hasPermissionDestroyRole === destroyRole"
                           @click="userDelete(role.id)"><i class="fas fa-trash text-danger"></i>
                        </a>
                    </td>
                </tr>
                </tbody>
                <thead class="text-center">
                <tr>
                    <th>#</th>
                    <th>#</th>
                    <th>Role Name</th>
                    <th>Permission Names</th>
                    <th>Status</th>
                    <th>Created At / Updated At</th>
                    <th>Option</th>
                </tr>
                </thead>
            </table>
            <!---------pagination----------->
            <nav aria-label="...">
                <ul class="pagination pagination-sm">
                    <li v-if="current_page > 1"
                        class="page-item">
                        <a @click.prevent="changePage(current_page - 1)"
                           disabled="disabled"
                           class="page-link" href="#" tabindex="-1">
                            Previous
                        </a>
                    </li>
                    <li v-for="page in pages"
                        id="colorBtn"
                        class="page-item">
                        <a @click.prevent="changePage(page)" class="page-link" href="#">{{ page }}</a>
                    </li>
                    <li v-if="current_page < last_page" class="page-item">
                        <a @click.prevent="changePage(current_page + 1)" class="page-link"
                           href="#">Next</a>
                    </li>
                </ul>
            </nav>
            <!--:key="page === current_page"-->
            <!---------pagination----------->
        </div>
    </div>

</template>

<script>
    import $ from 'jquery';
    import RoleRegister from '../../components/panel/RoleRegister';
    import UserShow from '../../components/panel/modal/UserShow';
    import HelperFunctions from '../../helpers/HelperFunctions';

    import {mapState} from 'vuex'

    window.$ = $;
    export default {
        //middleware: 'checkAuthEmployee',
        layout: 'panel',
        name: "Roles",
        components: {RoleRegister, UserShow},
        data() {
            return {
                allRole: 'all-role',
                viewRole: 'view-role',
                createRole: 'create-role',
                updateRole: 'update-role',
                destroyRole: 'destroy-role',
                full_text_search: '',
                page: 1,
                getUsers: {},
                offset: 4,
                name: '',
                permission: '',
                role: '',
                editMode: false,
                showUser: {
                    first_name: '',
                    last_name: '',
                    username: '',
                    email: '',
                },
            }
        },
        mounted() {
            return this.$store.dispatch('Roles/getRoles');
        },
        computed: {
            ...mapState({
                per_page: state => state.Roles.getRoles.per_page,
                last_page: state => state.Roles.getRoles.last_page,
                from: state => state.Roles.getRoles.from,
                to: state => state.Roles.getRoles.to,
                current_page: state => state.Roles.getRoles.current_page,
                total: state => state.Roles.getRoles.total,
                roles: state => state.Roles.getRoles.data,
                //showUser: state => state.Users.isUser,
                editUser: state => state.Roles.isUser,
                //deleteUser: state => state.Users.isUser,
            }),
            pages() {
                let pagesArray = [];
                var form = this.current_page - this.offset;
                if (form < 1) {
                    form = 1
                }
                var to = form + (this.offset * 2);
                if (to >= this.last_page) {
                    to = this.last_page;
                }
                while (form <= to) {
                    pagesArray.push(form);
                    form++;
                }
                return pagesArray;
            },
            hasPermissionAllRole() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.allRole).toString();
            },
            hasPermissionViewRole() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.viewRole).toString();
            },
            hasPermissionCreateRole() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.createRole).toString();
            },
            hasPermissionUpdateRole() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.updateRole).toString();
            },
            hasPermissionDestroyRole() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.destroyRole).toString();
            },
        },
        methods: {
            changePage(page) {
                //this.current_page = page;
                return this.$store.dispatch('Roles/getRoles', page);
            },
            closeModal() {
                HelperFunctions.closeModal();
            },
            userShow(user) {
                this.showUser = {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    username: user.username,
                    email: user.email,
                };
            },
            userEdit(role) {
                this.editMode = true;
                this.role = role;
            },
            userDelete(id) {
                return this.$store.dispatch('Users/deleteUser', {id});
            },
            registerUser() {
                this.editMode = false;
                this.user = '';
                $('#user-register').toggle();
            },
            onFullTextSearch() {
                const full_text_search = this.full_text_search;
                return this.$store.dispatch('Users/searchUser', {full_text_search});
            },
        }
    }
</script>

<style scoped>

</style>
