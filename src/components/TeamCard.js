import React from 'react';
import '../styles/App.css';
import { v4 as uuidv4 } from 'uuid';

const TeamCard = ({
    teamNumber,
    teamName,
    teamMembers,
    handleAddTeamMember,
    handleDeleteTeamMember,
    teamTables,
    playerNameList
}) => {  

    


    return (
    <>        
        <table className='team-card-table' name={teamName}>
        <thead className='team-card-header'>
            <tr key={uuidv4()} className='team-card-row'>
            <th className='team-card-header-select'>
            <select className='select-dropdown-container' name={teamName} value={""} onChange={handleAddTeamMember}>
                <option key={uuidv4()}>{teamTables.times[teamNumber]}</option>
                {playerNameList.map(({id, playerName}) =>
                    <option key={uuidv4()} value={id}>{playerName}</option>
                )}
            </select>
            </th>
            <th className='team-card-header-players'>
                 {teamMembers && teamMembers.map(player => {
                return (<div className='span-player' key={player.id}>
                    <span className='span-player' onClick={handleDeleteTeamMember(teamName, player.id)}> {player.playerName + " " + player.courseHandicap + " " + player.tee}</span>
                   </div>)
            })}
            </th>
            </tr>
          </thead>
        </table>
        <br></br>
    </>
    )
}

export default TeamCard;