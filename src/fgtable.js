//8/9 18:25 Next steps: retreive all user data instead of just players 
//need games to set table headers
//Then swith over to new style of tables with updates saved to firebase
//Add game and course selectors
//create main table
//iterate through players to set table data

import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import fire from './fire';

function FGTable () {
  const [myFollowedGolfers, setFollowedGolfers] = useState([]);
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
    setFollowedGolfers(myStoredData[localStorage.getItem('lsGHINNumber')].players);
    //setFollowedGolfers(JSON.stringify(snapshot.val()));
    //setFollowedGolfers(JSON.parse(myFollowedGolfers));
    //console.log(myFollowedGolfers);
    //alert(myFollowedGolfers);
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
      groups : [ "Monday", 'Tuesday',"Wednesday", "Friday", "Saturday"],
      players : [ {
        0 : "yes",
        1 : "yes",
        2 : "yes",
        3 :  'yes',
        4 : 'no',
        firstname : "",
        gender : "",
        ghinnumber : "5891112",
        index : "",
        lastname : "Lieberman"
      }, {
        0 : "yes",
        1 : "no",
        2 : "yes",
        3 : 'yes',
        4 : 'yes',
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

   const columns = [{
    dataField: 'ghinnumber',
    text: 'GHIN Number'
  }, {
    dataField: 'lastname',
    text: 'Last Name'
  }, {
      dataField: '0',
      text: 'Monday'
  },{
      dataField: '1',
      text: 'Wednesday'
  },{
      dataField: '2',
      text: 'Friday'
  },{
      dataField: '3',
      text: 'Saturday'
  },{
      dataField: '4',
      text: '--'
  },{
      dataField: '5',
      text: '--'
  },{
      dataField: '6',
      text: '--'
  }
  ];

  return (
    <BootstrapTable keyField='ghinnumber' data={ myFollowedGolfers } columns={ columns } />   
  )

}
export default FGTable;

