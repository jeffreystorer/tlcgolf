import React from 'react';
import createIndividualTableBodyRows from '../functions/createIndividualTableBodyRows';

const TSTableBody = props => {
    const rows = createIndividualTableBodyRows("TS", props.index, props.gender, props.teesSelected);
    return (
        <>
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
        </>
    );
}

export default TSTableBody;