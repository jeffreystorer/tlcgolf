import React, { useState, useEffect }from 'react'
import { CSVReader } from 'react-papaparse'
import { CSVLink } from 'react-csv';
import Button from '@material-ui/core/Button';
import fire from './fire';
import { set, get, jget, jset } from './local-storage-functions';


function SetUpGames () {

const buttonRef = React.createRef()

/*   const [myPlayers, setPlayers] = useState([]);
  const [myGames, setGames] = useState([]);

  useEffect(() => {
  const database = fire.database();
  const myRef = '/data/' + get('GHINNumber');
  const myData = database.ref(myRef);
  myData.on('value', function(snapshot) { 
    let myPlayerTable = snapshot.val();
    if (myPlayerTable !== null){
      set('PlayerTable', JSON.stringify(myPlayerTable));
      setGames(get('PlayerTable')[0].slice(2));
      setPlayers(get('PlayerTable').slice(1));
    }
  });
    return () => {
     //cleanup
    }
  }, []) */


/*   if (get('PlayerTable') !== null){
    setPlayerData();
   } */
    function setGamesAndPlayers(playerTable){
      playerTable[0].splice(0,5);
      playerTable[0].unshift('all');
      set('Games', JSON.stringify(playerTable[0]));
      playerTable.splice(0,1);
      set('Players', JSON.stringify(playerTable));
    }

    function createAndSavePlayerTable(csvToJSONData){
      const myPlayerRecords = csvToJSONData;
      let rowCount = myPlayerRecords.length;
      let playerTable = [];
      let i;
      for (i = 0; i < rowCount; i++){
        playerTable.push(myPlayerRecords[i].data);
      }
      set('PlayerTable', JSON.stringify(playerTable));
      setGamesAndPlayers(playerTable);
      uploadPlayerTable(playerTable);
    }

    function uploadPlayerTable(playerTable) {
      
      const database = fire.database();
      var myRef = '/' + get('GHINNumber');
      var myData = database.ref(myRef)
      myData.set(playerTable);
    }

    function handleOpenDialog(e) {
      // Note that the ref is set async, so it might be null at some point
      if (buttonRef.current) {
        buttonRef.current.open(e)
      }
    }

    function handleOnFileLoad(data) {
      createAndSavePlayerTable(data);
    }

    function handleOnError(err, file, inputElem, reason) {
      console.log(err)
    }

    let myConfig = {header: false};
    if (!get('PlayerTable')) {
    return (
      <div align="center">
        <h5 align='center' color="3378ac">
          You must upload a table (*.csv file) of players and games <br/>
          before you can view the Games CH page and also<br/>
          after downloading and editing your uploaded table<br/>
          (using the Download button):
        </h5>
        <br/>
        <CSVReader
          ref={buttonRef}
          onFileLoad={handleOnFileLoad}
          onError={handleOnError}
          noClick
          noDrag
          config={myConfig}
        >
          {({ file }) => (
            <aside
              style={{align: "center"}}
            >
              <Button 
                variant="contained"
                color="primary"
                size="medium"
                onClick={handleOpenDialog}>
                  Upload
              </Button>

            </aside>
          )}
        </CSVReader>
      </div>
    )
  } else {    
    return (
      <div align="center">
        <h5 align='center' color="3378ac">
          You must upload a table (*.csv file) of players and games <br/>
          before you can view the Games page and also<br/>
          after downloading and editing your uploaded table<br/>
          (using the Download button):
        </h5>
        <br/>
        <CSVReader
          ref={buttonRef}
          onFileLoad={handleOnFileLoad}
          onError={handleOnError}
          noClick
          noDrag
          config={myConfig}
        >
          {({ file }) => (
            <aside
              style={{align: "center"}}
            >
              <Button 
                variant="contained"
                color="primary"
                size="medium"
                onClick={handleOpenDialog}>
                  Upload
              </Button>

            </aside>
          )}
        </CSVReader>
        <br />
        <br />
        <h5 align='center'>
          To edit your uploaded table of players and games,<br/>
          download it ({get('GHINNumber')}.csv),<br/>
          then edit the file, save it, and upload it again<br/>
          (using the Upload button):
        </h5><br/>
        <CSVLink
          filename={get('GHINNumber') + ".csv"}
          style={{align: "center"}}
          className="btn btn-primary"
          data={JSON.parse(get('PlayerTable'))}>
          Download
        </CSVLink>
      </div>
    )
    }
}

export default SetUpGames;