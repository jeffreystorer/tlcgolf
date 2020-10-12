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
        <tbody className='team-card-body'>
            <tr key={uuidv4()} className='team-card-row'>
            <td className='team-card-col-select'>
            <select className='select-dropdown-container' name={teamName} value={""} onChange={handleAddTeamMember}>
                <option key={uuidv4()}>{teamTables.times[teamNumber]}</option>
                {playerNameList.map(({id, playerName}) =>
                    <option key={uuidv4()} value={id}>{playerName}</option>
                )}
            </select>
            </td>
            <td className='team-card-col-players'>
                 {teamMembers && teamMembers.map(player => {
                return (<div className='team-card-col-players' key={player.id}>
                    <span className='team-card-col-players' onClick={handleDeleteTeamMember(teamName, player.id)}> {player.playerName}</span>
                   </div>)
            })}
            </td>
            </tr>
          </tbody>
        </table>
        <br></br>
    </>
    )
}

export default TeamCard;