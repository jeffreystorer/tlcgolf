import React from "react"
import createExportTeamTableHeaderRow from "../helpers/createExportTeamTableHeaderRow"
import { v4 as uuidv4 } from "uuid"
import styled from "styled-components"

const ThLineupLeftHeaderCell = styled.th`
  text-align: left;
  background-color: #ffffff;
  color: #000000;
`

const ThLineupOtherHeaderCell = styled.th`
  text-align: center;
  background-color: #ffffff;
  color: #000000;
  font-weight: bold;
  width: fit-content;
`

const ExportLineupTeamTableHeader = ({
  teesSelected,
  teamTables,
  teamNumber,
}) => {
  let cols = createExportTeamTableHeaderRow(teesSelected)
  const getHeader = () => {
    cols.shift()
    var keys = cols
    return keys.map((key, index) => {
      return (
        <ThLineupOtherHeaderCell key={uuidv4()}>{key}</ThLineupOtherHeaderCell>
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
        <ThLineupLeftHeaderCell>{teeTime}</ThLineupLeftHeaderCell>
        {getHeader()}
      </tr>
    </>
  )
}

export default ExportLineupTeamTableHeader
