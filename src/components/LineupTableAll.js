import React, { useState } from 'react';
import GamesAndLineupTableDropDowns from './GamesAndLineupTableDropDowns';
//import GamesTableHeader from "./GamesTableHeader";
import LineupTableDropDowns from './LineupTableDropDowns';
import TeamTable from './TeamTable';
//import LineupTableHeader from './LineupTableHeader';
import { v4 as uuidv4 } from 'uuid';
import {useRecoilValue} from 'recoil';
import * as state from '../state';
import createLineupTablePlayersArray from '../functions/createLineupTablePlayersArray';

export default function LineupTableAll({ratings, slopes, pars}) {
  const course = useRecoilValue(state.courseState);
  const game = useRecoilValue(state.gameState);
  const games = useRecoilValue(state.gamesState);
  const teesSelected = useRecoilValue(state.teesSelectedState);
  
  const playersArray = createLineupTablePlayersArray(course, game, games, teesSelected, ratings, slopes, pars);
  
/*    [
    {id: 1917731, playerName: 'William Costa', courseHandicaps: [7,6,5]},
    {id: 4438481, playerName: 'Christopher Dooley', courseHandicaps: [7,6,5]},
    {id: 293338, playerName: 'Charles Duprey', courseHandicaps: [7,6,5]},
    {id: 8625458, playerName: 'Dave Holcombe', courseHandicaps: [7,6,5]},
    {id: 8482977, playerName: 'Fred Laist', courseHandicaps: [7,6,5]},
    {id: 8482980, playerName: 'Donald Lieb', courseHandicaps: [7,6,5]},
    {id: 5891112, playerName: 'Paul Lieberman', courseHandicaps: [7,6,5]},
    {id: 10220640, playerName: 'Andy Long', courseHandicaps: [7,6,5]},
    {id: 1884886, playerName: 'Peter Nichols', courseHandicaps: [7,6,5]},
    {id: 2897876, playerName: 'Doug Pajak', courseHandicaps: [7,6,5]},
    {id: 8482979, playerName: 'John Pohl', courseHandicaps: [7,6,5]},
    {id: 1570352, playerName: 'Sam Poore', courseHandicaps: [7,6,5]},
    {id: 2145248, playerName: 'Rick Saunders', courseHandicaps: [7,6,5]},
    {id: 585871, playerName: 'Jeffrey Storer', courseHandicaps: [7,6,5]},
    {id: 8546778, playerName: 'Marc Tate', courseHandicaps: [7,6,5]},
    {id: 1621216, playerName: 'Mike Werneke', courseHandicaps: [7,6,5]},
    ] */
    
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
  const [linkTime, setLinkTime] = useState("Time");
  const [teeTimeCount, setTeeTimeCount] = useState();
  const [playingDate, setPlayingDate] = useState("Date");

  
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

  const handlePlayingDateChange = (event) => {
    setPlayingDate(event.target.value);
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
        let teamMembers = [];
        teamMembers = teamTables[teamName];
        TeamTables[i] = (
        <TeamTable 
          key={uuidv4()}
          teamNumber={i}
          teamName={teamName}
          teamTables={teamTables}
          teamMembers={teamMembers}
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
      <br></br><br></br>
      <LineupTableDropDowns
        playingDateOptionItems={playingDateOptionItems}
        linkTime={linkTime}
        linkTimeOptionItems={linkTimeOptionItems}
        handleLinkTimeChange={handleLinkTimeChange}
        teeTimeCount={teeTimeCount}
        teeTimeCountOptionItems={teeTimeCountOptionItems}
        handlePlayingDateChange={handlePlayingDateChange}
        handleTeeTimeCountChange={handleTeeTimeCountChange}
      /><br></br>
      <br></br>
      <table id="lineup-table">
        <caption>Lineup for {playingDate} at {linkTime} at {course.toUpperCase()}</caption>
        <tbody>
          {generateTeamTables()}
        </tbody>
      </table>
        <br></br>
      <textarea rows="6" cols="38" defaultValue="[Games, Entry Fee, Prize, Rules]"></textarea>
      </div>
      </>
  )
}

export const getPlayersNotInTeeTime = (playersList, teamTables) => {
  const{ team0 = [], team1 = [], team2 = [], team3 = [], team4 = [], team5 = [], team6 = [], team7 = [], team8 = [], team9 = []} = teamTables;
  return playersList.filter(player => {
      return !(team0.find(p => p.id === player.id) ||
      team1.find(p => p.id === player.id) ||
      team2.find(p => p.id === player.id) ||
      team3.find(p => p.id === player.id) ||
      team4.find(p => p.id === player.id) ||
      team5.find(p => p.id === player.id) ||
      team6.find(p => p.id === player.id) ||
      team7.find(p => p.id === player.id) ||
      team8.find(p => p.id === player.id) ||
      team9.find(p => p.id === player.id));
  });
}


