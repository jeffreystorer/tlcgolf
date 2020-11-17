import React, {useState} from 'react';
import { get, set } from '../functions/localStorage';
import '../styles/App.css';
import { v4 as uuidv4 } from 'uuid';
import createLineupTablePlayersArray from '../functions/createLineupTablePlayersArray';
import {useRecoilValue, useRecoilState, } from 'recoil';
import * as state from '../state';

const SelectPlayersTableAll = ({ratings,slopes,pars}) => {
  const [randomTeams, setRandomTeams] = useState(false);
  //eslint-disable-next-line
  const [course, setCourse] = useRecoilState(state.courseState);
  //eslint-disable-next-line
  const [game, setGame] = useRecoilState(state.gameState);
  const games = useRecoilValue(state.gamesState);
  const teesSelected = useRecoilValue(state.teesSelectedState);
  const [showTips, setShowTips] = useState(get('showTips'));
  
  let playersArray = createLineupTablePlayersArray(course, game, games, teesSelected, ratings, slopes, pars, randomTeams);



  function handleSubmit(e){
    e.preventDefault();
    var sel = document.getElementById('playerSelector');
    var alloptions = sel.options;
    let options = [];
    for (var i = 0, len = alloptions.length; i < len; i++){
      if (alloptions[i].selected) {options = [...options, alloptions[i]]};
    }
    let playersInLineup = [];
    Array.from(options).forEach(function (element){playersInLineup = [...playersInLineup, element.value]});
    set('playersInLineup', playersInLineup);
    document.location = '/lineup';
  };

  function handleRandomTeamsChange(){
    playersArray = createLineupTablePlayersArray(course, game, games, teesSelected, ratings, slopes, pars, !randomTeams);
    setRandomTeams(!randomTeams);
  }
    
  function handleShowTipsChange(){
      set('showTips', !showTips);
      setShowTips(!showTips);
    }
    
  let playersInLineupOptions = playersArray.map((player) =>
      <option key={uuidv4()} value={player.id}>{player.playerName}</option>);

  return (
  <div align="center">
  <br></br>
   {showTips &&
    <div>
        <table className='table-tip'>
          <thead>
            <tr>
              <th>
                To randomize the list of players:
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='table-tip-td'>
              Check the "Random Teams" box.  
              This will randomize the list of players 
              in your game that appears in the teetime 
              dropdowns.  You can go back to alphabetical
              order by unchecking the box.  If you check it 
              again, you will get a different randomized
              list.  The random list with which you make 
              a game will be saved with the game and 
              restored when you load the saved game.
              </td>
            </tr>
          </tbody>
        </table>
        </div>}
    <h4>Randomize?</h4>
    <input type='checkbox' id='randomTeams'onChange={handleRandomTeamsChange} defaultChecked={false}></input>
    <label htmlFor='randomTeams'>Random Teams</label>
    <br></br>
  {showTips &&
  <div>
    <table className='table-tip'>
      <thead>
        <tr>
          <th>
            To select players
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className='table-tip-td'>
          Please select the players in your lineup,
          then click "Next", or, just click "Next"
          to accept the players already selected.  
          On a desktop or laptop computer,
          hold down the Ctrl (Windows) or
          Command (Mac) button to select
          multiple players.
          </td>
        </tr>
      </tbody>
    </table>
    </div>} 
 <h4>Select Players for Lineup</h4>
 <form onSubmit={handleSubmit}>
   <label>
     <select id='playerSelector' name='playersInLineup' multiple={true} size={20}>
     {playersInLineupOptions}
     </select>
   </label>
   <br></br><br></br>
   <input id='next' type='submit' value ="Next" />
 </form>
  <br></br>
  <input type='checkbox' id='showTips'onChange={handleShowTipsChange} defaultChecked={showTips}></input>
  <label htmlFor='showTips'>Show Tips</label>
  </div>
    );
}

export default SelectPlayersTableAll;

 
