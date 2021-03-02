import React from "react"

const SPREADSHEET_ID = process.env.REACT_APP_GOOGLE_SHEETS_ID
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY
const SCOPE = "https://www.googleapis.com/auth/spreadsheets"
/*global gapi*/

export default function AddGuestToGoogleSheet(ghinNumber, guest) {
  function authenticate() {
    return gapi.auth2
      .getAuthInstance()
      .signIn({
        scope: SCOPE,
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
    gapi.client.setApiKey(API_KEY)
    return gapi.client
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
    return gapi.client.sheets.spreadsheets.values
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
  gapi.load("client:auth2", function () {
    gapi.auth2.init({
      client_id: CLIENT_ID,
    })
  })
  return (
    <>
      <div className="div--center">
        <button className="button" onClick={authenticate().then(loadClient)}>
          Authorize and Load
        </button>

        <button className="button" onClick={execute}>
          Add Guest
        </button>
      </div>
    </>
  )
}
