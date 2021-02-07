import React from "react"
import "../Export.css"
import ExportTeamsTeamTableHeader from "../components/ExportTeamsTeamTableHeader"

const ExportTeamsTeamTable = ({ teamNumber, teamMembers, teamTables }) => {
  let rows = teamMembers
  let rowsTD = []
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
          <td className="lineup-left-row-cell">{rows[i].playerName}</td>
        </tr>
      )
    }
    return rowsTD
  }

  return (
    <table className="team-table">
      <thead>
        <ExportTeamsTeamTableHeader
          teamTables={teamTables}
          teamNumber={teamNumber}
        />
      </thead>
      <tbody>{generateRows()}</tbody>
      <tfoot className="team-table-footer"></tfoot>
    </table>
  )
}

export default ExportTeamsTeamTable
