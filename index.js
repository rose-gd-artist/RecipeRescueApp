$(document).ready(function(){

    /* page tabs */
    let allTabs = document.getElementsByClassName("tab");
    let tabContents = document.getElementsByClassName("tab-content");

    for (let i = 0; i < allTabs.length; i++) {
        allTabs[i].addEventListener("click", function () {
            for (let i = 0; i < allTabs.length; i++) {
                tabContents[i].classList.remove("active-tab"); /* remove class from all tabs */
            }
            tabContents[i].classList.add("active-tab"); /* add class to current tab */
        });
    } /* end page tabs */

    let searchIngredients = document.getElementById("searchIngredients");
    let searchFood = document.getElementById("searchFood");
    let submit = document.getElementById("submit");
    let resultsBox = document.getElementById("results");
    let groceryListContainer = document.getElementById("groceryListContainer");

    getRecipe(); /* preload some search results */

    submit.addEventListener("click", getRecipe);

    function getRecipe() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://recipe-puppy.p.rapidapi.com/?i=" + searchIngredients.value + "&q=" + searchFood.value,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
                "x-rapidapi-key": recipePuppyAPI
            }
        }
        
        $.ajax(settings).done(function (response) {
            displayRecipes(response);
        }); 
    } /* end of getRecipe fx */

    function displayRecipes(searchedIngredients){
        let answer = searchedIngredients;
        let newAnswer = JSON.parse(answer);

        resultsBox.innerHTML = ""; /* clear previous food result boxes */

        for(let i = 0; i < newAnswer.results.length; i++){
            let recipeListing = document.createElement("div");
            recipeListing.classList.add("food-block");
            recipeListing.innerHTML = "<div class='food-image'></div>";
            resultsBox.append(recipeListing);
            /* insert food background image ('background-size' property is set to 'cover' so each food image will be the same size) */
            $(".food-image").eq($(this).index()).css({
                "background-image": "url('" + newAnswer.results[i].thumbnail + "')"
            });

            /* insert food title, recipe link, and 'add to grocery list' button */
            recipeListing.innerHTML += "<div class='food-title-and-link'><span class='food-title'>" + newAnswer.results[i].title + "</span><br>" + "<a href='" + newAnswer.results[i].href + "' target='_blank'>Full Recipe</a> <div class='add-to-grocery-list'><img class='plus-sign' src='images/addTo.svg'>Add Ingredients to Grocery List</div></div>";
                
            /* adding ingredients to grocery list */
            let currentGroceryItem = document.getElementsByClassName("add-to-grocery-list")[i];

            currentGroceryItem.addEventListener("click", function () {
                /* split ingredients list returned from API and create bullets */
                let splitIngredientsList = newAnswer.results[i].ingredients.split(",");
                let bulletedList = "";

                for (let i = 0; i < splitIngredientsList.length; i++) {
                    bulletedList += "<div class='ingredient-list-entry'><span>&#8226; </span>" + splitIngredientsList[i] + "<input class='quantity-field' placeholder='QTY' type='text'><img class='remove-ingredient' src='images/xCloseButton.svg'></div>";
                }

                groceryListContainer.innerHTML += "<div class='grocery-list-entry'><strong>" + "<a href='" + newAnswer.results[i].href + "' target='_blank'>" + newAnswer.results[i].title + "</a>" + ":</strong><br>" + bulletedList + "<br><span class='remove-item'>remove item</span></div>";

                /* removing items from a grocery list */
                let removeItem = document.getElementsByClassName("remove-item");
                removeItemOrIngredient (removeItem);

                /* removing ingredients from a grocery list */
                let removeIngredientItem = document.getElementsByClassName("remove-ingredient");
                removeItemOrIngredient (removeIngredientItem);

            }); /* end click event */
        } /* end of for loop */
    } /* end of displayRecipe fx */

    /* function for removing grocery items or ingredients from the list */
    function removeItemOrIngredient (itemToBeRemoved) {
        for (let i = 0; i < itemToBeRemoved.length; i++) {
            itemToBeRemoved[i].addEventListener("click", function () {
                if (itemToBeRemoved[i].classList.contains("remove-ingredient")) {
                    $('.ingredient-list-entry').eq(i).fadeOut(400); /* remove ingredient */
                } else {
                    $('.grocery-list-entry').eq(i).fadeOut(400); /* remove grocery item */
                }
            });
        }
    }

    /* download/print PDF of grocery list (print settings specified in CSS print media query) */
    let exportPDF = document.getElementById("exportPDF");

    exportPDF.addEventListener("click", function () {
        window.print();
    });

}) /* end of getRecipe fx */

