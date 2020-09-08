import React from 'react';
import DropDowns from './DropDowns';

function All() {
  return(
    <>
    <DropDowns />
    <p>All</p>
    </>
  )
}

export default All;

/* All = 
        <>
          {<DropDowns />}
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
        ; */