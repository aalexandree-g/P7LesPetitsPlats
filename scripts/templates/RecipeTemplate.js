export default class RecipeTemplate {
    constructor(recipe) {
        this._recipe = recipe
    }

    createRecipeCard() {

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

                    </div>
                </div>
            </div>
        `.trim()
        return $card
    }

    addIngredients() {
        this._recipe.ingredients.map(element => {
            const ingredient = element.ingredient;
            const quantity = element.quantity ? `${element.quantity}` : ""
            const unit = element.unit ? ` ${element.unit}` : ""
            const $ingredients = document.createElement("p")
            $ingredients.classList.add("ingredient-element")
            $ingredients.innerHTML = `
                <span class="ingredient-name">${ingredient}</span>
                <span class="ingredient-quantity">${quantity} ${unit}</span>
            `.trim()
            document.querySelector(".ingredients-container").appendChild($ingredients)
        })
    }
}