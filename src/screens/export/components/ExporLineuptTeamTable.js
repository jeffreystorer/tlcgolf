import React from "react"
import "../Export.css"
import ExportLineupTeamTableHeader from "./ExportTeamsTeamTableHeader"
import { v4 as uuidv4 } from "uuid"
import styled from "styled-components"

const TdLineupLeftRowCell = styled.td`
  text-align: left;
  background-color: #ffffff;
  color: #000000;
`
const TdLineupOtherRowCell = styled.td`
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

const ExportLineupTeamTable = ({
  teamNumber,
  teamMembers,
  teamTables,
  progs069,
  teamHcp,
  teamProgs,
  teesSelected,
  showTeamHcp,
}) => {
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
          <TdLineupLeftRowCell>{rows[i].playerName}</TdLineupLeftRowCell>
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
        <TdLineupOtherRowCell key={uuidv4()}>
          {rows[i].courseHandicaps[j]}
        </TdLineupOtherRowCell>
      )
    }

    if (showTeamHcp || progs069 > 0)
      tds.push(<td key={uuidv4()}>{rows[i].teeChoice}</td>)
    return tds
  }

  return (
    <Table>
      <thead>
        <ExportLineupTeamTableHeader
          teesSelected={teesSelected}
          teamTables={teamTables}
          teamNumber={teamNumber}
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

export default ExportLineupTeamTable
