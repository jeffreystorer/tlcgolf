import React from "react"
import createLineupTableHeaderRow from "../helpers/createExportTeamTableHeaderRow"
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
        <th className="lineup-table-header_th-other" key={uuidv4()}>
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
        <th className="lineup-table-header_th-left">{teeTime}</th>
        {getHeader()}
      </tr>
    </>
  )
}

export default ExportLineupTeamTableHeader
