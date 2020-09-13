import {set} from './localStorage';

function fetchGoogleSheet (ghinNumber) {
  const sheetId = process.env.REACT_APP_GOOGLE_SHEETS_ID;
  const apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY

  const sheetValues =  'https://sheets.googleapis.com/v4/spreadsheets/' +
               sheetId + 
               '/values/' + 
               ghinNumber + 
               "?key=" + 
               apiKey;

  fetch(sheetValues)
    .then((response) => response.json())
    .then(data => (createPlayersAndGames(data.values)))

}

function createPlayersAndGames (values) {
  console.log('values: ' + JSON.stringify(values));

  function createAndSavePlayerTable(){
    let rowCount = values.length;
    
    let playerTable = [];
    let i;
    for (i = 0; i < rowCount; i++){
      playerTable.push(values[i]);
    }
    //set('playerTable', JSON.stringify(playerTable));
    setGamesAndPlayers(playerTable);
  }
  function setGamesAndPlayers(playerTable){    
    playerTable[0].splice(0,2);
    playerTable[0].unshift('All');
    set('games', playerTable[0]);
    playerTable.splice(0,1);
    addFirstNameIndexGenderCols(playerTable);
    set('players', playerTable);
  }

  function addFirstNameIndexGenderCols(playerTable){
    let i;
    for (i = 0; i < playerTable.length; i++) {
      playerTable[i].splice(2,0, "", "", "");
    }
  }
  createAndSavePlayerTable();
}

export default fetchGoogleSheet;