import {tees} from '../data';
import setRatingSlopePar from '../functions/setRatingSlopePar';

export default function createIndividualTableBodyRows (table, rawIndex, gender, teesSelected, ratings, slopes, pars, shuffle) {
  if (!rawIndex) rawIndex = "0.0"

//declare some variables
  var rows = [];
  let indexFloat;

  //next, we build an array of tees
  let teesSelectedArray = buildTeeArray();

  //filter tees by gender, then add rows
  function addRow(item){
    switch(gender) {
      case 'F':
        if (tees.indexOf(item) > 2) {
          doAdd(item);
        }
        break;
      default:
        if (item !== "SCRS") {
          doAdd(item)
        }

    }
  }

  //construct the row
  function compute(aTee) {
    let rowReturn = [aTee];
    indexFloat = parseFloat(rawIndex);
    let tee = tees.indexOf(aTee);
    let i;
    for (i = 0; i<6; i++){
      const [rating, slope, par] = setRatingSlopePar(ratings, slopes, pars, i, tee, gender);
      rowReturn.push(doMath(rating, slope, par));
    };
    return rowReturn;
  }

//compute course handicap or target score
  function doMath(rating, slope, par){
  if (rating === 0) {
      return "-"
    } else {
        switch(table) {
          case 'CH':
            return Math.round((indexFloat * (slope / 113)) + (rating - par));
          default:
            return Math.trunc((indexFloat + .04) / (113 / slope) + rating);
        }
    }
  }
  //build array of tees
  function buildTeeArray() {
    let teesSelectedArray = teesSelected.map(a => a.value);
    return teesSelectedArray;
  }

//add a row for each tee
  function doAdd(item) {
    let aTee = item;
    var newRow = compute(aTee);
    rows.push(newRow);
  }

  teesSelectedArray.forEach(addRow);
  return rows;
}

