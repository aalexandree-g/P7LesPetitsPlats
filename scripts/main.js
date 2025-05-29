import { recipes } from "./data/recipes.js"
import { state } from "./utils/state.js"

import Recipe from "./models/Recipe.js"
import Search from "./controllers/Search.js"
import Filters from "./controllers/Filters.js"
import Menu from "./controllers/Menu.js"

function initApp() {

    console.log("NATIVE LOOPS VERSION")

    state.allRecipes = recipes.map(data => new Recipe(data))
    state.filteredByTags = [...state.allRecipes]

    new Menu().init()

    const filters = new Filters()
    filters.init()
    
    const search = new Search(filters)
    search.init()
}

initApp()