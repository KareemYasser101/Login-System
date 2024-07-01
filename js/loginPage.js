function importFromLocalDB(){
    return JSON.parse(localStorage.getItem("Accounts")) ?? [];
}

var loginSuccess = false;

var loginBtn = document.querySelector("#loginBtn");

var nameField = document.querySelector("#name");

var emailField = document.querySelector("[type = email]");
var emailWarningList = document.querySelector(".ewl");

var passField = document.querySelector("[type = password]");
var passWarningList = document.querySelector(".pwl");


var Accounts = importFromLocalDB();


emailField.addEventListener("blur", checkEmail);
function checkEmail(){
    for(var i = 0; i < Accounts.length; i++){
        if(Accounts[i].email === emailField.value)
            loginSuccess = true;
    }
    if(emailField.value != ""){
        if(loginSuccess){
            emailWarningList.classList.add("d-none");
        }
        else{
            emailWarningList.classList.remove("d-none");
        }
    }
    
}

passField.addEventListener("blur", checkPass);
function checkPass(){
    for(var i = 0; i < Accounts.length; i++){
        if(Accounts[i].password === passField.value)
            loginSuccess = true;
    }
    if(passField.value != ""){
        if(loginSuccess){
            passWarningList.classList.add("d-none");
        }
        else{
            passWarningList.classList.remove("d-none");
        }
    }
}

var username;

loginBtn.addEventListener("click", login);
function login(e){
    e.preventDefault();
    if(loginSuccess){
        for (var i = 0; i < Accounts.length; i++) {
            if(Accounts[i].email === emailField.value){
                username = Accounts[i].name;
            }
        }
        clearForm();
        window.location.href = `../html/Home.html?username=${encodeURIComponent(username)}`;
    }
}

function clearForm(){
    emailField.value = "";
    passField.value = "";
}
