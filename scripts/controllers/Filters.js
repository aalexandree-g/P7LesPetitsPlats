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

    fadeInAnimation($tag) {
        if (this._activeFilters.length === 1) {
            this.$recipesContainer.classList.add("down")
        }
        setTimeout(() => {
            $tag.classList.add("showing")
            $tag.classList.add("visible")
            setTimeout(() => {
                $tag.classList.remove("showing")
            },200)
        }, 200)
    }

    fadeOutAnimation($tag) {
        $tag.classList.add("hidding")
        setTimeout(() => {
            $tag.remove()
            if (this._activeFilters.length === 0) {
                this.$recipesContainer.classList.remove("down")
            }
            setTimeout(() => this.updateDisplay(), 200)
        }, 150)
    }

    createTag(ingredient) {
        const $tag = new FiltersTemplate().createTag(capitalize(ingredient))
        document.querySelector(".tag-list").appendChild($tag)
        this.fadeInAnimation($tag)
        // click on close icon
        $tag.querySelector(".tag-close-icon").addEventListener("click", () => {
            this._activeFilters = this._activeFilters.filter(tag => tag !== ingredient)
            this.fadeOutAnimation($tag)
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
        document.querySelector(".recipe-count").innerHTML = ""
        new FiltersTemplate().updateRecipeCount(filtered.length)

        if (filtered.length > 0) {
            // display filtered recipes
            this.$recipesContainer.innerHTML = ""
            filtered.forEach(recipe => {
                const card = new RecipeTemplate(recipe).createCard()
                this.$recipesContainer.appendChild(card)
            })
        } else {
            this.$recipesContainer.innerHTML = `<p>Aucune recette ne contient les filtres sélectionnés.</p>`
            this.$recipesContainer.classList.add("no-result")
        }
    }

    init() {
        this.updateDisplay()
        // get all ingredients from all recipes
        const ingredients = this._recipes.flatMap(r => r.ingredients.map(i => i.name))
        // remove duplicates and sort alphabetically
        const uniqueIngredients = [...new Set(ingredients)].sort((a, b) => a.localeCompare(b, "fr"))
        // create filter list
        uniqueIngredients.forEach(ingredient => {
            const $btn = new FiltersTemplate().createFilter("ingredients", capitalize(ingredient))
            document.querySelector(".filter-list").appendChild($btn)
            $btn.addEventListener("click", () => {
                // close menu
                const $menu = $btn.closest(".menu")
                if ($menu) this.closeMenu($menu)
                // filter already exists = ignore
                if (this._activeFilters.includes(ingredient)) return
                this._activeFilters.push(ingredient)
                this.createTag(ingredient)
                this.updateDisplay()
            })
        })
    }
}