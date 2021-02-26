import React from "react"

const SPREADSHEET_ID = process.env.REACT_APP_GOOGLE_SHEETS_ID
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
//const API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY
//const SCOPE = "https://www.googleapis.com/auth/spreadsheets"

function AddGuestToGoogleSheet(ghinNumber, guest) {
  function authenticate() {
    return window.gapi.auth2
      .getAuthInstance()
      .signIn({
        scope:
          "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets",
      })
      .then(
        function () {
          console.log("Sign-in successful")
        },
        function (err) {
          console.error("Error signing in", err)
        }
      )
  }
  function loadClient() {
    window.gapi.client.setApiKey("YOUR_API_KEY")
    return window.gapi.client
      .load("https://sheets.googleapis.com/$discovery/rest?version=v4")
      .then(
        function () {
          console.log("GAPI client loaded for API")
        },
        function (err) {
          console.error("Error loading GAPI client for API", err)
        }
      )
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return window.gapi.client.sheets.spreadsheets.values
      .append({
        spreadsheetId: SPREADSHEET_ID,
        range: ghinNumber + "!A1:A3",
        includeValuesInResponse: true,
        insertDataOption: "INSERT_ROWS",
        responseDateTimeRenderOption: "FORMATTED_STRING",
        responseValueRenderOption: "UNFORMATTED_VALUE",
        valueInputOption: "RAW",
        resource: {
          values: [guest],
        },
      })
      .then(
        function (response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response)
        },
        function (err) {
          console.error("Execute error", err)
        }
      )
  }
  window.gapi.load("client:auth2", function () {
    window.gapi.auth2.init({ client_id: CLIENT_ID })
  })

  return (
    <>
      <button onclick={authenticate().then(loadClient)}>
        authorize and load
      </button>
      <button onclick={execute()}>execute</button>
    </>
  )
}
export default AddGuestToGoogleSheet
