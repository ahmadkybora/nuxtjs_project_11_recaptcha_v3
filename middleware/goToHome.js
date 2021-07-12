export default function ({store, redirect}) {
    console.log(store);
    console.log(redirect);
    redirect('errors/401')
}
