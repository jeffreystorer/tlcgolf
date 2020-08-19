import React, {Fragment} from 'react';
import createIndividualTableBody from './create-individual-table-body-rows.js';
import { get, jget} from './local-storage-functions';
import * as courseData from './ratings-slopes-pars'


function TSTableBody() {
  let course = get('Course');
  if (course !== null){ course = course.toLowerCase()};
  let game = get('Game');
  if (game !== null){ game = game.toLowerCase()};
  let games = jget('Games');
  let teesSelected = jget('TeesSelected');
  if ((teesSelected !== null) & (game !== null) & (course !==null) & (games !==null)) {
    if ((games.includes(game))& (courseData.courses.includes(course))) {
  const rows = createIndividualTableBody("TS");

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

export default TSTableBody;