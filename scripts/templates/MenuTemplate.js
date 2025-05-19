export default class MenuTemplate {

    createFilterList(type, allElements, activeFilters = []) {
        // remove duplicates and sort alphabetically
        const uniqueElements = [...new Set(allElements)].sort((a, b) => a.localeCompare(b))
        const $list = document.querySelector(`.filter-list[data-type="${type}"]`)
        uniqueElements
            .map(element => {
                const $btn = document.createElement("button")
                $btn.classList.add("filter")
                if (activeFilters.includes(element)) {
                    $btn.classList.add("selected")
                }
                $btn.dataset.type = type
                $btn.value = element
                $btn.textContent = element
                $list.appendChild($btn)
            })
        return $list
    }


}