import { useEffect, useState } from "react"

function getSavedValue(key, initialValue) {
    const savedValue = JSON.parse(localStorage.getItem(key))
    if (savedValue) return savedValue
    return initialValue
}
export const useLocalStorageForTheme = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue)
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    })
    return [value, setValue]
}
