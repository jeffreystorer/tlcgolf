import React from 'react';
import '../styles/App.css';
import LineupTableHeader from './LineupTableHeader';

const TeamTable = ({
    teamNumber,
    teamName,
    teamMembers,
    handleAddTeamMember,
    handleDeleteTeamMember,
    teamTables,
    playerNameList
}) => {
  const getCourseHandicaps = () => {
    return (
      {teamMembers && teamMembers.map(player => {
      let keys = [player.courseHandicaps]
      return keys.map((key, index)=>{
      return (<div key={player.id}>
      <td className='other-row-cell-lineup'>
         player.courseHandicaps[index]
        </div>)
      </td>
 })}
    )})

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
            <td className='left-row-cell-lineup'>
                 {teamMembers && teamMembers.map(player => {
                return (<div key={player.id}>
                    <span onClick={handleDeleteTeamMember(teamName, player.id)}> {player.playerName}</span>
                   </div>)
            })}
            </td>
            {getCourseHandicaps}
            </tr>
          </tbody>
        </table>
        </div>
        <br></br>
    </>
    )
}

export default TeamTable;