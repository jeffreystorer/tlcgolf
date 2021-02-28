import { get } from "./localStorage"

const SPREADSHEET_ID = process.env.REACT_APP_GOOGLE_SHEETS_ID
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN

function addGuestToGoogleSheet() {
  let ghinNumber = get("ghinNumber")
  let guest = get("guest")

  const appendRow = () => {
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${ghinNumber}!A1%3AA3:append?includeValuesInResponse=true&insertDataOption=INSERT_ROWS&responseDateTimeRenderOption=FORMATTED_STRING&responseValueRenderOption=UNFORMATTED_VALUE&valueInputOption=RAW`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          values: [guest],
        }),
      }
    )
  }
  appendRow()
}

export default addGuestToGoogleSheet
