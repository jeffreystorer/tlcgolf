import * as courseData from './ratings-slopes-pars.js';
import RequestGHIN from './request-ghin';
import { jget} from './local-storage-functions';/* 
import {useStateWithLocalStorage} from './use-state-with-local-storage'; */

function CreateGameTableBodyRows (course, game) {
  
/*   const[ course, SetCourse] = useStateWithLocalStorage('Course');
  const[ game, SetGame] = useStateWithLocalStorage('Game'); */
  //first, we get ghin data, store it in local storage, and add to Players
  RequestGHIN();

  //declare some variables
  let players = jget('Players');
  var rows = [];
  let rating;
  let slope;
  let par;
  let hcpIndex;
  let gender;

  //next, we build an array of tees
  let teesSelected = buildTeeArray();

  //choose which rows to add, the add them
  function addRow(item, index){ 
    let myGame = game.toLowerCase();
    let games = jget('Games');
    let gameNumber = games.indexOf(myGame);
    switch(gameNumber) {
      case 0:
        doAdd(item, index)
        break;
      default:
        let gameIndex = gameNumber + 4;
        if ((item[gameIndex] === "Yes")|| (item[gameIndex] === "YES") || (item[gameIndex] === 'yes')){
          doAdd(item, index);
    }
  }


  }

  //add the chosen rows
  function doAdd(item, index) {
    let aPlayer = item;
    var newRow = compute(aPlayer, index);
    rows.push(newRow);
  }

  //construct the row
  function compute(aPlayer, index) {
    let strHcpIndex = aPlayer[3];
    hcpIndex = parseFloat(strHcpIndex);
    
    let myCourse = course.toLowerCase();
    let courses = courseData.courses;
    let tees = courseData.tees;
    let firstName = aPlayer[2];
    let lastName = aPlayer[1];
    gender = aPlayer[4];
    let player = firstName + ' ' + lastName + ' (' + strHcpIndex + ')';
    let rowReturn = [player];
    let i;
    for (i=0; i < teesSelected.length; i++){
      //here is where we compute the course handicap of the golfer for each of the selected tees
      let courseNumber = courses.indexOf(myCourse);
      let teeNumber = tees.indexOf(teesSelected[i]);
      setRatingSlopePar(courseNumber, teeNumber);
      rowReturn.push(doMath())
    }
    return rowReturn;
  }

    //compute the course handicap
    function doMath(){
        if (rating === 0) {
          return "-"
        } else {
                return Math.round((hcpIndex * (slope / 113)) + (rating - par));
        }
    }
  
    //set rating, slope, and par
    function setRatingSlopePar(course, tee){/* 
      console.clear();
      console.log(course + "   " + tee);
      debugger; */
      switch(gender) {
          case 'F':
            rating = Number(courseData.wratings[course][tee]);
            slope = Number(courseData.wslopes[course][tee]);
            par = Number(courseData.wpars[course][tee]);
            break;
          default:
            rating = Number(courseData.mratings[course][tee]);
            slope = Number(courseData.mslopes[course][tee]);
            par = Number(courseData.mpars[course][tee]);
      }
    }
  
    function buildTeeArray() {
      const myTeeArray = jget('TeesSelected');
      let teesSelected = myTeeArray.map(a => a.value);
      return teesSelected;
    }

    players.forEach(addRow)
    return rows;
}

export default CreateGameTableBodyRows;