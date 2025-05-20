import Filters from "./controllers/Filters.js"
import Menu from "./controllers/Menu.js"
import { recipes } from "./data/recipes.js"
import Recipe from "./models/Recipe.js"
import RecipeTemplate from "./templates/RecipeTemplate.js"

const allRecipes = recipes.map(data => new Recipe(data))

// display recipes
allRecipes.forEach(recipe => {
    const $card = new RecipeTemplate(recipe).createCard()
    document.querySelector(".recipes").appendChild($card)
})


new Filters(allRecipes).init()