export function capitalize(text) {
    if (!text) return ""
    return text.charAt(0).toUpperCase() + text.slice(1)
}

export function sortListAlphabetically($list) {
    const sorted = [...$list.children].sort((a, b) => a.textContent.localeCompare(b.textContent, "fr"))
    sorted.forEach(el => $list.appendChild(el))
}