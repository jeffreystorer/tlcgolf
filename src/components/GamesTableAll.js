import React from 'react';
import GamesTableDropDowns from './GamesTableDropDowns';
import GamesTableHeader from './GamesTableHeader';
import GamesTableBody from './GamesTableBody';
import LinkButton from './LinkButton';

export default function All() {

  return(
    <>
    <GamesTableDropDowns />
    <br/><br/>
    <div id='table'>
      <table id='gametable'>
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

