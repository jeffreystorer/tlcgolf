import React, { useState } from "react"
import TeamTable from "./TeamTable"
import { v4 as uuidv4 } from "uuid"
import ButtonDownloadScreenShot from "./ButtonDownloadScreenshot"
import createExportTeamsTablePlayersArray from "../functions/createExportTeamsTablePlayersArray"
import getCourseName from "../functions/getCourseName"

export default function ExportTeamsTable({ lineupTitle, lineup }) {
  const [showFirstName, setShowFirstName] = useState(false)
  let courseName = getCourseName(lineup.course)
  let playersArray = createExportTeamsTablePlayersArray(
    showFirstName,
    lineup.game,
    lineup.games,
    lineup.allPlayers
  )

  function handleShowFirstNameChange() {
    setShowFirstName((prevState) => !prevState)
  }
  let teamMembers = []

  function updateTeamTables() {
    let teamTables = lineup.teamTables
    for (let i = 0; i < lineup.teeTimeCount; i++) {
      let aTeamName = "team" + i
      try {
        let aPlayerCount = teamTables[aTeamName].length
        for (let j = 0; j < aPlayerCount; j++) {
          let aTeamMemberId = teamTables[aTeamName][j].id
          let aPlayerObj = playersArray.find((obj) => obj.id === aTeamMemberId)
          teamTables[aTeamName][j].playerName = aPlayerObj.playerName
        }
      } catch (error) {
        console.log("error updating Team Tables")
      }
    }
    return teamTables
  }

  let teamTables = updateTeamTables()

  let TeamTables = []
  function generateTeamTables() {
    for (var i = 0; i < lineup.teeTimeCount; i++) {
      let teamName = "team" + i
      teamMembers = teamTables[teamName]
      TeamTables[i] = (
        <TeamTable
          key={uuidv4()}
          teamNumber={i}
          teamTables={teamTables}
          teamMembers={teamMembers}
        />
      )
    }
    return TeamTables
  }

  return (
    <>
      <div id="lineup-page" className="center background-white">
        <input
          type="checkbox"
          id="showFirstName"
          onChange={handleShowFirstNameChange}
          defaultChecked={showFirstName}
        ></input>
        <label htmlFor="showFirstName">Show First Name</label>
        <br></br>
        <br></br>
        <table id="lineup-table" className="background-white">
          <div id="lineup-table-div" className="background-white">
            <thead className="lineup-table-head background-white">
              <tr className="lineup-table-head background-white">
                <td className="lineup-table-head background-white">
                  {lineup.playingDate + " at " + courseName}
                </td>
              </tr>
              <tr>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="background-white">{generateTeamTables()}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td className="center text-area-cell background-white">
                  <textarea
                    id="lineup-textarea"
                    // @ts-ignore
                    rows="8"
                    cols="39"
                    value={lineup.textAreaValue}
                  ></textarea>
                </td>
              </tr>
            </tfoot>
          </div>
        </table>
        <br></br>
        <br></br>
        <ButtonDownloadScreenShot
          title={lineupTitle}
          game={lineup.game}
          course={lineup.course.toUpperCase()}
          element="lineup-table-div"
          format="JPEG"
          page="Teams"
        />
      </div>
    </>
  )
}
