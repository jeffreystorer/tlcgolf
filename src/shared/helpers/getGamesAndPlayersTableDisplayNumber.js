import * as courseData from "../data"

export default function getGamesAndPlayersTableDisplayNumber(
  course,
  game,
  games,
  hasGoogleSheet
) {
  //We are only going to display this table if the golfer is logged in
  //and has selected at least one set of tees and has set up his games.

  //If the golfer has done that but not selected a game and a course,
  //we are not going to display the table body or header

  let displayNumber

  //now we decide what to display
  //we test games to see if he has set up his games
  if (hasGoogleSheet === "true") {
    //we can display at least the dropdowns
    displayNumber = 1

    //golfer has logged in, selected tees, and set up his games
    //Now decide whether to dispay just the game and course
    //selectors or the entire table
    if (games.includes(game) && courseData.courses.includes(course)) {
      //we can display everything
      displayNumber = 2
    }
  } else {
    displayNumber = 0
  }
  return displayNumber
}
