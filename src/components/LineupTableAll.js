import React, { useState, useEffect } from 'react';
import LineupTableDropDowns from './LineupTableDropDowns';
import GamesAndLineupTableDropDowns from './GamesAndLineupTableDropDowns';
import TeamTable from './TeamTable';
import { v4 as uuidv4 } from 'uuid';
import {useRecoilValue, useRecoilState} from 'recoil';
import * as state from '../state';
import createLineupTablePlayersArray from '../functions/createLineupTablePlayersArray';
//import {set} from '../functions/localStorage';
import html2canvas from 'html2canvas';
import saveLineupToFirebase from '../functions/saveLineupToFirebase';
import LineupsList from './LineupsList';
import { get, set } from '../functions/localStorage';
import { useList } from "react-firebase-hooks/database";
import LineupDataService from "../services/LineupService";

export default function LineupTableAll({ratings, slopes, pars}) {
  const [showTips, setShowTips] = useState(get('showTips'));
  const [loadDeleteSavedLineup, setLoadDeleteSavedLineup] = useRecoilState(state.loadDeleteSaveLineupsState)
  const [course, setCourse] = useRecoilState(state.courseState);
  const [game, setGame] = useRecoilState(state.gameState);
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
  let teamMembers = [];
  const [teamTables, setTeamTables] = useState(teamTablesObj);
  const [linkTime, setLinkTime] = useState("Time");
  const [teeTimeCount, setTeeTimeCount] = useState("");
  const [playingDate, setPlayingDate] = useState("Date");
  const [textAreaValue, setTextAreaValue] = useState("[Bets, Entry, Prize, Rules]");
  const [progs069, setProgs069] = useState("0");
  const [progAdj, setProgAdj] = useState("0");
  //trick the component into rerendering with tee choice changes
  //eslint-disable-next-line
  const [teeChoiceChangedId, setTeeChoiceChangedId] = useState(0);
  //eslint-disable-next-line
  const [overrideCHChoiceChangedId, setOverrideCHChoiceChangedId] = useState(0);

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
    //set('savedLinkTime', event.target.value);
  }

  const handlePlayingDateChange = (event) => {
    setPlayingDate(event.target.value);
    //set('savedPlayingDate', event.target.value)
  }

  const handleTeeTimeCountChange = (event) => {
    const oldCount = teeTimeCount;
    const newCount = event.target.value;
    const droppedTimesCount = oldCount-newCount;
    console.log('dropped: '+ droppedTimesCount)
    if (droppedTimesCount > 0) restoreDroppedTeeTimePlayersToPlayersList(oldCount, newCount, droppedTimesCount)
    setTeeTimeCount(event.target.value);
    setTeeTimes(linkTime, event.target.value);
  }

  const handleProgs069Change = (event) => {
    setProgs069(event.target.value);
    //set('savedProgs069', event.target.value);
    setEachTeamsHcpAndProgs();
  }

  const handleProgAdjChange = (event) => {
    setProgAdj(event.target.value);
    //set('savedProgAdj', event.target.value);
    setEachTeamsHcpAndProgs();
  }

  function restoreDroppedTeeTimePlayersToPlayersList(oldCount, newCount, droppedTimesCount){
    console.log(oldCount, newCount, droppedTimesCount)
    for (let i = newCount; i < oldCount; i++){
      let teamName = "team" + i;
      console.log(teamName)
      teamTables[teamName] = [];
      console.table(teamTables[teamName])
    }

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

  const handleTextAreaOnBlur = (event) => {
    setTextAreaValue(event.target.value);
    //set('savedTextAreaValue', event.target.value);
  }
  
  const handleTextAreaValueChange = (event) => {
    setTextAreaValue(event.target.value);
  }


  function handleShowTipsChange(){
    set('showTips', !showTips);
    setShowTips(!showTips);
  }

  function handleSaveLineupClick(){
    saveLineupToFirebase(
      players,
      game, 
      course, 
      playingDate, 
      teeTimeCount, 
      linkTime, 
      progs069,
      progAdj, 
      teamTables,
      textAreaValue);
  }

  function handleLoadDeleteSavedLineupClick(){
    setLoadDeleteSavedLineup(true);
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
    //set('savedTeamHcpAndProgs', teamHcpAndProgs);

    function computeHcpAndProgs(item){
      let teeChoice = item.teeChoice;
      let teesSelectedArray = teesSelected.map(a => a.value)
      let teeNo = teesSelectedArray.indexOf(teeChoice);
      aTeamHcp = aTeamHcp + Number(item.courseHandicaps[teeNo]);
      aTeamProgs = aTeamProgs + (36 - Number(item.courseHandicaps[teeNo]));
    }
  }

  function setTeeChoice(aTeamNumber, anId, aTeeChoice){
    let teamName = "team" + aTeamNumber;
    const playerIndex = teamTables[teamName].findIndex(player => player.id === Number(anId));
    teamTables[teamName][playerIndex].teeChoice = aTeeChoice;
    //set('savedTeamTables', teamTables);
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

    //set('savedTeamTables', teamTables);

  }

  function setManualCHCourseHandicaps(teamMembers){
    //iterate through teamMembers
    for (let i = 0; i < teamMembers.length; i++){
      let aTeeChoice = teamMembers[i].teeChoice;
      let aManualCH = teamMembers[i].manualCH;
      if (aManualCH !== "Auto") {
        let teesSelectedArray = teesSelected.map(a => a.value);
        let aChosenTeeIndex = teesSelectedArray.indexOf(aTeeChoice);
        for (let j = 0; j < teesSelectedArray.length; j++){
          teamMembers[i].courseHandicaps[j]="*"
        }
        teamMembers[i].courseHandicaps[aChosenTeeIndex] = aManualCH;
        teamMembers[i].playerName = teamMembers[i].playerName + "*";
      }
    }
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
  const teeTimeCounts = [1,2,3,4,5,6,7,8,9,10];
  
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
  manualCHList.push("Auto");
  for (let i = -10; i < 61; i++) manualCHList.push(i);
  const manualCHOptionItems = manualCHList.map((manualCH) =>
    <option key ={uuidv4()} value={manualCH}>{manualCH}</option>);

  const playerNameList = getPlayersNotInTeeTime(players, teamTables);
  let TeamTables = [];
  function generateTeamTables (){
    for (var i = 0; i < teeTimeCount; i++){
      let teamName = "team" + i;
      teamMembers = teamTables[teamName];
      setManualCHCourseHandicaps(teamMembers);
      setEachTeamsHcpAndProgs();
      //teamHcpAndProgs = get('savedTeamHcpAndProgs');
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
  function loadLineupFromFirebase({
    players,
    course, 
    game, 
    linkTime, 
    playingDate, 
    progs069, 
    progAdj,
    teamTables, 
    teeTimeCount, 
    textAreaValue
    }){
        setPlayers(players);
        setCourse(course);
        setGame(game);
        setLinkTime(linkTime);
        setPlayingDate(playingDate);
        setProgs069(progs069);
        setProgAdj(progAdj)
        setTeamTables(teamTables);
        setTeeTimeCount(teeTimeCount);
        setTextAreaValue(textAreaValue);
    }
    
  const [Lineups] = useList(LineupDataService.getAll());
  const savedLineupCount = () => {
    return Lineups.length
  }
 
  return (
  <>
  <div className='center'>
    {showTips && 
      <div>
        <p><span style={{fontWeight: "bold"}} >To change the game:</span><br></br>
        Go to the Games page.<br></br></p>        
        <p><span style={{fontWeight: "bold"}} >To change the course:</span><br></br>
        Click on the dropdown below:</p>
      </div>}
      <br></br>
  <GamesAndLineupTableDropDowns table="Lineup"/>
  <br></br>
    {savedLineupCount() > 0 &&
      <div>
        {showTips &&
          <div>
            <p><span style={{fontWeight: "bold"}} >To load or delete a saved lineup:</span><br></br>
            Click on the "Saved Lineups" button.</p>
          </div>}
          <br></br>
        <button onClick={handleLoadDeleteSavedLineupClick}>Saved Lineups</button>
        {loadDeleteSavedLineup && <LineupsList loadLineupFromFirebase={loadLineupFromFirebase} />}
      </div>}
  <br></br><br></br>
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
  />
  <br></br><br></br>
  <table id="lineup-table">
    <thead className='lineup-table-head'>
      <tr>
        <td>
          {"Lineup for " + game + ", " + playingDate + " at " + linkTime + " at " + course.toUpperCase()}
        </td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
        {generateTeamTables()}
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td>
          <textarea 
          id='lineup-textarea'
          rows="8" cols="38"
          value={textAreaValue}
          onChange={handleTextAreaValueChange}
          onFocus={event => event.target.value = textAreaValue}
          onBlur={handleTextAreaOnBlur}
          autoFocus
          >
          </textarea>
        </td>
      </tr>
    </tfoot>
  </table>
    {showTips && 
      <div>
          <p><span style={{fontWeight: "bold"}} >To set a manual handicap:</span><br></br>
            Click <span style={{fontWeight: "bold"}} >*</span> at the end of a player's row<br></br>
            and select the course handicap.<br></br>
            Select "Auto" to use GHIN course handicaps again.
        </p>
          <p><span style={{fontWeight: "bold"}} >To save a lineup:</span><br></br>
            Click the "Save Lineup" button.<br></br>
            Saving a lineup will make it available<br></br>
            for future use on this device and<br></br>
            any other device on which you run this app.
        </p>
      </div>}
  <br></br>
    <button className='center' onClick={handleSaveLineupClick}>
      Save Lineup
    </button><br></br><br></br>
    <input type='checkbox' id='showTips'onChange={handleShowTipsChange} defaultChecked={showTips}></input>
    <label htmlFor='showTips'>Show Tips</label> 
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


