import FiltersTemplate from "./FiltersTemplate.js"

export default class MenuTemplate {
    createMenu(type, label) {
        const $menu = document.createElement("div")
        $menu.classList.add("menu")
        $menu.dataset.type = type

        $menu.innerHTML = `
            <button class="menu-title" data-type="${type}" aria-haspopup="true">
                <span>${label}</span>
                <img class="chevron-icon" src="./assets/icon/chevron.png" alt="Ouvrir le menu">
            </button>
            <div class="menu-content">
                <div class="filter-search" data-type="${type}">
                    <input>
                    <div class="filter-search-icons">
                        <i class="fa-solid fa-xmark close-icon"></i>
                        <img src="./assets/icon/filters-search.png" class="search-icon" alt="Icône de recherche" aria-hidden="true">
                    </div>
                </div>
                <div class="filter-list" data-type="${type}"></div>
            </div>
        `
        return $menu
    }

    renderFilterLists(type, selectedList, remainingList) {
        const $filterList = document.querySelector(`.filter-list[data-type="${type}"]`)
        let $selected = document.querySelector(`.selected-list[data-type="${type}"]`)
        let $remaining = document.querySelector(`.remaining-list[data-type="${type}"]`)

        if (!$selected || !$remaining) {
            $selected = document.createElement("div")
            $selected.classList.add("selected-list", "hidden")
            $selected.dataset.type = type

            $remaining = document.createElement("div")
            $remaining.classList.add("remaining-list")
            $remaining.dataset.type = type

            $filterList.appendChild($selected)
            $filterList.appendChild($remaining)
        }

        $selected.innerHTML = ""
        $remaining.innerHTML = ""

        selectedList.forEach(element => {
            const $btn = new FiltersTemplate().createFilter(type, element)
            $btn.classList.add("selected")
            $selected.appendChild($btn)
        })

        remainingList.forEach(element => {
            const $btn = new FiltersTemplate().createFilter(type, element)
            $remaining.appendChild($btn)
        })
    }
}