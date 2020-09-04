import {useEffect} from 'react';
import {get, jset} from './local-storage-functions';

function FetchGoogleSheets() {
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
  let requests = [fetch(sheetValues), fetch(sheetProperties)];

  useEffect(() => {
    Promise.all(requests).then(function (responses) {
      // Get a JSON object from each of the responses
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    }).then(function (data) {
      processSVData(data[0]);
      processSPData(data[1]);
    }).catch(function (error) {
      // if there's an error, log it
      console.log(error);
    });

  function processSVData(data) {
    jset('googleSheetValues', data);
  };

  function processSPData(data){
    jset('googleSheetProperties', data);
  }
  return () => {
    //cleanup
  }
}, [requests])

return null;
}
export default FetchGoogleSheets;