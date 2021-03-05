import React, { useState, useEffect } from "react"
import { get } from "../helpers/localStorage"

const SPREADSHEET_ID = process.env.REACT_APP_GOOGLE_SHEETS_ID
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY
const SCOPE = "https://www.googleapis.com/auth/spreadsheets"

export default function AddGuestToGoogleSheet() {
  const [state, setState] = useState({ gapi: null })
  let ghinNumber = get("ghinNumber")
  let guests = get("guests")

  useEffect(() => {
    require("google-client-api")().then((gapi) => {
      setState({ gapi: gapi })
    })
  }, [state.gapi])

  function handleSignInClick() {
    if (state.gapi !== null) {
      authenticate()
    }
  }

  function handleSaveClick() {
    if (state.gapi !== null) {
      loadClient().then(execute)
    }
  }

  function authenticate() {
    return state.gapi.auth2
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
    state.gapi.client.setApiKey(API_KEY)
    return state.gapi.client
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
    let request = state.gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: ghinNumber + "!A1:A3",
      includeValuesInResponse: true,
      insertDataOption: "INSERT_ROWS",
      responseDateTimeRenderOption: "FORMATTED_STRING",
      responseValueRenderOption: "UNFORMATTED_VALUE",
      valueInputOption: "RAW",
      resource: {
        values: guests,
      },
    })
    return request.then(
      function (response) {
        localStorage.removeItem("guests")
        document.location = "/settings/logout"
      },
      function (err) {
        console.error("Execute error", err)
      }
    )
  }

  if (state.gapi !== null) {
    state.gapi.load("client:auth2", function () {
      state.gapi.auth2.init({
        client_id: CLIENT_ID,
      })
    })
  }

  return (
    <>
      <div>
        <br />
        <button className="button" onClick={handleSignInClick}>
          Sign In
        </button>
        <span className="span_then--bold"> then </span>
        <button className="button" onClick={handleSaveClick}>
          Save
        </button>
        <br />
        <br />
      </div>
    </>
  )
}
