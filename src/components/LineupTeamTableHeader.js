import React from "react"
import createGamesAndLineupTableHeaderRow from "../helpers/createGamesAndLineupTableHeaderRow"
import { useRecoilValue } from "recoil"
import { teesSelectedState } from "../state"
import { v4 as uuidv4 } from "uuid"

const LineupTeamTableHeader = ({
  teamNumber,
  teamName,
  teamTables,
  playerNameList,
  handleAddTeamMember,
}) => {
  const teesSelected = useRecoilValue(teesSelectedState)
  let cols = createGamesAndLineupTableHeaderRow(teesSelected)
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

  return (
    <>
      <tr>
        <th className="lineup-table-header_th-left" key={uuidv4()}>
          <select
            className="select-dropdown-container"
            name={teamName}
            value={""}
            onChange={handleAddTeamMember}
          >
            <option key={uuidv4()}>{teamTables.times[teamNumber]}</option>
            {playerNameList.map(({ id, playerName }) => (
              <option key={uuidv4()} value={id}>
                {playerName}
              </option>
            ))}
          </select>
        </th>
        {getHeader()}
      </tr>
    </>
  )
}

export default LineupTeamTableHeader
