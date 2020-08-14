import { useState, useEffect } from 'react';
import useDataAPIGames from './use-data-api-games';


function RequestGHIN() {
  const [ghinNumber, setGHINNumber] = useState('0585871');
  const [{ data, isLoading, isError }, doFetch] = useDataAPIGames(
    "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" + localStorage.getItem('lsGHINNumber') + "&lastName=" + localStorage.getItem('lsLastName') + "&incllsudeLowHandicapIndex=true",
    {hits: []},
  );
  
useEffect(() => {
  

  let players = JSON.parse(localStorage.getItem("lsPlayers"));
  players.forEach(doRequest);
  console.log("Done for each");
  debugger;
  localStorage.setItem('lsPlayers', JSON.stringify(players));

  function doRequest(item, index){
    let player = item;
    setGHINNumber(player[0]);
    let lastName = player[1];
    let ghinRequest = "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" + ghinNumber + "&lastName=" + lastName + "&incllsudeLowHandicapIndex=true";
    console.log("player: " + player)
    console.log("ghinNumber, lastName: " + ghinNumber & ", " + lastName);
    console.log("url: " + ghinRequest);
    doFetch(ghinRequest);
    try {
      player[2] =  data.golfers[0].FirstName;
    } catch (error){
      player[2] = 'BAD PLAYER';
      player[3] = '-.-'
      return
    };
    player[3] = data.golfers[0].Value;
    player[4] = data.golfers[0].Gender;
  }
  return () => {
    //cleanup
  }
    },[ghinNumber])
  return null
}

export default RequestGHIN;