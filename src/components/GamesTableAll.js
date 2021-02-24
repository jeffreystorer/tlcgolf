import React, { useState } from "react"
import GamesTableDropDowns from "./GamesTableDropDowns"
import GamesTableHeader from "./GamesTableHeader"
import GamesTableBody from "./GamesTableBody"
import LinkButton from "./GamesLinkButton"
import ButtonDownloadScreenShot from "./SharedButtonDownloadScreenshot"
import { get, set } from "../helpers/localStorage"

export default function GamesTableAll({ ratings, slopes, pars, game, course }) {
  const [guestGHINNumber, setGuestGHINNumber] = useState("")
  const [guestLastName, setGuestLastName] = useState("")
  const [showLocalNumbers, setShowLocalNumbers] = useState(
    get("showLocalNumbers")
  )

  function handleShowLocalNumbersChange() {
    set("showLocalNumbers", !showLocalNumbers)
    setShowLocalNumbers((prevState) => !prevState)
  }

  function handleSubmitGuest(event) {
    event.preventDefault()
    addGuest()
  }

  function handleChangeGuestGHINNumber(event) {
    setGuestGHINNumber(event.target.value)
  }

  function handleChangeGuestLastName(event) {
    setGuestLastName(event.target.value)
  }

  function randomGHINNumber(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function addGuest() {
    let games = get("games")
    let ghinNumber = guestGHINNumber
    if (ghinNumber === "") ghinNumber = randomGHINNumber(0, 9999999).toString()
    let lastName = guestLastName
    let firstName = ""
    let index = "O.O"
    let gender = ""
    let localNumber = "00000"
    let players = get("players")
    let guest = [ghinNumber, lastName, firstName, index, gender, localNumber]
    let gameNumber = games.indexOf(game)
    let gameCount = games.length
    let i
    for (i = 1; i < gameCount; i++) {
      if (i === gameNumber) {
        guest.push("YES")
      } else {
        guest.push("NO")
      }
    }
    players.push(guest)
    set("players", players)

    setGuestGHINNumber("")
    setGuestLastName("")
    document.location = "/games"
  }
  return (
    <>
      <GamesTableDropDowns />
      <br />
      <br />
      <table className="table table-games">
        <div id="games-table-div" className="div--background-white">
          <thead>
            <tr className="tr--center-background-white">
              <th colSpan={get("teesSelected").length + 1}>
                {game} at {course.toUpperCase()}
              </th>
            </tr>
            <GamesTableHeader />
          </thead>
          <tbody>
            <GamesTableBody ratings={ratings} slopes={slopes} pars={pars} />
          </tbody>
        </div>
      </table>
      <br></br>
      <br></br>
      <div className="div--center div--bordered">
        <h4>Add Guest</h4>
        <h5>
          Leave GHIN Number blank
          <br />
          if you don't have it.
        </h5>
        <h5>
          If you leave GHIN Number blank,
          <br />
          you may enter first and last name
          <br />
          in the "Last Name" box.
        </h5>
        <form onSubmit={handleSubmitGuest}>
          <label>
            GHIN Number:&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="text"
              value={guestGHINNumber}
              onChange={handleChangeGuestGHINNumber}
            />
          </label>
          <br />
          <label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last
            Name:&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="text"
              value={guestLastName}
              onChange={handleChangeGuestLastName}
            />
          </label>
          <br />
          <br />
          <input type="submit" className="button" value="Add Guest" />
        </form>
        <br />
      </div>
      <br></br>
      <div className="div--center">
        <h4>
          Edit your table of players
          <br />
          in Google Sheets
        </h4>
        <LinkButton title={"Edit Table"} />
        <br></br>
        <br></br>
        <ButtonDownloadScreenShot
          game={game}
          course={course}
          element="games-table-div"
          format="PNG"
          page="Games"
        />
        <br></br>
        <ButtonDownloadScreenShot
          game={game}
          course={course}
          element="games-table-div"
          format="JPEG"
          page="Games"
        />
        <br></br>
        <br></br>
        <input
          className="checkbox"
          type="checkbox"
          id="showLocalNumbers"
          onChange={handleShowLocalNumbersChange}
          defaultChecked={showLocalNumbers}
        ></input>
        <label htmlFor="showLocalNumbers">Show Local Numbers</label>
      </div>
    </>
  )
}
