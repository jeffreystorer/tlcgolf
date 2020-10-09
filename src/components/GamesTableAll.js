import React from 'react';
import GamesTableDropDowns from './GamesAndLineupTableDropDowns';
import GamesTableHeader from './GamesTableHeader';
import GamesTableBody from './GamesTableBody';
import LinkButton from './LinkButton';

export default function GamesTableAll({ratings, slopes, pars}) {

  return(
    <>
    <GamesTableDropDowns />
    <br/><br/>
    <div id='table'>
      <table id='gamestable'>
        <thead>
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
    </>
  )
}

