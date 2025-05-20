import FiltersTemplate from "./FiltersTemplate.js"

export default class MenuTemplate {

    createFilterLists(type, uniqueElements, activeFilters = []) {
        const $container = document.querySelector(`.filter-list[data-type="${type}"]`)
        if (!$container) return
        $container.innerHTML = ""
        const $selected = document.createElement("div")
        const $remaining = document.createElement("div")
        $selected.classList.add("selected-list", "hidden")
        $remaining.classList.add("remaining-list")
        $selected.dataset.type = type
        $remaining.dataset.type = type
        uniqueElements.forEach(item => {
            const $filter = new FiltersTemplate().createFilter(type, item)
            if (activeFilters.includes(item)) {
                $filter.classList.add("selected")
                $selected.appendChild($filter)
            } else {
                $remaining.appendChild($filter)
            }
        })
        $container.appendChild($selected)
        $container.appendChild($remaining)
    }

}