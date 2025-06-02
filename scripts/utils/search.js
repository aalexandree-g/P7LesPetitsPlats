import { state } from "./state.js"
import { normalize } from "../utils/stringUtils.js"

import RecipeTemplate from "../templates/RecipeTemplate.js"
import FiltersTemplate from "../templates/FiltersTemplate.js"

// NATIVE LOOPS VERSION
function filterRecipesBySearchQueryNative(recipes, words) {
    const finalRecipes = []
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i]

        let combinedText = recipe.name + " " + recipe.description + " "
        for (let j = 0; j < recipe.ingredients.length; j++) {
            combinedText += recipe.ingredients[j].ingredient + " "
        }

        const normalizedText = normalize(combinedText)

        let matchesAllWords = true
        for (let k = 0; k < words.length; k++) {
            if (normalizedText.indexOf(words[k]) === -1) {
                matchesAllWords = false
                break
            }
        }

        if (matchesAllWords) {
            finalRecipes.push(recipe)
        }
    }

    return finalRecipes
}

export function search() {
    const $recipesContainer = document.querySelector(".recipes")

    // empty old recipes
    document.querySelector(".recipe-count").innerHTML = ""
    $recipesContainer.innerHTML = ""

    // clone state.filteredByTags
    const recipesToShow = []
    for (let i = 0; i < state.filteredByTags.length; i++) {
        recipesToShow.push(state.filteredByTags[i])
    }

    // normalize search query
    const words = []
    const rawWords = state.searchQuery.split(/\s+/)
    for (let i = 0; i < rawWords.length; i++) {
        words.push(normalize(rawWords[i]))
    }

    // filter recipes
    const finalRecipes = filterRecipesBySearchQueryNative(recipesToShow, words)

    // display number of recipes
    const recipeCountTemplate = new FiltersTemplate()
    recipeCountTemplate.updateRecipeCount(finalRecipes.length)

    // display filtered recipes
    if (finalRecipes.length > 0) {
        $recipesContainer.classList.remove("no-result")

        for (let i = 0; i < finalRecipes.length; i++) {
            const $card = new RecipeTemplate(finalRecipes[i]).createCard()
            $recipesContainer.appendChild($card)
        }
    } else {
        recipeCountTemplate.zeroRecipeError()
    }

    return finalRecipes
}