export default class RecipeTemplate {
    constructor(recipe) {
        this._recipe = recipe
    }

    createRecipeCard() {

        // generate list of ingredients
        const ingredientsHTML = this._recipe.formattedIngredients.map(item => {
            return `
                <p class="ingredient-element">
                    <span class="ingredient-name">${item.name}</span>
                    <span class="ingredient-quantity">${item.quantity} ${item.unit}</span>
                </p>
            `
        }).join("")

        // generate card's structure
        const $card = document.createElement("article")
        $card.classList.add("recipe-card")
        $card.innerHTML = `
            <div class="photo-container">
                <img src="./assets/photos/${this._recipe.image}" alt="${this._recipe.name} photo">
                <span class="recipe-time">${this._recipe.time} min</span>
            </div>
            <div class="recipe-text">
                <h3>${this._recipe.name}</h3>
                <div class="recipe-how-to">
                    <h4>RECETTE</h4>
                    <p class="recipe-description">${this._recipe.description}</p>
                </div>
                <div class="recipe-ingredients">
                    <h4>INGRÉDIENTS</h4>
                    <div class="ingredients-container">
                        ${ingredientsHTML}
                    </div>
                </div>
            </div>
        `.trim()

        return $card

    }
}