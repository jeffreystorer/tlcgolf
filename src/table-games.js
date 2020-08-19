import React, {Fragment, useState} from 'react';
import './App.css';
import GameTableHeader from './table-games-header';
import GameTableBody from './table-games-body';
import { set, get, jget} from './local-storage-functions';
import * as courseData from './ratings-slopes-pars';


function GameTable() {
  const [courseValue, setCourseValue] = useState("Select Course");
  const [gameValue, setGameValue] = useState("Select Game");

  function handleCourseChange(e){
  setCourseValue(e.target.value);
  set('Course', e.target.value);
  }

  function handleGameChange(e){
  setGameValue(e.target.value);
  set('Game', e.target.value);
  }

//We are only going to display this table if the golfer is logged in
//and has selected at least one set of tees and has set up his games.

//If the golfer has done that but not selected a game and a course,
//we are not going to display the table body or header

  let isLoggedIn = get('IsLoggedIn');
  let teesSelected = jget('TeesSelected');
  let games = jget('Games');
  let course = get('Course');
  if (course !== null){ course = course.toLowerCase()};
  let game = get('Game');
  if (game !== null){ game = game.toLowerCase()};
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
      (course !== null) &
      (game !== null) &
      (games.includes(game)) &
      (courseData.courses.includes(course))
      ) {
        //we can display everything
      return (
        <Fragment>
          <div className='select-dropdown-container'>
            <label className='left-selector'>
              <select value={gameValue} onChange={handleGameChange}>
                <option value="">Select Game</option>
                <option value="All">All</option>
                <option value="Monday">Monday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </label>
            <label className='right-selector'>
              <select value={courseValue} onChange={handleCourseChange}>
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
                <GameTableBody />
              </tbody>
            </table>
          </div>
        </Fragment>
      ); 
        } else {
        //otherwise we display on the game and course selectors
      return (
        <Fragment>
          <div className='select-dropdown-container'>
            <label className='left-selector'>
              <select value={gameValue} onChange={handleGameChange}>
                <option value="">Select Game</option>
                <option value="All">All</option>
                <option value="Monday">Monday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </label>
            <label className='right-selector'>
              <select value={courseValue} onChange={handleCourseChange}>
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