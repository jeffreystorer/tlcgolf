import { useState, useEffect } from "react"

export const get = (item) => {
  try {
    const storedItem = localStorage.getItem(item)
    if (storedItem === null) {
      return undefined
    }
    return JSON.parse(storedItem)
  } catch (err) {
    return undefined
  }
}

export const set = (item, value) => {
  try {
    const valueToBeStored = JSON.stringify(value)
    localStorage.setItem(item, valueToBeStored)
  } catch (err) {
    console.log(" error: " + err + " storing item: " + item)
  }
}

export const remove = (item) => {
  try {
    localStorage.removeItem(item)
  } catch (err) {
    console.log(" error: " + err + " removing item: " + item)
  }
}

export const useStateWithLocalStorage = (localStorageKey) => {
  const [value, setValue] = useState(get(localStorageKey) || "")

  useEffect(() => {
    set(localStorageKey, value)
  }, [value, localStorageKey])

  return [value, setValue]
}

export const pushKey = (key) => {
  try {
    let keys = get("keys")
    if (!keys) keys = []
    keys.push(key)
    set("keys", keys)
  } catch (error) {
    console.log("error: " + error + " pushing key: " + key)
  }
}

export const popKey = () => {
  try {
    let keys = get("keys")
    if (!keys || keys.length === 0) {
      return "empty"
    } else {
      let lastKey = keys.pop()
      set("keys", keys)
      return lastKey
    }
  } catch (error) {
    console.log("error: " + error + " popping key")
  }
}
