import React from 'react';

const TeeChoiceDropDown = ({
  teeChoice,
  handleTeeChoiceChange,
  teeChoiceOptionItems,
  baseTee,
  playerId
}) => {

  return(
    <td className='select-dropdown-container'>
    <label className='embedded-selector'>
      <select name={playerId} defaultValue={baseTee} value={teeChoice} onChange={handleTeeChoiceChange}>
        {teeChoiceOptionItems}
      </select>
    </label>
    </td>
  )
}
export default TeeChoiceDropDown;
