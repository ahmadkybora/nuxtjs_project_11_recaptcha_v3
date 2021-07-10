<template>
    <div class="container">
        <!--UserRegister-->
        <EmployeeRegister v-if="hasPermissionCreateEmployee === createEmployee" :employee="employee" :editMode="editMode"></EmployeeRegister>
        <!--//-->
        <div class="row">
            <!--//-->
            <div class="col-md-12 text-center">
                <div class="row">
                    <div class="col-md-4">
                        <h3>Employee Register</h3>
                    </div>
                    <div v-if="hasPermissionCreateEmployee === createEmployee" class="col-md-3 offset-5">
                        <button @click="registerEmployee()" class="btn btn-success">
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
            <table class="table table-striped tab-content table-bordered table-responsive">
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
                <tr v-if="hasPermissionAllEmployee === allEmployee"
                    v-for="(employee, index) in employees.data"
                    :key="employee.id">
                    <td>{{ index }}</td>
                    <td>{{ employee.first_name + ' ' + employee.last_name }}</td>
                    <td v-text="employee.username"></td>
                    <td v-text="employee.email"></td>
                    <td>
                        <img class="rounded-circle" :src="employee.image" style="width: 50px; height: 50px">
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
                    <td>{{ employee.createdAt + ' ' + employee.updatedAt }}</td>
                    <td>
                        <a v-if="hasPermissionViewEmployee === viewEmployee"
                           @click="employeeShow(employee)"
                           data-toggle="modal"
                           data-target="#exampleModal">
                            <i class="fas fa-eye text-primary"></i>
                        </a>
                        <EmployeeShow v-if="hasPermissionViewEmployee === viewEmployee"
                                      :showEmployee="showEmployee">
                        </EmployeeShow>
                        /
                        <a v-if="hasPermissionUpdateEmployee === updateEmployee"
                           href="#register"
                           @click="employeeEdit(employee)"><i class="fas fa-pen text-success"></i>
                        </a>
                        /
                        <a v-if="hasPermissionDestroyEmployee === destroyEmployee"
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
    import EmployeeRegister from '../../components/panel/EmployeeRegister';
    import EmployeeShow from '../../components/panel/modal/EmployeeShow';
    import {mapState} from 'vuex'
    import HelperFunctions from '../../helpers/HelperFunctions';

    window.$ = $;
    export default {
        //middleware: 'checkAuthEmployee',
        layout: 'panel',
        name: "Employees",
        components: {EmployeeRegister, EmployeeShow},
        data() {
            return {
                allEmployee: 'all-employee',
                viewEmployee: 'view-employee',
                createEmployee: 'create-employee',
                updateEmployee: 'update-employee',
                destroyEmployee: 'destroy-employee',
                full_text_search: '',
                page: 1,
                offset: 4,
                name: '',
                description: '',
                employee: '',
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
                per_page: state => state.Employees.getEmployees.per_page,
                last_page: state => state.Employees.getEmployees.last_page,
                from: state => state.Employees.getEmployees.from,
                to: state => state.Employees.getEmployees.to,
                current_page: state => state.Employees.getEmployees.current_page,
                total: state => state.Employees.getEmployees.total,
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
            hasPermissionAllEmployee() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.allEmployee).toString();
            },
            hasPermissionViewEmployee() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.viewEmployee).toString();
            },
            hasPermissionCreateEmployee() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.createEmployee).toString();
            },
            hasPermissionUpdateEmployee() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.updateEmployee).toString();
            },
            hasPermissionDestroyEmployee() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.destroyEmployee).toString();
            },
        },
        methods: {
            changePage(page) {
                //this.current_page = page;
                return this.$store.dispatch('Employees/getEmployees', page);
            },
            closeModal() {
                HelperFunctions.closeModal();
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
                return this.$store.dispatch('Employees/deleteEmployee', {id});
            },
            registerEmployee() {
                this.editMode = false;
                this.employee = '';
                $('#user-register').toggle();
            },
            onFullTextSearch() {
                const full_text_search = this.full_text_search;
                return this.$store.dispatch('Employees/searchEmployee', {full_text_search});
            },
        }
    }
</script>

<style scoped>

</style>
