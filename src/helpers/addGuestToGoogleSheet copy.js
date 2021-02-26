const SPREADSHEET_ID = process.env.REACT_APP_GOOGLE_SHEETS_ID
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY
const SCOPE = "https://www.googleapis.com/auth/spreadsheets"

function addGuestToGoogleSheet(ghinNumber, guest) {
  const params = {
    // The ID of the spreadsheet to update.
    spreadsheetId: SPREADSHEET_ID,
    // The A1 notation of a range to search for a logical table of data.Values will be appended after the last row of the table.
    range: ghinNumber, //this is the default spreadsheet name, so unless you've changed it, or are submitting to multiple sheets, you can leave this
    // How the input data should be interpreted.
    valueInputOption: "RAW", //RAW = if no conversion or formatting of submitted data is needed. Otherwise USER_ENTERED
    // How the input data should be inserted.
    insertDataOption: "INSERT_ROWS", //Choose OVERWRITE OR INSERT_ROWS
  }

  const valueRangeBody = {
    majorDimension: "ROWS", //log each entry as a new row (vs column)
    values: [guest], //convert the object's values to an array
  }

  const initClient = () => {
    window.gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPE,
        discoveryDocs: [
          "https://sheets.googleapis.com/$discovery/rest?version=v4",
        ],
      })
      .then(() => {
        window.gapi.auth2
          .getAuthInstance()
          .isSignedIn.listen(updateSignInStatus) //add a function called `updateSignInStatus` if you want to do something once a user is logged in with Google
          .updateSignInStatus(
            window.gapi.auth2.getAuthInstance().isSignedIn.get()
          )
      })
  }

  function updateSignInStatus() {
    console.log("user is signed in")
  }

  window.gapi.load("client:auth2", initClient)

  let request = window.gapi.client.sheets.spreadsheets.values.append(
    params,
    valueRangeBody
  )
  request.then(
    function (response) {
      // TODO: Insert desired response behaviour on submission
      console.log(response.result)
    },
    function (reason) {
      console.error("error: " + reason.result.error.message)
    }
  )
}
export default addGuestToGoogleSheet
