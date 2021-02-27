import React, { useState, useEffect } from "react"
import { gapi, loadAuth2 } from "gapi-script"

const SPREADSHEET_ID = process.env.REACT_APP_GOOGLE_SHEETS_ID
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY
const SCOPE = "https://www.googleapis.com/auth/spreadsheets"

function AddGuestToGoogleSheet(ghinNumber, guest) {
  useEffect(() => {
    const auth2 = async () => {
      const authTwo = await loadAuth2(process.env.REACT_APP_CLIENT_ID, "")
      console.log("😊😊 auth2", auth2)
      return authTwo
    }
    auth2
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
  }, [])

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
    gapi.auth2.init({ client_id: CLIENT_ID })
  })

  return (
    <>
      <button className="button" onClick={loadClient}>
        Load Client
      </button>
      <button className="button" onClick={execute}>
        Save Guest to Google Sheet
      </button>
    </>
  )
}
export default AddGuestToGoogleSheet
