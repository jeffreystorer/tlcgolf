import {get, jset} from './local-storage-functions';

export function fetchGoogleSheets () {
  //jset('googleSheetProperties', {"sheets": []})
  const ghinNumber = get('ghinNumber');
  const sheetId = '1GEP9S0xt1JBPLs3m0DoEOaQdwxwD8CEPFOXyxlxIKkg';
  const apiKey = 'AIzaSyB-3BsNRWZE_rYWK70jhx422iQIQg5TTU4';

  const sheetValues =  'https://sheets.googleapis.com/v4/spreadsheets/' +
               sheetId + 
               '/values/' + 
               ghinNumber + 
               "?key=" + 
               apiKey;

  const sheetProperties =  'https://sheets.googleapis.com/v4/spreadsheets/' +
              sheetId + 
              '?fields=sheets.properties&key=' +
              apiKey;

  fetch(sheetValues)
    .then((response) => response.json())
    .then(data => (processSVData(data)))

  fetch(sheetProperties)
    .then((response) => response.json())
    .then(data => (processSPData(data)))

  function processSVData(data) {
    jset('googleSheetValues', data);
  };

  function processSPData(data){
    jset('googleSheetProperties', data);
  }
  
  return
}