import Recipe from "../models/Recipe.js"
import FilterTemplate from "../templates/FilterTemplate.js"
import RecipeTemplate from "../templates/RecipeTemplate.js"

export default class Filter {
    constructor(recipes, allIngredients) {
        this._recipes = recipes
        this._filteredRecipes = this._recipes
        this.$recipesContainer = document.querySelector(".recipes")
        this._activeTags = []
        this._allIngredients = allIngredients
    }

    toggleMenu(type) {
        // check which menu is open
        const $options = document.querySelector(`.options[data-type="${type}"]`)
        if (!$options) return
        // close all menus
        const isOpen = $options.classList.contains("open")
        document.querySelectorAll(".options")
            .forEach($element => this.closeMenu($element))
        // only toggle selected menu
        if (!isOpen) $options.classList.toggle("open")
    }

    closeMenu($menu) {
        $menu.classList.remove("open")
        this.resetSearchInput($menu)
    }
    
    displayFilteredRecipes() {
        // empty recipes
        this.$recipesContainer.classList.remove("no-result")
        this.$recipesContainer.innerHTML = ""
        // apply tags
        let filtered = this._recipes
        this._activeTags.forEach(tag => {
            filtered = filtered.filter(data => {
                const recipe = new Recipe(data)
                return recipe.formattedIngredients.some(item => item.name === tag)
            })
        })
        // display recipes or error
        if (filtered.length > 0) {
            filtered.forEach(data => {
                const recipe = new Recipe(data)
                const $card = new RecipeTemplate(recipe).createRecipeCard()
                this.$recipesContainer.appendChild($card)
            })
        } else {
            this.$recipesContainer.innerHTML = `<p>Aucune recette ne contient les filtres sélectionnés.</p>`
            this.$recipesContainer.classList.add("no-result")
        }
        this._filteredRecipes = filtered                            // update filtered recipes
        new FilterTemplate().displayNbRecipes(filtered.length)      // update number of recipes
    }

    filterByActiveTags(inputTag) {
        // if tag already exists
        if (this._activeTags.includes(inputTag)) return
        // add to activeTags array
        this._activeTags.push(inputTag)
        // change choice color in list
        document.querySelector(`.filter-choice[value="${inputTag}"`).classList.add("active")
        // animation
        if (this._activeTags.length === 1) {
            this.$recipesContainer.classList.add("down")
        }
        // display tags
        const template = new FilterTemplate()
        template.createTag(inputTag)
        template.displayNbRecipes(this._filteredRecipes.length)     // update number of recipes
        this.displayFilteredRecipes()                               // update recipes
        this.tagCloseEvents()
    }

    tagCloseEvents() {
        document.querySelectorAll(".tag").forEach($tag => {
            // click on tag cross icon
            $tag.querySelector(".tag-close-icon").addEventListener("click", () => {
                const value = $tag.dataset.value
                document.querySelector(`.filter-choice[value="${value}"]`).classList.remove("active")
                // animation
                $tag.classList.add("fading-out")
                setTimeout(() => {
                    $tag.remove()
                    this._activeTags = this._activeTags.filter(t => t !== value)
                    if (this._activeTags.length === 0) {
                        this.$recipesContainer.classList.remove("down")
                    }
                    setTimeout(() => this.displayFilteredRecipes(), 220)
                }, 200)
            })
        })
    }

    filterMenuItems(type, inputValue) {
        const normalized = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        const value = normalized(inputValue)
        document.querySelectorAll(`.filter-choices[data-type="${type}"] .filter-choice`).forEach($btn => {
            const text = normalized($btn.textContent)
            $btn.classList.toggle("hidden", !text.includes(value))
        })
    }

    resetSearchInput($menu) {
        const $input = $menu.querySelector("input")
        const $icon = $menu.querySelector(".tag-close-icon")
        const type = $menu.dataset.type
    
        if ($input) $input.value = ""
        if ($icon) $icon.classList.remove("visible")
    
        document
            .querySelectorAll(`.filter-choices[data-type="${type}"] .filter-choice`)
            .forEach($btn => $btn.classList.remove("hidden"))
    }
    

    setupSearchInput($inputBlock) {
        const $input = $inputBlock.querySelector("input")
        const $icon = $inputBlock.querySelector(".tag-close-icon")
        const type = $inputBlock.dataset.type
        if (!$input) return
        // display search cross icon
        $input.addEventListener("input", () => {
            const value = $input.value
            if ($icon) $icon.classList.toggle("visible", value !== "")
            this.filterMenuItems(type, value)
        })
        // reset input
        if ($icon) {
            $icon.addEventListener("click", () => {
                this.resetSearchInput($inputBlock)
                $input.focus()
            })
        }
    }

    setupEvents() {
        // click on menu (open or close)
        document.querySelectorAll(".filter-title").forEach($title => {
            $title.addEventListener("click", () => {
                this.toggleMenu($title.dataset.type)
            })
        })
        // click on choices (select tags)
        document.querySelectorAll(".filter-choice").forEach($choice => {
            $choice.addEventListener("click", (e) => {
                this.filterByActiveTags(e.target.value)
                this.closeMenu($choice.closest(".options"))
            })
        })
        // input (search)
        document.querySelectorAll(".filter-search").forEach($inputBlock => {
            this.setupSearchInput($inputBlock)
        })
    }

    init() {
        this.setupEvents()
    }
}