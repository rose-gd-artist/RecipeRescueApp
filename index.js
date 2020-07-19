$(document).ready(function(){

    let searchIngredients = document.getElementById("searchIngredients");
    let searchFood = document.getElementById("searchFood");
    let submit = document.getElementById("submit");
    let resultsBox = document.getElementById("results");
    let groceryListContainer = document.getElementById("groceryListContainer");

    submit.addEventListener("click", getRecipe);

    function getRecipe(){

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://recipe-puppy.p.rapidapi.com/?i=" + searchIngredients.value + "&q=" + searchFood.value,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
                "x-rapidapi-key": recipePuppyAPI
            }
        } /* end of settings */
        
        $.ajax(settings).done(function (response) {
            console.log(response);
            displayRecipes(response);
        }); /* end of ajax fx */

        function displayRecipes(searchedIngredients){

            let answer = searchedIngredients;
            let newAnswer = JSON.parse(answer);

            resultsBox.innerHTML = ""; /* clear previous food result boxes */

            for(let i = 0; i < newAnswer.results.length; i++){
                let recipeListing = document.createElement("div");
                resultsBox.append(recipeListing);
                recipeListing.classList.add("food-block");
                recipeListing.innerHTML = "<div class='food-image'></div>";
                /* insert food background image ('background-size' property is set to 'cover' so each food image will be the same size) */
                $(".food-image").eq($(this).index()).css({
                    "background-image": "url('" + newAnswer.results[i].thumbnail + "')"
                });
                recipeListing.innerHTML += "<div class='food-title-and-link'>" + newAnswer.results[i].title + "<br>" + "<a href='" + newAnswer.results[i].href + "' target='_blank'>Link to Recipe</a> <div class='add-to-grocery-list'>Add to Grocery List</div></div>";
                
                /* adding ingredients to grocery list */
                let currentGroceryItem = document.getElementsByClassName("add-to-grocery-list")[i];

                currentGroceryItem.addEventListener("click", function () {

                    /* split ingredients list returned from API and create bullets */
                    let splitIngredientsList = newAnswer.results[i].ingredients.split(",");
                    let bulletedList = "";

                    for (let i = 0; i < splitIngredientsList.length; i++) {
                        bulletedList += "<span>&#8226; </span>" + splitIngredientsList[i] + "<br>";
                    }

                    groceryListContainer.innerHTML += "<div class='grocery-list-entry'><strong>" + "<a href='" + newAnswer.results[i].href + "' target='_blank'>" + newAnswer.results[i].title + "</a>" + ":</strong><br>" + bulletedList + "<br><span class='remove-item'>remove item</span><br></div>";

                    /* removing items from a grocery list */
                    let removeItem = document.getElementsByClassName("remove-item");
                    let groceryListEntry = document.getElementsByClassName("grocery-list-entry");

                    for (let i = 0; i < removeItem.length; i++) {
                        removeItem[i].addEventListener("click", function () {
                            $('.grocery-list-entry').eq(i).fadeOut(400);
                        });
                    }
                });

            } /* end of for loop */

        } /* end of displayRecipe fx */
    } /* end of getRecipe fx */

    /* download/print PDF of grocery list (print settings specified in CSS print media query) */
    let exportPDF = document.getElementById("exportPDF");

    exportPDF.addEventListener("click", function () {
        window.print();
    });

}) /* end of getRecipe fx */

