import {set, jget} from './local-storage-functions';

export function createPlayerTableGamesPlayers () {

  function createAndSavePlayerTable(data){
    console.log('creating Player Table with data: ' + data);
    const myPlayerRecords = data;
    let rowCount = myPlayerRecords.length;
    
    let playerTable = [];
    let i;
    for (i = 0; i < rowCount; i++){
      playerTable.push(myPlayerRecords[i]);
    }
    set('playerTable', JSON.stringify(playerTable));
    setGamesAndPlayers(playerTable);
    window.location.reload(false);
}
  function setGamesAndPlayers(playerTable){    
    playerTable[0].splice(0,2);
    playerTable[0].unshift('all');
    set('games', JSON.stringify(playerTable[0]));
    playerTable.splice(0,1);
    set('players', JSON.stringify(playerTable));
} 

let valuesArray  = jget('googleSheetValues');
let playerData = JSON.stringify(valuesArray.values);
console.log('playerData: ' + playerData);
createAndSavePlayerTable(JSON.parse(playerData));
}