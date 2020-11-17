import * as courseData from '../data';
//import {get} from '../functions/localStorage';

export default function getLineupTableDisplayNumber(course, game, games, hasGoogleSheet) {
  ///let playersInLineup = get('playersInLineup')

  let displayNumber;
  
  
  if (hasGoogleSheet === 'true') {
    displayNumber = 1;
    alert('game='+game+" games=" + games)
    if ((games.includes(game)) &&
        (courseData.courses.includes(course))
        ) {
            displayNumber = 2;
          }
    } else {
        displayNumber = 0;
    }
  return displayNumber;
}