import { capitalize } from "../utils/stringUtils.js"
import RecipeTemplate from "../templates/RecipeTemplate.js"
import FiltersTemplate from "../templates/FiltersTemplate.js"

export default class Filters {
    constructor(recipes) {
        this._recipes = recipes
        this._activeFilters = []
        this.$recipesContainer = document.querySelector(".recipes")
    }

    closeMenu($menu) {
        $menu.classList.remove("open")
    }

    updateDisplay() {
        const filtered = this._recipes.filter(recipe =>
            this._activeFilters.every(tag =>
                recipe.ingredients.some(i => i.name === tag)
            )
        )
        this.$recipesContainer.innerHTML = ""
        filtered.forEach(recipe => {
            const card = new RecipeTemplate(recipe).createCard()
            this.$recipesContainer.appendChild(card)
        })   
    }

    createTag(ingredient) {
        const $tag = new FiltersTemplate().createTag(capitalize(ingredient))
        document.querySelector(".tag-list").appendChild($tag)

        $tag.querySelector(".tag-close-icon").addEventListener("click", () => {
            this._activeFilters = this._activeFilters.filter(tag => tag !== ingredient)
            // animation
            $tag.classList.add("fading-out")
            setTimeout(() => {
                $tag.remove()
                if (this._activeFilters.length === 0) {
                    this.$recipesContainer.classList.remove("down")
                }
                setTimeout(() => this.updateDisplay(), 220)
            }, 200)
        })
    }

    init() {
        // get all ingredients from all recipes
        const ingredients = this._recipes.flatMap(r => r.ingredients.map(i => i.name))
        // remove duplicates and sort alphabetically
        const uniqueIngredients = [...new Set(ingredients)].sort((a, b) => a.localeCompare(b, "fr"))

        uniqueIngredients.forEach(ingredient => {
            const $btn = new FiltersTemplate().createFilter("ingredients", capitalize(ingredient))
            document.querySelector(".filter-list").appendChild($btn)

            $btn.addEventListener("click", () => {
                // add filter to activeFilters
                this._activeFilters.push(ingredient)
                this.updateDisplay()

                // create tag
                this.createTag(ingredient)

                // close menu
                const $menu = $btn.closest(".menu")
                if ($menu) this.closeMenu($menu)
            })
        })
    }
}