import React, { useState } from 'react';
import GamesAndLineupTableDropDowns from './GamesAndLineupTableDropDowns';
import LineupTableDropDowns from './LineupTableDropDowns';
import TeamTable from './TeamTable';
import { v4 as uuidv4 } from 'uuid';

export default function LineupTableAll({ratings, slopes, pars}) {

  const playersArray = [
    { id: 0, name: 'Laist', tee: 'M', courseHandicap: '6'},
    { id: 1, name: 'Lieb', tee: 'C/M', courseHandicap: '14' },
    { id: 2, name: 'Lieberman', tee: 'C', courseHandicap: '6' },
    { id: 3, name: 'Nichols', tee: 'C', courseHandicap: '6' },
    { id: 4, name: 'Pajak', tee: 'C', courseHandicap: '10' },
    { id: 5, name: 'Pohl', tee: 'C/M', courseHandicap: '11'},
    { id: 6, name: 'Storer', tee: 'C', courseHandicap: '7'},
    { id: 7, name: 'Tate', tee: 'C', courseHandicap: '8'},
  ]
  //eslint-disable-next-line
  const [players, setPlayers] = useState(playersArray);
  const teamTablesObj = {
    times: [],
    team0:[],
    team1:[],
    team2:[],
    team3:[],
    team4:[],
    team5:[],
    team6:[],
    team7:[],
    team8:[],
    team9:[],
  }
  const [teamTables, setTeamTables] = useState(teamTablesObj);
  const [linkTime, setLinkTime] = useState();
  const [teeTimeCount, setTeeTimeCount] = useState();

  
  const handleAddTeamMember = (event) => {
    const { name, value } = event.target;
    const newPlayerObj = players.find(player => player.id === Number(value));
    setTeamTables(prevTeamTables => ({
        ...prevTeamTables,
        [name]: prevTeamTables[name].concat(newPlayerObj),
    }))
  }

  const handleDeleteTeamMember = (authority, id) => (event) => {
      setTeamTables(prevTeamTables => ({
          ...prevTeamTables,
          [authority]: prevTeamTables[authority].filter(player => player.id !== id),
      }));
  }

  const handleLinkTimeChange = (event) => {
    setLinkTime(event.target.value);
    setTeeTimes(event.target.value, teeTimeCount);
  }

  const handleTeeTimeCountChange = (event) => {
    setTeeTimeCount(event.target.value);
    setTeeTimes(linkTime, event.target.value);
  } 

  function setTeeTimes(aLinkTime, aTeeTimeCount){
    let firstRegularTimeIndex = linkTimes().indexOf("8:02")
    let linkTimeIndex = linkTimes().indexOf(aLinkTime);
    if (linkTimeIndex < firstRegularTimeIndex){
      for (let i = 0; i < aTeeTimeCount; i++){
        teamTables.times[i] = aLinkTime
      }
    } else {
      for (let i = 0; i < aTeeTimeCount; i++){
        teamTables.times[i] = linkTimes()[linkTimeIndex + i]
      }
    }
    console.log(teamTables.times)
  }

  function playingDates() {
      let playingDates = [];
      const now = new Date();
      for (let i = 0; i <  7; i++){
      let month = now.getMonth() + 1;
      let day = now.getDate();
      let year = now.getFullYear();
      let playingDate = month+"/"+day+"/"+year
      playingDates[i] = playingDate
      now.setDate(now.getDate() + 1)}
      return playingDates;
    }
    let playingDateOptionItems = playingDates().map((playingDate) =>
      <option key={uuidv4()}>{playingDate}</option>);

    let teeTimeCounts = [2,3,4,5,6,7,8,9,10];
    let teeTimeCountOptionItems = teeTimeCounts.map((count) =>
      <option key={uuidv4()} value={count}>{count + "  tee times"}</option>);

  function linkTimes() {
    let linkTimes = [];
    linkTimes.push("9:00 Shotgun", "9:30 Shotgun", "1:00 Shotgun", "1:30 Shotgun");
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let firstLinkTime = new Date(year, month, date, 8, 2, 0, 0);
    let hour = firstLinkTime.getHours();
    let minute = firstLinkTime.getMinutes();

    function setLinkTime(){
      let aLinkTime;
      if (minute < 10) {
        aLinkTime = hour + ":0" + minute;
        } else {
        aLinkTime = hour + ":" + minute;
        }
      return aLinkTime;
    }

    linkTimes.push(setLinkTime());
    for (let i = 1; i < 75; i++){
    firstLinkTime.setMinutes(firstLinkTime.getMinutes() + 8);
    hour = firstLinkTime.getHours();
    minute = firstLinkTime.getMinutes();
    linkTimes.push(setLinkTime());
    }
        return linkTimes;
  }
  
  let linkTimeOptionItems = linkTimes().map((linkTime) =>
    <option key={uuidv4()} value={linkTime}>{linkTime}</option>)
    
    let playerNameList = getPlayersNotInTeeTime(players, teamTables);

    let TeamTables = [];
    function generateTeamTables (){
      for (var i = 0; i < teeTimeCount; i++){
        let teamName = "team" + i;
        TeamTables[i] = (
        <TeamTable key={uuidv4()}
          teamNumber={i}
          teamName={teamName}
          teamTables={teamTables}
          playerNameList={playerNameList}
          handleAddTeamMember={handleAddTeamMember}
          handleDeleteTeamMember={handleDeleteTeamMember}
        />
        )
      }
      return TeamTables;
    }

  return (
      <>
      <div className='center'>
      <GamesAndLineupTableDropDowns />
      <br></br>
      <LineupTableDropDowns
        playingDateOptionItems={playingDateOptionItems}
        linkTime={linkTime}
        linkTimeOptionItems={linkTimeOptionItems}
        handleLinkTimeChange={handleLinkTimeChange}
        teeTimeCount={teeTimeCount}
        teeTimeCountOptionItems={teeTimeCountOptionItems}
        handleTeeTimeCountChange={handleTeeTimeCountChange}
      />
      <textarea rows="4" cols="45" defaultValue="[Games, Entry Fee, Prize, Rules]"></textarea>
      <br></br>
      {generateTeamTables()}
      </div>
      </>
  )
}

export const getPlayersNotInTeeTime = (playersList, teamTables) => {
  const{ team0 = [], team1 = [], team2 = [], team3 = [], team4 = [], team5 = [], team6 = [], team7 = [], team8 = [], team9 = []} = teamTables;
  return playersList.filter(player => {
      return !(team0.find(p => p.id === player.id)) ||
      (team1.find(p => p.id === player.id)) ||
      (team2.find(p => p.id === player.id)) ||
      (team3.find(p => p.id === player.id)) ||
      (team4.find(p => p.id === player.id)) ||
      (team5.find(p => p.id === player.id)) ||
      (team6.find(p => p.id === player.id)) ||
      (team7.find(p => p.id === player.id)) ||
      (team8.find(p => p.id === player.id)) ||
      (team9.find(p => p.id === player.id));
  });
}


