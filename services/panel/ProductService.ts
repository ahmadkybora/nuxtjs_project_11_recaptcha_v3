import Axios from 'axios'

export class ProductService {

    public static token: any = window.localStorage.getItem('token');
    public static search: any;

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

    public static async onSearch() {
        alert("ok");
        await Axios.post(Axios.defaults.baseURL + 'panel/product/product-search', ProductService.search)
            .then(() => {

            })

    }
}


