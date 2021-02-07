import {set} from './localStorage';

function setSheetURL (ghinNumber) {
  let sheetURL;
  const sheetId = process.env.REACT_APP_GOOGLE_SHEETS_ID;
  const apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;

  const sheetProperties =  'https://sheets.googleapis.com/v4/spreadsheets/' +
              sheetId + 
              '?fields=sheets.properties&key=' +
              apiKey;

  var json= XMLHttpRequest.responseType;

  var request = new XMLHttpRequest();
  request.responseType = json;
  request.open('GET', sheetProperties, false);  // `false` makes the request synchronous
  request.send(null);

  if (request.status === 200) {
    const data =JSON.parse(request.response);
    processSPData(data);
    };

/*   fetch(sheetProperties)
    .then((response) => response.json())
    .then(data => (processSPData(data))) */


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

    } else {
    set('hasGoogleSheet', "false");
    set('players', "[]");
    set('games', "[]");
    sheetURL = baseURL;
    }
    set('sheetURL', sheetURL)
  };
  
}

export default setSheetURL;