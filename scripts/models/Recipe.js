const rules = [
    { keywords: ["banane"], result: "Banane" },
    { keywords: ["beurre"], result: "Beurre"},
    { keywords: ["chocolat"], result: "Chocolat"},
    { keywords: ["coulis", "tomate"], result: "Coulis de tomate"},
    { keywords: ["viande", "hachée"], result: "Viande hachée"},
    { keywords: ["laitue"], result: "Salade"},
    { keywords: ["salade"], result: "Salade"},
    { keywords: ["huile", "olive"], result: "Huile d'olive"},
    { keywords: ["gruyère"], result: "Gruyère"},
    { keywords: ["jambon"], result: "Jambon"},
    { keywords: ["kiwi"], result: "Kiwi"},
    { keywords: ["dijon"], result: "Moutarde de Dijon"},
    { keywords: ["oeuf"], result: "Oeuf"},
    { keywords: ["pomme", "terre"], result: "Pomme de terre"},
    { keywords: ["pomme"], result: "Pomme"},
    { keywords: ["sucre", "poudre"], result: "Sucre"},
    { keywords: ["sucre", "roux"], result: "Sucre"},
    { keywords: ["tomate", "pelées"], result: "Tomate"},
    { keywords: ["balsamic"], result: "Vinaigre balsamique"}
]

function normalizeIngredient(name) {
    const lowerName = name.toLowerCase()
    for (const rule of rules) {
        const allKeywordsPresent = rule.keywords.every(keyword => lowerName.includes(keyword))
        if (allKeywordsPresent) {
            return rule.result
        }
    }
    return lowerName.charAt(0).toUpperCase() + lowerName.slice(1)
}

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
        return this._ingredients.map(element => ({
            name : element.ingredient,
            quantity : element.quantity ? `${element.quantity}` : "",
            unit : element.unit ? ` ${element.unit}` : ""
        }))
    }

    get normalizedIngredients() {
        return this._ingredients.map(item => ({
            ...item,
            normalizedName: normalizeIngredient(item.ingredient)
        }))
    }
}