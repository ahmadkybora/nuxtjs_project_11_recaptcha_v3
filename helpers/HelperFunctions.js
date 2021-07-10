const closeModal = () => {
    var close = document.getElementById("register").style.display;
    /*var formData = new FormData(document.getElementById("formData"));
    console.log(formData);*/
    if(close === 'block') {
        document.getElementById("close").innerText = "open";
        document.getElementById("close").classList.remove("btn-danger");
        document.getElementById("close").classList.add("btn-primary");
        return document.getElementById("register").style.display = 'none';
    }
    else {
        document.getElementById("close").innerText = "close";
        document.getElementById("close").classList.remove("btn-primary");
        document.getElementById("close").classList.add("btn-danger");
        return document.getElementById("register").style.display = 'block';
    }
};

module.exports = { closeModal };
