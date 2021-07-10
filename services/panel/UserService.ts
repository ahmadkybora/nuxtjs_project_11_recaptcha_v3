import Axios from 'axios'
//import store from 'vuex';

export class UserService {

    public static full_name_search: any;
    public static token: any = window.localStorage.getItem('token');
    public static employees: any;
    public static email_search: any;
    public static username_search: any;
    public static search: any;
    public static user: any;

    constructor() {

    }

    public static All() {
        Axios.get(Axios.defaults.baseURL + 'panel/user')
            .then(res => {
                const b = res.data.data;
                console.log(b);
            })
            .catch(err => {
                console.log(err);
            })
    }

    /*public static getById(context, payload) {
        const userId = payload.id;
        const users = context.state.getUsers;
        console.log(users[3].id);
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === userId) {
                const isUser = users[i];
                context.commit('isUser', isUser);
            }
        }
    }*/

    public static create () {}

    public static edit() {
        //const users = store.state.Users.getUsers;
    }

    public static update() {}

    public static destroy() {}

    public static onFullNameSearch() {
        Axios.post(Axios.defaults.baseURL + 'panel/employee/search/employee-search?full_name', UserService.full_name_search,
            {
                headers: {
                    'Authorization': 'Bearer ' + this.token
                }
            })
            .then(res => {
                UserService.employees = res.data.data;
            })
    }

    public static onUserNameSearch() {
        Axios.post(Axios.defaults.baseURL + 'panel/employee/search/employee-search?username', UserService.username_search,
            {
                headers: {
                    'Authorization': 'Bearer ' + UserService.token
                }
            }).then(res => {
            UserService.employees = res.data.data;
        })
    }

    public static onEmailSearch() {
        Axios.post(Axios.defaults.baseURL + 'panel/employee/search/employee-search?email', UserService.email_search,
            {
                headers: {
                    'Authorization': 'Bearer ' + UserService.token
                }
            }).then(res => {
            UserService.employees = res.data.data;
        })
    }

    /*public static onSearch(search) {
        const full_name = $("#full-name");
        const username = $("#username");
        const email = $("#email");

        console.log(full_name);
        console.log(username);
        console.log(email);

        if (full_name) {
            Axios.post(Axios.defaults.baseURL + 'panel/employee/search/employee-search?search=' + search, this.search)
                .then(res => {
                    this.employees = res.data.data;
                })
        }
    }*/
}


