<template>
    <div class="container">
        <!--UserRegister-->
        <EmployeeRegister v-if="hasPermissionCreateOrder === createOrder" :employee="employee" :editMode="editMode"></EmployeeRegister>
        <!--//-->
        <div class="row">
            <div class="col-md-12 text-center">
                <div class="row">
                    <div class="col-md-4">
                        <h3>Employee Register</h3>
                    </div>
                    <div v-if="hasPermissionCreateOrder === createOrder" class="col-md-3 offset-5">
                        <button @click="registerEmployee()" class="btn btn-success">
                            <span><i class="fa fa-user-plus"></i>Register</span>
                        </button>
                        <button id="close" ref="closeRegister" class="btn btn-danger" @click="closeModal()">close</button>
                    </div>
                </div>
            </div>
            <table class="table table-striped tab-content table-bordered table-responsive">
                <thead class="text-center">
                <tr>
                    <th>#</th>
                    <th>
                        <form class="form-inline" @submit.prevent="onFullNameSearch()">
                            <div class="form-group">
                                <input type="text" v-model="full_name_search" name="full-name" id="full-name"
                                       class="form-control" placeholder="Full Name">
                            </div>
                            <div class="form-group">
                                <button type="submit" class="form-control btn btn-sm btn-success"><i
                                        class="fas fa-search"></i></button>
                            </div>
                        </form>
                    </th>
                    <th>
                        <!--<form class="form-inline" @submit.prevent="onUserNameSearch()">
                            <div class="form-group">
                                <input type="text" v-model="username_search" name="username" id="username"
                                       class="form-control" placeholder="User Name">
                            </div>
                            <div class="form-group">
                                <button type="submit" class="form-control btn btn-sm btn-success"><i
                                        class="fas fa-search"></i></button>
                            </div>
                        </form>-->
                    </th>
                    <th>
                        <!--<form class="form-inline" @submit.prevent="onEmailSearch()">
                            <div class="form-group">
                                <input type="email" v-model="email_search" name="email" id="email" class="form-control"
                                       placeholder="Email">
                            </div>
                            <div class="form-group">
                                <button type="submit" class="form-control btn btn-sm btn-success"><i
                                        class="fas fa-search"></i></button>
                            </div>
                        </form>-->
                    </th>
                    <th>
                        <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                            <option value="SUSPENDED">SUSPENDED</option>
                            <option value="PENDING">PENDING</option>
                        </select>
                    </th>
                    <th>#</th>
                    <th>#</th>
                </tr>
                </thead>
                <thead class="text-center">
                <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>UserName</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Icon</th>
                    <th>Status</th>
                    <th>Created At / Updated At</th>
                    <th>Option</th>
                </tr>
                </thead>
                <tbody class="text-center">
                <tr v-if="hasPermissionAllOrder === allOrder"
                    v-for="(employee, index) in employees"
                    :key="employee.id">
                    <td>{{ index }}</td>
                    <td>{{ employee.first_name + ' ' + employee.last_name }}</td>
                    <td v-text="employee.username"></td>
                    <td v-text="employee.email"></td>
                    <td v-if="employee.gender === 0">Female</td>
                    <td v-else-if="employee.gender === 1">Male</td>
                    <td>
                        <img class="rounded-circle" :src="employee.icon" style="width: 50px; height: 50px">
                    </td>
                    <td>
                        <button v-if="employee.state === 'ACTIVE'" class="btn btn-success btn-sm disabled"
                                v-text="employee.state">ACTIVE
                        </button>
                        <button v-if="employee.state === 'INACTIVE'" class="btn btn-warning btn-sm disabled"
                                v-text="employee.state">INACTIVE
                        </button>
                        <button v-if="employee.state === 'SUSPENDED'" class="btn btn-secondary btn-sm disabled"
                                v-text="employee.state">SUSPENDED
                        </button>
                        <button v-if="employee.state === 'PENDING'" class="btn btn-danger btn-sm disabled"
                                v-text="employee.state">PENDING
                        </button>
                    </td>
                    <td>{{ employee.created_at + ' ' + employee.updated_at }}</td>
                    <td>
                        <a v-if="hasPermissionViewOrder === viewOrder"
                           @click="employeeShow(employee)"
                           data-toggle="modal"
                           data-target="#exampleModal">
                            <i class="fas fa-eye text-primary"></i>
                        </a>
                        <EmployeeShow v-if="hasPermissionViewOrder === viewOrder"
                                      :showEmployee="showEmployee">
                        </EmployeeShow>
                        /
                        <a v-if="hasPermissionUpdateOrder === updateOrder"
                           href="#register" @click="employeeEdit(employee)"><i class="fas fa-pen text-success"></i>
                        </a>
                        /
                        <a v-if="hasPermissionDestroyOrder === DestroyOrder"
                           @click="employeeDelete(employee.id)"><i class="fas fa-trash text-danger"></i>
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
                    <th>Gender</th>
                    <th>Icon</th>
                    <th>Status</th>
                    <th>Created At / Updated At</th>
                    <th>Option</th>
                </tr>
                </thead>
            </table>
        </div>
    </div>

</template>

<script>
    import $ from 'jquery';
    import EmployeeRegister from '../../components/panel/EmployeeRegister';
    import EmployeeShow from '../../components/panel/modal/EmployeeShow';
    import {EmployeeService} from '../../services/panel/EmployeeService';
    import {mapState} from 'vuex'
    import HelperFunctions from '../../helpers/HelperFunctions';

    window.$ = $;
    export default {
        //middleware: 'checkAuthEmployee',
        layout: 'panel',
        name: "Orders",
        components: {EmployeeRegister, EmployeeShow},
        data() {
            return {
                allOrder: 'all-order',
                viewOrder: 'view-order',
                createOrder: 'create-order',
                updateOrder: 'update-order',
                destroyOrder: 'destroy-order',
                full_name_search: '',
                username_search: '',
                email_search: '',
                search: '',
                dialog: '',
                page: 1,
                pagination: {
                    total: 0,
                    per_page: 0,
                    last_page: 0,
                    from: 0,
                    to: 0,
                    current_page: 1
                },
                offset: 4,
                name: '',
                description: '',
                employee: '',
                employeeData: [],
                editMode: false,
                showEmployee: {
                    first_name: '',
                    last_name: '',
                    username: '',
                    email: ''
                }
            }
        },
        mounted() {
            return this.$store.dispatch('Employees/getEmployees');
        },
        computed: {
            ...mapState({
                employees: state => state.Employees.getEmployees,
                showUser: state => state.Users.isUser,
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
            hasPermissionAllOrder() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.allOrder).toString();
            },
            hasPermissionViewOrder() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.viewOrder).toString();
            },
            hasPermissionCreateOrder() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.createOrder).toString();
            },
            hasPermissionUpdateOrder() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.updateOrder).toString();
            },
            hasPermissionDestroyOrder() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.destroyOrder).toString();
            },
        },
        methods: {
            closeModal() {
                HelperFunctions.closeModal();
            },
            employeeAll() {
                this.getUsers = EmployeeService.EmployeeAll()
            },
            employeePaginate() {
                axios.get(axios.defaults.baseURL + 'panel/employee', {
                    headers: {
                        headers: {
                            'Authorization': 'Bearer ' + this.token,
                            'Content_Type': 'application/json'
                        }
                    }
                })
                    .then(res => {
                        this.employeeData = res.data;
                        console.log(this.employeeData);
                    });
            },
            employeeShow(employee) {
                this.showEmployee = {
                    first_name: employee.first_name,
                    last_name: employee.last_name,
                    username: employee.username,
                    email: employee.email
                }
            },
            employeeEdit(employee) {
                this.editMode = true;
                this.employee = employee;
            },
            employeeDelete(id) {
                return this.$store.dispatch('Employees/deleteUser', {id});
            },
            registerEmployee() {
                this.editMode = false;
                this.employee = '';
                $('#user-register').toggle();
            },
            onFullNameSearch() {
                return EmployeeService.onFullNameSearch()
            },
            onUserNameSearch() {
                return EmployeeService.onUserNameSearch();
            },
            onEmailSearch() {
                return EmployeeService.onEmailSearch();
            },
            onSearch(search) {
                return EmployeeService.onSearch(search)
            },
        }
    }
</script>

<style scoped>

</style>
