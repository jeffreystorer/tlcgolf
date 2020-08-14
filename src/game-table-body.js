import React, {Fragment} from 'react';
import createGameTableBody from './create-game-table-body.js'

function GameTableBody() {
  createGameTableBody();

    return (
        <Fragment>
                    {/* {rows.map(
                        function(row, i) {
                            return (
                            <tr key={i}>
                                <th scope='row' className='left-row-cell'>{row[0]}</th>
                                <td>{row[1]}</td>
                                <td>{row[2]}</td>
                                <td>{row[3]}</td>
                                <td>{row[4]}</td>
                                <td>{row[5]}</td>
                                <td>{row[6]}</td>
                            </tr>
                            );
                        }
                        )
                    } */}
                    
          <tr>
            <th
              className='left-row-cell-game'
              scope='row'
            >
              Storer, J. (8.3)</th>
            <td>8</td>
            <td>7</td>
            <td>5</td>
          </tr>
        </Fragment>
    );
  }

export default GameTableBody;