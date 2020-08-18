import React, {Fragment} from 'react';
import createGameTableBodyRows from './create-game-table-body-rows.js';


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
                    
{/*           <tr>
            <th
              className='left-row-cell-game'
              scope='row'
            >
              Storer, J. (8.3)</th>
            <td>8</td>
            <td>7</td>
            <td>5</td>
          </tr> */}
        </Fragment>
    );
  }

export default GameTableBody;