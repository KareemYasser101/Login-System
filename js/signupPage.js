var Accounts = [];
var inputStatus = false;

/* *******************Validation*********** */
var nameField = document.querySelector("#name")

var emailField = document.querySelector("[type = email]");
var emailWarningList = document.querySelector(".ewl");
var emailAlreadyExists = document.querySelector(".emailAlreadyExists");

var passField = document.querySelector("[type = password]");
var passWarningList = document.querySelector(".pwl");


emailField.addEventListener("blur", validateEmail);
function validateEmail(){
    if(/^[a-zA-Z]\w{2,30}\@[a-zA-Z]{1,12}\.[a-z]{2,5}$/.test(emailField.value)){
        emailWarningList.classList.add("d-none");
        inputStatus = true;
    }
    else{
        emailWarningList.classList.remove("d-none");
        inputStatus = false;
    }
}

passField.addEventListener("blur", validatePass);
function validatePass(){
    if(/^\w{4,8}$/.test(passField.value)){
        passWarningList.classList.add("d-none");
        console.log("valid");
        inputStatus = true;
    }
    else{
        passWarningList.classList.remove("d-none");
        console.log("in--valid");
        inputStatus = false;
    }
}

/***************************End of validation********************** */

/******************Exporting to local storage***************** */
function exportToLocalDB(){
    localStorage.setItem("Accounts",JSON.stringify(Accounts));
}
function importFromLocalDB(){
    return JSON.parse(localStorage.getItem("Accounts")) ?? [];
}

Accounts = importFromLocalDB();
var signupButton = document.querySelector("#signup");

signupButton.addEventListener("click", addAccount);
function addAccount(e){
    e.preventDefault();
    if(inputStatus){
        var user = {
            'name': nameField.value,
            'email': emailField.value,
            'password': passField.value
        }
        var flag = true;
        for (var i = 0; i < Accounts.length; i++) {
            if(Accounts[i].email === user.email){
                emailAlreadyExists.classList.remove("d-none");
                flag = false;
                break;
            }
        }
        if(flag){
            emailAlreadyExists.classList.add("d-none");
            Accounts.push(user);
            exportToLocalDB();
            clearForm();
            window.location.href = "../html/loginPage.html";
        }
    }
}
function clearForm(){
    nameField.value = "";
    emailField.value = "";
    passField.value = "";
}