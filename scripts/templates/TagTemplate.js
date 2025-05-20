import { capitalize } from "../utils/stringUtils.js"

export default class TagTemplate {

    constructor() {
        this.$recipesContainer = document.querySelector(".recipes")
    }

    createTag(label) {
        const $tag = document.createElement("div")
        $tag.classList.add("tag")
        $tag.dataset.value = label

        const $span = document.createElement("span")
        $span.textContent = capitalize(label)

        const $icon = document.createElement("i")
        $icon.classList.add("fa-solid", "fa-xmark", "tag-close-icon")

        $tag.appendChild($span)
        $tag.appendChild($icon)

        return $tag
    }

    fadeInAnimation($tag) {
        const $tagList = document.querySelectorAll(".tag")
        if ($tagList.length === 1) {
            this.$recipesContainer.classList.add("down")
        }
        setTimeout(() => {
            $tag.classList.add("showing", "visible")
            setTimeout(() => $tag.classList.remove("showing"), 150)
        }, 150)
    }
    
    fadeOutAnimation($tag) {
        $tag.classList.add("hidding")
        setTimeout(() => {
            $tag.remove()
            const $tagList = document.querySelectorAll(".tag")
            if ($tagList.length === 0) {
                this.$recipesContainer.classList.remove("down")
            }
        }, 150)
    }

}