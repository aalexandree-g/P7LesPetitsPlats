import { recipes } from "./data/recipes.js"

import Filter from "./controllers/Filter.js"
import Recipe from "./models/Recipe.js"
import RecipeTemplate from "./templates/RecipeTemplate.js"
import FilterTemplate from "./templates/FilterTemplate.js"


let allIngredients = []
let activeTags = []

recipes.forEach(data => {

    // get recipes
    const recipe = new Recipe(data)

    // get ingredients for filters
    allIngredients.push(...recipe.formattedIngredients.map(item => item.name))

    // display recipes
    const $card = new RecipeTemplate(recipe).createRecipeCard()
    document.querySelector(".recipes").appendChild($card)

})


new FilterTemplate().createFilterList("ingredients", allIngredients, activeTags)


new Filter(recipes, allIngredients).init()