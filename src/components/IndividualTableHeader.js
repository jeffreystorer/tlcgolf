import React from 'react';

function IndividualTableHeader({tableName}) {
    return (
    <>
        <tr>
            <th
                scope='col'
                className='left-header-cell'
            >
            <div className='center'>{tableName}</div>  
            </th>
            <th scope='col'>DC</th>
            <th scope='col'>MG</th>
            <th scope='col'>MW</th>
            <th scope='col'>OK</th>
            <th scope='col'>PA</th>
            <th scope='col'>TP</th>
        </tr>
    </>
    )
}
export default IndividualTableHeader;