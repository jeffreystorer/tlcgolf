import { teeArray } from "../data"

export default function getTeeValueFromTeeName(teeName) {
  let teeObj = teeArray.find((obj) => obj.tee === teeName)
  let teeValue = teeObj.value
  return teeValue
}
