import { state } from "../utils/state.js"
import { normalize } from "../utils/stringUtils.js"

export default class Search {
    constructor(filters) {
        this._filters = filters
    }

    searchItems(type, inputValue) {
        const value = normalize(inputValue)

        document.querySelectorAll(`.filter-list[data-type="${type}"] .filter`).forEach($btn => {
            const text = normalize($btn.textContent)
            $btn.classList.toggle("hidden", !text.includes(value))
        })
    }

    resetInput(type) {
        const $menu = document.querySelector(`.menu[data-type="${type}"]`)
        const $input = $menu?.querySelector("input")
        const $closeIcon = $menu?.querySelector(".close-icon")

        // reset input
        if ($input) $input.value = ""
        if ($closeIcon) $closeIcon.classList.remove("visible")

        // display all elements' menu
        document.querySelectorAll(`.filter-list[data-type="${type}"] .filter`).forEach($btn => {
            $btn.classList.remove("hidden")
        })
    }

    initMainSearch() {
        const $input = document.getElementById("main-search")
        const $closeIcon = document.querySelector(".search-bar-icons .close-icon")

        // display search and cross icon
        $input.addEventListener("input", (e) => {
            state.searchQuery = normalize(e.target.value)
            if ($closeIcon) $closeIcon.classList.toggle("visible", state.searchQuery !== "")
            // at least 3 characters
            if (state.searchQuery.length >= 3 || state.searchQuery.length === 0) {
                const filteredRecipes = this._filters.updateDisplay()
                this._filters.updateMenusAndTags(filteredRecipes)
            }
        })

        // reset input
        if ($closeIcon) {
            $closeIcon.addEventListener("click", () => {
                if ($input) $input.value = ""
                if ($closeIcon) $closeIcon.classList.remove("visible")
                state.searchQuery = ""
                const filteredRecipes = this._filters.updateDisplay()
                this._filters.updateMenusAndTags(filteredRecipes)
                $input.focus()
            })
        }
    }

    initMenuSearch() {
        document.querySelectorAll(".menu").forEach($menu => {
            const type = $menu.dataset.type
            const $input = $menu.querySelector("input")
            const $closeIcon = $menu.querySelector(".close-icon")

            if (!$input) return

            // display search and cross icon
            $input.addEventListener("input", () => {
                const value = $input.value
                if ($closeIcon) $closeIcon.classList.toggle("visible", value !== "")
                this.searchItems(type, value)
            })

            // reset input
            if ($closeIcon) {
                $closeIcon.addEventListener("click", () => {
                    this.resetInput(type)
                    $input.focus()
                })
            }
        })   
    }

    init() {
        this.initMainSearch()
        this.initMenuSearch()
    }
}