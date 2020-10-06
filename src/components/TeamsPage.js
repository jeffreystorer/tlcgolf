import React from 'react';
import '../styles/App.css';
import uuid from 'uuid';

const TeamsPage = ({
    handleSubmit,
    handleChange,
    handleDeleteClick,
    teeTime,
    playerNameList,
}) => {
    return (
    <>
        <div><br></br>
        <input type="text" value={teeTime.time} onChange={handleChange} name={'time'} placeholder="Tee Time" />
        <div>
            {teeTime.players && teeTime.players.map(player => {
                return (<div key={player.id}>
                    <span> {player.name} </span>
                    <button onClick={handleDeleteClick('players', player.id)}> - </button>
                </div>)
            })}
            <select name={"players"} value={''} onChange={handleChange}>
                {playerNameList.map(({id, name}) =>
                    <option key={uuid.v4()} value={id}>{name}</option>
                )}
            </select>
        </div>
        <button onClick={handleSubmit}>Submit</button>
        </div>
        <br></br><br></br>

    </>
    )
}

export default TeamsPage;