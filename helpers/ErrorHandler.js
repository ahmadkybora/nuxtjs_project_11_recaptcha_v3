import Swal from "sweetalert2";

export const success = (res) => {
    switch (res.status) {
        case 200:
            Swal.fire('Success!', res.data.message, 'success')
                .then(() => {
                });
            break;
        case 201:
            Swal.fire('Warning!', res.data.message, 'warning')
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

                        });
                }
            } else {
                Swal.fire('Warning!', err.response.data.errors[i].message, 'warning')
                    .then(() => {

                    });
            }
            break;
        case 401:
            Swal.fire('Warning!', err.response.data.message, 'warning')
                .then(() => {
                    return window.location.href = '/';
                });
            break;
        case 403:
            if (err.response.data.errors !== null) {
                for (let i = 0; i < err.response.data.errors.length; i++) {
                    Swal.fire('Warning!', err.response.data.errors[i].message, 'warning')
                        .then(() => {
                            return window.location.href = '/';
                        });
                }
            } else {
                Swal.fire('Warning!', err.response.data.message, 'warning')
                    .then(() => {
                        return window.location.href = '/';
                    });
            }
            break;
        case 404:
            Swal.fire('Warning!', '404 Not Found!', 'warning')
                .then(() => {
                    return window.location.href = '/';
                });
            break;
        case 500:
            Swal.fire('Warning!', 'Service is unavailable', 'warning')
                .then(() => {
                    return window.location.href = '/';
                });
            break;
        case 503:
            Swal.fire('Warning!', 'Service is unavailable', 'warning')
                .then(() => {
                    return window.location.href = '/';
                });
            break;
        default:
            Swal.fire('Warning!', 'Your Basic Information', 'warning');
            break;
    }
};

