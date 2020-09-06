//import { useEffect } from 'react';
import {get, jset} from './local-storage-functions';
import {createPlayerTableGamesPlayers} from './create-playertable-games-players';
import {requestGHIN} from './request-ghin';

function RefreshGames () {
  const ghinNumber = get('ghinNumber');
  const sheetId = '1GEP9S0xt1JBPLs3m0DoEOaQdwxwD8CEPFOXyxlxIKkg';
  //const apiKey = 'AIzaSyBv9b9QHzt1UY5K8xEGQf1JaPimhuonGmo';
  const apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY

  const sheetValues =  'https://sheets.googleapis.com/v4/spreadsheets/' +
               sheetId + 
               '/values/' + 
               ghinNumber + 
               "?key=" + 
               apiKey;

  //useEffect(() => {
    fetch(sheetValues)
      .then((response) => response.json())
      .then(data => (processSVData(data)))
    //}, [sheetValues])

  function processSVData(data) {
    jset('googleSheetValues', data);
    createPlayerTableGamesPlayers();
    requestGHIN();
  };
  return null
}
export default RefreshGames;