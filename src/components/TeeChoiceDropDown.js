import React from 'react';

const TeeChoiceDropDown = ({
  teeChoice,
  handleTeeChoiceChange,
  teeChoiceOptionItems,
  baseTee,
  playerId,
  teamNumber
}) => {

  return(
    <td className='select-dropdown-container'>
    <label className='embedded-selector'>
      <select id={teamNumber} name={playerId} defaultValue={baseTee} value={teeChoice} onChange={handleTeeChoiceChange}>
        {teeChoiceOptionItems}
      </select>
    </label>
    </td>
  )
}
export default TeeChoiceDropDown;
