import React from 'react';
import '../styles/App.css';
import { v4 as uuidv4 } from 'uuid';

const TeamTable = ({
    teamNumber,
    teamName,
    handleAddTeamMember,
    handleDeleteTeamMember,
    teamTables,
    playerNameList
}) => {  

    


    return (
    <>        
        <table name='lineup-card'>
        <thead >
            <tr key={uuidv4()} className='lineup'>
            <th>
            <select name={teamName} value={""} onChange={handleAddTeamMember}>
                <option key={uuidv4()}>{teamTables.times[teamNumber]}</option>
                {playerNameList.map(({id, name}) =>
                    <option key={uuidv4()} value={id}>{name}</option>
                )}
            </select>
            </th>
            
            </tr>
          </thead>
            <tbody >
            <tr key ={uuidv4()} className='lineup, text-align-left'>
              <td >
                 {teamTables.teamName && teamTables.teamName.map(player => {
                return (<div key={player.id}>
                    <span id='playerName' onClick={handleDeleteTeamMember('players', player.id)}> {player.name + " " + player.courseHandicap + " " + player.tee}</span>
                   </div>)
            })}
              </td>
            </tr>
           
            </tbody>
        </table>
    </>
    )
}

export default TeamTable;