import React, { useState } from "react"
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
  const [showAddTeamMember, setShowAddTeamMember] = useState(false)
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

  function handleSubmit(e) {
    e.preventDefault()
    var sel = document.getElementById(teamName)
    var alloptions = sel.options
    let optionValues = []
    for (var i = 0, len = alloptions.length; i < len; i++) {
      if (alloptions[i].selected) {
        optionValues = [...optionValues, alloptions[i].value]
      }
    }
    console.table(teamName)
    console.table(optionValues)
    setShowAddTeamMember(false)
    handleAddTeamMember(teamName, optionValues)
  }

  function handleTeeTimeClick() {
    setShowAddTeamMember(true)
  }

  return (
    <>
      <tr>
        <th
          className="lineup-table-header_th-left"
          onClick={handleTeeTimeClick}
        >
          {teamTables.times[teamNumber]}
        </th>

        {getHeader()}
      </tr>
      {showAddTeamMember && (
        <tr>
          <th key={uuidv4()}>
            <form onSubmit={handleSubmit}>
              <label htmlFor={teamNumber}>
                <input
                  className="button"
                  type="submit"
                  value="Add Team Member(s)"
                />
              </label>
              <br />
              <select id={teamName} name={teamNumber} multiple={true} size={20}>
                {playerNameList.map(({ id, playerName }) => (
                  <option key={uuidv4()} value={id}>
                    {playerName}
                  </option>
                ))}
              </select>
            </form>
          </th>
        </tr>
      )}
    </>
  )
}

export default LineupTeamTableHeader
