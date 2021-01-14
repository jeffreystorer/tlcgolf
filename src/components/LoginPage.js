import React, { useEffect } from "react"
import "../styles/App.css"
import setSheetURL from "../functions/setSheetURL"
import { get, set } from "../functions/localStorage"
import setIsLoggedIn from "../functions/setIsLoggedIn"
import fetchPlayersAndGames from "../functions/fetchPlayersAndGames"
import preval from "preval.macro"

function LoginPage() {
  const build =
    "Build: " + preval`module.exports = new Date().toLocaleString();`

  let ghinNumber, lastName, showTips, showLocalNumbers
  ghinNumber = get("ghinNumber") ? get("ghinNumber") : "GHIN Number"
  lastName = get("lastName") ? get("lastName") : "Last Name"
  showTips = get("showTips")
  showLocalNumbers = get("showLocalNumbers")
  let teesSelected = get("teesSelected")

  useEffect(() => {
    localStorage.clear()
    set("isLoggedIn", "false")
    /*  //eslint-disable-next-line
    ghinNumber = "";
    //eslint-disable-next-line
    lastName = ""; */
    ////eslint-disable-next-line
  }, [])

  useEffect(() => {
    set("ghinNumber", ghinNumber)
  }, [ghinNumber])

  useEffect(() => {
    set("lastName", lastName)
  }, [lastName])

  useEffect(() => {
    set("showTips", showTips)
  }, [showTips])

  useEffect(() => {
    set("showLocalNumbers", showLocalNumbers)
  }, [showLocalNumbers])

  function handleClick(e) {
    set("ghinNumber", ghinNumber)
    set("lastName", lastName)
    setIsLoggedIn(ghinNumber, lastName)
    setSheetURL(ghinNumber)
    if (get("isLoggedIn") === "true") {
      fetchPlayersAndGames(ghinNumber)
    }
    set("showTips", showTips)
    set("showLocalNumbers", showLocalNumbers)
    set("teesSelected", teesSelected)
    set("datamode", "roster")
    document.location = "/settings/selecttees"
  }

  return (
    <>
      <div className="center" id="change-golfer">
        <h5>
          The first time you use this app on any device or
          <br />
          to change golfers, you must login.
          <br />
          You must also login again after
          <br />
          creating or editing your table of games.
        </h5>
        <br />
        <div>
          <label htmlFor="ghinnumber">
            GHIN Number:&nbsp;&nbsp;&nbsp;&nbsp;
          </label>
          <input
            type="text"
            id="ghinnumber"
            name="ghinnumber"
            defaultValue={ghinNumber}
            onFocus={(event) => (event.target.value = get("ghinNumber"))}
            onBlur={(event) => (ghinNumber = event.target.value)}
          />
        </div>

        <br></br>
        <br></br>

        <div>
          <label htmlFor="lastName">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last Name:&nbsp;&nbsp;&nbsp;&nbsp;
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            defaultValue={lastName}
            onFocus={(event) => (event.target.value = get("lastName"))}
            onBlur={(event) => (lastName = event.target.value)}
          />
        </div>
        <br />
        <br />
        <div>
          <button onClick={handleClick}>Next</button>
        </div>
        <br></br>
        <br></br>
        <footer align="center">{build}</footer>
      </div>
    </>
  )
}

export default LoginPage
