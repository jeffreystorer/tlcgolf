import React from 'react';

const OverrideCHDropDown = ({
  manualCH,
  handleOverrideCHChange,
  manualCHOptionItems,
  playerId,
  teamNumber
}) => {

  return(
    <td className='select-dropdown-container'>
    <label className='embedded-selector'>
      <select className='select-manual-CH' id={teamNumber} name={playerId} defaultValue="*" value={manualCH} onChange={handleOverrideCHChange}>
        {manualCHOptionItems}
      </select>
    </label>
    </td>
  )
}
export default OverrideCHDropDown;