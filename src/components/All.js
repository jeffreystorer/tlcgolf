import React from 'react';
import DropDowns from './DropDowns';
import GameTableHeader from './GameTableHeader';
import GameTableBody from './GameTableBody';
import LinkButton from './LinkButton';

function All() {

  return(
    <>
    <DropDowns />
    <br/><br/>
    <div id='table'>
      <table id='gametable'>
        <thead>
          <GameTableHeader />
        </thead>
        <tbody>
          <GameTableBody />
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

export default All;