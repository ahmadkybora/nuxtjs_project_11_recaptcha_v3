<template>
    <div class="container">
        <!--UserRegister-->
        <UserRegister v-if="hasPermissionCreateUser === createUser" :user="user" :editMode="editMode"></UserRegister>
        <!--//-->
        <div class="row">
            <!--//-->
            <div class="col-md-12 text-center">
                <div class="row">
                    <div class="col-md-4">
                        <h3>User Register</h3>
                    </div>
                    <div v-if="hasPermissionCreateUser === createUser" class="col-md-3 offset-5">
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
                    <th>Full Name</th>
                    <th>UserName</th>
                    <th>Email</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Created At / Updated At</th>
                    <th>Option</th>
                </tr>
                </thead>
                <tbody class="text-center">
                <tr v-if="hasPermissionAllUser === allUser"
                    v-for="(user, index) in users"
                    :key="user.id">
                    <td>{{ index }}</td>
                    <td>{{ user.first_name + ' ' + user.last_name }}</td>
                    <td v-text="user.username"></td>
                    <td v-text="user.email"></td>
                    <td>
                        <img class="rounded-circle" :src="user.image" style="width: 50px; height: 50px">
                    </td>
                    <td>
                        <button v-if="user.state === 'ACTIVE'" class="btn btn-success btn-sm disabled"
                                v-text="user.state">ACTIVE
                        </button>
                        <button v-if="user.state === 'INACTIVE'" class="btn btn-warning btn-sm disabled"
                                v-text="user.state">INACTIVE
                        </button>
                        <button v-if="user.state === 'SUSPENDED'" class="btn btn-secondary btn-sm disabled"
                                v-text="user.state">SUSPENDED
                        </button>
                        <button v-if="user.state === 'PENDING'" class="btn btn-danger btn-sm disabled"
                                v-text="user.state">PENDING
                        </button>
                    </td>
                    <td>{{ user.createdAt + ' ' + user.updatedAt }}</td>
                    <td>
                        <a v-if="hasPermissionViewUser === viewUser"
                           @click="userShow(user)"
                           data-toggle="modal"
                           data-target="#exampleModal">
                            <i class="fas fa-eye text-primary"></i>
                        </a>
                        <UserShow v-if="hasPermissionViewUser ===viewUser"
                                  :showUser="showUser">
                        </UserShow>
                        /
                        <a v-if="hasPermissionUpdateUser === updateUser"
                           href="#register" @click="userEdit(user)"><i class="fas fa-pen text-success"></i>
                        </a>
                        /
                        <a v-if="hasPermissionDestroyUser === destroyUser"
                           @click="userDelete(user.id)">
                            <i class="fas fa-trash text-danger"></i>
                        </a>
                    </td>
                </tr>
                </tbody>
                <thead class="text-center">
                <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>UserName</th>
                    <th>Email</th>
                    <th>Image</th>
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
    import UserRegister from '../../components/panel/UserRegister';
    import UserShow from '../../components/panel/modal/UserShow';
    import HelperFunctions from '../../helpers/HelperFunctions';

    import {mapState} from 'vuex'

    window.$ = $;
    export default {
        //middleware: 'checkAuthEmployee',
        layout: 'panel',
        name: "Users",
        components: {UserRegister, UserShow},
        data() {
            return {
                allUser: 'all-user',
                viewUser: 'view-user',
                createUser: 'create-user',
                updateUser: 'update-user',
                destroyUser: 'destroy-user',
                permissions: {},
                full_text_search: '',
                page: 1,
                getUsers: {},
                offset: 4,
                name: '',
                description: '',
                user: '',
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
            console.log(this.hasPermissionCreateUser);
            return this.$store.dispatch('Users/getUsers')
                .then(() => {
                    this.$store.dispatch('Auth/isEmployeeLogin')
                });
        },
        computed: {
            ...mapState({
                per_page: state => state.Users.getUsers.per_page,
                last_page: state => state.Users.getUsers.last_page,
                from: state => state.Users.getUsers.from,
                to: state => state.Users.getUsers.to,
                current_page: state => state.Users.getUsers.current_page,
                total: state => state.Users.getUsers.total,
                users: state => state.Users.getUsers.data,
                //showUser: state => state.Users.isUser,
                editUser: state => state.Users.isUser,
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
            hasPermissionAllUser() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.allUser).toString();
            },
            hasPermissionViewUser() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.viewUser).toString();
            },
            hasPermissionCreateUser() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.createUser).toString();
            },
            hasPermissionUpdateUser() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.updateUser).toString();
            },
            hasPermissionDestroyUser() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.destroyUser).toString();
            },
            /*console.log(permissions);
            console.log(typeof permissions);
            console.log(typeof this.createUser);*/
            /*console.log(permissions);
            for (let permission in permissions) {
                console.log(permission.value);
                /!*console.log(this.createUser);
                if (permissions[i] === this.createUser) {
                    return permissions[i];
                } else {
                    return 0;
                }*!/
            }*/
            /*permissions.forEach((x) => {
                if (x === "26") {
                    return x;
                } else {
                    return 0;
                }
            })*/
        },
        methods: {
            changePage(page) {
                //this.current_page = page;
                return this.$store.dispatch('Users/getUsers', page);
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
            userEdit(user) {
                this.editMode = true;
                this.user = user;
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
