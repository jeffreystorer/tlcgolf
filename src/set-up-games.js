import React, {createRef, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import { set, get, jset, jget} from './local-storage-functions';
import PlayerDataTable from './table-player-data';
import {useStateWithLocalStorage} from './use-state-with-local-storage';


import {fetchGoogleSheet, fetchGoogleSheetProperties} from './google-sheets-api';

function SetUpGames () {
  
  const[ghinNumber, setghinNumber] = useStateWithLocalStorage('ghinNumber');
  const buttonRef = createRef();
  const data = fetchGoogleSheet();
  console.log('data.values: ' + data)
  const properties = fetchGoogleSheetProperties();
  console.log('properties: ' + properties);
  
  //createAndSavePlayerTable(data)

  function createAndSavePlayerTable(data){
      const myPlayerRecords = data.values;
      let rowCount = myPlayerRecords.length;
      let playerTable = [];
      let i;
      for (i = 0; i < rowCount; i++){
        playerTable.push(myPlayerRecords[i].data);
      }
      set('PlayerTable', JSON.stringify(playerTable));
      setGamesAndPlayers(playerTable);
      window.location.reload(false);
  }
    //console.log('JSONData: ' + JSON.stringify(data));
    //console.log('values: ' + JSON.stringify(data.values));
    function setGamesAndPlayers(playerTable){
      playerTable[0].splice(0,5);
      playerTable[0].unshift('all');
      set('Games', JSON.stringify(playerTable[0]));
      playerTable.splice(0,1);
      set('Players', JSON.stringify(playerTable));
  }    
    return (
      <p> Working on it</p>
    )
    
}

export default SetUpGames;