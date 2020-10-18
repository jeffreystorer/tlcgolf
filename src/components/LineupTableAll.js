import React, { useState, useEffect } from 'react';
import LineupTableDropDowns from './LineupTableDropDowns';
import TeamTable from './TeamTable';
import { v4 as uuidv4 } from 'uuid';
import {useRecoilValue} from 'recoil';
import * as state from '../state';
import createLineupTablePlayersArray from '../functions/createLineupTablePlayersArray';
import {set, get} from '../functions/localStorage';

export default function LineupTableAll({ratings, slopes, pars}) {
  const course = useRecoilValue(state.courseState);
  const game = useRecoilValue(state.gameState);
  const games = useRecoilValue(state.gamesState);
  const teesSelected = useRecoilValue(state.teesSelectedState);
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
  let savedGame = get('savedGame');
  let savedCourse = get('savedCourse');
  let teamMembers = [];
  const [teamTables, setTeamTables] = useState((savedCourse === course && savedGame === game && get('savedTeamTables')) ? get('savedTeamTables') : teamTablesObj);
  const [linkTime, setLinkTime] = useState((savedCourse === course && savedGame === game  && get('savedLinkTime')) ? get('savedLinkTime') : "Time");
  const [teeTimeCount, setTeeTimeCount] = useState((savedCourse === course && savedGame === game  && get('savedTeeTimeCount')) ? get('savedTeeTimeCount') : "");
  const [playingDate, setPlayingDate] = useState((savedCourse === course && savedGame === game  && get('savedPlayingDate')) ? get('savedPlayingDate') : "Date");
  const [textAreaValue, setTextAreaValue] = useState((savedCourse === course && savedGame === game  && get('savedTextAreaValue')) ? get('savedTextAreaValue') : "[Games, Entry, Prize, Rules]");
  const [progs069, setProgs069] = useState((savedCourse === course && savedGame === game  && get('savedProgs069')) ? get('savedProgs069') : "");
  const [progAdj, setProgAdj] = useState((savedCourse === course && savedGame === game  && get('savedProgAdj')) ? get('savedProgAdj') : "");
  //eslint-disable-next-line
  const [teamHcp, setTeamHcp] = useState([]);
  //eslint-disable-next-line
  const [teamProgs, setTeamProgs] = useState([])

  useEffect(() => {
    set('savedTeamTables', teamTables);
    return () => {
      set('savedGame', game);
      set('savedCourse', course);
    }
  //eslint-disable-next-line
  }, [teamTables])

  const playersArray = createLineupTablePlayersArray(course, game, games, teesSelected, ratings, slopes, pars);
  //eslint-disable-next-line
  const [players, setPlayers] = useState(playersArray);
  console.log('players:')
  console.table(players);

  const handleAddTeamMember = (event) => {
    const { name, value } = event.target;
    const newPlayerObj = players.find(player => player.id === Number(value));
    setTeamTables(prevTeamTables => ({
        ...prevTeamTables,
        [name]: prevTeamTables[name].concat(newPlayerObj),
    }));
  }

  const handleDeleteTeamMember = (teamName, id) => (event) => {
    setTeamTables(prevTeamTables => ({
          ...prevTeamTables,
          [teamName]: prevTeamTables[teamName].filter(player => player.id !== id),
      }));
  }

  const handleLinkTimeChange = (event) => {
    setLinkTime(event.target.value);
    setTeeTimes(event.target.value, teeTimeCount);
    set('savedLinkTime', event.target.value);
  }

  const handlePlayingDateChange = (event) => {
    setPlayingDate(event.target.value);
    set('savedPlayingDate', event.target.value)
  }

  const handleTeeTimeCountChange = (event) => {
    setTeeTimeCount(event.target.value);
    setTeeTimes(linkTime, event.target.value);
    set('savedTeeTimeCount', event.target.value);
  }

  const handleProgs069Change = (event) => {
    setProgs069(event.target.value);
    set('savedProgs069', event.target.value);
  }

  const handleProgAdjChange = (event) => {
    setProgAdj(event.target.value);
    set('savedProgAdj', event.target.value);

  }
  const handleTeeChoiceChange = (event) => {
    //first, update the teeChoice for the player
    let aTeeChoice = event.target.value;
    let anId = event.target.name;
    let aTeamNumber =event.target.id;
    setTeamHcpAndProgs(aTeamNumber);
    setTeeChoice(aTeamNumber, anId, aTeeChoice);
  };

  function setTeamHcpAndProgs(teamNumber){
    let aTeamHcp = 0;
    let aTeamProgs = 0;
    let playerCount = teamMembers.length;
    console.log('playerCount', playerCount);
    console.log('teamMembers', teamNumber);
    console.table(teamMembers);
    teamMembers.forEach(computeHcpAndProgs);
    setTeamHcp([...teamHcp, teamHcp[teamNumber] = aTeamHcp]);
    setTeamProgs([...teamProgs, teamProgs[teamNumber] = aTeamProgs.toFixed(1)])
    
    function computeHcpAndProgs(item){
      let teeChoice = item.teeChoice;
      let teesSelectedArray = teesSelected.map(a => a.value)
      let teeNo = teesSelectedArray.indexOf(teeChoice);
      aTeamHcp = aTeamHcp + item.courseHandicaps[teeNo];
      aTeamProgs = aTeamProgs + (36 - item.courseHandicaps[teeNo]);
      console.log('item', item, 'teeChoice', teeChoice, 'teeNo', teeNo, 'aTeamHcp', aTeamHcp, 'aTeamProgs', aTeamProgs);
      switch (Number(progAdj)) {
        case 3:
          switch (Number(progs069)) {
            case 6:
              if (playerCount === 3) aTeamProgs = aTeamProgs/3 + 1
              break;
            case 9:
              if (playerCount === 3) aTeamProgs = aTeamProgs/2 + 1.5
              break;
            default:
              break;
          }
          break;
        case 4:
          switch (Number(progs069)) {
            case 6:
              if (playerCount === 4) aTeamProgs = aTeamProgs/3 - 1
              break;
            case 9:
              if (playerCount === 4) aTeamProgs = aTeamProgs/2 - 1.5
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    }
  }


   
  function setTeeChoice(aTeamNumber, anId, aTeeChoice){
    let teamName = "team" + aTeamNumber;
    const playerIndex = teamTables[teamName].findIndex(player => player.id === Number(anId));
    teamTables[teamName][playerIndex].teeChoice = aTeeChoice;
    set('savedTeamTables', teamTables);
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
      teamMembers = teamTables[teamName];
      console.log('teamMember:' + teamName);
      console.table(teamMembers)
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
        progs069={progs069}
        teamHcp={teamHcp[i]}
        teamProgs={teamProgs[i]}
        handleTeeChoiceChange={handleTeeChoiceChange}
      />
      )
    }
    return TeamTables;
  }

  return (
  <>
  <div className='center'>
  <LineupTableDropDowns
    playingDateOptionItems={playingDateOptionItems}
    linkTime={linkTime}
    linkTimeOptionItems={linkTimeOptionItems}
    handleLinkTimeChange={handleLinkTimeChange}
    teeTimeCount={teeTimeCount}
    playingDate={playingDate}
    teeTimeCountOptionItems={teeTimeCountOptionItems}
    handlePlayingDateChange={handlePlayingDateChange}
    handleTeeTimeCountChange={handleTeeTimeCountChange}
    progs069={progs069}
    handleProgs069Change={handleProgs069Change}
    progAdj={progAdj}
    handleProgAdjChange={handleProgAdjChange}
  /><br></br>
  <br></br>
  <table id="lineup-table">
    <caption>Lineup for {playingDate} at {linkTime} at {course.toUpperCase()}</caption>
    <tbody>
      <tr>
        <td>
        {generateTeamTables()}
        </td>
      </tr>
    </tbody>
  </table>
    <br></br>
  <textarea 
    id='lineup-textarea'
    rows="6" cols="38"
    defaultValue={textAreaValue}
    onFocus={event => event.target.value = textAreaValue}
    onBlur={event => {setTextAreaValue(event.target.value); 
      set('savedTextAreaValue', event.target.value)}}
    >
    </textarea>
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


