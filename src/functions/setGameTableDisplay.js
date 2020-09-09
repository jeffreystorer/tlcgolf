import {get} from './localStorage';
import * as courseData from '../data';

const setGameTableDisplay = () => {
  const course = get('course');
  const game = get("game");  

//We are only going to display this table if the golfer is logged in
//and has selected at least one set of tees and has set up his games.

//If the golfer has done that but not selected a game and a course,
//we are not going to display the table body or header

  let hasGoogleSheet = get('hasGoogleSheet');
  let games = get('games');
  let myCourse;
  if (course !== null){ myCourse = course.toLowerCase()};
  let myGame;
  if (game !== null){ myGame = game};
  let displayNumber;
  
  //now we decide what to display
  //we test games to see if he has set up his games
  if (hasGoogleSheet === 'true') {

    //we can display at least the dropdowns
    displayNumber = 1;

    //golfer has logged in, selected tees, and set up his games
    //Now decide whether to dispay just the game and course
    //selectors or the entire table
    if (
      (myCourse !== null) &
      (myGame !== null) &
      (games.includes(myGame)) &
      (courseData.courses.includes(myCourse))
      ) {
        //we can display everything        
          displayNumber = 2;
        }
  } else {
      displayNumber = 0;
  }
  console.log('displayNumber: ' + displayNumber);
  return displayNumber;
}

export default setGameTableDisplay;