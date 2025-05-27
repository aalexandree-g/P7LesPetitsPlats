import { state } from "./state.js"
import RecipeTemplate from "../templates/RecipeTemplate.js"
import FiltersTemplate from "../templates/FiltersTemplate.js"

export function applyCombinedFiltering() {

    // empty old recipes
    document.querySelector(".recipe-count").innerHTML = ""
    const $recipesContainer = document.querySelector(".recipes")
    $recipesContainer.innerHTML = ""

    let recipesToShow = [...state.filteredByTags]
    const words = state.searchQuery.split(/\s+/)

    recipesToShow = recipesToShow.filter(recipe => {
        const text = [
            recipe.name,
            recipe.description,
            ...recipe.ingredients.map(i => i.ingredient)
        ].join(" ").toLowerCase()

        return words.every(word => text.includes(word))
    })
    
    // display number of recipes
    const recipeCountTemplate = new FiltersTemplate()
    recipeCountTemplate.updateRecipeCount(recipesToShow.length)

    // display filtered recipes
    if (recipesToShow.length > 0) {
        $recipesContainer.classList.remove("no-result")
        recipesToShow.forEach(recipe => {
            const $card = new RecipeTemplate(recipe).createCard()
            $recipesContainer.appendChild($card)
        })
    } else {
        recipeCountTemplate.zeroRecipeError()
    }

}