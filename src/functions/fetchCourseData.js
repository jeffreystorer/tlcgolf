import {set} from './localStorage';

function fetchCourseData () {
  const sheetId = process.env.REACT_APP_GOOGLE_SHEETS_ID;
  const apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY
  const sheet = 'Course_Data'

let dcmrating = []; 
let dcmslope = []; 
let dcmpar = [];
let dcwrating = []; 
let dcwslope = []; 
let dcwpar = [];
let mgmrating = []; 
let mgmslope = []; 
let mgmpar = []; 
let mgwrating = []; 
let mgwslope = []; 
let mgwpar = [];
let mwmrating = []; 
let mwmslope = []; 
let mwmpar = []; 
let mwwrating = []; 
let mwwslope = []; 
let mwwpar = [];
let okmrating = []; 
let okmslope = []; 
let okmpar = []; 
let okwrating = []; 
let okwslope = []; 
let okwpar = [];
let pamrating = []; 
let pamslope = []; 
let pampar = []; 
let pawrating = []; 
let pawslope = []; 
let pawpar = []; 
let tpmrating = []; 
let tpmslope = []; 
let tpmpar = []; 
let tpwrating = []; 
let tpwslope = []; 
let tpwpar = []; 

//Combined Arrays
let mratings = [dcmrating,mgmrating, mwmrating, okmrating, pamrating, tpmrating];
let mslopes = [dcmslope,mgmslope, mwmslope, okmslope, pamslope, tpmslope];
let mpars = [dcmpar, mgmpar, mwmpar, okmpar,pampar, tpmpar];
let wratings = [dcwrating,mgwrating, mwwrating, okwrating, pawrating, tpwrating];
let wslopes = [dcwslope,mgwslope, mwwslope, okwslope, pawslope, tpwslope];
let wpars = [dcwpar, mgwpar, mwwpar, okwpar,pawpar, tpwpar];
let courseDataItems = [];

let ratings = [mratings, wratings];
let slopes = [mslopes, wslopes];
let pars = [mpars, wpars];

let tees = ["CH", "T", "T/C", "C", "C/M", "M", "M/CRS", "LCRS", "CRS", "SCRS", "ISL", "CRS/SK", "SK"];
let courses = ["dc", "mg", "mw", "ok", "pa", "tp"]

  const sheetValues =  'https://sheets.googleapis.com/v4/spreadsheets/' +
               sheetId + 
               '/values/' + 
               sheet + 
               "?key=" + 
               apiKey;

    var request = new XMLHttpRequest();
    request.open('GET', sheetValues, false);  // `false` makes the request synchronous
    request.send(null);
  
    if (request.status === 200) {
      const data =JSON.parse(request.response);
      console.log('data');
      try {
        createCourseDataArrays(data.values);
      } catch (error){
        console.log('error: ' + error)
      };
    }

}

function createCourseDataArrays (values) {

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

export default fetchCourseData;