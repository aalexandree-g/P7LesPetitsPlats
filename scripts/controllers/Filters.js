import RecipeTemplate from "../templates/RecipeTemplate.js"
import FiltersTemplate from "../templates/FiltersTemplate.js"
import TagTemplate from "../templates/TagTemplate.js"
import Menu from "./Menu.js"
import MenuTemplate from "../templates/MenuTemplate.js"

export default class Filters {

    constructor(recipes) {
        this._recipes = recipes
        this._types = ["ingredients", "appliance", "ustensils"]
        this._filters = { 
            ingredients: { selected: [], remaining: [] },
            appliance: { selected: [], remaining: [] },
            ustensils: { selected: [], remaining: [] }
        }
        this.$recipesContainer = document.querySelector(".recipes")
        this.updateDisplay()
        this._menu = new Menu()
        this._menu.init()
        this._menuTemplate = new MenuTemplate()
    }

    getElementsByType(type) {
        return this._recipes.flatMap(recipe => {
            if (type === "ingredients") return recipe.ingredients.map(i => i.name)
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

    createTag(type, element) {

        const selected = this._filters[type].selected
        const remaining = this._filters[type].remaining

        // filter already exists = ignore
        if (selected.includes(element)) return

        // move filter to selected list
        this._filters[type].remaining = remaining.filter(tag => tag !== element)
        selected.push(element)
        selected.sort((a, b) => a.localeCompare(b, "fr"))

        // show selected list
        const $selected = document.querySelector(`.selected-list[data-type="${type}"]`)
        if ($selected) { $selected.classList.remove("hidden") }

        // display lists
        this._menuTemplate.renderFilterLists(type, selected, this._filters[type].remaining)
        this.setupClickEvents(type)

        // display tags
        new TagTemplate().renderTags(this.allActiveFilters)
        this.setupTagCloseEvents()

        // refresh recipes
        this.updateDisplay()

    }

    deleteTag(type, element) {

        const selected = this._filters[type].selected
        const remaining = this._filters[type].remaining

        // move filter to remaining list
        this._filters[type].selected = selected.filter(tag => tag !== element)
        remaining.push(element)
        remaining.sort((a, b) => a.localeCompare(b, "fr"))
        
        // hide selected list if empty
        if (this._filters[type].selected.length === 0) {
            const $selected = document.querySelector(`.selected-list[data-type="${type}"]`)
            if ($selected) { $selected.classList.add("hidden") }
        }

        // display lists
        this._menuTemplate.renderFilterLists(type, this._filters[type].selected, remaining)
        this.setupClickEvents(type)

        // display tags
        new TagTemplate().renderTags(this.allActiveFilters)
        this.setupTagCloseEvents()

        // refresh recipes
        setTimeout(() => this.updateDisplay(), 350)

    }

    updateDisplay() {

        this.$recipesContainer.classList.remove("no-result")

        const selectedLabels = this.allActiveFilters.map(f => f.label)

        // keep recipes matching tags
        const filtered = this._recipes.filter(recipe =>
            selectedLabels.every(label =>
                recipe.ingredients.some(i => i.name === label) ||
                recipe.appliance === label ||
                recipe.ustensils.includes(label)
            )
        )

        // empty old recipes
        this.$recipesContainer.innerHTML = ""
        document.querySelector(".recipe-count").innerHTML = ""

        // display number of recipes
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
            const elements = this.getElementsByType(type)
            const unique = [...new Set(elements)].sort((a, b) => a.localeCompare(b, "fr"))
            this._filters[type] = { selected: [], remaining: unique }
            this._menuTemplate.renderFilterLists(type, [], unique)
            this.setupClickEvents(type)
        })
    }

}