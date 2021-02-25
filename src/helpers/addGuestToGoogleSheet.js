function addGuestToGoogleSheet(ghinNumber, guest) {
  const sheetId = process.env.REACT_APP_GOOGLE_SHEETS_ID
  const apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY

  let values = guest
  let range = ghinNumber + "!A1:A3"
  let body = {
    range: range,
    majorDimension: "ROWS",
    values: values,
  }
  let requestBody = JSON.stringify(body)
  alert(requestBody)

  const sheetValues =
    "https://sheets.googleapis.com/v4/spreadsheets/" +
    sheetId +
    "/values/" +
    range +
    ":append?valueInputOption=USER_ENTERED" /*  +
    "&key=" +
    apiKey */

  var request = new XMLHttpRequest()
  request.open("POST", sheetValues, false) // `false` makes the request synchronous
  request.send(requestBody)

  if (request.status === 200) {
    alert("guest added")
  } else {
    alert(request.status)
  }
}
export default addGuestToGoogleSheet
