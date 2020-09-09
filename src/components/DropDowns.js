import React, {useEffect} from 'react';
import {get, set, useStateWithLocalStorage} from '../functions/localStorage';

function DropDowns() {
  const [course, setCourse] = useStateWithLocalStorage("course");
  const [game, setGame] = useStateWithLocalStorage("game");
  let games = get('games');
  
  useEffect(() => {
    set('course', course);
  }, [course]);

  useEffect(() => {
    set('game', game);
  }, [game]);
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
    <><div>
    <div className='link-center'>
      <a href={get('sheetURL')}>Click Here to Edit Your Table</a>
    </div>
    <br></br>
  </div>
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
    </>
  )
}

export default DropDowns;


/* let optionItems;
try {
  optionItems = games.map((game) =>
  <option key={game} value={game}>{game}</option>);
} catch (error) {
  console.log(error);
}

DropDowns = 
      <>
      <div>
        <EditGames url={get('sheetURL')}/>
        <br></br>
      </div>
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
      </>
      ; */