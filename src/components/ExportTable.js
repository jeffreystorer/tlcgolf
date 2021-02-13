import React, { useState, useEffect } from "react"
import ExportLineupTeamTable from "./ExporLineupTeamTable"
import ExportTeamsTeamTable from "./ExportTeamsTeamTable"
import { v4 as uuidv4 } from "uuid"
import ExportButtonDownloadScreenShot from "./ExportButtonDownloadScreenshot"
import getCourseName from "../helpers/getCourseName"
import getExportTeesSelectedArray from "../helpers/getExportTeesSelectedArray"
import createExportLineupTablePlayersArray from "../helpers/createExportLineupTablePlayersArray"
import createExportTeamsTablePlayersArray from "../helpers/createExportTeamsTablePlayersArray"
import fetchGamesGHIN from "../helpers/fetchGamesGHIN"
import domtoimage from "dom-to-image"
import _ from "lodash"

export default function ExportTable({ lineupTitle, lineup }) {
  const [screenShotURL, setScreenShotURL] = useState()
  const [showFirstName, setShowFirstName] = useState(false)
  const [showTeamHcp, setShowTeamHcp] = useState(false)
  //set("showTeamHcp", false)
  const [showIndividualHandicaps, setShowIndividualHandicaps] = useState(true)
  const [refreshed, setRefreshed] = useState(false)
  let teesSelected = lineup.teesSelected
  let courseName = getCourseName(lineup.course)
  const dataMode = "ghin"
  fetchGamesGHIN(dataMode)

  useEffect(() => {
    if (!refreshed) setRefreshed(true)
  }, [refreshed])

  useEffect(() => {
    let element
    switch (showIndividualHandicaps) {
      case true:
        element = "lineup-table-div"
        break
      case false:
        element = "teams-table-div"
        break

      default:
        break
    }
    domtoimage
      .toJpeg(document.getElementById(element), { quality: 0.95 })
      .then(function (dataUrl) {
        //eslint-disable-next-line
        setScreenShotURL(dataUrl)
      })
  })

  function handleShowTeamHcpChange() {
    //set("showTeamHcp", !showTeamHcp)
    setShowTeamHcp((prevState) => !prevState)
  }

  function handleShowFirstNameChange() {
    setShowFirstName((prevState) => !prevState)
  }

  function handleShowIndividualHandicapsChange() {
    //if (showIndividualHandicaps) set("showTeamHcp", false)
    //setShowTeamHcp(false)
    setShowIndividualHandicaps((prevState) => !prevState)
  }

  let lineupPlayersArray = createExportLineupTablePlayersArray(
    showFirstName,
    lineup.course,
    lineup.game,
    lineup.games,
    lineup.allPlayers,
    lineup.teesSelected,
    lineup.ratings,
    lineup.slopes,
    lineup.pars,
    lineup.teamTables,
    lineup.teeTimeCount
  )
  let teamsPlayersArray = createExportTeamsTablePlayersArray(
    showFirstName,
    lineup.game,
    lineup.games,
    lineup.allPlayers
  )

  let lineupTeamTables = updateLineupTeamTables()
  let teamsTeamTables = updateTeamsTeamTables()
  let teamHcpAndProgs = {
    team0: [0, 0],
    team1: [0, 0],
    team2: [0, 0],
    team3: [0, 0],
    team4: [0, 0],
    team5: [0, 0],
    team6: [0, 0],
    team7: [0, 0],
    team8: [0, 0],
    team9: [0, 0],
  }
  let lineupTeamMembers = []
  let teamsTeamMembers = []

  function updateLineupTeamTables() {
    let teamTables = _.cloneDeep(lineup.teamTables)
    for (let i = 0; i < lineup.teeTimeCount; i++) {
      let aTeamName = "team" + i
      try {
        let aPlayerCount = teamTables[aTeamName].length
        for (let j = 0; j < aPlayerCount; j++) {
          let aTeamMemberId = teamTables[aTeamName][j].id
          let aPlayerObj = lineupPlayersArray.find(
            (obj) => obj.id === aTeamMemberId
          )
          teamTables[aTeamName][j].playerName = aPlayerObj.playerName
          teamTables[aTeamName][j].courseHandicaps = aPlayerObj.courseHandicaps
        }
      } catch (error) {
        console.log("error updating Lineup Team Tables")
      }
    }
    return teamTables
  }
  function updateTeamsTeamTables() {
    let teamTables = _.cloneDeep(lineup.teamTables)
    for (let i = 0; i < lineup.teeTimeCount; i++) {
      let aTeamName = "team" + i
      try {
        let aPlayerCount = teamTables[aTeamName].length
        for (let j = 0; j < aPlayerCount; j++) {
          let aTeamMemberId = teamTables[aTeamName][j].id
          let aPlayerObj = teamsPlayersArray.find(
            (obj) => obj.id === aTeamMemberId
          )
          teamTables[aTeamName][j].playerName = aPlayerObj.playerName
        }
      } catch (error) {
        console.log("error updating Teams Team Tables")
      }
    }
    return teamTables
  }

  function setEachTeamsHcpAndProgs() {
    for (let i = 0; i < lineup.teeTimeCount; i++) {
      let teamName = "team" + i
      setTeamHcpAndProgs(teamName)
    }
  }

  let progAdjMessage = ""
  function setTeamHcpAndProgs(teamName) {
    let teamMembers = lineupTeamTables[teamName]
    let aTeamHcp = 0
    let aTeamProgs = 0
    try {
      let playerCount = teamMembers.length
      teamMembers.forEach(computeHcpAndProgs)
      switch (Number(lineup.progAdj)) {
        case 0:
          progAdjMessage = "**No threesome/foursome prog adjustment**"
          switch (Number(lineup.progs069)) {
            case 6:
              aTeamProgs = aTeamProgs / 3
              break
            case 9:
              aTeamProgs = aTeamProgs / 2
              break
            default:
              aTeamProgs = 0
          }
          break
        case 3:
          switch (Number(lineup.progs069)) {
            case 6:
              progAdjMessage = "**Threesome progs include +1 per 6**"
              if (playerCount === 3) {
                aTeamProgs = aTeamProgs / 3 + 1
              } else {
                aTeamProgs = aTeamProgs / 3
              }
              break
            case 9:
              progAdjMessage = "**Threesome progs include +1.5 per 9**"
              if (playerCount === 3) {
                aTeamProgs = aTeamProgs / 2 + 1.5
              } else {
                aTeamProgs = aTeamProgs / 2
              }
              break
            default:
              aTeamProgs = 0
          }
          break
        case 4:
          switch (Number(lineup.progs069)) {
            case 6:
              progAdjMessage = "**Foursome progs include -1 per 6**"
              if (playerCount === 4) {
                aTeamProgs = aTeamProgs / 3 - 1
              } else {
                aTeamProgs = aTeamProgs / 3
              }
              break
            case 9:
              progAdjMessage = "**Foursome progs include -1.5 per 9**"
              if (playerCount === 4) {
                aTeamProgs = aTeamProgs / 2 - 1.5
              } else {
                aTeamProgs = aTeamProgs / 2
              }
              break
            default:
              aTeamProgs = 0
          }
          break
        default:
      }
      let teamProgs = aTeamProgs.toFixed(1)
      aTeamProgs = teamProgs
      teamHcpAndProgs[teamName][0] = aTeamHcp
      teamHcpAndProgs[teamName][1] = aTeamProgs
    } catch (error) {
      console.log("error setting TeamHcpAndProgs")
    }

    function computeHcpAndProgs(item) {
      let teeChoice = item.teeChoice
      let teesSelectedArray = getExportTeesSelectedArray(lineup.teesSelected)
      let teeNo = teesSelectedArray.indexOf(teeChoice)
      aTeamHcp = aTeamHcp + Number(item.courseHandicaps[teeNo])
      aTeamProgs = aTeamProgs + (36 - Number(item.courseHandicaps[teeNo]))
    }
  }

  function setManualCHCourseHandicaps(teamMembers) {
    //iterate through teamMembers
    try {
      for (let i = 0; i < teamMembers.length; i++) {
        let aTeeChoice = teamMembers[i].teeChoice
        let aManualCH = teamMembers[i].manualCH
        if (aManualCH !== "Auto") {
          let teesSelectedArray = teesSelected.map((a) => a.value)
          let aChosenTeeIndex = teesSelectedArray.indexOf(aTeeChoice)
          for (let j = 0; j < teesSelectedArray.length; j++) {
            teamMembers[i].courseHandicaps[j] = "*"
          }
          teamMembers[i].courseHandicaps[aChosenTeeIndex] = aManualCH
          teamMembers[i].playerName = teamMembers[i].playerName + "*"
        }
      }
    } catch (error) {
      console.log("error setting ManualCourseHandicaps")
    }
  }

  let LineupTeamTables = []
  function generateExportLineupTeamTables() {
    for (var i = 0; i < lineup.teeTimeCount; i++) {
      let teamName = "team" + i
      lineupTeamMembers = lineupTeamTables[teamName]
      setManualCHCourseHandicaps(lineupTeamMembers)
      setEachTeamsHcpAndProgs()
      let teamHcp = teamHcpAndProgs[teamName][0]
      let teamProgs = teamHcpAndProgs[teamName][1]
      LineupTeamTables[i] = (
        <ExportLineupTeamTable
          key={uuidv4()}
          teamNumber={i}
          teamTables={lineupTeamTables}
          teamMembers={lineupTeamMembers}
          progs069={lineup.progs069}
          teamHcp={teamHcp}
          teamProgs={teamProgs}
          teesSelected={lineup.teesSelected}
          showTeamHcp={showTeamHcp}
        />
      )
    }
    return LineupTeamTables
  }

  let TeamsTeamTables = []
  function generateExportTeamsTeamTables() {
    for (var i = 0; i < lineup.teeTimeCount; i++) {
      let teamName = "team" + i
      teamsTeamMembers = teamsTeamTables[teamName]
      TeamsTeamTables[i] = (
        <ExportTeamsTeamTable
          key={uuidv4()}
          teamNumber={i}
          teamTables={teamsTeamTables}
          teamMembers={teamsTeamMembers}
        />
      )
    }
    return TeamsTeamTables
  }

  return (
    <>
      <div className="div--center">
        <h4>
          Check the boxes below if you wish<br></br>
          to display first names, team handicaps,<br></br>
          and individual handicaps:
        </h4>
        <input
          type="checkbox"
          id="showFirstName"
          onChange={handleShowFirstNameChange}
          defaultChecked={showFirstName}
        ></input>
        <label htmlFor="showFirstName">Show First Name</label>
        <br></br>
        {lineup.progs069 < 1 && showIndividualHandicaps && (
          <>
            <input
              type="checkbox"
              id="showTeamHcp"
              onChange={handleShowTeamHcpChange}
              defaultChecked={showTeamHcp}
            ></input>
            <label htmlFor="showTeamHcp">Show Team Hcp</label>
            <br></br>
          </>
        )}
        <input
          type="checkbox"
          id="showIndividualHandicaps"
          onChange={handleShowIndividualHandicapsChange}
          defaultChecked={showIndividualHandicaps}
        ></input>
        <label htmlFor="showIndividualHandicaps">
          Show Individual Handicaps
        </label>
        <br></br>
        {showIndividualHandicaps ? (
          <div
            id="lineup-table-div"
            className="div--center div--background-white"
          >
            <table className="lineup-table">
              <thead>
                <tr>
                  <td className="lineup-table-head_td">
                    {lineup.playingDate + " at " + courseName}
                  </td>
                </tr>
                <tr>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="lineup-table-body_tr">
                    {generateExportLineupTeamTables()}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                {lineup.progs069 > 0 && (
                  <>
                    <tr>
                      <td></td>
                    </tr>
                    <tr>
                      <td className="lineup-table-footer">{progAdjMessage}</td>
                    </tr>
                  </>
                )}

                <tr>
                  <td className="textarea_td">
                    <textarea
                      className="textarea"
                      rows="8"
                      cols="39"
                      value={lineup.textAreaValue}
                    ></textarea>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <div
            id="teams-table-div"
            className="div--center div--background-white"
          >
            <table className="lineup-table">
              <thead>
                <tr>
                  <td className="lineup-table-head_td">
                    {lineup.playingDate + " at " + courseName}
                  </td>
                </tr>
                <tr>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="lineup-table-body_tr">
                    {generateExportTeamsTeamTables()}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td className="textarea_td">
                    <textarea
                      className="textarea"
                      rows="8"
                      cols="39"
                      value={lineup.textAreaValue}
                    ></textarea>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
        <ExportButtonDownloadScreenShot
          title={lineupTitle}
          dataUrl={screenShotURL}
        />
      </div>
    </>
  )
}
