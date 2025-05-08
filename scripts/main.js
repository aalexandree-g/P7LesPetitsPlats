import Filter from "./controllers/Filter.js"
import Recipe from "./models/Recipe.js"
import RecipeTemplate from "./templates/RecipeTemplate.js"





const filter = new Filter()
filter.openMenu()

const allIngredients = []
const allAppliances = []

// display recipes' cards
recipes.forEach(recipeData => {
    const recipe = new Recipe(recipeData)

    allIngredients.push(...recipe.normalizedIngredients.map(item => item.normalizedName))
    allAppliances.push(...recipe.normalizedAppliances.map(item => item.normalizedName))

    const $card = new RecipeTemplate(recipe).createRecipeCard()
    document.querySelector(".recipes").appendChild($card)
})

const uniqueIngredients = [...new Set(allIngredients)].sort((a, b) => a.localeCompare(b))
const uniqueAppliances = [...new Set(allAppliances)].sort((a, b) => a.localeCompare(b))

const ingredientsHTML = uniqueIngredients.map(ingredient => `<button>${ingredient}</button>`).join("")
document.querySelector(".choices").innerHTML = ingredientsHTML

const appliancesHTML = uniqueAppliances.map(appliance => `<button>${appliance}</button>`).join("")
document.querySelector(".appliances").innerHTML = appliancesHTML