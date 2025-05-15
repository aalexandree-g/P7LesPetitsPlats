import Recipe from "../models/Recipe.js"
import FilterTemplate from "../templates/FilterTemplate.js"
import RecipeTemplate from "../templates/RecipeTemplate.js"

export default class Filter {
    constructor(recipes, allIngredients) {
        this._recipes = recipes
        this._filteredRecipes = this._recipes
        this._$recipesContainer = document.querySelector(".recipes")
        this._activeTags = []
        this._allIngredients = allIngredients
    }

    toggleMenu(type) {
        // check which menu is open
        const $options = document.querySelector(`.options[data-type="${type}"]`)
        if ($options) {
            const isOpen = $options.classList.contains("open")
            // close all menus
            document.querySelectorAll(".options")
                .forEach($element => this.closeMenu($element))
            // only toggle selected menu
            if (!isOpen) {
                $options && $options.classList.toggle("open")
            }
        }
    }

    closeMenu($menu) {
        $menu.classList.remove("open")
    }
    
    displayFilteredRecipes() {
        // empty recipes
        this._$recipesContainer.classList.remove("no-result")
        this._$recipesContainer.innerHTML = ""
        // apply tags
        let filteredRecipes = this._recipes
        this._activeTags.forEach(tag => {
            filteredRecipes = filteredRecipes.filter(data => {
                const recipe = new Recipe(data)
                return recipe.formattedIngredients.some(item => item.name === tag)
            })
        })
        // display recipes or error
        if (filteredRecipes.length > 0) {
            filteredRecipes.forEach(data => {
                const recipe = new Recipe(data)
                const $card = new RecipeTemplate(recipe).createRecipeCard()
                this._$recipesContainer.appendChild($card)
            })
        } else {
            this._$recipesContainer.innerHTML = `
                <p>Aucune recette ne contient les filtres sélectionnés.</p>
            `
            document.querySelector(".recipes").classList.add("no-result")
        }
        // update filtered recipes
        this._filteredRecipes = filteredRecipes
        // update number of recipes
        new FilterTemplate().displayNbRecipes(filteredRecipes.length)
    }

    filterByActiveTags(inputTag) {
        // if tag already exists
        if (this._activeTags.includes(inputTag)) { return }
        // if not, add to activeTags array
        this._activeTags.push(inputTag)
        // change choice color in list
        document.querySelector(`.filter-choice[value="${inputTag}"`).classList.add("active")
        // animation
        if (this._activeTags.length === 1) {
            this._$recipesContainer.classList.add("down")
        }
        // display tags
        const filterTemplate = new FilterTemplate()
        filterTemplate.createTag(inputTag)
        // update number of recipes
        filterTemplate.displayNbRecipes(this._filteredRecipes.length)
        // update recipes
        this.displayFilteredRecipes()
        // click to delete tag
        document.querySelectorAll(".tag").forEach($tag => {
            $tag.querySelector(".tag-close-icon").addEventListener("click", () => {
                const value = $tag.dataset.value
                $tag.classList.add("fading-out")
                setTimeout(() => {
                    $tag.remove()
                    this._activeTags = this._activeTags.filter(t => t !== value)
                    // animation
                    if (this._activeTags.length === 0) {
                        this._$recipesContainer.classList.remove("down")
                    }
                    setTimeout(() => {
                        this.displayFilteredRecipes()
                    }, 220)
                }, 200)
            })
        })
    }

    setupClickEvents() {
        // click on menu (open or close)
        document.querySelectorAll(".filter-title").forEach($title => {
            $title.addEventListener("click", () => {
                const type = $title.dataset.type
                this.toggleMenu(type)
            })
        })
        // click on choices
        document.querySelectorAll(".filter-choice").forEach($item => {
            $item.addEventListener("click", (e) => {
                this.filterByActiveTags(e.target.value)
                this.closeMenu(
                    $item.closest(".options")
                )
            })
        })
    }

    init() {
        this.setupClickEvents()
    }
}