//import { useEffect } from 'react';
import {get, set} from './localStorage';

function refreshGames () {
  const ghinNumber = get('ghinNumber');  
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
    .then(data => (processSVData(data)))

  function processSVData(data) {
    set('googleSheetValues', data);
    createPlayersAndGames();
    requestGHIN();
  };
}

export function createPlayersAndGames () {


  function createAndSavePlayerTable(){
    const myPlayerRecords = get('googleSheetValues').values;
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

  let valuesArray  = get('googleSheetValues');
  let playerData;
  try {
    playerData = valuesArray.values;
  } catch (error) {
    window.location.reload(false);
  }
  createAndSavePlayerTable(playerData);
}

export function requestGHIN() {
  let requests = [];
  let players = get("players");
  players.forEach(buildRequests);

  Promise.all(requests).then(function (responses) {
    // Get a JSON object from each of the responses
    return Promise.all(responses.map(function (response) {
      return response.json();
    }));
  }).then(function (data) {
    set('ghinData', data);
    addGHINDataToPlayers();
  }).catch(function (error) {
    // if there's an error, log it
    console.log(error);
  });
  function addGHINDataToPlayers() {
    players.forEach(addData);
    function addData(item, index) {
      let data = get('ghinData');
      try {
      item[2] =  data[index].golfers[0].FirstName;
    } catch (error){
      item[2] = 'BAD PLAYER';
      item[3] = '-.-'
      return
    };
      item[3] = data[index].golfers[0].Value;
      item[4] = data[index].golfers[0].Gender;
    }
    set("players", players);
}

  function buildRequests(item, index) {
    let ghinNumber = item[0];
    let lastName = item[1];
    let ghinRequest = 'https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=' + ghinNumber + '&lastName=' + lastName + '&incllsudeLowHandicapIndex=true';
    requests = [...requests, fetch(ghinRequest)];
    

  }
}
export default refreshGames;