import FiltersTemplate from "./FiltersTemplate.js"

export default class MenuTemplate {

    constructor(type) {
        this._type = type
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