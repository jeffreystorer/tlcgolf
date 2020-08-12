//8/10 12:50 Next steps:
//Then swith over to new style of tables with updates saved to firebase
//Add game and course selectors
//create main table
//iterate through players to set table data

import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import fire from './fire';

function FGTable () {
  const [myPlayers, setPlayers] = useState([]);
  const [myGames, setGames] = useState([]);
  //const [myGHINNumber, setMyGHINNumber] = useState('0585871');
  //setMyGHINNumber('5891112');
  //localStorage.setItem('lsGHINNumber', '0585871');

  useEffect(() => {
  const database = fire.database();
  const myRef = '/data/' + localStorage.getItem('lsGHINNumber');
  const myData = database.ref(myRef);
  myData.on('value', function(snapshot) { 
    let myPlayerTable = snapshot.val();
    if (myPlayerTable !== null){
      localStorage.setItem('lsPlayerTable', JSON.stringify(myPlayerTable));
      setGames(localStorage.getItem('lsPlayerTable')[0].slice(2));
      setPlayers(localStorage.getItem('lsPlayerTable').slice(1));
    }
  });
    return () => {
     //cleanup
    }
  }, [])


  if (localStorage.getItem('lsPlayerTable') !== null){
    setPlayerData();
   }
    function setPlayerData(){
      const myPlayerRecords = JSON.parse(localStorage.getItem('lsPlayerTable'));
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
   var myRef = '/' + localStorage.getItem('lsGHINNumber');
   var myData = database.ref(myRef)
     myData.set(
       localStorage.getItem('lsPlayerTable')
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

