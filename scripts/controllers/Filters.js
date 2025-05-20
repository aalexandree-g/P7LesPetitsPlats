import { sortListAlphabetically } from "../utils/stringUtils.js"
import RecipeTemplate from "../templates/RecipeTemplate.js"
import FiltersTemplate from "../templates/FiltersTemplate.js"
import Tag from "./Tag.js"
import TagTemplate from "../templates/TagTemplate.js"
import Menu from "./Menu.js"
import MenuTemplate from "../templates/MenuTemplate.js"

export default class Filters {

    constructor(recipes) {
        this._recipes = recipes
        this._types = ["ingredients", "appliance", "ustensils"]
        this._activeFilters = []
        this.$recipesContainer = document.querySelector(".recipes")
        this.updateDisplay()
        this._menu = new Menu()
        this._menu.init()
    }

    getElementsByType(type) {
        return this._recipes.flatMap(recipe => {
            if (type === "ingredients") return recipe.ingredients.map(i => i.name)
            if (type === "appliance") return [recipe.appliance]
            if (type === "ustensils") return recipe.ustensils
            return []
        })
    }

    createTag(type, element) {
    // filter already exists = ignore
    if (this._activeFilters.includes(element)) return

    // create tag
    const $tag = new Tag(element).render()
    this._activeFilters.push(element)

    // show selected list
    const $selected = document.querySelector(`.selected-list[data-type="${type}"]`)
    if ($selected) {
        $selected.classList.remove("hidden")
    }

    const deleteTag = ($tag) => {
        new TagTemplate().fadeOutAnimation($tag)

        // remove from active filters
        const $btn = document.querySelector(`.filter[value="${element}"]`)
        $btn.classList.remove("selected")
        this._activeFilters = this._activeFilters.filter(tag => tag !== element)

        // move back to remaining list
        const $remaining = document.querySelector(`.remaining-list[data-type="${type}"]`)
        $remaining.appendChild($btn)
        sortListAlphabetically($remaining)

        // hide selected list if empty
        if ($selected && $selected.children.length === 0) {
            $selected.classList.add("hidden")
        }

        setTimeout(() => this.updateDisplay(), 350)
    }

    // click on close icon
    $tag.querySelector(".tag-close-icon").addEventListener("click", () => {
        deleteTag($tag)
    })
}


    updateDisplay() {
        this.$recipesContainer.classList.remove("no-result")
        // keep recipes matching tags
        const filtered = this._recipes.filter(recipe =>
            this._activeFilters.every(tag =>
                recipe.ingredients.some(i => i.name === tag)
            )
        )
        // display number of recipes
        this.$recipesContainer.innerHTML = ""
        document.querySelector(".recipe-count").innerHTML = ""
        const recipeCountTemplate = new FiltersTemplate()
        recipeCountTemplate.updateRecipeCount(filtered.length)
        // display filtered recipes
        if (filtered.length > 0) {
            filtered.forEach(recipe => {
                const $card = new RecipeTemplate(recipe).createCard()
                this.$recipesContainer.appendChild($card)
            })
        } else {
            recipeCountTemplate.zeroRecipeError()
        }
    }

    init() {
        // get all elements by type from all recipes
        this._types.forEach(type => {
            const elements = this.getElementsByType(type)
            // delete duplicates and sort alphabetically
            const uniqueIngredients = [...new Set(elements)].sort((a, b) => a.localeCompare(b, "fr"))
            new MenuTemplate().createFilterLists(type, uniqueIngredients, this._activeFilters)
            document.querySelectorAll(`.filter-list[data-type="${type}"] .filter`).forEach($btn => {
                const element = $btn.value
                $btn.addEventListener("click", () => {
                    // close menu
                    const $menu = $btn.closest(".menu")
                    if ($menu) this._menu.closeMenu($menu)
                    // create tag
                    this.createTag(type, element)
                    this.updateDisplay()
                    // add filter to selected list
                    $btn.classList.add("selected")
                    const $selected = document.querySelector(`.selected-list[data-type="${type}"]`)
                    $selected.appendChild($btn)
                })
            })
        })   
    }

}