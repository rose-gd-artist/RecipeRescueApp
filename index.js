$(document).ready(function(){

    let allTabs = document.getElementsByClassName("tab");
    let activeButton = document.getElementsByClassName("activeButton");
    let tabContents = document.getElementsByClassName("tab-content");
    let tab2 = document.getElementsByClassName("tab-2");
    rrIndex = document.getElementById("rrIndex");
    rrRecipeSnapshot = document.getElementById("rrRecipeSnapshot");
    resultRRViewLink = document.getElementsByClassName("resultRRViewLink");
    let rrFullRecipe = document.getElementById("rrFullRecipe");
    RRList = document.getElementById("RRList");
    rrRecipeBox = document.getElementById("rrRecipeBox");

    /* page tabs */
    for (let i = 0; i < allTabs.length; i++) {
        allTabs[i].addEventListener("click", function () {
            for (let i = 0; i < allTabs.length; i++) {
                tabContents[i].classList.remove("active-tab");
                if(tab2){
                    allTabs[i].classList.remove("activeButton");
                } else {
                    allTabs[i].classList.remove("activeButton");
                }
            }
            tabContents[i].classList.add("active-tab"); /* add class to current tab */
            allTabs[i].classList.add("activeButton");
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
                "x-rapidapi-key":  recipePuppyAPI
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

    exportPDF.addEventListener("click", printPage);

    /* function for printing the screen */
    function printPage() {
        window.print();
    }

    /* function for 'R + R Recipes' tab */
    recipeIndexPage(rrRecipeList);

}) /* end of getRecipe fx */

////////////////////////////////////////////////////////////

/// rosie's js code ///////


let RRList;
let welcomeBar;
let secondBar;
let thirdHalfBar;
let sepBar;
let thirdSHalfBar;
let rrIndex;
let rrRecipeSnapshot;
let newRRlist;
let FullRecipePage;
let FullRecipeImage;
let FullRecipeTitle;
let FullRecipePrepTime;
let FullRecipeCookTime;
let FullRecipeIngredients;
let FullRecipeDirections;
let FullRecipePerServing;
let FullRecipeSource;
let goLeft;
let goRight;
let currentPage;

let rrRecipeList = [
             
    { 
    recipePic: "images/frenchOnionSoup.jpg",
    recipeName: "French Onion Soup",
    servings: "Serves 12-16",
    RRingredients: 
        ["<ul class='recipeI'><li class='recipeIHeader'><u>Ingredients:</u></li>",
        "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;3 large sweet onions, sliced thin</li>",
        "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;3 tbsp Stonewall Kitchen Extra</br>&nbsp;&nbsp;&nbsp;Virgin Olive Oil</li>",
        "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;5 cups (42 oz.) beef broth</li>",
        "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1/2 tsp salt</li>",
        "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1/2 tsp pepper</li>",
        "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;3/4 cup Stonewall Kitchen Roasted</br>&nbsp;&nbsp;&nbsp;Onion Jam</li>",
        "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1 loaf French bread cut into 1 inch</br>&nbsp;&nbsp;&nbsp;slices, toasted</li>",
        "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;4-6 oz Gruyere, Swiss or Provolone</br>&nbsp;&nbsp;&nbsp;cheese, grated</li></ul>"],
    directions: [
        "<ul class='recipeDir'><li class='recipeDHeader'><u>Directions:</u></li>",
        "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;1. Over medium heat, warm oil in a</br>&nbsp;&nbsp;&nbsp;large stockpot or Dutch oven.</li>",
        "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;2. Add onions and cook for 15</br>&nbsp;&nbsp;&nbsp;minutes, stirring occasionally,</br>&nbsp;&nbsp;&nbsp;until lightly browned.</li>",
        "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;3. Reduce heat to low and let simmer,</br>&nbsp;&nbsp;&nbsp;stirring occasionally.</li>",
        "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;4. Cook for 35-45 minutes until onions</br>&nbsp;&nbsp;&nbsp;are a deep golden brown.</li>",
        "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;5. And Roasted Garlic Onion Jam,</br>&nbsp;&nbsp;&nbsp;broth, salt and pepper and bring to</br>&nbsp;&nbsp;&nbsp;boil. Reduce heat to low and simmer</br>&nbsp;&nbsp;&nbsp;for 20-25 minutes.</li>",
        "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;6. Ladle soup into 4 heat proof</br>&nbsp;&nbsp;&nbsp;bowls. Top with toasted bread</br>&nbsp;&nbsp;&nbsp;slices and grated cheese.</li>",
        "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;7. Broil 2-3 minutes until cheese is</br>&nbsp;&nbsp;&nbsp;bubbly and browned.</li>",
        "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;8. Garnish, if desired, with fresh</br>&nbsp;&nbsp;&nbsp;chives, parsley or thyme.</li></ul>"],
    recipeSource: "<u>Source:</u> Stonewall Kitchen"
    },

    { 
    recipePic: "images/porkchopMarsala.jpg",
    recipeName: "Pork Chops Marsala",
    servings: "Serves 8",
    prepTime: "<u>Prep Time:</u> 10 minutes",
    cookTime: "<u>Cook Time:</u> 35 minutes",
    RRingredients:
        ["<ul class='recipeI'><li class='recipeIHeader'><u>Ingredients:</u></li>",
        "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;3/4 cup Italian bread crumbs</li>",
        "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1/2 cup flour</li>",
        "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1/2 cup grated Parmesan cheese</li>",
        "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;8 boneless pork chops, cut 1/2 inch</br>&nbsp;&nbsp;&nbsp;thick</li>",
        "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1/4 cup olive oil</li>",
        "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1-1/2 cups Marsala wine or apple</br>&nbsp;&nbsp;&nbsp;juice</li>",
        "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1-1/2 tbsp Butter</li>",
        "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;2 (8-oz.) pkg. sliced fresh mushrooms</li>",
        "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1/4 cup chopped fresh Italian parsley</li>",
        "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;Freshly grated Parmesan cheese</br>&nbsp;&nbsp;&nbsp;(optional)</li></ul>"],
    directions: [
        "<ul class='recipeDir'><li class='recipeDHeader'><u>Directions:</u></li>",
        "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;1. Stir together bread crumbs, flour,</br>&nbsp;&nbsp;&nbsp;1/2 cup Parmesan cheese, and salt</br>&nbsp;&nbsp;&nbsp;and pepper to taste; dredge pork</br>&nbsp;&nbsp;&nbsp;chops in mixture.</li>",
        "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;2. In a large skillet over medium-high</br>&nbsp;&nbsp;&nbsp;heat, brown pork chops in hot oil.</br>&nbsp;&nbsp;&nbsp;Cook in batches for 3 to 5 minutes</br>&nbsp;&nbsp;&nbsp;on each side or until done; reserve</br>&nbsp;&nbsp;&nbsp;drippings in skillet. Remove from</br>&nbsp;&nbsp;&nbsp;skillet; keep warm.</li>",
        "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;3. Add wine and butter to skillet,</br>&nbsp;&nbsp;&nbsp;stirring to loosen browned</br>&nbsp;&nbsp;&nbsp;particles. Add mushrooms and bring</br>&nbsp;&nbsp;&nbsp;to a boil; reduce heat and simmer 15</br>&nbsp;&nbsp;&nbsp;minutes or until tender. Serve over</br>&nbsp;&nbsp;&nbsp;pork; sprinkle with parsley. Top with</br>&nbsp;&nbsp;&nbsp;freshly grated Parmesan cheese, if</br>&nbsp;&nbsp;&nbsp;desired.</li></ul>"
    ],
    perServing: [
        "<u>Per Serving:</u></br>&nbsp;&nbsp;&nbsp;549 calories, 19g carbohydrates,</br>&nbsp;&nbsp;&nbsp;42g protein, 30g fat, 1g fiber,</br>&nbsp;&nbsp;&nbsp;122mg cholesterol, 454mg sodium"
    ],
    recipeSource: "<u>Source:</u> Shop Rite"
    },

    {
    recipePic: "images/chickenSorrento.jpg",
    recipeName: "Chicken Sorrento",
    servings: "Serves 4",
    cookTime: "<u>Cook Time:</u> 15 minutes",
    RRingredients:
        ["<ul class='recipeI'><li class='recipeIHeader'><u>Ingredients:</u></li>",
        "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;4 boneless, skinless chicken breast</br>&nbsp;&nbsp;&nbsp;halves (about 5 oz each)</li>",
        "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1/4 tsp salt</li>",
        "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1/8 tsp pepper</li>",
        "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;2 tsp olive oil</li>",
        "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1 bottle (8 oz) creamy Italian</br>&nbsp;&nbsp;&nbsp;dressing</li>",
        "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1 bag (16 oz) frozen stir-fry</br>&nbsp;&nbsp;&nbsp;vegetable blend</li>"
        ],
    directions: [
        "<ul class='recipeDir'><li class='recipeDHeader'><u>Directions:</u></li>",
        "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;1. Sprinkle chicken with salt and</br>&nbsp;&nbsp;&nbsp;pepper.</li>",
        "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;2. Heat the oil in a large nonstick</br>&nbsp;&nbsp;&nbsp;skillet over medium-high heat. Add</br>&nbsp;&nbsp;&nbsp;Chicken; cook 2 minutes on each side,</br>&nbsp;&nbsp;&nbsp;or until golden.</li>",
        "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;3. Pour dressing on chicken; turn to</br>&nbsp;&nbsp;&nbsp;coat. Cover, reduce heat and simmer</br>&nbsp;&nbsp;&nbsp;5 minutes.</li>",
        "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;4. Add frozen vegetables, cover and</br>&nbsp;&nbsp;&nbsp;cook 5 minutes, or until chicken is</br>&nbsp;&nbsp;&nbsp;cooked through and vegetables are</br>&nbsp;&nbsp;&nbsp;crisp-tender.</li></ul>"
    ],
    perServing: [
        "<u>Per Serving:</u></br>&nbsp;&nbsp;&nbsp;409 calories, 15g carbohydrates,</br>&nbsp;&nbsp;&nbsp;35g protein, 22g fat (3g sat fat),</br>&nbsp;&nbsp;&nbsp;3g fiber, 82mg cholesterol,</br>&nbsp;&nbsp;&nbsp;748mg sodium"
    ],
    recipeSource: "<u>Source:</u> Women's Day"
    },

    {
        recipePic: "images/blackenedSkirtSteak.jpg",
        recipeName: "Blackened skirt steak with cheddar-sage mashed potatoes",
        servings: "Serves 4",
        prepTime: "<u>Prep Time:</u> 4 minutes",
        cookTime: "<u>Cook Time:</u> 10 minutes",
        RRingredients:
            ["<ul class='recipeI'><li class='recipeIHeader'><u>Ingredients:</u></li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1 tsp pepper</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1 tsp paprika</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1 tsp garlic powder</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1/2 tsp dried thyme</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1/4 tsp salt</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1 lb skirt steak, cut into 4 equal</br>&nbsp;&nbsp;&nbsp;pieces</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1 tbsp oil</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1-1/3 cups milk</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1 tsp dried sage</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;2-2/3 cups frozen mashed potatoes</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1/2 cup shredded cheddar</li></ul>"
            ],
        directions: [
            "<ul class='recipeDir'><li class='recipeDHeader'><u>Directions:</u></li>",
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;1. Combine pepper, paprika, garlic</br>&nbsp;&nbsp;&nbsp;powder, thyme and salt. Rub mixture</br>&nbsp;&nbsp;&nbsp;on steak. Heat oil in large skillet</br>&nbsp;&nbsp;&nbsp;over high heat. Add steak; cook 2</br>&nbsp;&nbsp;&nbsp;minutes on each side for medium-</br>&nbsp;&nbsp;&nbsp;rare.</li>",
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;2. Meanwhile, make Cheddar-sage</br>&nbsp;&nbsp;&nbsp;Potatoes: Heat milk and sage in a</br>&nbsp;&nbsp;&nbsp;medium saucepan over medium-high</br>&nbsp;&nbsp;&nbsp;heat. Stir in frozen potatoes and</br>&nbsp;&nbsp;&nbsp;cook, stirring occasionally. 4</br>&nbsp;&nbsp;&nbsp;minutes or until hot. Remove from</br>&nbsp;&nbsp;&nbsp;heat: stir in cheese.</li></ul>"
        ],
        perServing: [
            "<u>Per Serving:</u></br>&nbsp;&nbsp;&nbsp;475 calories, 25g carbohydrates,</br>&nbsp;&nbsp;&nbsp;30g protein, 27g fat (11g sat fat),</br>&nbsp;&nbsp;&nbsp;2g fiber, 94mg cholesterol,</br>&nbsp;&nbsp;&nbsp;714mg sodium"
        ],
        recipeSource: "<u>Source:</u> Women's Day"
    },

    {
        recipePic: "images/oatmealRaisinCookies.jpg",
        recipeName: "Vanishing Oatmeal Raisin Cookies",
        cookTime: "<u>Bake Time:</u> 10-12 minutes",
        RRingredients:
            ["<ul class='recipeI'><li class='recipeIHeader'><u>Ingredients:</u></li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1/2 lb (2 sticks) Softened Butter</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1 cup firmly packed brown sugar</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1/2 cup granulated sugar</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;2 eggs</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1 tsp vanilla</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1-1/2 cups All-purpose flour</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1 tsp baking soda</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1 tsp ground cinnamon</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1/2 tsp salt</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;3 cups Quaker Oats</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1 cup raisins</li></ul>"
            ],
        directions: [
            "<ul class='recipeDir'><li class='recipeDHeader'><u>Directions:</u></li>",
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;1. Mix butter and sugar.</li>",
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;2. Add eggs and vanilla.</li>",
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;3. Beat well in mixer.</li>",
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;4. Add flour, baking soda,</br>&nbsp;&nbsp;&nbsp;cinnamon and salt.</li>",
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;5. Beat well in mixer.</li>",
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;6. Add oats and raisins.</li>",
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;7. Place spoon size balls of</br>&nbsp;&nbsp;&nbsp;dough on cookie sheet.</li>",
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;8. Cook in oven for 10-12 minutes</br>&nbsp;&nbsp;&nbsp;at 350&#176;F.</li>",
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;9. Let cool for 1 minute before</br>&nbsp;&nbsp;&nbsp;serving.</li></ul>"
        ],
        recipeSource: "<u>Source:</u> Quaker Oats"
    },

    {
        recipePic: "images/beefMushroomStew.jpg",
        recipeName: "Steak and Mushroom Stew",
        servings: "Serves 6-8",
        RRingredients:
            ["<ul class='recipeI'><li class='recipeIHeader'><u>Ingredients:</u></li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;6 oz thick-cut bacon, diced</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;3-1/2 - 4 lb chuck roast,</br>&nbsp;&nbsp;&nbsp;cut into 1 inch cubes</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;Kosher salt</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;Freshly ground pepper</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;2 small onions, diced</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;2 carrots, peeled and diced</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;2 celery stalks, diced</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;3 garlic cloves, minced</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1 tbsp tomato paste</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;3/4 lb cremini mushrooms, sliced</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1 tbsp veal demi-glace</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;3 tbsp Dijon Mustard</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1-1/2 cups beef broth</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1/4 cup finely chopped fresh flat</br>&nbsp;&nbsp;&nbsp;leaf parsley</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;Creme fraiche mashed potatoes</li></ul>"
            ],
        directions: [
            "<ul class='recipeDir'><li class='recipeDHeader'><u>Directions:</u></li>",
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;1. In a stovetop-safe insert of slow</br>&nbsp;&nbsp;&nbsp;cooker over medium-high heat, cook</br>&nbsp;&nbsp;&nbsp;bacon 10-11 minutes.</li>", 
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;2. Drain on paper towels. Pour</br>&nbsp;&nbsp;&nbsp;Bacon fat into a bowl.</li>", 
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;3. Season beef with salt and pepper.</br>&nbsp;&nbsp;&nbsp;Return insert to medium-high heat;</br>&nbsp;&nbsp;&nbsp;warm 2 Tbsp bacon fat. Brown beef</br>&nbsp;&nbsp;&nbsp;in batches 8-10 minutes; transfer</br>&nbsp;&nbsp;&nbsp;to bowl.</li>",
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;4. Reduce heat to medium; warm 1 Tbsp</br>&nbsp;&nbsp;&nbsp;bacon fat. Cook onions, carrots and</br>&nbsp;&nbsp;&nbsp;celery 10 minutes.</li>",
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;5. Add garlic and tomato paste;</br>&nbsp;&nbsp;&nbsp;cook 1 minute.</li>",
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;6. Add mushrooms, saute 10-12</br>&nbsp;&nbsp;&nbsp;minutes.</li>",
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;7. Stir in demi-glace, mustard, beef,</br>&nbsp;&nbsp;&nbsp;bacon, broth, salt and pepper.</li>",     
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;8. Bring to simmer; transfer insert</br>&nbsp;&nbsp;&nbsp;to slow-cooker base. Cover and</br>&nbsp;&nbsp;&nbsp;cook on high 4 hours.</li>",
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;9. Skim off fat. Stir in parsley.</li>", 
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;10. Serve with creme fraiche</br>&nbsp;&nbsp;&nbsp;mashed potatoes.</li></ul>"
        ],
    },

    {
        recipePic: "images/tilapiaQuesadillaWedges.jpg",
        recipeName: "Tilapia Quesadilla Wedges",
        servings: "Serves 8",
        prepTime: "<u>Prep Time:</u> 20 minutes",
        cookTime: "<u>Cook Time:</u> 15 minutes",
        RRingredients:
            ["<ul class='recipeI'><li class='recipeIHeader'><u>Ingredients:</u></li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;3/4 cup flour</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1 tbsp ground cumin</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1 tbsp chili powder</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1 tsp cayenne or ground pepper</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1-1/2 lbs tilapia fillets</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;2 eggs, lightly beaten</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1/4 cup olive oil</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;2/3 cup chopped tomatoes</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;2 tbsp fresh lime juice</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;8 flour tortillas (8-inch)</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;2 cups shredded Monterey Jack</br>&nbsp;&nbsp;&nbsp;cheese with jalapenos (8 oz)</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;Salsa, sour cream (optional)</li></ul>"
            ],
        directions: [
            "<ul class='recipeDir'><li class='recipeDHeader'><u>Directions:</u></li>",
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;1. Combine flour, cumin, chili powder</br>&nbsp;&nbsp;&nbsp;and cayenne in a pie plate. Dip fillets</br>&nbsp;&nbsp;&nbsp;in eggs, then coat in flour mixture.</li>",
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;2. In a large skillet, saute fillets in</br>&nbsp;&nbsp;&nbsp;hot oil over medium-high heat 4 to 6</br>&nbsp;&nbsp;&nbsp;minutes per side or until fish flakes</br>&nbsp;&nbsp;&nbsp;easily with a fork. Drain on paper</br>&nbsp;&nbsp;&nbsp;towels; flake fish.</li>",
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;3. Combine fish, tomatoes and lime</br>&nbsp;&nbsp;&nbsp;juice in a medium bowl. Place fish</br>&nbsp;&nbsp;&nbsp;mixture on the center of each</br>&nbsp;&nbsp;&nbsp;tortilla; sprinkle with cheese.</br>&nbsp;&nbsp;&nbsp;Fold tortilla over to completely</br>&nbsp;&nbsp;&nbsp;enclose filling.</li>",
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;4. Coat a large skillet with nonstick</br>&nbsp;&nbsp;&nbsp;cooking spray. Cook 1 or 2</br>&nbsp;&nbsp;&nbsp;quesadillas at time on medium-high</br>&nbsp;&nbsp;&nbsp;heat 2 to 3 minutes per side until</br>&nbsp;&nbsp;&nbsp;crisp and lightly browned.</li>",
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;5. Cut each quesadilla into thirds.</br>&nbsp;&nbsp;&nbsp;Serve warm with salsa and sour</br>&nbsp;&nbsp;&nbsp;cream, if desired.</li></ul>"
        ],
        perServing: [
            "<u>Per Serving:</u></br>&nbsp;&nbsp;&nbsp;675 calories, 37g carbohydrates,</br>&nbsp;&nbsp;&nbsp;77g protein, 24g fat (8g sat fat),</br>&nbsp;&nbsp;&nbsp;1g fiber, 140mg cholesterol,</br>&nbsp;&nbsp;&nbsp;665mg sodium, 0g omega3"
        ]
    },


    {
        recipePic: "images/crustyGarlicBread.jpg",
        recipeName: "Crusty Garlic Bread",
        servings: "Makes 10 slices",
        prepTime: "<u>Prep Time:</u> 15 minutes",
        cookTime: "<u>Cook Time:</u> 10-15 minutes",
        RRingredients:
            ["<ul class='recipeI'><li class='recipeIHeader'><u>Ingredients:</u></li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;2 cloves garlic, minced</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1 tsp chopped fresh parsley</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;2 tsp dried thyme</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;3/4 tsp dried marjoram</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;1/2 tsp paprika</li>",
            "<li class='recipeILines'>&nbsp;&nbsp;&nbsp;2 small loaves (4 oz) Italian or</br>&nbsp;&nbsp;&nbsp;French bread</li></ul>"
            ],
        directions: [
            "<ul class='recipeDir'><li class='recipeDHeader'><u>Directions:</u></li>",
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;1. Preheat oven to 350&#176;F. In a small</br>&nbsp;&nbsp;&nbsp;bowl, combine the garlic an oil;</br>&nbsp;&nbsp;&nbsp;mix well.</li>",
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;2. In another small bowl, combine</br>&nbsp;&nbsp;&nbsp;parsley, thyme, marjoram and</br>&nbsp;&nbsp;&nbsp;paprika. Add Parmesan; mix well.</li>",      
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;3. Cut each loaf crosswise into</br>&nbsp;&nbsp;&nbsp;diagonal slices, without cutting</br>&nbsp;&nbsp;&nbsp;all the way through. Brush cut</br>&nbsp;&nbsp;&nbsp;sides of slices with garlic oil.</br>&nbsp;&nbsp;&nbsp;Sprinkle herb mixture between</br>&nbsp;&nbsp;&nbsp;slices. Wrap each loaf in foil;</br>&nbsp;&nbsp;&nbsp;place on a baking sheet.</li>",
            "<li class='recipeDirLines'>&nbsp;&nbsp;&nbsp;4. Bake until heated through,</br>&nbsp;&nbsp;&nbsp;about 10-15 minutes. Unwrap loaves</br>&nbsp;&nbsp;&nbsp;and place them on a bread board</br>&nbsp;&nbsp;&nbsp;or in a basket. Serve Immediately.</li></ul>"
        ],
        perServing: 
            "<u>Per Serving:</u></br>&nbsp;&nbsp;&nbsp;72 calories (20% from fat),</br>&nbsp;&nbsp;&nbsp;12g carbohydrates, 2g protein,</br>&nbsp;&nbsp;&nbsp;1g fat, 0g fiber, 0g cholesterol,</br>&nbsp;&nbsp;&nbsp;139mg sodium",
    },

]; // massive array of recipe objects

// degree fahrenheit code is     &#8457;  &#176; //



////       Tom could you take a look at my code mixed into your code         ////
//**************************************************************************/////
////       this is the recipeIndexPage() - (I called it in line 22 and       ////
////       is on line 428) that runs the R + R tab mini index boxes does     ////
////       appear when the tab is clicked but the slider is shown at         ////
////       the bottom of the page when it should not be visible and          ////
////       the links in the index boxes don't work - i'm not sure how        ////
////       to fix it - and it is supposed to activate the slider and         ////
////       the index boxes should disappear using the recipeStructure()      ////
////       on line 475 -- also could you figure out how to activate the      ////
////       "add ingredients" buttons to the grocery and the on the R + R     ////
////       Tab content. one more thing that i don't know why the index       ////
////       boxes on the tab appear 3 times instead of just once (which       ////
////       what I wanted)   

                                                 ////

function recipeIndexPage(list){

    rrIndex = document.getElementById("rrIndex");
    rrRecipeSnapshot = document.getElementById("rrRecipeSnapshot");
    resultRRViewLink = document.getElementsByClassName("resultRRViewLink");

    let i = 0;

    newRRlist = list;

    // thirdHalfBar.style.display = "none";
    // sepBar.style.display = "none";
    // thirdSHalfBar.style.display = "none";

    for(i = 0; i < newRRlist.length; i++){

        let ourListing = document.createElement("div");
        ourListing.style.color = "#759D59";
        ourListing.style.backgroundColor = "#fff";
        rrRecipeSnapshot.append(ourListing);
        ourListing.classList.add("desktopRRView");

        ourListing.innerHTML = "<div class='imageRRFood'></div>";

        $(".imageRRFood").eq($(this).index()).css({
            "background-image": "url('" + newRRlist[i].recipePic + "')"
        });

        ourListing.innerHTML +=  "<div class='resultRRView'>" + newRRlist[i].recipeName;
        let link = document.createElement("div");
        link.innerHTML += 'Full Recipe';
        link.classList.add('resultRRViewLink');
        ourListing.appendChild(link);
        ourListing.innerHTML += "<img class='addToButton' alt='add ingredients to grocery list button' src='images/addTo.svg'><div class='addToGL'>Add ingredients to grocery list</div></div>"

    } /* end of for loop */

    let fullRecipeLink = document.getElementsByClassName("resultRRViewLink");
    for(let i = 0; i < fullRecipeLink.length; i++){
            fullRecipeLink[i].addEventListener("click", function(){
                displayRecipeSlide(i);
            });
    }

    //////////////// R + R Full Recipe slider ///////////////

    function displayRecipeSlide(number) { 
        rrRecipeBox.style.display = 'block'
        rrIndex.style.display = 'none'
        for(let i = 0; i < FullRecipePage.length; i++) {
            if(number !== i) {
                FullRecipePage[i].style.display = 'none'
            } else {
                FullRecipePage[i].style.display = 'block'
            }    
        }
    }

    goLeft = document.getElementById("goLeft");
    goRight = document.getElementById("goRight");

    goLeft.addEventListener("click", goToTheLeft);
    goRight.addEventListener("click", goToTheRight);

    FullRecipePage = document.getElementsByClassName("FullRecipePage");

    let currentSlide = 0;

    function goToTheLeft(){
        currentSlide = currentSlide - 1;
        if(currentSlide < 0){
            currentSlide = FullRecipePage.length-1;
        }
        displayRecipeSlide(currentSlide);
    }

    function goToTheRight(){
        currentSlide = currentSlide + 1
        if (currentSlide > FullRecipePage.length-1){         
            currentSlide = 0;
        }
        displayRecipeSlide(currentSlide);
    }

}

function recipeStructure(justArecipe){
    currentPage = 0;

    let todo = justArecipe;

    FullRecipePage = document.getElementsByClassName("FullRecipePage")[0];
    FullRecipeImage = document.getElementsByClassName("FullRecipeImage")[0];
    FullRecipeTitle = document.getElementsByClassName("FullRecipeTitle")[0];
    FullRecipeServesNum = document.getElementsByClassName("FullRecipeServesNum")[0];
    FullRecipePrepTime = document.getElementsByClassName("FullRecipePrepTime")[0];
    FullRecipeCookTime = document.getElementsByClassName("FullRecipeCookTime")[0];
    FullRecipeIngredients = document.getElementsByClassName("FullRecipeIngredients")[0];
    FullRecipeDirections = document.getElementsByClassName("FullRecipeDirections")[0];
    FullRecipePerServing = document.getElementsByClassName("FullRecipePerServing")[0];
    FullRecipeSource = document.getElementsByClassName("FullRecipeSource")[0];
    goLeft = document.getElementById("goLeft");
    goRight = document.getElementById("goRight");

    /* Loop through all recipes and print the information for each one */
    for (let i = 0; i < justArecipe.length; i++) {
        console.log(justArecipe[i]);  
        let indyRecipe = document.createElement("div");
        rrFullRecipe.append(indyRecipe);
        indyRecipe.classList.add("FullRecipePage"); 
        indyRecipe.id = i;

        let indyImage = document.createElement("div");
        indyImage.style.backgroundColor = "#0f0f0f";
        indyRecipe.append(indyImage);
        indyImage.classList.add("FullRecipeImage");
        indyImage.style.backgroundImage = "url(" + justArecipe[i].recipePic + ")";
        indyImage.style.backgroundPosition = "center";
        indyImage.style.backgroundRepeat = "no-repeat";
        indyImage.style.backgroundSize = "cover";

        let indyTitle = document.createElement("div");
        indyTitle.style.color = "#772001";
        indyRecipe.append(indyTitle);
        indyTitle.classList.add("FullRecipeTitle");
        indyTitle.innerHTML = justArecipe[i].recipeName;

        let indyServesNum = document.createElement("div");
        indyServesNum.style.color = "#772001";
        indyRecipe.append(indyServesNum);
        indyServesNum.classList.add("FullRecipeServesNum");
        if(justArecipe[i].servings){
            indyServesNum.innerHTML = justArecipe[i].servings;
        } else {
            indyServesNum.style.display = "none";
        };

        let indyPrep = document.createElement("div");
        indyPrep.style.color = "#772001";
        indyRecipe.append(indyPrep);
        indyPrep.classList.add("FullRecipePrepTime");
        if(justArecipe[i].prepTime){
            indyPrep.innerHTML = justArecipe[i].prepTime;
        } else {
            indyPrep.style.display = "none";
        }

        let indyCook = document.createElement("div");
        indyCook.style.color = "#772001";
        indyRecipe.append(indyCook);
        indyCook.classList.add("FullRecipeCookTime");
        if(justArecipe[i].cookTime){
            indyCook.innerHTML = justArecipe[i].cookTime;
        } else {
            indyCook.style.display = "none";
        }

        for(let j = 0; j < justArecipe[i].RRingredients.length; j++){
            let indyIngred = document.createElement("div");
            indyIngred.style.color = "#772001";
            indyRecipe.append(indyIngred);
            indyIngred.classList.add("FullRecipeIngredients");
            indyIngred.innerHTML += justArecipe[i].RRingredients[j];
        }

        for(let k = 0; k < justArecipe[i].directions.length; k++){
            let indyDir = document.createElement("div");
            indyDir.style.color = "#772001";
            indyRecipe.append(indyDir);
            indyDir.classList.add("FullRecipeDirections");
            indyDir.innerHTML += justArecipe[i].directions[k];
        }

        let indyCalc = document.createElement("div");
        indyCalc.style.color = "#772001";
        indyRecipe.append(indyCalc);
        indyCalc.classList.add("FullRecipePerServing");
        if(justArecipe[i].perServing){
            indyCalc.innerHTML = justArecipe[i].perServing;
        } else {
            indyCalc.style.display = "none";
        }

        let indySource = document.createElement("div");
        indySource.style.color = "#772001";
        indyRecipe.append(indySource);
        indySource.classList.add("FullRecipeSource");
        if(justArecipe[i].recipeSource){
            indySource.innerHTML = justArecipe[i].recipeSource;
        } else {
            indySource.style.display = "none";
        }

        let pdfButton = document.createElement("div");
        pdfButton.innerHTML = "Export / Print PDF";
        indyRecipe.append(pdfButton);
        pdfButton.classList.add("rrPDFbutton");

        let addIngredients = document.createElement("div");
        indyRecipe.append(addIngredients);
        addIngredients.innerHTML = "<div><img class='addToButtonFR' alt='add ingredients to grocery list button' src='images/addTo.svg'><div class='addToGLFR'>Add ingredients</br>to grocery list</div>"
    
    };

    /* slider back button */
    const backButton = document.getElementById("back-button");

    backButton.addEventListener("click", function () {
        rrRecipeBox.style.display = 'none';
        rrIndex.style.display = 'block';
    });

    function hideAllRecipes() {    
        rrRecipeBox.style.display = 'none'
    }

    window.onload = hideAllRecipes();  
}

recipeStructure(rrRecipeList);
