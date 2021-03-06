import React, { useEffect } from "react"
import "../styles/App.css"
import setSheetURL from "../helpers/setSheetURL"
import { get, set } from "../helpers/localStorage"
import Header from "./Header"
import setIsLoggedIn from "../helpers/setIsLoggedIn"
import fetchPlayersAndGames from "../helpers/fetchPlayersAndGames"
import preval from "preval.macro"

function LoginPage() {
  const build =
    "Build: " + preval`module.exports = new Date().toLocaleString();`

  //const [dataModeGHIN, setDataModeGHIN] = useState(true)

  let ghinNumber, lastName, showTips, showLocalNumbers
  ghinNumber = get("ghinNumber") ? get("ghinNumber") : ""
  lastName = get("lastName") ? get("lastName") : ""
  showTips = get("showTips")
  showLocalNumbers = get("showLocalNumbers")
  let teesSelected = get("teesSelected")

  useEffect(() => {
    set("isLoggedIn", "false")
  }, [])

  useEffect(() => {
    set("ghinNumber", ghinNumber)
  }, [ghinNumber])

  useEffect(() => {
    set("lastName", capitalize(lastName))
  }, [lastName])

  useEffect(() => {
    set("showTips", showTips)
  }, [showTips])

  useEffect(() => {
    set("showLocalNumbers", showLocalNumbers)
  }, [showLocalNumbers])

  function handleClick(e) {
    set("ghinNumber", ghinNumber)
    set("lastName", capitalize(lastName))
    set("showTips", showTips)
    set("showLocalNumbers", showLocalNumbers)
    set("teesSelected", teesSelected)
    set("dataMode", "ghin")
    set("currentLineupIndex", -1)
    setIsLoggedIn(ghinNumber, lastName)
    setSheetURL()
    if (get("isLoggedIn") === "true") {
      fetchPlayersAndGames()
    }
    document.location = "/settings/selecttees"
  }

  function clearLoginCredentials() {
    localStorage.clear()
  }

  const capitalize = (s) => {
    if (typeof s !== "string") return ""
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  /* function handleDataModeChange() {
    setDataModeGHIN((prevState) => !prevState)
    if (dataModeGHIN === false) {
      set("dataMode", "ghin")
    } else {
      set("dataMode", "roster")
    }
  } */

  return (
    <>
      <Header />
      <div className="div--center">
        <br />
        <br />
        <label htmlFor="ghinnumber">GHIN Number:&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input
          className="input"
          type="text"
          id="ghinnumber"
          defaultValue={ghinNumber}
          onFocus={(event) => (event.target.value = get("ghinNumber"))}
          onBlur={(event) => (ghinNumber = event.target.value)}
        />

        <br></br>
        <br></br>

        <label htmlFor="lastName">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last Name:&nbsp;&nbsp;&nbsp;&nbsp;
        </label>
        <input
          className="input"
          type="text"
          id="lastName"
          defaultValue={lastName}
          onFocus={(event) => (event.target.value = get("lastName"))}
          onBlur={(event) => (lastName = event.target.value)}
        />

        <br />
        <br />

        {/*  <input
          className="checkbox"
          type="checkbox"
          id="dataModeGHIN"
          onChange={handleDataModeChange}
          defaultChecked
        />
        <label htmlFor="dataModeGHIN">Fetch Data from GHIN</label>

        <br />
        <br /> */}

        <button className="button" onClick={handleClick}>
          Log In
        </button>

        <footer className="footer--center">
          {build}
          <br />
          <br />
          <form onSubmit={clearLoginCredentials}>
            <input
              type="submit"
              className="button"
              value="Clear Login Credentials"
            />
          </form>
        </footer>
      </div>
    </>
  )
}

export default LoginPage
