import Swal from "sweetalert2";
//import goToHome from '../middleware/goToHome';

export const success = (res) => {
    switch (res.status) {
        case 200:
            Swal.fire('Success!', res.data.message, 'success')
                .then(() => {
                });
            break;
        case 201:
            Swal.fire('Success!', res.data.message, 'success')
                .then(() => {

                });
            break;
        default:
            Swal.fire('Warning!', 'Your Basic Information', 'warning');
            break;
    }
};

export const error = (err) => {
    switch (err.response.status) {
        case 422:
            if (err.response.data.errors.length !== null) {
                for (let i = 0; i < err.response.data.errors.length; i++) {
                    Swal.fire('Warning!', err.response.data.errors[i].message, 'warning')
                        .then(() => {
                            return 422;
                        });
                }
            } else {
                Swal.fire('Warning!', err.response.data.errors[i].message, 'warning')
                    .then(() => {
                        return 422;
                    });
            }
            break;
        case 401:
            Swal.fire('Warning!', err.response.data.message, 'warning')
                .then(() => {
                    return 401;
                });
            break;
        case 403:
            if (err.response.data.errors !== null) {
                for (let i = 0; i < err.response.data.errors.length; i++) {
                    Swal.fire('Warning!', err.response.data.errors[i].message, 'warning')
                        .then(() => {
                            return redirect('/errors/403');
                        });
                }
            } else {
                Swal.fire('Warning!', err.response.data.message, 'warning')
                    .then(() => {
                        return redirect('/errors/403');
                    });
            }
            break;
        case 404:
            Swal.fire('Warning!', '404 Not Found!', 'warning')
                .then(() => {
                    return redirect('/errors/404');
                });
            break;
        case 500:
            Swal.fire('Warning!', 'Service is unavailable', 'warning')
                .then(() => {
                    return redirect('/errors/500')
                });
            break;
        case 503:
            Swal.fire('Warning!', 'Service is unavailable', 'warning')
                .then(() => {
                    return redirect('/errors/503')
                });
            break;
        default:
            Swal.fire('Warning!', 'Your Basic Information', 'warning');
            break;
    }
};

