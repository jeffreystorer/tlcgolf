import React, { useState } from 'react';
import GamesAndLineupTableDropDowns from './GamesAndLineupTableDropDowns';
import LineupTableDropDowns from './LineupTableDropDowns';
import LineupCards from './LineupCards';

export default function LineupTableAll({ratings, slopes, pars}) {
  const teeTimeObj = {
    time: '',
    players: [],
    number: '',
  }

  const playersArray = [
    { id: 0, name: ''},
    { id: 1, name: 'Laist', tee: 'M', courseHandicap: '6'},
    { id: 2, name: 'Lieb', tee: 'C/M', courseHandicap: '14' },
    { id: 3, name: 'Lieberman', tee: 'C', courseHandicap: '6' },
    { id: 4, name: 'Nichols', tee: 'C', courseHandicap: '6' },
    { id: 5, name: 'Pajak', tee: 'C', courseHandicap: '10' },
    { id: 6, name: 'Pohl', tee: 'C/M', courseHandicap: '11'},
    { id: 7, name: 'Storer', tee: 'C', courseHandicap: '7'},
    { id: 8, name: 'Tate', tee: 'C', courseHandicap: '8'},
  ]

  //eslint-disable-next-line
  const [players, setPlayers] = useState(playersArray);
  const [teeTime, setTeeTime] = useState(teeTimeObj);
  const handleChange = (event) => {
    const { name, value } = event.target;
    
    // if it is selected, automatically add to the tee time and create a new selection input
    // this can combine because of how the state is designed in the component
    // name and value representing the property of the state
    if (name === 'players') {
        const newPlayerObj = players.find(player => player.id === Number(value));
        setTeeTime(prevTeeTime => ({
            ...prevTeeTime,
            [name]: prevTeeTime[name].concat(newPlayerObj),
        }))
    }

        // changing tee time
  /*       else if (name === 'time') {
            setTeeTime(prevTeeTime => ({
                ...prevTeeTime,
                [name]: value,
            }));
            playersArray[0].name = value;
            //console.log('playersArray');
            //console.log(playersArray[0].name);
            setPlayers(playersArray);
            //console.log('players');
            //console.log(players[0].name);
            //console.log('playersList');
            //console.log(playersList[0].name);
        } */
  }

  const handleDeleteClick = (authority, id) => (event) => {
      setTeeTime(prevTeeTime => ({
          ...prevTeeTime,
          [authority]: prevTeeTime[authority].filter(player => player.id !== id),
      }));
  }
  // you don't need to re-add anything field because this function will automatically filtered it out
  // filter out the users that is not in team or that is not selected 
  
  
 
 
  function playingDates() {
      let playingDates = [];
      const now = new Date();
      for (let i = 0; i <  7; i++){
      let month = now.getMonth() + 1;
      let day = now.getDate();
      let year = now.getFullYear();
      let playingDate = month+"/"+day+"/"+year
      playingDates[i] = playingDate
      now.setDate(now.getDate() + 1)}
      return playingDates;
    }
    let playingDateOptionItems = playingDates().map((playingDate) =>
    <option>{playingDate}</option>) 
    
    let playerNameList = getPlayersNotInTeeTime(players, teeTime);
    console.log(playerNameList);
    debugger;

  return (
      <>
      <div className='center'>
      <br></br>
      <GamesAndLineupTableDropDowns />
      <br></br>
      <LineupTableDropDowns playingDateOptionItems={playingDateOptionItems} />
      <br></br>
      <LineupCards teeTime={teeTime}
          playerNameList={playerNameList}
          handleChange={handleChange}
          handleDeleteClick={handleDeleteClick}
      />
      </div>
      </>
  )
}

export const getPlayersNotInTeeTime = (playersList, teeTime) => {
  const { players = []} = teeTime;
  return playersList.filter(player => {
      return !(players.find(p => p.id === player.id));
  });
}

