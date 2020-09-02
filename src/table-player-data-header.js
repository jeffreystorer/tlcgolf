import React, {Fragment} from 'react';
import {jget} from './local-storage-functions'


function PlayerDataTableHeader() {
  let playerTable = jget("playerTable");
  let cols = playerTable[0];
  function getHeader() {
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
        <Fragment>
          <tr>
            {getHeader()}
          </tr>
        </Fragment>
    );
  }
  

export default PlayerDataTableHeader;