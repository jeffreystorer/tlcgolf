import React from "react"
import "../styles/App.css"
import TeamTableHeader from "./TeamTableHeader"

const TeamTable = ({ teamNumber, teamMembers, teamTables }) => {
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
          <td className="teams-left-row-cell"></td>
          <td className="lineup-left-row-cell">{rows[i].playerName}</td>
        </tr>
      )
    }
    return rowsTD
  }

  return (
    <table className="team-table">
      <thead>
        <TeamTableHeader teamTables={teamTables} teamNumber={teamNumber} />
      </thead>
      <tbody>{generateRows()}</tbody>
      <tfoot className="team-table-footer"></tfoot>
    </table>
  )
}

export default TeamTable
