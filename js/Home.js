/***********Greeting*****************/
var homePageWelcome = document.querySelector("#greeting");
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username'); // 'username' is the name of the query parameter

    if (username) {
        homePageWelcome.innerHTML = `Welcome, ${username}`;
    }
});

/*****logout******/
var logOutBtn = document.querySelector("#logOutBtn");
logOutBtn.addEventListener("click", logOut);
function logOut(){
    location.href = "../html/loginPage.html";
}

/*****************API content display************* */
var contentContainer = document.querySelector(".apiContent");
var Recipes;

function getRecipes(){
    return new Promise(async function(resolve, reject){
        try {
            var rec = await fetch("https://forkify-api.herokuapp.com/api/search?q=pizza");
            var data = await rec.json();
            Recipes = data.recipes; // Access the `recipes` array inside the fetched data
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

function displayRecipes(){
    var content = "";
    for(var i = 0; i < Recipes.length; i++){
        content += `
        <div class="Card bg-white d-flex flex-column align-items-center mb-3 text-start">
            <img class="w-100" src="${Recipes[i].image_url}" alt="${Recipes[i].title}">
            <div class="txt w-100 d-flex flex-column align-items-start p-1 bg-info">
                <span>Publisher: ${Recipes[i].publisher}</span>
                <span>Title: ${Recipes[i].title}</span>
                <span>Recipe URL: <a href="${Recipes[i].source_url}" target="_blank">${Recipes[i].source_url}</a></span>
            </div>      
        </div>
        `;
    }
    contentContainer.innerHTML = content;
}

getRecipes().then(displayRecipes).catch(error => console.error('Error fetching recipes:', error));
