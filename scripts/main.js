import Recipe from "./models/Recipe.js"
import RecipeTemplate from "./templates/RecipeTemplate.js"







const allIngredients = []

// display recipes' cards
recipes.forEach(recipeData => {
    const recipe = new Recipe(recipeData)

    allIngredients.push(...recipe.normalizedIngredients.map(item => item.normalizedName))

    const $card = new RecipeTemplate(recipe).createRecipeCard()
    document.querySelector(".recipes").appendChild($card)
})

const uniqueIngredients = [...new Set(allIngredients)].sort((a, b) => a.localeCompare(b))
const filtersHTML = uniqueIngredients.map(ingredient => {
    return `<button>${ingredient}</button>`
}).join("")
document.querySelector(".choices").innerHTML = filtersHTML