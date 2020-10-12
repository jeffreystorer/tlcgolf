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
        <label htmlFor="{teamName}">
            <select className='select-dropdown-container' value={""} onChange={handleAddTeamMember}>
                <option key={uuidv4()}>{teamTables.times[teamNumber]}</option>
                {playerNameList.map(({id, playerName}) =>
                    <option key={uuidv4()} value={id}>{playerName}</option>
                )}
            </select>
        </label>
                             {teamMembers && teamMembers.map(player => {
                return (<div name={teamName} className='team-card-col-players' key={player.id}>
                    <span className='team-card-col-players' onClick={handleDeleteTeamMember(teamName, player.id)}> {player.playerName}</span>
                   </div>)
            })}
        <br></br>
    </>
    )
}

export default TeamCard;