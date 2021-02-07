import { get } from "./localStorage"
import {
  fetchRoster,
  aFirstName,
  anIndex,
  aGender,
} from "../functions/fetchRoster"

export default function fetchIndividualGHIN(dataMode) {
  const ghinNumber = get("ghinNumber")
  if (dataMode === "ghin") {
    const lastName = get("lastName")
    const ghinRequest =
      "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" +
      ghinNumber +
      "&lastName=" +
      lastName +
      "&incllsudeLowHandicapIndex=true"

    var request = new XMLHttpRequest()
    request.open("GET", ghinRequest, false) // `false` makes the request synchronous
    request.send(null)

    if (request.status === 200) {
      const data = JSON.parse(request.response)
      try {
        let index = data.golfers[0].Value
        let gender = data.golfers[0].Gender
        let firstName = data.golfers[0].FirstName
        let rawName = firstName.toLowerCase()
        firstName = capitalize(rawName)
        if (firstName.indexOf(".") > 0) firstName = firstName.toUpperCase()
        let golfer =
          firstName + " " + get("lastName") + " (" + data.golfers[0].Value + ")"
        return [index, gender, golfer]
      } catch (error) {}
    }
  } else {
    fetchRoster()
    let roster = get("roster")
    try {
      let index = anIndex(roster, ghinNumber)
      let gender = aGender(roster, ghinNumber)
      let firstName = aFirstName(roster, ghinNumber)
      let rawName = firstName.toLowerCase()
      firstName = capitalize(rawName)
      if (firstName.indexOf(".") > 0) firstName = firstName.toUpperCase()
      let golfer =
        firstName +
        " " +
        get("lastName") +
        " (" +
        anIndex(roster, ghinNumber) +
        ")"
      return [index, gender, golfer]
    } catch (error) {}
  }
}

const capitalize = (s) => {
  if (typeof s !== "string") return ""
  return s.charAt(0).toUpperCase() + s.slice(1)
}
