import { state } from "../utils/state.js"
import { applyCombinedFiltering } from "../utils/applyCombinedFiltering.js"

export default class Search {

    init() {

        const $input = document.getElementById("main-search")
        const $closeIcon = document.querySelector(".search-bar-icons .close-icon")
        
        // display search and cross icon
        $input.addEventListener("input", (e) => {
            
            state.searchQuery = e.target.value.trim().toLowerCase()
            if ($closeIcon) $closeIcon.classList.toggle("visible", state.searchQuery !== "")
            // at least 3 characters
            if (state.searchQuery.length >= 3 || state.searchQuery.length === 0) {
                applyCombinedFiltering()
            }
        })

        // reset input
        if ($closeIcon) {
            $closeIcon.addEventListener("click", () => {
                if ($input) $input.value = ""
                if ($closeIcon) $closeIcon.classList.remove("visible")
                state.searchQuery = ""
                applyCombinedFiltering()
                $input.focus()
            })
        }

    }

}