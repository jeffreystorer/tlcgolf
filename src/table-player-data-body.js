import React, {Fragment} from 'react';
import {jget} from './local-storage-functions';

function PlayerDataTableBody() {
  let playerTable = jget("PlayerTable");
  let rows = playerTable;
  let rowsTD = [];
  let colCount = rows[0].length;

  function generateRows (){
    for (var i = 1; i <rows.length; i++){
      rowsTD[i] = (
        <tr>
          <th scope='row' className='left-header-cell'>{rows[i][0]}</th>
          <td className='lastname-col'>{rows[i][1]}</td>
          {generateCols(i)}
        </tr>
      )
    }
    return rowsTD;
  }

  function generateCols(i) {
      let tds = [];
      for (var j = 2; j < colCount; j++){
        tds[j] = (
          <td>
            {rows[i][j]}
          </td>
        )
      }
    return tds;

  }
  
  return (
      <Fragment>
        {generateRows()}
      </Fragment>
  );

}

export default PlayerDataTableBody;