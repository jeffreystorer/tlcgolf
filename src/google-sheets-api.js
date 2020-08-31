import {get} from './local-storage-functions';

export function fetchGoogleSheet() {
  const ghinNumber =get('ghinNumber');
  //const [hasGoogleSheet, setHasGoogleSheet] = useStateWithLocalStorage('hasGoogleSheet');
  const sheetId = '1GEP9S0xt1JBPLs3m0DoEOaQdwxwD8CEPFOXyxlxIKkg';
  const apiKey = 'AIzaSyB-3BsNRWZE_rYWK70jhx422iQIQg5TTU4';
  const url =  'https://sheets.googleapis.com/v4/spreadsheets/' +
               sheetId + 
               '/values/' + 
               ghinNumber + 
               "?key=" + 
               apiKey;
  fetch(url)
  .then(data=>{return data.json()})
  .then(res=>{console.log(res)})
}

export function fetchGoogleSheetProperties() {
  const sheetId = '1GEP9S0xt1JBPLs3m0DoEOaQdwxwD8CEPFOXyxlxIKkg';
  const apiKey = 'AIzaSyB-3BsNRWZE_rYWK70jhx422iQIQg5TTU4';
  const url =  'https://sheets.googleapis.com/v4/spreadsheets/' +
               sheetId + 
               '?&fields=sheets.properties' + 
               "&key=" + 
               apiKey;
  fetch(url)
  .then(data=>{return data.json()})
  .then(res=>{console.log(res)})
}