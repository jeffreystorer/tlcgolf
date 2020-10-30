import React, {useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import * as state from '../state';

export default function GamesAndLineupTableDropDowns(props) {
  const [course, setCourse] = useRecoilState(state.courseState);
  const [game, setGame] = useRecoilState(state.gameState);
  const games = useRecoilValue(state.gamesState);
  
  useEffect(() => {
    setCourse(course);
  }, [course, setCourse]);

  useEffect(() => {
    setGame(game);
  }, [game, setGame]);
  let optionItems;
  

  function handleCourseChange(e){
    setCourse(e.target.value);
    }
  
  function handleGameChange(e){
  setGame(e.target.value);

  }
  try {
    optionItems = games.map((game) =>
    <option key={game} value={game}>{game}</option>);
  } catch (error) {
    console.log(error);
  }


  return(
    <>
  <div className='select-dropdown-container'>
    <label className='left-selector'>
      {props.table === "Lineup"
        ? <select value={game} onChange={handleGameChange} disabled>
        <option value="">Select Game</option>
        {optionItems}
      </select>
      : <select value={game} onChange={handleGameChange}>
        <option value="">Select Game</option>
        {optionItems}
      </select>}
    </label>
    <label className='right-selector'>
      <select value={course} onChange={handleCourseChange}>
        <option value="">Select Course</option>
        <option value="dc">Deer Creek</option>
        <option value="mg">Magnolia</option>
        <option value="mw">Marshwood</option>
        <option value="ok">Oakridge</option>
        <option value="pa">Palmetto</option>
        <option value="tp">Terrapin Point</option>
      </select>
    </label>
  </div>
    </>
  )
}

