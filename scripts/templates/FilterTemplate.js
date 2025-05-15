import { recipes } from "../data/recipes.js"
import Filter from "../controllers/Filter.js"

export default class FilterTemplate {
    constructor() {
    }

    displayNbRecipes(nbRecipes) {
        const text = nbRecipes < 2 ? `${nbRecipes} recette` : `${nbRecipes} recettes`
        document.querySelector(".nb-recipes h2").textContent = `${text}`
    }

    createFilterList(type, allElements, activeTags = []) {
        // remove duplicates and sort alphabetically
        const uniqueElements = [...new Set(allElements)].sort((a, b) => a.localeCompare(b))
        // group selected elements
        const selected = uniqueElements
            .filter(item => activeTags.includes(item))
            .map(item => `<button class="filter-choice selected" data-type="${type}" value="${item}">${item}</button>`)
            .join("")
        // group remaining elements
        const remaining = uniqueElements
            .filter(item => !activeTags.includes(item))
            .map(item => `<button class="filter-choice" data-type="${type}" value="${item}">${item}</button>`)
            .join("")
        // display lists of elements
        document.querySelector(`.filter-choices.selected[data-type="${type}"]`).innerHTML = `${selected}`
        document.querySelector(`.filter-choices.remaining[data-type="${type}"]`).innerHTML = `${remaining}`

        this.displayNbRecipes(recipes.length)
    }

    createTag(tag) {
        const $tag = `
            <div class="tag" data-value="${tag}">
                <span>${tag}</span>
                <i class="fa-solid fa-xmark tag-close-icon"></i>
            </div>
        `
        document.querySelector(".tag-list").innerHTML += $tag
    }
}