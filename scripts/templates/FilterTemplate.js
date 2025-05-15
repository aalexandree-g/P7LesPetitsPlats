import { recipes } from "../data/recipes.js"
import Filter from "../controllers/Filter.js"

export default class FilterTemplate {
    constructor() {
    }

    displayNbRecipes(nbRecipes) {
        const text = nbRecipes < 2 ? `${nbRecipes} recette` : `${nbRecipes} recettes`
        document.querySelector(".nb-recipes h2").textContent = `${text}`
    }

    createFilterList(allElements) {
        // remove duplicates and sort alphabetically
        const elements = [...new Set(allElements)].sort((a, b) => a.localeCompare(b))
        // display list of elements
        const elementsHTML = elements.map(item => `<button class="filter-choice" value="${item}">${item}</button>`).join("")
        document.querySelector(".filter-choices").innerHTML = elementsHTML
        new Filter(recipes, allElements).init()
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