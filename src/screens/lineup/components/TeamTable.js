import React from "react"
import "../Lineup.css"
import LineupTableHeader from "../components/LineupTableHeader"
import { useRecoilValue } from "recoil"
import * as state from "../../../shared/state"
import { v4 as uuidv4 } from "uuid"
import TeeChoiceDropDown from "../../../shared/components/TeeChoiceDropDown"
import OverrideCHDropDown from "../components/OverrideCHDropDown"
import styled from "styled-components"

const TdLineupLeftRowCell = styled.td`
  text-align: left;
  background-color: #ffffff;
  color: #000000;
`
const TcLineupOtherRowCell = styled.td`
  text-align: center;
  background-color: #ffffff;
  color: #000000;
  width: fit-content;
`
const Table = styled.table`
  background-color: white;
  width: 100%;
`
const Tfoot = styled.tfoot`
  text-align: center;
  font-style: italic;
`

const TeamTable = ({
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
          <TdLineupLeftRowCell
            onClick={handleDeleteTeamMember(teamName, teamMembers[i].id)}
          >
            {rows[i].playerName}
          </TdLineupLeftRowCell>
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
        <TcLineupOtherRowCell key={uuidv4()}>
          {rows[i].courseHandicaps[j]}
        </TcLineupOtherRowCell>
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
    <Table>
      <thead>
        <LineupTableHeader
          teamNumber={teamNumber}
          teamName={teamName}
          teamTables={teamTables}
          playerNameList={playerNameList}
          handleAddTeamMember={handleAddTeamMember}
        />
      </thead>
      <tbody>{generateRows()}</tbody>
      <Tfoot>
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
      </Tfoot>
    </Table>
  )
}

export default TeamTable
