import React, {useEffect} from 'react';
import '../styles/App.css';
import { set, get, } from '../functions/localStorage';
import * as courseData from '../data';
import {useStateWithLocalStorage} from '../functions/localStorage';
import All from './All';
import Create from './Create';
import DropDowns from './DropDowns';

function GameTable() {
  const [course, setCourse] = useStateWithLocalStorage("course");
  const [game, setGame] = useStateWithLocalStorage("game");
  
  useEffect(() => {
    set('course', course);
  }, [course]);

  useEffect(() => {
    set('game', game);
  }, [game]);

  function handleCourseChange(e){
  setCourse(e.target.value);
  }

  function handleGameChange(e){
  setGame(e.target.value);
  }

  

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
  let displayCreate = false;
  let displayOnlyDropDowns = false;
  let displayAll = false;
  
  //now we decide what to display
  //we test games to see if he has set up his games
  if (hasGoogleSheet === 'true') {

    displayOnlyDropDowns = true;

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
        
          displayAll = true
          displayOnlyDropDowns = false;
      }
  } else {
      displayCreate = true;
      };

  return (
      <>
      {displayOnlyDropDowns && <DropDowns />}
      {displayAll && <All />}
      {displayCreate && <Create />}
      </>
    )

}

export default GameTable;