import React, { useState, useEffect } from 'react';
import LineupTableDropDowns from './LineupTableDropDowns';
import TeamTable from './TeamTable';
import { v4 as uuidv4 } from 'uuid';
import {useRecoilValue} from 'recoil';
import * as state from '../state';
import createLineupTablePlayersArray from '../functions/createLineupTablePlayersArray';
import {set, get} from '../functions/localStorage';
import html2canvas from 'html2canvas';

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
  let teamHcpAndProgs =
  {
    team0:[0,0],
    team1:[0,0],
    team2:[0,0],
    team3:[0,0],
    team4:[0,0],
    team5:[0,0],
    team6:[0,0],
    team7:[0,0],
    team8:[0,0],
    team9:[0,0],
  }
  let savedGame = get('savedGame');
  let savedCourse = get('savedCourse');
  if (savedCourse === course && savedGame === game) teamHcpAndProgs = get('savedTeamHcpAndProgs');
  let teamMembers = [];
  const [teamTables, setTeamTables] = useState((savedCourse === course && savedGame === game && get('savedTeamTables')) ? get('savedTeamTables') : teamTablesObj);
  const [linkTime, setLinkTime] = useState((savedCourse === course && savedGame === game  && get('savedLinkTime')) ? get('savedLinkTime') : "Time");
  const [teeTimeCount, setTeeTimeCount] = useState((savedCourse === course && savedGame === game  && get('savedTeeTimeCount')) ? get('savedTeeTimeCount') : "");
  const [playingDate, setPlayingDate] = useState((savedCourse === course && savedGame === game  && get('savedPlayingDate')) ? get('savedPlayingDate') : "Date");
  const [textAreaValue, setTextAreaValue] = useState((savedCourse === course && savedGame === game  && get('savedTextAreaValue')) ? get('savedTextAreaValue') : "[Games, Entry, Prize, Rules]");
  const [progs069, setProgs069] = useState((savedCourse === course && savedGame === game  && get('savedProgs069')) ? get('savedProgs069') : "");
  const [progAdj, setProgAdj] = useState((savedCourse === course && savedGame === game  && get('savedProgAdj')) ? get('savedProgAdj') : "");
  //trick the component into rerendering with tee choice changes
  //eslint-disable-next-line
  const [teeChoiceChangedId, setTeeChoiceChangedId] = useState(0);
  //eslint-disable-next-line
  const [overrideCHChoiceChangedId, setOverrideCHChoiceChangedId] = useState(0);

  useEffect(() => {
    set('savedTeamTables', teamTables);
    return () => {
      set('savedGame', game);
      set('savedCourse', course);
    }
  //eslint-disable-next-line
  }, [teamTables])

  useEffect(() => {
    setEachTeamsHcpAndProgs();
    return () => {
    setEachTeamsHcpAndProgs();
    }
  }, )

  const playersArray = createLineupTablePlayersArray(course, game, games, teesSelected, ratings, slopes, pars, teamTables, teeTimeCount);
  //eslint-disable-next-line
  const [players, setPlayers] = useState(playersArray);

  const handleAddTeamMember = (event) => {
    const { name, value } = event.target;
    const newPlayerObj = players.find(player => player.id === Number(value));
    setTeamTables(prevTeamTables => ({
        ...prevTeamTables,
        [name]: prevTeamTables[name].concat(newPlayerObj),
    }));
    setEachTeamsHcpAndProgs();
  }

  const handleDeleteTeamMember = (teamName, id) => (event) => {
    setTeamTables(prevTeamTables => ({
          ...prevTeamTables,
          [teamName]: prevTeamTables[teamName].filter(player => player.id !== id),
      }));      
    setEachTeamsHcpAndProgs();
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
    setEachTeamsHcpAndProgs();
  }

  const handleProgAdjChange = (event) => {
    setProgAdj(event.target.value);
    set('savedProgAdj', event.target.value);
    setEachTeamsHcpAndProgs();
  }

  function setEachTeamsHcpAndProgs(){
    for (let i = 0; i < teeTimeCount; i++){
      let teamName = "team" + i;
      setTeamHcpAndProgs(teamName);
    }
  }
  const handleTeeChoiceChange = (event) => {
    setTeeChoiceChangedId(uuidv4());
    //first, update the teeChoice for the player
    let aTeeChoice = event.target.value;
    let anId = event.target.name;
    let aTeamNumber =event.target.id;
    setTeeChoice(aTeamNumber, anId, aTeeChoice);
    setEachTeamsHcpAndProgs();
  };

  const handleOverrideCHChange = (event) =>{
    setOverrideCHChoiceChangedId(uuidv4());
    let aManualCH = event.target.value;
    let anId = event.target.name;
    let aTeamNumber =event.target.id;
    setManualCH(aTeamNumber, anId, aManualCH);
    setEachTeamsHcpAndProgs();
  }

  function setTeamHcpAndProgs(teamName){
    
    let teamMembers = teamTables[teamName];
    let aTeamHcp = 0;
    let aTeamProgs = 0;
    let playerCount = teamMembers.length;
    teamMembers.forEach(computeHcpAndProgs);
    switch (Number(progAdj)) {
        case 0:
          switch (Number(progs069)) {
            case 6:
              aTeamProgs = aTeamProgs/3
              break;
            case 9:
              aTeamProgs = aTeamProgs/2
              break;
            default:
              aTeamProgs = 0;
              break;
          }
          break;
        default:
          break;
      case 3:
        switch (Number(progs069)) {
          case 6:
            if (playerCount === 3) {
              aTeamProgs = aTeamProgs/3 + 1
            } else {
              aTeamProgs = aTeamProgs/3
            }
            break;
          case 9:
            if (playerCount === 3) {
              aTeamProgs = aTeamProgs/2 + 1.5
            } else {
              aTeamProgs = aTeamProgs/2
            }
            break;
          default:
            aTeamProgs = 0;
            break;
        }
        break;
        case 4:
          switch (Number(progs069)) {
            case 6:
              if (playerCount === 4) {
                aTeamProgs = aTeamProgs/3 - 1
              } else {
                aTeamProgs = aTeamProgs/3
              }
              break;
            case 9:
              if (playerCount === 4) {
                aTeamProgs = aTeamProgs/2 - 1.5
              } else {
                aTeamProgs = aTeamProgs/2
              }
              break;
            default:
              aTeamProgs = 0;
              break;
          }
          break;
      };
    let teamProgs = aTeamProgs.toFixed(1);
    aTeamProgs = teamProgs;
    teamHcpAndProgs[teamName][0] = aTeamHcp;
    teamHcpAndProgs[teamName][1] = aTeamProgs;
    set('savedTeamHcpAndProgs', teamHcpAndProgs);

    function computeHcpAndProgs(item){
      let teeChoice = item.teeChoice;
      let teesSelectedArray = teesSelected.map(a => a.value)
      let teeNo = teesSelectedArray.indexOf(teeChoice);
      aTeamHcp = aTeamHcp + item.courseHandicaps[teeNo];
      aTeamProgs = aTeamProgs + (36 - item.courseHandicaps[teeNo]);
    }
  }

  function setTeeChoice(aTeamNumber, anId, aTeeChoice){
    let teamName = "team" + aTeamNumber;
    const playerIndex = teamTables[teamName].findIndex(player => player.id === Number(anId));
    teamTables[teamName][playerIndex].teeChoice = aTeeChoice;
    set('savedTeamTables', teamTables);
  }

  function setManualCH(aTeamNumber, anId, aManualCH){
    let teamName = "team" + aTeamNumber;
    const playerIndex = teamTables[teamName].findIndex(player => player.id === Number(anId));
    let aTeeChoice = teamTables[teamName][playerIndex].teeChoice;
    let teesSelectedArray = teesSelected.map(a => a.value);
    let aChosenTeeIndex = teesSelectedArray.indexOf(aTeeChoice);
    for (let i = 0; i < teesSelectedArray.length; i++){
      teamTables[teamName][playerIndex].courseHandicaps[i]="*"
    }
    teamTables[teamName][playerIndex].courseHandicaps[aChosenTeeIndex] = aManualCH;
    teamTables[teamName][playerIndex].manualCH = aManualCH;
    console.clear(); 
    console.log("playerIndex", playerIndex, "aTeeChoice", aTeeChoice);
    console.log('aChosenTeeIndex', aChosenTeeIndex);
    console.log('teamTables')
    console.table(teamTables);

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

  const playingDates = () => {
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
  const playingDateOptionItems = playingDates().map((playingDate) =>
    <option key={uuidv4()}>{playingDate}</option>);
  const teeTimeCounts = [2,3,4,5,6,7,8,9,10];
  const teeTimeCountOptionItems = teeTimeCounts.map((count) =>
    <option key={uuidv4()} value={count}>{count + "  tee times"}</option>);
  const linkTimes = () => {
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
  const linkTimeOptionItems = linkTimes().map((linkTime) =>
    <option key={uuidv4()} value={linkTime}>{linkTime}</option>)
  let manualCHList =[];
  manualCHList.push("*");
  for (let i = -10; i < 61; i++) manualCHList.push(i);
  const manualCHOptionItems = manualCHList.map((manualCH) =>
    <option key ={uuidv4()} value={manualCH}>{manualCH}</option>);

  const playerNameList = getPlayersNotInTeeTime(players, teamTables);
  let TeamTables = [];
  function generateTeamTables (){
    for (var i = 0; i < teeTimeCount; i++){
      let teamName = "team" + i;
      teamMembers = teamTables[teamName];
      setEachTeamsHcpAndProgs();
      teamHcpAndProgs = get('savedTeamHcpAndProgs');
      let teamHcp = teamHcpAndProgs[teamName][0];
      let teamProgs = teamHcpAndProgs[teamName][1];
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
        teamHcp={teamHcp}
        teamProgs={teamProgs}
        handleTeeChoiceChange={handleTeeChoiceChange}
        handleOverrideCHChange={handleOverrideCHChange}
        manualCHOptionItems={manualCHOptionItems}
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
    <p>*=handicap set by captain</p>
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
export function screenShot(){
 //let input = document.getElementById('lineup-table');

  html2canvas(document.body).then(function(canvas){  
    document.body.appendChild(canvas);
    });
}


