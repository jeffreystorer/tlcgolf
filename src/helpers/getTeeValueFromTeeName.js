import { teeArray } from "../data"

export default function getTeeValueFromTeeName(teeName) {
  let teeObject = teeArray.filter((obj) => {
    return (obj.tee = teeName)
  })
  let teeValue = teeObject.value
  return teeValue
}
