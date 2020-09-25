//import {set} from './localStorage';

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
 const mratings = [dcmrating,mgmrating, mwmrating, okmrating, pamrating, tpmrating];
 const mslopes = [dcmslope,mgmslope, mwmslope, okmslope, pamslope, tpmslope];
 const mpars = [dcmpar, mgmpar, mwmpar, okmpar,pampar, tpmpar];
 const wratings = [dcwrating,mgwrating, mwwrating, okwrating, pawrating, tpwrating];
 const wslopes = [dcwslope,mgwslope, mwwslope, okwslope, pawslope, tpwslope];
 const wpars = [dcwpar, mgwpar, mwwpar, okwpar,pawpar, tpwpar];
 
 const ratings = [mratings, wratings];
 const slopes = [mslopes, wslopes];
 const pars = [mpars, wpars];

function fetchCourseData () {
  const sheetId = process.env.REACT_APP_GOOGLE_SHEETS_ID;
  const apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY
  const sheet = 'Course_Data';  
  
  


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
      }
    }

 return [ratings, slopes, pars]

  function createCourseDataArrays (values) {
    let courseDataItems = [dcmrating,mgmrating, mwmrating, okmrating, pamrating, tpmrating, dcmslope,mgmslope, mwmslope, okmslope, pamslope, tpmslope, dcmpar, mgmpar, mwmpar, okmpar,pampar, tpmpar, dcwrating,mgwrating, mwwrating, okwrating, pawrating, tpwrating, dcwslope,mgwslope, mwwslope, okwslope, pawslope, tpwslope, dcwpar, mgwpar, mwwpar, okwpar,pawpar, tpwpar];
    let i;
    for (i = 1; i < 38; i++) {
      courseDataItems[i-1] = values[1].splice(0,1)
      console.log('courseDataItem '+ i-1 + ": "+ courseDataItems[i-1])
    }
  }
}

export default fetchCourseData;