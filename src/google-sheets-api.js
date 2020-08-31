import useDataAPIGoogleSheets from './use-data-api-google-sheets';
import {useStateWithLocalStorage} from './use-state-with-local-storage';

export function getGoogleSheet() {
  const [ghinNumber, setGHINNumber] = useStateWithLocalStorage('ghinNumber')
  const [hasGoogleSheet, setHasGoogleSheet] = useStateWithLocalStorage('hasGoogleSheet');
  const sheetId = '1GEP9S0xt1JBPLs3m0DoEOaQdwxwD8CEPFOXyxlxIKkg';
  const apiKey = 'AIzaSyB-3BsNRWZE_rYWK70jhx422iQIQg5TTU4';
  const url =  'https://sheets.googleapis.com/v4/spreadsheets/' +
               sheetId + 
               '/values/' + 
               ghinNumber + 
               "?key=" + 
               apiKey;
   const [ {error, data}, doFetch ] = useDataAPIGoogleSheets(url, {hits:[]}, );
   console.log('url: ' + url);
   console.log('fetching google sheet');
   doFetch(url);
   console.log('error: ' + error);
   console.log('data: ' + JSON.stringify(data));
   if (error) {
     setHasGoogleSheet(false)
     return null
   } else {
     setHasGoogleSheet(true)
     return data
   }
}

export function getGoogleSheetProperties(){
  const sheetId = '1GEP9S0xt1JBPLs3m0DoEOaQdwxwD8CEPFOXyxlxIKkg';
  const apiKey = 'AIzaSyB-3BsNRWZE_rYWK70jhx422iQIQg5TTU4';
  const url =  'https://sheets.googleapis.com/v4/spreadsheets/' +
               sheetId + 
               '?&fields=sheets.properties' + 
               "&key=" + 
               apiKey;
}