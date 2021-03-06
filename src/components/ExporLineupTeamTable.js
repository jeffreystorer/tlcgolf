import React from "react"
import "../styles/App.css"
import ExportLineupTeamTableHeader from "./ExportLineupTeamTableHeader"
import { v4 as uuidv4 } from "uuid"

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
        <tr className="lineup-table-body_tr" key={rows[i].id}>
          <td className="lineup-table-body_td-left">{rows[i].playerName}</td>
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

    if (showTeamHcp || progs069 > 0)
      tds.push(<td key={uuidv4()}>{rows[i].teeChoice}</td>)
    return tds
  }

  return (
    <table className="lineup-table-body_td">
      <thead>
        <ExportLineupTeamTableHeader
          teesSelected={teesSelected}
          teamTables={teamTables}
          teamNumber={teamNumber}
        />
      </thead>
      <tbody>{generateRows()}</tbody>
      <tfoot className="team-table-footer">
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

export default ExportLineupTeamTable
