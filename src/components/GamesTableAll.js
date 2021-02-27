import React, { useState } from "react"
import GamesTableDropDowns from "./GamesTableDropDowns"
import GamesTableHeader from "./GamesTableHeader"
import GamesTableBody from "./GamesTableBody"
import LinkButton from "./GamesLinkButton"
import ButtonDownloadScreenShot from "./SharedButtonDownloadScreenshot"
import { get, set } from "../helpers/localStorage"
import AddGuestToGoogleSheet from "./AddGuestToGoogleSheet"
import AddGuest from "./AddGuest"

export default function GamesTableAll({ ratings, slopes, pars, game, course }) {
  let ghinNumber = get("ghinNumber")
  let games = get("games")
  let guest
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
    let aGHINNumber = guestGHINNumber
    if (aGHINNumber === "")
      aGHINNumber = randomGHINNumber(0, 9999999).toString()
    let lastName = guestLastName
    let firstName = ""
    let index = "0.0"
    let gender = ""
    let localNumber = "00000"
    let players = get("players")
    guest = [aGHINNumber, lastName, firstName, index, gender, localNumber]
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
    guest.splice(2, 4)
    //addGuestToGoogleSheet(ghinNumber, guest)
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
      <br />
      <AddGuest
        handleSubmitGuest={handleSubmitGuest}
        guestGHINNumber={guestGHINNumber}
        handleChangeGuestGHINNumber={handleChangeGuestGHINNumber}
        guestLastName={guestLastName}
        handelChangeGuestLastName={handleChangeGuestLastName}
      />
      <AddGuestToGoogleSheet ghinNumber={ghinNumber} guest={guest} />
      <br />
      <br />
      <div className="div--center">
        <h4>
          Edit your table of players
          <br />
          in Google Sheets
        </h4>
        <LinkButton title={"Edit Table"} />
        <br />
        <br />
        <ButtonDownloadScreenShot
          game={game}
          course={course}
          element="games-table-div"
          format="PNG"
          page="Games"
        />
        <br />
        <ButtonDownloadScreenShot
          game={game}
          course={course}
          element="games-table-div"
          format="JPEG"
          page="Games"
        />
        <br />
        <br />
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
