import React from 'react';
import '../styles/App.css';
import { v4 as uuidv4 } from 'uuid';

const LineupCards = ({
    handleChange,
    handleDeleteClick,
    teeTime,
    playerNameList
}) => {  

    


    return (
    <>        
        <table name='lineup-card'>
        <thead >
            <tr key='1' className='lineup'>
            <th 
                scope='col'>
            <select name={"players"} value={''} onChange={handleChange}>
                {playerNameList.map(({id, name}) =>
                    <option key={uuidv4()} value={id}>{name}</option>
                )}
            </select>
            </th>
            
            </tr>
          </thead>
            <tbody >
            <tr key ="1" className='lineup, text-align-left'>
              <td >
                 {teeTime.players && teeTime.players.map(player => {
                return (<div key={player.id}>
                    <span id='playerName' onClick={handleDeleteClick('players', player.id)}> {player.name + " " + player.courseHandicap + " " + player.tee}</span>
                   {/*  <button > - </button> */}
                </div>)
            })}
              </td>
            </tr>
           
            </tbody>
        </table>
    </>
    )
}

export default LineupCards;