import React, {Fragment} from 'react';
import createGameTableBodyRows from './table-games-create-body-rows.js';

function GameTableBody() {
  let rows = createGameTableBodyRows();
  console.log('rows: ' + JSON.stringify(rows));
  let rowsTD = [];
  let colCount = rows[0].length;
  console.log('colCount: ' + colCount)

  function generateRows (){
    for (var i = 0; i <rows.length; i++){
      rowsTD[i] = (
        <tr>
          <th scope='row' className="left-row-cell-game">{rows[i][0]}</th>
          {generateCols(i)}
        </tr>
      )
    }
    return rowsTD;
  }

  function generateCols(i) {
      let tds = [];
      for (var j = 1; j < colCount; j++){
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

export default GameTableBody;