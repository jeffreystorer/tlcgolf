export function get(item) {
    localStorage.getItem(item)
}

export function set(item, value) {
    localStorage.setItem(item,value)
}

export function jget(item) {
    JSON.parse(localStorage.getItem(item))
}

export function jset(item, value) {
    localStorage.setItem(item, JSON.stringify(value))
}


