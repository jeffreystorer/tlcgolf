import React from 'react';
import '../styles/App.css';
import uuid from 'uuid';

const TeamsPage = ({
    handleChange,
    handleDeleteClick,
    teeTime,
    playerNameList,
}) => {
    return (
    <>
        <div className='center'><br></br>
        <label htmlFor="players">Link Time</label>
        <br></br>
        <input type="text" value={teeTime.time} onChange={handleChange} name={'time'} placeholder="Link Time" />
        <br></br><br></br>        
        <label htmlFor="players">No. of Tee Times</label>
        <br></br>
        <input type="text" value={teeTime.number} onChange={handleChange} name={'number'} placeholder="No. of Tee Times" />
        <br></br><br></br>
        <div>
        <table name='lineup-table'>
        <thead >
            <tr key='1' className='lineup'>
            <th 
                scope='col'>
            <select name={"players"} value={''} onChange={handleChange}>
                {playerNameList.map(({id, name}) =>
                    <option key={uuid.v4()} value={id}>{name}</option>
                )}
            </select>
            </th>
            <th 
                scope='col'>
            <select name={"players"} value={''} onChange={handleChange}>
                {playerNameList.map(({id, name}) =>
                    <option key={uuid.v4()} value={id}>{name}</option>
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
              <td>
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
        </div>
        </div>
        <br></br><br></br>

    </>
    )
}

export default TeamsPage;