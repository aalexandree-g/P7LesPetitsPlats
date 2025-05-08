import Recipe from "../models/Recipe.js"
import FilterTemplate from "../templates/FilterTemplate.js"
import RecipeTemplate from "../templates/RecipeTemplate.js"

export default class Filter {
    constructor(recipes, allIngredients) {
        this._recipes = recipes
        this._allIngredients = allIngredients

        this.$ingredientsfilterTitle = document.querySelector(".filter-title.ingredients")
        this.$ingredientsfilterSearch = document.querySelector(".filter-search.ingredients")
        this.$ingredientsfilterChoices = document.querySelector(".filter-choices.ingredients")
    }

    toggleMenu() {
        this.$ingredientsfilterTitle.classList.toggle("open")
        this.$ingredientsfilterSearch.classList.toggle("open")
        this.$ingredientsfilterChoices.classList.toggle("open")
    }

    filterRecipesByIngredient(ingredient) {
        // empty recipes
        const $recipesContainer = document.querySelector(".recipes");
        $recipesContainer.innerHTML = ""
        // Parcourir les recettes et filtrer celles qui contiennent l’ingrédient
        this._recipes.forEach(recipeData => {
            const recipe = new Recipe(recipeData)
            if (recipe.formattedIngredients.some(item => item.name.includes(ingredient))) {
                const $card = new RecipeTemplate(recipe).createRecipeCard()
                $recipesContainer.appendChild($card)
            }
        })
    }

    setupClickEvents() {
        // click on menu (open or close)
        this.$ingredientsfilterTitle.addEventListener("click", () => {
            this.toggleMenu()
        })

        // click on choices
        document.querySelectorAll(".filter-choice").forEach($item => {
            $item.addEventListener("click", (e) => {
                this.filterRecipesByIngredient(e.target.value)
                this.toggleMenu()
                new FilterTemplate().createTag(e.target.value)
                document.querySelector(".tag-list").classList.add("visible")
            })
        })

    }

    init() {
        this.setupClickEvents()
    }
}