export default class Filter {
    constructor() {
        this.$ingredientsTitle = document.querySelector(".ingredients-title")
        this.$ingredientsSearch = document.querySelector(".ingredients-search")
        this.$choices = document.querySelector(".choices")

        this.$appliancesTitle = document.querySelector(".appliances-title")
        this.$appliancesSearch = document.querySelector(".appliances-search")
        this.$appliances = document.querySelector(".appliances")
    }

    openMenu() {
        this.$ingredientsTitle.addEventListener("click", () => {
            this.$ingredientsSearch.classList.toggle("open")
            this.$choices.classList.toggle("open")
        })

        this.$appliancesTitle.addEventListener("click", () => {
            this.$appliancesSearch.classList.toggle("open")
            this.$appliances.classList.toggle("open")
        })
    }
}