import React, { useState } from "react"
import GamesTableDropDowns from "../components/GamesTableDropDowns"
import GamesTableHeader from "../components/GamesTableHeader"
import GamesTableBody from "../components/GamesTableBody"
import LinkButton from "../../../shared/subcomponents/LinkButton/components/LinkButton"
import ButtonDownloadScreenShot from "../../../shared/subcomponents/ButtonDownloadScreenshot/components/ButtonDownloadScreenshot"
import { get, set } from "../../../shared/helpers/localStorage"

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
      <table id="games-table" className="background-white">
        <div id="games-table-div" className="background-white">
          <thead>
            <tr className="center background-white">
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
      <div className="center">
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
