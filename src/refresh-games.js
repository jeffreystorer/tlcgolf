//import { useEffect } from 'react';
import {get, jset} from './local-storage-functions';
import {createPlayerTableGamesPlayers} from './create-playertable-games-players';
import {requestGHIN} from './request-ghin';

function RefreshGames () {
  const ghinNumber = get('ghinNumber');
  const sheetId = '1GEP9S0xt1JBPLs3m0DoEOaQdwxwD8CEPFOXyxlxIKkg';
  const apiKey = 'AIzaSyB-3BsNRWZE_rYWK70jhx422iQIQg5TTU4';

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