import React from 'react';

const LineupTableDropDowns = ({
   playingDateOptionItems,
   linkTime,
   linkTimeOptionItems,
   handleLinkTimeChange,
   teeTimeCount,
   teeTimeCountOptionItems,
   handleTeeTimeCountChange
}) => {
  

  
/*   function handleLinkTimeChange(e){
  setLinkTime(e.target.value);
  }
  try {
    optionItems = games.map((game) =>
    <option key={game} value={game}>{game}</option>);
  } catch (error) {
    console.log(error);
  } */

 

 /*  function handleTeeTimeCountChange(e) {

  } */


  return(
    <>
  <div className='select-dropdown-container'>
    <label className='left-selector'>
      <select>
        <option value="">Playing Date</option>
        {playingDateOptionItems}
      </select>
    </label>
    <label className='middle-selector'>
      <select value={teeTimeCount} onChange={handleTeeTimeCountChange}>
        <option value="">No. of Tee Times</option>
        {teeTimeCountOptionItems}
      </select>
    </label>
    <label className='right-selector'>
      <select value={linkTime} onChange={handleLinkTimeChange}>
        <option value="">Link Time</option>
        {linkTimeOptionItems}
      </select>
    </label>
  </div>
    </>
  )
}
export default LineupTableDropDowns;
