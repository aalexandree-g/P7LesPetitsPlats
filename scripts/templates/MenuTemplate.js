import { capitalize } from "../utils/stringUtils.js"
import { sortListAlphabetically } from "../utils/stringUtils.js"

export default class MenuTemplate {

    createFilterLists(type, uniqueElements, activeFilters = []) {
        const $container = document.querySelector(`.filter-list[data-type="${type}"]`)
        if (!$container) return
        $container.innerHTML = ""
        const $selected = document.createElement("div")
        const $remaining = document.createElement("div")
        $selected.classList.add("selected-list")
        $remaining.classList.add("remaining-list")
        $selected.dataset.type = type
        $remaining.dataset.type = type
        uniqueElements.forEach(item => {
            const $btn = document.createElement("button")
            $btn.classList.add("filter")
            $btn.value = item
            $btn.textContent = capitalize(item)

            if (activeFilters.includes(item)) {
                $btn.classList.add("selected")
                $selected.appendChild($btn)
            } else {
                $remaining.appendChild($btn)
            }
        })
        $container.appendChild($selected)
        $container.appendChild($remaining)
    }

}