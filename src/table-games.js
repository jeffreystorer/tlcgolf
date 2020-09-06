import React, {useEffect} from 'react';
import './App.css';
import GameTableHeader from './table-games-header';
import GameTableBody from './table-games-body';
import { set, get, jget} from './local-storage-functions';
import * as courseData from './ratings-slopes-pars';
import {useStateWithLocalStorage} from './use-state-with-local-storage';
import {SetCreateGames} from './set-create-or-edit-games';
import {SetEditGames} from './set-create-or-edit-games';

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

  let isLoggedIn = get('isLoggedIn');
  let hasGoogleSheet = get('hasGoogleSheet')
  let teesSelected = jget('teesSelected');
  let games = jget('games');
  let myCourse;
  if (course !== null){ myCourse = course.toLowerCase()};
  let myGame;
  if (game !== null){ myGame = game};
  let displayCreate = false;
  let displayDropDowns = false;
  let displayAll = false;
  let Create;
  let All;
  let DropDowns;
  
  //now we decide what to display
  if (
    //we see if he has logged in and selected tees
    (isLoggedIn === 'true') &
    (teesSelected !== null) &
    (teesSelected !== []) &
    //we test games to see if he has set up his games
    (hasGoogleSheet === 'true')
  ) 
  {
    //RefreshGames();
    //first we create the tables of players and games
    //createPlayerTableGamesPlayers();
    //build list of games
    let optionItems;
    try {
      optionItems = games.map((game) =>
      <option key={game} value={game}>{game}</option>);
    } catch (error) {
      console.log(error);
    }
    DropDowns = (
    <>
    <SetEditGames /><br></br>
      <div className='select-dropdown-container'>
        <label className='left-selector'>
          <select value={game} onChange={handleGameChange}>
            <option value="">Select Game</option>
            {optionItems}
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
      </>);
      displayDropDowns = true;
    }

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
        All = (
          <>      
          <DropDowns />
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
          </>
        );
          displayAll = true;
      }

      if (hasGoogleSheet === "false"){
          Create = (
            <>
              <br/>
              <br/>
              <SetCreateGames />
            </>
          );
          displayCreate = true;
      }

    return (
      <>
      {displayCreate && <Create />}
      {displayAll && <All />}
      {displayDropDowns && <DropDowns />}
      </>
    )
}

export default GameTable;