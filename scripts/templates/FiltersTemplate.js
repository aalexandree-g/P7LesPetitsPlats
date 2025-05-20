export default class FiltersTemplate {

    createFilter(type, item) {
        const $filter = document.createElement("button")
        $filter.classList.add("filter")
        $filter.dataset.type = type
        $filter.value = item
        $filter.textContent = item
        return $filter
    }

    updateRecipeCount(count) {
        const recipeCount = count < 2 ? `${count} recette` : `${count} recettes`
        const $h2 = document.createElement("h2")
        $h2.textContent = recipeCount
        document.querySelector(".recipe-count").appendChild($h2)
    }

    zeroRecipeError() {
        const $p = document.createElement("p")
        $p.textContent = "Aucune recette ne contient les filtres sélectionnés."
        const $recipesContainer = document.querySelector(".recipes")
        $recipesContainer.classList.add("no-result")
        $recipesContainer.appendChild($p)
    }

}