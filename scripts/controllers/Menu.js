import MenuTemplate from "../templates/MenuTemplate.js"

export default class Menu {
    constructor() {
        this._types = [
            { type: "ingredients", label: "Ingrédients" },
            { type: "appliance", label: "Appareils" },
            { type: "ustensils", label: "Ustensiles" }
        ]
        this.$container = document.getElementById("menus-container")
        this._template = new MenuTemplate()
    }

    generateMenus() {
        this._types.forEach(({ type, label }) => {
            const $menu = this._template.createMenu(type, label)
            this.$container.appendChild($menu)
        })
    }

    toggleMenu(type) {
        const $menu = document.querySelector(`.menu[data-type="${type}"]`)

        if (!$menu) return
        
        $menu.classList.toggle("open")
        if ($menu.classList.contains("open")) {
            $menu.querySelector("input")?.focus()
        }
    }

    closeMenu($menu) {
        if (!$menu) return

        const $input = $menu.querySelector("input")
        const $closeIcon = $menu.querySelector(".close-icon")
        const type = $menu.dataset.type

        $menu.classList.remove("open")

        // reset input
        if ($input) $input.value = ""
        if ($closeIcon) $closeIcon.classList.remove("visible")

        // display all elements' menu
        document.querySelectorAll(`.filter-list[data-type="${type}"] .filter`).forEach($btn => {
            $btn.classList.remove("hidden")
        })
    }

    init() {
        this.generateMenus()

        document.querySelectorAll(".menu-title").forEach($title => {
            $title.addEventListener("click", () => {
                const type = $title.dataset.type

                // close other menus
                document.querySelectorAll(".menu").forEach($menu => {
                    if ($menu.dataset.type !== type) this.closeMenu($menu)
                })

                this.toggleMenu(type)
            })
        })
    }
    
}