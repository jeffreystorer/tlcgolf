import fetchGoogleSheet from './fetchGoogleSheet';
import {set} from './localStorage';

function setSheetURL (ghinNumber) {
  let sheetURL;
  const sheetId = process.env.REACT_APP_GOOGLE_SHEETS_ID;
  const apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;

  const sheetProperties =  'https://sheets.googleapis.com/v4/spreadsheets/' +
              sheetId + 
              '?fields=sheets.properties&key=' +
              apiKey;

  fetch(sheetProperties)
    .then((response) => response.json())
    .then(data => (processSPData(data)))


  function processSPData(data){
    let propertyArray;
    let propertyIndex;
    try { 
      propertyArray = data.sheets
      propertyIndex = propertyArray.findIndex(x => x.properties.title === ghinNumber)
    } catch (err) {
      console.log(err);
    }
    let baseURL = 'https://docs.google.com/spreadsheets/d/' + sheetId;
    if (propertyIndex > -1) {
    set('hasGoogleSheet', "true")
    let sheetGid = propertyArray[propertyIndex].properties.sheetId
    sheetURL= baseURL + '/edit#gid=' + sheetGid;
    fetchGoogleSheet(ghinNumber);

    } else {
    set('hasGoogleSheet', "false");
    set('players', "[]");
    set('games', "[]");
    set('ghinData', "[]");
    sheetURL = baseURL;
    }
    set('sheetURL', sheetURL)
  };
  
}

export default setSheetURL;