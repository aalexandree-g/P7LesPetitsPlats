export default class Menu {

    constructor(type) {
        this._type = type
    }

    toggleMenu(type) {
        const $menu = document.querySelector(`.menu[data-type="${type}"]`)
        if (!$menu) return
        $menu.classList.toggle("open")
        if ($menu.classList.contains("open")) {
            $menu.querySelector("input").focus()
        }
    }

    closeMenu($menu) {
        $menu.classList.remove("open")
        this.resetInput($menu)
    }

    getSearchElements($menu) {
        return {
            $input: $menu.querySelector("input"),
            $icon: $menu.querySelector(".close-icon")
        }
    }

    initSearch($menu) {
        const { $input, $icon } = this.getSearchElements($menu)
        if (!$input) return
        // display search cross icon
        $input.addEventListener("input", () => {
            const value = $input.value
            if ($icon) $icon.classList.toggle("visible", value !== "")
            this.searchItems(value)
        })
        // reset input
        if ($icon) {
            $icon.addEventListener("click", () => {
                this.resetInput($menu)
                $input.focus()
            })
        }
    }

    searchItems(inputValue) {
        const normalized = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        const value = normalized(inputValue)
        document.querySelectorAll(`.filter-list[data-type="${this._type}"] .filter`).forEach($btn => {
            const text = normalized($btn.textContent)
            $btn.classList.toggle("hidden", !text.includes(value))
        })
    }

    resetInput($menu) {
        const { $input, $icon } = this.getSearchElements($menu)
        // reset input
        if ($input) $input.value = ""
        if ($icon) $icon.classList.remove("visible")
        // display all elements' menu
        document.querySelectorAll(`.filter-list[data-type="${this._type}"] .filter`).forEach($btn => {
            $btn.classList.remove("hidden")
        })
    }

    init() {
        document.querySelectorAll(".menu-title").forEach($title => {
            $title.addEventListener("click", () => {
                this.toggleMenu($title.dataset.type)
            })
        })
        document.querySelectorAll(".filter-search input").forEach($input => {
            const type = $input.closest(".filter-search").dataset.type
            if (!type) return
            $input.addEventListener("input", () => {
                this.searchItems(type, $input.value)
            })
        })
        document.querySelectorAll(".menu").forEach($menu => {
            this.initSearch($menu)
        })
    }
    
}