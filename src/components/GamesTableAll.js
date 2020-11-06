import React, { useState } from 'react';
import GamesTableDropDowns from './GamesAndLineupTableDropDowns';
import GamesTableHeader from './GamesTableHeader';
import GamesTableBody from './GamesTableBody';
import LinkButton from './LinkButton';
import ButtonDownloadScreenShot from './ButtonDownloadScreenshot';
import {get, set} from '../functions/localStorage';

export default function GamesTableAll({
  ratings, 
  slopes, 
  pars, 
  game, 
  course}) {
    const [showLocalNumbers, setShowLocalNumbers] = useState(get('showLocalNumbers'));


    function handleShowLocalNumbersChange(){
      set('showLocalNumbers', !showLocalNumbers);
      setShowLocalNumbers(!showLocalNumbers);
    }
  return(
    <>
    <GamesTableDropDowns table="Games" />
    <br/><br/>
    <div id='games-table-div'>
      <table id='games-table'>
        <thead>
        <tr className= 'center'>
          <th colSpan={get('teesSelected').length + 1}>
            {game} at {course.toUpperCase()}
          </th>
        </tr>
          <GamesTableHeader />
        </thead>
        <tbody>
          <GamesTableBody ratings={ratings} slopes={slopes} pars={pars}/>
        </tbody>
      </table>
    </div>
          <br></br>
          <br></br>
          <br></br>
    <LinkButton title={'Edit Table'} />
    <br></br><br></br>
    <div className='center'>
    <ButtonDownloadScreenShot game={game} course={course} element='games-table-div' format="PNG" page="Games" /><br></br><br></br>
    <input type='checkbox' id='showLocalNumbers' onChange={handleShowLocalNumbersChange} defaultChecked={showLocalNumbers}></input>
    <label htmlFor='showLocalNumbers'>Show Local Numbers</label>
    </div>
    </>
  )
}

