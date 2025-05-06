import Recipe from "./models/Recipe.js"
import RecipeTemplate from "./templates/RecipeTemplate.js"



recipes.forEach(recipe => {
    const test = new Recipe(recipe)
    const $card = new RecipeTemplate(test).createRecipeCard()
    const ht = document.querySelector(".recipes")
    ht.appendChild($card)
})