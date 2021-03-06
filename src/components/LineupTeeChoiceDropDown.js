import React from "react"

const TeeChoiceDropDown = ({
  teeChoice,
  handleTeeChoiceChange,
  teeChoiceOptionItems,
  playerId,
  teamNumber,
  baseTee,
}) => {
  return (
    <td className="select-dropdown-container">
      <label>
        <select
          id={teamNumber}
          name={playerId}
          defaultValue={baseTee}
          value={teeChoice}
          onChange={handleTeeChoiceChange}
        >
          {teeChoiceOptionItems}
        </select>
      </label>
    </td>
  )
}
export default TeeChoiceDropDown
