const ProductValidation = {
    registerForm
};

var category_id = '';
var title = '';
var description = '';
var price = '';
var icon = '';
var status = '';

function registerForm(isRegister) {
    category_id = isRegister.category_id;
    title = isRegister.title;
    description = isRegister.description;
    price = isRegister.price;
    icon = isRegister.icon;
    status = isRegister.status;
    if(category_id === ""){
        return alert('error')
    }
}

function findById() {
}

function destroy() {
}


module.exports = ProductValidation;
