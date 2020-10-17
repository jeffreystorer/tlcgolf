import React from 'react';

const LineupTableDropDowns = ({
   playingDateOptionItems,
   linkTime,
   linkTimeOptionItems,
   handleLinkTimeChange,
   teeTimeCount,
   playingDate,
   teeTimeCountOptionItems,
   handlePlayingDateChange,
   handleTeeTimeCountChange,
   progs,
   handleProgsChange
}) => {

  return(
    <>
  <div className='select-dropdown-container'>
    <label className='left-selector'>
      <select value={playingDate} onChange={handlePlayingDateChange}>
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
  
  <div className='select-dropdown-container'>
    <label className='lone-selector'>
      <select value={progs} onChange={handleProgsChange}>
        <option value="">Progs</option>
        <option value="0">No Progs</option>
        <option value="6">Progs 6/6/6</option>
        <option value="9">Progs 9&9</option>

      </select>
    </label>
  </div>
    </>
  )
}
export default LineupTableDropDowns;
