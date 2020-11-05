import React from 'react';
import GamesTableDropDowns from './GamesAndLineupTableDropDowns';
import GamesTableHeader from './GamesTableHeader';
import GamesTableBody from './GamesTableBody';
import LinkButton from './LinkButton';
import ButtonDownloadScreenShot from './ButtonDownloadScreenshot';

export default function GamesTableAll({
  ratings, 
  slopes, 
  pars, 
  game, 
  course,
  handleShowLocalNumbersChange,
  showLocalNumbers}) {

  return(
    <>
    <GamesTableDropDowns table="Games" />
    <br/><br/>
      <table id='games-table'>
    <div id='games-table-div'>
        <caption>{game} at {course.toUpperCase()}</caption>
        <thead>
          <GamesTableHeader />
        </thead>
        <tbody>
          <GamesTableBody ratings={ratings} slopes={slopes} pars={pars}/>
        </tbody>
    </div>
      </table>
          <br></br>
          <br></br>
          <br></br>
    <LinkButton title={'Edit Table'} />
    <br></br><br></br>
    <div className='center'>
    <ButtonDownloadScreenShot game={game} course={course} element='games-table-div' format="PNG" page="Games" /><br></br><br></br>
    <input type='checkbox' id='showLocalNumbers'onChange={handleShowLocalNumbersChange} defaultChecked={showLocalNumbers}></input>
    <label htmlFor='showLocalNumbers'>Show Local Numbers</label>
    </div>
    </>
  )
}

