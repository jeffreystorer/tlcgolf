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
  localStorage.setItem('lsGHINNumber', '0585871');

  useEffect(() => {
  const database = fire.database();
  const myData = database.ref('/data/');  // ('/data/0585871/players/');
  myData.on('value', function(snapshot) { 
    let myStoredData = snapshot.val();
    //console.log('snapshot.val: ' + JSON.stringify(myStoredData));
    //let myFirstGHINNumber = myStoredData["0585871"].players[0].ghinnumber;
    ///console.log('myFirstGHINNumber: ' + myFirstGHINNumber);
    setGames(myStoredData[localStorage.getItem('lsGHINNumber')].games);
    setPlayers(myStoredData[localStorage.getItem('lsGHINNumber')].players);
    //setFollowedGolfers(JSON.stringify(snapshot.val()));
    //setFollowedGolfers(JSON.parse(myFollowedGolfers));
    //console.log(myFollowedGolfers);
    //alert('myGames: ' + myGames);
    //alert('myPlayers: ' + myPlayers);
  });
    return () => {
     //cleanup
    }
  }, [])

 function setPlayerData(userGHINNumber){
   const database = fire.database();
    var myRef = '/data/0585871';
   var myData = database.ref(myRef)
     myData.set({
      games : [ "Monday", "Wednesday", "Friday", "Saturday"],
      players : [ {
        0 : "yes",
        1 : "yes",
        2 : "yes",
        3 : 'no',
        firstname : "",
        gender : "",
        ghinnumber : "5891112",
        index : "",
        lastname : "Lieberman"
      }, {
        0 : "yes",
        1 : 'yes',
        2 : "yes",
        3 : 'no',
        firstname : "",
        gender : "",
        ghinnumber : "0585871",
        index : "",
        lastname : "Storer"
      } ]
    }
  ); 
  }
 setPlayerData('5891112');
  //let playerCount = Object.keys(myFollowedGolfers).length;
  //alert("players: " + playerCount);

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
    //alert('columns: ' + JSON.stringify(columns));
  };

  return (
    <BootstrapTable keyField='ghinnumber' data={ myPlayers } columns={ columns } />   
  )

}
export default FGTable;

