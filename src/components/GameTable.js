import React from 'react';
import '../styles/App.css';
import All from './All';
import Create from './Create';
import DropDowns from './DropDowns';
import SetGameTableDisplay from './SetGameTableDisplay';
import LinkButton from './LinkButton';

function GameTable() {
  const displayNumber = SetGameTableDisplay();

  switch (displayNumber) {
    case 1:
      return(
        <>
          <DropDowns />
          <br></br>
          <br></br>
          <br></br>
          <LinkButton title={'Edit Table'} />
        </>
      )
    case 2:
        return(
          <>
            <All />
          </>
        )
    default:
      return(
        <>
          <Create />
        </>
      )
  }

}

export default GameTable;