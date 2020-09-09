import React from 'react';
import '../styles/App.css';
import All from './All';
import Create from './Create';
import DropDowns from './DropDowns';
import setGameTableDisplay from '../functions/setGameTableDisplay';
import {get} from '../functions/localStorage';

function GameTable() {
  const course = get('course');
  const game = get('game');
  const displayNumber = setGameTableDisplay();

  switch (displayNumber) {
    case 1:
      return(
        <>
          <DropDowns />
        </>
      )
    case 2:
        return(
          <>
            <All course={course} game={game}/>
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