import {tees, courses} from '../data';
import {get} from './localStorage';
import setRatingSlopePar from './setRatingSlopePar';
import LineupDataService from "../services/LineupService";

export default function loadLineupTablePlayersArrray (
  firebaseRef,
  course,
  teesSelected, 
  ratings, 
  slopes, 
  pars,
  teamTables,
  teeTimeCount
  ) {
  let players = get('players');
  let playersArray= [];
  let idsInLineup = get('playersInLineup');
  let strHcpIndex;
  let hcpIndex;
  let gender;

  //next, we build an array of tees
  let teesSelectedArray = buildTeeArray();

  //filter players, then add them
  function addRow(item, index){
    doAdd(item, index);
  }

  const indexOfPlayer = (id) =>{
      var i = 0;
      var playerFound = false;
      try{
        do{
            playerFound = players[i].includes(id);
            i++;
        }
        while (!playerFound);
      return i-1;
      } catch (error) {
        alert("One of the players you selected when you made this lineup\n"
        +"(GHIN Number: " +id+") is no longer in your table.\n"
        +"Your saved lineups have been deleted.");
        LineupDataService.removeAll(firebaseRef);
        document.location = "/games";
      }
  }

  //construct the row
  function compute(anId, index) {
    let id = anId.toString();
    let playerIndex = indexOfPlayer(id);
    let aPlayer = players[playerIndex];
    strHcpIndex = aPlayer[3];
    hcpIndex = parseFloat(strHcpIndex);
    let firstName = aPlayer[2];
    let lastName = aPlayer[1];
    gender = aPlayer[4];
    let player = firstName + ' ' + lastName + " (" + strHcpIndex + ")";
    let playerReturn = {
      id: Number(aPlayer[0]),
      playerName: player,
      courseHandicaps: [],
      teeChoice: "",
      manualCH: "Auto"
    };
    let i;
    for (i=0; i < teesSelectedArray.length; i++){
      //here is where we compute the course handicap of the golfer for each of the selected tees
      let courseNumber = courses.indexOf(course);
      let teeNumber = tees.indexOf(teesSelectedArray[i]);
      const [rating, slope, par] = setRatingSlopePar(ratings, slopes, pars, courseNumber, teeNumber, gender);
      playerReturn.courseHandicaps.push(doMath(rating, slope, par))
    };
    playerReturn.teeChoice = teesSelectedArray[0];
    return playerReturn;
  }

  //compute the course handicap
  function doMath(rating, slope, par){
    if (rating === 0) {
      return "-"
    } else {
        if (strHcpIndex === 'guest'){
          return 0
        } else {
          return Math.round((hcpIndex * (slope / 113)) + (rating - par)); 
        }
    }
}

  //build array of tees
  function buildTeeArray() {
    let teesSelectedArray = teesSelected.map(a => a.value);
    return teesSelectedArray;
  }

  //add a row for each player
  function doAdd(item, index) {
    let anId = item;
    var newRow = compute(anId, index);
    playersArray.push(newRow);
  }  
  
  function updateTeamTables(){
  for (let i = 0; i < teeTimeCount; i++) {
    let aTeamName = "team" + i;
    try {
    let aPlayerCount = teamTables[aTeamName].length;
    for (let j = 0; j < aPlayerCount; j++){
      let aTeamMemberId = teamTables[aTeamName][j].id;
      let aPlayerObj = playersArray.find(obj => 
        obj.id === aTeamMemberId
      )
      teamTables[aTeamName][j].playerName = aPlayerObj.playerName;
      teamTables[aTeamName][j].courseHandicaps = aPlayerObj.courseHandicaps;
    }
    } catch (error) {
      console.log("error updating Team Tables");
    }

  }
}

  idsInLineup.forEach(addRow);
  updateTeamTables();
  return playersArray;
}