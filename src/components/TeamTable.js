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
  console.log(rows);
  let rowsTD = [];
  let teeCount = teesSelected.length;
  console.log('teeCount: ' + teeCount);
  let playerCount = teamMembers.length;
  console.log('playerCount: ' + playerCount)

  function generateRows(){
    for (let i =0; i < playerCount; i++){
      rowsTD[i] = (
        <tr key={uuidv4()}>
          <td 
            className="left-row-cell-lineup"
            onClick={handleDeleteTeamMember(teamName, teamMembers[i].id)}
            >
              {rows[i].playerName}
            </td>
          {generateCols(i)}
        </tr>)
        console.log(rowsTD[i]);
    }
      return rowsTD;
  }

  function generateCols(i){
    let tds = [];
    for (var j = 0; j < teeCount; j++){
      tds[j] = (
        <td className='other-row-cell-lineup' key={uuidv4()}>
          {rows[i].courseHandicaps[j]}
        </td>
      )
      console.log(tds[j]);
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