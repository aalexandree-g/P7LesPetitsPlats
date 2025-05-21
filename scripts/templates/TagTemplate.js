import { capitalize } from "../utils/stringUtils.js"
import Tag from "../controllers/Tag.js"

export default class TagTemplate {

    constructor() {
        this.$recipesContainer = document.querySelector(".recipes")
    }

    createTag(type, label) {
        const $tag = document.createElement("div")
        $tag.classList.add("tag")
        $tag.dataset.value = label
        $tag.dataset.type = type

        const $span = document.createElement("span")
        $span.textContent = capitalize(label)

        const $icon = document.createElement("i")
        $icon.classList.add("fa-solid", "fa-xmark", "tag-close-icon")

        $tag.appendChild($span)
        $tag.appendChild($icon)

        return $tag
    }

    renderTags(allActiveFilters) {
        const $tagList = document.querySelector(".tag-list")
        const $recipes = document.querySelector(".recipes")
        
        $tagList.innerHTML = ""

        if (allActiveFilters.length > 0) {
            $recipes.classList.add("down")
        } else {
            $recipes.classList.remove("down")
        }

        allActiveFilters.forEach(({ type, label }) => {
        const $tag = this.createTag(type, label)
            $tagList.appendChild($tag)
            setTimeout(() => {
                $tag.classList.add("visible")
            }, 150)
        })
    }

}