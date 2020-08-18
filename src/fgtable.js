//8/10 12:50 Next steps:
//Then swith over to new style of tables with updates saved to firebase
//Add game and course selectors
//create main table
//iterate through players to set table data

import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import fire from './fire';
import { set, get, jget, jset } from './local-storage-functions';


function FGTable () {
  const [myPlayers, setPlayers] = useState([]);
  const [myGames, setGames] = useState([]);
  //const [myGHINNumber, setMyGHINNumber] = useState('0585871');
  //setMyGHINNumber('5891112');
  //set('GHINNumber', '0585871');

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
  }, [])


  if (get('PlayerTable') !== null){
    setPlayerData();
   }
    function setPlayerData(){
      const myPlayerRecords = JSON.parse(get('PlayerTable'));
      let rowCount = myPlayerRecords.length;
      let colCount = myPlayerRecords[0].data.length;
      let playerTable = [];
      let j;
      let k;
      for (j = 0; j < rowCount; j++){
       let newRow = [];
        for (k = 0; k < colCount; k++){
          newRow.push(myPlayerRecords[j].data[k])
        }
        playerTable.push(newRow)
      }
     };
   
   const database = fire.database();
   var myRef = '/' + get('GHINNumber');
   var myData = database.ref(myRef)
     myData.set(
       get('PlayerTable')
     ); 
  

   let columns = [{
    dataField: 'ghinnumber',
    text: 'GHIN Number'
  }, {
    dataField: 'lastname',
    text: 'Last Name'
  }]
  let i;
  for (i=0; i < myGames.length; i++ ) {
    let newColumn;
    newColumn = {dataField: i, text: myGames[i]}
    columns = [...columns, newColumn];
  };

  return (
    <BootstrapTable keyField='ghinnumber' data={ myPlayers } columns={ columns } />
  )

  }

export default FGTable;

