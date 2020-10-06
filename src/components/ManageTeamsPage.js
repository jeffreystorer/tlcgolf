import React, { useState } from 'react';
import TeamsPage from './TeamsPage';


const ManageTeamsPage = () => {
    const teeTimeObj = {
      time: '',
      players: [],
    }
  
    const playersArray = [
      { id: 0, name: ''},
      { id: 1, name: 'Laist' },
      { id: 2, name: 'Lieb' },
      { id: 3, name: 'Lieberman' },
      { id: 4, name: 'Nichols' },
      { id: 5, name: 'Pajak' },
      { id: 6, name: 'Pohl'},
      { id: 7, name: 'Storer'},
      { id: 8, name: 'Tate'},
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
        else if (name === 'time') {
            setTeeTime(prevTeeTime => ({
                ...prevTeeTime,
                [name]: value,
            }));
            players.shift();
            console.log(players);
            let newPlayer = {id: 0, name: teeTime.time};
            players.unshift(newPlayer);
            console.log(players);
        }
    }

    const handleDeleteClick = (authority, id) => (event) => {
        setTeeTime(prevTeeTime => ({
            ...prevTeeTime,
            [authority]: prevTeeTime[authority].filter(player => player.id !== id),
        }));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(teeTime);
    }

    // you don't need to re-add anything field because this function will automatically filtered it out
    // filter out the users that is not in team or that is not selected 
    let playersList = getPlayersNotInTeeTime(players, teeTime);

    return (
        <>
            <TeamsPage teeTime={teeTime}
                playerNameList={playersList}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleDeleteClick={handleDeleteClick}
            />
        </>
    )
}

export const getPlayersNotInTeeTime = (playersList, teeTime) => {
    const { players = []} = teeTime;
    return playersList.filter(player => {
        return !(players.find(p => p.id === player.id));
    });
}



export default ManageTeamsPage;