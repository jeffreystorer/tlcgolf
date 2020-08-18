import React, {Fragment, useState} from 'react';
import './App.css';
import GameTableHeader from './game-table-header';
import GameTableBody from './game-table-body';
import { set, get, jget, jset } from './local-storage-functions';


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
}

export default GameTable;