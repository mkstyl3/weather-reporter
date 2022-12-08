export const getItemFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const getCityIndex = (lat, long) => {
    return btoa(`${lat}, ${long}`)
}

export const setItemFromLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

