import React, {Fragment} from 'react';
import createTableBody from './table-body.js'

function TSTableBody() {
  const rows = createTableBody("TS");

    return (
        <Fragment>
                    {rows.map(
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
                    }
        </Fragment>
    );
  }

export default TSTableBody;