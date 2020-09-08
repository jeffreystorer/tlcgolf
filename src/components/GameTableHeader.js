import React from 'react';
import createGameTableHeaderRow from '../functions/createGameTableHeaderRow.js'


function GameTableHeader() {
  let cols = createGameTableHeaderRow();
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
        <>
          <tr>
            {getHeader()}
          </tr>
        </>
    );
  }

export default GameTableHeader;