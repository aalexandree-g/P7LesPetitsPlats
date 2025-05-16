export default class FiltersTemplate {
    constructor() {}

    createFilter(type, item, selected = false) {
        const $filter = document.createElement("button")
        $filter.classList.add("filter")
        if (selected) $filter.classList.add("selected")
        $filter.dataset.type = type
        $filter.value = item
        $filter.textContent = item
        return $filter
    }

    createTag(tag) {
        const $tag = document.createElement("div")
        $tag.classList.add("tag")
        $tag.dataset.value = tag
        const html = `
            <span>${tag}</span>
            <i class="fa-solid fa-xmark tag-close-icon"></i>
        `.trim()
        $tag.innerHTML = html
        return $tag
    }
}