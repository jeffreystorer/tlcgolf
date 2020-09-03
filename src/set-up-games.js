import React from 'react';
import {get, set, jget} from './local-storage-functions';
import PlayerDataTable from './table-player-data'
import {fetchGoogleSheets} from './fetch-google-sheets'
import {createPlayerTableGamesPlayers} from './create-playertable-games-players';

function SetUpGames () {
  let propertyArray;
  const ghinNumber = get('ghinNumber');
  fetchGoogleSheets();
  try {    
    propertyArray = jget('googleSheetProperties').sheets
  } catch (error) {
    window.location.reload(false)
  }  
  let propertyIndex = propertyArray.findIndex(x => x.properties.title === ghinNumber)


  let baseURL = 'https://docs.google.com/spreadsheets/d/1GEP9S0xt1JBPLs3m0DoEOaQdwxwD8CEPFOXyxlxIKkg'
  if (propertyIndex > -1) {
  set('hasGoogleSheet', "true")
  try {
  createPlayerTableGamesPlayers();
  } catch (error) {
    window.location.reload(false)
  }
  let sheetGid = propertyArray[propertyIndex].properties.sheetId
  let sheetURL = baseURL + '/edit#gid=' + sheetGid;
      return (
        <>
        <p className='center'>Your table of players and games<br></br>
                              is in Google Sheets.
                              </p>
              <p className='center'>When you are done editing it,<br></br>
                              click your browser's back arrow<br></br>
                              to return here.
                              </p>
          <div className='link-center'>
            <a href={sheetURL}>Click Here to Edit Your Table</a>
          </div>{/* 
              <br></br>
              <PlayerDataTable /> */}
        </>
      )
    } else {
      set('hasGoogleSheet', "false");
      set('players', "[]");
      set('playerTable', "[]");
      set('games', "[]");
      set('game', "");
      set('course', "");
      set('ghinData', "[]");
      let sheetURL = baseURL;
          return (
            <>
            <p className='center'>Before you can display the table of Games,<br></br>
                                  you must create a table of your players<br></br>
                                  and games in Google Sheets.<br></br><br></br>
                                  Do this by adding a new sheet, whose name is<br></br>
                                  your GHIN Number ({ghinNumber}).<br></br><br></br>
                                  You may copy another user's table and then edit it.<br></br>
                                  You may give your games any name you wish (no spaces).
                                  </p>
                  <p className='center'>When you have created your table,<br></br>
                                  click your browser's back arrow<br></br>
                                  to return here.
                                  </p><br></br>
              <div className='link-center'>
                <a href={sheetURL}>Click Here to Create Your Table</a>
              </div>
            </>
          )

  } 
}
export default SetUpGames;