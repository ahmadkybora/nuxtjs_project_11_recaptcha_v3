export default function ({ store, redirect }) {
    if (window.localStorage.getItem('token-user') === null) {
        return redirect('/login')
    }
}
