import React, {Fragment} from 'react';
import './App.css';
import PlayerDataTableHeader from './table-player-data-header';
import PlayerDataTableBody from './table-player-data-body';
import {get} from './local-storage-functions';
import {useStateWithLocalStorage} from './use-state-with-local-storage';


function PlayerDataTable() {
  const [golfer, setGolfer] = useStateWithLocalStorage('Golfer');
  const [ghinNumber, setghinNumber] = useStateWithLocalStorage('ghinNumber');
  let playerName = golfer + " (" + ghinNumber + ")";
      return (
        <Fragment>
          <div id='table'>
            <table id='playertable'>
              <caption>Player Data for {playerName}</caption>    
              <thead>
                <PlayerDataTableHeader />
              </thead>
              <tbody>
                <PlayerDataTableBody />
              </tbody>
            </table>
          </div>
        </Fragment>
      );
}

export default PlayerDataTable;