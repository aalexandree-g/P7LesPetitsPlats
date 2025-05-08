export default class FilterTemplate {
    constructor() {

    }

    createFilterList(allElements) {
        // remove duplicates and sort alphabetically
        const elements = [...new Set(allElements)].sort((a, b) => a.localeCompare(b))
        // display list of elements
        const elementsHTML = elements.map(item => `<button class="filter-choice" value="${item}">${item}</button>`).join("")
        document.querySelector(".filter-choices").innerHTML = elementsHTML
    }

    createTag(tag) {
        const $tag = document.createElement("div")
        $tag.classList.add("tag")
        $tag.innerHTML = `<span>${tag}</span>`

        const $icon = document.createElement("i")
        $icon.classList.add("fa-solid", "fa-xmark", "tag-close-icon")
        $tag.appendChild($icon)

        document.querySelector(".tag-list").appendChild($tag)
    }
}