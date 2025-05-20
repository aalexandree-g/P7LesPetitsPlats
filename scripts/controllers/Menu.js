export default class Menu {

    constructor() {
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
        const type = $menu.dataset.type
        $menu.classList.remove("open")
        this.resetInput(type, $menu)
    }

    getSearchElements($menu) {
        return {
            $input: $menu.querySelector("input"),
            $icon: $menu.querySelector(".close-icon")
        }
    }

    initSearch($menu) {
        const type = $menu.dataset.type
        const { $input, $icon } = this.getSearchElements($menu)
        if (!$input) return
        // display search cross icon
        $input.addEventListener("input", () => {
            const value = $input.value
            if ($icon) $icon.classList.toggle("visible", value !== "")
            this.searchItems(type, value)
        })
        // reset input
        if ($icon) {
            $icon.addEventListener("click", () => {
                this.resetInput(type, $menu)
                $input.focus()
            })
        }
    }

    searchItems(type, inputValue) {
        const normalized = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        const value = normalized(inputValue)
        document.querySelectorAll(`.filter-list[data-type="${type}"] .filter`).forEach($btn => {
            const text = normalized($btn.textContent)
            $btn.classList.toggle("hidden", !text.includes(value))
        })
    }

    resetInput(type, $menu) {
        const { $input, $icon } = this.getSearchElements($menu)
        // reset input
        if ($input) $input.value = ""
        if ($icon) $icon.classList.remove("visible")
        // display all elements' menu
        document.querySelectorAll(`.filter-list[data-type="${type}"] .filter`).forEach($btn => {
            $btn.classList.remove("hidden")
        })
    }

    init() {
        document.querySelectorAll(".menu-title").forEach($title => {
            $title.addEventListener("click", () => {
                const clickedType = $title.dataset.type
                // close other menus
                document.querySelectorAll(".menu").forEach($menu => {
                    if ($menu.dataset.type !== clickedType) this.closeMenu($menu)
                })
                this.toggleMenu(clickedType)
            })
        })
        document.querySelectorAll(".menu").forEach($menu => {
            this.initSearch($menu)
        })
    }
    
}