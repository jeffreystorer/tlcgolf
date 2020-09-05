import React, {useState, useEffect} from 'react';
import {get, set, jset} from './local-storage-functions';
import {createPlayerTableGamesPlayers} from './create-playertable-games-players';
import {requestGHIN} from './request-ghin';

function EditGames () {
  //const [sheetURL, setSheetURL] = useState();
  let editSheet;
  let createSheet;
  let sheetURL;
  const [editOrCreate, setEditOrCreate] = useState();
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

  useEffect(() => {
    fetch(sheetValues)
      .then((response) => response.json())
      .then(data => (processSVData(data)))
    }, [sheetValues])

  useEffect(() => {
    fetch(sheetProperties)
      .then((response) => response.json())
      .then(data => (processSPData(data)))
      //eslint-disable-next-line
    }, [sheetProperties])

  function processSVData(data) {
    jset('googleSheetValues', data);
  };

  function processSPData(data){
    renderPage(data)
  }

  function renderPage(data) {
    let propertyArray;
    let propertyIndex;
    try {    
      //propertyArray = sheetPropData.sheets;
      propertyArray = data.sheets
      propertyIndex = propertyArray.findIndex(x => x.properties.title === ghinNumber)
    } catch (error) {
      console.log(error);
      //window.location.reload(false)
    }
     let baseURL = 'https://docs.google.com/spreadsheets/d/1GEP9S0xt1JBPLs3m0DoEOaQdwxwD8CEPFOXyxlxIKkg'
      if (propertyIndex > -1) {
      set('hasGoogleSheet', "true")
      createPlayerTableGamesPlayers();
      requestGHIN();
      let sheetGid = propertyArray[propertyIndex].properties.sheetId
      sheetURL= baseURL + '/edit#gid=' + sheetGid;

      editSheet = (
        <div>
          <p className='center'>Your table of players and games<br></br>
                              is in Google Sheets.
                              </p>
          <p className='center'>When you are done editing it,<br></br>
                              restart this app.
                              </p>
          <div className='link-center'>
            <a href={sheetURL}>Click Here to Edit Your Table</a>
          </div>
        </div>
      )
      setEditOrCreate(editSheet);
    } else {
      set('hasGoogleSheet', "false");
      set('players', "[]");
      set('playerTable', "[]");
      set('games', "[]");
      set('game', "");
      set('course', "");
      set('ghinData', "[]");
      sheetURL = baseURL;
    
      createSheet = (
        <div>
          <p className='center'>Before you can display the table of Games,<br></br>
                                you must create a table of your players<br></br>
                                and games in Google Sheets.<br></br><br></br>
                                Do this by adding a new sheet, whose name is<br></br>
                                your GHIN Number ({ghinNumber}).<br></br><br></br>
                                You may copy another user's table and then edit it.<br></br>
                                You may give your games any name you wish (no spaces).
                                </p>
          <p className='center'>When you have created your table,<br></br>
                              restart this app.
                              </p><br></br>
          <div className='link-center'>
            <a href={sheetURL}>Click Here to Create Your Table</a>
          </div>
        </div>
      )
      setEditOrCreate(createSheet)
    }
  } 

  return (
    <>
    {editOrCreate}
    </>
    )
}
export default EditGames;