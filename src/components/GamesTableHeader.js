import React from 'react';
import createGameTableHeaderRow from '../functions/createGamesTableHeaderRow';
import {useRecoilValue} from 'recoil';
import {teesSelectedState} from '../state'


function GameTableHeader() {
  const teesSelected = useRecoilValue(teesSelectedState);
  let cols = createGameTableHeaderRow(teesSelected);
  const getHeader = () => {
    var keys = cols;
    return keys.map((key, index)=>{
    return (
      <th
        key={index}
        scope='col'
      >
        {key}
      </th>
    )})
  }

    return (
        <>
          <tr>
            {getHeader()}
          </tr>
        </>
    );
  }

export default GameTableHeader;