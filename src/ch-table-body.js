import React, {Fragment} from 'react';
import createIndividualTableBodyRows from './create-individual-table-body-rows.js'
import * as courseData from './ratings-slopes-pars'
import {get, jget} from './local-storage-functions'

function CHTableBody() {
  
  let course = get('Course');
  if (course !== null){ course = course.toLowerCase()};
  let game = get('Game');
  if (game !== null){ game = game.toLowerCase()};
  let games = jget('Games');
  let teesSelected = jget('TeesSelected');
  if ((teesSelected !== null) & (game !== null) & (course !==null) & (games !==null)) {
    if ((games.includes(game))& (courseData.courses.includes(course))) {
  const rows = createIndividualTableBodyRows("CH");

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
} else {
  return null
}
}

export default CHTableBody;