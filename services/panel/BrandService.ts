import Axios from 'axios'

export class BrandService {

  public static full_name_search: any;
  public static token: any = window.localStorage.getItem('token');
  public static employees: any;
  public static email_search: any;
  public static username_search: any;
  public static search: any;
  public static user: any;

  constructor() {

  }

  public static userAll() {
    Axios.get(Axios.defaults.baseURL + 'panel/user')
      .then(res => {
        const b = res.data.data;
        console.log(b);
      })
      .catch(err => {
        console.log(err);
      })
  }

  public static onFullNameSearch() {
    Axios.post(Axios.defaults.baseURL + 'panel/employee/search/employee-search?full_name', BrandService.full_name_search,
      {
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      })
      .then(res => {
        BrandService.employees = res.data.data;
      })
  }

  public static onUserNameSearch() {
    Axios.post(Axios.defaults.baseURL + 'panel/employee/search/employee-search?username', BrandService.username_search,
      {
        headers: {
          'Authorization': 'Bearer ' + BrandService.token
        }
      }).then(res => {
      BrandService.employees = res.data.data;
    })
  }

  public static onEmailSearch() {
    Axios.post(Axios.defaults.baseURL + 'panel/employee/search/employee-search?email', BrandService.email_search,
      {
        headers: {
          'Authorization': 'Bearer ' + BrandService.token
        }
      }).then(res => {
      BrandService.employees = res.data.data;
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


