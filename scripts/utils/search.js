import { state } from "./state.js"
import { normalize } from "../utils/stringUtils.js"

import RecipeTemplate from "../templates/RecipeTemplate.js"
import FiltersTemplate from "../templates/FiltersTemplate.js"

function filterRecipesBySearchQuery(recipes, queryWords) {
    return recipes.filter(recipe => {
        const text = normalize([
            recipe.name,
            recipe.description,
            ...recipe.ingredients.map(i => i.ingredient)
        ].join(" "))

        return queryWords.every(word => text.includes(word))
    })
}

export function search() {
    const $recipesContainer = document.querySelector(".recipes")

    // empty old recipes
    document.querySelector(".recipe-count").innerHTML = ""
    $recipesContainer.innerHTML = ""

    // clone state.filteredByTags
    let recipesToShow = [...state.filteredByTags]
    
    // normalize search query
    const words = state.searchQuery.split(/\s+/).map(normalize)

    // filter recipes
    recipesToShow = filterRecipesBySearchQuery(recipesToShow, words)
    
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

    return recipesToShow
}