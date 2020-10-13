import React from 'react';
import '../styles/App.css';
import LineupTableHeader from './LineupTableHeader';

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
        <div className="center">
        <table className='team-table'>
        <thead>
            <LineupTableHeader 
              teamNumber={teamNumber}
              teamName={teamName}
              teamTables={teamTables}
              playerNameList={playerNameList}
              handleAddTeamMember={handleAddTeamMember}
            />
        </thead>
        <tbody>
          <tr>
            <td className='left-row-cell-game'>
                 {teamMembers && teamMembers.map(player => {
                return (<div key={player.id}>
                    <span onClick={handleDeleteTeamMember(teamName, player.id)}> {player.playerName}</span>
                   </div>)
            })}
            </td>
            </tr>
          </tbody>
        </table>
        </div>
        <br></br>
    </>
    )
}

export default TeamCard;