$(document).ready(function(){

    let search = document.getElementById("search");
    let submit = document.getElementById("submit");
    let resultsBox = document.getElementById("results");

    submit.addEventListener("click", getRecipe);

    function getRecipe(){

        var settings = {
            "async": true,
            "crossDomain": true,
            //"url": "https://recipe-puppy.p.rapidapi.com/?p=1&i=onions%252Cgarlic&q=omelet",
            "url": "https://recipe-puppy.p.rapidapi.com/?i=" + search.value,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
                "x-rapidapi-key": recipePuppyAPI
            }
        }/* end of settings */
        
        $.ajax(settings).done(function (response) {
            console.log(response);
            displayRecipes(response);
        }); /* end of ajax fx */

        function displayRecipes(searchedIngredients){

            let answer = searchedIngredients;
            let newAnswer = JSON.parse(answer);

            for(let i = 0; i < newAnswer.results.length; i++){
                let recipeListing = document.createElement("div");
                resultsBox.append(recipeListing);
                recipeListing.classList.add("food-block");
                recipeListing.innerHTML = "<div class='food-image'></div>";
                /* insert food background image ('background-size' property is set to 'cover' so each food image will be the same size) */
                $(".food-image").eq($(this).index()).css({
                    "background-image": "url('" + newAnswer.results[i].thumbnail + "')"
                });
                recipeListing.innerHTML += "<div class='food-title-and-link'>" + newAnswer.results[i].title + "<br>" + "<a href='" + newAnswer.results[i].href + "' target='_blank'>Link to Recipe</a> </div>";
            } /* end of for loop */

        } /* end of displayRecipe fx */
    


    } /* end of getRecipe fx */
}) /* end of getRecipe fx */

