import React, {Fragment} from 'react';
import CreateGameTableBodyRows from './table-games-create-body-rows.js';

const GameTableBody = ({ course, game}) => {  
  
  let rows = CreateGameTableBodyRows(course, game);
  let rowsTD = [];
  let colCount = rows[0].length;

  function generateRows (){
    for (var i = 0; i <rows.length; i++){
      rowsTD[i] = (
        <tr key={i}>
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
          <td key={j}>
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