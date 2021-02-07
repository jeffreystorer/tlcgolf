import React from "react"
import createGamesAndLineupTableHeaderRow from "../../../shared/helpers/createGamesAndLineupTableHeaderRow"
import { useRecoilValue } from "recoil"
import { teesSelectedState } from "../../../shared/state"
import { v4 as uuidv4 } from "uuid"

const LineupTableHeader = ({
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
        <th className="lineup-other-header-cell" key={uuidv4()}>
          {key}
        </th>
      )
    })
  }

  return (
    <>
      <tr>
        <th className="lineup-left-header-cell" key={uuidv4()}>
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

export default LineupTableHeader
