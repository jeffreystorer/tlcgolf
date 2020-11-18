import * as courseData from '../data';
import {get} from '../functions/localStorage';

export default function getLineupTableDisplayNumber(course, game, games, hasGoogleSheet) {
  let playersInLineup = get('playersInLineup');
  let savedGame = get('game');
let displayNumber;
if (hasGoogleSheet === 'true') {
  displayNumber = 1;
  if ((playersInLineup) &&
  (games.includes(game)) &&
  (courseData.courses.includes(course)) &&
  (game === savedGame)
  ) 
  {
    displayNumber = 2;
  }else {
      displayNumber = 0;
  }
}
return displayNumber;
}