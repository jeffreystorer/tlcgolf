import React from "react"
import "../styles/App.css"
import LineupTeamTableHeader from "./LineupTeamTableHeader"
import { useRecoilValue } from "recoil"
import * as state from "../state"
import { v4 as uuidv4 } from "uuid"
import TeeChoiceDropDown from "./LineupTeeChoiceDropDown"
import OverrideCHDropDown from "./LineupOverrideCHDropDown"

const LineupTeamTable = ({
  teamNumber,
  teamName,
  teamMembers,
  handleAddTeamMember,
  handleDeleteTeamMember,
  teamTables,
  playerNameList,
  progs069,
  teamHcp,
  teamProgs,
  handleTeeChoiceChange,
  handleOverrideCHChange,
  manualCHOptionItems,
  showTeamHcp,
}) => {
  const teesSelected = useRecoilValue(state.teesSelectedState)
  let rows = teamMembers
  let rowsTD = []
  let teeCount = teesSelected.length
  let playerCount
  if (teamMembers) {
    playerCount = teamMembers.length
  } else {
    playerCount = 0
  }

  function generateRows() {
    for (let i = 0; i < playerCount; i++) {
      rowsTD[i] = (
        <tr key={rows[i].id}>
          <td
            className="lineup-table-body_td-left"
            onClick={handleDeleteTeamMember(teamName, teamMembers[i].id)}
          >
            {rows[i].playerName}
          </td>
          {generateCols(i)}
        </tr>
      )
    }
    return rowsTD
  }

  function generateCols(i) {
    let tds = []
    for (var j = 0; j < teeCount; j++) {
      tds[j] = (
        <td className="lineup-table-body_td-other" key={uuidv4()}>
          {rows[i].courseHandicaps[j]}
        </td>
      )
    }

    let aChosenTeeIndex = rows[i].courseHandicaps.indexOf(rows[i].teeChoice)
    let manualCH = rows[i].courseHandicaps[aChosenTeeIndex]

    if (showTeamHcp || progs069 > 0) {
      tds.push(
        <TeeChoiceDropDown
          key={uuidv4()}
          handleTeeChoiceChange={handleTeeChoiceChange}
          teeChoiceOptionItems={teeChoiceOptionItems}
          baseTee={rows[i].teeChoice}
          playerId={rows[i].id}
          teamNumber={teamNumber}
        />
      )
      tds.push(
        <OverrideCHDropDown
          key={uuidv4()}
          manualCH={manualCH}
          handleOverrideCHChange={handleOverrideCHChange}
          manualCHOptionItems={manualCHOptionItems}
          playerId={rows[i].id}
          teamNumber={teamNumber}
        />
      )
    }
    return tds
  }
  let teesSelectedArray = teesSelected.map((a) => a.value)
  //let baseTee = teesSelectedArray[0];
  let teeChoiceOptionItems = teesSelectedArray.map((tee) => (
    <option key={uuidv4()} value={tee}>
      {tee}
    </option>
  ))

  return (
    <table>
      <thead>
        <LineupTeamTableHeader
          teamNumber={teamNumber}
          teamName={teamName}
          teamTables={teamTables}
          playerNameList={playerNameList}
          handleAddTeamMember={handleAddTeamMember}
        />
      </thead>
      <tbody>{generateRows()}</tbody>
      <tfoot className="lineup-table-footer">
        <tr>
          <td colSpan={teeCount + 2}>
            {showTeamHcp || progs069 > 0 ? (
              <span>Team Hcp: {teamHcp}</span>
            ) : (
              <></>
            )}
            {progs069 > 0 ? (
              <span>
                &nbsp;&nbsp;Team progs per {progs069}: {teamProgs}
              </span>
            ) : (
              <></>
            )}
          </td>
        </tr>
      </tfoot>
    </table>
  )
}

export default LineupTeamTable
