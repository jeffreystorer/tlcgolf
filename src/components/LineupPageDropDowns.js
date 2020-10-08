import React from 'react';

export default function LineupPageDropDowns() {
  

  function handlePlayingDateChange(e){
    setPlayingDate(e.target.value);
    }
  
  function handleLinkTimeChange(e){
  setLinkTime(e.target.value);
  }
  try {
    optionItems = games.map((game) =>
    <option key={game} value={game}>{game}</option>);
  } catch (error) {
    console.log(error);
  }

  function handleTeeTimeCountChange(e) {

  }


  return(
    <>
  <div className='select-dropdown-container'>
    <label className='left-selector'>
      <select value={playingDate} onChange={handlePlayingDateChange}>
        <option value="">Playing Date</option>
        {optionItems}
      </select>
    </label>
    <label className='middle-selector'>
      <select value={linkTime} onChange={handleLinkTimeChange}>
        <option value="">Link Time</option>
        {optionItems}
      </select>
    </label>
    <label className='right-selector'>
      <select value={teeTimeCount} onChange={handleTeeTimeCountChange}>
        <option value="">No. of Tee Times</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </select>
    </label>
  </div>
    </>
  )
}

