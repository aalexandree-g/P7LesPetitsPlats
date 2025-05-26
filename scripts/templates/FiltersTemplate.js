import { capitalize } from "../utils/stringUtils.js"

export default class FiltersTemplate {

    createFilter(type, item) {
        const $filter = document.createElement("button")
        $filter.classList.add("filter")
        $filter.dataset.type = type
        $filter.value = item

        const $span = document.createElement("span")
        $span.textContent = capitalize(item)

        const $icon = document.createElement("i")
        $icon.classList.add("fa-solid", "fa-circle-xmark", "filter-close-icon")
        $icon.dataset.value = item

        $filter.appendChild($span)
        $filter.appendChild($icon)

        return $filter
    }

    createTag(type, label) {
        const $tag = document.createElement("div")
        $tag.classList.add("tag")
        $tag.dataset.value = label
        $tag.dataset.type = type

        const $span = document.createElement("span")
        $span.textContent = capitalize(label)

        const $icon = document.createElement("i")
        $icon.classList.add("fa-solid", "fa-xmark", "tag-close-icon")

        $tag.appendChild($span)
        $tag.appendChild($icon)

        return $tag
    }

    renderTags(allActiveFilters) {
        const $tagList = document.querySelector(".tag-list")
        const $recipes = document.querySelector(".recipes")
        
        $tagList.innerHTML = ""

        if (allActiveFilters.length > 0) {
            $recipes.classList.add("down")
        } else {
            $recipes.classList.remove("down")
        }

        allActiveFilters.forEach(({ type, label }) => {
        const $tag = this.createTag(type, label)
            $tagList.appendChild($tag)
            setTimeout(() => {
                $tag.classList.add("visible")
            }, 150)
        })
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