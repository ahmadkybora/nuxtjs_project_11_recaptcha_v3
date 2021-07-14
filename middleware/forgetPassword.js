/*export default function ({store, redirect}) {
    if (window.localStorage.getItem('forget-password') === null) {
        if (!store.state.authenticated) {
        return redirect('/');
    }
}*/

export default function ({store, redirect}) {
    if (store.state.Auth.forgetPassword === false ||
        store.state.Auth.forgetPassword === '' ||
        store.state.Auth.forgetPassword === null) {
        return redirect('/')
    }
}
