export default class Menu {

    toggleMenu(type) {
        const $menu = document.querySelector(`.menu[data-type="${type}"]`)
        if (!$menu) return
        $menu.classList.toggle("open")
    }

    closeMenu($menu) {
        $menu.classList.remove("open")
        this.resetInput($menu)
    }

    searchItems(type, inputValue) {
        const normalized = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        const value = normalized(inputValue)
        document.querySelectorAll(`.filter-list[data-type="${type}"] .filter`).forEach($btn => {
            const text = normalized($btn.textContent)
            $btn.classList.toggle("hidden", !text.includes(value))
        })
    }

    resetInput($menu) {
        const $input = $menu.querySelector("input")
        const $icon = $menu.querySelector(".close-icon")
        const type = $menu.dataset.type
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
    }
    
}