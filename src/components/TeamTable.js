import React from 'react';
import '../styles/App.css';
import LineupTableHeader from './LineupTableHeader';
import {useRecoilValue} from 'recoil';
import * as state from '../state';
import { v4 as uuidv4 } from 'uuid';
import TeeChoiceDropDown from './TeeChoiceDropDown';

const TeamTable = ({
    teamNumber,
    teamName,
    teamMembers,
    handleAddTeamMember,
    handleDeleteTeamMember,
    teamTables,
    playerNameList,
    progs
}) => {
  const teesSelected = useRecoilValue(state.teesSelectedState);
  let rows = teamMembers;
  let rowsTD = [];
  let teeCount = teesSelected.length;
  let playerCount = teamMembers.length;

  function generateRows(){
    for (let i =0; i < playerCount; i++){
      rowsTD[i] = (
        <tr key={rows[i].id}>
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
    tds.push(<TeeChoiceDropDown
      key={uuidv4()}
      handleTeeChoiceChange={handleTeeChoiceChange}
      teeChoiceOptionItems={teeChoiceOptionItems}
      baseTee={baseTee}
      playerId={rows[i].id}
      />)
    return tds;
  }
  let teesSelectedArray = teesSelected.map(a => a.value);
  let baseTee = teesSelectedArray[0];
  let teeChoiceOptionItems = teesSelectedArray.map((tee) =>
      <option key={uuidv4()} value={tee}>{tee}</option>);

  const handleTeeChoiceChange = (event) => {
    //event.target.name = id = ghinNumber
    //event.target.value = teeChoice e.g. C or C/M or M
    /* On tee  time change, change selected tee to bold?
    If progs > 0, recalculate teamProg */
  };

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
          { (progs > 0) 
          ? <tfoot>
            <tr>
              <td>
                Team progs per {progs}:
              </td>
            </tr>
           </tfoot>
          : <></>}
        </table>
    )
}

export default TeamTable;