import shuffleArray from "../helpers/shuffleArray"
import { set } from "../helpers/localStorage"
export default function fetchMondaySchedules() {
  const sheetId = process.env.REACT_APP_GOOGLE_SHEETS_ID_MONDAY_SCHEDULES
  const apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY

  const sheetValues =
    "https://sheets.googleapis.com/v4/spreadsheets/" +
    sheetId +
    "/values/Sheet1" +
    "?key=" +
    apiKey

  var request = new XMLHttpRequest()
  request.open("GET", sheetValues, false) // `false` makes the request synchronous
  request.send(null)

  if (request.status === 200) {
    const data = JSON.parse(request.response)
    try {
      extractSchedules(data.values)
    } catch (error) {
      console.log("error: " + error)
    }
  } else {
    console.log("No Google Sheet")
  }
}

function extractSchedules(values) {
  let i
  let schedules = []
  for (i = 1; i < values.length; i++) {
    if (values[i] === []) {
      console.log("empty row: " + i)
      return
    }
    if (values[i][3] === "Y" || values[i][3] === "C") {
      schedules.push(values[i][0])
    }
  }
  shuffleArray(schedules)
  set("playersInLineup", schedules)
}
