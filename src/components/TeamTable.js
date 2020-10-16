import React from 'react';
import '../styles/App.css';
import LineupTableHeader from './LineupTableHeader';import {useRecoilValue} from 'recoil';
import * as state from '../state';
import { v4 as uuidv4 } from 'uuid';

const TeamTable = ({
    teamNumber,
    teamName,
    teamMembers,
    handleAddTeamMember,
    handleDeleteTeamMember,
    teamTables,
    playerNameList
}) => {
  const teesSelected = useRecoilValue(state.teesSelectedState);
  let rows = teamMembers;
  let rowsTD = [];
  let teeCount = teesSelected.length;
  let playerCount = teamMembers.length;

  function generateRows(){
    for (let i =0; i < playerCount; i++){
      rowsTD[i] = (
        <tr key={uuidv4()}>
          <td 
            className="lineup-left-row-cell"
            onClick={handleDeleteTeamMember(teamName, teamMembers[i].id)}
            >
              {rows[i].playerName}
            </td>
          {generateCols(i)}
        </tr>)
    }
      return rowsTD;
  }

  function generateCols(i){
    let tds = [];
    for (var j = 0; j < teeCount; j++){
      tds[j] = (
        <td className='lineup-other-row-cell' key={uuidv4()}>
          {rows[i].courseHandicaps[j]}
        </td>
      )
    }
    return tds;
  }

  return (
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
              {generateRows()}
          </tbody>
        </table>
    )
}

export default TeamTable;