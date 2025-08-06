function validar_formulario(){
    var user_name = document.getElementById("user_name").value;
    var password = document.getElementById("pass").value;

    if (user_name === "" || password === "") {
        alert("Fill all the spaces please");
        return false;
    }

    return true;
}