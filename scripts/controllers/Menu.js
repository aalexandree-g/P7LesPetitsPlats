export default class Menu {
    constructor() {}

    toggleMenu(type) {
        const $menu = document.querySelector(`.menu[data-type="${type}"]`)
        if (!$menu) return
        $menu.classList.toggle("open")
    }

    init() {
        document.querySelectorAll(".menu-title").forEach($title => {
            $title.addEventListener("click", () => {
                this.toggleMenu($title.dataset.type)
            })
        })
    }
}