import React from 'react';
import GamesTableDropDowns from './GamesTableDropDowns';
import GamesTableHeader from './GamesTableHeader';
import GamesTableBody from './GamesTableBody';
import LinkButton from './LinkButton';

export default function GamesTableAll() {

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
          <GamesTableBody />
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

