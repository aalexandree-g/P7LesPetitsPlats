import { recipes } from "./data/recipes.js"
import { state } from "./utils/state.js"
import { applyCombinedFiltering } from "./utils/applyCombinedFiltering.js"
import Recipe from "./models/Recipe.js"
import Search from "./controllers/Search.js"
import Filters from "./controllers/Filters.js"

state.allRecipes = recipes.map(data => new Recipe(data))
state.filteredByTags = [...state.allRecipes]

new Search().init()
new Filters().init()

applyCombinedFiltering()