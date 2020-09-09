import React from 'react';
import DropDowns from './DropDowns';
import GameTableHeader from './GameTableHeader';
import GameTableBody from './GameTableBody';

function All(course, game) {
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
          <GameTableBody course={course} game={game}/>
        </tbody>
      </table>
    </div>
    </>
  )
}

export default All;