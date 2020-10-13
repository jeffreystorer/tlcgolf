import React from 'react';
import createGamesAndLineupTableHeaderRow from '../functions/createGamesAndLineupTableHeaderRow';
import {useRecoilValue} from 'recoil';
import {teesSelectedState} from '../state';
import { v4 as uuidv4 } from 'uuid';
 

const LineupTableHeader = ({
  teamNumber,
  teamName,
  teamTables,
  playerNameList,
  handleAddTeamMember
}) => {  
  const teesSelected = useRecoilValue(teesSelectedState);
  let cols = createGamesAndLineupTableHeaderRow(teesSelected);
  const getHeader = () => {
    cols.shift();
    var keys = cols;
    return keys.map((key, index)=>{
    return (
      <th className='game-header-cell'>
        {key}
      </th>
    )})
  }

    return (
        <>
          <tr>
          <th className="game-header-cell"
            key="1">
            <select className='select-dropdown-container' name={teamName} value={""} onChange={handleAddTeamMember}>
                <option key={uuidv4()}>{teamTables.times[teamNumber]}</option>
                {playerNameList.map(({id, playerName}) =>
                    <option key={uuidv4()} value={id}>{playerName}</option>
                )}
            </select>
            </th>
            {getHeader()}
          </tr>
        </>
    );
  }

  export default LineupTableHeader;