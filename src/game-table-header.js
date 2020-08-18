import React, {Fragment} from 'react';
import createGameTableHeaderRow from './create-game-table-header-row.js'


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
        <Fragment>
          <tr>
            {getHeader()}
          </tr>
        </Fragment>
    );
  }

export default GameTableHeader;