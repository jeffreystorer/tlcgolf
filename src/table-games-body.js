import React, {Fragment} from 'react';
import createGameTableBodyRows from './table-games-create-body-rows.js';

function GameTableBody() {
  let rows =createGameTableBodyRows();
  return (
      <Fragment>
                  {rows.map(
                      function(row, i) {
                          return (
                            <tr key={i}>
                                <th scope='row' className="left-row-cell-game">{row[0]}</th>
                                <td className="left-row-cell-game">{row[1]}</td>
                                <td className="left-row-cell-game">{row[2]}</td>
                                <td className="left-row-cell-game">{row[3]}</td>
                            </tr>
                          );
                      }
                      )
                  }
                  

      </Fragment>
  );
}

export default GameTableBody;