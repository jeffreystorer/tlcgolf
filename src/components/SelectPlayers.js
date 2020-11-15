import React from 'react';
import { get } from '../functions/localStorage';
import '../styles/App.css';
import { v4 as uuidv4 } from 'uuid';

const SelectPlayers = ({playersArray}) => {
  console.table(playersArray)
  let playersInLineup = [];
  let defaultValue = playersArray;
  playersInLineup = defaultValue;
  let playersSelectedArray = playersInLineup.map(a => a.playerName);
  if (get('playersInLineup')) {
    playersInLineup = get('playersInLineup');
    playersSelectedArray = playersInLineup.map(a => a.playerName);
    defaultValue = playersSelectedArray;
    }


  function handleSubmit(e){
    e.preventDefault();
    var sel = document.getElementById('playerSelector');
    var alloptions = sel.options;
    var options = [];
    for (var i = 0, len = alloptions.length; i < len; i++){
      if (alloptions[i].selected) {options = [...options, alloptions[i]]};
    }
    Array.from(options).forEach(function (element){playersInLineup = [...playersInLineup, element.value]});
    localStorage.setItem('playersInLineup', playersInLineup);
    };
    
    let playersInLineupOptions = playersSelectedArray.map((player) =>
      <option key={uuidv4()} value={player}>{player}</option>);

  return (
  <div align="center">
  <h4>Select Players</h4>
    <form onSubmit={handleSubmit}>
      <label>
        <select defaultValue={defaultValue} id='playerSelector' name='playersInLineup' multiple={true} size={20}>
        {playersInLineupOptions}
        </select>
      </label>
      <br></br><br></br>
      <input id='next' type='submit' value ="Next" />
    </form>
  </div>
    );
}

export default SelectPlayers;