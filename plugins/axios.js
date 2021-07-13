export default function ({$axios, redirect}) {
    $axios.onError(err => {
        switch (err.response.status) {
            case 401:
                redirect('errors/err_401');
                break;

            case 403:
                redirect('errors/err_403');
                break;

            case 404:
                redirect('errors/err_404');
                break;

            case 500:
                redirect('errors/err_500');
                break;

            case 503:
                redirect('errors/err_503');
                break;

            default:
                redirect('/');
                break;
        }
    })
}
