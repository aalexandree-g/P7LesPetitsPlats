import { capitalize } from "../utils/stringUtils.js"
import TagTemplate from "../templates/TagTemplate.js"

export default class Tag {
    constructor(label) {
        this._label = label
    }

    render() {
        const $template = new TagTemplate()
        const $tag = $template.createTag(capitalize(this._label))
        document.querySelector(".tag-list").appendChild($tag)
        $template.fadeInAnimation($tag)
        return $tag
    }

}