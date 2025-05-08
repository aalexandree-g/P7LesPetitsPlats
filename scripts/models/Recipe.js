export default class Recipe {
    constructor(recipe) {
        this._id = recipe.id
        this._image = recipe.image
        this._name = recipe.name
        this._servings = recipe.servings
        this._ingredients = recipe.ingredients
        this._time = recipe.time
        this._description = recipe.description
        this._appliance = recipe.appliance
        this._ustensils = recipe.ustensils
    }

    get id() { return this._id }
    get image() { return this._image }
    get name() { return this._name }
    get servings() { return this._servings }
    get ingredients() { return this._ingredients }
    get time() { return this._time }
    get description() { return this._description }
    get appliance() { return this._appliance }
    get ustensils() { return this._ustensils }

    get formattedIngredients() {
        return this._ingredients.map(element => {
            // name's first letter in capital
            const lower = element.ingredient.toLowerCase()
            const finalName = lower.charAt(0).toUpperCase() + lower.slice(1)
                return {
                name : finalName,
                quantity : element.quantity ? `${element.quantity}` : "",
                unit : element.unit ? ` ${element.unit}` : ""
            }
        })
    }
}