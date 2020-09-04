import {set, jget} from './local-storage-functions';

export function createPlayerTableGamesPlayers () {
  

  function createAndSavePlayerTable(data){
    const myPlayerRecords = JSON.parse(data);
    let rowCount = myPlayerRecords.length;
    
    let playerTable = [];
    let i;
    for (i = 0; i < rowCount; i++){
      playerTable.push(myPlayerRecords[i]);
    }
    set('playerTable', JSON.stringify(playerTable));
    setGamesAndPlayers(playerTable);
}
  function setGamesAndPlayers(playerTable){    
    playerTable[0].splice(0,2);
    playerTable[0].unshift('All');
    set('games', JSON.stringify(playerTable[0]));
    playerTable.splice(0,1);
    addFirstNameIndexGenderCols(playerTable);
    set('players', JSON.stringify(playerTable));
}

  function addFirstNameIndexGenderCols(playerTable){
    let i;
    for (i = 0; i < playerTable.length; i++) {
      playerTable[i].splice(2,0, "", "", "");
    }
  }

let valuesArray  = jget('googleSheetValues');
let playerData = JSON.stringify(valuesArray.values);
createAndSavePlayerTable(playerData);
}