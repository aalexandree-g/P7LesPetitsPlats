import { state } from "../utils/state.js"
import { applyCombinedFiltering } from "../utils/applyCombinedFiltering.js"

import Menu from "./Menu.js"
import MenuTemplate from "../templates/MenuTemplate.js"
import FiltersTemplate from "../templates/FiltersTemplate.js"

export default class Filters {
    constructor() {
        this._recipes = state.allRecipes
        this._types = ["ingredients", "appliance", "ustensils"]
        this._filters = { 
            ingredients: { selected: [], remaining: [] },
            appliance: { selected: [], remaining: [] },
            ustensils: { selected: [], remaining: [] }
        }
        this.$recipesContainer = document.querySelector(".recipes")
        this.updateDisplay()
        this._menu = new Menu()
        this._menuTemplate = new MenuTemplate()
    }

    getElementsByType(type, recipes) {
        return recipes.flatMap(recipe => {
            if (type === "ingredients") return recipe.ingredients.map(i => i.ingredient)
            if (type === "appliance") return [recipe.appliance]
            if (type === "ustensils") return recipe.ustensils
            return []
        })
    }

    // get active filters from all types
    get allActiveFilters() {
        return this._types.flatMap(type =>
            this._filters[type].selected.map(label => ({ type, label }))
        )
    }

    updateMenusAndTags(filteredRecipes) {
        // keep elements from filtered recipes only
        this._types.forEach(type => {
            const elements = this.getElementsByType(type, filteredRecipes)
            const unique = [...new Set(elements)].sort((a, b) => a.localeCompare(b, "fr"))

            // remove element from remaining list
            this._filters[type].remaining = unique.filter(el => !this._filters[type].selected.includes(el))

            this._menuTemplate.renderFilterLists(type, this._filters[type].selected, this._filters[type].remaining)
            this.setupClickEvents(type)
        })

        // display tags
        new FiltersTemplate().renderTags(this.allActiveFilters)
        this.setupTagCloseEvents()
    }

    createTag(type, element) {
        const selected = this._filters[type].selected

        // filter already exists = ignore
        if (selected.includes(element)) return

        // put filter into selected list
        selected.push(element)
        selected.sort((a, b) => a.localeCompare(b, "fr"))

        // show selected list
        const $selected = document.querySelector(`.selected-list[data-type="${type}"]`)
        if ($selected) { $selected.classList.remove("hidden") }

        // refresh
        const filteredRecipes = this.updateDisplay()
        this.updateMenusAndTags(filteredRecipes)
    }

    deleteTag(type, element) {
        // remove element from selected list
        this._filters[type].selected = this._filters[type].selected.filter(tag => tag !== element)

        // hide selected list if empty
        if (this._filters[type].selected.length === 0) {
            const $selected = document.querySelector(`.selected-list[data-type="${type}"]`)
            if ($selected) { $selected.classList.add("hidden") }
        }

        // refresh
        const filteredRecipes = this.updateDisplay()
        this.updateMenusAndTags(filteredRecipes)
    }

    updateDisplay() {
        this.$recipesContainer.classList.remove("no-result")

        const selectedLabels = this.allActiveFilters.map(f => f.label)

        // keep recipes matching tags
        const filtered = state.allRecipes.filter(recipe =>
            selectedLabels.every(label =>
                recipe.ingredients.some(i => i.ingredient === label) ||
                recipe.appliance === label ||
                recipe.ustensils.includes(label)
            )
        )

        // refresh
        state.filteredByTags = filtered
        const filteredRecipes = applyCombinedFiltering()

        return filteredRecipes
    }

    setupClickEvents(type) {
        document.querySelectorAll(`.filter-list[data-type="${type}"] .filter`).forEach($btn => {
            const $menu = $btn.closest(".menu")
            const value = $btn.value

            $btn.addEventListener("click", () => {
                if ($menu) this._menu.closeMenu($menu)
                this.createTag(type, value)
            })

            $btn.querySelector(".filter-close-icon").addEventListener("click", (e) => {
                e.stopPropagation()
                if ($menu) this._menu.closeMenu($menu)
                this.deleteTag(type, value)
            })
        })    
    }

    setupTagCloseEvents() {
        document.querySelectorAll(".tag-close-icon").forEach($icon => {
            $icon.addEventListener("click", (e) => {
                const $tag = e.target.closest(".tag")
                const value = $tag.dataset.value
                const type = this._types.find(t => this._filters[t].selected.includes(value))
                if (type) this.deleteTag(type, value)
            })
        })
    }

    init() {
        // get all elements by type from all recipes
        this._types.forEach(type => {
            // delete duplicates and sort alphabetically
            const elements = this.getElementsByType(type, this._recipes)
            const unique = [...new Set(elements)].sort((a, b) => a.localeCompare(b, "fr"))
            this._filters[type] = { selected: [], remaining: unique }
            this._menuTemplate.renderFilterLists(type, [], unique)
            this.setupClickEvents(type)
        })
    }
}