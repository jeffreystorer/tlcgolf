import * as courseData from '../data';
import {get} from '../functions/localStorage';

export default function getLineupTableDisplayNumber() {
  let playersInLineup = get('playersInLineup');
  let game = get('game');
  let games = get('games');
  let course = get('course');
  let displayNumber;  
  displayNumber = 1;
  if ((playersInLineup) &&
      (games.includes(game)) &&
      (courseData.courses.includes(course))
      ) 
    {
      displayNumber = 2;
    }
return displayNumber;
}