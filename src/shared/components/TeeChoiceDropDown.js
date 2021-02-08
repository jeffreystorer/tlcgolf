import React from "react"
import styled from "styled-components"

const StyledTD = styled.td`
  margin-left: auto;
  margin-right: auto;
  font: 16px sans-serif;
  font-weight: bold;
  width: fit-content;
`

const TeeChoiceDropDown = ({
  teeChoice,
  handleTeeChoiceChange,
  teeChoiceOptionItems,
  playerId,
  teamNumber,
  baseTee,
}) => {
  return (
    <StyledTD>
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
    </StyledTD>
  )
}
export default TeeChoiceDropDown
