import React from 'react';
import createIndividualTableBodyRows from '../functions/createIndividualTableBodyRows'

const CHTableBody = props => {
  const rows = createIndividualTableBodyRows("CH", props.index, props.gender, props.teesSelected, props.ratings, props.slopes, props.pars);


  return (
      <>
                  {rows.map(
                      function(row, i) {
                          return (
                          <tr key={i}>
                              <td className='individual-left-row-cell'>{row[0]}</td>
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

export default CHTableBody;