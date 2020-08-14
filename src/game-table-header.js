import React, {Fragment} from 'react';
import createGameTableHeader from './create-game-table-header.js'

function GameTableHeader() {
  let cols = createGameTableHeader();
  function getHeader() {
    var keys = cols;
    return keys.map((key, index)=>{
    return (
      <th key={index}>
        {key.toUpperCase()}
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