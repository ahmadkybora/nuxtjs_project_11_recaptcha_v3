export default function ({ store, redirect }) {
    if (window.localStorage.getItem('token-employee') !== null) {
        return redirect('/panel/dashboard')
    }
}
