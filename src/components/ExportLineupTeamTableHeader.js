import React from "react"
import createLineupTableHeaderRow from "../functions/createExportTeamTableHeaderRow"
import { v4 as uuidv4 } from "uuid"

const ExportLineupTeamTableHeader = ({
  teesSelected,
  teamTables,
  teamNumber,
}) => {
  let cols = createLineupTableHeaderRow(teesSelected)
  const getHeader = () => {
    cols.shift()
    var keys = cols
    return keys.map((key, index) => {
      return (
        <th className="lineup-other-header-cell" key={uuidv4()}>
          {key}
        </th>
      )
    })
  }
  let teeTime
  try {
    teeTime = teamTables.times[teamNumber]
  } catch (error) {}

  return (
    <>
      <tr>
        <th className="lineup-left-header-cell">{teeTime}</th>
        {getHeader()}
      </tr>
    </>
  )
}

export default ExportLineupTeamTableHeader
