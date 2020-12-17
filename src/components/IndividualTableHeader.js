import React from 'react';

function IndividualTableHeader({tableName}) {
    return (
    <>
        <tr className='individual-header-row'>
            <th
                scope='col'
                className='individual-left-header-cell'
            >
            <div className='center'>{tableName}</div>  
            </th>
            <th className='individual-other-header-cell' scope='col'>DC</th>
            <th className='individual-other-header-cell' scope='col'>MG</th>
            <th className='individual-other-header-cell' scope='col'>MW</th>
            <th className='individual-other-header-cell' scope='col'>OR</th>
            <th className='individual-other-header-cell' scope='col'>PA</th>
            <th className='individual-other-header-cell' scope='col'>TP</th>
        </tr>
    </>
    )
}
export default IndividualTableHeader;