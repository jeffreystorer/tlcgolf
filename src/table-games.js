import React, {Fragment, useEffect} from 'react';
import './App.css';
import GameTableHeader from './table-games-header';
import GameTableBody from './table-games-body';
import { set, get, jget} from './local-storage-functions';
import * as courseData from './ratings-slopes-pars';
import {useStateWithLocalStorage} from './use-state-with-local-storage';


function GameTable() {
  const [course, setCourse] = useStateWithLocalStorage("Course");
  const [game, setGame] = useStateWithLocalStorage("Game");

  useEffect(() => {
    set('Course', course);
  }, [course]);

  useEffect(() => {
    set('Game', game);
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

  let isLoggedIn = get('IsLoggedIn');
  let teesSelected = jget('TeesSelected');
  let games = jget('Games');
  let myCourse;
  if (course !== null){ myCourse = course.toLowerCase()};
  let myGame;
  if (game !== null){ myGame = game.toLowerCase()};
  
  //now we decide what to display
  if (
    //we see if he has logged in and selected tees
    (isLoggedIn === 'true') &
    (teesSelected !== null) &
    (teesSelected !== []) &
    //we test games to see if he has set up his games
    (games !== null) &
    (games !== [])
  ) {
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
      return (
        <Fragment>
          <div className='select-dropdown-container'>
            <label className='left-selector'>
              <select value={game} onChange={handleGameChange}>
                <option value="">Select Game</option>
                <option value="All">All</option>
                <option value="Monday">Monday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </label>
            <label className='right-selector'>
              <select value={course} onChange={handleCourseChange}>
                <option value="">Select Course</option>
                <option value="DC">Deer Creek</option>
                <option value="MG">Magnolia</option>
                <option value="MW">Marshwood</option>
                <option value="OK">Oakridge</option>
                <option value="PA">Palmetto</option>
                <option value="TP">Terrapin Point</option>
              </select>
            </label>
          </div>
          <br/><br/>
          <div id='table'>
            <table id='gametable'>
              <thead>
                <GameTableHeader />
              </thead>
              <tbody>
                <GameTableBody course={course} game={game}/>
              </tbody>
            </table>
          </div>
        </Fragment>
      ); 
        } else {
        //otherwise we display only the game and course selectors
      return (
        <Fragment>
          <div className='select-dropdown-container'>
            <label className='left-selector'>
              <select value={game} onChange={handleGameChange}>
                <option value="">Select Game</option>
                <option value="All">All</option>
                <option value="Monday">Monday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </label>
            <label className='right-selector'>
              <select value={course} onChange={handleCourseChange}>
                <option value="">Select Course</option>
                <option value="DC">Deer Creek</option>
                <option value="MG">Magnolia</option>
                <option value="MW">Marshwood</option>
                <option value="OK">Oakridge</option>
                <option value="PA">Palmetto</option>
                <option value="TP">Terrapin Point</option>
              </select>
            </label>
          </div>
        </Fragment>
      );
     }
    } else {
        //otherwise we display instructions
      return(
        <div>
          <br/>
          <br/>
          <p className="center">
            Please go to Settings, then login, select at least one set of tees, and upload your table of games in order to display this table.
          </p>
        </div>
      );
    }
}

export default GameTable;