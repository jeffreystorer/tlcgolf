import React, { useState } from 'react';
import '../styles/App.css';
import { v4 as uuidv4 } from 'uuid';
import GamesTableDropDowns from './GamesTableDropDowns';
//import LineupPageDropDowns from './LineupPageDropDowns';
import DatePicker from 'react-datepicker';
//import DatePicker,{ CalendarContainer } from 'react-datepicker';
 
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const LineupPage = ({
    handleChange,
    handleDeleteClick,
    teeTime,
    playerNameList,
}) => {
        const [playingDate, setPlayingDate] = useState(new Date());
/*         const MyContainer = ({ className, children }) => {
          return (
            <div style={{ padding: "16px", background: "#216ba5", color: "#fff" }}>
              <CalendarContainer className={className}>
                <div style={{ background: "#f0f0f0" }}>
                  What is your favorite day?
                </div>
                <div style={{ position: "relative" }}>{children}</div>
              </CalendarContainer>
            </div>
          );
        }; */
  

    function handlePlayingDateChange (e){
        setPlayingDate(e.value)
        alert(playingDate)

    }

    function handlePlayingDateSubmit(e){
      e.preventDefault();
      alert('playingDate: ' + playingDate);
    }
    return (
    <>
        <div className='center'>
        <br></br>
        <GamesTableDropDowns />
        <br></br>
      
        <div className="form-group">
          <DatePicker
              selected={playingDate}
              onChange={ handlePlayingDateChange }
              name="playingDate"
              dateFormat="MM/dd/yyyy h:mm"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={8}
              timeCaption="Link Time"
          />
         
        </div>
     
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
                    <option key={uuidv4()} value={id}>{name}</option>
                )}
            </select>
            </th>
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

export default LineupPage;