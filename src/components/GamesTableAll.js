import React, { useState } from "react"
import GamesTableDropDowns from "./GamesTableDropDowns"
import GamesTableHeader from "./GamesTableHeader"
import GamesTableBody from "./GamesTableBody"
import LinkButton from "./GamesLinkButton"
import ButtonDownloadScreenShot from "./SharedButtonDownloadScreenshot"
import { get, set } from "../helpers/localStorage"

export default function GamesTableAll({ ratings, slopes, pars, game, course }) {
  const [showLocalNumbers, setShowLocalNumbers] = useState(
    get("showLocalNumbers")
  )

  function handleShowLocalNumbersChange() {
    set("showLocalNumbers", !showLocalNumbers)
    setShowLocalNumbers((prevState) => !prevState)
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
      <br></br>
      <LinkButton title={"Edit Table"} />
      <br></br>
      <br></br>
      <div className="div--center">
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
