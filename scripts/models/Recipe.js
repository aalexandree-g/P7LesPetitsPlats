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
    get servings() { return this._servings }
    get time() { return this._time }
    get description() { return this._description }

    get name() {
        return this._name.toLowerCase()
    }

    get ingredients() {
        return this._ingredients.map(element => {
            return {
                ingredient: element.ingredient.toLowerCase(),
                quantity: element.quantity ? `${element.quantity}` : "",
                unit: element.unit ? ` ${element.unit}` : ""
            }
        })
    }

    get appliance() {
        return this._appliance.toLowerCase()
    }

    get ustensils() {
        return this._ustensils.map(element => {
            return element.toLowerCase()
        })
    }
    
}