import Filter from "./controllers/Filter.js"
import Recipe from "./models/Recipe.js"
import RecipeTemplate from "./templates/RecipeTemplate.js"
import FilterTemplate from "./templates/FilterTemplate.js"



let allIngredients = []

const filter = new Filter(recipes, allIngredients)



// display recipes' cards
recipes.forEach(recipeData => {
    const recipe = new Recipe(recipeData)

    allIngredients.push(...recipe.formattedIngredients.map(item => item.name))

    if (recipe.formattedIngredients.some(item => item.name.includes("Banane"))) {
        const $card = new RecipeTemplate(recipe).createRecipeCard()
        document.querySelector(".recipes").appendChild($card)
    }
});

// create filter list AFTER gathering all ingredients
new FilterTemplate().createFilterList(allIngredients)

filter.init()