import RecipeTemplate from "../templates/RecipeTemplate.js"
import FiltersTemplate from "../templates/FiltersTemplate.js"
import Tag from "./Tag.js"
import TagTemplate from "../templates/TagTemplate.js"
import Menu from "./Menu.js"
import MenuTemplate from "../templates/MenuTemplate.js"

export default class Filters {

    constructor(recipes, type) {
        this._recipes = recipes
        this._type = type
        this._activeFilters = []
        this.$recipesContainer = document.querySelector(".recipes")
        this.updateDisplay()
        this._menu = new Menu(type)
        this._menu.init()
    }

    createTag(ingredient) {
        // filter already exists = ignore
        if (this._activeFilters.includes(ingredient)) return
        // create tag
        const $tag = new Tag(ingredient).render()
        this._activeFilters.push(ingredient)
        // click on close icon
        $tag.querySelector(".tag-close-icon").addEventListener("click", () => {
            // animation
            new TagTemplate().fadeOutAnimation($tag)
            // remove from active filters
            const $btn = document.querySelector(`.filter[value="${ingredient}"]`)
            $btn.classList.remove("selected")
            this._activeFilters = this._activeFilters.filter(tag => tag !== ingredient)
            document.querySelector(".remaining-list").appendChild($btn)
            setTimeout(() => this.updateDisplay(), 350)
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
        // get all ingredients from all recipes
        const ingredients = this._recipes.flatMap(r => r.ingredients.map(i => i.name))
        // delete duplicates and sort alphabetically
        const uniqueIngredients = [...new Set(ingredients)].sort((a, b) => a.localeCompare(b, "fr"))

        new MenuTemplate().createFilterLists(this._type, uniqueIngredients, this._activeFilters)

        document.querySelectorAll(`.filter-list[data-type="${this._type}"] .filter`).forEach($btn => {
            const ingredient = $btn.value
            $btn.addEventListener("click", () => {
                // close menu
                const $menu = $btn.closest(".menu")
                if ($menu) this._menu.closeMenu($menu)
                // create tag
                this.createTag(ingredient)
                this.updateDisplay()
                // add filter to selected list
                const $selected = document.querySelector(".selected-list")
                $btn.classList.add("selected")
                $selected.appendChild($btn)
            })
        })
    }

}